#!/usr/bin/env bash
# Render every template to a PDF and rasterise page 1 into public/template/<id>.png
# (used by the Choose Template gallery). Requires macOS `sips`.
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=.template-previews
mkdir -p "$OUT" public/template

npx tsx --tsconfig tsconfig.app.json scripts/render-templates.tsx "$OUT"

for f in "$OUT"/*.pdf; do
  id=$(basename "$f" .pdf | cut -d- -f1)
  sips -s format png -Z 1100 "$f" --out "public/template/${id}.png" >/dev/null
  echo "public/template/${id}.png"
done
