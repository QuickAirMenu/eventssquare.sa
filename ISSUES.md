# ISSUES.md — متتبع مشاكل المشروع

> يصونه **Hawk** (الجودة) و**Cobra** (الأمن). لا تُغلق مشكلة بدون إصلاح مؤكد واختبار يمنع التراجع.

## مفتوح (متبقٍ من موجة التدقيق — غير أمني)

- **Bug #001 Critical:** `React.useState` بدون استيراد — Admin/Testimonials/Index.jsx:6 (الصفحة تتحطم). المسؤول: Fox — *مقرر في Phase 3/4*
- **Bug #001b High:** درج AdminLayout مكسور مع RTL على الجوال. المسؤول: Fox
- **Bug #001c High:** الهوية البصرية لا تطابق design-files/homepage.html (ألوان + Readex Pro). المسؤول: Lynx + Fox — *المانيفست جاهز في design-files/README.md*
- Bug #002 ✅ مقفلة (2026-08-29) — النشرة تلوث جدول contacts: مسار مخصص + جدول مستقل (انظر قسم الموجة).
- Bug #003 المحرر لا يرى رابط لوحة التحكم. المسؤول: Fox
- Bug #004 التواريخ بالهجري (ar-SA في 9 مواضع). المسؤول: Fox
- Bug #005 ملفات ميتة (app.js، welcome.blade.php). المسؤول: Fox
- Panther: ترحيل القيود (restrict + unique مركب + فهارس FK) — مقرر Phase 3

## ✅ مغلقة — موجة إصلاحات المجتمع Community Review Report (2026-08-29)

> نفّذ: Fox (واجهة) + Wolf (خلفية) + Panther (قاعدة) + Falcon (محتوى) — مراجعة Hawk (بندان متوسطان أُصلحا قبل الدمج). التحقق: `npm run build` ✅ · `artisan test` **24/24** (40 تأكيد). ترحيل جديد `2026_08_29_100000_create_newsletter_subscribers_table` — يُطبَّق عند النشر بـ `migrate --force`.

### إصلاحات الأخطاء (Bug)
- **BUG-01/02 — أسهم السلايدر بمعنى RTL:** بعد تحقيق دقيق ثبُت أن **الحركة صحيحة** (الترجمة الموجبة `translateX` مع `flex` تكشف التالي من اليسار في RTL) — **لم نعكس الإشارة كما اقترح التقرير** لأن ذلك يكسر العرض. المعتمد: مقايضة اتجاه الأسهم (التقدم = سهم يسار، الرجوع = يمين) في RowSlider وTestimonials — Home.jsx.
- **BUG-03 — Flash يُعيد تحميل الصفحة:** زر ✕ كان `window.location.reload()` في الحالتين → إغلاق بحالة React `dismissed` — Flash.jsx.
- **BUG-04/05 — التصفح الناعم بلا تمييز «نشط»:** كان `location.pathname` في مصفوفة الاعتماد دائماً ثابتاً → `usePage().url` + `isActive()` على كل الروابط — Navbar.jsx.
- **BUG-06 — cardIn يتجاوز الرئيسية:** قواعد `cardIn` كانت عامة على كل الشبكات → حُصرت تحت `.home-page` في app.css + Home.jsx.
- **BUG-07 — كلاسات `primary-*` في Flash غير معرّفة:** (المعرّف `brand-*`) → استُبدلت بـ `brand-*`.

### إصلاحات التحسين (Opt)
- **OPT-01:** `htmlFor`/`id` لكل حقول Login/Register/Contact.
- **OPT-02/04:** `nth2` **كلاس وهمي** (التنسيق عبر `:nth-child(2)` وليس كلاساً) → حُذف الكلاس؛ key بالإندكس → `key={f.label}`.
- **OPT-03:** شريط التمرير 10px → 6px (+ بورد thumb 1px للحفاظ على وضوح الجوهر).

### تحسينات التجربة (UX)
- **UX-01:** «جميع الوجهات» أعلى قائمة الوجهات المنسدلة. **UX-03:** «نسيت كلمة المرور؟» زر معطّل دلالياً مع شارة «قريباً». **UX-04:** النشرة تشترك عبر `newsletter.subscribe` — لا تلوّث contact.store. **UX-06:** Sales صارت تقرأ `fieldStyles` المشترك (مع الحفاظ على التباعد 13px السابق). **UX-07:** `aria-label`/`role` للـ fallback. **UX-08:** إغلاق قائمة المستخدم عبر `mousedown` خارجي بدل `onBlur+setTimeout`.

### خلفية + محتوى جديد (خارج التقرير — ضرورة للتكامل)
- **نشرة مستقلة:** ترحيل `newsletter_subscribers` (email فريد) + موديل + `NewsletterController@store` (توحيد الحالة lowercase، كشف مكرر برسالة عربية، معالجة QueryException للسباق، `throttle:3,10`) + مسار POST.
- **صفحتان قانونيتان:** `/privacy-policy` و`/terms` (عربي أصيل — Falcon) عبر `PageController`؛ روابط Footer + عبارة «شروط الاستخدام وسياسة الخصوصية» في Register أصبحت روابط فعلية → **يُغلق WS-05**.
- **BUG-08 (اكتشفته المراجعة) — `primary-*` مفقودة كلياً:** كلاسات `bg-primary-600` إلخ في منطقة الإدارة (AdminLayout/ui.jsx/صفحات Admin) بلا تعريف في `@theme` → أزرار/بادجات الإدارة بلا لون. أُضيفت `--color-primary-*` كمرآة لسلم `brand` (app.css). ملاحظة: التوحيد المستقبلي بين التسميتين مقترح للتشاور.

### بنود مراجعة Hawk المعالجة قبل الدمج
- **فشل صامت عند البريد المكرر** → رسالة خطأ inline `onError` قرب نموذج النشرة.
- **رسالة نجاح مكررة** (Flash أعلى الصفحة + inline) → الاكتفاء بـ inline وإزالة فلاش المتحكم.
- **غياب اختبارات المسارات الجديدة** → `tests/Feature/NewsletterAndLegalRoutesTest.php` (6 اختبارات: صفحات قانونية 200، اشتراك ناجح/قديم/مكرر، وcontact.store متصل).
- تنظيف: كود ميت `اشتراك النشرة` في ContactController، استيراد `Link` الزائد في الصفحتين القانونيتين، تخفيف وعد «إلغاء بضغطة واحدة» (لا آلية إلغاء بعد — عُدّل لطلب التواصل)، توحيد حالة البريد.

### خارج النطاق (قائمة)
- **Bug #012 High** (JSON خام عبر كاش LiteSpeed) و**WS-07** (DNS) — يتبعان وحداتهما.

## مفتوح — مراجعة Hawk (2026-08-28): موجة السلاغات الإنجليزية + UI/UX

