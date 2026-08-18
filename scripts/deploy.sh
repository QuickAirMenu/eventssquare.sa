#!/usr/bin/env bash
#
# Events-Square — production deploy script (runs ON the server, over SSH).
# Code arrives via git; frontend assets are built on Windows and uploaded
# as a tarball (public/build is gitignored), then passed via --assets-tar.
#
# Usage:
#   bash scripts/deploy.sh [--branch main] [--maintenance] [--assets-tar PATH]
#                          [--skip-migrate] [--skip-backup]
#
# Env overrides:
#   DEPLOY_BRANCH, DB_BACKUP_DIR, DB_BACKUP_KEEP, WEB_GROUP,
#   QUEUE_SUPERVISOR_PROGRAM, HEALTH_CHECK_URL

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${DEPLOY_BRANCH:-main}"
DB_BACKUP_DIR="${DB_BACKUP_DIR:-$APP_DIR/storage/backups}"
DB_BACKUP_KEEP="${DB_BACKUP_KEEP:-10}"
ASSETS_TAR=""
MAINTENANCE=0
SKIP_MIGRATE=0
SKIP_BACKUP=0
WAS_DOWN=0

log()  { printf '\033[1;36m[deploy]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[deploy]\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31m[deploy]\033[0m %s\n' "$*" >&2; exit 1; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    --branch)       BRANCH="$2"; shift 2 ;;
    --maintenance)  MAINTENANCE=1; shift ;;
    --assets-tar)   ASSETS_TAR="$2"; shift 2 ;;
    --skip-migrate) SKIP_MIGRATE=1; shift ;;
    --skip-backup)  SKIP_BACKUP=1; shift ;;
    -h|--help)      grep '^#' "$0" | head -n 15; exit 0 ;;
    *)              die "Unknown option: $1 (see --help)" ;;
  esac
done

env_value() {
  local v
  v="$(grep -E "^$1=" "$APP_DIR/.env" | tail -n 1 | cut -d= -f2- | tr -d '\r')" || true
  v="${v%\"}"; v="${v#\"}"; v="${v%\'}"; v="${v#\'}"
  printf '%s' "$v"
}

finish() {
  if [[ "$MAINTENANCE" -eq 1 && "$WAS_DOWN" -eq 1 ]]; then
    php artisan up >/dev/null 2>&1 || true
    log "Maintenance mode OFF (auto-recovery after failure)"
  fi
}
trap finish EXIT

cd "$APP_DIR"

log "==> Preflight"
[[ -f .env ]] || die ".env not found — create it at $APP_DIR/.env first"
for cmd in git composer php; do
  command -v "$cmd" >/dev/null 2>&1 || die "missing command: $cmd"
done
[[ "$(php -r 'echo PHP_VERSION_ID;')" -ge 80300 ]] || die "PHP >= 8.3 required"
grep -q '^APP_ENV=production' .env || warn "APP_ENV is not 'production' — verify this is the right box!"
log "Preflight OK — PHP $(php -r 'echo PHP_VERSION;')"

log "==> Updating code (branch: $BRANCH)"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
git clean -fd

log "==> composer install --no-dev"
composer install --no-dev --optimize-autoloader --prefer-dist --no-progress --no-interaction

if [[ -n "$ASSETS_TAR" ]]; then
  log "==> Extracting frontend assets from $ASSETS_TAR"
  [[ -f "$ASSETS_TAR" ]] || die "assets tarball not found: $ASSETS_TAR"
  rm -rf public/build
  mkdir -p public/build
  tar -xzf "$ASSETS_TAR" -C public/build
  rm -f "$ASSETS_TAR"
fi
[[ -f public/build/manifest.json ]] \
  || die "public/build/manifest.json missing — build locally (npm ci && npm run build), upload tarball, pass --assets-tar"

if [[ "$MAINTENANCE" -eq 1 ]]; then
  log "==> Maintenance mode ON"
  php artisan down || true
  WAS_DOWN=1
fi

if [[ "$SKIP_MIGRATE" -eq 1 ]]; then
  warn "Skipping migrations (--skip-migrate)"
else
  if [[ "$SKIP_BACKUP" -eq 1 ]]; then
    warn "Skipping DB backup (--skip-backup)"
  else
    log "==> DB backup"
    if [[ "$(env_value DB_CONNECTION)" == "mysql" ]] && command -v mysqldump >/dev/null 2>&1; then
      DB_NAME="$(env_value DB_DATABASE)"
      DB_USER="$(env_value DB_USERNAME)"
      DB_PASS="$(env_value DB_PASSWORD)"
      DB_HOST="$(env_value DB_HOST)"
      DB_PORT="$(env_value DB_PORT)"
      mkdir -p "$DB_BACKUP_DIR"
      BACKUP_FILE="$DB_BACKUP_DIR/${DB_NAME:-db}-$(date +%Y%m%d-%H%M%S).sql.gz"
      MYSQL_PWD="$DB_PASS" mysqldump --single-transaction --quick --no-tablespaces \
        ${DB_HOST:+-h"$DB_HOST"} ${DB_PORT:+-P"$DB_PORT"} -u"$DB_USER" "$DB_NAME" \
        | gzip > "$BACKUP_FILE"
      log "Backup saved: $BACKUP_FILE"
      ls -1t "$DB_BACKUP_DIR"/*.sql.gz 2>/dev/null | tail -n +$((DB_BACKUP_KEEP + 1)) | xargs -r rm -f
    else
      warn "DB_CONNECTION is not mysql, or mysqldump missing — backup skipped"
    fi
  fi
  log "==> php artisan migrate --force"
  php artisan migrate --force
fi

log "==> Caching config / routes / views / events"
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

log "==> storage:link"
php artisan storage:link

if [[ -n "${WEB_GROUP:-}" ]]; then
  chgrp -R "$WEB_GROUP" storage bootstrap/cache 2>/dev/null || true
  chmod -R ug+rwX storage bootstrap/cache 2>/dev/null || true
fi

log "==> Restarting queue workers"
php artisan queue:restart || true
if [[ -n "${QUEUE_SUPERVISOR_PROGRAM:-}" ]] && command -v supervisorctl >/dev/null 2>&1; then
  supervisorctl restart "$QUEUE_SUPERVISOR_PROGRAM":* 2>/dev/null || true
fi

log "==> Restarting php-fpm"
if command -v systemctl >/dev/null 2>&1; then
  for svc in php8.4-fpm php8.3-fpm php-fpm; do
    if systemctl is-active --quiet "$svc" 2>/dev/null; then
      systemctl restart "$svc"
      log "Restarted $svc"
      break
    fi
  done
fi

if [[ "$MAINTENANCE" -eq 1 ]]; then
  php artisan up
  WAS_DOWN=0
  log "==> Maintenance mode OFF"
fi

if [[ -n "${HEALTH_CHECK_URL:-}" ]]; then
  sleep 2
  if curl -fsS -o /dev/null --max-time 15 "$HEALTH_CHECK_URL"; then
    log "Health check OK: $HEALTH_CHECK_URL"
  else
    warn "Health check FAILED: $HEALTH_CHECK_URL — verify the site manually!"
  fi
fi

log "Deploy finished."
