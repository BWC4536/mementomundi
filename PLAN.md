# MementoMundi - Plan de 23 días (3 de Mayo - 25 de Mayo 2026)

**Status**: Ready to execute
**Objetivo**: Plataforma funcional con dashboard + features core + pagos en vivo
**Estrategia**: Image-first design + SaaS scaffold + testing paralelo
**Riesgo**: Agresivo pero posible si scope es strict

---

## 📊 Visión general

```
SEMANA 1 (Días 1-7):  Planificación + Brand + Landing → Go/No-Go
SEMANA 2 (Días 8-14): Frontend + Backend simultáneos
SEMANA 3 (Días 15-21): Integración + Testing exhaustivo + Beta launch
BUFFER   (Días 22-23): Fixes críticos + final polish
```

**Hito crítico**: Día 7 - Decisión de Go/No-Go basada en MVP scope
**Hito de validación**: Día 21 - 20+ beta users usando plataforma
**Lanzamiento**: Día 23 - Públicamente accesible

---

## 🎯 Dependencias previas (ANTES de Día 1)

❌ Si NO tienes estas cuentas, **crea hoy**:
- [ ] Vercel account (connected to GitHub)
- [ ] Supabase project (PostgreSQL)
- [ ] Stripe account (test mode)
- [ ] Resend account (emails)
- [ ] GitHub repo creado (private OK)

⚠️ **Si falta alguna, suma +1 día al plan**

---

## 📅 Calendario detallado

### **FASE 0: SETUP (Día 1 - Martes 3 de Mayo)**

**Meta**: Infraestructura lista, design system generado, scope cerrado, decidir si Go/No-Go

| Hora | Tarea | Skill | Entregable | Riesgo |
|------|-------|-------|-----------|--------|
| 08:00-09:00 | Leer CLAUDE_CODE_GUIDE.md completamente | - | Entendimiento | Alto si no lo haces |
| 09:00-10:00 | Completar contexto.md (3 preguntas esenciales) | - | contexto.md completado | CRITICAL |
| 10:00-11:00 | Crear repo Git + setup Vercel + Supabase | - | CI/CD funcional | Bajo |
| 11:00-12:00 | **🎨 Generar Design System MASTER** | **ui-ux-pro-max** | **design-system/MASTER.md** | **CRITICAL** |
| 12:00-12:30 | Commitear MASTER.md a git | - | Design system versionado | Bajo |
| 12:30-13:30 | Invocar `/brand-identity-lab` | brand-identity-lab | brandbook.md + tokens.css | Medio |
| 13:30-14:30 | Invocar `/mvp-blueprint` | mvp-blueprint | Tabla Moscow + roadmap | CRITICAL |
| 14:30-16:00 | **DECISIÓN**: Go/No-Go basado en MVP | - | Decisión documentada | Alto |
| 16:00-17:00 | Si Go: Crear estructura Next.js + shadcn/ui | - | Scaffolding completo | Bajo |

**Entregables esperados al final del día**:
- ✅ Contexto.md completado
- ✅ Repo Git + Vercel + Supabase linked
- ✅ **Design System MASTER generado y comiteado** ← NEW
- ✅ Brand identity documentado (brandbook.md + tokens.css)
- ✅ MVP scope aprobado (tabla Moscow)
- ✅ Decisión Go/No-Go tomada
- ✅ Next.js scaffolding iniciado

**Horas totales**: 9 horas
**Go/No-Go criteria**: ¿El MVP scope es realista en 22 días más? (usualmente: SÍ si es 3-5 features core)

**⚠️ CRITICAL NOTE**: El Design System MASTER es el "source of truth" para toda la UI. Todas las secciones posteriores deben referenciar `design-system/MASTER.md` para garantizar coherencia visual.

---

### **FASE 1: BRAND + LANDING (Días 2-5 - Miercoles a Sábado)**

**Meta**: Brand visualizado, landing funcionando, primeros "no, gracias" recibidos