## Bug #006 — مسارات 301 الـ11 تستخدم Closures فتكسر `route:cache`

**Found by:** Hawk  
**Severity:** High  
**Agent responsible:** Wolf  
**Status:** Fixed ✅ (2026-08-28)  

**Description:**
مسارات إعادة التوجيه الجديدة في `routes/web.php` (الأسطر 72–84) كلها `fn () => redirect(...)` أي Closures. `php artisan route:cache` يفشل فوراً مع `LogicException: Unable to prepare route [... for serialization. Uses Closure.` — والنشر على الخادم يستخدم `route:cache` حسب فرضية الموجة. التنبيه: `routes/api.php` (الأسطر 6 و9) يحتوي أيضاً كلوجرين سابقين لهما نفس الأثر، فالمشكلة أوسع من هذه الموجة.

**Steps to reproduce:**
1. شغّل `php artisan route:cache` على الفرع الحالي.

**Expected behavior:**
توليد `bootstrap/cache/routes-v7.php` بنجاح.

**Actual behavior:**
فشل التعمية بسبب الـ13 Closure (11 في web.php + 2 في api.php).

**Suggested fix:**
استبدل الـ11 بمكالمات `Route::redirect('/الوجهات', '/destinations', 301)` (تستعمل `RedirectController` القابل للتعمية) أو بمسارات `__invoke` في Controller، وحوّل كلوجر `api.php` إلى Controllers. مع `Route::redirect` تكون المسارات العربية UTF-8 آمنة مع `route:cache` (النمط يبقى سطحياً والـ path يُفك ترميزه قبل المطابقة). إن استُغني عن `route:cache` كلياً تصبح المسارات العربية الحالية تعمل لكن تبقى خطوة النشر الموثقة معطلة.

## Bug #007 — OR غير مُجمّع في `HomeController::discover()` يمرّر تصنيفات غير مفعّلة

**Found by:** Hawk  
**Severity:** Medium  
**Agent responsible:** Wolf  
**Status:** Fixed ✅ (2026-08-28)  

**Description:**
في `app/Http/Controllers/HomeController.php:76-84` الشرط:
`$q->where('is_active', true)->whereIn('slug', $destinationSlugs)->orWhere('type', 'destination')`
يُقيَّم كما يلي: `(is_active = 1 AND slug IN (...)) OR (type = 'destination')`. الفرع الثاني غير محمي بـ `is_active`، أي أن أي وجهة تصنيفها `type = 'destination'` — حتى لو كان التصنيف غير مفعّل — تظهر في صفحة DiscoverAsir.

**Steps to reproduce:**
1. عطّل تصنيفاً فرعياً وجهة في اللوحة.
2. افتح `/discover-asir`.

**Expected behavior:**
لا تظهر وجهات التصنيفات غير المفعّلة للعموم.

**Actual behavior:**
تظهر لأن شرط `orWhere` يتجاوز `is_active`.

**Suggested fix:**
جمّع الشرط: `$q->where(function ($w) use ($destinationSlugs) { $w->where('is_active', true)->whereIn('slug', $destinationSlugs)->orWhere(function ($t) { $t->where('is_active', true)->where('type', 'destination'); }); })`.

## Bug #008 — تباين نصوص رمادية خافتة على خلفية الساند في صفحات الدخول/التسجيل/التواصل

**Found by:** Hawk  
**Severity:** Medium  
**Agent responsible:** Fox  
**Status:** Open  

**Description:**
نصوص وصفية بحجم 12–14px بلون `#6b7280` على خلفية `--sand: #f8f6f0` في Login.jsx وRegister.jsx وContact.jsx. نسبة التباين ≈4.4:1 (أقل من 4.5:1 المطلوبة في WCAG AA للنص العادي)، وتنخفض أكثر عند 12px.

**Steps to reproduce:**
1. افتح `/login` أو `/register` أو `/contact-us`.
2. افحص التباين للجمل تحت العناوين (مثل «أكمل من حيث توقفت…»).

**Expected behavior:**
نسبة ≥4.5:1 للنصوص المعلوماتية.

**Actual behavior:**
≈4.4:1 على الساند.

**Suggested fix:**
استبدال `#6b7280` بـ `#4b5563` (≈6.8:1) أو `#5b6472` في النصوص 12–14px، أو رفع الحجم إلى 14px+ مع `font-medium`.

## Bug #009 — ترتيب التشغيل بين ترحيل السلاغات والسيدر قد ينتج تكراراً في `categories`

**Found by:** Hawk  
**Severity:** Low  
**Agent responsible:** Wolf  
**Status:** Fixed ✅ (2026-08-28)  

**Description:**
`seedCategories()` يعتمد `firstOrCreate(['slug' => english])`. إذا شُغّل السيدر قبل ترحيل `2026_08_28_000000_update_category_slugs_to_english` (أو بعد `migrate:rollback` عكسياً) على قاعدة تحتوي سلاغات عربية، يُنشأ صف إنجليزي جديد بجانب العربي → ثم فشل `unique` على `categories.slug` عند الترحيل أو دوّغرة عند إعادة السيدر. `down()` يرجع الحالة العربية تماماً بينما السيدر الجديد إنجليزي — أي أنهما غير متوافقين في دورة down → migrate.

**Steps to reproduce:**
1. قاعدة قديمة بسلاغات عربية.
2. شغّل `db:seed` قبل `migrate`.

**Expected behavior:**
لا تكرار، والترحيل يكتمل.

**Actual behavior:**
صفوف مكررة أو انتهاك `unique` للسيلاغ.

**Suggested fix:**
توثيق ترتيب النشر إلزامياً: `php artisan migrate` ثم `db:seed` (وليس العكس). ويمكن جعل الترحيل متسامحاً بحذف/دمج التكرار إن وُجد قبل التحديث.

## Bug #010 — رابط `?package=` في Contact لا يُحدِّث النموذج عند الانتقال الناعم بين باقات

**Found by:** Hawk  
**Severity:** Low  
**Agent responsible:** Fox  
**Status:** Open  

**Description:**
`Contact.jsx` يشتق `subject`/`message` من `selectedPackage` في أول استدعاء لـ `useForm` فقط. عند تنقّل Inertia ناعم من `/contact?package=A` إلى `/contact?package=B` لا يُعاد إنشاء النموذج فلا تتحدث الحقول. (الحماية بـ `typeof window !== 'undefined'` لـ `window.location.search` سليمة وتمنع crash في SSR ✓ لكنها لا تعالج إعادة الإنشاء.)

**Steps to reproduce:**
1. افتح صفحة تبيع باقات ثم انتقل إلى `/contact?package=باقة-أ`.
2. انقر رابط باقة أخرى دون إعادة تحميل.

**Expected behavior:**
يتحدث النص التمهيدي والحقول حسب الباقة الجديدة.

