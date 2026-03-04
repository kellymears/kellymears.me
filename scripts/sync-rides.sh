#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/Users/kellymears/code/git/kellymears/kellymears.me"
LOG_FILE="$PROJECT_DIR/.sync-rides.log"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"; }

cd "$PROJECT_DIR"
log "Starting sync-rides"

# Pre-warm iCloud files (non-blocking, best-effort)
brctl download "$HOME/Library/Mobile Documents/iCloud~com~rungap~RunGap/Documents/Export" 2>/dev/null || true
sleep 5

# Import rides
log "Running import-rides..."
if yarn import:rides >> "$LOG_FILE" 2>&1; then
  log "Import completed"
else
  log "Import failed"
  exit 1
fi

# Check for changes
if git diff --quiet data/cycling/activities.json 2>/dev/null; then
  log "No changes to activities.json — skipping commit"
  exit 0
fi

# Commit and push
log "Changes detected — committing"
git add data/cycling/activities.json
git commit -m "data(cycling): update activities from FIT import"
git push origin main
log "Pushed to origin/main"
