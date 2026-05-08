-- Migration: store schema — cart, favorites, sticker designs
-- Adds e-commerce tables for the /tienda page

-- ============================================================
-- STICKER_DESIGNS table
-- Pre-built sticker design options for the "basic" pack
-- ============================================================
create table if not exists public.sticker_designs (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  image_url  text not null,
  sort_order integer not null default 0,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.sticker_designs enable row level security;

create policy "sticker_designs_public_read"
  on public.sticker_designs for select
  using (active = true);

-- ============================================================
-- CART_ITEMS table
-- ============================================================
create table if not exists public.cart_items (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  pack_type           text not null check (pack_type in ('basic', 'custom')),
  quantity            integer not null check (quantity > 0),
  design_id           uuid references public.sticker_designs(id),
  custom_file_url     text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

alter table public.cart_items enable row level security;

create policy "cart_items_select"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "cart_items_insert"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "cart_items_update"
  on public.cart_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "cart_items_delete"
  on public.cart_items for delete
  using (auth.uid() = user_id);

create index if not exists cart_items_user_id_idx on public.cart_items(user_id);

-- auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger cart_items_updated_at
  before update on public.cart_items
  for each row execute function public.set_updated_at();

-- ============================================================
-- FAVORITES table
-- ============================================================
create table if not exists public.favorites (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  pack_type  text not null check (pack_type in ('basic', 'custom')),
  created_at timestamptz not null default now(),
  unique (user_id, pack_type)
);

alter table public.favorites enable row level security;

create policy "favorites_select"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "favorites_insert"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "favorites_delete"
  on public.favorites for delete
  using (auth.uid() = user_id);

create index if not exists favorites_user_id_idx on public.favorites(user_id);

-- ============================================================
-- SEED: sticker designs (10 demo designs)
-- ============================================================
insert into public.sticker_designs (name, image_url, sort_order) values
  ('Coliseo Romano',    'https://picsum.photos/seed/sticker-roma/400/400',      1),
  ('Torre Eiffel',      'https://picsum.photos/seed/sticker-paris/400/400',     2),
  ('Playa Dorada',      'https://picsum.photos/seed/sticker-playa/400/400',     3),
  ('Montaña Nevada',    'https://picsum.photos/seed/sticker-mountain/400/400',  4),
  ('Ciudad al Atardecer','https://picsum.photos/seed/sticker-city/400/400',     5),
  ('Mercado Oriental',  'https://picsum.photos/seed/sticker-market/400/400',    6),
  ('Templo Japonés',    'https://picsum.photos/seed/sticker-japan/400/400',     7),
  ('Barco Velero',      'https://picsum.photos/seed/sticker-sail/400/400',      8),
  ('Selva Tropical',    'https://picsum.photos/seed/sticker-jungle/400/400',    9),
  ('Aurora Boreal',     'https://picsum.photos/seed/sticker-aurora/400/400',   10)
on conflict do nothing;
