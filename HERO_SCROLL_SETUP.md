# Hero Scroll-Driven Video — Setup & Ejecución

## ✅ Qué se implementó

- **`scripts/extract-frames.mjs`**: Script Node.js que extrae 90 frames del video en WebP
- **`components/tienda/HeroScrollVideo.tsx`**: Componente React con Canvas + ScrollTrigger
- **`app/tienda/page.tsx`**: Actualizado para usar HeroScrollVideo como hero dinámico

## 🚀 Pasos para ejecutar

### Paso 1: Instalar ffmpeg (obligatorio)

El script `extract-frames.mjs` necesita ffmpeg para extraer frames del video.

**En Windows (usando Chocolatey):**
```bash
choco install ffmpeg
```

**En macOS (usando Homebrew):**
```bash
brew install ffmpeg
```

**En Linux (Ubuntu/Debian):**
```bash
sudo apt-get install ffmpeg
```

### Paso 2: Extraer frames

Ejecuta el script para generar los 90 frames WebP:

```bash
node scripts/extract-frames.mjs
```

**Salida esperada:**
```
🎬 Extractor de Frames — MementoMundi

✅ ffmpeg y ffprobe detectados

📁 Creado directorio: d:\...\public\frames
⏱️  Duración del video: 3.45s
📹 FPS calculado: 26.09 (para 90 frames)
🎞️  Extrayendo 90 frames en WebP @ q82...

✅ 90 frames extraídos en d:\...\public\frames
📦 Tamaño total: 18.43MB
✨ ¡Listo! Los frames están en: public/frames/
```

### Paso 3: Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre http://localhost:3000/tienda

### Paso 4: Probar el hero scroll

1. **Espera a que cargue el preloader** (barra azul de progreso — debería ser rápido)
2. **Scrollea hacia abajo** y verás:
   - Frame 0 aparece inmediatamente en el canvas
   - Los frames avanzan conforme scrolleas (scrubbing)
   - Tres textos overlay aparecen y desaparecen en diferentes momentos:
     - "memento para vivir" → 15%-38% scroll
     - "memento para disfrutar" → 40%-63% scroll
     - "memento para recordar" → 65%-88% scroll
3. **Sigue scrolleando** hasta la sección de packs (abajo del hero)

## 📋 Requisitos técnicos

### Dependencias instaladas
- ✅ `gsap` (ScrollTrigger incluido)
- ✅ Next.js 16 (App Router)
- ✅ React 19

### Video source
- Ubicación: `public/memento_sticker.mp4`
- Duración: ~3-4 segundos
- Frames extraídos: 90 en WebP @ q82 @ 1280px max
- Tamaño total estimado: 15-25MB

### Compatibilidad
- ✅ Desktop (1024px+): 800vh de scroll height
- ✅ Mobile (< 768px): 550vh de scroll height
- ✅ Responsive: Space Grotesk, clamp() para font sizes
- ✅ Accessibility: `prefers-reduced-motion` respetada

## 🔍 Troubleshooting

### Error: "ffmpeg no encontrado"
**Solución:** Instala ffmpeg siguiendo el Paso 1 anterior.

### Error: "No se extrajeron frames"
1. Verifica que `public/memento_sticker.mp4` existe
2. Verifica que ffmpeg funciona: `ffmpeg -version`
3. Intenta ejecutar el script de nuevo: `node scripts/extract-frames.mjs`

### El canvas no muestra frames
1. Abre DevTools (F12) → Console
2. Busca mensajes de error como `"❌ Error cargando frame X"`
3. Verifica que `public/frames/frame_0001.webp` existe
4. Verifica que el servidor está sirviendo archivos estáticos de `public/`

### El scroll no funciona
1. Verifica que GSAP está instalado: `npm list gsap`
2. Verifica que el archivo se abrió en el navegador (no en editor)
3. Abre DevTools → Console para ver si hay errores de ScrollTrigger

### Los textos no aparecen
1. Scrollea más lentamente
2. Abre DevTools → Inspector y busca elementos con `data-text="0"`, `data-text="1"`, `data-text="2"`
3. Verifica que los estilos de opacidad cambian (dev tools → computed styles)

## 📐 Arquitectura del componente

```
HeroScrollVideo
├─ Canvas (fixed, 100vw × 100vh)
│  └─ Renderer con ScrollTrigger (scrub: true)
│     └─ Cada frame dibujado según scroll progress
│
├─ Text Overlay (fixed, z-index 20)
│  ├─ "memento para vivir" (15%-38%)
│  ├─ "memento para disfrutar" (40%-63%)
│  └─ "memento para recordar" (65%-88%)
│
└─ Preloader (z-index 100)
   └─ Barra de progreso (desaparece cuando fase 1 carga)

Scroll container: 800vh (desktop) / 550vh (mobile)
```

## 🎨 Customización

### Cambiar número de frames
Edita `HeroScrollVideo.tsx`:
```tsx
const TOTAL_FRAMES = 90  // ← Aquí
```

También edita `extract-frames.mjs`:
```js
const TOTAL_FRAMES = 90  // ← Y aquí
```

### Cambiar velocidad de playback
Edita `HeroScrollVideo.tsx`:
```tsx
const FRAME_SPEED = 1.4  // ← Aumentar = más rápido, disminuir = más lento
```

### Cambiar textos
Edita `HeroScrollVideo.tsx`, busca `data-text="0"`, `data-text="1"`, `data-text="2"` y cambia el contenido.

### Cambiar posición de textos
Edita las posiciones CSS en `HeroScrollVideo.tsx`:
```tsx
{/* Texto 1 */}
<div data-text="0" style={{ bottom: 'clamp(40px, 15vh, 120px)', left: 'clamp(16px, 5vw, 80px)', ... }} />
```

## ✨ Performance

**Frame size:**
- 1280px max width (WebP @ q82)
- ~180-250KB por frame
- Total: 15-25MB para 90 frames

**Loading:**
- Fase 1: 10 frames síncronos (primeros ~2MB)
- Fase 2: 80 frames en batches de 10 en background

**Rendering:**
- Canvas con devicePixelRatio para retina displays
- ScrollTrigger con scrub: true (smooth scrubbing)
- No re-decoding de frames (precargados en memoria)

## 🚨 Notas importantes

1. **SSR deshabilitado**: El componente se importa con `ssr: false` porque necesita `window` y `document`
2. **Canvas cleanup**: Los listeners de scroll y resize se limpian en el unmount del componente
3. **Memory management**: Los 90 frames se cargan en memoria, pero el navegador gestiona automáticamente la RAM
4. **CORS**: No hay problemas de CORS porque los frames son locales en `public/frames/`

## 📞 Soporte

Si tienes problemas:
1. Verifica que ffmpeg está instalado y en PATH
2. Verifica que los 90 frames existen en `public/frames/`
3. Abre DevTools → Console para ver mensajes de error
4. Intenta ejecutar `npm run dev` nuevamente
5. Limpia el cache del navegador (Ctrl+Shift+Delete)

---

**Creado el**: 2026-05-15  
**Video source**: `public/memento_sticker.mp4`  
**Frames location**: `public/frames/frame_XXXX.webp`  
**Component**: `components/tienda/HeroScrollVideo.tsx`
