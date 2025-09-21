# Polban Landing Page

## Overview
This is a static multilingual landing page for Polban, a financial management application. The website showcases the app's features with full support for English and Persian (Farsi) languages, including proper RTL layout support.

## Project Structure
- **Type**: Static website (HTML, CSS, JavaScript)
- **Languages Supported**: English (en) and Persian (fa) with RTL support
- **Assets**: Optimized images in WebP format with fallbacks
- **Features**: Theme toggle, typing animation, responsive design, accessibility

## Setup Details
- **Server**: HTTP server running on port 5000
- **Host Configuration**: Configured to bind to 0.0.0.0 for Replit environment
- **Dependencies**: Node.js with sharp for image processing and http-server for serving
- **Workflow**: Static Website Server running npx http-server with CORS enabled
- **Deployment**: Configured for autoscale deployment target

## Architecture
```
├── assets/images/          # Optimized images and icons
├── pages/                  # Secondary HTML pages
├── src/
│   ├── css/               # Stylesheets (including RTL support)
│   ├── js/                # JavaScript (localization, animations)
│   └── locales/           # Translation files (en.json, fa.json)
├── index.html             # Main landing page
├── package.json           # Node.js dependencies
└── utility scripts        # Image conversion and minification
```

## Key Features Implemented
- ✅ Multilingual support with dynamic language switching
- ✅ RTL layout support for Persian/Arabic
- ✅ Responsive design with theme toggle (light/dark)
- ✅ Typing animation with localized phrases
- ✅ Lazy loading gallery with WebP image optimization
- ✅ Accessibility features and proper semantic HTML
- ✅ SEO optimization with structured data

## Deployment Configuration
- **Target**: Autoscale (suitable for static websites)
- **Command**: `npx http-server . -p 5000 -a 0.0.0.0 --cors -c-1`
- **Port**: 5000 (frontend)
- **Cache Control**: Disabled (-c-1) for development

## Recent Changes
- 2025-09-21: Initial Replit environment setup completed
- 2025-09-21: HTTP server configured with proper host settings
- 2025-09-21: Workflow and deployment configuration completed
- 2025-09-21: All functionality tested and verified working

## User Preferences
- Prefers clean, production-ready code
- Focus on accessibility and multilingual support
- Optimized performance with WebP images and proper caching