# تقرير تدقيق مخطط قاعدة البيانات — Panther (Dev Pack)

- **المشروع:** D:\Projects\Events-Square (Laravel 13 + Inertia)
- **البيئات:** SQLite محلياً / MySQL (utf8mb4_unicode_ci, strict) إنتاجاً
- **النطاق المفحوص:** `database/migrations/` (12 ملف ترحيل تُنشئ 20 جدولاً — لا 13 كما ورد في النطاق؛ جداول الإطار users/cache/jobs تُنشأ من ملفات مجمّعة)، `app/Models/` (9 نماذج)، `database/seeders/DatabaseSeeder.php`، `database/factories/UserFactory.php`
- **مصادر الاستدلال على الاستعلامات:** `HomeController`، `ListingController`، `EventController`، `OfferController`، ومتحكمات `Admin/*`
- **التاريخ:** 2026-08-18 — مهمة بحث وتدقيق فقط، لم يُعدَّل أي كود

---

## 1) جدول تقييم كل جدول

| الجدول | الغرض | الفهارس الحالية | الملاحظات |
|---|---|---|---|
| `users` | الحسابات + صلاحيات Spatie | PK، unique(email) | لا softDeletes؛ كلمة المرور بcast مُجزأ. مقبول |
| `password_reset_tokens` | إعادة التعيين | PK(email) | قياسي من الإطار |
| `sessions` | الجلسات | PK(id)، index(user_id)، index(last_activity) | قياسي |
| `cache` / `cache_locks` | الكاش | PK(key)، index(expiration) | قياسي |
| `jobs` | الطوابير | PK، index(queue) | قياسي |
| `job_batches` / `failed_jobs` | الدفعات/الفاشلة | PK، unique(uuid)، index(connection,queue,failed_at) | قياسي |
| `permissions` / `roles` | Spatie | unique(name,guard_name) | قياسي من الحزمة |
| `model_has_permissions` / `model_has_roles` | Pivots | PK مركّب، index(model_id,model_type)، FK cascade | قياسي من الحزمة |
| `role_has_permissions` | Pivot | PK مركّب، FK×2 cascade | قياسي |
| `cities` | مرجع المدن | PK، unique(slug) | استعلام متكرر `where is_active` (جدول صغير — لا يلزم فهرس). لا softDeletes |
| `categories` | شجرة تصنيفات ذاتية المرجع | PK، unique(slug)، FK(parent_id→nullOnDelete) | عمود `parent_id` و`type` بدون فهرس صريح (MySQL يفهرس FK تلقائياً، SQLite لا). الاستعلام `whereNull(parent_id)->orderBy(sort_order)` يعمل على كل صفحة لكن الجدول صغير |
| `listings` | المحتوى الرئيسي (الوجهات) | PK، unique(slug)، **index(slug) مكرر**، index(is_active,is_featured)، FK(category_id cascade)، FK(city_id cascade) | softDeletes موجود. الفهرس المكرر على slug عبء كتابة بلا فائدة. الـcascade خطر على المحتوى. نمط الترتيب `is_featured DESC, id DESC` غير مغطى بالكامل |
| `events` | الفعاليات | PK، unique(slug)، index(starts_at,status)، FK(city_id cascade)، FK(category_id nullOnDelete) | softDeletes موجود. ترتيب أعمدة الفهرس لا يطابق نمط `status = ? AND starts_at >= ? ORDER BY starts_at` |
| `offers` | العروض | PK، unique(slug) | softDeletes موجود. لا فهرس على `is_active`/`valid_until` رغم تصفية `where is_active + latest` في الواجهة |
| `testimonials` | آراء العملاء | PK | جدول صغير؛ `where is_active + latest` بدون فهرس (مقبول حالياً) |
| `contacts` | رسائل التواصل | PK | `whereNull(read_at)` (عدّاد الواجهة الإدارية) بدون فهرس. لا softDeletes |
| `settings` | إعدادات مفتاح/قيمة | PK، unique(key) | `allSettings()` تُحمَّل مع كل طلب Inertia (HandleInertiaRequests.php:47) — يُنصح بكاش مستقبلاً |