**Actual behavior:**
يبقى نص الباقة الأولى.

**Suggested fix:**
إضافة `key={selectedPackage}` على النموذج أو مزامنة القيم عبر `useEffect` عند تغيّر `package`/`selectedPackage`.

## Bug #011 — مسار `/categories/{category:slug}` لا يتحقق من `is_active` للتصنيف

**Found by:** Hawk  
**Severity:** Low  
**Agent responsible:** Wolf  
**Status:** Fixed ✅ (2026-08-28)  

**Description:**
`ListingController::byCategory()` يستقبل التصنيف عبر الربط الضمني `{category:slug}` (يعمل كربط حقيقي: `firstOrFail` عبر عمود `slug` الفريد ✓) لكنه لا يفحص `is_active`. أي تصنيف معلّق أو مُعطّل يبقى صفحته العامة متاحة بالرابط المباشر، بينما طريق `show` للوجهات محمي بـ `abort_unless($listing->is_active, 404)`.

**Steps to reproduce:**
1. عطّل تصنيفاً في اللوحة.
2. افتح `/categories/{slug-التصنيف}`.

**Expected behavior:**
`404` للتصنيفات غير المفعّلة.

**Actual behavior:**
صفحة عامة تعرض وجهات التصنيف.

**Suggested fix:**
`abort_unless($category->is_active, 404);` في بداية `byCategory()`.

## Bug #012 — `down()` في ترحيل السلاغات يعكس صفوفاً لم يمسسها `up()` (حالة الإنجليزي-سابقاً)

**Found by:** Hawk  
**Severity:** Low  
**Agent responsible:** Wolf  
**Status:** Open (غير مانعة للنشر — ذاتية الشفاء)

**الوصف:**
في `2026_08_28_000000_update_category_slugs_to_english.php` سطر down() 53:
`if ($english && ! $arabic) { ... update to arabicSlug }` — لا تفرّق هذه الحالة بين «إنجليزي وُلد من `up()` لأصل عربي» (يستحق الرجوع) و«إنجليزي وُجد قبل الترحيل من السيدر الجديد» (up() لم يمسه — لا يستحق الرجوع). فإذا رُكّب السيدر الإنجليزي أولاً ثم شُغّل `migrate:rollback`، تُحوَّل صفوف إنجليزية كانت قائمة أصلاً إلى عربية. كذلك حالة «الصفّان معاً» تُحذف العربية نهائياً في up() وdown() لا يعيد الازدواجية بل يحوّل الإنجليزية إلى عربية (المراجع تبقى سليمة على نفس المعرّف).

**الخطوات:**
1. قاعدة بالسلاغات الإنجليزية (السيدر الجديد رُكّب قبل الترحيل).
2. شغّل `migrate:rollback` لهذا الترحيل.

**المتوقع:**
لا يغيّر down() صفوفاً لم يمسسها up(). 

**الفعلي:**
يعيد تسميتها إلى العربية رغم أنها كانت إنجليزية قبل الترحيل أصلاً.

**ملاحظة الشفاء الذاتي:**
لا يوجد فقدان بيانات أو انتهاك unique؛ إعادة `up()` تصلحها كلها (عربي فقط → إنجليزي). والإجرائي الموصى به في PLAN.md N6 (`migrate --force` قبل `db:seed --force`) يمنع السيناريو. الإصلاح المقترح إن رُغب بالدقة: تسجيل أثر الترحيل (مثلاً عمود مؤقت/جدول سجل) أو توثيق أن down() تحوّل «كل» الإنجليزية إلى العربية كمحطة رجوع للعصر العربي ككل.

## 🦁 Lion — سجل النشر الحي (2026-08-28): موجة المسارات الإنجليزية + ترحيل السلاغات + UI/UX

> تنفيذ Lion على السيرفر. الإجمالي: ✅ نُشر بنجاح (التفاصيل في الملخص أدناه). الانحرافات أدناه بيئية/تشغيلية — لم يُعدَّل أي كود تطبيق.

### الملخص الفني
- الدومين: `https://eventssquare.sa` — مجلد التطبيق: `/home/u546723891/domains/eventssquare.sa/laravel_app`
- git: `1fa5149..f90f8df master` عبر `scripts/deploy.sh --branch master --assets-tar /home/u546723891/assets-events.tar.gz` — HEAD عند `f90f8df`
- composer install --no-dev ✅ | الأصول: tarball مسطّح (`manifest.json` على الجذر) → `public/build` ✅
- migrate --force: `2026_08_28_000000_update_category_slugs_to_english` ✅ (لم يُشغَّل seed — كما هو مقرر)
- config/route/view/event cache ✅ | queue:restart ✅ | storage:link (رابط موجود مسبقاً — حالة سليمة)
- الفحوص بعد النشر: `/` → **200** | `/destinations` → **200** | `/الوجهات` → **301** → `location: /destinations` ✅
- `php artisan route:list --path=destinations` → `listings.index › ListingController@index` ✅

### انحرافات / ملاحظات بيئية (لا تُعدّل كوداً — قرارات لاحقة)
1. **INFRA — PHP CLI الافتراضي 8.1 يكسر preflight الـ deploy:** `/usr/bin/php` → `/etc/cl.selector/php-cli` (CloudLinux selector) يعيد **PHP 8.1.34**، فيفشل `deploy.sh` عند `PHP >= 8.3 required`. الحل المعتمد في هذه الموجة: `export PATH=/opt/alt/php84/usr/bin:/usr/local/bin:/usr/bin:/bin` قبل `bash scripts/deploy.sh`. الموقع نفسه يُخدم عبر FPM 8.3.30 (`x-powered-by: PHP/8.3.30`). **مقترح:** تجهيز PHP 8.3/8.4 في PATH داخل `deploy.sh` أو توثيق إلزامي في PLAN.md.
2. **DEV — `APP_URL` في `.env` إنتاجياً `https://eventssquare-sa.com`** رغم أن النشر والتحقق على `eventssquare.sa`. لم يُمسّ (الدومين الممنوع لمسه في PLAN.md)، ولأن توجيه الـ301 الناتج نسبي (`/destinations`) لم يؤثر على الفحص. لكنه يبقى مصدراً محتملاً لروابط مطلقة خاطئة (بريد، Ziggy base URL). **مقترح:** تصحيحه إلى `https://eventssquare.sa` في موجة لاحقة بموافقة القائد.
3. **INFRA — خطوة "Restarting php-fpm" no-op على الاستضافة المشتركة:** لا `systemctl` بصلاحية المستخدم، فالخطوة لا تفعل شيئاً بصمت. لا أثر سلبي مؤكد — الكود الجديد التُقط فوراً (الفحوص 200/301 في نفس الدقائق). **مقترح:** اعتماد بديل مثل `kill -USR2` لـ PHP-FPM المعروف أو تجاهل مقصود موثق.
4. **DB — `DB_CONNECTION=sqlite` إنتاجياً (N1 سابق):** deploy.sh تخطّى mysqldump backup حسب التصميم (`DB_CONNECTION is not mysql, or mysqldump missing — backup skipped`). الترحيل نفّذ على sqlite بنجاح. مطابق للقرار N1 في PLAN.md — يُرحَّل إلى MySQL عند توفره من hPanel.

