# CLAUDE.md — Memento Mundi Agency (Auto-loaded every session)

> Este archivo se carga automáticamente en cada sesión de Claude Code.
> Define el flujo de trabajo obligatorio para TODAS las tareas del proyecto.

---

## 1. Identidad del proyecto

**MementoMundi** es una plataforma PWA phygital para jóvenes viajeros. Pegatinas con QR que desbloquean un diario digital (Scrapbook) geolocalizado.

- **Stack**: Next.js 16 (App Router), Tailwind CSS, shadcn/ui, Supabase (auth + DB + RLS), Stripe, Resend, Vercel
- **Design System**: `design-system/memento-mundi/MASTER.md` (source of truth)
- **Plan**: `PLAN.md` (calendario de 23 días, Fase 0-5)
- **Contexto completo**: `contexto.md`
- **MVP scope**: Landing + QR Scanner + Scrapbook View (3 MUST features)

---

## 2. FLUJO DE TRABAJO OBLIGATORIO

**CADA VEZ que el usuario pida una tarea, seguir ESTE flujo completo. Sin excepciones.**

### PASO 0: Clasificar la tarea

Lee la petición y clasifícala en una categoría:

| Categoría | Ejemplo |
|-----------|---------|
| `VISUAL` | Hero section, landing, dashboard layout, cualquier UI |
| `COPY` | Headlines, CTAs, email templates, textos persuasivos |
| `BACKEND` | Auth, DB, Stripe, API routes, webhooks, RLS |
| `SHIP` | Deploy, testing, pre-launch, fixes |
| `GROWTH` | Feedback analysis, viral loops, pitch deck |
| `CONTENT` | Guiones TikTok, ideas virales, estrategia redes sociales, contenido Gen Z |

### PASO 1: Comité de Planificación (obligatorio, breve)

Ejecutar mentalmente estos dos roles antes de escribir código:

**PM (Orquestador)**:
- Abrir `PLAN.md` y localizar qué día/fase/tarea corresponde
- Verificar que la tarea está alineada con el plan y el scope MUST
- Si la tarea no está en el plan, señalar al usuario ANTES de proceder

**Asignador de Skills**:
- Según la categoría, asignar el EQUIPO correcto (ver Sección 3)
- Listar qué skills se van a usar y en qué orden

**Output del Paso 1**: 3-5 líneas máximo resumiendo: qué toca, qué equipo, qué skills.

### PASO 2: Ejecución con Skills (el trabajo real)

Ejecutar el workflow del equipo asignado (Sección 3). Cada equipo tiene un orden estricto.

**Reglas de ejecución**:
- Usar subagentes (`Agent` tool) para paralelizar trabajo independiente
- Cada skill que requiera código genera su parte y la pasa al siguiente
- SIEMPRE referenciar `design-system/memento-mundi/MASTER.md` para decisiones visuales
- SIEMPRE referenciar `contexto.md` para decisiones de producto

### PASO 3: Auditoría y Feedback Loop (obligatorio)

Después de que el equipo Dev proponga código, ejecutar estas 3 auditorías:

**QA & Security**:
- Buscar errores, edge cases, fallos de rendimiento mobile
- Verificar RLS en Supabase si hay queries
- Verificar que no hay secrets hardcodeados
- Si encuentra problemas: volver al Paso 2 con correcciones

