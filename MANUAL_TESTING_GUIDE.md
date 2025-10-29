## 👤 راهنمای Manual Testing (دستورالعمل گام‌به‌گام)

این فایل یک **راهنمای عملیاتی** برای testers است که می‌خواهند manual testing انجام دهند.

### 🎯 هدف:

این راهنما برای افرادی است که:
- تجربه کمی در web testing دارند
- نیاز به دستورالعمل‌های دقیق دارند
- می‌خواهند consistent testing انجام دهند

---

## 📱 بخش 1: راه‌اندازی محیط تست

### مرحله 1.1: نصب ابزارهای لازم

**Browser:**
- نصب Chrome (latest version)
- نصب Firefox (latest version)
- نصب Edge (اگر Windows دارید)

**Screen Reader:**
- **Windows**: دانلود و نصب NVDA از https://www.nvaccess.org/download/
- **macOS**: VoiceOver از قبل نصب است (Cmd+F5 برای فعال‌سازی)

**Browser Extensions:**
- WAVE Evaluation Tool: https://wave.webaim.org/extension/
- axe DevTools: https://www.deque.com/axe/devtools/
- ColorZilla: برای color picking

### مرحله 1.2: راه‌اندازی Local Server

**روش A: استفاده از npm (توصیه می‌شود)**
```bash
cd polban-landing-page
npm install
npm start
```

سایت در `http://localhost:8080` در دسترس است.

**روش B: استفاده از Python**
```bash
cd polban-landing-page
python -m http.server 8080
```

**روش C: استفاده از VS Code Live Server**
- نصب Live Server extension
- Right-click روی index.html
- "Open with Live Server"

### مرحله 1.3: آماده‌سازی Test Environment

- [ ] باز کردن یک text editor برای note-taking
- [ ] آماده کردن screenshot tool (Snipping Tool, Snagit, etc.)
- [ ] ایجاد پوشه `test-results/` برای screenshots
- [ ] باز کردن TEST_REPORT_TEMPLATE.md

---

## 🔍 بخش 2: Lighthouse Testing (گام‌به‌گام)

### مرحله 2.1: تست index.html در Desktop

**گام 1**: باز کردن Chrome
**گام 2**: رفتن به `http://localhost:8080/index.html`
**گام 3**: فشار دادن F12 (باز کردن DevTools)
**گام 4**: کلیک روی tab "Lighthouse" (اگر ندیدید، روی >> کلیک کنید)
**گام 5**: انتخاب:
- ✅ Performance
- ✅ Accessibility
- ✅ Best Practices
- ✅ SEO
**گام 6**: Device: Desktop
**گام 7**: کلیک "Analyze page load"
**گام 8**: منتظر ماندن (~30 ثانیه)
**گام 9**: بررسی نتایج:

**اگر Performance < 90:**
- Scroll به "Opportunities" section
- یادداشت کردن suggestions (مثلاً "Properly size images")
- Screenshot گرفتن

**اگر Accessibility < 95:**
- Scroll به "Accessibility" section
- کلیک روی هر issue برای جزئیات
- یادداشت کردن location و description
- Screenshot گرفتن

**اگر Best Practices < 95:**
- بررسی issues (معمولاً CSP، HTTPS، console errors)
- یادداشت کردن

**اگر SEO < 95:**
- بررسی missing meta tags
- بررسی structured data
- یادداشت کردن

**گام 10**: Screenshot گرفتن از کل report
**گام 11**: ذخیره در `test-results/lighthouse-index-desktop.png`
**گام 12**: ثبت scores در TEST_REPORT

### مرحله 2.2: تست index.html در Mobile

**همان مراحل بالا اما:**
- گام 6: Device: Mobile
- گام 11: ذخیره در `test-results/lighthouse-index-mobile.png`

### مرحله 2.3: تکرار برای صفحات دیگر

**همین فرآیند را برای این URLs تکرار کنید:**
- `http://localhost:8080/pages/contact.html`
- `http://localhost:8080/pages/blog.html`
- `http://localhost:8080/pages/privacy.html`
- `http://localhost:8080/pages/terms.html`

**نکته**: هر صفحه ~5 دقیقه طول می‌کشد (Desktop + Mobile)

---

## 🌐 بخش 3: Translation Testing (گام‌به‌گام)

