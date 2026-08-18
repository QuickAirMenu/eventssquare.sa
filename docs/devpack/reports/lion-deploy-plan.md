# 🦁 تقرير Lion — خطة نشر Events-Square (DevOps & Deployment)

> المشروع: `D:\Projects\Events-Square` — Laravel 13 + Inertia 3 + React 19 + Vite 8 + Tailwind 4
> الدومين: `eventssquare-sa.com` — محلي: SQLite / إنتاج: MySQL 8
> التاريخ: 2026-08-18

---

## 1) ما تمت مراجعته

| العنصر | الملاحظة |
|---|---|
| `.env` / `.env.example` | SQLite محلياً، `QUEUE_CONNECTION=database`، `SESSION_DRIVER=database` — يعمل مع MySQL مباشرة |
| `composer.json` | PHP `^8.3`، Laravel `^13.8`، سكربتات قياسية (`post-autoload-dump` يشغّل `package:discover`) |
| `package.json` | `build: vite build` — بناء frontend فقط، لا يحتاج تشغيل Laravel |
| `vite.config.js` | إدخال `app.css` + `app.jsx`، خط Cairo من Bunny Fonts — سيُنزَّل وقت البناء المحلي |
| `phpunit.xml` | اختبارات SQLite في الذاكرة — لا تتداخل مع الإنتاج |
| `scripts/` | يحتوي `check.php` فقط (فاحص سلامة بيانات + دور admin@eventssquare-sa.com) |
| `public/` | `.htaccess` و `index.php` و `robots.txt` موجودان ✔ |
| `bootstrap/` | بنية Laravel 11+ القياسية (`app.php`, `providers.php`, `cache/`) ✔ |
| `.gitignore` | `public/build` **مستثنى من git** — الأصول تُبنى خارج git وتُرفع يدوياً |
| ⚠️ المستودع | المشروع **ليس git repo بعد** محلياً — يجب `git init` + رفع لـ remote قبل أول نشر (الخطوة 0 أدناه) |

---

## 2) قرار استراتيجية النشر — ولماذا؟

**المختار: الكود عبر git على السيرفر + بناء frontend محلياً على ويندوز ثم رفع الأصول بـ `scp/tar` عبر SSH.**

| الخيار | الحكم | السبب |
|---|---|---|
| `rsync` من ويندوز | ❌ مرفوض | rsync غير موجود أصلاً في ويندوز (يحتاج WSL/cwRsync) — تعقيد بلا داعٍ |
| `git pull` على السيرفر | ✅ للكود | Git for Windows يوفر `ssh`/`scp`/`tar` أصلاً — لا أدوات إضافية |
| `npm run build` محلياً | ✅ مقبول | البناء لا «يشغّل» المشروع (لا PHP artisan serve) — مجرد تجميع أصول Vite بـ Node، ويغني عن تثبيت Node على السيرفر (تقليل سطح الهجوم والذاكرة) |
| بناء الأصول على السيرفر | ❌ مرفوض | يتطلب Node + ذاكرة على الـ VPS بلا حاجة |

ملاحظة أساسية: لأن `public/build` مستثنى من git، يُبنى محلياً ويُحزَم `tar` ويُرفع `scp` ثم يفكّه `scripts/deploy.sh --assets-tar`.

---

## 3) متطلبات السيرفر

### 3.1 الأساس (Ubuntu 22.04/24.04)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl unzip nginx mysql-server supervisor
sudo add-apt-repository ppa:ondrej/php && sudo apt update
sudo apt install -y php8.3-fpm php8.3-cli php8.3-mbstring php8.3-xml php8.3-curl \
                    php8.3-sqlite3 php8.3-mysql php8.3-intl php8.3-bcmath \
                    php8.3-zip php8.3-gd php8.3-opcache
