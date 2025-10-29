## 🔧 راهنمای مشکلات رایج و راه‌حل‌ها

این فایل یک **knowledge base** از مشکلات رایجی است که ممکن است در testing پیدا شوند و راه‌حل‌های آن‌ها.

### بخش 1: Lighthouse Issues

**Issue: Performance Score < 90**

**علت‌های احتمالی:**
1. تصاویر بهینه نشده‌اند
2. CSS/JS minified نشده‌اند
3. Fonts بهینه نشده‌اند
4. Too many requests
5. Large bundle sizes

**راه‌حل:**
- بررسی "Opportunities" section در Lighthouse
- اجرای `npm run convert` برای WebP conversion
- اجرای `npm run build` برای minification
- بررسی Network tab برای large resources
- استفاده از CDN برای static assets

**مثال خاص:**
- اگر "Properly size images" می‌بینید → اضافه کردن width/height به `<img>` tags
- اگر "Eliminate render-blocking resources" می‌بینید → استفاده از `<link rel="preload">` برای critical CSS
- اگر "Reduce unused CSS" می‌بینید → حذف unused styles یا code splitting

---

**Issue: Accessibility Score < 95**

**علت‌های احتمالی:**
1. Color contrast کافی نیست
2. ARIA labels missing هستند
3. Touch targets کوچک‌تر از 24×24px
4. Form inputs بدون labels
5. Images بدون alt text

**راه‌حل:**
- کلیک روی هر accessibility issue در Lighthouse
- بررسی "Learn more" link برای راهنمایی
- استفاده از WAVE یا axe DevTools برای جزئیات بیشتر

**مثال‌های خاص:**
- "Background and foreground colors do not have sufficient contrast" → تغییر رنگ‌ها در `src/css/styles.css` (خطوط 1-57)
- "Buttons do not have an accessible name" → اضافه کردن `aria-label` به buttons در HTML
- "Tap targets are not sized appropriately" → افزایش اندازه در CSS (مثلاً carousel dots در خط 1597)

---

**Issue: SEO Score < 95**

**علت‌های احتمالی:**
1. Missing meta description
2. Missing title tag
3. Placeholder URLs
4. Invalid structured data
5. Missing canonical URL

**راه‌حل:**
- بررسی `<head>` section در HTML
- جایگزینی placeholder URLs با domain واقعی
- تست structured data با https://search.google.com/test/rich-results

---

### بخش 2: Core Web Vitals Issues

**Issue: LCP > 2.5s**

**علت‌های احتمالی:**
1. Hero image خیلی بزرگ است
2. Hero image بدون `fetchpriority="high"`
3. Fonts blocking render هستند
4. CSS blocking render است

**راه‌حل:**
- بررسی hero image در `index.html` (خط 106)
- اطمینان از وجود `fetchpriority="high"`
- اطمینان از وجود `width` و `height` attributes
- بررسی font loading strategy (باید `display=swap` داشته باشد)
- استفاده از `<link rel="preload">` برای critical resources

**Debug:**
- DevTools → Performance → Record page load
- پیدا کردن LCP element (معمولاً hero image)
- بررسی timing: چه زمانی شروع به load شد؟
- بررسی: آیا resources دیگر آن را block کردند؟

---

**Issue: CLS > 0.1**

**علت‌های احتمالی:**
1. Images بدون dimensions
2. Fonts بدون fallback
3. Dynamic content injection
4. Ads یا embeds

**راه‌حل:**
- اضافه کردن `width` و `height` به همه `<img>` tags
- استفاده از `font-display: swap` برای fonts
- Reserve کردن space برای dynamic content
- استفاده از `aspect-ratio` CSS property

**Debug:**
- DevTools → Performance → Record
- بررسی "Experience" section برای layout shifts
- Identify کردن elements که shift می‌کنند
- Fix کردن dimensions

---

**Issue: INP > 200ms**

