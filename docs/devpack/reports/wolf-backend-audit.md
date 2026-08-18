# تقرير تدقيق الباك اند — Wolf (Dev Pack)

**المشروع:** Events-Square (Laravel 13 + Inertia 3 + React 19 + Sanctum + spatie/laravel-permission)
**التاريخ:** 2026-08-18
**النطاق:** Controllers (عام + Admin)، Models، routes/web.php، routes/api.php، AdminMiddleware، UploadsFiles
**المنهجية:** قراءة كود فقط — لم يُعدَّل أي ملف في المشروع.

---

## 1) الملخص التنفيذي

الكود نظيف عموماً: استخدام جيد لـ `with()` لتفادي N+1، تقسيم صفحي في أغلب القوائم، Route Model Binding بالـ slug، وتحقق (validate) موجود في كل عمليات الكتابة تقريباً. لكن توجد ثغرة رفع ملفات خطيرة في TestimonialController (رفع أي نوع ملف إلى مجلد public) يجب إغلاقها فوراً. لا يوجد Rate Limiting على تسجيل الدخول أو نموذج التواصل (خطر Brute Force وسبام). دور editor يملك صلاحيات إدارة المستخدمين والأدوار مما يسمح بتصعيد الصلاحيات ( demote لمدير). كلمات مرور المدير مكتوبة نصياً في Seeder. حالات الفعاليات سلاسل نصية متغيرة (لا enum) وتتقادم لعدم وجود Scheduler.

---

## 2) النتائج التفصيلية

### W-01 — رفع ملفات تعسفي بدون تحقق (Arbitrary File upload) — **Critical**
- **الموقع:** `app/Http/Controllers/Admin/TestimonialController.php:32,47` + `app/Http/Controllers/Traits/UploadsFiles.php:12` + `config/filesystems.php:50-57`
- **الوصف:** التحقق في `store/update` (الأسطر 26-31 و41-46) يشمل `author/content/rating/is_active` فقط — **لا يوجد أي قاعدة على حقل `avatar`**، بينما `uploadFile()` يخزن أي ملف يُرسل. أسوأ من ذلك: قرص `uploads` جذرُه `public_path('uploads')` أي الملفات تُخدَم مباشرة من الويب سيرفر. ملف `avatar.php` سيُحفظ باسم عشوائي بامتداد `.php` داخل مجلد عام → مسار مباشر لتنفيذ أوامر (RCE) على معظم إعدادات PHP-FPM.
- **الإصلاح المقترح:** إضافة `'avatar' => ['nullable','image','mimes:jpg,jpeg,png,webp','max:2048']` للتحقق، وقصر `uploadFile()` على الصور (فحص mime من جهة الخادم)، ونقل التخزين لقرص `public` (storage) مع منع تنفيذ PHP داخل مجلدات الرفع على مستوى السيرفر.

### W-02 — لا يوجد Rate Limiting على الدخول — **High**
- **الموقع:** `routes/web.php:40` + `app/Http/Controllers/AuthController.php:19-40`
- **الوصف:** `POST /login` بدون أي `throttle` ولا `RateLimiter`. المشروع لا يستخدم Fortify/Breeze فلا يوجد قفل تلقائي للمحاولات → قابلية كاملة لتخمين كلمات المرور (Brute force / Credential stuffing).
- **الإصلاح المقترح:** إضافة `->middleware('throttle:5,1')` على المسار (مع RateLimiter مخصص بمفتاح `email+IP` مثل `Limit::perMinute(5)->by($email.$ip)` مع `ResponseException` برسالة عربية)، أو تبني `Fortify`.

### W-03 — لا يوجد Rate Limiting/Captcha على نموذج التواصل — **High**
- **الموقع:** `routes/web.php:36` + `app/Http/Controllers/ContactController.php:12-25`
- **الوصف:** `POST /contact` عام وغير محدود — بوت سبام يمكنه ملء جدول `contacts` وطلبات قاعدة البيانات بلا قيد.
- **الإصلاح المقترح:** `throttle:3,10` (3 طلبات كل 10 دقائق لكل IP) + حماية captcha (مثل hCaptcha/Cloudflare Turnstile) في الواجهة.