#### **Día 2 (Miércoles 4 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-09:00 | Revisar diseño de landing | image-to-code | Imagen de referencia |
| 09:00-12:00 | Generar hero + features section (2 imágenes) | imagegen-frontend-web | 2 mockups visuales |
| 12:00-13:30 | Analizar profundamente ambas imágenes | - | Documento de análisis |
| 13:30-16:00 | Codificar hero + features basado en análisis | image-to-code | React components |
| 16:00-17:30 | Escribir copy para hero + CTA | funnel-copy-architect | Copy listo para pegar |

**Horas**: 9.5 horas | **Status**: Hero + Features secc codificadas

---

#### **Día 3 (Jueves 5 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Codificar pricing page (con planes Stripe) | landing-page-pro | pricing/page.tsx |
| 10:00-12:00 | Codificar FAQ + testimonios + CTA final | - | Secciones HTML |
| 12:00-13:30 | Mobile responsiveness check | imagegen-frontend-mobile | Validación visual |
| 13:30-16:00 | Setup Stripe test mode + crear products/prices | - | 3 planes en Stripe |
| 16:00-17:30 | Dark mode toggle + brand tokens integrados | design-taste-frontend | CSS variables aplicados |

**Horas**: 9.5 horas | **Status**: Landing CASI completa

---

#### **Día 4 (Viernes 6 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-09:00 | Polishing landing (spacing, colores, fonts) | high-end-visual-design | Landing refinada |
| 09:00-11:00 | Deploy landing a Vercel (preview + prod) | - | URL pública en vivo |
| 11:00-12:00 | Configurar Plausible analytics | - | Analytics activo |
| 12:00-13:00 | Setup Email (Resend template) | - | Template de bienvenida |
| 13:00-15:00 | Email drip para early subscribers | automation-forge | 3 emails automáticos |
| 15:00-16:30 | Copy final de landing + meta tags OG | funnel-copy-architect | Landing 100% listo |

**Horas**: 8.5 horas | **Status**: Landing EN VIVO con formulario

---

#### **Día 5 (Sábado 7 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 09:00-12:00 | Feedback loop: revisar landing en móvil/desktop | agent-browser-verify | Test report |
| 12:00-13:30 | Fixes críticos basados en feedback | - | Landing mejorada |
| 13:30-15:00 | Setup base de datos Supabase (schema inicial) | saas-starter-kit | SQL migration |
| 15:00-17:00 | Plan de rollout: quién invito primero | - | Lista de beta testers |

**Horas**: 8 horas | **Status**: Landing perfecta + BD estructura lista

**FIN FASE 1 CHECKLIST**:
- ✅ Landing de conversión EN VIVO
- ✅ Plansible tracking activo
- ✅ Email automático para suscriptores
- ✅ DB schema migrado
- ✅ Stripe test mode funcional
- ✅ ~50-100 primeros visitantes esperados

---

### **FASE 2: SCAFFOLDING + FRONTEND (Días 6-10 - Lunes a Viernes)**

**Meta**: Auth funciona, layouts de dashboard listos, primeros features en desarrollo

#### **Día 6 (Lunes 8 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Invocar `saas-starter-kit` (full scaffold) | saas-starter-kit | Next.js + Supabase completo |
| 10:00-12:00 | Integrar con Vercel: env vars + deploy | - | Scaffold en vivo |
| 12:00-13:30 | Setup auth (email + password via Supabase) | - | Login/Signup funcional |
| 13:30-16:00 | Crear rutas protegidas: /dashboard, /settings | - | Middleware + redirects |
| 16:00-17:30 | Diseñar dashboard layout (image-to-code si necesario) | image-to-code | Dashboard wireframe |

**Horas**: 9.5 horas | **Status**: Auth funciona, dashboard básico

---

#### **Día 7 (Martes 9 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Codificar login/signup page | design-taste-frontend | Auth pages |
| 10:00-12:00 | Codificar dashboard layout + sidebar | high-end-visual-design | Dashboard shell |
| 12:00-13:30 | Codificar settings page (account, billing preview) | - | Settings page |
| 13:30-15:00 | RLS policies: cada usuario ve solo lo suyo | - | Supabase RLS |
| 15:00-17:00 | Test flujo: signup → login → dashboard OK | agent-browser-verify | Test report |

**Horas**: 9 horas | **Status**: Dashboard navegable, auth completo

---

