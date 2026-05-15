# Memento Mundi — Design System Master

> **LOGIC:** Al construir una página específica, primero comprueba si existe `design-system/pages/[page-name].md`.
> Si existe, sus reglas **sobrescriben** este Master. Si no, sigue estrictamente las reglas de abajo.

---

**Project:** Memento Mundi
**Category:** Travel memory platform — phygital scrapbook for young travelers (18–35)
**Style:** Travel-journal scrapbook + neo-retro stickers + hard-shadow neo-brutalism, hand-curated memory-wall aesthetic.
**Last sync:** with `/tienda` page as visual source of truth.

---

## 1. Color Palette

| Role | Hex | Tailwind | Uso |
|------|-----|----------|-----|
| **Cream** (base bg) | `#EAE7DA` | `cream` | Fondo principal en todas las páginas claras |
| **Navy** (foreground) | `#0B2150` | `navy` | Texto principal, sombras duras, bordes acento |
| **Orange** (CTA / accent) | `#FA9223` | `orange` | Botones primarios, highlights, tape decoration |
| **Coral** (soft accent) | `#FFB4AD` | `coral` / `pink` | Cards secundarias, italic accent en headings |
| **Teal Dark** (dramatic) | `#066F84` | `teal-dark` | Bandas, marquees, CTA sections |
| **Teal Light** | `#5CA4A4` | `teal-light` / `teal` | Underlines wavy, gradientes secundarios |
| **Card** (cream warmer) | `#F5F1E4` | `card` | Cards sobre fondo cream |
| **Destructive** | `#DC2626` | `red-600` | Logout, errores, validación |

### Inversiones cromáticas
- **Sección cream**: bg-cream + text-navy + acentos orange.
- **Sección navy** (drama): bg-navy + text-cream + acentos coral.
- **Sección teal-dark** (CTA): bg-teal-dark + text-cream + orange highlights.

### Alternancia en una página
Cream → Navy (Stories) → Cream → Teal-dark (CTA). No saturar con más de 3 cambios por página.

---

## 2. Typography

- **Heading display** → `font-display` = **Playfair Display** (Google Fonts), italic accentuado para emoción.
- **Body / labels / captions** → `font-grown` = **Nunito**.
- **Brasica alias** (legacy) → mantén `font-brasica` apuntando a Playfair.

### Escala tipográfica

| Elemento | Clase | Detalle |
|---|---|---|
| H1 Hero | `font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95]` | Italic spans embebidos para emoción |
| H2 Sección | `font-display font-black text-4xl md:text-6xl` | Con span `italic` puntual |
| H3 Card | `font-display font-bold text-2xl` o `text-3xl` | Letterspacing normal |
| Caption polaroid | `font-display italic text-center text-navy` | `mt-1 text-sm` o `text-base` |
| Body large | `font-grown text-lg text-navy/75` | Para intros de hero |
| Body | `font-grown text-base text-navy/70` o `text-cream/70` | Texto general |
| Chip / pill | `font-display font-black uppercase tracking-widest text-xs` o `text-sm` | UPPERCASE, máx 3 palabras |
| Label form | `font-grown font-bold uppercase tracking-wide text-xs text-navy/75` | Inputs y form labels |
| Caption mini | `font-display italic text-xs text-navy/55` | Subtítulos secundarios |

### Acentos italic
- **Patrón**: la palabra emocional/poética va dentro de `<span class="italic">`. Ejemplos:
  - "Collect the world, *one memory at a time.*"
  - "A little corner shop for your *wandering soul.*"
  - "One wall. *A whole world.*"

### Decoración tipográfica
- `underline decoration-wavy decoration-teal-light underline-offset-4` para CTAs secundarios.
- Nunca `text-shadow` excepto sobre fondos con imagen.

---

## 3. Decorative Kit (CSS utilities en globals.css)

Estas clases están definidas globalmente y **deben usarse sistemáticamente**:

| Clase | Propósito | Cuándo usarla |
|---|---|---|
| `.polaroid` | Card-imagen con marco crema + sombra dura + caption italic | Cualquier card que muestre imagen + texto corto |
| `.tape` | Rectángulo naranja translúcido con bordes dashed | Decorar polaroids fijadas al fondo |
| `.sticker` | Drop-shadow 4px navy + 10px blur | Chips/badges destacados rotados |
| `.grain` | Radial-gradient overlay de textura | Capa absolute sobre secciones, `pointer-events-none` |
| `.float-slow` | Animación 6s ease-in-out infinite | Polaroids/stickers decorativos absolute |
| `.marquee` | Scroll horizontal 30s linear infinite | Bandas con city names u otros loops |
| `.bg-dots` | Background dot-pattern radial | Texturas sutiles secundarias |

