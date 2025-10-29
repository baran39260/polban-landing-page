# 📊 Test Report Template

## Header Section

- **تاریخ تست**: [YYYY-MM-DD]
- **نام tester**: [نام شما]
- **نسخه سایت**: [git commit hash یا version number]
- **Environment**: [local/staging/production]
- **Browser/Device مورد استفاده**: [مثلاً Chrome 120.0.6099.109 on Windows 11]

## Executive Summary

- **تعداد کل صفحات تست شده**: [عدد]
- **تعداد critical issues**: [عدد]
- **تعداد warnings**: [عدد]
- **Pass rate کلی**: [درصد، مثلاً 85%]
- **وضعیت کلی**: [Ready for Production / Not Ready for Production]

## Lighthouse Scores Table

| Page name | Performance (Desktop/Mobile) | Accessibility (Desktop/Mobile) | Best Practices (Desktop/Mobile) | SEO (Desktop/Mobile) | Overall status |
|-----------|------------------------------|--------------------------------|---------------------------------|----------------------|----------------|
| index.html | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Pass/Fail] |
| contact.html | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Pass/Fail] |
| blog.html | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Pass/Fail] |
| privacy.html | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Pass/Fail] |
| terms.html | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Score]/[Score] | [Pass/Fail] |

## Core Web Vitals Section

**برای index.html (صفحه اصلی):**

- **LCP (Largest Contentful Paint)**: [value] - [Good/Needs Improvement/Poor]
- **INP (Interaction to Next Paint)**: [value] - [Good/Needs Improvement/Poor]
- **CLS (Cumulative Layout Shift)**: [value] - [Good/Needs Improvement/Poor]
- **Field Data vs Lab Data comparison**: [توضیح مقایسه]
- **Recommendations برای بهبود**: [لیست recommendations]

## Translation Testing Results

**index.html:**
- **EN → FA switching**: [Pass/Fail]
- **RTL layout**: [Pass/Fail]
- **Font rendering**: [Pass/Fail]
- **Missing translation keys**: [لیست keys یا "هیچ"]
- **Issues found**: [توضیح مشکلات یا "هیچ"]

**contact.html:**
- **EN → FA switching**: [Pass/Fail]
- **RTL layout**: [Pass/Fail]
- **Font rendering**: [Pass/Fail]
- **Missing translation keys**: [لیست keys یا "هیچ"]
- **Issues found**: [توضیح مشکلات یا "هیچ"]

**blog.html:**
- **EN → FA switching**: [Pass/Fail]
- **RTL layout**: [Pass/Fail]
- **Font rendering**: [Pass/Fail]
- **Missing translation keys**: [لیست keys یا "هیچ"]
- **Issues found**: [توضیح مشکلات یا "هیچ"]

**privacy.html:**
- **EN → FA switching**: [Pass/Fail]
- **RTL layout**: [Pass/Fail]
- **Font rendering**: [Pass/Fail]
- **Missing translation keys**: [لیست keys یا "هیچ"]
- **Issues found**: [توضیح مشکلات یا "هیچ"]

**terms.html:**
- **EN → FA switching**: [Pass/Fail]
- **RTL layout**: [Pass/Fail]
- **Font rendering**: [Pass/Fail]
- **Missing translation keys**: [لیست keys یا "هیچ"]
- **Issues found**: [توضیح مشکلات یا "هیچ"]

## Keyboard Navigation Results

- **Tab navigation**: [Pass/Fail]
- **Keyboard shortcuts**: [Pass/Fail]
- **Focus traps**: [Pass/Fail]
- **Focus indicators**: [Pass/Fail]
- **Issues found**: [توضیح مشکلات یا "هیچ"]

## Screen Reader Results

- **NVDA testing**: [Pass/Fail]
- **VoiceOver testing**: [Pass/Fail یا "Not tested"]
- **ARIA labels**: [Pass/Fail]
- **Landmarks**: [Pass/Fail]
- **Issues found**: [توضیح مشکلات یا "هیچ"]

## Link Verification Results

- **Internal links**: [X/Y working]
- **External links**: [X/Y working]
- **Anchor links**: [X/Y working]
- **404 errors**: [لیست broken links یا "هیچ"]

