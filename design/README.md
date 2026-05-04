# MementoMundi Next.js App

Estructura Next.js 16 App Router lista para conectar Supabase.

## 📁 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Redirige según auth
│   ├── globals.css               # Tailwind + custom styles
│   ├── home/
│   │   └── page.tsx              # Lista de viajes (logueado)
│   ├── tienda/
│   │   └── page.tsx              # Compra de pegatinas (público)
│   ├── rrss/
│   │   └── page.tsx              # Feed estilo Instagram
│   ├── ayuda/
│   │   └── page.tsx              # Centro de ayuda / FAQs
│   ├── perfil/
│   │   └── page.tsx              # Perfil de usuario
│   ├── nuevo-viaje/
│   │   └── page.tsx              # Crear nuevo viaje
│   ├── sobre-nosotros/
│   │   └── page.tsx              # Info sobre la empresa
│   ├── viaje/
│   │   └── [id]/page.tsx         # Detalle del viaje (scrapbook)
│   └── auth/
│       ├── login/page.tsx        # Página de login
│       └── signup/page.tsx       # Página de registro
├── components/
│   ├── Navbar.tsx                # Navbar + drawer
│   └── TripCard.tsx              # Componente card de viaje
├── types/
│   └── index.ts                  # TypeScript types
├── middleware.ts                 # Supabase auth middleware (placeholder)
├── tailwind.config.ts            # Config Tailwind (brand colors)
├── tsconfig.json
├── package.json
└── README.md
```

## 🎨 Paleta de Colores (Tailwind)

- **cream**: #EAE7DA
- **pink**: #FFB4AD
- **orange**: #FA9223
- **teal**: #5CA4A4
- **teal-dark**: #066FB4
- **navy**: #0B2150

## 🚀 Próximos Pasos

1. **Instalar dependencias**: `npm install`
2. **Conectar Supabase**:
   - Crear archivo `.env.local` con credenciales
   - Configurar autenticación en `middleware.ts`
   - Conectar API routes con Supabase
3. **Actualizar lógica de redirección** en `app/page.tsx`:
   - Verificar auth status
   - Redirigir a `/home` si logueado
   - Redirigir a `/tienda` si no
4. **Implementar funcionalidades reales**:
   - Fetch de trips desde DB
   - Crear/editar viajes
   - Compra de pegatinas
   - Posts en RRSS

## 📝 Notas

- Todas las páginas usan **mock data** (lista en el código)
- Componentes tienen **hover states** con Framer Motion
- **Tailwind CSS** + custom CSS para efectos especiales
- Listo para conectar a Supabase Backend

## 🛠️ Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + custom CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Database**: Supabase (pending connection)
