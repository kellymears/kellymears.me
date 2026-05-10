#!/usr/bin/env bash
set -euo pipefail

# Manual recovery counterpart to sync-data.sh — used when the daily launchd
# run misses something (e.g. a ride that hadn't happened yet at 6 AM).
# Stages new files in public/static/data, not just modifications, so brand-new
# per-ride GPS files don't get silently dropped by `commit -a`.

cd "$(dirname "$0")/.."

npm run import:rides
npm run import:github || echo "[import-sync] import:github failed — continuing with ride data only"

git add -A public/static/data

if git diff --cached --quiet; then
  echo "[import-sync] No data changes to commit"
  exit 0
fi

git commit -m "data: update cached data"
git push origin main