**UX/UI Improver**:
- Verificar coherencia con `design-system/memento-mundi/MASTER.md`
- Verificar: tipografía Space Grotesk, colores (#0EA5E9, #EA580C), spacing 8px
- Verificar mobile responsiveness (375px mínimo)
- Si encuentra problemas: volver al Paso 2 con correcciones

**CMO (Growth)**:
- Evaluar: esto genera tracción? es compartible por Gen Z?
- Si es código interno (backend puro), el CMO puede omitir turno
- Si encuentra oportunidades: sugerir mejoras (no bloquear)

**Loop**: Si QA o UX/UI encuentran problemas, corregir y re-auditar. Máximo 3 iteraciones. Si tras 3 no pasa, presentar al usuario con los problemas pendientes.

### PASO 4: Presentar resultado al usuario

Mostrar:
1. **Resumen del comité** (2-3 líneas): qué se debatió, qué se corrigió
2. **Código/comandos finales** listos para ejecutar
3. **Pedir confirmación** antes de ejecutar cambios destructivos o deploys

---

## 3. EQUIPOS Y SKILLS

### EQUIPO VISUAL (categoría `VISUAL`)

Orden estricto de ejecución:

```
1. Leer design-system/memento-mundi/MASTER.md
2. Leer design-system/pages/[page].md (si existe, override del MASTER)
3. Diseñar con skills de diseño (conceptualizar visualmente primero)
4. Codificar React components con tokens del brand
5. Validar responsiveness (375px, 768px, 1024px, 1440px)
```

**Skills disponibles** (usar según necesidad):
- `imagegen-frontend-web` — mockup visual de la sección
- `image-to-code` — convertir visual a código
- `design-taste-frontend` — reglas UI premium automáticas
- `high-end-visual-design` — polishing (glassmorphism, micro-interactions)
- `imagegen-frontend-mobile` — validar responsive

**Regla de oro**: Imagen primero, código segundo. NUNCA codificar UI sin referencia visual.

### EQUIPO COPY (categoría `COPY`)

```
1. funnel-copy-architect → headlines, CTAs, PAS-T framework
2. landing-page-pro → estructura + copy combinada
3. [Si hay feedback real] → customer-voice → analizar
4. funnel-copy-architect → refinar basado en insights
```

### EQUIPO BACKEND (categoría `BACKEND`)

```
1. saas-starter-kit → scaffold (NUNCA desde cero)
2. Código custom sobre el scaffold
3. automation-forge → workflows automáticos
4. ai-agent-builder → si necesita features IA
```

**Reglas backend**:
- RLS obligatorio en TODAS las tablas de Supabase
- Stripe webhook = fuente de verdad (no frontend)
- `.env.local` en `.gitignore` siempre
- `saas-starter-kit` PRIMERO, no custom code

### EQUIPO SHIP (categoría `SHIP`)

```
1. ship-it → pre-production checklist
2. Testing del flujo completo: signup → feature → payment → dashboard
3. customer-voice → feedback si hay beta users
4. Fixes rápidos basados en feedback
```

**Checklist de ship**:
- Auth funciona (signup/login/logout)
- Payments funcionan (Stripe test/live)
- Dashboard accesible post-login
- Responsive: 375px, 768px, 1024px, 1440px
- Emails transaccionales llegan
- Performance >90 Lighthouse
- Sentry tracking activo

### EQUIPO GROWTH (categoría `GROWTH`)

```
1. customer-voice → analizar feedback acumulado
2. viral-growth-lab → identificar loops virales
3. tiktok-marketing → idear contenido viral para TikTok/Reels
4. funnel-copy-architect → refinar messaging
5. pitch-deck-master → si busca inversión
```

### EQUIPO CONTENT (categoría `CONTENT`)

Para cualquier tarea de contenido en redes sociales, especialmente TikTok/Reels orientado a Gen Z viajeros.

```
1. tiktok-marketing → estrategia de contenido + guión del vídeo
2. viral-growth-lab → validar potencial viral del concepto
3. funnel-copy-architect → afinar hooks y CTAs del vídeo
```

**Cuándo activar automáticamente**:
- Siempre que el usuario mencione TikTok, Reels, vídeo, viral, Gen Z, redes sociales
- Al preparar el lanzamiento (Días 17-20 del plan)
- Cuando se pida promover una feature o el producto
- Al crear contenido para beta users o early adopters

**Qué genera `tiktok-marketing`**:
- Guión completo (hook 0-3s, desarrollo, CTA final)
- Sugerencias de sonidos/música trending
- Subtítulos y textos en pantalla
- Hashtags optimizados
- Mejor hora de publicación
- Ideas de series de contenido (pilares: Educativo 40%, Entretenimiento 30%, Producto 20%, UGC 10%)

**Regla de oro para MementoMundi en TikTok**: Mostrar la transformación (foto olvidada → recuerdo estético tangible). El peeling de la pegatina = momento de satisfacción visual. Priorizar hooks visuales sobre texto.

---

## 4. REGLAS INQUEBRANTABLES

1. **SIEMPRE leer `design-system/memento-mundi/MASTER.md`** antes de cualquier trabajo visual
2. **SIEMPRE consultar `PLAN.md`** para verificar alineación con el calendario
3. **NUNCA codificar UI sin referencia visual** (imagen primero, código después)
4. **NUNCA inventar soluciones custom** para auth/pagos — usar scaffolds
5. **NUNCA hacer deploy sin testing** del flujo completo
6. **NUNCA ignorar RLS** en Supabase — cada usuario ve solo sus datos
7. **NUNCA hacer scope creep** — si no está en MUST, no va en MVP
8. **NUNCA cambiar el stack** sin aprobación explícita del usuario
9. **SIEMPRE el feedback loop** — QA + UX/UI deben aprobar antes de presentar
10. **SIEMPRE pedir confirmación** antes de ejecutar deploys o cambios destructivos

---

## 5. REFERENCIA RÁPIDA

| Archivo | Propósito |
|---------|-----------|
| `PLAN.md` | Calendario 23 días, fases, tareas diarias |
| `contexto.md` | Producto, MVP scope, stack, brand |
| `design-system/memento-mundi/MASTER.md` | Design system (colores, tipografía, spacing) |
| `design-system/pages/[page].md` | Overrides por página (si existen) |
| `skills/[nombre]/SKILL.md` | 24 skills disponibles |
| `public/MEMENTO_LOGO.svg` | Logo |
| `public/MEMENTO_FRASE.svg` | Frase de marca |

---

## 6. FORMATO DE RESPUESTA

Cada respuesta a una tarea sigue este formato:

```
## Comité (Paso 1)
PM: [qué toca según plan]
Skills: [equipo asignado + skills]

## Ejecución (Paso 2)
[Código/trabajo realizado]

## Auditoría (Paso 3)
QA: [OK / problemas encontrados y corregidos]
UX/UI: [OK / ajustes aplicados]
CMO: [OK / sugerencias] (si aplica)

## Resultado
[Código final / comandos a ejecutar]
[Pedir confirmación si es necesario]
```