## 🦁 Lion — سجل النشر الحي (2026-08-28b): موجة UI — إعادة تصميم Login/Register/Contact + shared fieldStyles

> تنفيذ Lion. الحالة: ✅ نُشر بنجاح. التفاصيل مختصرة (طلبت خُلاصة فقط).

- `git`: f90f8df..2b315d4 master → HEAD `2b315d4` | `composer install --no-dev` ✅ | الأصول المسطّحة → `public/build` ✅ | `migrate --force` → **Nothing to migrate** (موجة UI لا موجات جديدة — متوقع) | caches ✅ | queue:restart ✅
- الفحوص: `/` **200** | `/login` **200** | `/register` **200** | `/contact-us` **200**
- **ملاحظة (انحراف تعليمات — ليس خللاً):** `https://eventssquare.sa/contact` → **404** لأن المسار العام لصفحة التواصل في التطبيق هو `contact-us` (web.php: `contact-us ... contact > PageController@contact`)؛ لا يوجد مسار `/contact` عام. صفحة Contact المحدّثة تُخدم عند `/contact-us` وتعطي 200. أي فحص لاحق يجب أن يستخدم `/contact-us`.
- تنظيف: tarball حُذف من السيرفر تلقائياً بواسطة deploy.sh ✅ | لا انحرافات بيئية جديدة (ملاحظات الموجة السابقة قائمة: PHP 8.1 افتراضياً/N7، APP_URL، sqlite/N1).

## 🦁 Lion — صيانة إنتاج صغيرة (2026-08-28): تصحيح `APP_URL` في `.env`

> تنفيذ Lion. الحالة: ✅ تم. انحراف واحد غير مُسبَّب من الإعداد — موثّق أدناه.

- **قبل:** `APP_URL=https://eventsquare-sa.com` (الدومين غير المرغوب) → **بعد:** `APP_URL=https://eventsquare.sa`. نُسخت `.env` إلى `.env.bak-20260828` (600, ملكية u546723891 — غير عامة) قبل التعديل، و`sed -i` حافظ على الختم 600. `config:clear` + `config:cache` نُفّذا (PHP 8.4). التحقق: `config('app.url')` عبر tinker الطباع `https://eventsquare.sa` ✅ والموقع 200 ✅.
- **انحراف (بيانات محتوى — ليس من الإعداد):** الرئيسية ما تزال تعرض 4 إشارات إلى `eventsquare-sa.com` داخل حقول `link` لـ 4 عروض مخزّنة في قاعدة البيانات (`/yoshapottery/`, `/br-by-batool/`, `/sketch-art/`, `/wa/`) — مصدرها السيدر وليس `APP_URL` أو إعادة توجيه. `/login` و`/register` و`/contact-us` خالية من الدومين المذكور ✅. لا تعديل على البيانات (خارج نطاق هذه المهمة) — يُقرر الفريق إزالتها/تحديثها إن لزم.

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

- 🔴 **WS-07 Critical (Config/DNS — Availability):** النطاق `eventsquare.sa` غير موجود في DNS العام (NXDOMAIN عند السجل السعودي) والموقع غير قابل للوصول من الإنترنت إطلاقاً — **مفتوح** (تفاصيل في «المراجعة الأمنية ما بعد النشر 2026-08-29» أدناه).
- 🟡 **WS-02 Low (Auth/Enumeration):** تسجيل بريد مكرر يكشف وجود الحساب (مخفف بـ throttle) — مفتوح.
- ✅ **WS-05 Medium (PDPL/Trust):** مقفلة (2026-08-29) — صُدرت صفحتا الشروط والسياسة الفعليتان وربطهما في Footer وRegister.
- ℹ️ **WS-08 Info (Config):** `eventsquare-sa.com` أيضاً NXDOMAIN في DNS العام — خارج نطاق المشروع، ملاحظة توثيقية — مفتوح.

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

## مغلق — الموجة (2026-08-28، نفّذ Wolf)
- ✅ **Hawk #10 High (XSS/External links):** الروابط الخارجية (`Listing.website`, `Offer.link`) لم تُقيَّد → أُضيف `starts_with:http://,https://` على قاعدة `url` في متحكمي admin، وأُضيف accessor في كل نموذج يعيد `null` لأي رابط لا يبدأ بـ `http`. **مغلق**
- ✅ **؟search على الأحداث:** EventController يدعم `search` (title/description) مع trim + ترقيم. **مغلق**
- ✅ **DiscoverAsir:** تمرير الوجهات الكاملة عبر مفتاح `listings` مع `heritageListings` متوافق. **مغلق**
- ✅ **/contact?package=...:** تمرير `package` نظيفاً إلى صفحة Contact. **مغلق**

## مغلق — تفعيل الاختبارات + موجة السلاغات الإنجليزية (2026-08-28، نفّذ Hawk)

- ✅ **Bug #001d Critical (الاختبارات معطلة):** فُعّل `RefreshDatabase` في `tests/Feature/ExampleTest.php` (إزالة تعليق الاستيراد + وسم `use RefreshDatabase` داخل الفئة) وفي `tests/Feature/EnglishRoutesTest.php` الجديد — القاعدة `:memory:` تُهاجر بالكامل قبل الاختبار. أُنشئ `tests/Feature/EnglishRoutesTest.php` (16 اختبار دخان): 11 مساراً إنجليزياً عاماً (`/`, `/destinations`, `/events`, `/offers`, `/activities`, `/login`, `/register`, `/contact-us`, `/discover-asir`, `/about`, `/sales` → `assertOk()`) + 4 إعادة توجيه دائمة UTF-8 (`/الوجهات`→`/destinations`, `/تسجيل-دخول`→`/login`, `/انشاء-حساب`→`/register`, `/معالم-ومنتزهات`→`/categories/landmarks-parks` → `assertStatus(301)` + `assertRedirect(...)`, بلا loop) + صفحة تصنيف على قاعدة فارغة تسمح بـ 200/404 دون افتراض مسبق (لا يتطلب سيدراً). **الإثبات:** `artisan test` → `18 passed / 18 total, 26 assertions, 1.364s` (كانت بنية الاختبارات معطلة قبل تفعيل `:memory:` بمهاجرة واحدة). ملاحظة بيئة: `vendor/` كان فارغاً فأُعيد `composer install` بـ `C:\laragon\bin\composer\composer.phar` (115 حزمة من `composer.lock`) — بدون ذلك لا يعمل أي اختبار.

