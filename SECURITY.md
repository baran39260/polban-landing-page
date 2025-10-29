Exact CSP used in index.html (meta tag):

```
default-src 'self'; style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; script-src 'self' https://www.googletagmanager.com; img-src 'self' data: https://www.google-analytics.com; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com;
```

This CSP is implemented via the `<meta http-equiv="Content-Security-Policy">` tag in HTML files and should be kept in sync with documentation.

### Directive Explanations

#### default-src 'self'
- Only allows resources from the same origin (polban.app)
- Acts as a fallback for other directives that don't specify allowed sources

#### style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com
- 'self': Self-hosted CSS files (assets/css/)
- https://cdnjs.cloudflare.com: Font Awesome CSS from Cloudflare CDN
- https://fonts.googleapis.com: Google Fonts API for Vazirmatn and IRANSansX

#### font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com
- 'self': Self-hosted font files
- https://cdnjs.cloudflare.com: Font Awesome font files
- https://fonts.gstatic.com: Google Fonts font files

#### script-src 'self' https://www.googletagmanager.com
- 'self': Self-hosted JavaScript files (src/js/script.js, src/js/localization.js)
- https://www.googletagmanager.com: Google Tag Manager for loading gtag.js

#### img-src 'self' data: https://www.google-analytics.com
- 'self': Self-hosted images
- data:: Data URIs for small inline images
- https://www.google-analytics.com: Google Analytics tracking pixels

#### connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com
- 'self': AJAX requests to same origin
- https://fonts.googleapis.com https://fonts.gstatic.com: Google Fonts API calls
- https://www.google-analytics.com: Google Analytics data transmission

### Known Limitations
- **No CSP reporting**: Violations are not logged (future improvement)
- **Static site constraints**: Cannot use server-side nonce generation

### Roadmap for CSP Improvements
1. **Phase 1**: Migrate GA to external file (remove 'unsafe-inline')
2. **Phase 2**: Implement nonce-based CSP for remaining inline scripts
3. **Phase 3**: Add CSP violation reporting
4. **Phase 4**: Regular CSP audits and updates

## Subresource Integrity (SRI)

SRI ensures that CDN resources haven't been tampered with by verifying their cryptographic hash. If a resource is modified, the browser refuses to load it.

### Font Awesome 6.4.0

- **URL**: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
- **Hash**: sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==
- **Algorithm**: SHA-512
- **Last Verified**: 2024-10-01
- **Implementation**: Added integrity, crossorigin="anonymous", referrerpolicy="no-referrer" attributes

### How to Update SRI Hashes

1. **Get the new hash**:
   - Visit https://cdnjs.com/libraries/font-awesome
   - Find the desired version
   - Copy the SRI hash from the "Copy SRI" button

2. **Alternative method**:
   - Use https://www.srihash.org
   - Enter the CDN URL
   - Copy the generated hash

3. **Update the code**:
   - Replace the integrity attribute in all HTML files
   - Update the Last Verified date in this document
   - Test thoroughly in multiple browsers

4. **Verification**:
   - Load the page and check DevTools Network tab
   - Ensure no "Failed to find a valid digest" errors
   - Verify Font Awesome icons display correctly

### Why SRI Matters
- **CDN Compromise Protection**: Prevents loading malicious scripts if CDN is hacked
- **Supply Chain Security**: Ensures resource integrity throughout delivery
- **Browser Enforcement**: Modern browsers (97%+ support) automatically verify hashes

## Google Analytics Configuration

### Current Status
- **Implementation**: GA via gtag.js (loaded from GTM) with placeholder ID `G-XXXXXXXXXX`
- **Pages**: index.html, contact.html, blog.html, privacy.html, terms.html
- **CSP Support**: Allowed domains for GTM/GA without using `'unsafe-inline'`

### Replacing Placeholder ID
1. Get your GA4 Measurement ID from Google Analytics
2. Replace `G-XXXXXXXXXX` in all HTML files
3. Test GA tracking in Google Analytics Real-Time reports
4. Update this document with actual ID (do not commit real ID to public repo)

### Removing Google Analytics Completely
If GA is not needed:
1. Delete all GA `<script>` blocks from HTML files
2. Update CSP to remove GA domains:
   ```
   script-src 'self';
   img-src 'self' data:;
   connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;