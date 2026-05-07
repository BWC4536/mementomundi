-- Migration: products and faqs tables
-- Adds commercial pack bundles (Tienda) and FAQ content (Ayuda)

-- ============================================================
-- PRODUCTS table (pack bundles sold in Tienda)
-- ============================================================
create table if not exists public.products (
  id            text primary key,                  -- e.g. 'pack10', 'pack20', 'pack50'
  tag           text not null,                     -- display badge: 'Starter', 'Popular', 'Premium'
  name          text not null,
  description   text not null,
  price_cents   integer not null,                  -- price in euro cents (990, 1790, 3990)
  price_display text not null,                     -- formatted string shown to user: '9,90€'
  price_sub     text,                              -- secondary label: 'envío incluido', '¡ahorra 2€!'
  accent_color  text not null default '#0B2150',   -- hex, used for border/highlight
  tag_bg_color  text not null default '#0B215018', -- hex with alpha, badge background
  img_bg_color  text not null default '#E8EDF5',   -- hex, image column background
  card_bg_color text not null default '#F0F3F8',   -- hex, card background when selected
  sticker_count integer not null default 0,        -- number of sticker previews to show
  is_bestseller boolean not null default false,
  has_canvas    boolean not null default false,    -- includes Lienzo de Recuerdo
  sort_order    integer not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

-- RLS: anyone can read active products (public catalog)
alter table public.products enable row level security;

create policy "products_public_read"
  on public.products
  for select
  using (active = true);

-- ============================================================
-- FAQS table
-- ============================================================
create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  sort_order  integer not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- RLS: anyone can read active FAQs
alter table public.faqs enable row level security;

create policy "faqs_public_read"
  on public.faqs
  for select
  using (active = true);

-- ============================================================
-- SEED: products (3 commercial packs)
-- ============================================================
insert into public.products (id, tag, name, description, price_cents, price_display, price_sub, accent_color, tag_bg_color, img_bg_color, card_bg_color, sticker_count, is_bestseller, has_canvas, sort_order)
values
  (
    'pack10',
    'Starter',
    'Pack 10 Pegatinas',
    'Perfecto para tu primer viaje. 10 pegatinas originales ilustradas a mano para empezar a dejar huella.',
    990,
    '9,90€',
    'envío incluido',
    '#5CA4A4',
    '#5CA4A420',
    '#EBF5F5',
    '#F3FAFA',
    3,
    false,
    false,
    1
  ),
  (
    'pack20',
    'Popular',
    'Pack 20 Pegatinas',
    'El favorito de la comunidad. 20 pegatinas para llenar tu álbum de aventuras sin parar.',
    1790,
    '17,90€',
    '¡ahorra 2€!',
    '#FA9223',
    '#FA922320',
    '#FFF3E6',
    '#FFF8F0',
    5,
    true,
    false,
    2
  ),
  (
    'pack50',
    'Premium',
    'Pack 50+ Pegatinas + Lienzo de Recuerdo',
    'La experiencia completa. Más de 50 pegatinas exclusivas y un Lienzo de Recuerdo para enmarcar tu aventura.',
    3990,
    '39,90€',
    'edición limitada',
    '#0B2150',
    '#0B215018',
    '#E8EDF5',
    '#F0F3F8',
    7,
    false,
    true,
    3
  )
on conflict (id) do nothing;

-- ============================================================
-- SEED: faqs (9 entries matching app/ayuda/page.tsx static data)
-- ============================================================
insert into public.faqs (question, answer, sort_order)
values
  (
    '¿Cuánto tarda en llegar mi pedido?',
    'Los envíos estándar tardan entre 3 y 5 días laborables en península, 5-7 en Baleares y Canarias. Te enviamos un correo con el número de seguimiento en cuanto sale del almacén.',
    1
  ),
  (
    '¿Cómo escaneo una pegatina por primera vez?',
    'Abre la cámara del móvil sobre el QR de la pegatina (o usa la app), pulsa el enlace y vincúlala a un viaje existente o crea uno nuevo. Ya está, ya cuenta dentro de tu scrapbook.',
    2
  ),
  (
    '¿Puedo añadir más participantes a un viaje?',
    'Sí. Desde el detalle del viaje toca «Compartir» y envía el enlace o invita por email. Pueden subir fotos, comentarios y escanear pegatinas también.',
    3
  ),
  (
    '¿Las pegatinas son resistentes al agua?',
    'Las pegatinas estándar tienen laminado mate impermeable, aguantan lluvia y golpes. La línea «kraft» es papel y no se recomienda para exterior.',
    4
  ),
  (
    '¿Cómo cambio mi método de pago?',
    'Entra en Perfil → Cuenta y pagos → Métodos de pago. Puedes añadir tarjeta, Bizum o PayPal y marcar uno como preferido.',
    5
  ),
  (
    '¿Puedo devolver un pack si no me gusta?',
    'Tienes 14 días desde la recepción para devolverlo, siempre que no hayas activado ninguna pegatina. Te reembolsamos en el mismo método de pago en 3-5 días.',
    6
  ),
  (
    '¿Qué hago si pierdo una pegatina?',
    'Si la pegatina aún no estaba activada, no pasa nada. Si ya estaba vinculada, escríbenos y la regeneramos en tu cuenta.',
    7
  ),
  (
    '¿Puedo personalizar el diseño de mi pack?',
    'Claro: en Tienda → Personaliza tu pack puedes elegir colores, ilustraciones y añadir tu nombre. Los packs custom tardan 2-3 días extra en preparación.',
    8
  ),
  (
    '¿Cómo descargo mi scrapbook en PDF?',
    'Desde el detalle del viaje pulsa el icono de descarga arriba a la derecha y elige formato PDF. Se generará en unos segundos y lo recibirás por correo.',
    9
  )
;
