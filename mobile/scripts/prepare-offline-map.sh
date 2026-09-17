#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/offline/kreta.pmtiles"
BBOX="23.40,34.80,26.70,35.80"
MAXZOOM="14"

mkdir -p "$(dirname "$OUT")"

if command -v pmtiles >/dev/null 2>&1; then
  PMTILES="pmtiles"
elif command -v go >/dev/null 2>&1; then
  PMTILES="$(go env GOPATH)/bin/pmtiles"
  if [ ! -x "$PMTILES" ]; then
    echo "Installing Protomaps pmtiles CLI..."
    go install github.com/protomaps/go-pmtiles@latest
  fi
else
  echo "Neither pmtiles nor Go is installed." >&2
  exit 1
fi

# Protomaps publishes daily OSM-derived basemap builds. Find the newest
# available build without assuming that today's build has been published yet.
TODAY="$(date -u +%Y%m%d)"
SOURCE=""
for offset in $(seq 0 14); do
  if command -v python3 >/dev/null 2>&1; then
    DAY="$(python3 - "$TODAY" "$offset" <<'PY'
import datetime, sys
base=datetime.datetime.strptime(sys.argv[1], '%Y%m%d').date()
print((base-datetime.timedelta(days=int(sys.argv[2]))).strftime('%Y%m%d'))
PY
)"
  else
    DAY="$TODAY"
  fi
  URL="https://build.protomaps.com/${DAY}.pmtiles"
  if curl -fsSI --max-time 20 "$URL" >/dev/null 2>&1; then
    SOURCE="$URL"
    echo "Using Protomaps build: $URL"
    break
  fi
done

if [ -z "$SOURCE" ]; then
  echo "No recent Protomaps daily build was reachable." >&2
  exit 1
fi

rm -f "$OUT"
"$PMTILES" extract "$SOURCE" "$OUT" --bbox="$BBOX" --maxzoom="$MAXZOOM" --overfetch=0

if [ ! -s "$OUT" ]; then
  echo "Offline PMTiles extraction produced no file." >&2
  exit 1
fi

ls -lh "$OUT"