#### **Día 8 (Miércoles 10 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Crear tabla BD para core entity #1 (ej: projects) | - | Migration SQL |
| 10:00-12:00 | Crear lista de entity #1 (CRUD read/list) | - | /dashboard/items page |
| 12:00-13:30 | Crear formulario de creación (POST) | - | Form modal |
| 13:30-15:30 | Test: crear → listar → ver funciona | - | Test report |
| 15:30-17:00 | Preparar para feature #2 | - | BD schema para feature 2 |

**Horas**: 8.5 horas | **Status**: Feature #1 (CRUD básico) funcional

---

#### **Día 9 (Jueves 11 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Crear tabla BD para core entity #2 | - | Migration SQL |
| 10:00-12:00 | Crear lista + CRUD para feature #2 | - | Page completa |
| 12:00-13:30 | Validación en formularios | - | Error handling |
| 13:30-15:00 | Test: feature #2 funcionando | agent-browser-verify | Test report |
| 15:00-17:00 | Dashboard stats/overview (si aplica) | - | Stats section |

**Horas**: 9 horas | **Status**: Feature #2 (CRUD) funcionando

---

#### **Día 10 (Viernes 12 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Crear tabla BD para core entity #3 (si necesario) | - | Migration SQL |
| 10:00-12:00 | CRUD mínimo para feature #3 | - | Page básica |
| 12:00-13:30 | Pulido de UX: notificaciones, loading states | design-taste-frontend | UX mejorada |
| 13:30-15:00 | Test exhaustivo: features 1+2+3 juntos | agent-browser-verify | Test report |
| 15:00-17:00 | Identificar errores frecuentes para lunes | - | Bug list |

**Horas**: 9 horas | **Status**: 3 features core navegables

**FIN FASE 2 CHECKLIST**:
- ✅ Auth funcional (signup/login/logout)
- ✅ Dashboard con sidebar + múltiples páginas
- ✅ 3+ features core con CRUD básico
- ✅ RLS policies protegiendo datos
- ✅ Mobile responsive (375px mínimo)
- ✅ Todos los features testeados manualmente

---

### **FASE 3: INTEGRACIÓN + BACKEND (Días 11-15 - Lunes a Viernes)**

**Meta**: Pagos funcionales, emails transaccionales, integración completa

#### **Día 11 (Lunes 13 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Setup Stripe checkout (test mode) | saas-starter-kit | /api/stripe/checkout funcional |
| 10:00-12:00 | Setup Customer Portal (Stripe) | - | Portal en vivo |
| 12:00-13:30 | Crear tabla subscriptions + sync con Stripe | - | Schema migration |
| 13:30-15:30 | Webhook de Stripe: sincronizar estado | - | /api/stripe/webhook |
| 15:30-17:00 | Test: flujo completo signup → payment funciona | agent-browser-verify | Test report |

**Horas**: 9 horas | **Status**: Stripe checkout funciona en test

---

#### **Día 12 (Martes 14 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Crear template email de bienvenida | - | resend template |
| 10:00-11:30 | Trigger email al signup | - | Function en Supabase |
| 11:30-13:00 | Template email de invoice/payment | - | Template |
| 13:00-14:30 | Trigger email después de pago exitoso | - | Trigger |
| 14:30-16:00 | Gating de features según plan | - | canAccess() function |
| 16:00-17:30 | Test: email llega, features gating funciona | - | Test report |

**Horas**: 9.5 horas | **Status**: Emails transaccionales EN VIVO

---

#### **Día 13 (Miércoles 15 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Setup Sentry para error tracking | - | Sentry funcional |
| 10:00-12:00 | Setup rate limiting (Upstash Redis) | - | Rate limiter en API |
| 12:00-13:30 | Optimizar performance: images, fonts | design-taste-frontend | Lighthouse >90 |
| 13:30-15:00 | Setup CORS, CSRF, headers de seguridad | - | Security headers |
| 15:00-17:00 | Test exhaustivo en vivo | agent-browser-verify | Test report |

**Horas**: 9 horas | **Status**: Seguridad + performance OK

---

