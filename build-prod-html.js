const fs = require('fs');
const path = require('path');

function buildProductionHTML() {
  console.log('🏗️  Building production HTML...');
  
  // Read index.html
  const htmlPath = path.join(__dirname, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Define replacements with verification
  const replacements = [
    { from: 'src/css/fonts.css', to: 'dist/css/fonts.min.css', name: 'fonts.css' },
    { from: 'src/css/styles.css', to: 'dist/css/styles.min.css', name: 'styles.css' },
    { from: 'src/css/rtl.css', to: 'dist/css/rtl.min.css', name: 'rtl.css' },
    { from: 'src/js/localization.js', to: 'dist/js/localization.min.js', name: 'localization.js' },
    { from: 'src/js/init-localization.js', to: 'dist/js/init-localization.min.js', name: 'init-localization.js' },
    { from: 'src/js/script.js', to: 'dist/js/script.min.js', name: 'script.js' }
  ];
  
  // Apply replacements globally and verify
  console.log('\n📝 Applying replacements:');
  replacements.forEach(({ from, to, name }) => {
    const beforeCount = (html.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    html = html.replaceAll(from, to);
    const afterCount = (html.match(new RegExp(to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    
    if (beforeCount > 0) {
      console.log(`   ✓ ${name}: ${beforeCount} occurrence(s) replaced`);
    } else {
      console.warn(`   ⚠ ${name}: No occurrences found!`);
    }
  });
  
  // Add production comment at the top
  html = html.replace(
    '<!DOCTYPE html>',
    '<!-- Production Build - Generated automatically. Edit index.html instead. -->\n<!DOCTYPE html>'
  );
  
  // Write to index.prod.html
  const outputPath = path.join(__dirname, 'index.prod.html');
  fs.writeFileSync(outputPath, html, 'utf8');
  
  console.log('\n✅ Production HTML created: index.prod.html');
  console.log('   CSS: dist/css/*.min.css');
  console.log('   JS: dist/js/*.min.js');
}

if (require.main === module) {
  buildProductionHTML();
}

module.exports = { buildProductionHTML };