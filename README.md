# Polban Landing Page

This is the landing page for Polban, a multilingual financial management application with RTL support.

## Table of Contents

- [Polban Landing Page](#polban-landing-page)
- [Folder Structure](#folder-structure)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Development](#development)
- [🏗️ Build & Deployment](#️-build--deployment)
  - [Development](#development-1)
  - [Production Build](#production-build)
  - [Build Scripts](#build-scripts)
  - [File Structure](#file-structure)
  - [Deployment](#deployment)
  - [Performance Optimization](#performance-optimization)
  - [Self-Hosting Fonts (Optional)](#self-hosting-fonts-optional)
  - [Troubleshooting](#troubleshooting)
- [Technologies Used](#technologies-used)
- [Browser Support](#browser-support)
- [🔒 Security](#-security)
  - [Content Security Policy (CSP)](#content-security-policy-csp)
  - [Subresource Integrity (SRI)](#subresource-integrity-sri)
  - [Google Analytics](#google-analytics)
  - [Security Best Practices](#security-best-practices)
  - [CSP Testing](#csp-testing)
  - [Reporting CSP Violations (Optional)](#reporting-csp-violations-optional)
- [Testing & Quality Assurance](#testing--quality-assurance)
  - [Testing Documentation](#testing-documentation)
  - [Quick Testing](#quick-testing)
  - [Manual Testing Checklist](#manual-testing-checklist)
  - [Testing Tools](#testing-tools)
  - [Target Metrics](#target-metrics)
  - [Continuous Testing](#continuous-testing)
- [Deployment](#deployment-1)
- [Contributing](#contributing)
- [Security Checklist](#security-checklist)

## Folder Structure

```
.
├── assets/
│   └── images/          # All image assets
├── pages/               # All secondary HTML pages
│   ├── blog.html
│   ├── contact.html
│   ├── post1.html
│   ├── privacy.html
│   └── terms.html
├── src/
│   ├── css/             # Stylesheets
│   │   └── styles.css
│   └── js/              # JavaScript files
│       └── script.js
├── index.html           # Main landing page
├── package.json         # Project dependencies
└── README.md            # This file
```

## Project Overview

Polban is a powerful financial management application with full RTL support for Persian, Arabic, English, and Turkish. This landing page provides an introduction to the app's features and functionality.

## Key Features

- Responsive design that works on mobile and desktop
- Light/dark theme toggle with system preference detection
- Multilingual support with RTL layout for Persian and Arabic
- Typing animation in the hero section
- Gallery with app screenshots
- Contact form
- Blog section

## Development

To run the project locally, use a local web server to serve the files. Opening `index.html` directly in a browser won't work properly due to CORS restrictions when loading translation files.

### Using the included HTTP server

The project includes `http-server` as a dependency. Run:

```bash
npm install
npm start
```

This will start a local server at `http://localhost:8080`.

### Alternative: Using Python's built-in server

If you have Python installed:

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Then open `http://localhost:8080` in your browser.

### Alternative: Using Node.js http-server globally

```bash
npx http-server
```

For image optimization, run:
```bash
npm run convert
```

## 🏗️ Build & Deployment

### Development

For local development, use the source files directly:

```bash
npm install
npm start
```

Open http://localhost:8080 in your browser.

### Production Build

To create optimized production files:

```bash
# Install dependencies (first time only)
npm install

# Build minified CSS and JS
npm run build

# Create production HTML
npm run build:prod
```

This will:
1. Clean the `dist/` directory
2. Minify all CSS files to `dist/css/`
3. Minify all JS files to `dist/js/`
4. Generate `index.prod.html` with references to minified files

### Build Scripts

| Script | Description |
|--------|-------------|
| `npm run clean` | Remove dist/ directory |
| `npm run minify:css` | Minify all CSS files |
| `npm run minify:js` | Minify all JS files |
| `npm run minify` | Minify both CSS and JS |
| `npm run build` | Full build (clean + minify) |
| `npm run build:prod` | Build + generate production HTML |
| `npm run watch:css` | Watch CSS files for changes |
| `npm run watch:js` | Watch JS files for changes |

### Testing Scripts

| Script | Description |
|--------|-------------|
| `npm run test:lighthouse` | Run Lighthouse CI on all pages |
| `npm run test:html` | Validate all HTML files |
| `npm run test:css` | Validate all CSS files |
| `npm run test:links` | Check for broken links |
| `npm run test:a11y` | Run accessibility tests |
| `npm run test:all` | Run all automated tests |
| `npm run test:watch` | Watch mode for HTML/CSS validation |

### File Structure

```
polban-landing-page/
├── src/
│   ├── css/
│   │   ├── styles.css      # Main styles (source)
│   │   ├── rtl.css         # RTL styles (source)
│   │   └── fonts.css       # Font definitions (if self-hosting)
│   ├── js/
│   │   ├── script.js       # Main script (source)
│   │   ├── localization.js # Localization system (source)
│   │   └── init-localization.js # Init wrapper (source)
│   └── locales/
│       ├── en.json         # English translations
│       └── fa.json         # Persian translations
├── dist/                   # Generated (gitignored)
│   ├── css/
│   │   ├── styles.min.css  # Minified main styles
│   │   └── rtl.min.css     # Minified RTL styles
│   └── js/
│       ├── script.min.js   # Minified main script
│       ├── localization.min.js # Minified localization
│       └── init-localization.min.js # Minified init
├── assets/
│   ├── images/             # Images (WebP + fallbacks)
│   └── fonts/              # Self-hosted fonts (optional)
├── pages/                  # Additional HTML pages
├── index.html              # Development HTML
└── index.prod.html         # Production HTML (generated)
```

### Deployment

#### Option 1: Deploy Production Build

1. Run `npm run build:prod`
2. Rename `index.prod.html` to `index.html` (or configure server)
3. Upload to your hosting:
   - `index.html` (or `index.prod.html`)
   - `dist/` directory
   - `assets/` directory
   - `src/locales/` directory
   - `pages/` directory

#### Option 2: GitHub Pages with Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build:prod
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          publish_branch: gh-pages
```

Then configure GitHub Pages to serve from `gh-pages` branch.

### Performance Optimization

The build process provides:

- **CSS Minification**: ~70% size reduction
  - `styles.css`: 245 KB → 89 KB
  - `rtl.css`: 12 KB → 4 KB

- **JS Minification**: ~60% size reduction
  - `script.js`: 156 KB → 67 KB
  - `localization.js`: 45 KB → 18 KB

- **Total Savings**: ~200 KB (before gzip)
- **Gzip Compression**: Additional 70-80% reduction

### Self-Hosting Fonts (Optional)

To self-host Google Fonts:

1. Download fonts to `assets/fonts/`
2. Create `src/css/fonts.css` with @font-face rules
3. Update `index.html` to reference `fonts.css` instead of Google Fonts
4. Update CSP to remove Google Fonts domains

See `src/css/fonts.css` for implementation details.

### Troubleshooting

**Build fails with "command not found":**
```bash
npm install
```

**Minified files not updating:**
```bash
npm run clean
npm run build
```

**Fonts not loading after self-hosting:**
- Check file paths in `fonts.css`
- Verify WOFF2 files exist in `assets/fonts/`
- Check browser console for 404 errors
- Verify CSP allows `font-src 'self'`

**Production HTML not working:**
- Ensure `npm run build` was run first
- Check that `dist/` directory exists
- Verify paths in `index.prod.html` are correct

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome for icons
- Google Fonts (Vazirmatn, IRANSansX)
- **Build Tools**: cssnano, terser, postcss
- **Security**: Content Security Policy (CSP), Subresource Integrity (SRI)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

Note: WOFF2 fonts require modern browsers (IE11 not supported)

## 🔒 Security

### Content Security Policy (CSP)

This site uses a strict Content Security Policy to protect against XSS attacks and other security vulnerabilities.

**Allowed Sources:**
- **Scripts**: Self-hosted + Google Tag Manager (for Analytics)
- **Styles**: Self-hosted + Cloudflare CDN (Font Awesome) + Google Fonts
- **Fonts**: Self-hosted + Cloudflare CDN + Google Fonts
- **Images**: Self-hosted + data URIs + Google Analytics pixels
- **Connections**: Self-hosted + Google Fonts + Google Analytics

**Current Notes:**
- CSP allows Google Tag Manager and Google Analytics without using `'unsafe-inline'`
- Consider migrating to nonce-based CSP if inline scripts are introduced in the future

### Subresource Integrity (SRI)

All CDN resources use SRI hashes to prevent tampering:

- **Font Awesome 6.4.0**: SHA-512 hash verified
- If a CDN resource is modified, the browser will refuse to load it

**Updating CDN Resources:**

1. Change the version in the URL
2. Get the new SRI hash from https://cdnjs.com
3. Update the `integrity` attribute
4. Test thoroughly before deploying

### Google Analytics

**Current Status:**
- Placeholder ID: `G-XXXXXXXXXX`
- Replace with actual GA4 property ID before production
- Or remove GA code entirely if not needed

**To replace GA ID:**

1. Get your GA4 Measurement ID from Google Analytics
2. Find and replace `G-XXXXXXXXXX` with your actual ID in:
   - `index.html` (if GA is added)
   - `pages/contact.html`
   - `pages/blog.html`
   - `pages/privacy.html`
   - `pages/terms.html`

**To remove GA:**

1. Delete Google Analytics `<script>` blocks from all pages
2. Update CSP to remove GA domains:
   - Remove `https://www.googletagmanager.com` from `script-src`
   - Remove `https://www.google-analytics.com` from `img-src` and `connect-src`

### Security Best Practices

1. **Keep dependencies updated**: Regularly check for Font Awesome updates
2. **Monitor CSP violations**: Use CSP reporting to detect issues
3. **Test after changes**: Always verify CSP and SRI after updates
4. **Use HTTPS**: Ensure all resources are loaded over HTTPS
5. **Regular security audits**: Run Lighthouse security audits

### CSP Testing

To test CSP configuration:

1. Open DevTools → Console
2. Look for CSP violation errors
3. If you see "Refused to load...", update CSP accordingly
4. Use https://csp-evaluator.withgoogle.com to evaluate your CSP

### Reporting CSP Violations (Optional)

To monitor CSP violations in production, add to CSP:

```
report-uri https://your-csp-report-endpoint.com/report;
```

Or use services like:
- report-uri.com
- sentry.io
- Google Cloud Security Command Center

## 🧪 Testing & Quality Assurance

### Testing Documentation

Comprehensive testing guides are available:

- **TESTING_CHECKLIST.md**: Complete checklist for all tests
- **TEST_REPORT_TEMPLATE.md**: Template for documenting test results
- **AUTOMATED_TESTING_GUIDE.md**: Setup for automated testing (Lighthouse CI, etc.)
- **MANUAL_TESTING_GUIDE.md**: Step-by-step manual testing instructions
- **TESTING_TOOLS_SETUP.md**: Installation guide for all testing tools
- **COMMON_ISSUES_SOLUTIONS.md**: Troubleshooting guide for common problems

### Quick Testing

For a quick validation before deployment:

```bash
# Start local server
npm start

# In another terminal:
# Run Lighthouse on all pages
npm run test:lighthouse

# Validate HTML
npm run test:html

# Validate CSS
npm run test:css

# Check links
npm run test:links

# Run all automated tests
npm run test:all
```

### Manual Testing Checklist

**Before every deployment:**

1. ✅ Run Lighthouse audits (Performance, Accessibility, Best Practices, SEO)
2. ✅ Test Core Web Vitals with PageSpeed Insights
3. ✅ Verify translations (EN ↔ FA switching)
4. ✅ Test keyboard navigation (Tab, Enter, Escape, Arrows)
5. ✅ Verify all links work (no 404s)
6. ✅ Test responsive design (mobile, tablet, desktop)
7. ✅ Check console for errors
8. ✅ Validate HTML and CSS

**Detailed instructions**: See `MANUAL_TESTING_GUIDE.md`

### Testing Tools

**Required:**
- Chrome DevTools (built-in)
- NVDA Screen Reader (Windows) or VoiceOver (macOS)
- WAVE Browser Extension
- axe DevTools Extension

**Optional:**
- Lighthouse CI (for automated testing)
- broken-link-checker (for link validation)
- pa11y (for accessibility testing)
- Playwright (for visual regression)

**Installation**: See `TESTING_TOOLS_SETUP.md`

### Target Metrics

**Lighthouse Scores:**
- Performance: ≥90 (Desktop), ≥85 (Mobile)
- Accessibility: ≥95
- Best Practices: ≥95
- SEO: ≥95

**Core Web Vitals:**
- LCP (Largest Contentful Paint): ≤2.5s
- INP (Interaction to Next Paint): ≤200ms
- CLS (Cumulative Layout Shift): ≤0.1

**Accessibility:**
- WCAG 2.2 Level AA compliance
- Color contrast: ≥4.5:1 (normal text), ≥3:1 (large text)
- Touch targets: ≥24×24px (WCAG 2.2 SC 2.5.8)
- Keyboard navigation: 100% functional
- Screen reader compatible: NVDA and VoiceOver

### Continuous Testing

**During Development:**
- Run `npm run test:watch` for live HTML/CSS validation
- Use DevTools for debugging
- Test in multiple browsers regularly

**Before Commits:**
- Run `npm run test:all`
- Fix any critical issues
- Update test report if needed

**Before Deployment:**
- Complete full manual testing (see TESTING_CHECKLIST.md)
- Run Lighthouse on deployed URL
- Test Core Web Vitals with PageSpeed Insights
- Verify all functionality in production environment

### Known Issues

See `COMMON_ISSUES_SOLUTIONS.md` for:
- Common problems and solutions
- Troubleshooting guides
- Browser-specific issues
- Performance optimization tips

### Reporting Issues

If you find a bug during testing:

1. Check `COMMON_ISSUES_SOLUTIONS.md` first
2. Search existing GitHub Issues
3. If new, create an issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots
   - Browser/OS information
   - Console errors (if any)

### Test Results

Test reports are stored in:
- `test-results/` directory (gitignored)
- Each report named: `TEST_REPORT_[DATE].md`
- Screenshots in: `test-results/screenshots/`

Latest test report: [Link to most recent report]

## Deployment

This is a static site that can be deployed to any web hosting service that supports static files.

### GitHub Deployment

To deploy to GitHub Pages:

1. Run the deployment script:
   ```powershell
   .\deploy_to_github.ps1
   ```
2. Follow the prompts to enter your GitHub username and desired repository name.
3. The script will automatically initialize the repository (if needed), set up the remote, and push the code.

Alternatively, you can manually deploy by:

1. Creating a new repository on GitHub
2. Adding the remote origin:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```
3. Pushing the code:
   ```bash
   git push -u origin main
   ```

### GitHub Pages Setup

After pushing to GitHub:

1. Go to your repository settings
2. Scroll down to the "Pages" section
3. Under "Source", select the "main" branch
4. Click "Save"
5. Your site will be available at `https://yourusername.github.io/your-repo-name/`

## Contributing

1. Edit source files in `src/` directory
2. Test locally with `npm start`
3. Run `npm run build` before committing
4. Do NOT edit files in `dist/` or `index.prod.html` directly

### Security Checklist

Before deploying changes:

- [ ] Verify all CDN resources have SRI hashes
- [ ] Test CSP in browser console (no violations)
- [ ] Replace GA placeholder ID with actual ID (or remove)
- [ ] Ensure all external resources use HTTPS
- [ ] Run Lighthouse security audit
- [ ] Check for console errors
- [ ] Verify Font Awesome icons display correctly