---

## 2) النتائج مرتبة بالخطورة

### خطورة عالية

1. **[عالية] حذف تتابعي (cascadeOnDelete) يمسح المحتوى نهائياً:** حذف مدينة واحدة أو تصنيف واحد من لوحة الإدارة يُحذف كل الوجهات المرتبطة حذفاً **نهائياً يتخطى SoftDeletes** (الـcascade يقع على مستوى قاعدة البيانات لا Eloquent). الحذف هنا فقدان بلا استرجاع حتى مع وجود `softDeletes` على الجدول.
   - `database/migrations/2026_08_09_100003_create_listings_table.php:13` (category_id cascade)
   - `database/migrations/2026_08_09_100003_create_listings_table.php:14` (city_id cascade)
   - `database/migrations/2026_08_09_100004_create_events_table.php:13` (city_id cascade)
   - ملاحظة تضارب: `events.category_id` على nullOnDelete (سطر 14) بينما `listings.category_id` على cascade — لا مبرر للاختلاف.

2. **[عالية] تعارض unique(slug) مع softDeletes:** بعد الحذف الناعم لصف يبقى slug محجوزاً في الفهرس الفريد، فيفشل إنشاء صف جديد بنفس الـslug (وسيفشل تحقق `Rule::unique` أيضاً لأنه لا يستثني المحذوفين ناعمياً).
   - `..._create_listings_table.php:17`، `..._create_events_table.php:17`، `..._create_offers_table.php:15`
   - مثال من التحقق: `app/Http/Controllers/Admin/ListingController.php:90`

3. **[عالية] توليد slug فارغ للأسماء العربية:** `Str::slug()` لا يحوّل الأحرف العربية (يرجع نصاً فارغاً)، و`booted()` يولّد الـslug من `name_en ?: name`؛ لو أُنشئ سجل من لوحة الإدارة بلا `name_en` وباسم عربي فقط سيكون slug فارغاً — أول إدخال يمر وثاني إدخال يصطدم بقيود unique.
   - `app/Models/Listing.php:54`، `app/Models/Event.php:58`، `app/Models/Offer.php:37`، `app/Models/City.php:37`، `app/Models/Category.php:52`
   - السيدر ينجو لأنه يمرر slug صريحاً دائماً.

4. **[عالية] بيانات اعتماد admin مكتوبة في الكود:** كلمتا مرور `Admin@2026` و`Editor@2026` ثابتتان في السيدر ويُفترض تشغيله في الإنتاج لتأسيس الحساب الأول.
   - `database/seeders/DatabaseSeeder.php:41` و`:50`

### خطورة متوسطة

5. **[متوسطة] فهرس مكرر على slug في listings:** `index('slug')` (السطر 37) يكرر `unique('slug')` (السطر 17) — فهرس زائد يرفع كلفة كل INSERT/UPDATE/DELETE بلا أي فائدة قراءة.
   - `database/migrations/2026_08_09_100003_create_listings_table.php:37`

6. **[متوسطة] أعمدة FK دون فهارس صريحة (فجوة سلوك SQLite/MySQL):** InnoDB يفهرس أعمدة FK تلقائياً، لكن SQLite لا يفعل — أي أن `WHERE city_id = ?` / `JOIN` سريع إنتاجياً وبطيء محلياً على البيانات الكبيرة. الأعمدة المتأثرة: `listings.category_id`، `listings.city_id`، `events.city_id`، `events.category_id`، `categories.parent_id`.
   - `..._100003:13-14`، `..._100004:13-14`، `..._100002:13`
   - الترتيب: `foreign_key_constraints => true` مفعّل للـSQLite (config/database.php:40) — جيد.

