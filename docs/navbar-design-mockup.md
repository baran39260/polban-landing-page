background: linear-gradient(135deg, #FDF8FD 0%, rgba(126, 75, 184, 0.15) 100%);
```

### Header (حالت شفاف):
- Background: `rgba(253, 248, 253, 0.9)`
- Backdrop-filter: `blur(16px) saturate(180%)`
- Border-bottom: `1px solid rgba(126, 75, 184, 0.1)`
- Height: 64px

### عناصر Header:

**Logo (سمت راست):**
- ایکون: 32x32px، گرادیان `#7E4BB8` → `#9F67D2`، border-radius 8px
- متن: "پولبان"، Vazirmatn Bold 22px، رنگ `#7E4BB8`
- فاصله: 8px

**Navigation Menu (وسط):**
- آیتم‌ها: خانه | ویژگی‌ها | گالری | دانلود | تماس با ما
- فونت: Vazirmatn Medium 14px
- رنگ: `#7E4BB8`
- فاصله بین آیتم‌ها: 24px
- Active state: پس‌زمینه `rgba(126, 75, 184, 0.12)` + underline 2px
- Hover: پس‌زمینه `rgba(126, 75, 184, 0.08)`

**Language Switcher (سمت چپ):**
- شکل: دایره‌ای، 70px عرض، 32px ارتفاع
- Border: `1.5px solid rgba(126, 75, 184, 0.3)`
- محتوا: ایکون پرچم 16x16px + "FA" + chevron-down
- رنگ متن: `#7E4BB8`

**Download Button (انتهای چپ):**
- شکل: کپسول، border-radius 24px
- پس‌زمینه: گرادیان `#7E4BB8` → `#9F67D2`
- متن: "دانلود رایگان"، Vazirmatn SemiBold 14px، سفید
- Padding: 10px 24px
- Shadow: `0 4px 12px rgba(126, 75, 184, 0.3)`

## نسخه Dark Mode

### پس‌زمینه Hero:
```css
background: linear-gradient(135deg, #1A1F24 0%, rgba(196, 160, 224, 0.15) 100%);