**علت‌های احتمالی:**
1. JavaScript خیلی سنگین
2. Event handlers inefficient
3. Long tasks blocking main thread
4. Too many animations

**راه‌حل:**
- بررسی `src/js/script.js` برای heavy operations
- استفاده از debouncing/throttling برای event handlers
- Code splitting برای large JavaScript files
- استفاده از `requestAnimationFrame` برای animations

---

### بخش 3: Translation Issues

**Issue: متن‌ها ترجمه نمی‌شوند**

**علت‌های احتمالی:**
1. Translation key missing در JSON file
2. `data-translate` attribute اشتباه است
3. LocalizationManager initialize نشده
4. JSON syntax error

**راه‌حل:**
- باز کردن Console و بررسی errors
- بررسی `src/locales/fa.json` برای missing keys
- بررسی `data-translate` attribute در HTML
- Validate کردن JSON syntax

**Debug:**
```javascript
// در Console تایپ کنید:
window.localizationManager.getTranslation('hero.title')
// اگر undefined برگشت → key missing است
```

---

**Issue: RTL layout شکسته است**

**علت‌های احتمالی:**
1. `rtl.css` load نمی‌شود
2. CSS rules override می‌شوند
3. Inline styles RTL را break می‌کنند
4. JavaScript animations RTL-aware نیستند

**راه‌حل:**
- بررسی Network tab: آیا `rtl.css` با 200 OK load شد?
- بررسی `[dir="rtl"]` selectors در `src/css/rtl.css`
- بررسی Computed styles در DevTools
- بررسی animations در `src/js/script.js` (خطوط 1455-1468)

---

**Issue: فونت‌های فارسی load نمی‌شوند**

**علت‌های احتمالی:**
1. Google Fonts blocked است (CSP یا network)
2. Font files missing هستند (اگر self-hosted)
3. `@font-face` rules اشتباه هستند
4. `unicode-range` مشکل دارد

**راه‌حل:**
- بررسی Network tab → Filter: Font
- بررسی: آیا Vazirmatn و IRANSansX load شدند؟
- بررسی Console برای font loading errors
- بررسی CSP: آیا `fonts.googleapis.com` و `fonts.gstatic.com` allowed هستند؟

**Debug:**
```javascript
// در Console:
document.fonts.check('1em Vazirmatn')
// اگر false → font load نشده
```

---

### بخش 4: Keyboard Navigation Issues

**Issue: Tab navigation کار نمی‌کند**

**علت‌های احتمالی:**
1. Elements دارای `tabindex="-1"` هستند
2. Elements hidden هستند (`display: none`)
3. Focus trap bug دارد
4. JavaScript focus را می‌دزدد

**راه‌حل:**
- بررسی element در DevTools → Properties → tabIndex
- بررسی Computed styles → display, visibility
- بررسی `src/js/script.js` برای focus management code
- Disable کردن JavaScript و تست مجدد

---

**Issue: Focus indicators نمایش داده نمی‌شوند**

**علت‌های احتمالی:**
1. CSS `outline: none` دارد
2. Focus styles override شده‌اند
3. در dark theme کم‌رنگ هستند
4. `:focus-visible` support نمی‌شود

**راه‌حل:**
- بررسی `src/css/styles.css` (خطوط 2729-2765)
- اطمینان از وجود `:focus` و `:focus-visible` styles
- تست در dark theme
- استفاده از `:focus` به جای `:focus-visible` برای compatibility بیشتر

---

**Issue: Focus trap کار نمی‌کند**

**علت‌های احتمالی:**
1. Focusable elements لیست نشده‌اند
2. Event listener attach نشده
3. Logic اشتباه است

**راه‌حل:**
- بررسی `src/js/script.js`:
  - Mobile menu focus trap: خطوط 897-923
  - Lightbox focus trap: باید اضافه شده باشد
- بررسی Console برای JavaScript errors
- Debug با `console.log` در event handlers

---

### بخش 5: Responsive Design Issues

**Issue: Horizontal scroll در mobile**