```

> امتدادات مطلوبة: `mbstring, xml, curl, sqlite3 (لأدوات مساعدة فقط), mysql/pdo_mysql, intl, bcmath, zip, gd, opcache`. **Node غير مطلوب على السيرفر.**

### 3.2 Nginx — `/etc/nginx/sites-available/eventssquare`

```nginx
server {
    listen 80;
    server_name eventssquare-sa.com www.eventssquare-sa.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name eventssquare-sa.com www.eventssquare-sa.com;

    root /var/www/eventssquare/public;   # مهم: root يشير إلى public/
    index index.php;
    charset utf-8;
    client_max_body_size 20M;

    ssl_certificate     /etc/letsencrypt/live/eventssquare-sa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/eventssquare-sa.com/privkey.pem;

    add_header X-Frame-Options       "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy       "strict-origin-when-cross-origin" always;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    # كاش طويل للأصول المبنية (Vite يضع hash في الاسم)
    location ~* \.(css|js|woff2?|jpg|jpeg|png|gif|webp|svg|ico)$ {
        expires 30d;
        access_log off;
        try_files $uri =404;
    }

    error_page 404 /index.php?$query_string;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* { deny all; }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/eventssquare /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
# HTTPS بشهادة مجانية:
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d eventssquare-sa.com -d www.eventssquare-sa.com
```

### 3.3 MySQL 8

```sql
CREATE DATABASE eventssquare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'eventssquare'@'localhost' IDENTIFIED BY 'كلمة-مرور-قوية-جداً';
GRANT ALL PRIVILEGES ON eventssquare.* TO 'eventssquare'@'localhost';
FLUSH PRIVILEGES;
```

### 3.4 Supervisor — للـ Queue (النظام يستخدم `QUEUE_CONNECTION=database`)

`/etc/supervisor/conf.d/eventssquare-queue.conf`:

```ini
[program:eventssquare-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/eventssquare/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/eventssquare/storage/logs/queue.log
stopwaitsecs=3600
```

```bash
sudo supervisorctl reread && sudo supervisorctl update
```

---

## 4) قيم `.env` الإنتاجية (على السيرفر فقط — لا تُرفع لـ git)

```env
APP_NAME="ساحة الفعاليات"
APP_ENV=production
APP_KEY=            # يُولَّد على السيرفر: php artisan key:generate
APP_DEBUG=false     # إلزامي — إظهار الأخطاء يسرّب أسراراً
APP_URL=https://eventssquare-sa.com

APP_LOCALE=ar
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=ar_SA

LOG_CHANNEL=stack
LOG_STACK=daily
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=eventssquare
DB_USERNAME=eventssquare
DB_PASSWORD=كلمة-المرور-من-الخطوة-3.3

SESSION_DRIVER=database
SESSION_DOMAIN=.eventssquare-sa.com

CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public

MAIL_MAILER=log      # يُحدَّث لاحقاً لـ smtp عند تفعيل البريد الفعلي
MAIL_FROM_ADDRESS="no-reply@eventssquare-sa.com"
MAIL_FROM_NAME="${APP_NAME}"

VITE_APP_NAME="${APP_NAME}"
```

---

## 5) سير العمل اليومي للنشر (من ويندوز — PowerShell)

```powershell
# 1) بناء الأصول محلياً (لا يشغّل المشروع)
npm ci
npm run build

# 2) حزم الأصول ورفعها
tar -czf build.tar.gz -C public/build .
scp build.tar.gz deploy@SERVER_IP:/var/www/eventssquare/storage/app/build.tar.gz

# 3) تشغيل النشر على السيرفر (كود عبر git + بقية الخطوات)
ssh deploy@SERVER_IP "cd /var/www/eventssquare && bash scripts/deploy.sh --maintenance --assets-tar storage/app/build.tar.gz"
```

### خيارات `scripts/deploy.sh`

| الخيار | الوظيفة |
|---|---|
| `--branch main` | تحديد الفرع (أو متغير `DEPLOY_BRANCH`) |
| `--maintenance` | تفعيل `artisan down` أثناء النشر و`up` تلقائياً بعده (وحتى عند الفشل عبر trap) |
| `--assets-tar PATH` | فك حزمة أصول Vite المرفوعة إلى `public/build` |
| `--skip-migrate` | تخطي الهجرات (نشر كود فقط) |
| `--skip-backup` | تخطي النسخ الاحتياطي |
| متغيرات إضافية | `DB_BACKUP_KEEP` (افتراضي 10)، `WEB_GROUP=www-data` (إصلاح صلاحيات)، `QUEUE_SUPERVISOR_PROGRAM=eventssquare-queue`، `HEALTH_CHECK_URL` (فحص بعد النشر) |

خطوات ينفّذها السكربت تلقائياً: تحديث الكود (`git fetch + reset --hard`) ← `composer install --no-dev --optimize-autoloader` ← فك الأصول ← نسخة احتياطية `mysqldup` مضغوطة قبل الهجرة ← `migrate --force` ← `config/route/view/event:cache` ← `storage:link` ← `queue:restart` + إعادة php-fpm ← إخراج من الصيانة.

---

## 6) أول نشر — خطوة بخطوة

**الخطوة 0 (محلياً على ويندوز):** تهيئة المستودع ودفعه:

```powershell
git init; git add .; git commit -m "Initial commit"
git remote add origin git@github.com:ORG/Events-Square.git
git push -u origin main
```

**على السيرفر (مرة واحدة):**

```bash
# 1) المستخدم والمجلدات
sudo adduser --disabled-password deploy
sudo usermod -aG www-data deploy
sudo mkdir -p /var/www/eventssquare && sudo chown deploy:www-data /var/www/eventssquare

# 2) الاستنساخ
su - deploy
ssh-keygen -t ed25519          # أضف المفتاح كمفتاح Deploy Key على GitHub (قراءة فقط)
git clone git@github.com:ORG/Events-Square.git /var/www/eventssquare
cd /var/www/eventssquare

# 3) ملف البيئة + المفتاح
cp .env.example .env
nano .env                       # ضع قيم القسم 4 أعلاه
php artisan key:generate

# 4) الاعتماديات الأولية
composer install --no-dev --optimize-autoloader --no-interaction

# 5) الأصول — من ويندوز (أوامر القسم 5، الخطوتان 1-2) ثم:
bash scripts/deploy.sh --maintenance --assets-tar storage/app/build.tar.gz
# السكربت يتكفل بـ: migrate + seeders? (شغّل يدوياً إن لزم:
#   php artisan db:seed --force ) + الكاش + storage:link + إعادة التشغيل

# 6) الصلاحيات النهائية
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwX storage bootstrap/cache

# 7) تحقق نهائي
php scripts/check.php                       # سلامة البيانات ودور admin
curl -I https://eventssquare-sa.com         # استجابة 200/302
```

ثم فعّل Nginx + Certbot + Supervisor (أقسام 3.2 و3.4).

---

## 7) قائمة فحص ما قبل النشر ✅

- [ ] المشروع مرفوع على git remote والفرع `main` محدّث
- [ ] `.env` الإنتاجي موجود على السيرفر بقيم القسم 4 و`APP_DEBUG=false`
- [ ] `APP_ENV=production` في `.env` السيرفر
- [ ] MySQL 8: قاعدة `eventssquare` + مستخدم بصلاحيات محدودة فقط
- [ ] Nginx: `root` يشير إلى `public/` و`nginx -t` ناجح
- [ ] شهادة HTTPS صادرة (certbot) والتجديد مفعّل (`certbot renew --dry-run`)
- [ ] php8.3-fpm يعمل والامتدادات مثبتة (`php -m | grep -E 'mbstring|curl|xml|pdo_mysql'`)
- [ ] Supervisor يشغّل عاملَي queue ويكتب في `storage/logs/queue.log`
- [ ] `npm run build` نجح محلياً و`build.tar.gz` رُفع
- [ ] مجلد `storage/backups` قابل للكتابة (للنسخ الاحتياطي التلقائي)
- [ ] نسخة احتياطية يدوية أولى بعد أول `migrate` (`mysqldump ... | gzip > ~/first.sql.gz`)

---

## 8) تحذيرات ⚠️

1. **لا `composer install` بحزمة dev كاملة في الإنتاج أبداً** — استخدم `--no-dev` (السكربت يفعل). حزم dev مثل PHPUnit/Pail قد تكشف ثغرات وتزيد الحجم.
2. **الأسرار خارج git**: `.env` و`.env.production` في `.gitignore` — يبقى `.env` على السيرفر فقط، ولا يُنسخ أبداً إلى المستودع أو رسائل الدعم.
3. **`APP_DEBUG=false` إلزامي** — صفحة الخطأ التفصيلية تكشف مسارات وكلمات مرور قاعدة البيانات.
4. **لا تشغّل `php artisan serve` في الإنتاج** — Nginx + FPM فقط.
5. `git reset --hard` في السكربت يمسح أي تعديل يدوي على السيرفر — لا تعدّل الكود خارج git.
6. الهجرات تخترق بنية القاعدة — **النسخ الاحتياطي قبل كل migrate ليس اختيارياً** (السكربت يفرضها إلا مع `--skip-backup` الصريح).
7. عند نشر نسخة فيها `package-lock.json` متغيّر: `npm ci` محلياً إلزامي (وليس `npm install`) لضمان تطابق الأصول.
8. إذا ظهر `502` بعد النشر: تحقق من مسار `fastcgi_pass` (php8.3-fpm.sock) وأن المستخدم `deploy` ضمن مجموعة `www-data`.
9. أبقِ مفتاح Deploy على GitHub **للقراءة فقط**؛ للكتابة استخدم حساباً منفصلاً.
10. راجع `storage/logs/laravel.log` بعد كل نشر أول 10 دقائق (`LOG_LEVEL=error` يقلل الضجيج).

---

*Lion — DevOps & Deployment | Dev Pack*
