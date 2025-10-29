# 🤖 راهنمای Automated Testing

این فایل دستورالعمل‌های دقیق برای اجرای **automated tests** است که می‌تواند زمان تست را به طور قابل توجهی کاهش دهد.

## بخش 1: Lighthouse CI Setup

**هدف**: اجرای Lighthouse audits به صورت automated در CI/CD pipeline

**نصب:**
```bash
npm install -g @lhci/cli
```

**Configuration:**

ایجاد فایل `lighthouserc.json` در root:
- تعریف URLs برای تست (index.html و همه pages/)
- تعریف assertions (minimum scores)
- تعریف upload target (اگر می‌خواهید نتایج را ذخیره کنید)

**مثال configuration:**
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./",
      "url": [
        "http://localhost:8080/index.html",
        "http://localhost:8080/pages/contact.html",
        "http://localhost:8080/pages/blog.html",
        "http://localhost:8080/pages/privacy.html",
        "http://localhost:8080/pages/terms.html"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.95}]
      }
    }
  }
}
```

**اجرا:**
```bash
# Start local server
npm start &

# Run Lighthouse CI
lhci autorun

# View results
lhci open
```

**Integration با GitHub Actions:**

ایجاد `.github/workflows/lighthouse.yml`:
- Trigger on pull requests
- Run Lighthouse CI
- Comment results on PR
- Fail if scores < thresholds

---

## بخش 2: HTML/CSS Validation Automation

**ابزار**: html-validate (npm package)

**نصب:**
```bash
npm install --save-dev html-validate
```

**Configuration:**

ایجاد `.htmlvalidate.json`:
- تعریف rules
- تعریف exceptions
- تعریف file patterns

**اجرا:**
```bash
npx html-validate "**/*.html"
```

**برای CSS:**
```bash
npm install --save-dev stylelint stylelint-config-standard
npx stylelint "src/css/**/*.css"
```

---

## بخش 3: Link Checking Automation

**ابزار**: broken-link-checker

**نصب:**
```bash
npm install -g broken-link-checker
```

**اجرا:**
```bash
# Start local server
npm start &

# Check all links
blc http://localhost:8080 -ro --filter-level 3

# Check specific page
blc http://localhost:8080/index.html -ro

# Output to file
blc http://localhost:8080 -ro > link-check-results.txt
```

**Options:**
- `-ro`: recursive, ordered
- `--filter-level 3`: show all links (including valid)
- `--exclude`: exclude specific URLs

---

## بخش 4: Accessibility Testing Automation

**ابزار**: axe-core (via pa11y)

**نصب:**
```bash
npm install -g pa11y
```

**اجرا:**
```bash
# Test single page
pa11y http://localhost:8080/index.html

# Test with specific standard
pa11y http://localhost:8080/index.html --standard WCAG2AA

# Test all pages
pa11y-ci --sitemap http://localhost:8080/sitemap.xml
```

**Output formats:**
- JSON: `pa11y --reporter json`
- HTML: `pa11y --reporter html > report.html`
- CSV: `pa11y --reporter csv`

---

## بخش 5: Screenshot Testing

**ابزار**: Playwright (برای visual regression)

**نصب:**
```bash
npm install --save-dev @playwright/test
```

**Test Script:**

ایجاد `tests/visual-regression.spec.js`:
- باز کردن هر صفحه
- گرفتن screenshot در breakpoints مختلف
- مقایسه با baseline screenshots
- Report کردن differences

**اجرا:**
```bash
npx playwright test
```

---

## بخش 6: Performance Monitoring

**ابزار**: WebPageTest API

**Setup:**
- ثبت‌نام در https://www.webpagetest.org/
- دریافت API key
- استفاده از API برای automated testing

**مثال request:**
```bash
curl "https://www.webpagetest.org/runtest.php?url=https://polban.app&k=YOUR_API_KEY&f=json"
```

---

## بخش 7: CI/CD Integration

**GitHub Actions Workflow:**

ایجاد `.github/workflows/test.yml`:

**Jobs:**
1. **Lighthouse**: Run Lighthouse CI
2. **Validation**: HTML/CSS validation
3. **Links**: Broken link checking
4. **Accessibility**: pa11y testing
5. **Screenshots**: Visual regression

**Triggers:**
- On pull request
- On push to main
- Scheduled (daily/weekly)

**Artifacts:**
- Lighthouse reports
- Validation results
- Link check results
- Accessibility reports
- Screenshots

---

## بخش 8: npm Scripts

**اضافه کردن به package.json:**

```json
"scripts": {
  "test:lighthouse": "lhci autorun",
  "test:html": "html-validate \"**/*.html\"",
  "test:css": "stylelint \"src/css/**/*.css\"",
  "test:links": "blc http://localhost:8080 -ro",
  "test:a11y": "pa11y http://localhost:8080/index.html",
  "test:all": "npm-run-all test:lighthouse test:html test:css test:links test:a11y",
  "test:watch": "npm-run-all --parallel test:html test:css"
}
```

**استفاده:**
```bash
# Run all tests
npm run test:all

# Run specific test
npm run test:lighthouse

# Watch mode for development
npm run test:watch
```

---

## بخش 9: Continuous Monitoring

**ابزارهای توصیه شده:**

1. **Google Search Console**: برای SEO monitoring
2. **Google Analytics**: برای user behavior (اگر فعال شود)
3. **Sentry**: برای error tracking
4. **Uptime Robot**: برای uptime monitoring
5. **Lighthouse CI Server**: برای historical performance data

---

## بخش 10: Test Automation Best Practices

**DO:**
- ✅ Run tests قبل از هر commit
- ✅ Automate repetitive tests
- ✅ Keep test configs in version control
- ✅ Document test failures
- ✅ Set realistic thresholds

**DON'T:**
- ❌ Skip manual testing کاملاً
- ❌ Ignore warnings
- ❌ Set thresholds خیلی بالا (unrealistic)
- ❌ Test فقط در یک browser
- ❌ Forget to update baselines

---

## نکته مهم:

Automated testing **جایگزین manual testing نیست** - بلکه **مکمل** آن است. همیشه باید:
1. Automated tests برای شناسایی سریع مشکلات
2. Manual tests برای validation دقیق و UX testing
3. Real user testing برای feedback واقعی