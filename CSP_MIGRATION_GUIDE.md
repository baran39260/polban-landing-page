// Server-side (Node.js/Express)
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com;`
  );
  next();
});

// In HTML template
<script nonce="<%= nonce %>">
  // Google Analytics code
</script>
```

### Option B: Build-Time Nonce Injection

برای static sites مناسب‌تر. Nonce در build time تولید می‌شود و فایل‌های HTML با nonce generate می‌شوند.

**مثال با build script:**

```javascript
// build-with-nonce.js
const crypto = require('crypto');
const fs = require('fs');

const nonce = crypto.randomBytes(16).toString('base64');
let html = fs.readFileSync('index.html', 'utf8');

// Replace CSP
html = html.replace(
  /script-src 'self' 'unsafe-inline'/,
  `script-src 'self' 'nonce-${nonce}'`
);

// Add nonce to inline scripts
html = html.replace(
  /<script>/g,
  `<script nonce="${nonce}">`
);

fs.writeFileSync('dist/index.html', html);