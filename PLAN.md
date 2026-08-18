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

## متبقٍ معروف (Phase 5 وما قبلها)
- خرائط Leaflet التفاعلية (الرئيسية/اكتشف عسير) — مؤجل بقرار
- ترحيل Panther (restrict/unique مركب/فهارس FK) — من موجة التدقيق
- تفعيل الاختبارات (Bug #001d) + اختبارات /admin
- Bug #002 النشرة تلوث contacts (نموذج مصمم هكذا حالياً) / Bug #003 is_admin للمحرر / Bug #004 التواريخ (أُصلح في الصفحات الجديدة)

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