7. **[متوسطة] ترتيب أعمدة فهرس events لا يطابق الاستعلام:** النمط الفعلي `WHERE status = ? AND starts_at >= ? ORDER BY starts_at` يستفيد نظرياً من (status, starts_at) — تساوي ثم نطاق مرتّب — بينما الفهرس الحالي (starts_at, status) يجعل نطاق starts_at يُلغي استخدام status داخل الفهرس.
   - `database/migrations/2026_08_09_100004_create_events_table.php:28`
   - المقابل: `app/Http/Controllers/EventController.php:19-21`

8. **[متوسطة] غياب فهارس التصفية في offers/contacts:** `Offer::where('is_active', true)->latest()` (HomeController.php:40، OfferController.php:14) و`Contact::unread()->count()` (Admin/DashboardController.php:28 مع `whereNull('read_at')` في Contact.php:23) بلا فهارس — الحجم الحالي صغير لكنها جداول تنمو أفقياً.

9. **[متوسطة] توافق enum بين المحركين:** enum يُترجم إلى VARCHAR+CHECK في SQLite وENUM أصلي في MySQL؛ إضافة قيمة جديدة لاحقاً تتطلب `change()` الذي يعيد بناء الجدول كاملاً في SQLite. كذلك القيم مكررة يدوياً في النموذج (`Event::getStatusLabelAttribute` Event.php:45-52) بلا مصدر حقيقة واحد.
   - `..._create_categories_table.php:17` (type: destination/event/activity/offer — موثقة في الترحيل)
   - `..._create_events_table.php:24` (status: upcoming/ongoing/ended — موثقة)

10. **[متوسطة] حساسية حالة الأحرف في unique بين المحركين:** ترتيب MySQL الافتراضي utf8mb4_unicode_ci غير حساس لحالة الأحرف (Abha وabha يتعارضان) بينما unique في SQLite حساس — slug قد يمر محلياً ويفشل إنتاجياً. يشمل slug (5 جداول) وemail وsettings.key.

### خطورة منخفضة

