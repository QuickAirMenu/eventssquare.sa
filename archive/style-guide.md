# Style Guide — Events Square (مستخرج من الموقع)

## الألوان (Color Palette)

| الدور | الكود | الاسم |
|--------|------|------|
| **الأخضر الأساسي** | `#386732` | Primary Green |
| **الأصفر الذهبي** | `#F9CD18` | Accent Gold |
| **الأحمر** | `#F05553` | Badge Red |
| **الأبيض الناصع** | `#FEFEFE` | White |
| **الأبيض** | `#FFFFFF / #fff` | Pure White |
| **رمادي الحدود** | `#DEDEDE` | Border Gray |
| **أسود شفاف** | `#0000009E` | Overlay (62% opacity) |
| **أسود** | `#000000` | Text Black |

---

## الخطوط (Typography)

| الاستخدام | الوصف |
|-----------|-------|
| **العناوين الرئيسية** | 42px - 50px (Desktop) / 35px (Mobile) |
| **عناوين الصفحات** | 30px |
| **العناوين الثانوية** | 20px |
| **النصوص العادية** | 15px - 16px |
| **الخط** | System UI (system-ui, -apple-system, Segoe UI) |

---

## الأزرار (Buttons)

```
background: #386732 (أخضر)
color: #fff (أبيض)
border-radius: 8px - 10px
padding: 10px 20px / 12px 25px
min-width: 150px
white-space: nowrap

:hover:
  background: #fff (أبيض)
  color: #386732 (أخضر)
  border: 1px solid #386732
```

---

## البطاقات (Cards)

```css
background: #fff
border: 1px solid #ccc / #DEDEDE
border-radius: 10px - 16px
box-shadow: 0 0 10px 0 rgba(0,0,0,.15)
```

---

## مكونات الصفحة الرئيسية

### سلايدر البطل (Hero Slider)
- ارتفاع: 600px (Desktop)
- عرض النص: 50%
- تباعد زر التنقل: 25px margin
- لون البوليت النشط: `#F9CD18` (ذهبي)
- لون البوليت غير النشط: `#386732` (أخضر)

### Grid البطاقات (Custom Grid)
- بطاقات مع صور + شارة حمراء
- زر "اقرأ المزيد" أخضر
- 3 أعمدة

### Carousel
- مسافة بين العناصر: 10px
- أسهم تنقل خارجية (top positioning)

---

## نماذج التسجيل (Forminator / UM)

```css
حقول الإدخال:
  padding: 10px 20px
  border-radius حسب التصميم

أزرار الإرسال:
  background: #386732
  border: 1px solid #386732
  border-radius: 10px
  padding: 10px 30px

Ultimate Member:
  الأزرار: background #386732
  hover: border #386732, background #fff, color #386732
  عمودين 48% side by side
  RTL select2
```

---

## RTL (دعم اللغة العربية)

| الخاصية | القيمة |
|---------|--------|
| direction | rtl |
| text-align | right |
| Select2 RTL | direction:rtl; text-align:right |

---

## Responsive Breakpoints

| الجهاز | العرض | ملاحظات |
|--------|-------|---------|
| Desktop | > 1024px | تصميم كامل |
| Tablet | 768px - 1024px | الفلاتر 23% عرض |
| Mobile | < 767px | الفلاتر 100% عرض، السلايدر 35px |

---

## الأيقونات المستخدمة

| الأيقونة | المصدر |
|----------|--------|
| far fa-clock | Font Awesome Regular |
| far fa-calendar-alt | Font Awesome Regular |
| far fa-address-book | Font Awesome Regular |
| fab fa-x-twitter | Font Awesome Brands |
| fab fa-fort-awesome | Font Awesome Brands |
| SVG مخصص | Asset-10.svg (موقع/خريطة) |
