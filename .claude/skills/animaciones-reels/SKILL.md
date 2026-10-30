---
name: animaciones-reels
description: Crea animaciones (motion graphics) para Reels/TikTok verticales a partir de un video de una persona hablando a cámara, sincronizadas con lo que dice, con el estilo de marca del cliente, y las exporta como clips sueltos en pantalla verde (y ProRes con transparencia) para integrar en CapCut. Usar cuando Martina pida "animaciones para un video", "gráficos para un reel", "hacé las animaciones como la otra vez", o pase un video + una referencia de Instagram para animar.
---

# Animaciones para Reels → CapCut

Flujo probado con el reel de López Baena ("4 claves para detectar una buena inversión").
Martina es community manager y editora: **ella integra en CapCut**. No entregar el video final
editado salvo que lo pida; entregar **animaciones sueltas + sonidos + guía de tiempos**.

## 1. Conseguir el video

- Hasta ~30 MB lo adjunta en el chat (queda en `/root/.claude/uploads/...`).
- Más pesado: lo sube como asset de una Release de GitHub en `maresss532/claucode-martinaes`
  (Releases → v1 → Edit → arrastrar archivo → Update release). Para descargarlo:
  ```bash
  gh api repos/maresss532/claucode-martinaes/releases --jq '.[].assets[] | {id,name,size}'
  gh api -H "Accept: application/octet-stream" repos/maresss532/claucode-martinaes/releases/assets/<ID> > video.mp4
  ```
  (`gh release download` falla porque GraphQL está bloqueado; usar REST como arriba.)
- Drive, Dropbox, WeTransfer e Instagram están bloqueados por la red del entorno.
- `ffprobe` para ver resolución/duración. Hacer una hoja de contactos para entender las tomas:
  `ffmpeg -i video.mp4 -vf "fps=1/6,scale=180:-1,tile=5x2" -frames:v 1 hoja.jpg`

## 2. Transcribir con tiempos por palabra

HuggingFace está bloqueado; el modelo se baja de npm (paquete `sts-whisper-small`):
```bash
mkdir -p $SCRATCH/model && cd $SCRATCH/model && curl -sL https://registry.npmjs.org/sts-whisper-small/-/sts-whisper-small-1.0.0.tgz | tar xz
mkdir -p $SCRATCH/stt && cd $SCRATCH/stt && npm init -y && npm i @huggingface/transformers@3
ffmpeg -i video.mp4 -ac 1 -ar 16000 -f f32le audio.raw     # crudo float32: ¡no usar wav + wavefile!
node scripts/transcribe.mjs $SCRATCH/model/package/models audio.raw words.json word
```
Tarda ~2 min para 1 minuto de audio. **Revisar errores** de términos técnicos y corregir
(ej. "killer" → "alquiler", "cabrite" → "Cap Rate"). Nombres propios: confirmar con Martina.

## 3. Detectar cambios de toma

```bash
ffmpeg -i video.mp4 -vf "select='gt(scene,0.25)',showinfo" -f null - 2>&1 | grep -o 'pts_time:[0-9.]*'
```
Los cambios de toma suelen coincidir con los bloques del guion (paso 1, paso 2…). Usarlos para
ubicar las pantallas completas y recomendar transiciones en la guía.

## 4. Estilo visual

Antes de diseñar, pedir **referencia** (video de Instagram adjunto o capturas) y **colores/logo de la
marca** (captura del perfil sirve: muestrear colores con PIL). Ver `referencias/lopez-baena.md`.

Estilo que gustó (el primero, dorado/fino/minimalista, **NO gustó: "muy simple"**):
- **Íconos sólidos de dos tonos** (relleno, con peso), nunca de línea fina.
- **Entradas con rebote** (spring damping ~11), no fundidos suaves.
- **Tarjetas blancas redondeadas arriba** (top ~150 px, radio 44, sombra), donde el ícono se va
  armando con lo que se dice (casa → ✓, barras que crecen + flecha, sello "justo", lista con ✓).
- **Pantallas completas cortas (2–3 s)** con revelado circular, en color de marca o crema con grilla
  (ej. "4 claves", pin con ondas tipo radar, "cap rate", cierre con nombre de marca).
- **Texto en dos pesos**: línea chica Montserrat Light + palabra clave grande en la tipografía
  de la marca en bold, a veces con **resaltado de color que barre** detrás.
