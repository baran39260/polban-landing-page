# 📋 Testing Checklist جامع

این فایل یک **checklist عملیاتی** برای تست تمام جنبه‌های سایت است که تیم می‌تواند به صورت systematic از آن استفاده کند.

## بخش 1: Pre-Testing Setup
- [ ] نصب ابزارهای لازم (NVDA, browser extensions)
- [ ] Deploy سایت به URL عمومی (GitHub Pages/Netlify)
- [ ] آماده‌سازی test environment
- [ ] ایجاد test report template

## بخش 2: Lighthouse Audits Checklist

برای هر صفحه (index.html, contact.html, blog.html, privacy.html, terms.html):

### Desktop Testing:
- [ ] Performance score ≥90
- [ ] Accessibility score ≥95
- [ ] Best Practices score ≥95
- [ ] SEO score ≥95
- [ ] Screenshot گرفتن از نتایج
- [ ] ثبت issues در test report

### Mobile Testing:
- [ ] Performance score ≥85 (mobile معمولاً کمتر است)
- [ ] Accessibility score ≥95
- [ ] Best Practices score ≥95
- [ ] SEO score ≥95
- [ ] Screenshot گرفتن از نتایج
- [ ] ثبت issues در test report

## بخش 3: Core Web Vitals Checklist

- [ ] Deploy سایت به production URL
- [ ] تست با PageSpeed Insights
- [ ] LCP (Largest Contentful Paint) ≤2.5s
- [ ] INP (Interaction to Next Paint) ≤200ms
- [ ] CLS (Cumulative Layout Shift) ≤0.1
- [ ] Screenshot گرفتن از Field Data
- [ ] Screenshot گرفتن از Lab Data
- [ ] بررسی Opportunities برای بهبود
- [ ] بررسی Diagnostics برای مشکلات

## بخش 4: Translation Testing Checklist

### index.html:
- [ ] کلیک language switcher → زبان تغییر می‌کند
- [ ] Hero title/subtitle ترجمه می‌شوند
- [ ] Navigation links ترجمه می‌شوند
- [ ] Feature cards (9 عدد) ترجمه می‌شوند
- [ ] Download section ترجمه می‌شود
- [ ] Gallery captions ترجمه می‌شوند
- [ ] FAQ questions/answers ترجمه می‌شوند
- [ ] About section ترجمه می‌شود
- [ ] Footer ترجمه می‌شود
- [ ] Direction به RTL تغییر می‌کند (برای فارسی)
- [ ] Fonts به Vazirmatn/IRANSansX تغییر می‌کنند
- [ ] Layout در RTL شکسته نمی‌شود
- [ ] Animations در RTL صحیح هستند
- [ ] Refresh → زبان حفظ می‌شود (localStorage)

### contact.html:
- [ ] Page title ترجمه می‌شود
- [ ] Form labels ترجمه می‌شوند
- [ ] Placeholders ترجمه می‌شوند
- [ ] Submit button ترجمه می‌شود
- [ ] Contact methods ترجمه می‌شوند
- [ ] In-app steps ترجمه می‌شوند
- [ ] Error messages فارسی نمایش داده می‌شوند

### blog.html:
- [ ] Page title ترجمه می‌شود
- [ ] View toggle buttons ترجمه می‌شوند
- [ ] Blog posts (اگر وجود دارند) ترجمه می‌شوند
- [ ] "No posts" message ترجمه می‌شود

### privacy.html & terms.html:
- [ ] Navigation ترجمه می‌شود
- [ ] Footer ترجمه می‌شود
- [ ] Language switcher کار می‌کند

### Missing Keys Check:
- [ ] باز کردن Console
- [ ] تغییر زبان به فارسی
- [ ] بررسی warnings برای missing keys
- [ ] لیست کردن همه missing keys

## بخش 5: Keyboard Navigation Checklist

### Tab Navigation:
- [ ] Tab از اول صفحه تا آخر کار می‌کند
- [ ] ترتیب focus منطقی است
- [ ] Focus indicators واضح هستند (3px outline + box-shadow)
- [ ] Disabled buttons skip می‌شوند
- [ ] Hidden elements skip می‌شوند

