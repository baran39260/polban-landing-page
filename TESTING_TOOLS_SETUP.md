# 🛠️ راهنمای نصب و راه‌اندازی ابزارهای تست

این فایل دستورالعمل‌های دقیق برای **نصب و configuration** تمام ابزارهای لازم برای testing است.

## بخش 1: Browser Setup

**Chrome (توصیه می‌شود):**
1. دانلود از https://www.google.com/chrome/
2. نصب
3. باز کردن DevTools (F12)
4. آشنایی با tabs: Elements, Console, Network, Performance, Lighthouse

**Firefox:**
1. دانلود از https://www.mozilla.org/firefox/
2. نصب
3. نصب Firefox Developer Edition (اختیاری اما توصیه می‌شود)

**Safari (macOS):**
1. از قبل نصب است
2. فعال‌سازی Developer menu: Safari → Preferences → Advanced → "Show Develop menu"

**Edge:**
1. در Windows 10/11 از قبل نصب است
2. یا دانلود از https://www.microsoft.com/edge

---

## بخش 2: Screen Reader Setup

**NVDA (Windows) - رایگان:**

**نصب:**
1. رفتن به https://www.nvaccess.org/download/
2. کلیک "Download"
3. اجرای installer
4. انتخاب "Install NVDA on this computer"
5. تکمیل wizard

**راه‌اندازی:**
1. فشار دادن Ctrl+Alt+N (شروع NVDA)
2. منتظر ماندن تا "NVDA started" بشنوید
3. فشار دادن Insert+Q (خروج از NVDA)

**Keyboard Shortcuts مهم:**
- **H**: Jump to next heading
- **B**: Jump to next button
- **K**: Jump to next link
- **F**: Jump to next form field
- **D**: Jump to next landmark
- **Insert+F7**: Elements list
- **Insert+Down Arrow**: Read current line
- **Insert+Up Arrow**: Read from top

**Configuration:**
- NVDA → Preferences → Settings
- Speech → Rate: Medium (برای راحتی)
- Keyboard → "Use CapsLock as NVDA key": Enable (اختیاری)

---

**VoiceOver (macOS/iOS) - رایگان:**

**فعال‌سازی (macOS):**
1. System Preferences → Accessibility → VoiceOver
2. Enable VoiceOver
3. یا فشار دادن Cmd+F5

**فعال‌سازی (iOS):**
1. Settings → Accessibility → VoiceOver
2. Toggle VoiceOver on

**Keyboard Shortcuts (macOS):**
- **VO+H**: Jump to next heading (VO = Ctrl+Option)
- **VO+Command+H**: Headings menu
- **VO+U**: Rotor (navigation menu)
- **VO+Right/Left Arrow**: Navigate elements
- **VO+Space**: Activate element

**Gestures (iOS):**
- **Swipe Right**: Next element
- **Swipe Left**: Previous element
- **Double Tap**: Activate element
- **Two-finger Z**: Escape/Back

---

## بخش 3: Browser Extensions

**WAVE (Web Accessibility Evaluation Tool):**

**نصب:**
1. Chrome: https://chrome.google.com/webstore → جستجو "WAVE"
2. Firefox: https://addons.mozilla.org → جستجو "WAVE"
3. کلیک "Add to Chrome/Firefox"

**استفاده:**
1. باز کردن صفحه مورد نظر
2. کلیک روی WAVE icon در toolbar
3. بررسی:
   - Errors (قرمز): باید fix شوند
   - Alerts (زرد): باید بررسی شوند
   - Features (سبز): accessibility features موجود
   - Structural Elements (آبی): landmarks و headings
   - Contrast Errors: color contrast issues

---

**axe DevTools:**

**نصب:**
1. Chrome: https://chrome.google.com/webstore → جستجو "axe DevTools"
2. کلیک "Add to Chrome"

**استفاده:**
1. باز کردن صفحه
2. F12 → tab "axe DevTools"
3. کلیک "Scan ALL of my page"
4. بررسی:
   - Critical issues
   - Serious issues
   - Moderate issues
   - Minor issues
5. کلیک روی هر issue برای جزئیات
6. "Highlight" برای نمایش element در صفحه

---

**ColorZilla:**

**نصب:**
1. Chrome: https://chrome.google.com/webstore → جستجو "ColorZilla"
2. کلیک "Add to Chrome"

**استفاده برای Contrast Checking:**
1. کلیک ColorZilla icon
2. انتخاب "Pick Color from Page"
3. کلیک روی text color
4. یادداشت کردن hex code
5. کلیک روی background color
6. یادداشت کردن hex code
7. رفتن به https://webaim.org/resources/contrastchecker/
8. وارد کردن foreground و background colors
9. بررسی: آیا نسبت ≥4.5:1 است؟

---

**Check My Links:**

**نصب:**
1. Chrome: https://chrome.google.com/webstore → جستجو "Check My Links"
2. کلیک "Add to Chrome"

**استفاده:**
1. باز کردن صفحه
2. کلیک روی extension icon
3. منتظر ماندن تا scan تمام شود
4. بررسی:
   - Valid links (سبز)
   - Warnings (زرد)
   - Invalid links (قرمز)
5. کلیک روی invalid links برای جزئیات

---

## بخش 4: Command Line Tools

**Node.js و npm:**