#### **Día 14 (Jueves 16 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Términos y condiciones + Privacidad | - | Legal pages |
| 10:00-11:30 | Setup Google Analytics (si quieres) | - | GA funcional |
| 11:30-13:00 | Crear página de ayuda/onboarding | - | /help page |
| 13:00-14:30 | Refinar UX de pagos (microcopy, confirmación) | funnel-copy-architect | Copy mejorado |
| 14:30-16:00 | Test final: flujo completo A-Z | agent-browser-verify | Checklist paso a paso |
| 16:00-17:30 | Identificar y loguear bugs restantes | - | Bug log |

**Horas**: 9.5 horas | **Status**: Prácticamente 100% funcional

---

#### **Día 15 (Viernes 17 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Test desde móvil (iOS Safari + Android Chrome) | agent-browser-verify | Bug report específico |
| 10:00-12:00 | Fixes de bugs críticos identificados | - | Código corregido |
| 12:00-13:00 | Despliegue a production (prod environment Vercel) | - | LIVE URL de producción |
| 13:00-14:00 | Setup dominio propio + SSL | - | Domain live |
| 14:00-15:00 | Stripe: cambiar a LIVE mode (de test) | - | Stripe live configurado |
| 15:00-17:00 | Buffer: refinamiento final de última hora | - | Polish |

**Horas**: 9 horas | **Status**: 🚀 LANZAMIENTO LISTO (en vivo con dominio propio)

**FIN FASE 3 CHECKLIST**:
- ✅ Stripe funcionando en VIVO (test pagos reales)
- ✅ Emails transaccionales automáticos
- ✅ Gating de features por plan
- ✅ Sentry tracking errors
- ✅ Performance >90 Lighthouse
- ✅ Security headers + RLS + CORS
- ✅ Dominio propio con SSL
- ✅ Términos + Privacidad
- ✅ Google Analytics

---

### **FASE 4: TESTING EXHAUSTIVO (Días 16-20 - Lunes a Viernes)**

**Meta**: 0 bugs críticos, 20+ beta users, feedback loop activo

#### **Día 16 (Lunes 18 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-12:00 | Scenario testing: 10 casos de uso reales | agent-browser-verify | Bug report |
| 12:00-13:30 | Fixes de bugs encontrados | - | Code fixes |
| 13:30-15:00 | Crear script de rollback en caso de emergency | - | Runbook |
| 15:00-17:00 | Setup monitoring alerts | - | Uptime monitoring |

**Horas**: 8 horas | **Status**: Testing metódico en curso

---

#### **Día 17 (Martes 19 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-11:00 | Invitar primeros 20-30 beta users (manualmente) | - | Email campaign |
| 11:00-12:00 | Setup Slack/Discord para feedback | - | Channel activo |
| 12:00-13:30 | Crear onboarding checklist de 5 minutos | - | Loom video o walkthrough |
| 13:30-16:00 | Monitor: logs, errors, user behavior | - | Monitoring sheet |
| 16:00-17:00 | Fixes de bugs reportados por beta users | - | Hotfixes |

**Horas**: 9 horas | **Status**: Beta users invitados

---

#### **Día 18 (Miércoles 20 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-12:00 | Acompañar onboarding de primeros 5 users | - | Notes en Slack |
| 12:00-13:30 | Recopilar feedback | customer-voice | Feedback analysis |
| 13:30-15:30 | Fixes basados en feedback real | - | Code updates |
| 15:30-17:00 | Comunicar updates a beta users | - | Email update |

**Horas**: 9 horas | **Status**: ~10-15 usuarios activos

---

#### **Día 19 (Jueves 21 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Última ronda de monitoring | - | Health check |
| 10:00-12:00 | Recolectar testimonios/feedback | - | Quotes para landing |
| 12:00-13:30 | Actualizar landing con testimonios reales | - | Landing mejorada |
| 13:30-15:00 | Crear email de anuncio público | funnel-copy-architect | Announcement |
| 15:00-17:00 | Preparar para lanzamiento público | ship-it | Pre-launch checklist |

**Horas**: 9 horas | **Status**: Listo para público

---

#### **Día 20 (Viernes 22 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-12:00 | **LANZAMIENTO PÚBLICO**: Newsletter + Twitter + Product Hunt (opcional) | - | Public announcement |
| 12:00-13:30 | Monitor en vivo: logs, errors, user signups | - | Live dashboard |
| 13:30-16:00 | Responder a primeros usuarios | - | Support activo |
| 16:00-17:30 | Documentar lecciones aprendidas | - | Post-launch notes |