**علت‌های احتمالی:**
1. Element width > viewport width
2. Negative margins
3. Fixed width elements
4. Overflow hidden نیست

**راه‌حل:**
- باز کردن DevTools → Elements
- Hover روی elements برای دیدن dimensions
- پیدا کردن element که overflow می‌کند
- بررسی CSS: `max-width: 100%` اضافه کنید
- بررسی: `box-sizing: border-box` استفاده شده؟

**Debug:**
```javascript
// در Console:
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.log('Overflow element:', el);
  }
});
```

---

**Issue: Touch targets خیلی کوچک هستند**

**علت‌های احتمالی:**
1. Buttons padding کم دارند
2. `min-width` و `min-height` set نشده‌اند
3. Font-size خیلی کوچک است

**راه‌حل:**
- بررسی Lighthouse → "Tap targets are not sized appropriately"
- کلیک "Learn more" برای لیست elements
- اضافه کردن `min-width: 44px; min-height: 44px` در CSS
- افزایش padding

**مثال خاص:**
- Carousel dots: افزایش از 12×12px به 24×24px در `src/css/styles.css` (خط 1597)

---

### بخش 6: Form Validation Issues

**Issue: Error messages نمایش داده نمی‌شوند**

**علت‌های احتمالی:**
1. JavaScript error در validation logic
2. `showError()` function کار نمی‌کند
3. CSS برای `.error-message` missing است

**راه‌حل:**
- بررسی Console برای JavaScript errors
- بررسی `src/js/script.js` → `showError()` function (خط 1091)
- بررسی CSS برای `.error-message` class
- تست با intentionally invalid data

---

**Issue: Form submit نمی‌شود**

**علت‌های احتمالی:**
1. Validation failing است
2. Event listener attach نشده
3. `preventDefault()` فراخوانی نشده

**راه‌حل:**
- بررسی Console برای errors
- بررسی `pages/contact.html` (خطوط 196-211)
- تست با valid data
- بررسی Network tab برای form submission

---

### بخش 7: Gallery & Lightbox Issues

**Issue: Lightbox باز نمی‌شود**

**علت‌های احتمالی:**
1. JavaScript error
2. Event listener attach نشده
3. Lightbox element missing است
4. CSS `display: none` override شده

**راه‌حل:**
- بررسی Console برای errors
- بررسی `src/js/script.js` → `openLightbox()` function (خط 367)
- بررسی HTML: آیا lightbox element وجود دارد؟ (خطوط 506-550 در index.html)
- بررسی CSS: `.lightbox.active` باید `display: flex` داشته باشد

---

**Issue: Carousel navigation کار نمی‌کند**

**علت‌های احتمالی:**
1. `galleryData` array empty است
2. Event listeners attach نشده‌اند
3. `updateCarouselSlide()` error دارد

**راه‌حل:**
- بررسی Console برای errors
- بررسی `src/js/script.js` → `galleryData` initialization
- بررسی `updateCarouselSlide()` function (خط 296)
- تست با different slides

---

### بخش 8: Theme & Language Issues

**Issue: Theme toggle کار نمی‌کند**

**علت‌های احتمالی:**
1. Event listener missing است
2. `applyTheme()` function error دارد
3. localStorage blocked است
4. CSS variables support نمی‌شوند

**راه‌حل:**
- بررسی Console برای errors
- بررسی `src/js/script.js` → theme toggle event listener (خط 849)
- بررسی `applyTheme()` function (خط 838)
- تست در incognito mode (برای localStorage)
- بررسی browser support برای CSS variables

---

**Issue: Language preference ذخیره نمی‌شود**

**علت‌های احتمالی:**
1. localStorage blocked است (privacy mode)
2. `setLanguage()` localStorage را set نمی‌کند
3. Browser localStorage را clear می‌کند

**راه‌حل:**
- تست در normal mode (نه incognito)
- بررسی `src/js/localization.js` → `setLanguage()` method
- بررسی Application tab → Local Storage در DevTools
- بررسی: آیا key "polban_language" وجود دارد؟

