# تقرير مراجعة الجودة والاختبارات — Hawk (Dev Pack)

**المشروع:** Events-Square (Laravel 13 + Inertia 3 + React 19)
**التاريخ:** 2026-08-18
**النطاق:** tests/** ، phpunit.xml ، جولة code smells في app/ و resources/js ، سلامة Inertia في resources/views/app.blade.php
**المنهجية:** فحص ثابت + محاولة تنفيذ `php artisan test` — لم يُعدَّل أي ملف في المشروع عدا هذا التقرير.

---

## 1) حالة الاختبارات

### الموجود
| الملف | المحتوى | القيمة |
|---|---|---|
| `tests/Unit/ExampleTest.php` | `assertTrue(true)` | صفرية — سقالة Laravel الافتراضية |
| `tests/Feature/ExampleTest.php` | `GET /` يتوقع 200 | معطّلة (انظر Bug #001) |
| `tests/TestCase.php` | فارغ (بدون RefreshDatabase) | — |

**العدد الفعلي للاختبارات: 2 (كلاهما سقالة). التغطية الوظيفية الحقيقية: 0%.**

### تعذّر التنفيذ
- مجلد `vendor/` **فارغ** (لا يوجد `vendor/autoload.php`) — لم يُنفَّذ `composer install` في هذه البيئة، فلا يمكن تشغيل PHPUnit أصلاً. PHP غير مسجّل في PATH (وُجد PHP 8.3.31 في Laragon).

### الناقص الجوهري — مسارات بلا أي اختبار (~64 نقطة نهاية)
- **عام (14):** `/`، `/destinations`، `/destinations/{category}`، `/listing/{listing}`، `/events`، `/events/{event}`، `/offers`، `/discover-asir`، `/about`، `GET/POST /contact`، `GET/POST /login`، `POST /logout`
- **لوحة التحكم (47):** dashboard + موارد listings/events/offers/categories (7 لكل منها) + cities/testimonials (5) + contacts (3) + users (3) + settings (2)
- **API (3):** `/api/v1/health`، `/api/v1/user`، `/up`
- **سيناريوهات حرجة غير مغطاة:** حماية `admin` (زائر/مستخدم عادي → 403)، تسجيل دخول صحيح/خاطئ، تحقق `contact.store`، فلاتر القوائم (بحث/مدينة/حالة)، صلاحيات editor مقابل admin (انظر W-04 لدى Wolf)، حذف تصنيف/مدينة محمية (CategoryController:59-61، CityController:38-40).

### phpunit.xml
إعدادات سليمة إجمالاً: `sqlite :memory:`، `array` للكاش/الجلسة/البريد، `sync` للطوابير، وتعطيل Pulse/Telescope/Nightwatch. **فجوتان:**
1. لا يوجد `APP_KEY` — في بيئة CI بلا `.env` ستفشل أي عملية تشفير/جلسة.
2. لا يوجد `<coverage>` reporting — لا يمكن قياس التغطية آلياً.

### بنية تحتية للاختبار
- **Factories:** يوجد `UserFactory` فقط — لا مصانع لأي من نماذج المحتوى السبعة (Listing/Event/Offer/Category/City/Testimonial/Contact) → كتابة اختبارات Feature س تتطلب `Model::create()` يدوياً أو إنشاء المصانع أولاً.
- **JS:** لا يوجد أي إطار اختبار (لا Vitest/Playwright)، ولا `test` script في `package.json`، ولا ESLint/Prettier.
- **CI:** لا يوجد `.github/` ولا أي pipeline — **والأخطر: المشروع ليس مستودع Git أصلاً** (`‎.git` غير موجود).

---

## 2) المشاكل المرقمة (بصيغة قالب ISSUES.md)

> المشاكل جاهزة للنقل إلى `ISSUES.md` (الترقيم يبدأ من #001 لأن المتتبع فارغ). الإحالات W-xx تعود لتقرير Wolf.

## Bug #001 — الاختبار الوحيد موجود (Feature) معطّل: `/` سيرجع 500 في بيئة الاختبار
**Found by:** Hawk
**Severity:** Critical
**Agent responsible:** Wolf
**Status:** Open

**الوصف:** الاختبار الوحيد ذو المعنى يضرب `/` متوقعاً 200، لكن `HomeController::index` و`HandleInertiaRequests::share()` ينفّذان استعلامات على 7 جداول، بينما phpunit.xml يستخدم `sqlite :memory:` **دون تشغيل migrations** — استيراد `RefreshDatabase` مؤجَّل كتعليق (السطر 5) و`TestCase` فارغ. النتيجة: `no such table` → HTTP 500 → الاختبار أحمر.
**الخطوات:** 1. `composer install` 2. `php artisan test`
**المتوقع:** OK
**الفعلي:** FAIL — `tests/Feature/ExampleTest.php:13-18` + `tests/TestCase.php:7-10` + `phpunit.xml:26-27`
**الإصلاح المقترح:** تفعيل `RefreshDatabase` في `tests/TestCase.php` (أو في الاختبار نفسه) — مع `RefreshDatabase` تُنشَّأ الجداول في :memory: تلقائياً.

## Bug #002 — إعداد `newsletter_enabled` بلا أي تأثير + نموذج النشرة يلوّث جدول الرسائل
**Found by:** Hawk
**Severity:** Medium
**Agent responsible:** Fox
**Status:** Open

**الوصف:** الإعداد `newsletter_enabled` يُحفظ ويُشارَك (`SettingController.php:43`، `DatabaseSeeder.php:69`) لكن الواجهة لا تقرؤه إطلاقاً (صفر مراجع في resources/js). نموذج الاشتراك في الفوتر يظهر دوماً ويرسِل `POST /contact` باسم مزيف "مشترك النشرة" — يُنشئ صفوفاً في جدول `contacts` تختلط برسائل العملاء الحقيقية وتفسد عدّاد "غير المقروءة" في Dashboard.
**الخطوات:** 1. افتح أي صفحة عامة 2. املأ بريداً في الفوتر 3. راجع `/admin/contacts`
**المتوقع:** إخفاء النموذج عند `newsletter_enabled=0`، وقناة اشتراك منفصلة عن رسائل التواصل.
**الفعلي:** النموذج يظهر دائماً ويُسجَّل كرسالة تواصل — `resources/js/layouts/AppLayout.jsx:179-205` (الإرسال: 186-191)
**الإصلاح المقترح:** `{settings?.newsletter_enabled === '1' && (...)}` حول النموذج، وإما endpoint منفصل للاشتراك أو تمييز النوع في جدول contacts.

## Bug #003 — المحرر (editor) لا يرى رابط "لوحة التحكم" — تعارض `is_admin` مع الوسيط
**Found by:** Hawk
**Severity:** Medium
**Agent responsible:** Fox
**Status:** Open

**الوصف:** `AdminMiddleware` يسمح بدورَي `admin|editor`، لكن `is_admin` المشترَك مع Inertia = `hasRole('admin')` فقط (`HandleInertiaRequests.php:40`، `User.php:33-36`). المحرر يُوجَّه بعد الدخول إلى `/admin` (AuthController:35-36) ثم يفقد الرابط من الهيدر بعد أي تنقل، وفي AdminLayout يُعرَض "محرر" رغم أن `is_admin=false` — عرضٌ صحيح صدفةً، لكن أي منطق مستقبلي مبني على `is_admin` سيقصي المحررين خطأً.
**الخطوات:** 1. سجّل الدخول بحساب editor 2. راجع هيدر الموقع العام
**المتوقع:** ظهور زر لوحة التحكم لكل من يملك صلاحية الدخول.
**الفعلي:** مخفي — `resources/js/layouts/AppLayout.jsx:81`
**الإصلاح المقترح:** مشاركة `can_access_admin => $user->hasAnyRole(['admin','editor'])` بدلاً من الاعتماد على `is_admin`.

## Bug #004 — التواريخ تُعرض بالتقويم الهجري (ar-SA الافتراضي) في كل الواجهة
**Found by:** Hawk
**Severity:** Medium
**Agent responsible:** Fox
**Status:** Open

**الوصف:** `toLocaleDateString('ar-SA')` يستخدم تقويم **islamic-umalqura** افتراضياً في المتصفحات — تواريخ الفعاليات والعروض (وخصوصاً "صالح حتى") ستظهر هجريةً بينما تُدخَل وتُخزَّن ميلادية. هذا قرار منتج يجب حسمه صراحةً لا تركه لل_default.
**الموقع (9 مواضع):** `Home.jsx:57`، `Events/Show.jsx:53,58,63`، `Events/Index.jsx:80`، `Offers/Index.jsx:33-34`، `Admin/Events/Index.jsx:46`، `Admin/Offers/Index.jsx:45`
**المتوقع:** عرض ميلادي بأرقام عربية (الغالب في السياحة/الفعاليات) ما لم يُقرَّ خلافه.
**الفعلي:** هجري (مثل: 14 صفر 1448).
**الإصلاح المقترح:** ثابت موحّد `const AR_LOCALE = 'ar-SA-u-ca-gregory'` (أو `ar-EG`) + دالة `formatDate()` واحدة في `components/ui.jsx` بدل 9 تكرارات.

## Bug #005 — ملفات ميتة: `resources/js/app.js` و `resources/views/welcome.blade.php`
**Found by:** Hawk
**Severity:** Low
**Agent responsible:** Fox
**Status:** Open

**الوصف:** `app.js` يحتوي سطر تعليق واحد فقط ولا يُستورد في أي مكان (مدخل Vite هو `app.jsx` — vite.config.js:16). `welcome.blade.php` (223 سطراً) صفحة Laravel الافتراضية LTR، لا يسندها أي route، وتشير إلى `app.js` الميت (سطر 13) — بقايا سقالة تنشر ترويسة Laravel/Tailwind أجنبية عن المشروع.
**الإصلاح المقترح:** حذف الملفين.

## Bug #006 — حقل `gallery` مُتحقَّق ومُسمَّع لكنه بلا أي واجهة
**Found by:** Hawk
**Severity:** Low
**Agent responsible:** Fox
**Status:** Open

**الوصف:** التحقق يقبل `gallery` كمصفوفة روابط (`Admin/ListingController.php:101-102`) والنموذج يسمح به (`Listing.php:16`)، لكن نموذج الإدارة لا يحوي أي حقل معرض صور (`Admin/Listings/Form.jsx` — لا input للمعرض). ميزة ميتة نصف منفَّذة.
**الإصلاح المقترح:** إما إضافة واجهة رفع معرض، أو شطب الحقل من التحقق والـ casts مؤقتاً.

## Bug #007 — Flash: استيراد ميت مكرر + إغلاق الرسالة يعيد تحميل الصفحة كاملة
**Found by:** Hawk
**Severity:** Low
**Agent responsible:** Fox
**Status:** Open

**الوصف:** `Flash.jsx:1-2` يستورد `Link` (غير مستخدم إطلاقاً) ثم `usePage` من نفس الحزمة في سطرين منفصلين. زر الإغلاق ✕ ينفّذ `window.location.reload()` (السطران 16، 24) — إعادة تحميل كاملة Inertia فقط لإخفاء toast.
**الإصلاح المقترح:** حذف استيراد `Link` ودمج الاستيراد؛ حالة `useState` محلية أو `useRemember` لإخفاء الرسالة.

## Bug #008 — وحدات تتجاوز 80 سطراً: AppLayout (~200 سطر) و seedListings (~192 سطر)
**Found by:** Hawk
**Severity:** Low
**Agent responsible:** Fox / Wolf
**Status:** Open

**الوصف:** مكوّن `AppLayout.jsx:16-215` واحد يضم الهيدر والفوتر والقوائم والنشرة (~200 سطر). `DatabaseSeeder::seedListings` (`database/seeders/DatabaseSeeder.php:138-330`) مصفوفة بيانات ضخمة داخل الكود. (للمقارنة: `Home.jsx` مُقسَّم جيداً إلى مكوّنات فرعية — النمط المطلوب اتباعه.)
**الإصلاح المقترح:** استخراج `Header`/`Footer`/`NewsletterForm`؛ نقل بيانات الـ seed إلى ملفات JSON/arrays منفصلة أو مصانع.

## Bug #009 — تكرار هيكلي بين متحكمات Admin الثلاثة الرئيسية
**Found by:** Hawk
**Severity:** Low
**Agent responsible:** Wolf
**Status:** Open

**الوصف:** `Admin/ListingController.php:20-108` و`Admin/EventController.php:20-114` و`Admin/OfferController.php:18-84` تكرر حرفياً نمط index(search+paginate 15)/store(حفظ+upload)/update(استبدال upload)/destroy(حذف+رسالة عربية) مع اختلاف النموذج والمسار فقط. يتقاطع مع W-09 (Wolf) حول FormRequests — الحل الأمثل يجمعهما: FormRequest لكل مورد + استخراج نمط الفلترة/الترقيم المشترك.
**الإصلاح المقترح:** لا يستحق abstract controller الآن؛ يُعالج ضمن W-09 عند إدخال FormRequests.

---

### نقاط نظافة إيجابية (لا بقايا debugging)
- **صفر** `dd(/dump(/var_dump(` في app/ — نظيف.
- **صفر** `console.log/debug/info` و `debugger` في resources/js — نظيف.
- **صفر** catch فارغ في PHP وJS (لا يوجد `try/catch` أصلاً — انظر الدين التقني).
- صفر TODO/FIXME/HACK.

### سلامة إعداد Inertia — `resources/views/app.blade.php` ✅
الفحص سليم: `dir="rtl"` على `<html>`، `<title inertia>`، meta CSRF، `@routes` (Ziggy مثبت)، `@vite` يحمّل نفس مدخلي vite.config (css + app.jsx)، `@inertiaHead`/`@inertia`، و`rootView = 'app'` متطابق في `HandleInertiaRequests.php:16`. الإعداد صحيح ولا ينقصه شيء.

---

## 3) الديون التقنية

1. **لا Git ولا CI** — المشروع بلا `.git` وبلا أي pipeline؛ لا حاجز ضد الكسر، ولا تنفيذ تلقائي للاختبارات/Pint. (أعلى دين فردي.)
2. **لا أدوات جودة JS** — لا ESLint/Prettier ولا إطار اختبار؛ `package.json` فيه build/dev فقط.
3. **Pint مثبت (composer) بلا تكامل** — لا `pint.json` ولا تشغيل في CI/pre-commit.
4. **مصانع نماذج غائبة** — 1 من 8 نماذج فقط له Factory → بطّالة كتابة الاختبارات.
5. **phpunit.xml بلا APP_KEY ولا إعداد coverage** — سيفشل/يُعرج في CI.
6. **استعلامات مشتركة بلا كاش** — `HandleInertiaRequests::share()` (الأسطر 47-51) تضرب `settings` و`categories` في كل تحميل صفحة كامل لكل زائر؛ `Setting::allSettings()` بلا `Cache::remember`.
7. **رقم سحري مكرر** `subHours(6)` (سماحية "قائمة الآن") مكرر في `HomeController.php:36` و`EventController.php:20` — يجب أن يكون const واحدة.
8. **إحالات مفتوحة على تقارير الفريق:** بيانات دخول Seeder ثابتة (W-05)، لا Rate limiting (W-02/W-03)، حالات الفعاليات لا تتحدث تلقائياً ولا Scheduler (`routes/console.php` فيه inspire فقط — W-07)، تصعيد صلاحيات editor (W-04).

---

## 4) الأولويات قبل الإنتاج (مرتبة)

| # | الإجراء | الخطورة | المرجع |
|---|---------|---------|--------|
| 1 | `composer install` + تفعيل `RefreshDatabase` وجعل الاختبار الوحيد أخضر، ثم `git init` + CI بدنيا: `composer test` + `pint --test` | Critical | Bug #001، دين 1 |
| 2 | حزمة اختبارات جوهرية (Feature): حماية `/admin` (403 لغير المصرح)، دخول/خروج، CRUD نموذجي واحد (listings) شامل التحقق وupload، `contact.store`، الصفحات العامة ترجع 200 | Critical | القسم 1 |
| 3 | إغلاق ثغرة رفع الملفات + Rate limiting (ليست نطاقي لكنها شرط لإنتاج) | Critical/High | W-01، W-02، W-03 |
| 4 | عزل إدارة المستخدمين/الإعدادات بدور admin (تصعيد صلاحيات editor) | High | W-04 |
| 5 | حسم قرار التقويم (هجري/ميلادي) وتوحيد التنسيق عبر دالة واحدة | Medium | Bug #004 |
| 6 | ربط `newsletter_enabled` بالفوتر وفصل اشتراكات النشرة عن رسائل التواصل | Medium | Bug #002 |
| 7 | إصلاح تجربة المحرر (`can_access_admin`) | Medium | Bug #003 |
| 8 | حذف الملفات الميتة + تنظيف Flash + جدولة `events:sync-status` | Low | Bug #005، #007، W-07 |

---

*انتهى التقرير — أُعد بواسطة Hawk (Code Reviewer & QA) — Dev Pack. لم تُعدَّل أي ملفات مشروع عدا هذا التقرير. المشاكل #001–#009 جاهزة للنقل إلى ISSUES.md.*
