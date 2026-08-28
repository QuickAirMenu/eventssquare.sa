# PLAN.md — ساحة الفعاليات (Events-Square)

> يملك هذا الملف **Dragon** ويحدّثه بعد كل جلسة. هو مصدر الحقيقة الوحيد للمشروع.

## 🚫 قواعد صارمة (لا تُناقش — أمر القائد)
1. **ممنوع نهائياً لمس `eventssquare-sa.com`** — موقع ووردبريس حي خارج نطاقنا. لا تعديل، لا symlink، لا ملفات، لا backup، لا شيء.
2. **التطوير والتشغيل حصراً على `eventssquare.sa`** (Laravel في `~/domains/eventssquare.sa/laravel_app`).

## الرؤية
منصة عسير الأولى للفعاليات والوجهات السياحية: موقع عام (وجهات، فعاليات، عروض) + لوحة تحكم `/admin`، عربي RTL بالكامل.

## الحالة الحالية — 2026-08-18 (تحديث موجة الإصلاح الأمني)
- ✅ **الملف الأمني مُغلق بالكامل:** C-01/02/03 Critical + H-01…H-04 High أُصلحت وتم التحقق بالصياغة (php -l سليم لكل الملفات)
- هيكل Laravel 13 + Inertia 3 + React 19 + Tailwind 4 جاهز: 18 Controller، 9 Models، 13 ترحيل، صفحات React عامة + إدارة.
- ✅ **design-files مُنظّم:** homepage.html معتمد بالجذر + مانيفست كامل (design-files/README.md) + أرشيف التجارب السابقة + نسخة احتياطية
- قاعدة البيانات: SQLite محلياً، MySQL في الإنتاج.
- النشر: بناء محلي على ويندوز ثم رفع عبر SSH — لا تشغيل محلي للمشروع.

## القرارات المعمارية
| # | القرار | السبب |
|---|--------|-------|
| 1 | Inertia + React (مونوليث) بدل API منفصل | موقع واحد، لا تطبيق جوال حالياً |
| 2 | SQLite محلياً / MySQL إنتاجاً | بساطة التطوير على ويندوز |
| 3 | spatie/laravel-permission | أدوار وصلاحيات لوحة التحكم |
| 4 | بناء محلي + رفع SSH | متطلب القائد — بدون تشغيل محلي |
| 5 | هيكلة Hostinger: `domains/eventssquare.sa/laravel_app` + `public_html` → symlink إلى `laravel_app/public` | معيار المزوّد — معتمد 2026-08-18 |

## السيرفر (الإنتاج) — ✅ منشور 2026-08-18
- **https://eventssquare.sa** يعمل (Laravel عبر laravel_app + public_html symlink)
- SSH: مفتاح ed25519 مثبّت (بعد كلمة المرور) — `62.72.15.76:65002`
- git: مستودع bare على السيرفر `~/repos/eventssquare.git` — الدفع: `git push server master`
- PHP: `/opt/alt/php83/usr/bin/php` (CloudLinux) — Composer 2.9.8
- القاعدة: SQLite إنتاجياً مؤقتاً (لا بيانات MySQL من الشل — الترحيل عند توفرها من hPanel)
- الأصول: تُبنى محلياً `npm run build` وتُرفع tar إلى `public/build`
- بيانات مدير الإنتاج: في `scripts/server.env` (PROD_ADMIN_*) — محلية فقط
- الموقع القديم: `backup/public_html-static-20260818/`
- ✅ **`eventssquare-sa.com` (ووردبريس) محظور لمسه نهائياً — بقرار القائد 2026-08-18** — اللارافل يعمل حصراً على `eventssquare.sa`

