const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ts = require('typescript');

/**
 * Script para generar automáticamente archivos .md de documentación
 * para cada componente Angular
 */

// Configuración
const COMPONENTS_PATH = 'src/app/components';
const SERVICES_PATH = 'src/app/services';
const DIRECTIVES_PATH = 'src/app/directives';

/**
 * Analiza un archivo TypeScript y extrae propiedades @Input() y eventos @Output()
 */
function analyzeComponent(filePath) {
  const sourceCode = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );

  const inputs = [];
  const outputs = [];
  const usesNgZorro = sourceCode.includes('ng-zorro-antd');

  function visit(node) {
    if (ts.isPropertyDeclaration(node) && node.modifiers) {
      const decorators = node.modifiers.filter(modifier => ts.isDecorator(modifier));
      
      decorators.forEach(decorator => {
        let decoratorName = '';
        
        if (ts.isCallExpression(decorator.expression)) {
          decoratorName = decorator.expression.expression.getText();
        } else if (ts.isIdentifier(decorator.expression)) {
          decoratorName = decorator.expression.getText();
        }
        
        if (decoratorName === 'Input') {
          const propertyName = node.name.getText();
          const propertyType = node.type ? node.type.getText() : 'any';
          const initializer = node.initializer ? node.initializer.getText() : '-';
          
          inputs.push({
            name: propertyName,
            type: propertyType,
            defaultValue: initializer
          });
        }
        
        if (decoratorName === 'Output') {
          const eventName = node.name.getText();
          const eventType = node.type ? node.type.getText() : 'EventEmitter';
          
          outputs.push({
            name: eventName,
            type: eventType
          });
        }
      });
    }
    
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return { inputs, outputs, usesNgZorro };
}

/**
 * Genera archivo Storybook para un componente usando el .md existente
 */
function generateStorybookFile(componentName, componentPath, analysis) {
  const className = componentName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'Component';

  const dir = path.dirname(componentPath);
  const storyPath = path.join(dir, `${componentName}.stories.ts`);

  // Generar controles para @Input()
  const argTypes = analysis.inputs.length > 0 ? 
    analysis.inputs.map(input => {
      let control = 'text';
      let options = undefined;
      
      if (input.type.includes('boolean')) control = 'boolean';
      if (input.type.includes('number')) control = 'number';
      if (input.type.includes('|')) {
        control = 'select';
        const matches = input.type.match(/'([^']+)'/g);
        if (matches) {
          options = matches.map(match => match.replace(/'/g, ''));
        }
      }
      
      return `    ${input.name}: {
      control: ${options ? `{ type: '${control}', options: [${options.map(opt => `'${opt}'`).join(', ')}] }` : `'${control}'`},
      description: 'Propiedad ${input.name}'
    }`;
    }).join(',\n') : '';

  // Generar args por defecto
  const defaultArgs = analysis.inputs.length > 0 ?
    analysis.inputs.map(input => {
      let value = input.defaultValue;
      if (value === "''") value = "'Texto ejemplo'";
      if (value === '[]') value = "['Item 1', 'Item 2']";
      return `    ${input.name}: ${value}`;
    }).join(',\n') : '';

  // Detectar módulos ng-zorro necesarios
  const sourceCode = fs.readFileSync(componentPath, 'utf8');
  const ngZorroImports = [];
  const additionalImports = ['FormsModule'];
  
  if (analysis.usesNgZorro) {
    if (sourceCode.includes('NzFormModule')) ngZorroImports.push('NzFormModule');
    if (sourceCode.includes('NzInputModule')) ngZorroImports.push('NzInputModule');
    if (sourceCode.includes('NzInputNumberModule')) ngZorroImports.push('NzInputNumberModule');
    if (sourceCode.includes('NzCheckboxModule')) ngZorroImports.push('NzCheckboxModule');
    if (sourceCode.includes('NzButtonModule')) ngZorroImports.push('NzButtonModule');
    if (sourceCode.includes('NzSelectModule')) ngZorroImports.push('NzSelectModule');
    if (sourceCode.includes('NzDatePickerModule')) ngZorroImports.push('NzDatePickerModule');
    if (sourceCode.includes('NzAutocompleteModule')) ngZorroImports.push('NzAutocompleteModule');
    if (sourceCode.includes('NzIconModule')) ngZorroImports.push('NzIconModule');
  }
  
  const ngZorroImportStatements = ngZorroImports.map(module => {
    const kebabCase = module.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-nz-/, '').replace('-module', '');
    return `import { ${module} } from 'ng-zorro-antd/${kebabCase}';`;
  }).join('\n');
  
  const storyContent = `import type { Meta, StoryObj } from '@storybook/angular';
import { ${className} } from './${componentName}';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';${ngZorroImportStatements ? '\n' + ngZorroImportStatements : ''}

const meta: Meta<${className}> = {
  title: 'Components/${className}',
  component: ${className},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: null
    }
  },
  decorators: [
    moduleMetadata({
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule${ngZorroImports.length > 0 ? ',\n        ' + ngZorroImports.join(',\n        ') : ''}
      ]
    })
  ],
  argTypes: {
${argTypes}
  },
  args: {
${defaultArgs}
  }
};

export default meta;
type Story = StoryObj<${className}>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
${defaultArgs}
  }
};
`;

  return { storyPath, storyContent };
}