### مرحله 3.1: تست Language Switching در index.html

**گام 1**: باز کردن `http://localhost:8080/index.html`
**گام 2**: بررسی زبان فعلی (باید English باشد)
**گام 3**: کلیک روی language switcher (دکمه با icon globe)
**گام 4**: بررسی تغییرات:

**Visual Check:**
- [ ] متن hero title تغییر کرد؟ ("Polban" → "پولبان")
- [ ] متن navigation تغییر کرد؟ ("Features" → "ویژگی‌ها")
- [ ] Direction تغییر کرد؟ (text راست‌چین شد)
- [ ] Font تغییر کرد؟ (به Vazirmatn/IRANSansX)

**گام 5**: Scroll کردن به پایین صفحه
**گام 6**: بررسی هر section:

**Features Section:**
- [ ] همه 9 feature card ترجمه شده‌اند؟
- [ ] Titles فارسی هستند?
- [ ] Descriptions فارسی هستند?

**Download Section:**
- [ ] Button texts ترجمه شده‌اند؟
- [ ] "Coming Soon" badges فارسی هستند؟
- [ ] Tooltips (hover روی disabled buttons) فارسی هستند؟

**Gallery Section:**
- [ ] View toggle buttons ترجمه شده‌اند؟
- [ ] Filter buttons ترجمه شده‌اند؟
- [ ] Gallery captions ترجمه شده‌اند؟

**FAQ Section:**
- [ ] Questions ترجمه شده‌اند؟
- [ ] Answers ترجمه شده‌اند؟

**About Section:**
- [ ] Title و description ترجمه شده‌اند؟

**Footer:**
- [ ] Copyright text ترجمه شده؟
- [ ] Links ترجمه شده‌اند؟

**گام 7**: باز کردن Console (F12)
**گام 8**: بررسی warnings:
- اگر "Translation key not found" دیدید → یادداشت کنید
- اگر JavaScript error دیدید → یادداشت کنید

**گام 9**: Refresh صفحه (F5)
**گام 10**: بررسی: آیا زبان فارسی باقی ماند؟ (localStorage persistence)

**گام 11**: کلیک مجدد language switcher
**گام 12**: بررسی: آیا به English برگشت؟

### مرحله 3.2: تست RTL Layout

**با زبان فارسی:**

**گام 1**: تغییر زبان به فارسی
**گام 2**: بررسی visual alignment:

**Navigation:**
- [ ] Logo در سمت راست است؟
- [ ] Navigation links از راست شروع می‌شوند؟
- [ ] Language switcher در سمت چپ است؟

**Hero Section:**
- [ ] Text راست‌چین است؟
- [ ] Buttons alignment صحیح است؟
- [ ] Image در سمت صحیح است؟

**Features Grid:**
- [ ] Cards از راست به چپ چیده شده‌اند؟
- [ ] Icons در سمت راست text هستند؟

**Gallery:**
- [ ] Grid از راست شروع می‌شود؟
- [ ] Carousel navigation: prev/next جهت صحیح دارند؟
- [ ] Filter buttons راست‌چین هستند؟

**گام 3**: تست animations:
- [ ] Scroll کردن به پایین
- [ ] بررسی: animations از راست می‌آیند (نه چپ)?
- [ ] بررسی: fade/slide effects صحیح هستند؟

**گام 4**: Screenshot گرفتن از صفحه در RTL mode
**گام 5**: مقایسه با LTR mode برای consistency

### مرحله 3.3: تست در صفحات دیگر

**همین فرآیند را برای این صفحات تکرار کنید:**
- contact.html
- blog.html
- privacy.html
- terms.html

**نکته**: بررسی کنید زبان در همه صفحات consistent است (اگر در index.html فارسی انتخاب کردید، contact.html هم باید فارسی باشد).

---

## ⌨️ بخش 4: Keyboard Navigation Testing (گام‌به‌گام)

### مرحله 4.1: Tab Navigation Test

**گام 1**: باز کردن index.html
**گام 2**: کلیک در address bar (برای reset focus)
**گام 3**: فشار دادن Tab
**گام 4**: بررسی: آیا "Skip to content" link focus شد؟
- باید یک outline واضح (3px) داشته باشد
- باید box-shadow داشته باشد
- باید animation داشته باشد (focusPulse)