**Horas**: 9.5 horas | **Status**: 🎉 EN VIVO PÚBLICAMENTE

**FIN FASE 4 CHECKLIST**:
- ✅ 20+ beta users en vivo
- ✅ 0 bugs críticos conocidos
- ✅ Monitorización 24/7 activa
- ✅ Feedback loop establecido
- ✅ Testimonios reales en landing
- ✅ Rollback plan documentado
- ✅ Support channel activo

---

### **FASE 5: BUFFER + POLISH (Días 21-23 - Sábado a Lunes)**

**Meta**: Fixes last-minute, seguridad final, documentación

#### **Día 21 (Sábado 23 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 09:00-12:00 | Monitoreo + fixes urgentes | - | Hotfixes si hay |
| 12:00-13:30 | Recopilar usuario feedback acumulado | customer-voice | Feedback summary |
| 13:30-15:00 | Documentación para desenvolvedores futuros | - | README mejorado |
| 15:00-17:00 | Optimizaciones menores basadas en feedback | - | Code updates |

**Horas**: 8 horas | **Status**: Plataforma estable

---

#### **Día 22 (Domingo 24 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 10:00-13:00 | Auditoría final de seguridad | - | Security checklist |
| 13:00-14:30 | Performance final check | - | Lighthouse + pagespeed |
| 14:30-16:00 | Preparar roadmap de v1.1 basado en feedback | - | Roadmap v1.1 |
| 16:00-18:00 | Celebración + documentación de éxito | - | Launch retrospective |

**Horas**: 8 horas | **Status**: Listo para pasar a mantenimiento

---

#### **Día 23 (Lunes 25 de Mayo)**

| Hora | Tarea | Skill | Entregable |
|------|-------|-------|-----------|
| 08:00-10:00 | Monitoreo de última hora + hotfixes si hay | - | Final monitoring |
| 10:00-12:00 | Responder a nuevos usuarios | - | Support |
| 12:00-14:00 | Planificación de siguiente semana (v1.1) | - | Weekly plan |
| 14:00-18:00 | BUFF ER: tiempo libre para fixes últimos | - | - |

**Horas**: Variable | **Status**: ✅ COMPLETADO

---

---

## 📋 Checklist maestro (Resumen)

### **ANTES DE EMPEZAR (Día 1)**
- [ ] Cuentas creadas: Vercel, Supabase, Stripe, Resend, GitHub
- [ ] contexto.md completado con 3 preguntas esenciales
- [ ] `/brand-identity-lab` ejecutado → brandbook.md + tokens.css
- [ ] `/mvp-blueprint` ejecutado → tabla Moscow + roadmap
- [ ] **Decisión Go/No-Go** tomada (¿es realista en 22 días?)

### **SEMANA 1: BRAND + LANDING (Días 1-7)**
- [ ] Landing EN VIVO con formulario (Día 5)
- [ ] Plausible analytics activo
- [ ] Email automático para suscriptores
- [ ] ~50-100 visitantes primer semana
- [ ] Supabase schema inicial migrado
- [ ] Stripe test mode configurado

### **SEMANA 2: SCAFFOLDING + FRONTEND (Días 6-10)**
- [ ] Auth (signup/login/logout) funcional
- [ ] Dashboard con sidebar navegable
- [ ] 3+ features core con CRUD básico
- [ ] RLS policies implementadas
- [ ] Mobile responsiveness OK
- [ ] Todos los features testeados

### **SEMANA 3: PAGOS + INTEGRACIÓN (Días 11-15)**
- [ ] Stripe checkout funcionando en test
- [ ] Customer Portal activo
- [ ] Emails transaccionales automáticos
- [ ] Gating de features por plan
- [ ] Sentry + Rate limiting
- [ ] **DOMINIO PROPIO EN VIVO** (Día 15)
- [ ] Stripe LIVE mode (pagos reales)
- [ ] Términos + Privacidad