/**
 * Actualiza el archivo TypeScript con referencia JSDoc al archivo .md
 */
function updateTypeScriptWithMdReference(filePath, fileName, subfolder = '') {
  const content = fs.readFileSync(filePath, 'utf8');
  const mdPath = subfolder ? `${subfolder}/${fileName}.md` : `${fileName}.md`;
  const mdReference = `/**\n * @fileoverview ${fileName} component\n * @see {@link ./${mdPath}} Documentación completa\n */\n`;
  
  // Solo añadir si no existe ya la referencia
  if (!content.includes('@see') && !content.includes('.md')) {
    // Buscar el primer import y añadir antes
    const lines = content.split('\n');
    const firstImportIndex = lines.findIndex(line => line.trim().startsWith('import'));
    
    if (firstImportIndex !== -1) {
      lines.splice(firstImportIndex, 0, mdReference);
      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
      console.log(`📝 Referencia .md añadida a: ${filePath}`);
    }
  }
}

/**
 * Actualiza un archivo markdown existente preservando contenido personalizado
 */
function updateExistingMarkdown(existingContent, newContent) {
  // Extraer secciones del contenido existente
  const existingLines = existingContent.split('\n');
  
  // Encontrar y preservar la descripción personalizada
  const descStart = existingLines.findIndex(line => line.includes('## Descripción'));
  const descEnd = existingLines.findIndex((line, index) => index > descStart && line.startsWith('## '));
  let customDescription = '';
  
  if (descStart !== -1 && descEnd !== -1) {
    const descLines = existingLines.slice(descStart + 1, descEnd);
    const currentDesc = descLines.join('\n').trim();
    if (currentDesc && !currentDesc.includes('que proporciona funcionalidad específica')) {
      customDescription = currentDesc;
    }
  }
  
  // Encontrar y preservar las notas personalizadas
  const notesStart = existingLines.findIndex(line => line.includes('## Notas'));
  const notesEnd = existingLines.findIndex((line, index) => index > notesStart && line.startsWith('## '));
  let customNotes = '';
  
  if (notesStart !== -1 && notesEnd !== -1) {
    const notesLines = existingLines.slice(notesStart + 1, notesEnd);
    const currentNotes = notesLines.join('\n').trim();
    if (currentNotes && !currentNotes.includes('Añade aquí cualquier información adicional')) {
      customNotes = currentNotes;
    }
  }
  
  // Reemplazar en el nuevo contenido
  let updatedContent = newContent;
  
  if (customDescription) {
    updatedContent = updatedContent.replace(
      /## Descripción[\s\S]*?(?=## Uso)/,
      `## Descripción\n\n${customDescription}\n\n`
    );
  }
  
  if (customNotes) {
    updatedContent = updatedContent.replace(
      /## Notas[\s\S]*?(?=## Changelog)/,
      `## Notas\n\n${customNotes}\n\n`
    );
  }
  
  return updatedContent;
}