### Keyboard Shortcuts:
- [ ] Enter/Space روی buttons کار می‌کند
- [ ] Enter/Space روی gallery items lightbox را باز می‌کند
- [ ] Enter/Space روی carousel dots slide را تغییر می‌دهد
- [ ] Enter/Space روی filter buttons filter را تغییر می‌دهد
- [ ] Enter/Space روی FAQ items accordion را toggle می‌کند
- [ ] Arrow Left/Right در carousel کار می‌کند
- [ ] Arrow Left/Right در lightbox کار می‌کند
- [ ] Escape lightbox را می‌بندد
- [ ] Escape mobile menu را می‌بندد
- [ ] Home/End برای scroll کار می‌کنند

### Focus Traps:
- [ ] Mobile menu: Tab در داخل menu می‌چرخد
- [ ] Mobile menu: Escape menu را می‌بندد و focus را برمی‌گرداند
- [ ] Lightbox: Tab در داخل lightbox می‌چرخد
- [ ] Lightbox: Escape lightbox را می‌بندد و focus را برمی‌گرداند

### Focus Return:
- [ ] بعد از بستن lightbox، focus به gallery item برمی‌گردد
- [ ] بعد از بستن mobile menu، focus به hamburger برمی‌گردد

## بخش 6: Screen Reader Checklist

### NVDA Testing (Windows):
- [ ] نصب و راه‌اندازی NVDA
- [ ] باز کردن index.html
- [ ] H key: jump between headings
- [ ] B key: jump between buttons
- [ ] K key: jump between links
- [ ] F key: jump between form fields (در contact.html)
- [ ] بررسی ARIA labels برای:
  - [ ] Language switcher
  - [ ] Theme toggle
  - [ ] Hamburger menu
  - [ ] Filter buttons
  - [ ] Carousel dots
  - [ ] Gallery items
  - [ ] Download buttons (disabled)
  - [ ] Form inputs

### VoiceOver Testing (macOS/iOS):
- [ ] فعال‌سازی VoiceOver (Cmd+F5)
- [ ] همان تست‌های NVDA را تکرار کنید
- [ ] بررسی تلفظ فارسی
- [ ] بررسی navigation در RTL mode

### Landmarks Testing:
- [ ] D key: jump between landmarks
- [ ] بررسی شناسایی: header, nav, main, sections, footer
- [ ] بررسی aria-label برای regions

## بخش 7: Link Verification Checklist