## مغلق — الواجهة (2026-08-28، نفّذ Fox)
- ✅ **M1/M5:** «المبيعات» في قائمة الجوال + توحيد تسمية القائمة إلى «العروض والإعلانات» — Navbar.jsx
- ✅ **M4:** تبويبات الفعاليات فلترة خادمية `?status=` — Events/Index.jsx
- ✅ **M2/M3:** تمرير اسم الباقة + واتساب ديناميكي `settings.whatsapp` + نموذج طلب عرض سعر — Sales.jsx
- ✅ **M8:** `type="tel"` + تمرير `package` تلقائياً — Contact.jsx
- ✅ **M6:** زر «تواصل / احجز عبر واتساب» في CTA الفعالية — Events/Show.jsx
- ✅ **LCP:** prop `eager` لـ Cover + رفع lazy عن صور الغلاف — ui.jsx / Events/Show / Listings/Show
- ✅ **L4:** إزالة `dir="ltr"` من حقول كلمات المرور — Login/Register
- ✅ **H4:** تفعيل فلاتر DiscoverAsir عميلياً + حالة فارغة
- ✅ **H3:** شريط بحث `?search=` مع debounce — Listings/Index و Events/Index
- ✅ **L6:** meta descriptions عربية لـ 8 صفحات

## مغلق — توحيد السلاغ + واجهة صفحات الدخول/التسجيل/تواصل (2026-08-28، نفّذ Fox)
- ✅ **توحيد السلاغات العربية → الإنجليزية** للخمس فئات (خريطة منسق): Home.jsx، Footer.jsx، DiscoverAsir.jsx (FILTER_MAP). تحقّق grep من عدم بقاء أي سلاغ عربي من الخمسة في `resources/js`.
- ✅ **Login.jsx:** سبلت بعمود إعلامي متدرج + شريط جوال + عين إظهار/إخفاء + رسالة خطأ/نجاح بارزة + أيقونات حقول RTL + فواصل تركيز.
- ✅ **Register.jsx:** نفس السبلت + عين للحقلين + مؤشر قوة كلمة المرور (طول/رقم/حالة/رمز).
- ✅ **Contact.jsx:** أيقونات حقول + بطاقة ساعات العمل + بطاقة موقع بزر خرائط جوجل + أسهم وظل hover لقنوات التواصل.

## 🐍 Cobra — إعادة التحقق النهائية قبل النشر (2026-08-28): قراءة فقط

> مراجعة قراءة فقط (لم يُعدَّل كود). تحقّق من إصلاحات الموجة الإلزامية عبر فحص الملفات + `php -l` (8 ملفات سليمة) + `route:cache`/`route:clear` ينجحان.

- ✅ **WS-01 Fixed (مؤكد):** الترحيل اندماجي متسامح. السيناريوهات الثلاثة معالجة: العربي+الإنجليزي → نقل `listings`/`events` عبر `moveReferences()` ثم حذف العربي؛ العربي فقط → تحديث سلاغ؛ الإنجليزي فقط → لا شيء (سيدر جديد سبقه — بصمة سليمة). `down()` يعيد العربي فقط إن وُجد الإنجليزي دون العربي (لا فراغ، لا حذف بلا نقل). لا كسر لفهرس `unique`.
- ✅ **WS-03 Fixed (مؤكد):** `$middleware->trustHosts(at: [...])` يضبط `$this->trustHosts = true` → يدرج `TrustHosts::class` في القائمة العامة (Middleware.php:456). و`TrustHosts::handle()` (TrustHosts.php:74,99-103) يتجاوز الفرض عند `environment('local')` أو `runningUnitTests()`. البيئة المحلية `APP_ENV=local` + `APP_URL=http://localhost:8000` → لا يكسر dev/tests؛ البيئة والإنتاج يُفعل الفرض على النطاقات الثلاثة فقط. `redirect()` من الـ AuthController يقرأ `intended` بلا حقن نطاق خارجي.
- ✅ **WS-04 Fixed (مؤكد):** `HomeController::discover()` (سطر 76-87): `whereHas('category', ... where('is_active', true) → where(fn(in-slug OR type))` — كل فرع داخل الـ where الحالي محمي بـ `is_active` للفئة. لا تسرّب تصنيفات معطلة في /discover-asir.
- ✅ **بيانات إضافية مؤكدة:** بوابات الـ301 كلها `Route::redirect` بمسار ثابت ورمز 301 (web.php:73-85) — لا توجيه ديناميكي، لا `javascript:`/`data:` في أي تطبيق أو مورد. كلوجرا api.php استُبدلا بـ `HealthController` و`UserController` (`__invoke`). نهاية `/api/v1/user` تعيد `$request->user()` مع `#[Hidden(['password','remember_token'])]` في `User.php`؛ التوكن نفسه في جدول `personal_access_tokens` ولا يُسلسل مع الكائن. لا كلمة مرور/توكن في الرد. `route:cache`/`route:clear` ينجحان (لا Closure في web/api).

**حكم Cobra: 🟢 CLEARED — لا ثغرة أمنية جديدة من الموجة.**
حالة الموجة: WS-01 ✅ Fixed / WS-03 ✅ Fixed / WS-04 ✅ Fixed / WS-06 Accepted. WS-02 و WS-05 متبقيان كملاحظات غير مانعة (وُثّقت أعلاه): WS-02 Enumeration مخففة بـ throttle، WS-05 PDPL توثيقي — كلاهما يجب معالجته قبل الإطلاق الكامل (Publication) لكنه غير عائق للنشر الفني لهذه الموجة.

## 🐍 Cobra — المراجعة الأمنية ما بعد النشر (2026-08-29): فحص خارجي على الإنتاج — قراءة فقط

> مراجعة من الخارج على `https://eventsquare.sa` بعد النشر الحي `2b315d4` (موجة UI + المسارات الإنجليزية). قراءة فقط — لم يُعدَّل كود ولا بيئة (الاستثناء الوحيد: توثيق النتائج هنا في ISSUES.md كما يفترض بروتوكول Cobra).
> الفحوص المطلوبة: securityheaders.com، `/.env`، سلوك الـ301، عينة انتشار — ولم تُلمس أي أسرار.

### النتيجة الجوهرية: 🔴 BLOCK — النطاق غير قابل للوصول من الإنترنت إطلاقاً

