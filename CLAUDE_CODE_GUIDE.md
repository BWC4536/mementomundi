# MementoMundi - Claude Code + Skills Guide

**Última actualización**: 3 de Mayo 2026
**Skills instaladas**: 25 (24 + NEW: **ui-ux-pro-max**)
**Stack**: Next.js 16 + shadcn/ui + Vercel + Supabase + **UI UX Pro Max v2.0**

---

## 📋 Tabla de contenidos

1. [Resumen ejecutivo](#resumen-ejecutivo)
2. [🆕 LA SKILL ROMPEDORA: UI UX Pro Max](#-la-skill-rompedora-ui-ux-pro-max)
3. [Las 25 skills disponibles](#las-25-skills-disponibles)
4. [Equipo de Subagentes por Tarea](#equipo-de-subagentes-por-tarea)
5. [Flujo de trabajo por fase](#flujo-de-trabajo-por-fase)
6. [Patrones recomendados](#patrones-recomendados)
7. [Stack recomendado](#stack-recomendado)
8. [Cómo invocar skills](#cómo-invocar-skills)
9. [Checklist de desarrollo](#checklist-de-desarrollo)

---

## 🎯 Resumen ejecutivo

Tienes **25 specialized AI skills** instaladas que pueden acelerar cada fase del desarrollo de tu página web. Este documento te enseña:

- **Qué skill usar** para cada tipo de tarea
- **Cuándo invocarlas** explícitamente vía `/skill-name`
- **Cómo combinarlas en equipos de subagentes** que trabajan juntos
- **Qué esperar** de cada una

**La regla de oro**: Skills se invocan explícitamente o se activan automáticamente cuando detectan contexto relevante. La clave es entender cómo funcionan **juntas** como un equipo.

---

## 🆕 LA SKILL ROMPEDORA: UI UX Pro Max

**⚠️ ESTA SKILL ES DIFERENTE — LÉELA PRIMERO**

**UI UX Pro Max v2.0** es un motor de razonamiento AI que genera automáticamente **sistemas de diseño completos** para tu producto en segundos, sin Figma.

### Qué hace:
1. **Analiza tu producto**: Target, categoría, valor único
2. **Recomienda un design system completo**:
   - Paleta de colores (5 colores psicológicamente alineados)
   - Tipografía (Google Fonts con mood tags)
   - Patrón de layout (Hero-Centric, Conversion-Optimized, etc.)
   - Estilo visual (Soft UI, Motion-Driven, Brutalism, etc.)
   - Efectos y animaciones
   - Anti-patterns a evitar
   - Pre-delivery checklist

### Para Memento Mundi:
```
Entrada: "Phygital travel memory platform for young travelers (18-35)"
Salida:  - Patrón: Storytelling-Driven + Hero
         - Estilo: Motion-Driven (scroll animations, parallax)
         - Colores: Sky Blue (#0EA5E9) + Adventure Orange (#EA580C)
         - Tipografía: Space Grotesk (neo-brutalism, Gen-Z friendly)
         - Archivo: design-system/memento-mundi/MASTER.md (207 líneas)
```

### Ubicación del Design System:
```
design-system/memento-mundi/
├── MASTER.md              ← Fuente de verdad global (COMITEADO)
└── pages/                 ← Generaremos per-feature
    ├── landing.md         (Day 2-5)
    ├── scanner.md         (Day 6-8)
    ├── scrapbook.md       (Day 8-12)
    └── checkout.md        (Day 12-15)
```

### Uso:
- **NUNCA** ignores `design-system/MASTER.md`
- **SIEMPRE** referencía al pedir trabajo de diseño
- **Cada feature** tendrá su override `.md` para deviaciones (raro)

### Tiempo ahorrado:
- ❌ **Sin la skill**: 10-15 horas debatiendo colores, tipografía, patrones
- ✅ **Con la skill**: 30 minutos generando un design system optimizado

**Lectura obligatoria**: `memory/ui_ux_pro_max_skill.md` (en tu memoria persistente)

---

---

## 🛠️ Las 25 skills disponibles

### **Tier 0: CRÍTICA (PRIMERO - Día 1)**

#### **0. ui-ux-pro-max** ⭐ ROMPEDORA
- **Cuándo**: Primer día, antes de cualquier diseño
- **Qué hace**: Genera sistema de diseño completo (colores, tipografía, patrones, efectos)
- **Input**: Descripción del producto + target audience
- **Output**: `design-system/MASTER.md` (centralizado, inmutable)
- **Impacto**: -10 horas de debate de diseño
- **Invoca con**: Incluida en contexto.md, se ejecuta automáticamente Day 1
- **Nota**: CRÍTICA para coherencia visual en todas las features

**Files generados para referencia**:
- `design-system/memento-mundi/MASTER.md` ← COMITEADO
- Ver también: `memory/ui_ux_pro_max_skill.md` (documentación completa)

---

### **Tier 1: Fundacionales (Después de Tier 0)**

#### 1. **brandkit** → Genera sistema de identidad visual
- **Cuándo**: Al inicio, para crear tablero visual de marca
- **Qué hace**: Genera moodboard con logo, colores, tipografía
- **Input**: Nombre marca, descripción, dirección visual
- **Output**: Imagen de brand-kit professional
- **Nota**: Tienes logo + frase en `/public/`. Puedo mejorar esto.
- **Invoca con**: "Genera un brand-kit para MementoMundi basado en..."

---

#### 2. **brand-identity-lab** → Diseña estrategia de marca completa
- **Cuándo**: Después de brandkit, para documentar identidad
- **Qué hace**: Crea posicionamiento, tono, tipografía, palette
- **Output**: `brandbook.md` + `tokens.css` listos para implementar
- **Nota**: Muy útil si necesitas guidelines documentadas
- **Invoca con**: "Diseña la identidad de marca para MementoMundi"

---

#### 3. **mvp-blueprint** → Planifica MVP en 7 días
- **Cuándo**: ANTES de escribir código, para scope
- **Qué hace**: Define MUST/SHOULD/COULD/WON'T, roadmap día a día
- **Output**: Tabla Moscow + roadmap + schema de DB mínimo
- **Nota**: Clave para no sobreingenierizar
- **Invoca con**: "Crea un MVP blueprint para MementoMundi"

---

### **Tier 2: Diseño Web (Frontend)**

#### 4. **design-taste-frontend** (default, siempre activo)
- **Cuándo**: Cada vez que escribes componentes React
- **Qué hace**: Evita patrones genéricos, aplica reglas de UI premium
- **Configura**: DESIGN_VARIANCE=8, MOTION_INTENSITY=6, VISUAL_DENSITY=4
- **Nota**: Se activa automáticamente. Define 3 diales ajustables.
- **Invoca para**: Components, layouts, páginas

---

#### 5. **image-to-code** → Image-first website workflow
- **Cuándo**: Para cada sección visual importante
- **Qué hace**: Genera imagen de diseño → analiza → implementa código
- **Workflow obligatorio**:
  1. Genera sección visual
  2. Analiza profundamente
  3. Codifica basado en análisis
- **Nota**: **NO codees directo**; siempre imagen primero para visual tasks
- **Invoca con**: "Diseña la sección hero de MementoMundi y codifícala"

---

#### 6. **high-end-visual-design** → $150k agency level
- **Cuándo**: Para pulido final, micro-interacciones, motion
- **Qué hace**: Nestead bezel, liquid glass, magnetic buttons, spring physics
- **Defines**: Vibe (Ethereal Glass, Editorial Luxury, Soft Structuralism)
- **Nota**: Se aplica a componentes premium; no todo necesita esto
- **Invoca con**: "Aplica high-end design a los botones principales"

---

#### 7. **landing-page-pro** → Landing que convierte
- **Cuándo**: Para home/pricing/marketing pages
- **Qué hace**: Estructura + copywriting + CRO optimizado
- **Estructura**: Hero → Dolor → Propuesta → Cómo → Prueba → Features → FAQ → CTA
- **Output**: HTML + Tailwind listo, sin build step necesario
- **Nota**: Excelente para validación rápida
- **Invoca con**: "Crea una landing page de alta conversión"

---

#### 8. **imagegen-frontend-web** → Genera imágenes de secciones web
- **Cuándo**: Para mockups de features/benefits/showcase
- **Qué hace**: Genera imagen de sección web con design intent
- **Diferencia de image-to-code**: Más rápida, menos profunda. Para referencias visuales.
- **Invoca con**: "Genera mockup visual de la sección de features"

---

#### 9. **imagegen-frontend-mobile** → Versiones móviles
- **Cuándo**: Para verificar responsive design visualmente
- **Qué hace**: Genera mockups de la misma sección en móvil
- **Nota**: Úsalo después de generar web para asegurar coherencia
- **Invoca con**: "Genera versión móvil de la sección hero"

---

#### 10. **redesign-existing-projects** → Audita y mejora UI
- **Cuándo**: Cuando tienes código y quieres mejorar diseño
- **Qué hace**: Audita, identifica problemas, propone cambios
- **Estructura**: Audit → Problems → Fixes → New code
- **Nota**: Excelente para iteración después de v1
- **Invoca con**: "Audita mi landing page y sugiere mejoras de diseño"

---

#### 11. **minimalist-ui** → Diseño minimalista
- **Cuándo**: Si quieres dirección visual limpia y editorial
- **Qué hace**: Aplica estética minimalista (Notion/Linear vibes)
- **Define**: Paleta restringida, tipografía serif+sans, mucho whitespace
- **Nota**: Conflicto potencial con high-end-visual-design; elige uno
- **Invoca con**: "Aplica diseño minimalista a todas las secciones"

---

#### 12. **industrial-brutalist-ui** → Diseño brutalista/experimental
- **Cuándo**: Si quieres dirección visual atrevida y distintiva
- **Qué hace**: Swiss typography, contraste fuerte, layout experimental
- **Nota**: Para marcas creativas/técnicas. Raro en SaaS.
- **Invoca con**: "Aplica brutalism al diseño"

---

#### 13. **stitch-design-taste** + **DESIGN.md** → Stitch framework
- **Cuándo**: Si usas Stitch para UI components
- **Qué hace**: Rules específicas para Stitch + export DESIGN.md
- **Nota**: Avanzado; ignora si no usas Stitch
- **Invoca con**: "Genera componentes Stitch-compatible"

---

### **Tier 3: Copywriting & Marketing**

#### 14. **landing-page-pro** (incluido arriba)
- **Bonus**: Framework PAS-T, AIDA, objeciones reales

---

#### 15. **funnel-copy-architect** → Copy persuasivo por fase
- **Cuándo**: Para escribir headlines, CTAs, emails, secuencias
- **Qué hace**: Aplica frameworks AIDA, Hook-Story-Offer por página
- **Output**: Copy listo para pegar en cada sección
- **Nota**: Va en paralelo con design-taste-frontend
- **Invoca con**: "Escribe copy persuasivo para la landing de MementoMundi"

---

#### 16. **seo-content-machine** → Contenido SEO optimizado
- **Cuándo**: Para blog, documentación, pages indexables
- **Qué hace**: Targeting keywords, clustering, headers, schema markup
- **Output**: Artículos optimizados para Google
- **Nota**: No necesario si tu foco es SaaS sin blog
- **Invoca con**: "Crea contenido SEO para [keyword]"

---

#### 17. **customer-voice** → Entender qué dicen los clientes
- **Cuándo**: Cuando tienes reviews/feedback y quieres insights
- **Qué hace**: Extrae temas, sentimientos, objeciones, wins
- **Output**: Matriz de insights + copy angles basados en voz real
- **Nota**: Excelente para iterar después de primeros usuarios
- **Invoca con**: "Analiza este feedback de usuarios y extrae temas"

---

#### 18. **viral-growth-lab** → Estrategia viral/network
- **Cuándo**: Cuando quieres mechanics de crecimiento explosivo
- **Qué hace**: Identifica loops virales, referral mechanics, content angles
- **Nota**: Para productos consumer; menos relevante en B2B
- **Invoca con**: "Diseña un loop viral para MementoMundi"

---

### **Tier 4: Producto & Lanzamiento**

#### 19. **saas-starter-kit** → SaaS funcional con Stripe
- **Cuándo**: Si vas a cobrar (subscripción, pago por uso)
- **Qué hace**: Genera scaffold Next.js + Supabase + Stripe
- **Stack**: Exacto a lo que recomiendo
- **Output**: Código listo para deploy
- **Nota**: **MUY RECOMENDADO** si necesitas pagos
- **Invoca con**: "Genera un SaaS starter con planes de pago"

---

#### 20. **pitch-deck-master** → Presentación de pitch
- **Cuándo**: Cuando necesitas presentación para investors/partners
- **Qué hace**: Estructura slide, copy, visual direction
- **Output**: Presentación tipo Vercel/Stripe
- **Nota**: No para página web directa, pero útil para contexto
- **Invoca con**: "Crea un pitch deck para MementoMundi"

---

#### 21. **ship-it** → Deploy e iteración rápida
- **Cuándo**: Cuando tienes MVP listo y quieres ir a producción
- **Qué hace**: Checklist de pre-launch, rollout strategy, rollback plan
- **Output**: Plan step-by-step para llevar a producción
- **Nota**: Crucial para evitar surpresas
- **Invoca con**: "Planifica el lanzamiento de MementoMundi"

---

### **Tier 5: IA & Automatización**

#### 22. **ai-agent-builder** → Construye agentes IA reales
- **Cuándo**: Si quieres chatbot inteligente, RAG, tool use
- **Qué hace**: Arquitectura de agente, system prompt, tool definitions
- **Stack**: Anthropic SDK o Vercel AI SDK
- **Nota**: Avanzado; para features core impulsadas por IA
- **Invoca con**: "Diseña un agente IA que ayude a [tarea]"

---

#### 23. **automation-forge** → Automatizaciones sin código
- **Cuándo**: Para flujos repetitivos (leads → CRM, email, webhooks)
- **Qué hace**: Diseña flujos en n8n/Make/Zapier
- **Output**: Diagrama + JSON de import
- **Nota**: Excelente para backend ops sin coding
- **Invoca con**: "Diseña un flujo de automatización para [proceso]"

---

#### 24. **gpt-taste** → Variante estricta para outputs GPT
- **Cuándo**: Si usas GPT/Codex en lugar de Claude
- **Qué hace**: Reglas más estrictas para outputs GPT
- **Nota**: Ignora si usas solo Claude
- **Invoca con**: No se invoca; se aplica automáticamente si ves GPT

---

---

## 🔄 Flujo de trabajo por fase

### **FASE 0: Design System Generation (Día 1 — PRIMERO)**

**Tarea**: Generar sistema de diseño completo que será la fuente de verdad

**Skills a usar (en orden)**:
1. **`ui-ux-pro-max`** → Genera design system completo (⭐ CRÍTICA)
2. `brand-identity-lab` → Complementa con identidad de marca
3. `brandkit` → Visualiza la identidad

**Entregables**:
- **`design-system/memento-mundi/MASTER.md`** ← CENTRALIZADO
- `brand/brandbook.md` (posicionamiento, tono, valores)
- `brand/tokens.css` (valores específicos del brand)
- Brand-kit visual mejorado

**Secuencia**:
```bash
# Paso 1: Generar design system (Ejecutado ya)
python3 ~/.claude/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py \
  "Memento Mundi phygital travel memory..." --design-system --persist

# Paso 2: Commitear
git add design-system/
git commit -m "design: add design system master"

# Paso 3: Brand identity
Invoca: /brand-identity-lab
```

**Referencia obligatoria después de esto**:
- Lee `design-system/memento-mundi/MASTER.md` completamente
- Entiende la paleta, tipografía, patrones
- **NUNCA ignores esta guía en fases posteriores**

---

### **FASE 1: Descubrimiento & Branding (Día 1 — Después de Design System)**

**Tarea**: Definir identidad de marca (complementa al design system)

**Skills a usar**:
1. `brand-identity-lab` → Crea statement de posicionamiento
2. `brandkit` → Genera tablero visual (mejorar logos existentes)
3. `customer-voice` → Si tienes feedback temprano, extrae insights

**Entregables**:
- `brand/brandbook.md` (posicionamiento, tono, valores)
- `brand/tokens.css` (paleta, tipografía, spacing)
- Brand-kit visual mejorado

**Comando ejemplo**:
```
Crea la identidad completa de MementoMundi:
- Posicionamiento: [tu pitch]
- Tono: [minimalista/bold/etc]
- Audiencia: [quién es el cliente]
```

---

### **FASE 2: Scope & Plan (Día 1-2)**

**Tarea**: Decidir qué features van en v1, roadmap de 7 días

**Skills a usar**:
1. `mvp-blueprint` → Define MUST/SHOULD/COULD/WON'T
2. `landing-page-pro` → Si primary goal es validación, planifica landing primero

**Entregables**:
- Tabla Moscow (qué va / no va)
- Roadmap día a día
- Schema mínimo de BD
- Lista de rutas / páginas

**Comando ejemplo**:
```
Crea MVP blueprint:
- Hipótesis: usuarios pueden [X] rápidamente
- Métrica de éxito: 20 usuarios activos en 7 días
- Features core: [lista de 3-5]
- Stack preferido: Next.js + Supabase + Stripe (opcional)
```

---

### **FASE 3: Diseño Web (Días 3-4)**

**Tarea**: Crear secciones visuales y código

**Skills a usar (en orden)**:
1. **image-to-code** para cada sección importante:
   - Hero
   - Features / Propuesta
   - Pricing
   - CTA final
2. **imagegen-frontend-web** si necesitas mockups rápidos
3. **imagegen-frontend-mobile** para validar responsive
4. **high-end-visual-design** para pulir componentes específicos
5. **redesign-existing-projects** si necesitas iterar sobre v1

**Workflow obligatorio** (crucial):
```
1. Genera imagen de sección
   → "Diseña visualmente la sección de pricing"

2. Analiza profundamente la imagen
   → Lee colores, tipografía, espaciado, botones

3. Codifica basado en análisis
   → NO inventes, sigue lo que viste
```

**Entregables**:
- `/app/page.tsx` (home con hero + features)
- `/app/pricing/page.tsx` (pricing page)
- `/components/` subdirectories (buttons, cards, sections)
- Imágenes de referencia en `/public/designs/`

---

### **FASE 4: Copy & Conversión (Días 4-5)**

**Tarea**: Escribir headlines, CTAs, emails, FAQ

**Skills a usar**:
1. `funnel-copy-architect` → Copia por sección (headline, CTA, subheadline)
2. `seo-content-machine` si hay blog/docs

**Entregables**:
- Texto para cada sección listo para pegar
- Headlines probados (PAS-T framework)
- CTA copy (verbo + resultado)
- FAQ resolviendo objeciones reales

**Comando ejemplo**:
```
Escribe copy persuasivo para MementoMundi:
- Headline hero: debe comunicar [valor principal]
- CTA primario: acción deseada = "Empezar gratis"
- Sección objeciones: resuelve dudas sobre [precio/facilidad/resultados]
```

---

### **FASE 5: Pagos & Backend (Día 5-6)**

**Tarea**: Setup de Stripe, DB, emails, auth

**Skills a usar**:
1. `saas-starter-kit` → Genera scaffold completo con Stripe
2. `automation-forge` si tienes workflows (welcome email, etc.)
3. `ai-agent-builder` si quieres chatbot o features IA

**Entregables**:
- `lib/stripe/` (cliente, planes, lógica)
- `lib/supabase/` (server client, middleware, RLS)
- `/api/stripe/webhook` (maneja eventos Stripe)
- `/lib/email/` templates (bienvenida, receipt, etc.)

**Comando ejemplo**:
```
Genera SaaS starter para MementoMundi:
- Planes: Gratis (X límite), Pro ($29/mes, Y), Enterprise
- DB: tabla para [entidad principal], subscriptions, profiles
- Auth: email + password vía Supabase
- Pagos: Stripe con trial 14 días
```

---

### **FASE 6: Lanzamiento (Día 6-7)**

**Tarea**: Checklist de producción, rollout, rollback

**Skills a usar**:
1. `ship-it` → Plan de lanzamiento completo
2. `pitch-deck-master` si necesitas pitch para announcement

**Entregables**:
- Pre-launch checklist
- Rollout strategy (canary, full)
- Rollback plan
- Monitoring setup
- Announcement copy

---

---

## 🤝 Equipo de Subagentes por Tarea

Este es el mapeo de qué skills trabajan **juntas** para cada tipo de trabajo:

### **EQUIPO 1: DISEÑO VISUAL (Frontend Components)**

**Miembros** (en orden de ejecución):
```
ui-ux-pro-max         ← Recomendación de design system
      ↓
image-to-code         ← Genera visualmente la sección (imagen)
      ↓
design-taste-frontend ← Aplica reglas automáticamente
      ↓
high-end-visual-design ← Polishing final (micro-interactions)
      ↓
imagegen-frontend-mobile ← Valida responsive (375px)
```

**Cuándo usar**: "Diseña la sección hero", "Crea el dashboard layout", "Mejora esta página"

**Duración típica**: 2-4 horas por sección

---

### **EQUIPO 2: COPY PERSUASIVO (Textos que venden)**

**Miembros**:
```
funnel-copy-architect ← Headlines, CTAs, objeciones
      ↓
landing-page-pro ← Estructura HTML + copy combinada
      ↓
customer-voice ← [Si hay feedback] extrae insights
      ↓
funnel-copy-architect ← Refina basado en insights
```

**Cuándo usar**: "Escribe copy para la landing", "Mejora el headline", "Resuelve estas objeciones"

**Duración típica**: 1-2 horas

---

### **EQUIPO 3: BACKEND + PAGOS (Auth, DB, Stripe)**

**Miembros**:
```
saas-starter-kit ← PRIMERO (scaffold completo, no custom)
      ↓
[Tu código] ← Builds on scaffold
      ↓
automation-forge ← Workflows automáticos (email, webhooks)
      ↓
ai-agent-builder ← [Si necesitas features IA]
```

**Cuándo usar**: "Setup Stripe", "Configura auth", "Crea la BD para suscriptiones"

**Duración típica**: 3-5 horas

**Regla crítica**: NUNCA hagas custom auth. Usa `saas-starter-kit` como scaffold base.

---

### **EQUIPO 4: LANZAMIENTO (Ship-it Production)**

**Miembros**:
```
ship-it ← Plan pre-producción + checklist
      ↓
agent-browser-verify ← Testing exhaustivo
      ↓
customer-voice ← Recolecta feedback inicial
      ↓
[Tu código] ← Fixes rápidos
```

**Cuándo usar**: "Planifica el lanzamiento", "Haz testing completo", "Prepárate para producción"

**Duración típica**: 1.5-2 horas planning + 4-6 horas testing

---

### **EQUIPO 5: AUDITORÍA + MEJORA (v1.1 refactoring)**

**Miembros**:
```
redesign-existing-projects ← Audita + propone mejoras
      ↓
high-end-visual-design ← Polishing visual
      ↓
imagegen-frontend-web ← Mockup de cambios
```

**Cuándo usar**: "Audita mi landing y mejórala", "Refactoriza la página de pricing"

---

### **EQUIPO 6: CRECIMIENTO + EXPANSION (Post-launch)**

**Miembros**:
```
customer-voice ← Analiza feedback acumulado
      ↓
viral-growth-lab ← Identifica loops virales
      ↓
funnel-copy-architect ← Refina messaging para crecimiento
      ↓
pitch-deck-master ← [Si buscas inversión]
```

**Cuándo usar**: "Analiza el feedback de usuarios", "Diseña una campaña viral", "Crea un pitch deck"

---

## 🎨 Patrones recomendados

### **Patrón A: Visual-first (Recomendado - EQUIPO 1)**

Para tareas de **frontend** o **landing**:

```
Paso 1: Lee design-system/MASTER.md (ui-ux-pro-max ya lo hizo)
         ↓
Paso 2: image-to-code → genera imagen de la sección
         ↓
Paso 3: Analiza la imagen (colores, tipografía, espaciado)
         ↓
Paso 4: design-taste-frontend aplica reglas automáticamente
         ↓
Paso 5: Codifica React basado en análisis (NO inventes)
         ↓
Paso 6: imagegen-frontend-mobile valida en 375px
```

**Regla**: Si dudas, genera imagen primero. Es más rápido iterar sobre imágenes que sobre código.

---

### **Patrón B: Copy-to-code**

Para secciones que **venden**:

```
funnel-copy-architect (copia persuasiva)
  ↓
landing-page-pro (estructura HTML + Tailwind)
  ↓
imagegen-frontend-web (visualiza resultado)
  ↓
image-to-code (refina código basado en imagen)
```

---

### **Patrón C: Backend-first**

Para features que **necesitan pagos / auth / DB**:

```
saas-starter-kit (scaffold completo)
  ↓
[Tu código] (builds on scaffold)
  ↓
automation-forge (workflows posteriores)
  ↓
ship-it (plan de lanzamiento)
```

---

---

## 💾 Stack recomendado

Basándome en tus 24 skills, recomiendo este stack para MementoMundi:

### **Frontend**
- **Framework**: Next.js 16 (App Router)
- **UI**: Tailwind CSS + shadcn/ui (configurado con tokens de brand)
- **Icons**: Phosphor React
- **Motion**: Framer Motion (para micro-interacciones)
- **State**: React hooks + Server Components (RSC default)

### **Backend**
- **Auth + DB**: Supabase (PostgreSQL + RLS + realtime)
- **Pagos**: Stripe (subscriptions + Customer Portal)
- **Emails**: Resend + React Email
- **Storage**: Vercel Blob (si necesitas uploads)
- **Analytics**: Posthog (opcional pero recomendado)

### **Deploy**
- **Hosting**: Vercel (optimizado para Next.js)
- **CI/CD**: GitHub → Vercel (automático)
- **Domain**: Propio + SSL
- **Monitoring**: Vercel Analytics + Sentry (errors)

### **Opcional (según features)**
- **IA**: Vercel AI SDK + Claude/GPT (vía API Gateway recomendado)
- **Automaciones**: n8n self-hosted o Make.com
- **CDN**: Vercel Edge Network (incluido)

---

---

## 🎯 Cómo invocar skills

### **Opción 1: Invocación Explícita (Recomendado para empezar)**

```
/image-to-code
Diseña la sección hero de MementoMundi:
- Headline: explica la transformación
- Subheadline: mecanismo (por qué)
- CTA: "Empezar gratis 14 días"
- Visual: minimalista, dark mode
- Luego codifica el resultado en React
```

**Qué esperar**:
1. Genera imagen de hero
2. Analiza la imagen en profundidad
3. Codifica React component basado en análisis
4. Te muestra el código + explicación

---

### **Opción 2: Detección Automática (Skills reconocen contexto)**

Cuando escribes en el prompt:
- Palabras clave como "diseña", "landing", "copia" → skills se activan
- Mencionas "Stripe", "suscripción" → `saas-starter-kit` activada
- Pides "auditar UI" → `redesign-existing-projects` activada

**Ejemplo**:
```
Mejora mi landing page de pricing
```
→ Automáticamente:
- `redesign-existing-projects` audita
- `funnel-copy-architect` mejora copy
- `imagegen-frontend-web` visualiza

---

### **Opción 3: Combo avanzada**

Para tareas complejas, encadena skills:

```
1. Define scope: mvp-blueprint
   → Salida: tabla Moscow + roadmap

2. Diseña marca: brand-identity-lab + brandkit
   → Salida: brandbook.md + tokens.css

3. Crea landing: landing-page-pro
   → Salida: HTML listo

4. Mejora visualmente: imagegen-frontend-web
   → Salida: mockup

5. Optimiza código: image-to-code
   → Salida: React components
```

---

---

## ✅ Checklist de desarrollo

### **Pre-Desarrollo**
- [ ] Brand identity documentada (`brandbook.md` + `tokens.css`)
- [ ] MVP scope aprobado (tabla Moscow)
- [ ] 7-day roadmap definido
- [ ] Stack decidido (recomendado arriba)
- [ ] Cuentas creadas: Vercel, Supabase, Stripe, Resend

### **Semana 1: Fundamentos**
- [ ] Repositorio Git creado + `.gitignore`
- [ ] Next.js 16 scaffolded con TypeScript
- [ ] Tailwind CSS + shadcn/ui configurado
- [ ] Rutas básicas creadas (`/`, `/pricing`, `/dashboard`)
- [ ] Supabase schema creado (profiles, subscriptions, core entity)

### **Semana 2: Frontend**
- [ ] Hero section diseñada y codificada
- [ ] Features section completada
- [ ] Pricing page con planes Stripe
- [ ] Responsive testado (375px, 768px, 1440px)
- [ ] Dark mode funcionando

### **Semana 3: Backend**
- [ ] Auth (Supabase) funcionando
- [ ] Stripe integration (checkout + webhook)
- [ ] Emails transaccionales (bienvenida, receipt)
- [ ] RLS policies en BD
- [ ] Environment variables en Vercel

### **Semana 4: Lanzamiento**
- [ ] Tests de flujo completo (signup → payment → dashboard)
- [ ] Sentry configurado para errores
- [ ] Analytics (Posthog / Vercel) activo
- [ ] Dominio propio apuntando a Vercel
- [ ] Checklist pre-launch completado

### **Post-Lanzamiento**
- [ ] 10-20 usuarios Beta invitados manualmente
- [ ] 5 calls de feedback programadas
- [ ] Roadmap de mejoras basado en feedback
- [ ] Plan de iteración weekly

---

---

## 📝 Actualización recomendada a `contexto.md`

Tu `contexto.md` actual está vacío. Te sugiero completarlo con:

```markdown
# MementoMundi - Contexto de Proyecto

## Definición del producto
[Tu descripción: qué es, para quién, por qué es diferente]

## Posicionamiento
[Statement: Para [audiencia] que [problema], somos [solución] porque [mecanismo]]

## MVP Scope (MUST)
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

## 7-Day Roadmap
- Día 1: Landing + lista de espera
- Día 2: Scaffolding
- ...

## Stack
- Frontend: Next.js 16 + Tailwind + shadcn/ui
- Backend: Supabase + Stripe + Resend
- Deploy: Vercel

## Instrucciones para Claude Code

### Cuando trabajemos en DISEÑO:
1. Usa skill `image-to-code` para secciones visuales
2. Sigue el patrón: imagen → análisis profundo → código
3. Respeta los tokens de brand en `brand/tokens.css`
4. Aplica `design-taste-frontend` (DESIGN_VARIANCE=8, MOTION=6, DENSITY=4)

### Cuando trabajemos en COPY:
1. Usa `funnel-copy-architect` para headlines y CTAs
2. Framework: PAS-T para headlines, AIDA para copy
3. Resuelve objeciones reales, no genéricas

### Cuando trabajemos en BACKEND:
1. Usa `saas-starter-kit` si necesitas Stripe
2. Supabase RLS obligatorio en todas las tablas con datos del usuario
3. Stripe webhook debe ser fuente de la verdad

### Cuando hagas LANZAMIENTO:
1. Usa `ship-it` para plan pre-producción
2. Checklist: auth, pagos, emails, monitoring
3. Rollout: 10 beta users → feedback → refinamiento

## Brand Assets
- Logo: `/public/MEMENTO_LOGO.svg`
- Frase/tagline: `/public/MEMENTO_FRASE.svg`
- Brand guidelines: `/brand/brandbook.md`
- Design tokens: `/brand/tokens.css`

## Reglas de oro
- NO codees directo si es visual importante (imagen primero)
- NO sobreenginierices (MVP valida hipótesis, v2 escala)
- NO olvides RLS en Supabase (seguridad)
- NO deploys sin testing end-to-end

## Referencias
- Taste-skill Guide: `/CLAUDE_CODE_GUIDE.md` (este archivo)
- 24 skills: `/skills/` (cada carpeta es una skill)
- Vercel Platform docs: https://vercel.com/docs
- Supabase docs: https://supabase.com/docs
```

---

---

## 🚀 Próximos pasos

### **Inmediato (Ahora)**
1. Lee esta guía completa
2. Actualiza `/contexto.md` con la plantilla arriba
3. Declara: "¿Por qué existe MementoMundi?" en una frase

### **Hoy (Próximas 2 horas)**
1. Invoca: `/brand-identity-lab` → Define posicionamiento
2. Invoca: `/mvp-blueprint` → Scope ruthless

### **Esta semana**
1. Invoca skills de diseño según roadmap
2. Infraestructura en Vercel + Supabase
3. Primer deploy

---

## 🔗 Quick Reference: Cuándo usar cada skill

| Tarea | Skill | Equipo | Prioridad |
|-------|-------|--------|-----------|
| **🎨 Genera design system** | **`ui-ux-pro-max`** | **1** | **🔴 1º DÍA** |
| Define marca | `brand-identity-lab` | 1 | 🔴 Primer día |
| Visualiza marca | `brandkit` | 1 | 🔴 Primer día |
| Scope MVP | `mvp-blueprint` | 1 | 🔴 Primer día |
| Diseña sección (visual-first) | `image-to-code` | 1 | 🟠 Frontend |
| Copia persuasiva | `funnel-copy-architect` | 2 | 🟠 Copy |
| Landing rápida | `landing-page-pro` | 2 | 🟠 Copy |
| Mockups visuales | `imagegen-frontend-web` | 1 | 🟡 Opcional |
| Responsivo (móvil) | `imagegen-frontend-mobile` | 1 | 🟡 Validación |
| Pulido UI | `high-end-visual-design` | 1 | 🟡 Iteración |
| Aplica UI rules | `design-taste-frontend` | 1 | 🟡 Automático |
| Audita UI | `redesign-existing-projects` | 5 | 🟡 v1.1+ |
| Setup con Stripe | `saas-starter-kit` | 3 | 🟠 Backend |
| Crea agente IA | `ai-agent-builder` | 3 | 🟡 Features avanzadas |
| Automatiza workflows | `automation-forge` | 3 | 🟡 Ops |
| Plan lanzamiento | `ship-it` | 4 | 🟠 Pre-launch |
| Testing exhaustivo | `agent-browser-verify` | 4 | 🟠 QA |
| Análisis feedback | `customer-voice` | 2/6 | 🟡 Post-launch |
| Crecimiento viral | `viral-growth-lab` | 6 | 🟡 Post-launch |
| Pitch para inversión | `pitch-deck-master` | 6 | 🟡 Fundraising |

**Leyenda de Equipos**: 1=Diseño | 2=Copy | 3=Backend | 4=Lanzamiento | 5=Auditoría | 6=Crecimiento

---

## 📚 Documentación adicional

- **Cada skill tiene un SKILL.md** en `/skills/[nombre]/SKILL.md` → Lee el specific cuando lo necesites
- **Este archivo es tu referencia principal** para decidir qué skill usar cuándo
- **`contexto.md` es tu playbook** para instrucciones específicas a Claude Code

---

**Última actualización**: 3 de Mayo 2026
**Creado para**: MementoMundi Project
**Status**: Ready to build

