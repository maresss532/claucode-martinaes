#!/usr/bin/env bash
# Exporta vista previa + cada animación (ProRes con alfa) + versión pantalla verde + zip.
# Uso: bash exportar.sh <carpeta-proyecto-remotion>
set -e
cd "$1"
B=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome   # Chromium preinstalado (remotion.media está bloqueado)
[ -x "$B" ] || B=$(ls -d /opt/pw-browsers/chromium-*/chrome-linux*/chrome | head -1)
mkdir -p out/animaciones out/pantalla-verde
npx remotion render Preview out/vista-previa.mp4 --browser-executable=$B --scale=0.5 --crf=26
for id in $(npx remotion compositions --browser-executable=$B 2>&1 | grep -oE "^[0-9]{2}-[A-Za-z0-9-]+"); do
  npx remotion render $id out/animaciones/$id.mov --codec=prores --prores-profile=4444 \
    --pixel-format=yuva444p10le --image-format=png --muted --browser-executable=$B
  # Pantalla verde: se descartan sombras semitransparentes para que el croma quede limpio
  ffmpeg -v error -y -f lavfi -i color=c=0x00FF00:s=1080x1920:r=30 -i out/animaciones/$id.mov \
    -filter_complex "[1]format=rgba,lutrgb=a='clip((val-110)*2.5,0,255)'[fg];[0][fg]overlay=shortest=1,format=yuv420p" \
    -c:v libx264 -crf 16 -preset medium -movflags +faststart out/pantalla-verde/$id.mp4
done
cd out && zip -q -r animaciones.zip pantalla-verde sonidos GUIA-CAPCUT.txt 2>/dev/null || zip -q -r animaciones.zip pantalla-verde
ls -la