- **WS-07 🔴 Critical (Config/DNS — Availability) — AGENT: Lion — STATUS: Open:**
  - `eventsquare.sa` → **NXDOMAIN** عند السجل السعودي: استعلاما A وNS عبر `dns.google` يعيدان `Status:3` مع Authority على منطقة `sa.`؛ تأكيد إضافي بالسيرفرات 8.8.8.8 و1.1.1.1، وwhois (المنتج لا يحمل سجلاً). أي: النطاق **غير مسجّل/غير مفعّل/بلا تفويض NS فعّال** في SaudiNIC.
  - على IP النشر المعروف (`62.72.15.76`، من PLAN.md سطر 30): منفذ 443 مفتوح TCP، لكن **TLS يُرفض مع `SNI=eventsquare.sa`** (`SEC_E_ILLEGAL_MESSAGE` — إنذار SSL فادح من الإيدج)، وHTTP/1.1 على منفذ 80 مع `Host: eventsquare.sa` يعيد **403 حظر hPanel** (`Server: LiteSpeed`, `platform: hostinger`, `panel: hpanel`). أي: **لا vhost فعّال للنطاق على الاستضافة**.
  - الأثر: الموقع لا يُزار من أي زائر خارجي الآن. كل فحوص الهيادات و`/.env` والـ301 الخارجية **غير قابلة للتنفيذ** حتى يُحلّ النطاق ويُفعّل vhost. فحوص Lion اللاحقة للنشر (200/301 من سجل 2026-08-28) تمت من داخل بيئة السيرفر/شبكته ولا تعكس الوصول العام.
  - الإصلاح: (1) التحقق من حالة تسجيل `eventsquare.sa` لدى المسجّل المعتمد لـ SaudiNIC — تفعيل/شراء النطاق إن لم يكن مفعلاً؛ (2) إنشاء تفويض NS و/أو سجلات A إلى استضافة Hostinger في لوحة DNS المزوّد؛ (3) بعد ظهور DNS: تأكيد أن hPanel يعرّف النطاق كأضافة (Addon) مع vhost LiteSpeed فعّال، وإصدار شهادة SSL (AutoSSL)؛ (4) إعادة هذا الفحص الخارجي كاملاً بعدها.
  - المرجع: OWASP A5 (Security Misconfiguration) — عدم توفر الخدمة/خطر خبيث على النطاق.

### بنود الفحص (كما طُلبت)

| # | الفحص | الحالة | التفصيل |
|---|-------|--------|---------|
| 1 | securityheaders.com على `https://eventsquare.sa` | ❌ غير قابل للتنفيذ | المخدم يرفض الزحف الآلي (403 على API وUI — يتطلب متصفحاً/مفتاحاً)، والأهم: **لا يمكن مسح نطاق غير موجود في DNS**. صندوق الهيادات غير مُقيَّم حالياً — لا تأكيد ولا نفي لوجود CSP / X-Frame-Options / HSTS / nosniff / referrer-policy / permissions-policy. |
| 2 | GET `/.env` + `/.env.bak` + `/.git/config` | ✔️ بلا تسريب (بدلالة عدم الوصول) | بسبب WS-07 لا يوجد اتصال خارجي أصلاً (حالة curl `000`)، فلم يُقدَّم أي محتوى لأي مسار. لا يُحتسب هذا «نجاح فحص»؛ يُعاد بعد إصلاح الوصول. |
| 3 | سلوك الـ301 خارج النطاق | ⚠️ غير قابل للتحقق خارجياً | فحص Lion من داخل السيرفر أظهر redirect نسبياً سليماً: `/الوجهات → /destinations`. خطر كامن مرصود سابقاً: `APP_URL=https://eventsquare-sa.com` في `.env` الإنتاج (انحراف مسجّل في ISSUES.md) — أي رابط مطلق يُبنى منه (بريد/Ziggy/تحقق بريد) سيشير لنطاق خارج النطاق وغير موجود أصلاً. |
| 4 | عينة انتشار `/`, `/login`, `/register`, `/contact-us` + مسار عربي | ❌ FAILED خارجياً | من الخارج: كلها `000` (لا اتصال) بسبب WS-07. من تسجيل Lion الداخلي (2026-08-28): `/` و`/login` و`/register` و`/contact-us` = 200، والمسار العربي = 301 → `/destinations` — لا يعوّض الفحص الخارجي. |
| 5 | التزام «لا أسرار» | ✔️ ملتزم | لم تُقرأ أي أسرار؛ البيانات المستخدمة عامة (DNS/whois/هيادات HTTP). |

### ملاحظات إضافية
- **WS-08 ℹ️ Info (Config) — AGENT: Lion — STATUS: Open (توثيقي):** `eventsquare-sa.com` أيضاً NXDOMAIN في DNS العام (`dns.google` Status:3). خارج نطاق المشروع (محظور اللمس بقرار PLAN.md سطر 6) — للمعلومية فقط.
- فحص IP الأصل بلا اسم نطاق: HTTPS وHTTP على `62.72.15.76` يعيدان **403** (صفحة حظر Hostinger الافتراضية) — سلوك سليم يمنع استضافة افتراضية عناوين غير معروفة، لا يُحتسب خللاً.

**الحكم: 🔴 BLOCK — لا يمكن اعتبار المشروع «منشوراً حياً» حتى يُحل النطاق ويُفعّل vhost+SSL.** القرار لـ Dragon وLion. بعد الإصلاح تُعاد هذه الفحوص الأربعة كاملة من الخارج بذات المنهجية.

## 🐍 Cobra — مراجعة الموجة (2026-08-28): مسارات إنجليزية + ترحيل سلاغات + صفحات Auth/Contact

> نتائج مراجعة أمنية قراءة فقط (لم يُعدَّل كود). وسم النتائج الجديدة: WS (Wave Security).
> ملاحظة: لم تُفتح C-01..03 / H-01..04 من جديد — التراتل على /login و/register و/contact قائم، ورفع الملفات لم يُمس.

- **WS-01 🟡 Medium (Logic/Config) — AGENT: Panther + Wolf — STATUS: Fixed ✅ (2026-08-28):**
  ترحيل `2026_08_28_000000_update_category_slugs_to_english` يستخدم `WHERE slug = arabic` ثم `UPDATE` إلى سلاغ إنجليزي تحت فهرس `slug` الفريد. لو وُجدت صفوف بنفس السلاغ الإنجليزي مسبقاً (مثلاً: تشغيل `db:seed` الجديد قبل `migrate` على قاعدة لا تزال تحمل السلاغات العربية، أو نشر جزئي) → انتهاك unique أثناء النشر = فشل الترحيل. والترتيب الخاطئ نفسه يجعل `$cat('landmarks-parks')` في seeder يعيد null → قوائم بدون `category_id`. الإصلاح قبل الإنزال: إمّا ضمان `migrate --force` قبل أي `db:seed` في سكربت النشر، أو جعل الترحيل اندماجياً (إن وُجد الصف الإنجليزي: نقل `listings/events` من الصف العربي إليه ثم حذف العربي؛ وإلا التحديث المباشر).