### Internal Links:
- [ ] Logo → index.html (از همه صفحات)
- [ ] Navigation links → sections صحیح
- [ ] Footer links → privacy.html, terms.html
- [ ] Back to top → scroll به بالا
- [ ] Anchor links (#features, #about, etc.) → sections صحیح

### External Links:
- [ ] Cafe Bazaar → https://cafebazaar.ir/app/app.r2devlab.polban
- [ ] Telegram → https://t.me/your_polban_support
- [ ] Email → mailto:support@polban.app
- [ ] Google Privacy Policy → https://policies.google.com/privacy
- [ ] همه external links در tab جدید باز می‌شوند
- [ ] همه external links دارای rel="noopener noreferrer" هستند

### Blog Links (اگر وجود دارند):
- [ ] blog/budgeting-tips.html
- [ ] blog/travel-expenses.html
- [ ] blog/multi-currency-guide.html
- [ ] blog/categorization-best-practices.html

### 404 Errors:
- [ ] هیچ 404 error در Network tab نیست
- [ ] همه images بارگذاری می‌شوند
- [ ] همه CSS/JS files بارگذاری می‌شوند
- [ ] همه fonts بارگذاری می‌شوند

## بخش 8: Responsive Design Checklist

### Mobile (320px - 480px):
- [ ] iPhone SE (375×667)
- [ ] iPhone 12 Pro (390×844)
- [ ] Samsung Galaxy S20 (360×800)
- [ ] Layout: همه content قابل مشاهده (بدون horizontal scroll)
- [ ] Navigation: hamburger menu نمایش داده می‌شود
- [ ] Buttons: اندازه ≥44×44px
- [ ] Text: خوانا و بدون overlap
- [ ] Images: به درستی scale می‌شوند
- [ ] Gallery: 1 column grid
- [ ] Forms: full-width inputs

### Tablet (481px - 1024px):
- [ ] iPad Mini (768×1024)
- [ ] iPad Air (820×1180)
- [ ] Layout: 2-column grid برای features
- [ ] Navigation: full menu یا hamburger (بسته به breakpoint)
- [ ] Gallery: 2 column grid
- [ ] Spacing: مناسب برای touch

### Desktop (1025px+):
- [ ] 1280×720 (HD)
- [ ] 1920×1080 (Full HD)
- [ ] 2560×1440 (2K)
- [ ] Layout: 3-column grid برای features
- [ ] Navigation: full menu نمایش داده می‌شود
- [ ] Gallery: 3 column grid
- [ ] Hover effects کار می‌کنند

### Orientation Testing:
- [ ] Portrait mode صحیح است
- [ ] Landscape mode صحیح است
- [ ] Orientation change مشکلی ایجاد نمی‌کند

## بخش 9: HTML/CSS Validation Checklist

### HTML Validation (W3C):
- [ ] index.html: No errors
- [ ] contact.html: No errors
- [ ] blog.html: No errors
- [ ] privacy.html: No errors
- [ ] terms.html: No errors
- [ ] Warnings قابل قبول هستند
- [ ] Screenshot گرفتن از validation results

### CSS Validation (W3C):
- [ ] src/css/styles.css: No critical errors
- [ ] src/css/rtl.css: No critical errors
- [ ] src/css/fonts.css (اگر وجود دارد): No errors
- [ ] Vendor prefix warnings قابل قبول هستند

### Console Errors:
- [ ] index.html: No JavaScript errors
- [ ] contact.html: No JavaScript errors
- [ ] blog.html: No JavaScript errors
- [ ] privacy.html: No JavaScript errors
- [ ] terms.html: No JavaScript errors
- [ ] Network tab: همه resources با 200 OK
- [ ] No CSP violations
- [ ] No CORS errors

## بخش 10: Functional Testing Checklist

### Hero Section:
- [ ] Typing animation اجرا می‌شود
- [ ] CTA buttons کار می‌کنند
- [ ] Hero image بارگذاری می‌شود
- [ ] در mobile layout صحیح است

### Features Section:
- [ ] همه 9 feature cards نمایش داده می‌شوند
- [ ] Icons render می‌شوند
- [ ] Hover effects کار می‌کنند (desktop)
- [ ] در mobile: 1 column
- [ ] در tablet: 2 columns
- [ ] در desktop: 3 columns

### Download Section:
- [ ] Cafe Bazaar button کار می‌کند
- [ ] Google Play button disabled است
- [ ] Windows button disabled است
- [ ] App Store button disabled است
- [ ] "Coming Soon" badges نمایش داده می‌شوند
- [ ] Tooltips روی hover نمایش داده می‌شوند
- [ ] Disabled buttons کلیک نمی‌شوند
- [ ] Disabled buttons از tab order حذف شده‌اند

### Gallery Section:
- [ ] View toggle: Carousel ↔ Grid کار می‌کند
- [ ] Filter buttons: همه 7 category کار می‌کنند
- [ ] Carousel: prev/next buttons کار می‌کنند
- [ ] Carousel: dots کار می‌کنند
- [ ] Carousel: arrow keys کار می‌کنند
- [ ] Carousel: auto-play کار می‌کند (اگر فعال است)
- [ ] Grid: همه items نمایش داده می‌شوند
- [ ] Grid: filter کار می‌کند
- [ ] Lightbox: باز می‌شود با کلیک
- [ ] Lightbox: navigation (prev/next) کار می‌کند
- [ ] Lightbox: zoom کار می‌کند
- [ ] Lightbox: close (X, Escape, overlay) کار می‌کند
- [ ] Lightbox: keyboard navigation کار می‌کند
- [ ] Lightbox: focus trap کار می‌کند
- [ ] Lightbox: caption نمایش داده می‌شود

### FAQ Section:
- [ ] Accordion items باز/بسته می‌شوند
- [ ] فقط یک item در یک زمان باز است
- [ ] Icons (+ / -) toggle می‌شوند
- [ ] Keyboard (Enter/Space) کار می‌کند
- [ ] در RTL mode صحیح است

### Theme Toggle:
- [ ] کلیک → theme تغییر می‌کند
- [ ] Icon تغییر می‌کند (moon ↔ sun)
- [ ] Colors تغییر می‌کنند
- [ ] localStorage preference ذخیره می‌شود
- [ ] Refresh → theme حفظ می‌شود
- [ ] ARIA label update می‌شود
- [ ] aria-pressed update می‌شود

### Language Switcher:
- [ ] کلیک → زبان تغییر می‌کند
- [ ] Text content ترجمه می‌شود
- [ ] Direction تغییر می‌کند (LTR ↔ RTL)
- [ ] Fonts تغییر می‌کنند
- [ ] localStorage preference ذخیره می‌شود
- [ ] Refresh → زبان حفظ می‌شود
- [ ] ARIA label update می‌شود
- [ ] در همه صفحات consistent است

### Mobile Menu:
- [ ] Hamburger باز می‌کند
- [ ] Navigation links نمایش داده می‌شوند
- [ ] کلیک link → menu بسته می‌شود
- [ ] کلیک overlay → menu بسته می‌شود
- [ ] Escape → menu بسته می‌شود
- [ ] Focus trap کار می‌کند
- [ ] Focus return کار می‌کند
- [ ] ARIA expanded update می‌شود
- [ ] در RTL mode صحیح است

### Back to Top:
- [ ] Button بعد از scroll down نمایش داده می‌شود
- [ ] کلیک → scroll به بالا
- [ ] Smooth scroll دارد
- [ ] در RTL mode کار می‌کند
- [ ] Keyboard accessible است

### Contact Form:
- [ ] Submit بدون data → error messages
- [ ] Invalid email → error message
- [ ] Valid submission → success message
- [ ] Form reset بعد از success
- [ ] Error messages رنگ قرمز دارند
- [ ] Input borders قرمز می‌شوند
- [ ] aria-describedby به errors مرتبط است
- [ ] aria-invalid="true" اضافه می‌شود
- [ ] Keyboard navigation کار می‌کند

### Blog View Toggle:
- [ ] Grid view کار می‌کند
- [ ] List view کار می‌کند
- [ ] localStorage preference ذخیره می‌شود
- [ ] Refresh → view حفظ می‌شود
- [ ] aria-selected update می‌شود

## بخش 11: Cross-Browser Testing Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Layout | [ ] | [ ] | [ ] | [ ] |
| Animations | [ ] | [ ] | [ ] | [ ] |
| Fonts | [ ] | [ ] | [ ] | [ ] |
| Gallery | [ ] | [ ] | [ ] | [ ] |
| Forms | [ ] | [ ] | [ ] | [ ] |
| Theme toggle | [ ] | [ ] | [ ] | [ ] |
| Language switch | [ ] | [ ] | [ ] | [ ] |
| Mobile menu | [ ] | [ ] | [ ] | [ ] |
| Console errors | [ ] | [ ] | [ ] | [ ] |

## بخش 12: Performance Metrics

### Lighthouse Performance:
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Total Blocking Time (TBT) < 200ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Speed Index < 3.4s

### Network Performance:
- [ ] Total page size < 3MB
- [ ] Number of requests < 50
- [ ] Largest resource < 500KB
- [ ] Time to Interactive (TTI) < 3.8s

## بخش 13: Security Testing

- [ ] CSP header/meta tag موجود است
- [ ] SRI hashes برای Font Awesome صحیح هستند
- [ ] همه resources از HTTPS بارگذاری می‌شوند
- [ ] No mixed content warnings
- [ ] External links دارای rel="noopener noreferrer" هستند
- [ ] No XSS vulnerabilities
- [ ] CSP Evaluator: No critical issues

## بخش 14: Final Sign-Off

- [ ] همه critical tests passed
- [ ] همه important tests passed
- [ ] Test report تکمیل شده
- [ ] Issues documented شده‌اند
- [ ] Recommendations ارائه شده‌اند
- [ ] Screenshots ضمیمه شده‌اند
- [ ] سایت آماده production است

---

## نحوه استفاده:

1. این checklist را print کنید یا در یک spreadsheet کپی کنید
2. هر item را به ترتیب تست کنید
3. ✅ برای pass، ❌ برای fail، ⚠️ برای warnings
4. Issues را در test report ثبت کنید
5. بعد از fix، re-test کنید
6. وقتی همه ✅ شدند، سایت آماده production است