**گام 5**: فشار دادن Tab مکرر و یادداشت کردن ترتیب:

**ترتیب مورد انتظار:**
1. Skip to content
2. Logo
3. Features link
4. About link
5. Gallery link
6. FAQ link
7. Contact link
8. Download link
9. Blog link
10. Language switcher
11. Theme toggle
12. Hamburger (در mobile)
13. Hero CTA buttons (2 عدد)
14. Feature cards (9 عدد)
15. ... (ادامه)

**گام 6**: بررسی focus indicators:
- [ ] همه elements دارای outline 3px هستند؟
- [ ] همه elements دارای box-shadow هستند؟
- [ ] در dark theme هم واضح هستند؟
- [ ] با hover state متفاوت هستند؟

**گام 7**: Screenshot گرفتن از چند focus state
**گام 8**: یادداشت کردن هر مشکل

### مرحله 4.2: Keyboard Shortcuts Test

**Gallery Testing:**

**گام 1**: Scroll به Gallery section
**گام 2**: Tab تا رسیدن به اولین gallery item
**گام 3**: فشار دادن Enter
**گام 4**: بررسی: آیا lightbox باز شد؟
**گام 5**: فشار دادن Arrow Right
**گام 6**: بررسی: آیا به تصویر بعدی رفت؟
**گام 7**: فشار دادن Arrow Left
**گام 8**: بررسی: آیا به تصویر قبلی برگشت؟
**گام 9**: فشار دادن Escape
**گام 10**: بررسی: آیا lightbox بسته شد و focus به gallery item برگشت؟

**Carousel Testing:**

**گام 1**: تغییر view به Carousel
**گام 2**: Tab تا رسیدن به carousel prev button
**گام 3**: فشار دادن Enter
**گام 4**: بررسی: آیا slide تغییر کرد؟
**گام 5**: فشار دادن Arrow Right
**گام 6**: بررسی: آیا به slide بعدی رفت؟
**گام 7**: Tab تا رسیدن به carousel dots
**گام 8**: فشار دادن Enter روی یک dot
**گام 9**: بررسی: آیا به آن slide رفت؟

**FAQ Testing:**

**گام 1**: Scroll به FAQ section
**گام 2**: Tab تا رسیدن به اولین FAQ item
**گام 3**: فشار دادن Enter
**گام 4**: بررسی: آیا accordion باز شد؟
**گام 5**: فشار دادن Enter مجدد
**گام 6**: بررسی: آیا accordion بسته شد؟
**گام 7**: فشار دادن Space
**گام 8**: بررسی: آیا toggle کرد؟

### مرحله 4.3: Focus Trap Test

**Mobile Menu:**

**گام 1**: تغییر viewport به mobile (F12 → Toggle Device Toolbar)
**گام 2**: کلیک hamburger menu
**گام 3**: فشار دادن Tab مکرر
**گام 4**: بررسی: آیا focus فقط در داخل menu می‌چرخد؟
**گام 5**: بررسی: آیا نمی‌تواند به پشت menu برود؟
**گام 6**: فشار دادن Escape
**گام 7**: بررسی: آیا menu بسته شد؟
**گام 8**: بررسی: آیا focus به hamburger button برگشت؟

**Lightbox:**

**گام 1**: باز کردن یک gallery item
**گام 2**: فشار دادن Tab مکرر
**گام 3**: بررسی: آیا focus فقط بین این elements می‌چرخد:
- Close button
- Previous button
- Next button
- Image (برای zoom)
**گام 4**: بررسی: آیا نمی‌تواند به پشت lightbox برود؟
**گام 5**: فشار دادن Escape
**گام 6**: بررسی: آیا lightbox بسته شد؟
**گام 7**: بررسی: آیا focus به gallery item برگشت؟

---

## 🔊 بخش 5: Screen Reader Testing (گام‌به‌گام)

### مرحله 5.1: NVDA Setup (Windows)

**گام 1**: باز کردن NVDA (Ctrl+Alt+N)
**گام 2**: منتظر ماندن تا "NVDA started" بشنوید
**گام 3**: باز کردن Chrome
**گام 4**: رفتن به `http://localhost:8080/index.html`

### مرحله 5.2: Navigation با NVDA

**Heading Navigation:**