- **Mayúscula inicial en todos los textos** (títulos, chips, líneas chicas): "Ubicación", "Precio justo",
  "Claves para" / "Detectarla". Términos técnicos con mayúscula en cada palabra: **"Cap Rate"**.
  Nunca todo en minúscula.
- **Colores planos, nunca degradés** (ni en fondos, ni en botones, ni viñetas radiales). Si Martina pasa
  una paleta (ej. link de coolors.co), usar **solo esos colores** + blanco + un oscuro para texto.
  No sumar colores extra: "demasiado colorido" fue una corrección. Ver `referencias/viaje-familias.md`.
- Revisar que cada beneficio del guion quede en la animación del ítem que corresponde
  (ej. "con entradas incluidas" aplicaba a Parque de la Costa **y** Temaikèn).
- Cierre: nombre de marca + slogan a pantalla completa que se achica a banner superior.
- Zona segura: gráficos en el tercio superior; no tapar la cara; dejar abajo libre para subtítulos
  de CapCut y la UI de Instagram.

## 5. Proyecto Remotion

```bash
npx --yes create-video@latest --yes --blank proyecto   # el modo interactivo no funciona acá
cd proyecto && npm i @remotion/fonts@<misma versión que remotion> @fontsource/montserrat@5 @fontsource/<fuente-marca>@5
mkdir -p public/fonts public/sfx && cp node_modules/@fontsource/*/files/*-latin-{300,400,700}-normal.woff2 public/fonts/
cp video.mp4 public/video.mp4
```
- Copiar `plantilla/kit.tsx` (colores, fuentes, `Pop`, `Card`, `Full`, `StepBadge`, íconos SVG),
  `plantilla/theme.ts`, y usar `plantilla/Scenes-ejemplo.tsx` + `plantilla/Root-ejemplo.tsx` como base.
- Cambiar colores/fuentes en `kit.tsx` según la marca.
- Cada escena recibe `dur` y `r(segundo)` → frame relativo, para sincronizar con `words.json`.
  Disparar cada elemento en el **segundo exacto en que se dice la palabra**.
- `TIMELINE` define nombre, inicio y fin (en segundos del video original) de cada animación.
- Composición `Preview` = video + todas las animaciones, para revisar.

Revisar con capturas antes de exportar (Chromium preinstalado, `remotion.media` está bloqueado):
```bash
B=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
npx remotion still Preview s.jpg --frame=300 --browser-executable=$B --scale=0.5
```
Armar una hoja con varias capturas y mirarla; corregir superposiciones con la cara y legibilidad.

## 6. Sonidos

Sin bancos de sonidos accesibles: `python3 scripts/make_sfx.py public/sfx` genera whoosh, pop,
tick, chime, rise y shimmer (sintetizados, suaves). Volumen sugerido en CapCut 15–30 %.

## 7. Exportar y entregar

`bash scripts/exportar.sh <proyecto>` → vista previa, `.mov` ProRes 4444 con alfa y
**`.mp4` pantalla verde** (#00FF00, sin sombras para que el croma quede limpio).

- **Entregar los MP4 de pantalla verde** (pesan ~0,1–0,5 MB): los ProRes pesan 10–110 MB y
  **no se pudieron reproducir ni descargar desde el chat**. Ofrecer ProRes solo si los pide.
- La subida de archivos binarios a GitHub Releases está bloqueada desde el entorno; entregar con
  SendUserFile.
- Entregar: vista previa → zip único (`pantalla-verde/`, `sonidos/`, `GUIA-CAPCUT.txt`).
- La guía lista cada clip con **segundo de inicio y duración**, los sonidos con su segundo, y
  dónde poner transiciones (Disolver/Desenfoque 0,5 s en los cambios de toma).
- Explicar el croma en CapCut: clip → Recortar fondo → Croma → gotero sobre el verde → Intensidad 20–30 %.
- Explicar cómo descargar: tocar la tarjeta del archivo → ícono de descarga; en el celular
  "Guardar en Archivos" y tocar el zip para descomprimir.

## Comunicación

Responder en español rioplatense, con pasos cortos y concretos (Martina trabaja desde Mac y celular).
Avisar el progreso durante renders largos y mandar la vista previa antes que los archivos finales.