### **SEMANA 4: TESTING + LANZAMIENTO (Días 16-23)**
- [ ] 20+ beta users invitados manualmente
- [ ] 0 bugs críticos conocidos
- [ ] Monitorización 24/7
- [ ] **LANZAMIENTO PÚBLICO** (Día 20)
- [ ] Testimonios reales en landing
- [ ] Feedback loop establecido
- [ ] Roadmap v1.1 planeado

---

---

## ⚠️ Puntos críticos (Make or break)

### **RIESGO ALTO - Mitigar hoy**

| Riesgo | Impacto | Mitigación |
|--------|---------|-----------|
| **Scope creep** | +5 días | Moscow table: MUST/SHOULD/COULD/WON'T es RIGID, no flexible |
| **Auth compleja** | +3 días | Usa `saas-starter-kit` (no inventes), email+password basta |
| **Stripe integration** | +2 días | Webhook webhook es FUENTE DE VERDAD, no frontend |
| **Design iteración** | +4 días | Image-first (no rediseñar tras codificar) |
| **Bugs encontrados tardío** | +3 días | Testing paralelo (no esperar a Día 16) |
| **Falta de dominio propio** | +1 día | Compra/configura HOY, no el Día 15 |

### **RIESGO MEDIO - Monitorear**

| Riesgo | Acción |
|--------|--------|
| Stripe test pagos fallan | Debugging rápido, no procrastinar |
| Mobile layout broken | Fix Día 10, no esperar a Día 16 |
| Email no llega | Testear Resend sandbox antes de producción |
| Performance lenta | Lighthouse >90 Día 13, no Día 22 |
| DB queries lentos | Index critical tables Día 10 |

---

---

## 🎯 Daily standup template (Copia esto 23 veces)

Cada día, responde:

```markdown
### Día X (Fecha)
**Horas trabajadas**: X/9
**Completado**:
- [ ] Entregable 1
- [ ] Entregable 2

**Bloqueadores**:
- Si hay, documenta aquí

**Siguiente día**:
- [ ] Prioridad 1
- [ ] Prioridad 2

**Status**: ✅ On track / ⚠️ At risk / 🔴 Delayed
```

---

---

## 📊 Métricas de progreso

**Midpoint (Día 11)**:
- ✅ Landing 100% → publicidad
- ✅ Auth + Dashboard funcional
- ✅ 3 features core en vivo
- ✅ Stripe pagos testeados
- Si esto no está → **AT RISK**

**Pre-lanzamiento (Día 20)**:
- ✅ 20+ beta users activos
- ✅ 0 bugs críticos
- ✅ Conversión A→B (visita → signup) >5%
- Si esto no está → **DELAY LANZAMIENTO A Día 25**

---

---

## 📞 Quién invocar y cuándo

| Skill | Cuándo | Duración |
|-------|--------|----------|
| `brand-identity-lab` | Día 1 | 1-2h |
| `mvp-blueprint` | Día 1 | 1.5h |
| `image-to-code` | Días 2-15 (múltiples veces) | 3-4h por sección |
| `funnel-copy-architect` | Días 3, 12, 19 | 1-2h |
| `saas-starter-kit` | Día 6 | 2-3h (setup + explanación) |
| `landing-page-pro` | Día 3 (pricing) | 1.5h |
| `agent-browser-verify` | Días 5, 7, 13, 16 | 1h |
| `high-end-visual-design` | Días 7, 15 | 1-2h |
| `customer-voice` | Días 18, 21 | 1h |
| `ship-it` | Día 19 | 1.5h |
| `automation-forge` | Día 4 (email) | 1h |

---

---

## ✅ Entrega final (Día 23)

**Lo que debe estar EN VIVO el 25 de Mayo**:

```
✅ MementoMundi.com (o tu dominio)
   → Landing con conversión
   → Auth funcionando
   → Dashboard con 3+ features
   → Pagos vía Stripe (en vivo)
   → 20+ usuarios activos
   → 0 bugs críticos conocidos
   → Monitorización activa (Sentry)
   → Email automático funcionando
   → Roadmap v1.1 documentado
```

**Éxito = Launch con usuarios pagando en vivo.**

---

**Última revisión**: 3 de Mayo 2026
**Creado para**: Desarrollar MementoMundi MVP en 23 días
**Status**: Ready to execute

