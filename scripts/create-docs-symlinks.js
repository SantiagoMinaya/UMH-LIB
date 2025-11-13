const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Script para crear enlaces simbólicos de archivos .md para Compodoc
 */

const COMPONENTS_PATH = 'src/app/components';
const DOCS_SYMLINKS_PATH = 'docs-symlinks';

function createSymlinks() {
  console.log('🔗 Creando enlaces simbólicos para documentación...');
  
  // Limpiar y crear directorio de enlaces simbólicos
  if (fs.existsSync(DOCS_SYMLINKS_PATH)) {
    fs.rmSync(DOCS_SYMLINKS_PATH, { recursive: true, force: true });
  }
  fs.mkdirSync(DOCS_SYMLINKS_PATH, { recursive: true });
  
  // Buscar todos los archivos .md en subcarpetas docs/
  const mdFiles = glob.sync(`${COMPONENTS_PATH}/**/docs/*.md`);
  
  console.log(`Encontrados ${mdFiles.length} archivos .md`);
  
  const summaryEntries = [];
  
  mdFiles.forEach(mdFile => {
    const fileName = path.basename(mdFile);
    const componentName = path.basename(path.dirname(path.dirname(mdFile)));
    const symlinkPath = path.join(DOCS_SYMLINKS_PATH, `${componentName}.md`);
    const absoluteMdPath = path.resolve(mdFile);
    
    try {
      // Crear enlace simbólico
      fs.symlinkSync(absoluteMdPath, symlinkPath, 'file');
      console.log(`✅ Enlace creado: ${symlinkPath} -> ${mdFile}`);
      
      // Añadir entrada al summary
      summaryEntries.push({
        title: `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component`,
        file: `${componentName}.md`
      });
    } catch (error) {
      console.log(`⚠️ No se pudo crear enlace para ${mdFile}: ${error.message}`);
      // Fallback: copiar archivo si no se puede crear symlink
      fs.copyFileSync(mdFile, symlinkPath);
      console.log(`📋 Copiado como fallback: ${symlinkPath}`);
      
      summaryEntries.push({
        title: `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component`,
        file: `${componentName}.md`
      });
    }
  });
  
  // Crear summary.json
  const summaryPath = path.join(DOCS_SYMLINKS_PATH, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summaryEntries, null, 2));
  console.log(`✅ Creado: ${summaryPath}`);
  
  console.log('✨ Enlaces simbólicos creados para Compodoc');
}

function cleanupSymlinks() {
  console.log('🧹 Limpiando enlaces simbólicos...');
  
  if (fs.existsSync(DOCS_SYMLINKS_PATH)) {
    fs.rmSync(DOCS_SYMLINKS_PATH, { recursive: true, force: true });
    console.log('✅ Enlaces simbólicos eliminados');
  }
}

// Ejecutar según el argumento
const action = process.argv[2];

if (action === 'create') {
  createSymlinks();
} else if (action === 'cleanup') {
  cleanupSymlinks();
} else {
  console.log('Uso: node create-docs-symlinks.js [create|cleanup]');
}