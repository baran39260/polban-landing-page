const fs = require('fs');
const path = require('path');

// Lightweight JS minifier (no external deps)
function simpleMinifyJS(code) {
  // Remove single-line and multi-line comments, then collapse whitespace
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
    .replace(/(^|[^:])\/\/.*$/gm, '$1') // line comments (not after colon to avoid URLs)
    .replace(/\n+/g, '\n')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,:<>\[\]=+\-*/%&|!?])\s*/g, '$1')
    .trim();
}

// Lightweight CSS minifier (no external deps)
function simpleMinifyCSS(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // comments
    .replace(/\n+/g, '\n')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,>~+])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function main() {
  const baseDir = __dirname;
  const jsIn = path.join(baseDir, 'script.js');
  const cssIn = path.join(baseDir, 'styles.css');

  const jsOut = path.join(baseDir, 'script.min.js');
  const cssOut = path.join(baseDir, 'styles.min.css');

  const jsSource = readText(jsIn);
  const cssSource = readText(cssIn);

  if (!jsSource && !cssSource) {
    console.log('Nothing to minify. Missing script.js and styles.css');
    process.exit(0);
  }

  if (jsSource) {
    try {
      const minified = simpleMinifyJS(jsSource);
      writeText(jsOut, minified);
      console.log(`JS minified → ${path.basename(jsOut)} (${minified.length} bytes)`);
    } catch (e) {
      console.error('Failed to minify JS:', e.message);
      process.exitCode = 1;
    }
  }

  if (cssSource) {
    try {
      const minified = simpleMinifyCSS(cssSource);
      writeText(cssOut, minified);
      console.log(`CSS minified → ${path.basename(cssOut)} (${minified.length} bytes)`);
    } catch (e) {
      console.error('Failed to minify CSS:', e.message);
      process.exitCode = 1;
    }
  }
}

if (require.main === module) {
  main();
}

