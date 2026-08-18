# ISSUES.md — متتبع مشاكل المشروع

> يصونه **Hawk** (الجودة) و**Cobra** (الأمن). لا تُغلق مشكلة بدون إصلاح مؤكد واختبار يمنع التراجع.

## مفتوح (متبقٍ من موجة التدقيق — غير أمني)

- **Bug #001 Critical:** `React.useState` بدون استيراد — Admin/Testimonials/Index.jsx:6 (الصفحة تتحطم). المسؤول: Fox — *مقرر في Phase 3/4*
- **Bug #001b High:** درج AdminLayout مكسور مع RTL على الجوال. المسؤول: Fox
- **Bug #001c High:** الهوية البصرية لا تطابق design-files/homepage.html (ألوان + Readex Pro). المسؤول: Lynx + Fox — *المانيفست جاهز في design-files/README.md*
- **Bug #001d Critical:** الاختبارات معطلة (RefreshDatabase معلق + :memory:). المسؤول: Hawk
- Bug #002 النشرة تلوث جدول contacts. المسؤول: Wolf
- Bug #003 المحرر لا يرى رابط لوحة التحكم. المسؤول: Fox
- Bug #004 التواريخ بالهجري (ar-SA في 9 مواضع). المسؤول: Fox
- Bug #005 ملفات ميتة (app.js، welcome.blade.php). المسؤول: Fox
- Panther: ترحيل القيود (restrict + unique مركب + فهارس FK) — مقرر Phase 3

## قالب المشكلة

```markdown
## Bug #NNN — [عنوان قصير]
**Found by:** Hawk / Cobra
**Severity:** Critical / High / Medium / Low
**Agent responsible:** Wolf / Fox / Lion / Panther
**Status:** Open / In Progress / Fixed

**الوصف:** ما الخلل ولماذا يهم.
**الخطوات:** 1. ... 2. ...
**المتوقع:** ...
**الفعلي:** ...
**الإصلاح المقترح:** ...
```

## مفتوح

(لا مشاكل مفتوحة من الموجة الأولى — انظر "مغلق")

## مغلق — موجة الإصلاح الأمني (2026-08-18، نفّذ Wolf بتنسيق Dragon)

- ✅ **C-01 Critical (RCE):** رفع avatar/cover بلا تحقق → أُعيدت كتابة `UploadsFiles.php`: فحص MIME حقيقي (JPG/PNG/WEBP فقط)، حد حجم، اسم ملف عشوائي، تخزين على قرص `public` (storage/app/public خلف symlink). **مغلق**
- ✅ **C-02 Critical (Config):** قرص `uploads` العام (public_path/uploads) حُذف من `filesystems.php` نهائياً — لا تنفيذ مطلقاً من public. النماذج تخدم عبر `Storage::disk('public')->url()`. **مغلق**
- ✅ **C-03 Critical (Disclosure):** بيانات المدير/المحرر ثابتة نصياً في `DatabaseSeeder.php` → تُقرأ من env (`SEED_ADMIN_*`) وترمي استثناء لو غابت. أُضيفت لـ `.env` المحلي و`.env.example` و`.env.production.example`. **مغلق**
- ✅ **H-01 High (Auth):** `throttle:5,1` على `/login` و `throttle:3,10` على `/contact` (routes/web.php). **مغلق**
- ✅ **H-02 High (IDOR/Authz):** مسارات `users` و `settings` مقصورة على `role:admin` + فحص إضافي داخل UserController (منح admin يتطلب admin، وحماية آخر مدير). **مغلق**
- ✅ **H-03 High (XSS):** قاعدة `image` (تسمح SVG) استُبدلت بـ `mimes:jpg,jpeg,png,webp` في المتحكمات الأربعة + فحص MIME فعلي في الـ trait. **مغلق**
- ✅ **H-04 High (Config):** أنشئ `.env.production.example` (APP_DEBUG=false إلزامي، SESSION_SECURE_COOKIE=true، MySQL) — يُنسخ على السيرفر فقط. **مغلق**

> ⚠️ ملاحظة Cobra: بيانات SSH الأصلية ظهرت في محادثة — يلزم تغيير كلمة مرور السيرفر بعد أول نشر والانتقال لمفاتيح SSH. (مفتوحة كإجراء تشغيلي خارج الكود)

## مغلق
(فارغ)
