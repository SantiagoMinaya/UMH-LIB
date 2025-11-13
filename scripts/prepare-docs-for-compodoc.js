const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Script para preparar archivos .md para Compodoc con summary.json
 */

const COMPONENTS_PATH = 'src/app/components';
const TEMP_DOCS_PATH = 'temp-docs';

function prepareDocs() {
  console.log('📚 Preparando documentación para Compodoc...');
  
  // Limpiar y crear directorio temporal
  if (fs.existsSync(TEMP_DOCS_PATH)) {
    fs.rmSync(TEMP_DOCS_PATH, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMP_DOCS_PATH, { recursive: true });
  
  // Buscar todos los archivos .md en subcarpetas docs/
  const mdFiles = glob.sync(`${COMPONENTS_PATH}/**/docs/*.md`);
  
  console.log(`Encontrados ${mdFiles.length} archivos .md`);
  
  const summaryEntries = [];
  
  mdFiles.forEach(mdFile => {
    const fileName = path.basename(mdFile);
    const componentName = path.basename(path.dirname(path.dirname(mdFile)));
    const tempFile = path.join(TEMP_DOCS_PATH, `${componentName}.md`);
    
    // Copiar archivo a directorio temporal
    fs.copyFileSync(mdFile, tempFile);
    console.log(`✅ Copiado: ${mdFile} -> ${tempFile}`);
    
    // Añadir entrada al summary
    summaryEntries.push({
      title: `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component`,
      file: `${componentName}.md`
    });
  });
  
  // Crear summary.json con formato correcto para Compodoc
  const summary = summaryEntries;
  
  const summaryPath = path.join(TEMP_DOCS_PATH, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`✅ Creado: ${summaryPath}`);
  
  console.log('✨ Documentación preparada para Compodoc');
}

function cleanupDocs() {
  console.log('🧹 Limpiando archivos temporales...');
  
  if (fs.existsSync(TEMP_DOCS_PATH)) {
    fs.rmSync(TEMP_DOCS_PATH, { recursive: true, force: true });
    console.log('✅ Archivos temporales eliminados');
  }
}

// Ejecutar según el argumento
const action = process.argv[2];

if (action === 'prepare') {
  prepareDocs();
} else if (action === 'cleanup') {
  cleanupDocs();
} else {
  console.log('Uso: node prepare-docs-for-compodoc.js [prepare|cleanup]');
}