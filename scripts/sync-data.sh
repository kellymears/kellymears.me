#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/Users/kellymears/code/git/kellymears/kellymears.me"
LOG_FILE="$PROJECT_DIR/.sync-data.log"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"; }

cd "$PROJECT_DIR"
log "Starting sync-data"

# --- Ride import ---
brctl download "$HOME/Library/Mobile Documents/iCloud~com~rungap~RunGap/Documents/Export" 2>/dev/null || true
sleep 5

log "Running import:rides..."
if npm run import:rides >> "$LOG_FILE" 2>&1; then
  log "import:rides completed"
else
  log "import:rides failed"
fi

# --- GitHub data import ---
log "Running import:github..."
if npm run import:github >> "$LOG_FILE" 2>&1; then
  log "import:github completed"
else
  log "import:github failed"
fi

# --- Commit if anything changed ---
DATA_FILES=(
  "public/static/data/activities-metrics.json"
  "public/static/data/activities-routes.json"
  "public/static/data/github.json"
)

CHANGED=()
for f in "${DATA_FILES[@]}"; do
  if ! git diff --quiet "$f" 2>/dev/null; then
    CHANGED+=("$f")
  fi
done

if [[ ${#CHANGED[@]} -eq 0 ]]; then
  log "No data changes — skipping commit"
  exit 0
fi

log "Changes detected in: ${CHANGED[*]}"
git add "${CHANGED[@]}"
git commit -m "data: update cached data

Files: ${CHANGED[*]}"
git push origin main
log "Pushed to origin/main"