**گام 1**: فشار دادن H (jump to next heading)
**گام 2**: گوش دادن: باید بشنوید "Polban heading level 1"
**گام 3**: فشار دادن H مجدد
**گام 4**: گوش دادن: باید بشنوید heading بعدی
**گام 5**: تکرار تا آخر صفحه
**گام 6**: یادداشت کردن: آیا همه headings به ترتیب خوانده شدند؟

**Button Navigation:**

**گام 1**: فشار دادن B (jump to next button)
**گام 2**: گوش دادن به button label
**گام 3**: بررسی: آیا label واضح و descriptive است?
**گام 4**: تکرار برای همه buttons
**گام 5**: یادداشت کردن buttons با labels ضعیف

**Link Navigation:**

**گام 1**: فشار دادن K (jump to next link)
**گام 2**: گوش دادن به link text
**گام 3**: بررسی: آیا link purpose واضح است?
**گام 4**: تکرار برای همه links

**Form Navigation (در contact.html):**

**گام 1**: رفتن به contact.html
**گام 2**: فشار دادن F (jump to next form field)
**گام 3**: گوش دادن: باید label + "required" بشنوید
**گام 4**: تکرار برای همه fields
**گام 5**: بررسی: آیا error messages خوانده می‌شوند؟

### مرحله 5.3: ARIA Testing

**Language Switcher:**
- فشار دادن Tab تا رسیدن به language switcher
- گوش دادن: باید بشنوید "Switch language to Persian. Current language: English"
- کلیک کردن
- گوش دادن: باید بشنوید "Switch language to English. Current language: Persian"

**Theme Toggle:**
- Tab تا theme toggle
- گوش دادن: باید بشنوید "Switch to dark mode. Current theme: light mode"
- کلیک کردن
- گوش دادن: باید بشنوید "Switch to light mode. Current theme: dark mode"

**Filter Buttons:**
- Tab تا filter buttons
- گوش دادن: باید بشنوید "Show dashboard screenshots"
- کلیک کردن
- گوش دادن: باید state change اعلام شود

**Carousel Dots:**
- Tab تا carousel dots
- گوش دادن: باید بشنوید "Dashboard Overview - Slide 1 of 6"
- Arrow Right
- گوش دادن: باید بشنوید "Financial Analytics - Slide 2 of 6"

**گام نهایی**: یادداشت کردن همه ARIA labels که unclear یا missing هستند

---

## 📱 بخش 6: Responsive Design Testing (گام‌به‌گام)

### مرحله 6.1: Mobile Testing (375px)

**گام 1**: باز کردن Chrome DevTools (F12)
**گام 2**: کلیک Toggle Device Toolbar (Ctrl+Shift+M)
**گام 3**: انتخاب "iPhone 12 Pro" (390×844)
**گام 4**: Refresh صفحه
**گام 5**: بررسی layout:

**Navigation:**
- [ ] Hamburger menu نمایش داده می‌شود؟
- [ ] Full navigation مخفی است؟
- [ ] Language switcher و theme toggle نمایش داده می‌شوند؟

**Hero Section:**
- [ ] Title خوانا است (font-size مناسب)?
- [ ] Buttons full-width هستند؟
- [ ] Image به درستی scale شده؟
- [ ] بدون horizontal scroll?

**Features:**
- [ ] Cards در 1 column چیده شده‌اند؟
- [ ] Spacing مناسب است؟
- [ ] Icons و text aligned هستند؟

**Download Buttons:**
- [ ] Buttons به اندازه کافی بزرگ هستند (≥44×44px)?
- [ ] Tooltips در mobile کار می‌کنند؟
- [ ] Badges خوانا هستند؟

**Gallery:**
- [ ] View toggle buttons خوانا هستند؟
- [ ] Filter buttons در 2 یا 3 column؟
- [ ] Grid: 1 column
- [ ] Carousel: full-width
- [ ] Lightbox: full-screen

**گام 6**: تست touch interactions:
- [ ] Tap روی buttons کار می‌کند؟
- [ ] Swipe در carousel کار می‌کند؟
- [ ] Pinch to zoom کار می‌کند (اگر enabled)?

**گام 7**: Screenshot گرفتن
**گام 8**: یادداشت کردن issues

### مرحله 6.2: Tablet Testing (768px)

