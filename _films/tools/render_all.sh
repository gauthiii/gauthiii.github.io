#!/usr/bin/env bash
# Render every film with HyperFrames, then encode web copies + posters into ../media/films.
# usage: bash tools/render_all.sh [film ...]   (default: all seven) — run from _films/
set -euo pipefail
cd "$(dirname "$0")/.."
FILMS=("$@"); [[ ${#FILMS[@]} -eq 0 ]] && FILMS=(reel forgeui mathra inboxpulse prixie resonate gos)
mkdir -p renders ../media/films
for f in "${FILMS[@]}"; do
  echo "== $f"
  node tools/build_films.mjs "$f"
  npx --yes hyperframes@0.8.185 render -q delivery --quiet -o "renders/$f.mp4"
  ffmpeg -v error -y -i "renders/$f.mp4" -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart "../media/films/$f.mp4"
  ffmpeg -v error -y -ss 5 -i "renders/$f.mp4" -frames:v 1 -f image2pipe -vcodec png - | cwebp -quiet -q 80 -resize 1280 0 -o "../media/films/$f.webp" -- -
  ls -la "../media/films/$f.mp4"
done