### Variable CSS de rotación
Las decoraciones flotantes usan `--r` para el ángulo base, combinable con float-slow:
```html
<div class="float-slow" style="--r: -8deg;">...</div>
```

---

## 4. Shadows (sombras duras navy, no soft)

| Token | Valor | Uso |
|---|---|---|
| Card estándar | `shadow-[6px_6px_0_0_#0B2130]` | Feature cards, category chips |
| Story card | `shadow-[8px_8px_0_0_#0B2130]` | Cards prominentes |
| Botón pill CTA | `shadow-[0_8px_0_-2px_#0B2130]` | Botón principal en reposo |
| Botón pill CTA hover | `shadow-[0_4px_0_-2px_#0B2130]` + `translate-y-0.5` | Compresión 3D al hover |
| Chip / sticker badge | `shadow-[3px_3px_0_#0B2150]` | Stickers rotados pequeños |
| Polaroid (vía clase) | Predefinida en `.polaroid` | No re-aplicar |

**Prohibido:** `shadow-sm`, `shadow-md`, `shadow-lg` de Tailwind por defecto. Siempre sombras duras navy custom.

**Excepciones:**
- `shadow-card-soft` / `shadow-card-hover` (definidas en tailwind.config) sólo en cards muy interiores donde la sombra dura sería visualmente ruidosa.

---

## 5. Component Specs

### Botones

**Primary CTA pill** (basado en /tienda Hero CTA):
```tsx
<a className="inline-flex items-center gap-2 bg-orange text-navy font-bold px-6 py-3.5 rounded-full
              shadow-[0_8px_0_-2px_#0B2130]
              hover:translate-y-0.5 hover:shadow-[0_4px_0_-2px_#0B2130]
              transition">
  Texto <ArrowRight className="h-5 w-5" />
</a>
```

**Secondary CTA** (link underline):
```tsx
<a className="inline-flex items-center gap-2 text-navy font-semibold
              underline decoration-wavy decoration-teal-light underline-offset-4
              hover:text-teal-dark">
  Texto
</a>
```

**Form submit** (auth):
```tsx
<button className="bg-orange text-white font-brasica font-black rounded-full py-4
                   border-2 border-navy
                   shadow-[4px_4px_0_#0B2150]
                   transition-opacity">
  Acción →
</button>
```

### Cards

**Feature card**:
```tsx
<div className="group bg-card border-2 border-navy/15 rounded-2xl p-6
                shadow-[6px_6px_0_0_#0B2130]
                hover:-translate-y-1 hover:border-navy/40 transition">
  <Icon /> <h3>...</h3> <p>...</p>
</div>
```

**Story card** (sombra más fuerte):
```tsx
<div className="bg-coral text-navy border-2 border-navy rounded-2xl p-7
                shadow-[8px_8px_0_0_#0B2130] rotate-1">
  ...
</div>
```

**Polaroid** (usar componente `<Polaroid>` del UI kit):
```tsx
<Polaroid rotate={-3} src="..." caption="Lisboa '24" tape />
```

### Inputs

```tsx
<input className="px-5 py-4 rounded-full bg-cream text-navy
                  placeholder:text-navy/50
                  focus:outline-none focus:ring-4 focus:ring-orange/50" />
```

Bordes solo cuando vayan dentro de form vertical: `border-2 border-navy/12` + focus orange.

### Modals

```tsx
<div className="modal-overlay fixed inset-0 bg-navy/40 backdrop-blur-sm" />
<div className="bg-cream rounded-3xl border-2 border-navy/15 shadow-[8px_8px_0_0_#0B2130]
                p-8 max-w-md mx-auto">
  ...
</div>
```

---

## 6. Animations & Motion

### Reglas base
- **Transición**: 200-300ms ease para cualquier hover/state change.
- **No `scale`** que pueda shift layout (usar `translate-y` o `rotate`).
- **`prefers-reduced-motion`**: TODA animación scroll/parallax debe deshabilitarse cuando esté activo.

### Patrones reutilizables