- **WS-02 🟢 Low (Auth/Enumeration) — AGENT: Wolf — STATUS: Open:**
  `unique:users,email` في register يكشف وجود/عدم وجود البريد (مخفف بـ `throttle:5,1`). ولا يوجد توثيق بريد → يمكن تسجيل بريد ضحية (إزعاج/احتكار عنوان، دون استيلاء على حساب موجود). إصلاح مقترح: رسالة موحدة «راجع بريدك لتفعيل الحساب» + تفعيل verifikasi البريد، أو قبول المخاطرة.
- **WS-03 🟢 Low (Auth/Open-Redirect) — AGENT: Wolf + Lion — STATUS: Fixed ✅ (2026-08-28):**
  `redirect()->intended()` بعد الدخول يقرأ `url.intended` من الجلسة (يُخزَّن من طلب سابق عبر `fullUrl()`). لا يوجد `$middleware->trustHosts()` في `bootstrap/app.php` → مع حقن Host header (عبر بروكسي/كاش لا يتحقق من الـ Host)، يمكن توجيه ما بعد الدخول إلى نطاق خارجي. الإصلاح: تفعيل `trustHosts` لنطاقات المشروع + اعتماد `redirect()->intended(route('home'))`.
- **WS-04 ℹ️ Info (Logic) — AGENT: Wolf — STATUS: Fixed ✅ (2026-08-28):**
  `HomeController::discover()`: `whereHas(... ->where('is_active', true)->whereIn(...)->orWhere('type','destination'))` — الـ `orWhere` يسقط شرط `is_active` عن الفئة (OR غير مجمّع)؛ قوائم نشطة تحت فئات معطّلة قد تظهر في /discover-asir. الإصلاح: تجميع الشروط الضرورية داخل `orWhere`.
- **WS-05 🟡 Medium (PDPL/Trust) — AGENT: Fox + Lion — STATUS: Open:**
  Register: «بالتسجيل … توافق على شروط الاستخدام وسياسة الخصوصية» + Login/Register: «خصوصية بياناتك محمية بالكامل»، بينما روابط السياسة/الشروط في Footer هي `#` (غير منشورة). ادعاء موافقة على وثيقة غير موجودة + وعد خصوصية بلا ضابط = فجوة موافقة بموجب نظام PDPL السعودي. الإصلاح: نشر صفحتي شروط وسياسة فعليتين وربطهما بالنصوص، أو تخفيف الصياغة.
- **WS-06 ℹ️ Info (Config/Disclosure) — AGENT: Lion — STATUS: Accepted Risk (مؤقت):**
  `Setting::allSettings()` مشارَك لكل الزوار عبر `settings` prop (فون/بريد/سوشيال/عنوان). حالياً بيانات تواصل عامة — لا سرّ؛ لكن أي مفتاح حساس يُضاف مستقبلاً للإعدادات سيتسرب. الإصلاح: whitelist للمفاتيح المسموح بمشاركتها في `HandleInertiaRequests`.

## مغلق — موجة الإصلاحات الإلزامية قبل النشر (2026-08-28، نفّذ Wolf)

> استكمالاً لمراجعة Hawk/Cobra (حكم NO-GO). كلها مطلوبة قبل النشر. تم التحقق: `php -l` سليم لكل ملف + `php artisan route:cache` ينجح ثم `route:clear`.

- ✅ **Bug #006 High (route:cache):** الـ11 كلوجر في `routes/web.php` استُبدلت بـ `Route::redirect(مصدر, وجهة, 301)` (RedirectController قابل للتعمية)، وكلوجرا `routes/api.php` استُبدلا بـ `HealthController` و`UserController` (`__invoke`). **الإثبات:** `route:cache` → `INFO Routes cached successfully` بلا `LogicException: Uses Closure`، ثم `route:clear` ينجح. **مغلق**
- ✅ **WS-01 Medium (ترحيل اندماجي متسامح):** `2026_08_28_000000_update_category_slugs_to_english` أُعيدت كتابته بـ `DB::table` حصراً: وُجد الصفان → نقل `listings`/`events` من العربي للإنجليزي ثم حذف العربي؛ العربي فقط → تحديث سلاغه؛ الإنجليزي فقط → لا شيء. `down()` يعيد العربي إن وُجد الإنجليزي دون العربي. **مغلق**
- ✅ **Bug #007 / WS-04 Medium (OR غير مجمّع):** `HomeController::discover()` أُعيد تجميع الشرط: `$q->where('is_active', true)->where(fn ($w) => $w->whereIn('slug', $destinationSlugs)->orWhere('type', 'destination'))` — كل فرع محمي بـ `is_active`. **مغلق**
- ✅ **WS-03 Low (trustHosts):** أُضيف `$middleware->trustHosts(at: ['^eventssquare\.sa$', '^www\.eventssquare\.sa$', '^localhost$'])` في `bootstrap/app.php` — الوسيط وُجد في النسخة (`Illuminate\Http\Middleware\TrustHosts` عبر `getGlobalMiddleware()`) ولا يقرأ `config('app.trusted_hosts')` في هذه النسخة. **مغلق**
- ✅ **Bug #011 Low (is_active للتصنيف):** `abort_unless($category->is_active, 404);` في بداية `ListingController::byCategory()`. **مغلق**
- ✅ **Bug #009 Low (ترتيب النشر):** سطر N6 في `PLAN.md` (قرارات النشر): إلزام `php artisan migrate --force` ثم `db:seed --force` (وليس العكس أبداً). **مغلق**

## مغلق — موجة إعادة تصميم الواجهة «Clean & Modern Professional» (2026-08-28، نفّذ Fox)

> ملف مشترك جديد `resources/js/components/site/fieldStyles.js` ثم إعادة بناء Login/Register/Contact — البناء `npm run build` ✅ (2.1s). لم تُلمس صفحات أخرى.

- ✅ **Login.jsx:** بطاقة سبلت نظيفة بظل ناعم وزوايا 24px؛ العمود الترويجي تدرج هادئ (mesh gradient بدل الدوائر) مع لمسة ضوئية علوية، عنوان واثق، 3 فوائد بدوائر زجاجية، شريط إحصاء اجتماعي (فعالية/وجهة/محافظة)، حماية RTL؛ شريط موبايل مدمج مقوّس `0 0 26px 26px`؛ حقول مشتركة من `fieldStyles.js`؛ زر أخضر يحافظ على disabled.
- ✅ **Register.jsx:** نفس الهيكل مع فوائد التسجيل ومؤشر قوة كلمة المرور محفوظ؛ حجم/زوايا/ظلال موحّدة؛ عين للحقلين مع `aria-label`.
- ✅ **Contact.jsx:** حُفظت كل الدوال (selectedPackage من props ثم query، flash، settings الديناميكي phone/whatsapp/email/address)؛ البطاقات الجانبية موحّدة بظل ناعم وhover خفيف، أيقونات دائرية متدرجة، بطاقة النموذج بترويسة أوضح، الحقول من الملف المشترك.
- ✅ **Bug #008 (تباين النصوص):** باعتبارها مفتوحة — كل النصوص الوصفية في الصفحات الثلاث تعتمد الآن `#4b5563` (≈6.8:1 على الساند) بدل `#6b7280`، بما يحقق ≥4.5:1 المطلوب في WCAG AA.
- ✅ **fieldStyles.js (جديد):** `inputStyle/labelStyle/errorStyle/fieldIcon/focusStyle/blurStyle/eyeButtonStyle/cardStyle/sideCardStyle/submitBtnStyle/promoStyle/promoMobileStyle/benefitIconStyle/statsBarStyle/flashSuccessStyle/flashErrorStyle` — مصدر أنماط موحّد للصفحات الثلاث.