/**
 * Genera el contenido markdown para un componente
 */
function generateComponentMarkdown(componentName, componentPath) {
  const className = componentName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'Component';

  const analysis = analyzeComponent(componentPath);
  
  // Generar tabla de propiedades
  let propertiesTable = '| Propiedad | Tipo | Descripción | Valor por defecto |\n|-----------|------|-------------|-------------------|\n';
  if (analysis.inputs.length > 0) {
    analysis.inputs.forEach(input => {
      propertiesTable += `| ${input.name} | ${input.type} | - | ${input.defaultValue} |\n`;
    });
  } else {
    propertiesTable += '| - | - | - | - |\n';
  }

  // Generar tabla de eventos
  let eventsTable = '| Evento | Tipo | Descripción |\n|--------|------|-------------|\n';
  if (analysis.outputs.length > 0) {
    analysis.outputs.forEach(output => {
      eventsTable += `| ${output.name} | ${output.type} | - |\n`;
    });
  } else {
    eventsTable += '| - | - | - |\n';
  }

  return `# ${className}

## Descripción

Componente ${componentName} que proporciona funcionalidad específica para la aplicación.

## Uso

\`\`\`html
<app-${componentName}></app-${componentName}>
\`\`\`

## Propiedades

${propertiesTable}
## Eventos

${eventsTable}
## Ejemplos

### Ejemplo básico
\`\`\`html
<app-${componentName}></app-${componentName}>
\`\`\`

### Ejemplo avanzado
\`\`\`html
<app-${componentName}${
  analysis.inputs.length > 0 
    ? '\n  ' + analysis.inputs.map(input => `[${input.name}]="valor"`).join('\n  ')
    : ''
}${
  analysis.outputs.length > 0
    ? '\n  ' + analysis.outputs.map(output => `(${output.name})="manejar${output.name.charAt(0).toUpperCase() + output.name.slice(1)}($event)"`).join('\n  ')
    : ''
}>
</app-${componentName}>
\`\`\`

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente
`;
}

/**
 * Procesa componentes
 */
function processComponents() {
  console.log('Buscando componentes en:', COMPONENTS_PATH);
  
  const componentPattern = COMPONENTS_PATH + '/**/*.ts';
  const componentFiles = glob.sync(componentPattern).filter(file => 
    !file.includes('.spec.ts') && !file.includes('.d.ts') && !file.includes('.stories.ts')
  );

  console.log('Archivos encontrados:', componentFiles.length);

  componentFiles.forEach(filePath => {
    const dir = path.dirname(filePath);
    const fileName = path.basename(filePath, '.ts');

    console.log(`Procesando: ${fileName}`);

    // Analizar componente una vez
    const analysis = analyzeComponent(filePath);
    
    // Crear o actualizar markdown en la raíz del componente
    const mdPath = path.join(dir, `${fileName}.md`);
    const content = generateComponentMarkdown(fileName, filePath);
    
    if (!fs.existsSync(mdPath)) {
      fs.writeFileSync(mdPath, content, 'utf8');
      console.log(`✅ Creado: ${mdPath}`);
    } else {
      const existingContent = fs.readFileSync(mdPath, 'utf8');
      const updatedContent = updateExistingMarkdown(existingContent, content);
      fs.writeFileSync(mdPath, updatedContent, 'utf8');
      console.log(`🔄 Actualizado: ${mdPath}`);
    }
    
    // Generar archivo Storybook
    const { storyPath, storyContent } = generateStorybookFile(fileName, filePath, analysis);
    fs.writeFileSync(storyPath, storyContent, 'utf8');
    console.log(`📚 Story creado: ${storyPath}`);
    
    // Actualizar el archivo TypeScript con referencia al .md
    updateTypeScriptWithMdReference(filePath, fileName);
  });
}

// Ejecutar el script
console.log('🚀 Generando documentación markdown...\n');
console.log('📦 Procesando componentes...');
processComponents();
console.log('\n✨ ¡Documentación generada exitosamente!');