**Float infinito** (`.float-slow`):
```html
<div className="float-slow" style="--r: 12deg; animation-delay: 0.6s">...</div>
```

**Hover card**:
```tsx
className="transition hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0B2130]"
```

**Hover polaroid (reset rotation)**:
```tsx
className="rotate-3 transition hover:rotate-0 hover:-translate-y-2"
```

**Marquee horizontal** (`.marquee`):
```html
<div className="marquee">{row}{row}</div>
```

### Scroll-trigger entrances
Usar `<MotionSection>` (component UI). Patrón:
- Sección root → fade-in + slide-up 24px → 0px, 600ms ease-out, once: true.
- Children con stagger 100ms si la sección tiene grid.

### Parallax decoraciones
Usar `<ParallaxDeco>` (component UI). Patrón:
- Decoraciones absolute → translateY linked to scroll progress, factor 0.3-0.5.
- Nunca aplicar a contenido funcional (forms, navegación).

---

## 7. Spacing

8px baseline:

| Token | Valor | Uso |
|---|---|---|
| xs | 4px | Tight gaps |
| sm | 8px | Icon gaps |
| md | 16px | Standard padding |
| lg | 24px | Section padding |
| xl | 32px | Large gaps |
| 2xl | 48px | Section margins |
| 3xl | 64px | Hero padding |

Section rhythm:
- Heroes: `pt-16 md:pt-24 pb-20`.
- Secciones intermedias: `py-24`.
- CTA finales: `py-28`.
- Max-width estándar: `max-w-7xl mx-auto px-6`.

---

## 8. Photo & Image Patterns

### Assets canónicos (en `/public`)
- `/character-female.png` — ilustración personaje femenino (uso: login left panel, /home empty, /ayuda contact).
- `/character-male.png` — ilustración personaje masculino (uso: signup left panel, /rrss empty, /viaje opcional).
- `/memento-sticker.png` — pegatina branded grande (uso: CTAs grandes, /tienda CTA).
- `/MEMENTO_FRASE.svg` — wordmark (uso: headers, drawer, mobile logos).
- `/MEMENTO_LOGO.svg` — logo grande (uso: hero ocasional).
- `/frames/frame_*.webp` — 90 frames de la animación scroll (uso: covers genéricos /viaje, mosaicos /rrss opcional).

### Reglas
- **NUNCA emojis como icon**. Siempre Lucide SVG.
- **Heroes y covers grandes**: usar fotos del set canónico. Si no encaja temáticamente, gradiente + Lucide icon overlay grande.
- **Chips, badges, menu items**: iconos Lucide (~14-20px) dentro de chip cuadrado o redondo.
- **Polaroid fallback** cuando no hay foto: gradiente `from-{color-a} to-{color-b}` (combinaciones aprobadas: teal-light→teal-dark, orange→coral, coral→orange, teal-dark→navy, orange→teal-light).
- **Drop shadows en fotos**: `drop-shadow-[0_20px_25px_rgba(11,33,48,0.25)]` o `drop-shadow-2xl` para character images.

---

## 9. Iconography (Lucide)

Set único: `lucide-react`. Iconos canónicos por dominio:

| Dominio | Iconos |
|---|---|
| Viaje / mapa | `Map`, `MapPin`, `Globe`, `Compass`, `Plane`, `Mountain`, `Landmark`, `Building2`, `Tent` |
| Memorias | `Camera`, `Image`, `BookOpen`, `Heart`, `Stamp`, `Sticker`, `Star`, `Sparkles` |
| Comercio | `Package`, `ShoppingBag`, `CreditCard`, `Truck` |
| Sistema | `Settings`, `Bell`, `Lock`, `Download`, `Edit3`, `LogOut`, `Search`, `ArrowRight`, `ChevronDown`, `Plus`, `X` |
| Comunicación | `Mail`, `MessageCircle`, `Send` |
| Comida/cultura | `UtensilsCrossed`, `Coffee`, `Wine`, `Pizza` |
| Actividad | `Bike`, `Waves`, `Music`, `Palette` |

**Tamaños estándar**: 14px (chip mini), 16px (chip estándar), 18px (menu item), 20px (button inline), 24px (card icon), 32-40px (hero feature icon).

---

## 10. Anti-Patterns (PROHIBIDOS)

