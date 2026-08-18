# Hawk — تدقيق جودة شامل

المشروع: Events-Square (Laravel 13 + Inertia 3 + React 19، RTL)
التاريخ: 2026-08-19
النطاق: `resources/js/**` + `routes/web.php` + `database/seeders/DatabaseSeeder.php` + المراقبين المرتبطين بالـ props.

---

## 1) المشاكل (مرقّمة حسب الخطورة)

### حرجة (Critical)

**1. رابط Hero مكسور — سلاغ غير موجود → 404**
- `resources/js/pages/Home.jsx:69`
- `route('listings.category', 'تراث-وثقافة')` — هذا السلاغ غير معرّف في السيلدر. السلاغ الصحيح هو `قصور-وقرى-تراثية` (راجع `DatabaseSeeder.php:119`).
- الزر "رحلة إلى الماضي" في الشريحة الثانية يؤدي إلى صفحة 404 (فشل ربط `{category:slug}`).
- **الإصلاح:** استبدل القيمة بـ `'قصور-وقرى-تراثية'`.

**2. الاشتراك في النشرة البريدية يستهدف المسار الخطأ → 405**
- `resources/js/pages/Home.jsx:130`
- `router.post(route('contact'), …)` — `route('contact')` مسار GET (`routes/web.php:37`). مسار POST هو `contact.store` (`routes/web.php:38`). إرسال POST إلى مسار GET ينتج 405، فالاشتراك معطّل بالكامل.
- **الإصلاح:** `router.post(route('contact.store'), …)`.

### متوسطة (Medium)

**3. بروب `relatedEvents` غير ممرَّر → قسم "فعاليات أخرى" ميت**
- `resources/js/pages/Events/Show.jsx:12,131` مقابل `app/Http/Controllers/EventController.php:31-36`
- المراقب يمرر `event` فقط، بينما الصفحة تقرأ `relatedEvents` (محمي بـ `?.` فلا انهيار، لكن القسم لا يظهر أبداً).
- **الإصلاح:** مرر `relatedEvents` من `EventController::show` بنفس أسلوب `ListingController::show`.

**4. فلاتر صفحة الوجهات تعرض التصنيفات الرئيسية بدل الفرعية**
- `app/Http/Controllers/ListingController.php:29,49,70` (يمرر `categories` = `whereNull('parent_id')`) مقابل `resources/js/pages/Listings/Index.jsx:44-53`
- الشريط يعرض [الكل، الوجهات، الفعاليات، الأنشطة، العروض] بدل التصنيفات الفرعية الخمسة. النقر على "الفعاليات/الأنشطة/العروض" يعطي نتائج فارغة (لا وجهات مرتبطة بها)، ولا يُظلَّل أي فلتر عند زيارة فئة فرعية لأن المقارنة `current?.slug === c.slug` لا تتطابق.
- **الإصلاح:** مرر التصنيفات الفرعية (`whereNotNull('parent_id')`) بدل الرئيسية في `Listings/Index`.

**5. صورة الـ Hero في صفحتَي التفاصيل محمّلة بـ lazy → تأخير LCP**
- `resources/js/pages/Listings/Show.jsx:28` و `resources/js/pages/Events/Show.jsx:38`
- مكوّن `Cover` (`components/site/ui.jsx:22-25`) يفرض `loading="lazy"` على كل الصور، بما فيها صورة الغلاف الرئيسية فوق الطيّة.
- **الإصلاح:** أضف بروب `priority`/`eager` إلى `Cover` وفعّله للصور الرئيسية (LCP).

**6. فلاتر "استكشف عسير" لا تعمل (حالة ميتة)**
- `resources/js/pages/DiscoverAsir.jsx:15,35,47-51`
- `activeFilter` يُضبط عند النقر لكنه لا يُستخدم في تصفية `listings` إطلاقاً — الأزرار شكلية فقط.
- **الإصلاح:** إما تنفيذ التصفية فعلياً أو إزالة الأزرار.

### منخفضة (Low)

**7. أيقونات التصنيف في الـ Navbar مفقودة (بروب `icon` غير مُمرَّر)**
- `app/Http/Middleware/HandleInertiaRequests.php:48-51` يمرر `['id','name','slug','parent_id']` فقط، بينما `resources/js/components/site/Navbar.jsx:52` يقرأ `ICONS[sub.icon]` — القيمة دائماً `undefined` فيقع على أيقونة بديلة.
- **الإصلاح:** أضف `'icon'` إلى قائمة الاختيار في `navigationCategories`.