## Responsive Design Results

- **Mobile (320-480px)**: [Pass/Fail]
- **Tablet (481-1024px)**: [Pass/Fail]
- **Desktop (1025px+)**: [Pass/Fail]
- **Issues found**: [توضیح مشکلات یا "هیچ"]

## Validation Results

- **HTML validation**: [Pass/Fail] ([تعداد errors/warnings])
- **CSS validation**: [Pass/Fail] ([تعداد errors/warnings])
- **Console errors**: [Pass/Fail] ([تعداد errors])

## Functional Testing Results

**Hero Section:**
- **Feature name**: Hero Section
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Features Section:**
- **Feature name**: Features Section
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Download Section:**
- **Feature name**: Download Section
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Gallery Section:**
- **Feature name**: Gallery Section
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**FAQ Section:**
- **Feature name**: FAQ Section
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**About Section:**
- **Feature name**: About Section
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Theme Toggle:**
- **Feature name**: Theme Toggle
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Language Switcher:**
- **Feature name**: Language Switcher
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Mobile Menu:**
- **Feature name**: Mobile Menu
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Back to Top:**
- **Feature name**: Back to Top
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Contact Form:**
- **Feature name**: Contact Form
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

**Blog View Toggle:**
- **Feature name**: Blog View Toggle
- **Status**: [Working/Broken/Partial]
- **Issues found**: [توضیح یا "هیچ"]
- **Screenshots**: [اگر لازم است، نام فایل]

## Issues Summary

**Critical Issues (Must Fix):**
1. [Issue title]
   - **Severity**: Critical
   - **Location**: [file:line]
   - **Description**: [detailed description]
   - **Impact**: [user impact]
   - **Recommendation**: [how to fix]
   - **Priority**: P0

**Important Issues (Should Fix):**
1. [Issue title]
   - **Severity**: Important
   - **Location**: [file:line]
   - **Description**: [detailed description]
   - **Impact**: [user impact]
   - **Recommendation**: [how to fix]
   - **Priority**: P1

**Minor Issues (Nice to Fix):**
1. [Issue title]
   - **Severity**: Minor
   - **Location**: [file:line]
   - **Description**: [detailed description]
   - **Impact**: [user impact]
   - **Recommendation**: [how to fix]
   - **Priority**: P2

## Recommendations Section

**Performance Improvements:**
- [Recommendation 1]
- [Recommendation 2]

**Accessibility Improvements:**
- [Recommendation 1]
- [Recommendation 2]

**UX Improvements:**
- [Recommendation 1]
- [Recommendation 2]

**Security Improvements:**
- [Recommendation 1]
- [Recommendation 2]

## Browser Compatibility Matrix

| Browser/Device | Version | Layout | Functionality | Performance | Issues | Overall Status |
|----------------|---------|--------|---------------|-------------|--------|----------------|
| Chrome | [Version] | [Pass/Fail] | [Pass/Fail] | [Pass/Fail] | [توضیح] | [Pass/Fail] |
| Firefox | [Version] | [Pass/Fail] | [Pass/Fail] | [Pass/Fail] | [توضیح] | [Pass/Fail] |
| Safari | [Version] | [Pass/Fail] | [Pass/Fail] | [Pass/Fail] | [توضیح] | [Pass/Fail] |
| Edge | [Version] | [Pass/Fail] | [Pass/Fail] | [Pass/Fail] | [توضیح] | [Pass/Fail] |

## Screenshots Section

- **Lighthouse results**: [index-desktop.png, index-mobile.png, contact-desktop.png, etc.]
- **PageSpeed Insights results**: [psi-lcp.png, psi-inp.png, psi-cls.png]
- **Validation results**: [html-validation.png, css-validation.png]
- **Critical issues screenshots**: [issue-1.png, issue-2.png]
- **Before/After comparisons**: [before-fix.png, after-fix.png]

## Conclusion

- **خلاصه کلی نتایج**: [توضیح کوتاه]
- **آیا سایت آماده production است؟**: [بله/خیر]
- **Next steps**: [لیست اقدامات بعدی]
- **Timeline برای fixes**: [تایم‌لاین پیشنهادی]
- **Sign-off**: [نام و تاریخ]