### W-04 — تصعيد صلاحيات: editor يدير المستخدمين والأدوار — **High**
- **الموقع:** `routes/web.php:45-55` + `app/Http/Controllers/Admin/UserController.php:31-59`
- **الوصف:** كل مسارات Admin (بما فيها `users` مع `syncRoles`) محمية بوسيط `admin` واحد يقبل `admin` **أو** `editor` (`AdminMiddleware.php:15`). النتيجة: مستخدم بدور **editor** يستطيع تخفيض دور المدير إلى `user` (السطر 41 لا يمنع تعديل غير الحساب الشخصي إلا للنفس) أو حذف أي مستخدم غير admin → Denial of Service وإضعاف الملكية. كذلك `destroy` يمنع حذف admin لكن `update` لا يمنع سحب دور admin منه.
- **الإصلاح المقترح:** تقسيم الصلاحيات: مسارات `users` و`settings` خلف `role:admin` فقط (الوسيط `role` من Spatie مسجَّل فعلاً في `bootstrap/app.php:23-26` لكنه غير مستخدم)، أو الانتقال لصلاحيات دقيقة (permissions) بدل الأدوار الثلاثة الصلبة.

### W-05 — بيانات دخول مدير مكتوبة نصياً في Seeder — **High**
- **الموقع:** `database/seeders/DatabaseSeeder.php:37-52`
- **الوصف:** `admin@eventssquare-sa.com` بكلمة مرور `Admin@2026` (وكذلك المحرر) ثابتة في الكود. أي بيئة تشغَّل فيها الـ seeders (staging/production) تُفتح فوراً، والكلمة تصبح جزءاً من تاريخ Git.
- **الإصلاح المقترح:** قراءة القيم من `env()` مع قيم افتراضية عشوائية، أو حصر إنشاء المدير بأمر `php artisan app:create-admin` تفاعلي، ومنع الـ seeding في production.

### W-06 — قاعدة `image` تسمح بـ SVG → Stored XSS — **Medium**
- **الموقع:** `app/Http/Controllers/Admin/ListingController.php:106`، `Admin/EventController.php:112`، `Admin/OfferController.php:81`
- **الوصف:** قاعدة `image` تقبل SVG، والملفات تُخدَم من مجلد عام — ملف SVG يحوي `<script>` يُنفَّذ عند فتح الرابط مباشرة (تجاوز Same-Origin للنطاق نفسه يخزن جلسات).
- **الإصلاح المقترح:** استبدالها بـ `'mimes:jpg,jpeg,png,webp'` مع `max:5120`، أو تعقيم SVG إن كان مطلوباً.

### W-07 — حالات الفعاليات نصوص متغيرة ولا تتحدث تلقائياً — **Medium**
- **الموقع:** `app/Http/Controllers/Admin/EventController.php:83-97` + `app/Models/Event.php:45-52` + `routes/console.php`
- **الوصف:** `computeStatus()` تُحسب **لحظة الحفظ فقط**؛ فعالية "قادمة" تبقى upcoming في قاعدة البيانات إلى الأبد رغم بدئها/انتهائها — لا يوجد أمر مجدول. القيم `'upcoming'|'ongoing'|'ended'` سلاسل مكررة في Controller وModel وFrontend بدون enum/const.
- **الإصلاح المقترح:** إنشاء Backed Enum `EventStatus` في Model، والاستغناء عن تخزين الحالة نهائياً لصالح Query Scope محسوبة (`scopeUpcoming/ongoing/ended` بالاعتماد على `starts_at/ends_at`)، أو جدولة أمر `events:sync-status` يومياً.

### W-08 — توليد slug يفشل مع الأسماء العربية — **Medium**
- **الموقع:** `app/Models/Listing.php:52-56`، `Event.php:56-60`، `City.php:35-39`، `Category.php:50-54`، `Offer.php:35-39`
- **الوصف:** `Str::slug($name_en ?: $name)` مع اسم عربي بلا `name_en` تنتج **سلسلة فارغة** (الحروف العربية تُحذف في التحويل ASCII). النتيجة: أول سجلين بنفس الحالة → انتهاك unique → 500 QueryException، وslug فارغ يكسر الروبط `{listing:slug}`.
- **الإصلاح المقترح:** fallback عند الفراغ: `Str::slug(Str::transliterate($name)) ?: Str::random(8)` مع إعادة المحاولة عند تعارض الـ unique (حلقة بسيطة أو حزمة `spatie/laravel-sluggable`).

