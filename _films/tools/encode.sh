#!/usr/bin/env bash
# Encode the chosen captures into web assets under ../media (site) — run from _films/.
# usage: bash tools/encode.sh [app ...]   (default: all)
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=assets/shots
DST=../media/shots
LOOPS=../media/loops

webp() { # app name width [quality]
  local app=$1 name=$2 w=$3 q=${4:-80}
  mkdir -p "$DST/$app"
  cwebp -quiet -q "$q" -alpha_q 90 -resize "$w" 0 "$SRC/$app/$name.png" -o "$DST/$app/$name.webp"
}

loop() { # app start duration
  local app=$1 ss=$2 t=$3
  mkdir -p "$LOOPS"
  ffmpeg -v error -y -ss "$ss" -t "$t" -i "$SRC/$app/loop-raw.webm" \
    -vf "fps=30,scale=1280:-2:flags=lanczos,format=yuv420p" -an -c:v libx264 -preset slow -crf 26 \
    -movflags +faststart "$LOOPS/$app.mp4"
  ffmpeg -v error -y -ss "$ss" -i "$SRC/$app/loop-raw.webm" -frames:v 1 -vf "scale=1280:-2" -f image2pipe -vcodec png - \
    | cwebp -quiet -q 78 -o "$LOOPS/$app.webp" -- -
}

want() { [[ $# -eq 0 || " ${ARGS[*]} " == *" $1 "* ]]; }
ARGS=("$@")

if want forgeui; then
  for n in pal-00 pal-02 pal-04 pal-07 morph-modern morph-glass morph-brutalism morph-cyber morph-aurora morph-liquid-glass library exported-app; do webp forgeui $n 1920 78; done
  for n in minimal modern glass neumorphism liquid-glass aurora colorful clay brutalism bento retro cyber enterprise clinical editorial pro-dark; do
    mkdir -p "$DST/forgeui/wall"; cwebp -quiet -q 72 -resize 640 0 "$SRC/forgeui/morph-$n.png" -o "$DST/forgeui/wall/$n.webp"
  done
fi
if want mathra; then
  for f in "$SRC"/mathra/*.png; do webp mathra "$(basename "$f" .png)" 1920 80; done
fi
if want inboxpulse; then
  for f in "$SRC"/inboxpulse/*.png; do webp inboxpulse "$(basename "$f" .png)" 1920 80; done
fi
if want prixie; then
  for f in "$SRC"/prixie/*.png; do webp prixie "$(basename "$f" .png)" 800 88; done
fi
if want resonate; then
  for f in "$SRC"/resonate/*.png; do webp resonate "$(basename "$f" .png)" 1920 80; done
fi
if want gos; then
  for n in boot-desktop phase-patchv2_default_boot phase24_desktop_icons phase22_restored_fm phase24_ls phase24_calc_19 phase21_three_windows phase23_typed phase26_menu_over_window; do webp gos $n 1280 84; done
  cp "$SRC/gos/serial-excerpt.txt" "$DST/gos/serial-excerpt.txt"
fi
if want loops; then
  loop pdfcraft 0.3 8.2
  loop globalstocks 0.3 9
  loop cognabite 0.3 9
  loop playlistbridge 4.0 9.5
  loop watchparty 0.2 7.5
fi
du -sh "$DST" "$LOOPS" 2>/dev/null

# Hero wall thumbnails (one per flagship, 720w).
if want hero; then
  mkdir -p ../media/hero
  hero() { cwebp -quiet -q 74 -alpha_q 90 -resize 720 0 "$SRC/$1/$2.png" -o "../media/hero/$1.webp"; }
  hero forgeui morph-modern; hero mathra 05-stream-6; hero inboxpulse 02-dashboard
  hero prixie 05-modeA; hero resonate 05-stems; hero gos phase21_three_windows
fi