---

### بخش 9: Performance Issues

**Issue: صفحه خیلی کند load می‌شود**

**علت‌های احتمالی:**
1. تصاویر خیلی بزرگ هستند
2. Too many HTTP requests
3. JavaScript blocking است
4. Fonts بهینه نشده‌اند

**راه‌حل:**
- بررسی Network tab → Size column
- بررسی: کدام resource بزرگ‌ترین است؟
- بررسی: چند request داریم؟ (باید < 50 باشد)
- اجرای image optimization
- اجرای CSS/JS minification

**Benchmark:**
- Total page size: < 3MB
- Number of requests: < 50
- Largest resource: < 500KB
- Load time: < 3s (Fast 3G)

---

**Issue: Animations janky هستند**

**علت‌های احتمالی:**
1. Animating non-composited properties (مثلاً `width`, `height`)
2. Too many animations همزمان
3. JavaScript animations به جای CSS
4. Main thread busy است

**راه‌حل:**
- استفاده از `transform` و `opacity` برای animations (GPU-accelerated)
- بررسی `src/css/styles.css` برای animation properties
- استفاده از `will-change` برای hint دادن به browser
- کاهش تعداد animations همزمان

---

### بخش 10: Security Issues

**Issue: CSP violations در Console**

**علت‌های احتمالی:**
1. Inline scripts بدون nonce
2. External resources not allowed
3. CSP syntax error

**راه‌حل:**
- خواندن CSP violation message در Console
- بررسی CSP meta tag در HTML (خط 5)
- اضافه کردن domain به appropriate directive
- یا استفاده از nonce برای inline scripts

**مثال:**
```
Refused to load script from 'https://example.com/script.js' 
because it violates the following CSP directive: "script-src 'self'"
```
→ راه‌حل: اضافه کردن `https://example.com` به `script-src`

---

**Issue: SRI verification failed**

**علت‌های احتمالی:**
1. Hash اشتباه است
2. CDN file تغییر کرده
3. Network proxy hash را تغییر داده

**راه‌حل:**
- دریافت hash جدید از https://cdnjs.com
- بررسی: آیا URL صحیح است؟
- بررسی: آیا version number صحیح است؟
- تست در network دیگر

---

### بخش 11: Browser-Specific Issues

**Safari:**
- **Issue**: CSS Grid layout متفاوت است
- **راه‌حل**: استفاده از `-webkit-` prefixes
- **Issue**: Fonts render متفاوت است
- **راه‌حل**: تست و adjust کردن font-weight

**Firefox:**
- **Issue**: Flexbox behavior متفاوت است
- **راه‌حل**: استفاده از explicit flex properties
- **Issue**: Scrollbar همیشه visible است
- **راه‌حل**: استفاده از `scrollbar-width: thin`

**Edge:**
- **Issue**: معمولاً مشابه Chrome است
- **راه‌حل**: تست برای اطمینان

**IE11 (اگر support می‌کنید):**
- **Issue**: CSS variables support نمی‌شود
- **راه‌حل**: استفاده از PostCSS برای fallbacks
- **Issue**: Flexbox bugs
- **راه‌حل**: استفاده از flexbox fixes

---

## 📞 دریافت کمک

**اگر مشکلی پیدا کردید که در این لیست نیست:**

1. جستجو در GitHub Issues
2. جستجو در Stack Overflow
3. بررسی MDN Web Docs
4. پرسیدن در community forums
5. ایجاد GitHub Issue با:
   - توضیح دقیق مشکل
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots
   - Browser/OS information
   - Console errors

---

## 🔄 Update این فایل

**هر بار که مشکل جدیدی پیدا کردید:**
1. مشکل را document کنید
2. راه‌حل را document کنید
3. به این فایل اضافه کنید
4. Commit کنید

این فایل یک **living document** است که باید با تجربیات تیم رشد کند.