### W-09 — لا توجد FormRequests + تكرار قواعد التحقق — **Medium**
- **الموقع:** كل المتحكمات؛ مثال مكرر حرفياً: `app/Http/Controllers/Admin/TestimonialController.php:26-31` مقابل `41-46`
- **الوصف:** التحقق inline عبر `$request->validate()` داخل methods خاصة (`validateListing/validateEvent/...`). يعمل، لكنه يكرر القواعد بين store/update، يصعّب اختباره، ويخلط التحقق بمنطق المتحكم. `app/Http/Requests/` فارغ تماماً.
- **الإصلاح المقترح:** استخراج `Store\Update` FormRequest لكل مورد (7 موارد ≈ 12 كلاس) مع رسائل عربية مركزية، وتوحيد `prepareForValidation` لتفريغ النصوص `trim`.

### W-10 — قوائم بلا تقسيم صفحي — **Medium**
- **الموقع:** `app/Http/Controllers/OfferController.php:14-19` (`->get()` للعروض العامة) و`app/Http/Controllers/Admin/TestimonialController.php:20` (`->get()` لكل التقييمات)
- **الوصف:** بقية القوائم (listings/events/users/contacts) تستخدم `paginate(9/12/15)` بشكل صحيح، لكن هاتين القائمتين تجلبان كل الصفوف — يتفاقم مع نمو البيانات.
- **الإصلاح المقترح:** `->paginate(12)->withQueryString()` للعروض العامة و`paginate(15)` للتقييمات في Admin.

### W-11 — Controllers تحتاج طبقة Service في مواضع محددة — **Medium/Low**
- **الموقع:** `Admin/EventController.php:43-52,63-74,83-97` (computeStatus + تركيب البيانات) و`Admin/SettingController.php:46-48` (حلقة كتابات)
- **الوصف:** المتحكمات ليست سمينة بشكل مأساوي (معظمها CRUD نحيف)، لكن منطق الأعمال الحقيقي (حساب حالة الفعالية، توليد slug، كتابة الإعدادات) مبثوث فيها وفي `booted()` — تكرار واختبار صعب.
- **الإصلاح المقترح:** نقل الحالة إلى Enum/Scope (W-07)، وإنشاء `app/Services/SettingsService.php` بـ `setMany(array)` وحصة `Cache::remember` للقراءة، لا حاجة لطبقة Service لكل CRUD الآن.

### W-12 — فلتر status العام بدون قائمة بيضاء — **Low**
- **الموقع:** `app/Http/Controllers/EventController.php:19`
- **الوصف:** `where('status', $s)` بقيمة المستخدم مباشرة — لا خطر SQL Injection (parameterized) لكنها تسمح بقيم عشوائية وتكشف أحداث ended/ongoing بشكل غير منضبط.
- **الإصلاح المقترح:** `->when($request->input('status'), fn($q,$s) => in_array($s,['upcoming','ongoing','ended']) ? $q->where('status',$s) : $q)` أو قاعدة `Rule::in` على الطلب.

### W-13 — محارف البدل LIKE غير مهرَّبة في البحث — **Low**
- **الموقع:** `app/Http/Controllers/ListingController.php:22`، `Admin/ListingController.php:23`، `Admin/EventController.php:23`، `Admin/OfferController.php:20`، `Admin/UserController.php:19`
- **الوصف:** `"%{$s}%"` يسمح للمستخدم بحقن `%` و`_` لتوسيع البحث وإجهاد الاستعلام (LIKE بدون فهرس على description نص طويل).
- **الإصلاح المقترح:** `$s = addcslashes($request->input('search'), '%_\\');` قبل الدمج، وقصر البحث على `name/summary` مع فهرس FULLTEXT أو `scout` مستقبلاً.

### W-14 — الملفات القديمة لا تُحذف عند الاستبدال — **Low**
- **الموقع:** `app/Http/Controllers/Admin/ListingController.php:67-69` (وكذا Event/Offer/Testimonial)
- **الوصف:** رفع صورة جديدة عند التحديث يستبدل المسار فقط — الملف القديم يبقى في `public/uploads` إلى الأبد (تسريب مساحة).
- **الإصلاح المقترح:** `Storage::disk('uploads')->delete($model->cover_image)` قبل الاستبدال + أمر تنظيف دوري للملفات اليتيمة.