**همان مراحل بالا اما:**
- Device: iPad Mini (768×1024)
- بررسی: 2-column layouts
- بررسی: navigation ممکن است full باشد یا hamburger

### مرحله 6.3: Desktop Testing (1920px)

**همان مراحل بالا اما:**
- Device: Responsive → 1920×1080
- بررسی: 3-column layouts
- بررسی: full navigation
- بررسی: hover effects

### مرحله 6.4: Breakpoint Transition Testing

**گام 1**: شروع از 320px
**گام 2**: کشیدن viewport به آرامی تا 2560px
**گام 3**: بررسی: آیا transitions smooth هستند؟
**گام 4**: بررسی: آیا در هیچ نقطه‌ای layout نمی‌شکند؟
**گام 5**: یادداشت کردن breakpoints که مشکل دارند

---

## 🔗 بخش 7: Link Verification (گام‌به‌گام)

### مرحله 7.1: Manual Link Testing

**گام 1**: باز کردن index.html
**گام 2**: کلیک روی هر link در navigation:
- Features → باید به #features scroll کند
- About → باید به #about scroll کند
- Gallery → باید به #gallery scroll کند
- FAQ → باید به #faq scroll کند
- Contact → باید به pages/contact.html برود
- Download → باید به #download scroll کند
- Blog → باید به pages/blog.html برود

**گام 3**: بررسی smooth scroll:
- [ ] آیا scroll smooth است (نه instant jump)?
- [ ] آیا به section صحیح می‌رود؟

**گام 4**: تست external links:
- کلیک Cafe Bazaar button
- بررسی: آیا در tab جدید باز می‌شود?
- بررسی: آیا به URL صحیح می‌رود?

**گام 5**: تست disabled buttons:
- کلیک Google Play button
- بررسی: آیا هیچ اتفاقی نمی‌افتد؟ (نباید کلیک شود)

**گام 6**: باز کردن Network tab (F12)
**گام 7**: Refresh صفحه
**گام 8**: بررسی:
- [ ] همه resources با status 200?
- [ ] هیچ 404 error نیست؟
- [ ] هیچ failed request نیست?

**گام 9**: یادداشت کردن همه broken links

### مرحله 7.2: Cross-Page Navigation

**گام 1**: از index.html به contact.html
**گام 2**: از contact.html به blog.html
**گام 3**: از blog.html به privacy.html
**گام 4**: از privacy.html به terms.html
**گام 5**: از terms.html به index.html (via logo)
**گام 6**: بررسی: آیا همه navigations کار کردند؟

---

## ✅ بخش 8: Validation Testing (گام‌به‌گام)

### مرحله 8.1: HTML Validation

**گام 1**: رفتن به https://validator.w3.org/#validate_by_upload
**گام 2**: کلیک "Choose File"
**گام 3**: انتخاب `index.html`
**گام 4**: کلیک "Check"
**گام 5**: منتظر ماندن (~10 ثانیه)
**گام 6**: بررسی نتایج:

**اگر Errors:**
- خواندن هر error
- یادداشت کردن line number
- یادداشت کردن description
- Screenshot گرفتن

**اگر Warnings:**
- بررسی: آیا قابل ignore هستند؟
- یادداشت کردن warnings مهم

**گام 7**: Screenshot گرفتن از نتایج
**گام 8**: تکرار برای همه HTML files

### مرحله 8.2: CSS Validation

**گام 1**: رفتن به https://jigsaw.w3.org/css-validator/#validate_by_upload
**گام 2**: Upload کردن `src/css/styles.css`
**گام 3**: کلیک "Check"
**گام 4**: بررسی نتایج (مشابه HTML validation)
**گام 5**: تکرار برای `src/css/rtl.css`

### مرحله 8.3: Console Error Check

**گام 1**: باز کردن index.html
**گام 2**: F12 → Console tab
**گام 3**: Refresh صفحه (Ctrl+R)
**گام 4**: بررسی console:

**Red errors (باید fix شوند):**
- JavaScript errors
- 404 errors
- CSP violations
- CORS errors

**Yellow warnings (بررسی کنید):**
- Translation key warnings
- Deprecation warnings
- Performance suggestions

**گام 5**: Screenshot گرفتن اگر error دارد
**گام 6**: تکرار برای همه صفحات

---

## 🎨 بخش 9: Visual & Functional Testing

