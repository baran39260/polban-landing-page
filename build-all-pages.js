const fs = require('fs');
const path = require('path');

function buildProductionHTML() {
  console.log('🏗️  Building production HTML for all pages...');
  
  // Process index.html
  processFile('index.html', [
    { from: 'src/css/fonts.css', to: 'dist/css/fonts.min.css', name: 'fonts.css' },
    { from: 'src/css/styles.css', to: 'dist/css/styles.min.css', name: 'styles.css' },
    { from: 'src/css/rtl.css', to: 'dist/css/rtl.min.css', name: 'rtl.css' },
    { from: 'src/js/localization.js', to: 'dist/js/localization.min.js', name: 'localization.js' },
    { from: 'src/js/init-localization.js', to: 'dist/js/init-localization.min.js', name: 'init-localization.js' },
    { from: 'src/js/script.js', to: 'dist/js/script.min.js', name: 'script.js' }
  ]);
  
  // Process pages directory
  const pagesDir = path.join(__dirname, 'pages');
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir);
    files.forEach(file => {
      if (path.extname(file) === '.html') {
        processFile(path.join('pages', file), [
          { from: '../src/css/styles.css', to: '../dist/css/styles.min.css', name: 'styles.css' },
          { from: '../src/css/rtl.css', to: '../dist/css/rtl.min.css', name: 'rtl.css' },
          { from: '../src/js/localization.js', to: '../dist/js/localization.min.js', name: 'localization.js' },
          { from: '../src/js/script.js', to: '../dist/js/script.min.js', name: 'script.js' }
        ]);
      }
    });
    
    // Process blog subdirectory
    const blogDir = path.join(pagesDir, 'blog');
    if (fs.existsSync(blogDir)) {
      const blogFiles = fs.readdirSync(blogDir);
      blogFiles.forEach(file => {
        if (path.extname(file) === '.html') {
          processFile(path.join('pages', 'blog', file), [
            { from: '../../src/css/styles.css', to: '../../dist/css/styles.min.css', name: 'styles.css' },
            { from: '../../src/css/rtl.css', to: '../../dist/css/rtl.min.css', name: 'rtl.css' },
            { from: '../../src/js/localization.js', to: '../../dist/js/localization.min.js', name: 'localization.js' },
            { from: '../../src/js/script.js', to: '../../dist/js/script.min.js', name: 'script.js' }
          ]);
        }
      });
    }
  }
  
  console.log('\n✅ All production HTML files created successfully!');
}

function processFile(filePath, replacements) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`   ⚠ ${filePath}: File not found!`);
    return;
  }
  
  let html = fs.readFileSync(fullPath, 'utf8');
  
  // Apply replacements
  console.log(`\n📝 Processing ${filePath}:`);
  replacements.forEach(({ from, to, name }) => {
    const beforeCount = (html.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (beforeCount > 0) {
      html = html.replaceAll(from, to);
      console.log(`   ✓ ${name}: ${beforeCount} occurrence(s) replaced`);
    }
  });
  
  // Add production comment at the top
  html = html.replace(
    '<!DOCTYPE html>',
    '<!-- Production Build - Generated automatically. Edit the original file instead. -->\n<!DOCTYPE html>'
  );
  
  // Write to production file (same name, in same location)
  const outputPath = fullPath.replace('.html', '.prod.html');
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`   ✅ Production HTML created: ${path.relative(__dirname, outputPath)}`);
}

if (require.main === module) {
  buildProductionHTML();
}

module.exports = { buildProductionHTML };