### W-15 — رسالة تواصل قد تكون بلا أي وسيلة رد — **Low**
- **الموقع:** `app/Http/Controllers/ContactController.php:16-17`
- **الوصف:** `email` و`phone` كلاهما `nullable` — يمكن استلام رسالة لا يمكن الرد عليها إطلاقاً.
- **الإصلاح المقترح:** `'email' => ['nullable','email','required_without:phone']` والعكس للهاتف.

### W-16 — نقطة `/api/v1/user` تعيد النموذج كاملاً — **Low**
- **الموقع:** `routes/api.php:9-12`
- **الوصف:** `request()->user()` تعيد كل الأعمدة (يخفي `#[Hidden]` كلمة المرور فقط) بما فيها `phone` و`email_verified_at` — تحسس زائد لأي عميل API يحمل توكن.
- **الإصلاح المقترح:** تحديد الحقول صراحة: `$user->only(['id','name','email'])`.

### W-17 — AdminMiddleware يكرر وسيط Spatie الرسمي — **Low**
- **الموقع:** `app/Http/Middleware/AdminMiddleware.php:15` + `bootstrap/app.php:23-26`
- **الوصف:** الوسيط المخصص يفحص `hasRole('admin') || hasRole('editor')` يدوياً بينما `RoleMiddleware` من الحزمة مسجَّل باسم `role` وغير مستخدم — صيانة مزدوجة وتعقيد بلا فائدة.
- **الإصلاح المقترح:** حذف AdminMiddleware واستخدام `->middleware(['auth','role:admin|editor'])` في المجموعة، أو `permission:` عند اعتماد الصلاحيات الدقيقة (W-04).

### نقاط إيجابية مسجلة (للأرشفة)
- **N+1:** استخدام منضبط لـ `with()` في كل القوائم (`HomeController`، `ListingController`، `DashboardController`...) — لا مشكلة N+1 مرصودة.
- **الترتيب:** `orderByRaw('is_featured DESC, id DESC')` و`orderBy('starts_at')` صحيحة، لكنها سلاسل خام وليست const/enum (تُعالج ضمن W-07).
- **صيغة الاستجابات:** متسقة — Flash messages عربية للويب (`with('success'/'error')`) وغلاف JSON موحد `{success, data}` في API، و`shouldRenderJsonWhen` مضبوط على `api/*` فقط.
- **Auth:** تجديد الجلسة بعد الدخول (`session()->regenerate()`)، وتسجيل خروج سليم (invalidate + regenerateToken)، وlogout عبر POST فقط (آمن من CSRF).
- **Slug binding + unique ignore:** `Rule::unique(...)->ignore($request->route(...))` مستخدمة بشكل صحيح في كل الموارد.
- **Mass assignment:** استخدام PHP Attributes `#[Fillable]` + `#[Hidden]` — نمط حديث ونظيف.

---

## 3) أهم 5 إصلاحات مرتبة بالأولوية

| # | الإصلاح | الخطورة | المرجع |
|---|---------|---------|--------|
| 1 | إغلاق ثغرة رفع الملفات: قاعدة `avatar => image + mimes` + قصر التخزين على قرص غير منفَّذ | Critical | W-01 |
| 2 | Rate Limiting على `POST /login` (بمفتاح email+IP) و`POST /contact` | High | W-02, W-03 |
| 3 | عزل إدارة المستخدمين/الإعدادات بدور `admin` فقط ومنع سحب دور admin من غير admin | High | W-04 |
| 4 | إزالة بيانات الدخول الثابتة من Seeder (env/أمر تفاعلي) | High | W-05 |
| 5 | قائمة بيضاء `mimes:jpg,jpeg,png,webp` لكل الصور + Enum لحالة الفعالية مع تحديث مجدول | Medium | W-06, W-07 |

---

*انتهى التقرير — أُعد بواسطة Wolf (Backend Developer & API Engineer) — Dev Pack. لم تُعدَّل أي ملفات مشروع.*