**8. روابط لوحة التحكم مكتوبة يدوياً بدل `route()`**
- `resources/js/layouts/AdminLayout.jsx:6-16,62,86,99` (و `/logout` باليد) + `resources/js/components/site/Navbar.jsx:90` + كل صفحات `pages/Admin/**` (`href="/admin/..."`).
- **الإصلاح:** استخدم `route('admin.dashboard')`, `route('admin.listings.index')`, إلخ، و`route('logout')`.

**9. `SectionHeader` يستخدم `<a>` بدل `<Link>` → إعادة تحميل كاملة**
- `resources/js/components/site/ui.jsx:9` — روابط "اكتشف المزيد" في الرئيسية تعمل بـ HTML عادي فيتسبب في إعادة تحميل الصفحة بدل تنقّل Inertia.
- **الإصلاح:** استبدل `<a>` بـ `<Link>` من `@inertiajs/react`.

**10. روابط خارجية من بيانات إدارية بلا تحقق من البروتوكول (خطر XSS محتمل)**
- `resources/js/components/site/OfferCard.jsx:4` (`offer.link`) و `resources/js/pages/Listings/Show.jsx:18,156` (`listing.website`) تُكتب مباشرة كـ `href`.
- قيمة مثل `javascript:...` تُشكّل ثغرة حقن. **الإصلاح:** تحقق خادمياً من `starts_with(http://, https://)` قبل الحفظ أو العرض.

**11. زر إغلاق الفلاش يعيد تحميل الصفحة بالكامل**
- `resources/js/components/Flash.jsx:16,24` — `window.location.reload()` ثقيل. **الإصلاح:** إخفاء بالحالة أو `router.reload({ only: ['flash'] })`.

---

## 2) قائمة تحقق منتهية

| البند | الحالة | ملاحظات |
|---|---|---|
| **الروابط** | ⚠️ جزئياً | 2 رابط مكسور (م1، م2) + روابط إدارية يدوية (م8) |
| **السلاغ** | ⚠️ 4/5 | `قصور-وقرى-تراثية`، `معالم-ومنتزهات`، `متاحف-وأسواق-شعبية`، `الإقامة-والتسوق`، `مأكولات-ومشروبات` كلها مطابقة للسيلدر — عدا `تراث-وثقافة` الخاطئ (م1) |
| **الحالات الفارغة** | ⚠️ جزئياً | قوائم `Listings/Events/Offers/Discover` لها حالات فارغة ✓؛ أقسام الرئيسية (`featured/stay/food/offers/landmark`) بلا حالة فارغة (تعرض شبكة فارغة)؛ الـ Hero يستخدم شرائح ثابتة فيتحمّل المصفوفات الفارغة ✓؛ `related`/`relatedEvents` محمية بـ `?.` ✓ |
| **أخطاء التشغيل** | ✅ سليم | لا `console.log`، لا `dangerouslySetInnerHTML`، لا `localStorage`، لا `.map` على undefined غير محمي، مفاتيح القوائم سليمة، الاستيرادات مكتملة. الاستثناء: بروب مفقود (م3) |
| **الأداء** | ⚠️ | Hero بدون lazy أولوية (م5)، إعادة تحميل كاملة في `SectionHeader` (م9) و`Flash` (م11). لا `usePage` داخل حلقات، لا حاجة ملحّة لـ memo |
| **الأمن** | ⚠️ | لا innerHTML؛ روابط خارجية من مدخلات إدارية بلا تحقق بروتوكول (م10)؛ لا تسريب بيانات حساسة، `settings`/`auth.user` آمنة |

---

## 3) أولويات (Top 5)

1. **إصلاح رابط Hero المكسور** (`Home.jsx:69`) — 404 ظاهر في الواجهة الأمامية.
2. **إصلاح مسار الاشتراك في النشرة** (`Home.jsx:130`) — ميزة معطّلة بالكامل.
3. **تمرير `relatedEvents`** (`EventController::show`) — استكمال ميزة ناقصة.
4. **تصحيح فلاتر صفحة الوجهات** (`ListingController` + `Listings/Index`) — UX خاطئ ونتائج فارغة.
5. **رفع lazy عن صور الـ Hero** (`Cover`) — تحسين LCP وأداء الصفحات الرئيسية.