## قرارات النشر (سجل)
| # | القرار | السبب |
|---|--------|-------|
| N1 | SQLite إنتاجياً بدل MySQL | استضافة مشتركة بلا صلاحية إنشاء قواعد من الشل — يُرحّل لاحقاً |
| N2 | مستودع git bare على السيرفر بدل GitHub | لا ح لحساب وسيط؛ النشر: `git push server` ثم استنساخ |
| N3 | مفتاح SSH للأتمتة | توصية Cobra — يعمل الآن |
| N4 | خط Readex Pro مستضاف ذاتياً في `public/fonts/` (مجموعة عربية + لاتينية) بدل إضافة bunny | الإضافة نزّلت اللاتيني فقط ولم تُحقن — الموقع عربي |
| N5 | حذف وسم `<style>` الدخيل من app.css | محول CSS ابتلع كتلة `:root` كلها → ضياع كل ألوان التصميم (أُصلح ونُشر) |
| N6 | قاعدة الترتيب الإلزامي للنشر: `php artisan migrate --force` ثم `db:seed --force` (وليس العكس أبداً) | منع تكرار/تصادم سلاغات `categories` بين الترحيل والسيدر (Bug #009 / WS-01) — الترحيل أصبح اندماجياً متسامحاً لكن الترتيب يبقى إلزامياً |
| N7 | تشغيل `deploy.sh` يتطلب PHP ≥ 8.3 في المسار: `export PATH=/opt/alt/php84/usr/bin:$PATH` قبل التنفيذ | `php` الافتراضي عبر `/etc/cl.selector/php-cli` يعيد 8.1.34 فيفشل preflight `PHP >= 8.3 required` (رُصد في النشر الحي 2026-08-28) |

## المراحل
- [x] Phase 0 — هيكل Laravel + لوحة تحكم أولية
- [x] Phase 1 — تثبيت فريق Dev Pack في `.opencode/agent/`
- [x] Phase 2 — موجة التدقيق الوكيل (2026-08-18) → 6 تقارير في `docs/devpack/reports/`
- [x] Phase 3 — الإصلاحات الأمنية (C-01..03 + H-01..04) — مغلقة كلها
- [x] Phase 4 — نظام التصميم + بناء كل صفحات الواجهة (2026-08-18):
  - نظام التصميم داخل Laravel: CSS المعتمد كاملاً في `resources/css/app.css` + خط Readex Pro + صور `/img`
  - Navbar + Footer ثابتان في `AppLayout` (كل الصفحات) + زر عودة للأعلى
  - روابط بسلاغ عربي مطابقة للموقع الحقيقي: /الوجهات، /فعاليات-ومهرجانات، /العروض-والاعلانات، /أنشطة-وتجارب، /{فئة}، /about، /contact-us، /sales، /تسجيل-دخول، /انشاء-حساب
  - الصفحات: Home (10 أقسام من homepage.html) + Listings Index/Show + Events Index/Show + Offers + About + Sales + Contact + Login + Register + DiscoverAsir
  - نصوص Falcon في `docs/devpack/falcon-copy.md` مطبقة حرفياً
  - إصلاحات مصاحبة: Bug #001 (useState)، #005 (ملفات ميتة حُذفت)، EventController (عرض الكل)
  - ✅ `npm run build` ينجح (3.2s)
- [ ] Phase 5 — النشر عبر SSH (Lion) + التوقيع النهائي (Hawk + Cobra)

## موجة تحسينات الواجهة — 2026-08-28 (Fox)
- M1/M5: إضافة «المبيعات» لقائمة الجوال + توحيد تسمية القائمة المنسدلة إلى «العروض والإعلانات» في Navbar
- M4: تبويبات الفعاليات أصبحت فلترة خادمية عبر `?status=` (بدل الفلترة العميلية) — `Events/Index.jsx`
- M2/M3: أزرار الباقات تمرر اسم الباقة + واتساب ديناميكي من `settings.whatsapp` + نموذج «اطلب عرض سعر مخصصاً» في Sales
- M8: حقل الجوال `type="tel"` + تمرير `package` تلقائياً في Contact
- M6: زر «تواصل / احجز عبر واتساب» في CTA صفحة الفعالية (رسالة تحمل اسم الفعالية)
- LCP: prop `eager` لمكوّن `Cover` ورفع lazy عن صور الغلاف في Events/Show وListings/Show
- L4: إزالة `dir="ltr"` من حقول كلمات المرور (Login/Register)
- H4: تفعيل فلاتر «استكشف عسير» عميلياً حسب التصنيف + حالة فارغة
- H3: شريط بحث مع debounce في Listings/Index وEvents/Index (`?search=`)
- L6: meta descriptions عربية لـ 8 صفحات
- ✅ `npm run build` ينجح (README nav)

## موجة تحسينات الواجهة & توحيد السلاغ — 2026-08-28 (Fox)
- **توحيد السلاغات للخمس فئات إلى الإنجليزية** (خريطة منسق — لا تُغيَّر): `قصور-وقرى-تراثية → palaces-heritage-villages`، `معالم-ومنتزهات → landmarks-parks`، `متاحف-وأسواق-شعبية → museums-souks`، `الإقامة-والتسوق → stay-shopping`، `مأكولات-ومشروبات → food-drinks` — في Home.jsx وFooter.jsx وDiscoverAsir.jsx (FILTER_MAP). النافبار/الفوتر الداخلي يسحبان slugs ديناميكياً — لم يُلمس.
- **Login.jsx/Register.jsx:** إعادة هيكلة ببطاقة سبلت `lg:grid-cols-2` (`max-w-[900px]`) بعمود إعلامي متدرج (خلفية green→teal، دوائر زخرفية، شعار، عنوان، 3 نقاط فوائد بأيقونات + رقم ثقة) يظهر يمين RTL، وشريط علوي على الجوال. تجارب: إظهار/إخفاء كلمة المرور بعين الى داخل الحقل، رسالة خطأ بارزة أعلى النموذج، صندوق نجاح flash، مؤشر قوة كلمة المرور (Register)، أيقونات حقول بمحاذاة RTL + فواصل خضراء عند التركيز، زر كامل العرض، تذكرة «نسيت كلمة المرور؟ قريباً»، نص ثقة «خصوصيتك محمية», autocomplete مناسب + aria-label.
- **Contact.jsx:** أيقونات حقول + فواصل تركيز خضراء، بطاقة «ساعات العمل» (أحد–خميس 9ص-5م، جمعة–سبت إجازة) مع `settings.address`، بطاقة «موقعنا» مع زر «افتح في خرائط جوجل» (`maps.google.com/?q=` بتشفير encodeURIComponent)، بطاقات قنوات بأسهم `fa-arrow-left` وظل أقوى عند hover وقيم أبرز، استجابة جوال محفوظة.
- ✅ `npm run build` ينجح (2.6s) — السلاغات العربية الخمسة غير موجودة في `resources/js` (تحقق grep)

## متبقٍ معروف (Phase 5 وما قبلها)
- خرائط Leaflet التفاعلية (الرئيسية/اكتشف عسير) — مؤجل بقرار
- ترحيل Panther (restrict/unique مركب/فهارس FK) — من موجة التدقيق
- تفعيل الاختبارات (Bug #001d) + اختبارات /admin
- Bug #002 النشرة تلوث contacts (نموذج مصمم هكذا حالياً) / Bug #003 is_admin للمحرر / Bug #004 التواريخ (أُصلح في الصفحات الجديدة)

## 🦁 Lion — النشر الحي (2026-08-28): ✅ اكتمل بنجاح

- **الموجة:** مسارات إنجليزية (301) + ترحيل سلاغات + UI/UX — مرفوعة والمستودع البير على السيرفر تحدّث إليها عبر `deploy.sh --branch master`.
- **التنفيذ:** `git fetch/reset` إلى `f90f8df` → `composer install --no-dev` → فك الأصول المسطّحة إلى `public/build` → `migrate --force` (`update_category_slugs_to_english`) → caches → `queue:restart`. **لم يُشغَّل seed** (سلوك مقصود).
- **الفحوص:** `/` 200 ✅ | `/destinations` 200 ✅ | `/الوجهات` 301 → `/destinations` ✅ | الموقع يُخدم عبر PHP 8.3.30 FPM.
- **انحرافات بيئية مسجّلة:** N7 (PHP 8.1 افتراضياً — تم تجاوزه بـ PATH) + `APP_URL=eventssquare-sa.com` في .env الإنتاج + لا systemctl لإعادة php-fpm + `DB_CONNECTION=sqlite` (N1). التفاصيل في ISSUES.md "سجل النشر الحي".

## نتائج موجة التدقيق — حكم Cobra: 🚫 ممنوع النشر (NO-GO)
| الوكيل | أبرز النتائج |
|--------|---------------|
| Cobra | 3 Critical: رفع ملفات تعسفي عبر `avatar` (TestimonialController.php:32 → public/uploads = RCE)، بيانات مدير ملتزقة في DatabaseSeeder.php:41؛ 4 High: لا throttle على /login، editor يدير المستخدمين (تصعيد)، SVG=XSS، APP_DEBUG=true |
| Wolf | لا rate limiting على /contact، لا FormRequests، slug عربي فارغ، 17 نتيجة |
| Panther | cascadeOnDelete يمسح المحتوى متخطياً softDeletes → restrict؛ unique(slug) يتعارض مع softDeletes؛ فهرس مكرر؛ فهارس FK ناقصة |
| Fox | 2 كسر: `React.useState` بلا استيراد (Testimonials/Index.jsx:6) + درج RTL مكسور؛ الألوان/الخط لا تطابق homepage.html؛ 6 أقسام مفقودة (خريطة Leaflet، سلايدر Hero...)؛ ziggy غير مستخدم (83+ رابط يدوي)؛ تواريخ هجرية |
| Lion | `scripts/deploy.sh` جاهز + خطة نشر كاملة؛ المشروع ليس git repo بعد (الخطوة 0) |
| Hawk | تغطية اختبارات 0% وRefreshDatabase معطّل؛ bugs #002–#009 |

## أولويات Phase 3 (بترتيب Dragon)
1. **Wolf:** إصلاح رفع الملفات (تحقق نوع/حجم + تخزين بعيداً عن public) + throttle على /login و/contact + نقل بيانات المدير إلى env
2. **Wolf:** تقييد دور editor عن المستخدمين والإعدادات
3. **Panther:** ترحيل واحد: restrict بدل cascade + unique مركب (slug, deleted_at) + فهارس FK + إصلاح slug العربي
4. **Fox:** إصلاح الكسرين + تفعيل ziggy + التقويم الميلادي (ar-SA-u-ca-gregory)
5. **Lion:** git init + أول push ثم تجربة deploy.sh على staging
6. **Hawk:** تفعيل الاختبارات + اختبارات حماية /admin

## الفريق
| الوكيل | الدور |
|--------|-------|
| Dragon 🐉 | قائد الفريق والمعماري — منسق |
| Fox 🦊 | واجهات React/Inertia + RTL |
| Wolf 🐺 | Laravel + API + منطق الأعمال |
| Panther 🐆 | قاعدة البيانات والفهارس |
| Lion 🦁 | DevOps + النشر عبر SSH |
| Hawk 🦅 | مراجعة كود وQA |
| Falcon 🦅 | محتوى عربي (معجم: `docs/devpack/FALCON_LEXICON.md`) |
| Lynx 🐈 | تصميم UI/UX |
| Viper 🐍 | تجربة العميل CX |
| Cobra 🐍 | تدقيق أمني + PDPL |

## جلسة الحالية
**الهدف:** تشغيل الفريق بالوضع الوكيل — موجة تدقيق شاملة، كل وكيل يكتب تقريره في `docs/devpack/reports/`.
**الوكيل النشط:** Dragon (تنسيق) + 6 وكلاء تدقيق متوازين.

## تحديث 2026-08-28 — موجة باك-إند (نفّذ Wolf)
- ✅ `?search` على الأحداث (title/description + trim + ترقيم) — EventController::index
- ✅ تأكيد دعم `?search` في ListingController (كان موجوداً ويمرر filters.search)
- ✅ DiscoverAsir: تمرير الوجهات الكاملة عبر مفتاح `listings` (حد 40) + `heritageListings` متوافق — HomeController::discover
- ✅ Hawk #10: تقييد `Listing.website` و`Offer.link` بـ `starts_with:http://,https://` (تحقق بالمتحكمات) + accessor يعيد null للروابط غير http (حماية عند العرض)
- ✅ `/contact?package=...` تُمرَّر من PageController::contact trim إلى صفحة Contact
- ✅ تأكيد أن contact.store يقبل `subject` (موجود ومخزَّن) — لا 422 من حقول /sales
- ملاحظة: لا صفحات `policy`/`terms` في routes/web.php حالياً (قرار لاحق للمشرف)

## تحديث 2026-08-28 — موجة الإصلاحات الإلزامية قبل النشر (نفّذ Wolf + مراجعة Cobra/Hawk)
- ✅ **Bug #006 High:** الـ13 كلوجر (11 في `routes/web.php` + 2 في `routes/api.php`) استُبدلت بالكامل — `Route::redirect(...)` للـ301 + `HealthController`/`UserController` للـAPI. **التحقق:** `php artisan route:cache` ينجح ثم `route:clear` (كانت تكسر `route:cache` بـ `LogicException: Uses Closure`).
- ✅ **WS-01 Medium:** ترحيل السلاغات أصبح اندماجياً متسامحاً (`DB::table` حصراً — تصنيفات بلا softDeletes): يُدمج الصفين/ينقل المراجع/يحدّث العربي فقط/يتجاهل الإنجليزي فقط. `down()` يعكس بأمان. + سطر N6 في قرارات النشر أعلاه.
- ✅ **Bug #007 / WS-04 Medium:** تجميع OR في `HomeController::discover()` — كل فرع محمي بـ `is_active`.
- ✅ **WS-03 Low:** تفعيل `trustHosts` لنطاقات المشروع منعاً لتوجيه ما بعد الدخول إلى نطاقات خارجية (Host header poisoning). الخيار المُتخذ: `$middleware->trustHosts(at: [...])` في `bootstrap/app.php` (لا `config('app.trusted_hosts')` — النسخة المثبتة من Laravel 13 لا تقرؤه).
- ✅ **Bug #011 Low:** `abort_unless($category->is_active, 404)` في `ListingController::byCategory()`.
- ✅ **Bug #009 Low:** قاعدة ترتيب النشر الإلزامية موثّقة كـ N6 في قرارات النشر.
- الملفات: `routes/web.php`, `routes/api.php`, `app/Http/Controllers/Api/HealthController.php` (جديد), `app/Http/Controllers/Api/UserController.php` (جديد), `database/migrations/2026_08_28_000000_update_category_slugs_to_english.php`, `app/Http/Controllers/HomeController.php`, `app/Http/Controllers/ListingController.php`, `bootstrap/app.php`. لم تُلمس `resources/js/**`.

## موجة إعادة تصميم الواجهة «Clean & Modern Professional» — 2026-08-28 (Fox)
- **ملف مشترك جديد `resources/js/components/site/fieldStyles.js`:** يصدّر `inputStyle`, `labelStyle`, `errorStyle`, `fieldIcon`, `focusStyle`, `blurStyle`, `eyeButtonStyle`, `cardStyle`, `sideCardStyle`, `submitBtnStyle`, `promoStyle`, `promoMobileStyle`, `benefitIconStyle`, `statsBarStyle`, `flashSuccessStyle`, `flashErrorStyle` — استُورد في الصفحات الثلاث بدل النسخ اللاصق.
- **Login.jsx / Register.jsx:** بطاقة بيضاء نظيفة بظل ناعم `0 20px 50px -12px rgba(19,69,39,0.12)` وزوايا 24px؛ العمود الترويجي أُعيد تصميمه: بدل الدوائر المبعثرة → **mesh gradient هادئ** (لمسة ضوئية علوية + توهج سفلي خفيف + تدرج أخضر→teal)، شعار أبيض + عنوان واثق + 3 فوائد بأيقونات داخل **دوائر زجاجية** + **شريط إحصاء اجتماعي** (3 أرقام وافية) + سطر ثقة؛ على الموبايل → **حلقة مدمجة أنيقة** (`0 0 26px 26px`) بشعار وجملة قصيرة بارتفاع أصغر. النماذج: هرمية عنوان أوضح، حقول مشتركة من `fieldStyles.js`، Focus ring `#16a34a` مع border `#e5e7eb` وخطأ `var(--red)`، مدخلات بريد/جوال `dir="ltr"`، `aria-label` لأزرار العين، زر أخضر (`btn-primary` + `submitBtnStyle` inline) يحافظ على `disabled`، `bottom-accent` محفوظ في الصفحات الثلاث.
- **Contact.jsx:** hero + البطاقات الوظيفية محفوظة (selectedPackage/flash/settings الديناميكي كما هي)؛ بطاقات القنوات/الساعات/الموقع أصبحت موحّدة بظل ناعم وزوايا 20px + **hover خفيف** (`-translate-y-1` + ظل)، أيقونات دائرية متدرجة، ترويسة قنوات أنظف، والحقول من الملف المشترك.
- ✅ `npm run build` ينجح (2.1s) — CSS: 75KB، Login/Register/Contact تنتج chunk منفصلة. لم تُلمس أي صفحة أخرى ولم تتغير أي مسارات/منطق نماذج.