### مرحله 9.1: Theme Toggle Test

**گام 1**: باز کردن index.html (light theme)
**گام 2**: Screenshot گرفتن از hero section
**گام 3**: کلیک theme toggle
**گام 4**: بررسی تغییرات:
- [ ] Background color تغییر کرد؟
- [ ] Text color تغییر کرد؟
- [ ] Icon تغییر کرد (moon → sun)?
- [ ] همه sections تغییر کردند؟
**گام 5**: Screenshot گرفتن از hero section (dark theme)
**گام 6**: مقایسه screenshots
**گام 7**: Refresh صفحه
**گام 8**: بررسی: آیا dark theme حفظ شد؟

### مرحله 9.2: Gallery Functionality Test

**View Toggle:**
- کلیک "Grid View" → بررسی: grid layout نمایش داده می‌شود؟
- کلیک "Carousel View" → بررسی: carousel نمایش داده می‌شود؟

**Filters:**
- کلیک "All Features" → بررسی: همه items نمایش داده می‌شوند؟
- کلیک "Dashboard" → بررسی: فقط dashboard items نمایش داده می‌شوند؟
- کلیک "Analytics" → بررسی: فقط analytics items نمایش داده می‌شوند؟
- تکرار برای همه 7 filters

**Carousel:**
- کلیک next button → بررسی: slide تغییر می‌کند؟
- کلیک prev button → بررسی: به slide قبلی برمی‌گردد؟
- کلیک dot 3 → بررسی: به slide 3 می‌رود؟
- منتظر ماندن 5 ثانیه → بررسی: auto-play کار می‌کند؟

**Lightbox:**
- کلیک یک gallery item → lightbox باز می‌شود؟
- کلیک next → تصویر بعدی نمایش داده می‌شود؟
- کلیک prev → تصویر قبلی نمایش داده می‌شود؟
- کلیک image → zoom toggle می‌شود؟
- کلیک X → lightbox بسته می‌شود؟
- کلیک overlay → lightbox بسته می‌شود؟

### مرحله 9.3: Form Validation Test

**گام 1**: رفتن به contact.html
**گام 2**: کلیک Submit (بدون پر کردن)
**گام 3**: بررسی:
- [ ] Error messages نمایش داده می‌شوند؟
- [ ] Input borders قرمز می‌شوند؟
- [ ] Messages رنگ قرمز دارند؟

**گام 4**: پر کردن name field
**گام 5**: وارد کردن email نامعتبر (مثلاً "test")
**گام 6**: کلیک Submit
**گام 7**: بررسی: error message برای email نمایش داده می‌شود؟

**گام 8**: پر کردن همه fields به درستی
**گام 9**: کلیک Submit
**گام 10**: بررسی:
- [ ] Success message نمایش داده می‌شود؟
- [ ] Form reset می‌شود؟

---

## 📋 بخش 10: Final Checklist

**قبل از اعلام "Ready for Production":**

- [ ] همه Lighthouse scores ≥90 (Performance) و ≥95 (بقیه)
- [ ] Core Web Vitals در محدوده "Good"
- [ ] Translation کامل کار می‌کند (EN ↔ FA)
- [ ] RTL layout صحیح است
- [ ] Keyboard navigation کامل است
- [ ] Screen reader compatible است
- [ ] همه links کار می‌کنند (no 404s)
- [ ] Responsive در همه breakpoints
- [ ] HTML/CSS validation passed
- [ ] No console errors
- [ ] همه features کار می‌کنند
- [ ] Cross-browser tested
- [ ] Test report تکمیل شده

**اگر همه ✅ هستند**: سایت آماده production است! 🎉

**اگر ❌ دارید**: issues را prioritize کنید و fix کنید، سپس re-test.

---

## ⏱️ زمان‌بندی تخمینی:

- Lighthouse (5 pages × 2 devices): ~50 دقیقه
- Translation testing: ~30 دقیقه
- Keyboard navigation: ~45 دقیقه
- Screen reader: ~60 دقیقه
- Responsive design: ~45 دقیقه
- Link verification: ~15 دقیقه
- Validation: ~20 دقیقه
- Functional testing: ~60 دقیقه

**مجموع**: ~5.5 ساعت برای تست کامل

**توصیه**: تست را در 2-3 session انجام دهید تا خستگی نداشته باشید.