# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static landing page for Polban, a multilingual financial management application. The site is built with vanilla HTML/CSS/JavaScript and features a comprehensive localization system with RTL (right-to-left) support for Persian and Arabic.

## Development Commands

```bash
# Install dependencies
npm install

# Start local development server (required for CORS - don't open index.html directly)
npm start
# Server runs at http://localhost:8080

# Convert images to WebP format
npm run convert
```

Alternative servers if needed:
- Python 3: `python -m http.server 8080`
- npx: `npx http-server`

## Architecture Overview

### Localization System

The site uses a custom `data-translate` attribute-based localization system:

**Core Pattern:**
- Translation keys are stored in `src/locales/en.json` and `src/locales/fa.json` as nested objects
- HTML elements use `data-translate="path.to.key"` to mark translatable content
- The system automatically finds and updates all `[data-translate]` elements on language change
- For attributes (placeholders, aria-labels), use `data-translate-attr="placeholder"` alongside `data-translate`

**Key Files:**
- `src/js/localization.js`: Core localization logic, exports `LocalizationManager` class
- `src/locales/*.json`: Translation files with ~150+ keys each
- `src/css/rtl.css`: RTL-specific styles that activate when `dir="rtl"`

**Global Interface:**
```javascript
window.localizationManager.getTranslation(key)  // Get translation by key
window.t(key, fallback)                         // Get translation with fallback
window.localizationManager.applyLanguage(lang)  // Switch language ('en' or 'fa')
window.localizationManager.getCurrentLanguage() // Returns 'en' or 'fa'
window.localizationManager.isCurrentRTL()       // Returns boolean
```

**Events:**
- `languageChanged` event fires on document when language switches
- Event detail contains `{ language, isRTL }`

**Special Hooks:**
- `window.updateTypingPhrases(phrases)` is called by localization.js to update hero typing animation (used by script.js)

### RTL Behavior

When language switches to Persian/Arabic:
1. `document.documentElement.dir` changes to "rtl"
2. `document.documentElement.lang` updates to language code
3. RTL-specific CSS from `rtl.css` activates via `[dir="rtl"]` selectors
4. Persian fonts (Vazirmatn, IRANSansX) apply automatically
5. Animations adjust (e.g., slide directions reverse)

**Critical Rule:** When modifying layout/positioning, always check both LTR and RTL behavior. Test with language switcher.

### Image Asset Conventions

Images in `assets/images/` follow a dual-format pattern:
- WebP versions: `gallery-1.webp`, `gallery-1_thumb.webp`, `gallery-1_medium.webp`
- Fallback JPG/PNG: `gallery-1.jpg`, `gallery-1_thumb.jpg`
- HTML uses `<picture>` elements with `<source>` for responsive/progressive loading

**Image Scripts:**
- `convert_to_webp.js`: Converts images to WebP (run via `npm run convert`)
- `check_image_sizes.js`: Validates image dimensions
- Both scripts assume the naming pattern above

## Page Structure

- `index.html`: Main landing page (entry point)
- `pages/`: Secondary pages (blog, contact, privacy, terms, post1)
- `test_localization.html`, `demo_localization.html`, `debug_localization.html`: Testing utilities

All pages should initialize localization with:
```javascript
initPolbanLocalization({
    basePath: './src/locales/',  // Adjust path for pages/ subdirectory
    autoCreateSwitcher: true
});
```

## Adding New Translatable Content

1. Add entries to both `src/locales/en.json` and `src/locales/fa.json`:
   ```json
   {
     "section_name": {
       "title": "English Title",
       "description": "English description"
     }
   }
   ```

2. Mark HTML element:
   ```html
   <h2 data-translate="section_name.title">Fallback Text</h2>
   ```

3. For attributes:
   ```html
   <input
     data-translate="contact.name_placeholder"
     data-translate-attr="placeholder"
     placeholder="Fallback">
   ```

## Key Interactions (script.js)

- **Typing Animation**: Hero section typing effect uses `hero.typing_phrases` from translations
- **Gallery**: Carousel and grid view with lightbox functionality
- **Theme Toggle**: Light/dark mode with localStorage persistence
- **Hamburger Menu**: Mobile navigation toggle

## Testing Localization

Open `test_localization.html` for automated tests or `demo_localization.html` for quick manual verification. Console logging is verbose during localization operations - use it to debug translation key issues.

## Content Security Policy

The site has a restrictive CSP in `<meta>` tags. When adding external resources, update CSP directives in the HTML files.

## Deployment

Static site deployable to any hosting. GitHub Pages deployment:
- Use `deploy_to_github.ps1` (PowerShell) or `deploy.bat`
- Or manually: `git push -u origin main` and enable Pages in repo settings

See `README.md` and `GITHUB_DEPLOYMENT_GUIDE.md` for details.

## Critical Patterns to Preserve

1. **Never bypass the HTTP server requirement**: Translation files load via fetch() - CORS will block direct file:// access
2. **Always update both locale files**: Missing keys in one language will fall back to the key name
3. **Respect data-translate patterns**: The system relies on `querySelectorAll('[data-translate]')` - don't break this contract
4. **Test RTL after layout changes**: RTL styles in `rtl.css` may need updates when modifying positioning/flexbox
5. **Language switcher location**: Auto-created in `.header-actions` container - don't remove this element