- ❌ **Emojis como iconos** — Siempre Lucide SVG.
- ❌ **Sombras suaves** (`shadow-md`, `shadow-lg`) — Siempre sombras duras navy.
- ❌ **`cursor-pointer` ausente** en clickables.
- ❌ **Transiciones instantáneas** — Mínimo 200ms.
- ❌ **Layout shift via scale** — Usar translate-y o rotate.
- ❌ **Texto sobre imágenes sin overlay** — Add gradient/grain o solid color block.
- ❌ **Contraste <4.5:1** — WCAG AA mínimo.
- ❌ **Focus invisible** — Anillos visibles para teclado.
- ❌ **Chips con >3 palabras** o no UPPERCASE.
- ❌ **Animaciones ignorando `prefers-reduced-motion`**.
- ❌ **Diseño fijo a 1440px** — Mobile-first siempre, target 375px–1440px.
- ❌ **Múltiples icon sets mezclados** — Sólo Lucide.

---

## 11. Pre-Delivery Checklist

Para cada página o componente entregable:

- [ ] **Sin emojis** en ningún UI (verificar con grep).
- [ ] **Iconos de Lucide únicamente**.
- [ ] **`cursor-pointer`** en todos los clickables.
- [ ] **Hover/focus** con transición 200-300ms.
- [ ] **Sombras duras navy** (no soft shadows).
- [ ] **Tipografía**: Playfair en headings, Nunito en body.
- [ ] **Contraste 4.5:1** mínimo.
- [ ] **Focus states** visibles.
- [ ] **`prefers-reduced-motion`** respetado en motion components.
- [ ] **Responsive** 375 / 768 / 1024 / 1440.
- [ ] **Decoraciones absolute** ocultas en móvil si tapan contenido (`hidden md:block`).
- [ ] **Lógica funcional intacta** (forms, fetch, state, navegación).
- [ ] **Sin contenido tapado** por navbar fijo (z-index aware).
- [ ] **Sin horizontal scroll** en mobile.

---

## 12. Components UI Kit (reusables)

Disponibles en `components/ui/`:

| Componente | Propósito | Props clave |
|---|---|---|
| `MotionSection` | Wrapper section con entrance scroll-trigger | `as`, `className`, `delay`, `stagger` |
| `ParallaxDeco` | Wrapper decoración con parallax scroll | `factor` (0-1), `className` |
| `Polaroid` | Card polaroid con marco + caption italic | `src`, `caption`, `rotate`, `tape`, `size` |
| `StickerBadge` | Chip rotado con drop-shadow sticker | `color`, `rotate`, `icon`, `children` |

Usar siempre estos componentes en vez de duplicar el patrón inline.

---

## 13. Style Guidelines

**Pattern principal:** Storytelling-Driven + Scrapbook + Hero-centric.

**Key effects:**
- Scroll-driven animations (Intersection Observer + framer-motion).
- Float-slow infinite en decoraciones flotantes.
- Marquee horizontal en bandas culturales.
- Hover lifts (translate-y) en cards y polaroids.
- Hard navy drop-shadows en chips y botones.

**Best for:** Travel memory platform, storytelling, conversion-oriented landing, profile flows con emoción narrativa.

---

## 14. Page Pattern por página

| Página | CTA placement | Section order |
|---|---|---|
| `/tienda` | Above fold + repeated | Hero → Marquee → Features → Stories → Gallery → CTA |
| `/login` | Form submit | Hero panel + Form panel (split) |
| `/signup` | Form submit | Hero panel + Form panel (split) |
| `/home` | Above fold ("Nuevo viaje") | Header → Trips grid → Empty state CTA |
| `/perfil` | Inline menu items | Header (avatar) → Stats → Menu list |
| `/viaje/[id]` | Inline progress + photo CTA | Cover hero → Progress → Participants → Photos |
| `/nuevo-viaje` | Step CTA | StepIndicator → Step content → Modal |
| `/rrss` | Story creator inline | Stories → Feed |
| `/ayuda` | Categories above + Contact below | Categories → FAQ → Videos → Contact |
| `/sobre-nosotros` | Final CTA | Hero → Manifesto → Timeline → Team → Philosophy → Values → CTA |

---

## 15. Override hierarchy

1. `design-system/pages/[page].md` (if exists) → ON TOP.
2. This `MASTER.md` → BASELINE.
3. `app/globals.css` + `tailwind.config.ts` → IMPLEMENTATION.

Cualquier conflicto se resuelve en favor de la jerarquía superior.