## تسجيل تشخيصي (2026-08-29): JSON خام في المتصفح + حالة DNS المتقلبة — من جلسة تحقق مباشرة

> دوّن من جلسة المتابعة بعد «التوقيع النهائي». لوحظت ظواهر جديدة على `eventsquare.sa` قبل دفعة `0f3552a` (لم تُنشر بعد — نُشر آخرها `2b315d4`).

### Bug #012 High — المتصفح يعرض JSON خام لصفحات Inertia بدل قالب HTML

**Found by:** المستخدم (فتح `https://eventsquare.sa/register` ورأى JSON نصياً)  
**Severity:** High  
**Agent responsible:** Lion + Fox  
**Status:** Open  

**Description:**
عند فتح `https://eventsquare.sa/register` من المتصفح مباشرةً يظهر جسم الرد كاملاً كنص JSON خام:
`{"component":"Auth/Register","props":{...},"url":"/register","version":"07e4f6f9af0b2258a9c21e37cfe7b9e9","sharedProps":[...]}` — بدل صفحة HTML التي يجب أن يبنيها `app.blade.php` (`@inertia`).
المنطق البرمجي سليم: بدون هيدر `X-Inertia` (زيارة المتصفح الأولى) يعيد `Inertia\Response::toResponse` عرض القالب HTML لا JSON. لذلك السبب على الأرجح في **طبقة كاش كاملة الصفحة** (LiteSpeed على Hostinger — «Server: LiteSpeed» شوهد في فحوص سابقة) التي خزّنت استجابة XHR (JSON) من جلسة Inertia داخلية ثم تُسلّمها لأي زيارة مباشرة لاحقة لأنها **لا تتضمن `Vary: X-Inertia`/`Accept`** — سلوك LiteSpeed التقليدي مع Inertia.

**Steps to reproduce:**
1. افتح `https://eventsquare.sa/register` في متصفح جديد (بلا تظليل Inertia).

**Expected behavior:**
HTML كامل من `app.blade.php` (مع `data-page` المحقون وأصول Vite).

**Actual behavior:**
جسم استجابة JSON الخاص بالصفحة ظاهر كنص في المتصفح (نفس الشكل الذي يستهلكه Inertia لاحقاً عبر XHR).

**Suggested fix (للتحقق أولاً ثم التنفيذ):**
1. تأكيد التشخيص من رؤوس الرد الحية: `Cache-Control`, `Content-Type`, `X-LiteSpeed-Cache`, `Vary`. إن وُجد `X-LiteSpeed-Cache: HIT` → السبب مؤكد.
2. تعطيل كاش الصفحة الكاملة لمسار Laravel (`.htaccess` بـ `CacheStoreNoCache on` ضمن `<IfModule LiteSpeed>`، أو في hPanel) أو ضبط هيدر `X-LiteSpeed-Cache-Control: no-cache`/`Cache-Control: private, no-store` على الردود (MIDDLEWARE على `web` يضيفه لردود Inertia HTML وJSON على السواء).
3. مسح/تطهير كاش LiteSpeed الحالي بعد أي تغيير، ثم إعادة فتح `/register`, `/login`, `/contact-us`.
4. ملاحظة: `version` في JSON المرصود (`07e4f6f9af0b2258a9c21e37cfe7b9e9`) يُحتسب من الأصول المنشورة — دلالة أن الاستجابة مأخوذة من النظام الحي نفسه وليس صفحة قديمة.

### WS-07 UPDATE — DNS تحرك جزئياً (IPv6 فقط) والوصول من IPv4 لا يزال معطلاً

**Status:** Open (تحديث أدلة 2026-08-29 — يُستبدل بها جدول فحص Cobra السابق حتى تظهر A)

- `nslookup eventsquare.sa 1.1.1.1` يُرجع الآن **عنواني IPv6 فقط** (`2a02:4780:84:7d9:b6ed:5b07:13b:9343` و`2a02:4780:84:b984:dfbb:1d18:604e:8d57` — شبكة Hostinger)، دون أي سجل A. `Resolve-DnsName -Server 1.1.1.1` أرجَع فارغاً لغير الفقرات — تقلب مسجّل.
- من IPv4 خارجي: `--resolve eventsquare.sa:443:62.72.15.76` → **000** (لا اتصال)، و`https://62.72.15.76` بلا SNI مع `Host: eventsquare.sa` → **404**، و`Host: eventsquare.sa` على :80 → **403 hPanel**. من السيرفر نفسه: `getent hosts eventsquare.sa` → باطل، و`curl https://eventsquare.sa/register` → **000**.
- الأثر: المستخدم حصل على الصفحة (وشاهد JSON Bug #012) — أي أنه وصل عبر مسار IPv6/بروكسي Hostinger؛ أمّا عملاء IPv4 (والسيرفر نفسه) فلا يَصلون أصلاً. المطلوب لازال كما قرر Cobra: **سجل `A → 62.72.15.76` يفعل** + تأكيد أن vhost شبكة eventsquare.sa معرّف في hPanel + SSL — مع ملاحظة أن الـ IPv6 الموجود وحده لا يكفي للوصول العام المنتظم.

### ملاحظات تكوين (غير مانعة — تُسجَّل)

- `~/public_html` (الدومين الافتراضي عند الحساب) يشير بـ symlink إلى **`domains/eventsquare-sa.com/public_html`** وليس `eventsquare.sa` — للنطاق المدعوم `eventsquare.sa` مسار مستقل (`/home/u546723891/domains/eventsquare.sa/laravel_app`)؛ أُكد وجوده (فشل `ls` سابق كان عابراً).
- عبر SSH ظهر `HOME=C:Usersuser` (قيمة مشوهة بيئة Windows) رغم أن `~` تمدّد سليماً إلى `/home/u546723891` — ظاهرة البيئة عند الجلسة؛ لا أثر تنفيذي رصد.
- صفقات/عروض مسجّلة سابقاً: 4 روابط عروض في قاعدة الإنتاج ما زالت تشير إلى `eventsquare-sa.com` (خارج نطاق هذا التقرير — مسجّلة).
