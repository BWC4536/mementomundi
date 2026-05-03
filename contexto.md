# MementoMundi - Contexto de Proyecto

**Última actualización**: 3 de Mayo 2026
**Estado**: En planificación

---

## 🎯 Definición del producto

**MementoMundi es una plataforma "phygital" que permite a los jóvenes viajeros transformar las fotos olvidadas de sus móviles en recuerdos tangibles y experiencias interactivas.** Combinamos la venta de pegatinas físicas personalizadas con QR con la creación automática de un diario digital (Scrapbook) estético y geolocalizado que se desbloquea durante el viaje.

**Lo único del producto**: No solo vendes pegatinas — vendes la **posibilidad de vivir el viaje múltiples veces**. Cada usuario dejas tu huella en el mundo (red social de viajes públicos) y ves las huellas y paisajes de otros. Luego, en el Scrapbook especial de tu app, NO ves TODAS las fotos (porque la mayoría son malas), sino solo aquellas que **marcaron la diferencia y merecían poner la huella** en ese sitio.

---

## 📍 Posicionamiento

**Para adolescentes y jóvenes adultos (16-35 años) que viajen en grupos, parejas o mochilas, frustrados por acumular miles de fotos olvidadas en el cementerio digital de sus móviles, Memento Mundi ofrece una experiencia física de pegatinas personalizadas (15-30€ por 50 uds) vinculadas por QR a una PWA interactiva. Transforma recuerdos desorganizados en un Scrapbook estético curado (solo las fotos que "merecieron la huella"), tangible y listo para compartir. Filosofía: *memento mori* (la vida es corta) + *memento mundi* (el mundo y la amistad no lo son).**

### Target de usuarios
- 👥 **Grupos de amigos**: viajes de fin de curso, vacaciones, road trips
- 💑 **Parejas**: viajes románticos, lunas de miel
- 🌍 **Mochileros** independientes (16-35 años con smartphone)

### Monetización
- Venta de pegatinas: 15-30€ por 50 uds personalizadas
- Futuro: Lienzos, otros productos derivados

### Momento "aha!"
El usuario entiende que la vida es corta (memento mori) pero el mundo no lo es (memento mundi). Las amistades perduran. Cada foto no merece ser recordada, pero las que SÍ merecen INMORTALIZARSE en pegatina física + digital. Ver huellas de otros crea FOMO + comunidad.

---

## ✅ MVP Scope (MUST - Lo que sí va en v1)

**MUST** (v1 - Estas SÍ se hacen):
- [ ] **Landing Page & Checkout**: Hero section con animación de pegatina despegándose y flujo de compra de pegatinas personalizadas integrado con Stripe.
- [ ] **El Puente Phygital (QR Scanner)**: Escáner in-app que lee el llavero físico y abre directamente la cámara/galería para vincular la foto al viaje.
- [ ] **Scrapbook View (Diario)**: Interfaz principal del usuario donde las fotos subidas se muestran geolocalizadas, rotadas y con diseño de "álbum de recortes".

**SHOULD** (v1.1):
- [ ] Viajes Compartidos: Opción de añadir amigos a un viaje para que colaboren subiendo fotos, y poder generar un enlace público del Scrapbook.

**COULD** (Post-validación):
- [ ] Mundo (Explore 3D): Un globo terráqueo interactivo (Three.js) mostrando puntos de luz de los viajes públicos de otros usuarios.
- [ ] Exportación Social: Generación automática de un clip de vídeo animado del Scrapbook para compartir en TikTok/Instagram Reels.

**WON'T** (Explícitamente NO en MVP):
- [ ] Apps Nativas en App Store/Google Play: Evitaremos los costes y la fricción de descarga creando exclusivamente una PWA (Progressive Web App).
- [ ] Red Social Compleja: No incluiremos feeds infinitos, likes ni sistema de comentarios en esta fase; el enfoque es 100% el recuerdo personal y estético.

---

## 📅 7-Day Roadmap

Entregable diario concreto:

- **Día 1**: Landing + lista de espera + medir tráfico
- **Día 2**: Scaffolding (auth, DB, deploy pipeline)
- **Día 3**: Core feature #1 + onboarding básico
- **Día 4**: Core feature #2 + refinamiento
- **Día 5**: Pagos (Stripe) + emails transaccionales
- **Día 6**: Testing end-to-end + fixes críticos
- **Día 7**: Lanzamiento a 10-20 beta users

---

## 🛠️ Stack Técnico

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Phosphor React
- **Motion**: Framer Motion (micro-interacciones)
- **State**: React hooks + Server Components

### Backend
- **Auth + DB**: Supabase (PostgreSQL + RLS)
- **Pagos**: Stripe (suscripciones)
- **Emails**: Resend + React Email
- **Storage**: Vercel Blob (si uploads)
- **Analytics**: Posthog (opcional)