**نصب:**
1. دانلود از https://nodejs.org/ (LTS version)
2. نصب
3. تست: `node --version` و `npm --version`

**Lighthouse CI:**
```bash
npm install -g @lhci/cli
lhci --version
```

**broken-link-checker:**
```bash
npm install -g broken-link-checker
blc --version
```

**html-validate:**
```bash
npm install -g html-validate
html-validate --version
```

**pa11y (accessibility):**
```bash
npm install -g pa11y
pa11y --version
```

---

## بخش 5: Online Tools (بدون نصب)

**PageSpeed Insights:**
- URL: https://pagespeed.web.dev/
- نیاز: سایت باید روی URL عمومی deployed باشد
- استفاده: وارد کردن URL و کلیک "Analyze"

**W3C HTML Validator:**
- URL: https://validator.w3.org/
- روش‌های validation:
  - Validate by URI (برای deployed sites)
  - Validate by File Upload (برای local files)
  - Validate by Direct Input (کپی/پیست HTML)

**W3C CSS Validator:**
- URL: https://jigsaw.w3.org/css-validator/
- روش‌های validation مشابه HTML validator

**WebAIM Contrast Checker:**
- URL: https://webaim.org/resources/contrastchecker/
- استفاده: وارد کردن foreground و background colors

**CSP Evaluator:**
- URL: https://csp-evaluator.withgoogle.com/
- استفاده: paste کردن CSP string

**SRI Hash Generator:**
- URL: https://www.srihash.org/
- استفاده: وارد کردن CDN URL

---

## بخش 6: Mobile Testing Setup

**Chrome DevTools Device Emulation:**

**راه‌اندازی:**
1. باز کردن Chrome DevTools (F12)
2. کلیک Toggle Device Toolbar (Ctrl+Shift+M)
3. انتخاب device از dropdown:
   - iPhone SE
   - iPhone 12 Pro
   - iPad Mini
   - iPad Air
   - Samsung Galaxy S20
   - یا "Responsive" برای custom size

**تنظیمات:**
- Throttling: "No throttling" برای تست سریع، "Fast 3G" برای تست واقعی‌تر
- Orientation: Portrait یا Landscape
- Zoom: 100% (default)

**نکته**: Device emulation 100% دقیق نیست - برای تست نهایی از دستگاه واقعی استفاده کنید.

---

**Remote Debugging (دستگاه واقعی):**

**Android:**
1. فعال‌سازی Developer Options در Android
2. فعال‌سازی USB Debugging
3. اتصال به کامپیوتر با USB
4. باز کردن Chrome در موبایل
5. در Chrome desktop: رفتن به `chrome://inspect`
6. انتخاب device و صفحه
7. کلیک "Inspect"

**iOS:**
1. فعال‌سازی Web Inspector: Settings → Safari → Advanced → Web Inspector
2. اتصال iPhone/iPad به Mac با USB
3. باز کردن Safari در iOS
4. در Safari macOS: Develop → [Device Name] → [Page]

---

## بخش 7: Performance Testing Tools

**Chrome DevTools Performance:**

**استفاده:**
1. F12 → Performance tab
2. کلیک Record (یا Ctrl+E)
3. Refresh صفحه
4. منتظر ماندن تا load کامل شود
5. کلیک Stop
6. تحلیل:
   - Main thread activity
   - Long tasks (>50ms)
   - Layout shifts
   - JavaScript execution time

**Chrome DevTools Coverage:**

**استفاده:**
1. F12 → More tools → Coverage
2. کلیک Record
3. Refresh صفحه
4. بررسی:
   - Unused CSS percentage
   - Unused JavaScript percentage
5. Opportunities برای optimization

---

## بخش 8: Troubleshooting

**مشکل: Lighthouse نمی‌تواند صفحه را load کند**
- راه‌حل: مطمئن شوید local server در حال اجرا است
- راه‌حل: بررسی کنید port 8080 available است
- راه‌حل: استفاده از incognito mode

**مشکل: NVDA صدا ندارد**
- راه‌حل: بررسی volume settings
- راه‌حل: بررسی NVDA → Preferences → Speech → Synthesizer
- راه‌حل: Restart NVDA

**مشکل: Extensions کار نمی‌کنند**
- راه‌حل: Disable و Enable مجدد
- راه‌حل: بررسی permissions
- راه‌حل: Update کردن extension

**مشکل: Mobile emulation دقیق نیست**
- راه‌حل: استفاده از دستگاه واقعی
- راه‌حل: استفاده از BrowserStack یا LambdaTest (cloud testing)

---

## ✅ Verification Checklist

**قبل از شروع testing:**

- [ ] Chrome نصب شده (latest version)
- [ ] Firefox نصب شده (latest version)
- [ ] NVDA نصب شده (Windows) یا VoiceOver فعال (macOS)
- [ ] WAVE extension نصب شده
- [ ] axe DevTools extension نصب شده
- [ ] ColorZilla extension نصب شده
- [ ] Check My Links extension نصب شده
- [ ] Node.js و npm نصب شده
- [ ] Local server اجرا می‌شود (npm start)
- [ ] همه command line tools نصب شده‌اند
- [ ] Test report template آماده است
- [ ] Screenshot tool آماده است

**اگر همه ✅ هستند**: آماده شروع testing هستید! 🚀