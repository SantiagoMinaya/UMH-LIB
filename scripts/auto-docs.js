const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando monitor de documentación automática...');

// Configuración de rutas a monitorear
const watchPaths = [
  'src/app/components/**/*.ts',
  'src/app/services/**/*.ts',
  'src/app/directives/**/*.ts',
  'src/app/pipes/**/*.ts'
];

// Función para generar documentación completa
function generateDocs() {
  console.log('📚 Generando documentación completa...');
  
  // Primero genera los .md, luego la documentación
  exec('npm run docs:full', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error generando documentación:', error.message);
      return;
    }
    if (stderr) {
      console.error('⚠️ Advertencias:', stderr);
    }
    console.log('✅ Documentación generada exitosamente');
  });
}

// Configurar el watcher
const watcher = chokidar.watch(watchPaths, {
  ignored: /node_modules/,
  persistent: true,
  ignoreInitial: true
});

// Debounce para evitar múltiples ejecuciones
let timeout;
function debouncedGenerate() {
  clearTimeout(timeout);
  timeout = setTimeout(generateDocs, 2000);
}

// Eventos del watcher
watcher
  .on('add', (filePath) => {
    console.log(`📄 Archivo creado: ${path.basename(filePath)}`);
    debouncedGenerate();
  })
  .on('change', (filePath) => {
    console.log(`📝 Archivo modificado: ${path.basename(filePath)}`);
    debouncedGenerate();
  })
  .on('unlink', (filePath) => {
    console.log(`🗑️ Archivo eliminado: ${path.basename(filePath)}`);
    debouncedGenerate();
  })
  .on('error', (error) => {
    console.error('❌ Error en el watcher:', error);
  });

console.log('👀 Monitoreando cambios en componentes...');
console.log('Presiona Ctrl+C para detener');

// Generar documentación inicial
generateDocs();