### Deploy
- **Hosting**: Vercel
- **CI/CD**: GitHub → Vercel automático
- **Monitoring**: Vercel Analytics + Sentry

### Opcional (según features)
- **IA**: Vercel AI SDK + Anthropic Claude
- **Automaciones**: n8n / Make.com

---

## 🎨 Brand Assets

- **Logo**: `/public/MEMENTO_LOGO.svg`
- **Frase**: `/public/MEMENTO_FRASE.svg`
- **Brand guidelines**: `/brand/brandbook.md` (generar con skill)
- **Design tokens**: `/brand/tokens.css` (generar con skill)

---

## 🎨 Design System - UI UX Pro Max v2.0

**⚠️ CRITICAL**: El Design System MASTER ya fue generado (Día 1 completado).

**Ubicación**: `design-system/memento-mundi/MASTER.md`

**Contenido**:
- Paleta: Azul Cielo (#0EA5E9) + Naranja Aventura (#EA580C)
- Tipografía: Space Grotesk (neo-brutalism, Gen-Z friendly)
- Patrón: Storytelling-Driven + Hero (emotional resonance)
- Estilo: Motion-Driven (scroll animations, parallax, smooth transitions)
- Spacing: Sistema 8px (4px—64px)
- Pre-delivery checklist incluido

**Instrucción**: SIEMPRE referenciar `design-system/MASTER.md` al pedir trabajo de diseño. Cada feature tendrá un override en `design-system/pages/[feature].md`.

---

## 🤖 Instrucciones para Claude Code - Equipo de Subagentes

Basándote en 24 skills disponibles, Claude Code elegirá automáticamente un **equipo de subagentes** según el tipo de tarea. Aquí está el mapeo:

### **EQUIPO 1: Cuando trabajemos en DISEÑO VISUAL (Frontend)**

**Miembros del equipo** (en orden de ejecución):
1. **`ui-ux-pro-max`** ← Primero: analiza el producto y recomienda design system
2. **`image-to-code`** ← Genera visualmente la sección (imagen)
3. **`design-taste-frontend`** ← Aplica reglas de UI premium automáticamente
4. **`high-end-visual-design`** ← Si necesita pulido final (glassmorphism, micro-interactions)
5. **`imagegen-frontend-mobile`** ← Valida responsividad (375px)
6. **`imagegen-frontend-web`** ← Mockup rápido para validar (opcional)

**Workflow obligatorio**:
```
ui-ux-pro-max (analiza el producto)
  ↓ Lee design-system/MASTER.md
  ↓
image-to-code (genera imagen de la sección)
  ↓
[Analiza la imagen en profundidad]
  ↓
design-taste-frontend (aplica reglas automáticamente)
  ↓
[Codifica React con tokens de brand]
  ↓
imagegen-frontend-mobile (valida en 375px)
  ↓ [Si OK, termina. Si no, iterate]
```

**Regla de oro**: Imagen primero, código segundo. NUNCA codees directo sin visual reference.

---

### **EQUIPO 2: Cuando trabajemos en COPY (Texto persuasivo)**

**Miembros del equipo**:
1. **`funnel-copy-architect`** ← Headlines, CTAs, objeciones
2. **`landing-page-pro`** ← Estructura + copywriting combinada
3. **`customer-voice`** ← Si tienes feedback, extrae insights
4. **`funnel-copy-architect` (again)** ← Refina basado en insights

**Workflow**:
```
funnel-copy-architect (crea copy)
  ↓ PAS-T headlines, AIDA framework
  ↓
landing-page-pro (estructura HTML + copy)
  ↓
[Si hay feedback real] → customer-voice (analiza)
  ↓
funnel-copy-architect (refina)
```

---

### **EQUIPO 3: Cuando trabajemos en BACKEND (Auth, DB, Pagos)**

**Miembros del equipo**:
1. **`saas-starter-kit`** ← Genera scaffold completo (NUNCA desde cero)
2. **[Tu código]** ← Builds on scaffold
3. **`automation-forge`** ← Workflows automáticos (email, webhooks)
4. **`ai-agent-builder`** ← Si necesitas features IA

**Reglas**:
- ✅ `saas-starter-kit` PRIMERO, no custom code
- ✅ RLS obligatorio en TODAS las tablas
- ✅ Stripe webhook es fuente de verdad
- ✅ `.env.local` en `.gitignore`

---

### **EQUIPO 4: Cuando trabaje en LANZAMIENTO (Ship-it)**

**Miembros del equipo**:
1. **`ship-it`** ← Plan de pre-producción + checklist
2. **`agent-browser-verify`** ← Testing exhaustivo
3. **`customer-voice`** ← Recolectar feedback inicial
4. **Tu código** ← Fixes rápidos basados en feedback

**Checklist que `ship-it` genera**:
- Auth funciona → Payments funciona → Dashboard accesible
- Responsive: 375px, 768px, 1024px, 1440px
- Stripe LIVE mode (no test)
- Emails funcionando
- Sentry tracking
- Performance >90 Lighthouse

---

### **EQUIPO 5: Cuando trabajes en AUDITORÍA DE DISEÑO (v1.1+)**

**Miembros del equipo**:
1. **`redesign-existing-projects`** ← Audita código + propone mejoras
2. **`high-end-visual-design`** ← Polishing final
3. **`imagegen-frontend-web`** ← Mockup de mejoras

---

### **EQUIPO 6: Cuando necesites CRECIMIENTO (Post-launch)**

**Miembros del equipo**:
1. **`customer-voice`** ← Analiza feedback acumulado
2. **`viral-growth-lab`** ← Identifica loops virales
3. **`tiktok-marketing`** ← Guiones y estrategia TikTok/Reels (Gen Z)
4. **`funnel-copy-architect`** ← Refina messaging para crecimiento
5. **`pitch-deck-master`** ← Si buscas inversión

---

### **EQUIPO 7: Cuando necesites CONTENIDO SOCIAL (TikTok/Reels/Video)**

**Miembros del equipo**:
1. **`tiktok-marketing`** ← Guión completo + sonidos + subtítulos + hashtags
2. **`viral-growth-lab`** ← Validar potencial viral
3. **`funnel-copy-architect`** ← Pulir hooks y CTAs del vídeo

**Activar cuando**: se mencione TikTok, Reels, vídeo viral, contenido Gen Z, redes sociales, o al preparar lanzamiento.

**Concepto core de MementoMundi para TikTok**: La transformación visual (foto olvidada → pegatina física + scrapbook digital). El momento "peeling" es el hook. Formato ideal: antes/después, ASMR pegatinas, "¿sabías que tus fotos están muriendo?"

---

## Instrucción Simple para Claude Code

**Cuando le pidas algo, di qué equipo necesitas**:

```
Diseña la sección hero de MementoMundi
→ Claude Code elige automáticamente: ui-ux-pro-max + image-to-code + design-taste-frontend
```

```
Escribe copy persuasivo para la landing
→ Claude Code elige automáticamente: funnel-copy-architect + landing-page-pro
```

```
Setup Stripe y auth
→ Claude Code elige automáticamente: saas-starter-kit + automation-forge
```

---

## ⚠️ Reglas críticas

1. ❌ **NO codees directo** si es visual importante
   - ✅ Imagen → análisis → código

2. ❌ **NO ignores design-system/MASTER.md**
   - ✅ SIEMPRE referenciar para coherencia

3. ❌ **NO inventes solutions** para Stripe
   - ✅ `saas-starter-kit` + webhook como fuente de verdad

4. ❌ **NO sobreenginierices** sin MVP validado
   - ✅ MVP primero, optimizaciones después

5. ❌ **NO desplegues sin testing end-to-end**
   - ✅ Signup → Feature → Payment → Dashboard

---

## 🔴 Reglas de oro (NO hacer)

- ❌ **NO codees directo** si es visual importante
  - ✅ Imagen primero, código segundo

- ❌ **NO sobreenginierices**
  - MVP valida hipótesis, v2 escala
  - Feature flags, caching avanzado, etc → post-validación

- ❌ **NO olvides RLS** en Supabase
  - Seguridad critical
  - Cada usuario ve solo sus datos

- ❌ **NO deployes sin testing**
  - Flujo completo funciona en localhost
  - Responsive OK (mobile + desktop)

- ❌ **NO cambies stack** sin razón fuerte
  - Recomendado arriba está probado
  - Agregar tecnología = aumentar riesgo

---

## 📚 Referencias

| Recurso | Link |
|---------|------|
| Esta guía completa | `./CLAUDE_CODE_GUIDE.md` |
| Cada skill (28 total) | `./skills/[nombre]/SKILL.md` |
| Vercel docs | https://vercel.com/docs |
| Supabase docs | https://supabase.com/docs |
| Stripe docs | https://stripe.com/docs |
| Next.js 16 | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| shadcn/ui | https://ui.shadcn.com |

---

## 📊 Checklist de inicio

- [ ] Contexto.md completado con definición del producto
- [ ] Statement de posicionamiento definido
- [ ] MVP scope aprobado (tabla Moscow)
- [ ] Cuentas creadas: Vercel, Supabase, Stripe, Resend
- [ ] Repositorio Git inicializado
- [ ] Esta guía (`CLAUDE_CODE_GUIDE.md`) leída completamente
- [ ] Primer skill invocado: `brand-identity-lab` o `mvp-blueprint`

---

**Nota**: Este archivo es tu playbook para decirle a Claude Code cómo trabajar contigo. Completa los `[AQUÍ]` y mantén actualizado conforme el proyecto evoluciona.