11. **[منخفضة] غياب softDeletes عن جداول مرجعية/تشغيلية:** `cities` و`categories` (تحذف cascade — انظر #1)، `contacts` (رسائل عملاء تُحذف نهائياً)، `users`. الملفات: `..._100001`، `..._100002`، `..._100007`، `0001_01_01_000000`.

12. **[منخفضة] نسبة النماذج إلى المصانع:** كل النماذج تستخدم `HasFactory` لكن يوجد `UserFactory` فقط — استدعاء `Listing::factory()` سيرمي استثناء. يهم للاختبارات المستقبلية.

13. **[منخفضة] `rating` بلا قيد CHECK:** `unsignedTinyInteger` يقبل 0-255 رغم أن المدى المنطقي 1-5؛ الحماية حالياً عبر التحقق في المتحكم فقط.
    - `..._create_testimonials_table.php:16`

14. **[منخفضة] الأسعار:** `price_halalas` integer بدون فواصل (100002... لا — `..._100003:27`) — **مطابق للمطلوب** (هللات وليس float). المدى الأقصى unsigned int ≈ 42.9 مليون ريال وهو كافٍ. إيجابي.

15. **[منخفضة] نمط الترتيب في listings:** `orderByRaw('is_featured DESC, id DESC')` (ListingController.php:23,43) مع `where is_active` غير مغطى بالكامل بفهرس (is_active, is_featured) — تحسين اختياري: (is_active, is_featured, id).

### نقاط إيجابية مسجلة

- كل جدول محتوى له slug مع unique، و`settings.key` و`users.email` فريدان.
- الأسعار بالهللات كأعداد صحيحة، وlat/lng بـdouble (متطابق سلوكياً بين المحركين).
- السيدر: ترتيب منطقي صحيح (أدوار → admin → إعدادات → مدن → تصنيفات → محتوى)، idempotent بالكامل عبر `firstOrCreate` (إعادة التشغيل آمنة)، وحساب admin + editor موجودان مع أدوار Spatie.
- `config/database.php` يفعّل FK على SQLite وstrict mode على MySQL.
- جداول الإطار (users/cache/jobs/permission) مطابقة للقوالب الرسمية بلا تخصيص مشبوه.

---

## 3) خطة تحسين الفهارس والقيود قبل الإنتاج

### المرحلة 1 — إلزامية قبل أول نشر (أسبوع)

1. **استبدال cascade بـrestrict على أعمدة المحتوى** (ترحيل جديد):
   - `listings.category_id`, `listings.city_id`, `events.city_id` → `restrictOnDelete()` — يمنع حذف مدينة/تصنيف له محتوى، ويتيح حذفهما يدوياً بعد إفراغ المحتوى.
2. **فهرس فريد يدعم softDeletes** — إسقاط unique(slug) الحالية وإنشاء:
   - `$table->unique(['slug', 'deleted_at'])` على listings/events/offers (NULL يسمح بالتكرار في MySQL وSQLite معاً).
   - مواءمة التحقق: `Rule::unique(...)->whereNull('deleted_at')` في متحكمات Admin الخمسة.
3. **حماية توليد الـslug:** في `booted()` لكل نموذج — إذا كانت نتيجة `Str::slug()` فارغة استخدم `Str::slug($name, '-', 'ar')` أو تراجع إلى `Str::random()`/اسم مُعرّف، وأضف تحقق `alpha_dash` في متحكمات Admin.
4. **نقل كلمات مرور السيدر إلى env:** `Admin@2026` → `env('ADMIN_DEFAULT_PASSWORD')` مع رفض التشغيل إن غابت القيمة في الإنتاج (مثلاً `throw_if(app()->isProduction() && !$pwd)`).
5. **حذف الفهرس المكرر** `listings_slug_index` (`..._100003:37`).

### المرحلة 2 — فهارس الأداء (قبل نمو البيانات)

6. فهارس صريحة على أعمدة FK (توحيد سلوك SQLite/MySQL):
   - `listings(category_id)`, `listings(city_id)`, `events(city_id)`, `events(category_id)`, `categories(parent_id)`.
7. استبدال `events(starts_at, status)` بـ`events(status, starts_at)` — يطابق التساوي على status ثم النطاق والترتيب على starts_at.
8. فهارس التصفية: `offers(is_active, valid_until)`، `contacts(read_at)`، واختيارياً `listings(is_active, is_featured, id)` لترتيب الواجهة.
9. بعد التطبيق: تدقيق بـ`EXPLAIN` على MySQL لاستعلامات ListingController.index وEventController.index (الاستعلامات الوحيدة ذات التصفية المركبة).

### المرحلة 3 — متانة وتوافق (خلال الشهر الأول)

10. `softDeletes()` على `contacts` و`cities` و`categories` و`users` (مع `whereNull` في `Setting::get` غير مطلوب؛ يلزم تحديث نطاق `unread`).
11. توحيد قيم enum في ثوابت PHP (مثلاً `Event::STATUSES`) واستخدامها في الترحيل والتحقق و`getStatusLabelAttribute` بدل التكرار اليدوي؛ توثيق إجراء تعديل enum (SQLite يستلزم إعادة بناء).
12. تقرير ما قبل الإنتاج: تشغيل `migrate:fresh --seed` على MySQL staging وليس SQLite فقط للتحقق من فروق collation (#10) وقيد طول الفهارس (1071).
13. مستقبلاً: كاش `Setting::allSettings()` (تُستدعى مع كل طلب) وجداول facts للبحث النصي `like '%...%'` في listings (ListingController.php:22) — لن يستفيد من أي فهرس عند نمو الجدول؛ الحل البعدي MySQL fulltext أو Laravel Scout.

### ملاحظة ختامية

المخطط نظيف ومتّسق عموماً؛ الأخطاء الحرجة كلها قابلة للإصلاح بترحيل واحد صغير + تعديلات نموذجية محدودة قبل أول نشر إنتاجي. أقوى خطرين هما cascade delete (#1) وتصادم slug مع softDeletes (#2) لأن كليهما يظهر تحت الضغط التشغيلي وليس في الاختبار المحلي.
