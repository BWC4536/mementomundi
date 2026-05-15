# pegatina3d.md — Plan de Implementación: Animación Pegatina MEMENTO en /tienda

> **Objetivo**: SVG del texto MEMENTO con forma de pegatina que se "despega" hacia la derecha a medida que el usuario hace scroll hacia abajo, y se vuelve a pegar al hacer scroll hacia arriba. Efecto físico real: el borde izquierdo permanece pegado, el derecho se levanta, revelando una sombra debajo y un rizo 3D.

---

## 1. Investigación de Opciones

### Opción A — Tú aportas el SVG, yo implemento la animación (RECOMENDADA)

**Flujo:**
1. Tú diseñas el SVG de la pegatina MEMENTO (texto + forma de pegatina + posible borde dentado/redondeado) en Figma, Illustrator, o Canva
2. Me lo pasas como archivo `.svg`
3. Yo implemento la animación scroll-driven completa

**Ventajas:**
- Control total del diseño final (tú decides la forma exacta, el estilo, el grosor del borde)
- Yo me foco en la lógica de animación, que es lo complejo
- Resultado garantizado que coincide con tu visión

**Herramientas de animación a usar:**
- **Framer Motion** (ya en stack) — `useScroll` + `useTransform` para animar `rotateY`, `skewY`, `translateX`, `boxShadow` en función del scroll progress
- **CSS 3D transforms** — `perspective`, `transform-origin: left center`, `rotateY`
- **SVG inline** — Para poder animar partes individuales del SVG (borde, sombra, relleno)

---

### Opción B — Yo genero el SVG Y la animación con skills de diseño

**Flujo:**
1. Uso `imagegen-frontend-web` para generar mockups visuales de la pegatina en distintos estados (pegada, a medio despegar, despegada)
2. Uso `image-to-code` para convertir el visual al SVG React component
3. Implemento la animación

**Ventajas:** No necesitas Figma ni diseñar nada
**Desventajas:** El SVG generado puede no coincidir exactamente con tu visión de marca

---

### Opción C — Lottie / Video exportado

**Flujo:** Animar en After Effects → exportar como Lottie JSON → usar `lottie-react` controlado por scroll

**Ventajas:** Animación frame-perfect, control total de easing
**Desventajas:** Requiere After Effects + proceso de exportación, más pesado (200-500KB Lottie), menos integrado con el scroll nativo

**Veredicto**: Descartada para MVP — overkill para este efecto.

---

## 2. PLAN ELEGIDO: Opción A (recomendada)

**Premisa:** Tú aportas el SVG. Yo implemento la animación con Framer Motion.

---

## 3. Paso a Paso de Implementación

### PASO 1 — Preparar el SVG (TÚ)

Diseña o dame el SVG con estas características para que la animación funcione bien:

**Requisitos del SVG:**
- Viewbox rectangular o con forma de pegatina (borde redondeado, dentado, o forma irregular)
- Fondo de color (la pegatina en sí) — puede ser blanco roto, naranja (#EA580C), azul (#0EA5E9)
- Texto "MEMENTO" en Space Grotesk Bold centrado
- Opcionalmente: borde negro grueso (neo-brutalism del design system)
- **Sin sombra propia** — la sombra la generamos en CSS dinámicamente para que responda al scroll
- Exportar como SVG limpio (sin grupos innecesarios)

**Referencia de estilos posibles:**
```
[Estilo 1] Rectángulo con esquinas muy redondeadas (pill shape), fondo naranja, texto blanco, borde negro 3px
[Estilo 2] Forma libre tipo parche (patch), fondo crema, texto azul marino, borde grueso irregular
[Estilo 3] Rectángulo clásico con esquinas ligeramente redondeadas, fondo blanco, texto negro, línea roja de advertencia arriba
```

---

### PASO 2 — Estructura del componente React

**Archivo a crear:** `app/tienda/components/StickerPeel.tsx`

**Estructura:**
```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// SVG inline importado o como string
import MementoSVG from '@/public/memento-pegatina.svg' // (o inline)

export function StickerPeel() {
  const containerRef = useRef(null)

  // useScroll vinculado al contenedor padre (la sección de /tienda)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end start'] // empieza a animar cuando el sticker llega al centro de pantalla
  })

  // Transformaciones basadas en scroll (0 = pegada, 1 = despegada)
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -35])      // se dobla en eje Y
  const translateX = useTransform(scrollYProgress, [0, 1], [0, 60])    // se desplaza derecha
  const skewY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -3, 0]) // ligero skew en el medio
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.4, 0.15])
  const shadowBlur = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <div ref={containerRef} className="relative w-fit">
      {/* Sombra dinámica detrás */}
      <motion.div
        className="absolute inset-0 bg-black rounded-[inherit]"
        style={{
          opacity: shadowOpacity,
          filter: useTransform(shadowBlur, v => `blur(${v}px)`),
          transform: 'translate(8px, 8px)',
          zIndex: 0,
        }}
      />

      {/* La pegatina */}
      <motion.div
        style={{
          rotateY,
          x: translateX,
          skewY,
          transformOrigin: 'left center',
          perspective: 800,
          zIndex: 1,
          position: 'relative',
        }}
      >
        {/* Tu SVG aquí */}
        <MementoSVG width={300} height="auto" />
      </motion.div>
    </div>
  )
}
```

---

### PASO 3 — Integración en /tienda

**Archivo:** `app/tienda/page.tsx`

**Dónde colocar el componente:**
- En la sección hero de la tienda, sobre el título o al lado del producto
- La sección debe tener suficiente altura de scroll (min 200vh) para que la animación sea suave
- Ejemplo de estructura:

```tsx
import { StickerPeel } from './components/StickerPeel'

// Dentro de la sección hero de /tienda:
<section className="min-h-[200vh] relative flex items-center justify-center">
  <div className="sticky top-1/3">
    <StickerPeel />
    <h1 className="text-5xl font-bold text-primary mt-8">
      Tu recuerdo, tu huella
    </h1>
  </div>
</section>
```

**Nota sobre `sticky`**: El componente debe estar dentro de un div con `position: sticky` para que permanezca visible mientras el usuario hace scroll y la animación avance.

---

### PASO 4 — Ajuste fino de la física del despegado

**Los parámetros que ajustaremos juntos:**

| Parámetro | Valor inicial | Efecto |
|-----------|--------------|--------|
| `rotateY` rango | `[0, -35]` deg | Cuánto se dobla. Más = más dramático |
| `translateX` rango | `[0, 60]` px | Cuánto se desplaza a la derecha |
| `transformOrigin` | `'left center'` | El borde izquierdo es el "pegado" |
| `offset` del scroll | `['start center', 'end start']` | Cuándo empieza/termina la animación |
| `perspective` | `800px` | Profundidad 3D. Menos = más exagerado |

**Para un efecto más realista** (opcional, Paso 4b):
- Añadir un gradiente de sombra interna en el borde izquierdo del SVG (simula el pliegue)
- Usar `scaleX` ligeramente en el lado derecho para simular que se estrecha al doblarse
- Añadir `filter: drop-shadow()` dinámico

---

### PASO 5 — Mobile (375px)

- Reducir el SVG a `width={200}` en mobile
- Reducir `translateX` a `[0, 30]` (menos desplazamiento en pantalla pequeña)
- Usar `useMediaQuery` o Tailwind responsive para condicionar valores
- Verificar que el efecto no rompe el layout en 375px

---

### PASO 6 — Performance

- El SVG debe ser **inline** (no `<img src="...">`) para que Framer Motion pueda animar partes de él y para evitar doble request
- Usar `will-change: transform` en el div animado para activar compositing en GPU
- La animación usa Framer Motion's `useTransform` que es **completamente sin re-renders** (valores reactivos del motion value, no state de React)
- No hay JS pesado — todo es CSS transforms en GPU

---

## 4. Skills a Usar

| Skill | Cuándo | Para qué |
|-------|--------|---------|
| `imagegen-frontend-web` | Si necesitas mockup visual del efecto antes de codificar | Ver los 3 estados: pegada / a medio / despegada |
| `image-to-code` | Si genero yo el SVG en imagen y lo convierto | Convertir mockup → SVG React component |
| `design-taste-frontend` | Al revisar el componente final | Asegurar que el efecto no se ve "cheap" |
| `high-end-visual-design` | Para el pulido final | Ajustar sombras, easing, micro-detalles |
| `react-best-practices` | Antes de mergear | Auditar el componente de animación |

---

## 5. Árbol de Decisión Final

```
¿Tienes el SVG de la pegatina MEMENTO?
├── SÍ → Me lo pasas → Voy al PASO 2 directamente
└── NO → ¿Quieres que yo lo genere?
         ├── SÍ → Uso imagegen-frontend-web para 3 propuestas visuales
         │         → Eliges una → Genero el SVG → PASO 2
         └── NO → Descríbeme el estilo (colores, forma, grosor borde)
                  → Genero SVG en código directamente → PASO 2
```

---

## 6. Lo que NECESITO de ti para empezar

1. **El SVG** — o la decisión sobre el árbol de arriba
2. **Dónde en /tienda** — ¿en el hero? ¿al lado de la foto del producto? ¿flotando?
3. **Intensidad del efecto** — ¿sutil (se levanta un poco)? ¿dramático (casi se desprende del todo)?
4. **Trigger del scroll** — ¿empieza al llegar al hero de tienda? ¿al llegar al precio? ¿a la sección de descripción?

---

## 7. Estimación

| Tarea | Tiempo estimado |
|-------|----------------|
| Si me das el SVG → implementar animación completa | 30-45 min |
| Si genero el SVG yo → mockup + SVG + animación | 60-90 min |
| Ajuste fino + mobile | 15-20 min |
| Integración en /tienda + auditoría | 15 min |

---

*Plan creado para Memento Mundi — Design System: Space Grotesk, #0EA5E9, #EA580C, neo-brutalism*
