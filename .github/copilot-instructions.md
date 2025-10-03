## Polban Landing Page — AI coding assistant guide

Quick context
- This repo is a static landing site for the Polban app (vanilla HTML/CSS/JS). Main entry: `index.html`.
- JS lives in `src/js/` (notably `localization.js` and `script.js`). Translations are in `src/locales/` (`en.json`, `fa.json`).

What to prioritize
- Preserve RTL behavior: changes to layout must respect `src/css/rtl.css` and `document.documentElement.dir` handling in `src/js/localization.js`.
- Keep `localization.js` patterns intact: language loading, `data-translate` usage, `window.localizationManager`, `languageChanged` event and `updateTypingPhrases` hook used by `script.js`.
- Image asset naming conventions: both WebP and JPG/PNG variants exist in `assets/images/` (e.g. `gallery-1.webp` and `gallery-1.jpg`). Image scripts (`convert_to_webp.js`, `check_image_sizes.js`) assume these naming patterns.

Developer workflows & commands
- Run image conversion: `npm run convert` (runs `convert_to_webp.js`).
- Local preview: run `npm start` to start local HTTP server (required for translations to load), or use `npx http-server`. Opening `index.html` directly won't work due to CORS restrictions.
- Deploy to GitHub Pages: see `README.md` and `deploy_to_github.ps1` (PowerShell) or `deploy.bat`.

Project-specific conventions
- Translation keys map to nested objects (e.g. `hero.typing_phrases`, `navigation.features`). Use the existing JSON shape in `src/locales/en.json` and `fa.json` when adding keys.
- Mark HTML translatable nodes with `data-translate="path.to.key"` or rely on selector-based updates in `localization.js` (many updates are DOM-query based: `.nav-links a`, `.feature-card`, etc.).
- The localization system exposes global helpers: `window.localizationManager.getTranslation(key)`, `window.testLanguageSwitch(lang)`, and emits `languageChanged` events; use these for cross-file communication.

Editing guidance & examples
- To add a new UI string:
  - Add entries to both `src/locales/en.json` and `src/locales/fa.json` following existing nesting.
  - Add `data-translate` to the HTML element or extend `updateElements()` in `src/js/localization.js` to wire complex sections.
  - Example: add `"new_section": { "title": "...", "description": "..." }` and in HTML use `<h2 data-translate="new_section.title">`.

- To modify hero typing phrases: update `hero.typing_phrases` in both locale files; `localization.js` will call `window.updateTypingPhrases()`.

Testing expectations
- Manual: open `test_localization.html` or `index.html` and click the language switcher; ensure `dir` toggles, texts update, and typing animation phrases change.
- Console: localization logs are verbose — use them to trace which translation keys are applied.

Safety notes
- Avoid renaming or moving the `src/locales/` files or changing fetch paths in `localization.js` unless you update `loadTranslations()`.

If unsure, where to look
- Localization behavior: `src/js/localization.js` and `LOCALIZATION_GUIDE.md`.
- UI interactions: `src/js/script.js` (typing animation, gallery, lightbox).
- Image workflows: `convert_to_webp.js`, `check_image_sizes.js`, and `package.json` scripts.

Ask me to iterate if any part of the DOM mapping or translation JSON shape is unclear.
