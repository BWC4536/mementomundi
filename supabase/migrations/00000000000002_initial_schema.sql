-- ============================================================================
-- Memento Mundi — Migration 002: Initial Schema
-- ============================================================================
-- Run order: SECOND (after 001_extensions_and_enums.sql)
-- Description: Crea todas las tablas del MVP (13 tablas)
-- ============================================================================

-- ============================================================================
-- TABLA: profiles
-- Extiende auth.users de Supabase con datos públicos del perfil.
-- ============================================================================
CREATE TABLE public.profiles (
  id          UUID         PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT         UNIQUE,
  full_name   TEXT,
  avatar_url  TEXT,
  bio         TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~ '^[a-z0-9_]+$')
);

COMMENT ON TABLE public.profiles IS 'Perfil público del usuario, extiende auth.users.';

-- ============================================================================
-- TABLA: trips
-- El "viaje" — entidad central del producto. 1 trip = 1 scrapbook = 1 QR.
-- ============================================================================
CREATE TABLE public.trips (
  id                UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id          UUID              NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name              TEXT              NOT NULL,
  slug              TEXT              UNIQUE NOT NULL,
  destination       TEXT              NOT NULL,
  description       TEXT,
  cover_photo_url   TEXT,
  visibility        trip_visibility   NOT NULL DEFAULT 'private',
  start_date        DATE,
  end_date          DATE,
  archived          BOOLEAN           NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ       NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ       NOT NULL DEFAULT now(),

  CONSTRAINT name_not_empty       CHECK (char_length(trim(name)) > 0),
  CONSTRAINT name_max_length      CHECK (char_length(name) <= 100),
  CONSTRAINT destination_not_empty CHECK (char_length(trim(destination)) > 0),
  CONSTRAINT date_order           CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date),
  CONSTRAINT slug_format          CHECK (slug ~ '^[a-z0-9-]+$')
);

COMMENT ON TABLE public.trips IS 'Un viaje. Tiene 1 owner, N members, 1 QR único, N scrapbook entries.';
COMMENT ON COLUMN public.trips.slug IS 'URL pública: /t/{slug}. Auto-generada del nombre + sufijo random.';
COMMENT ON COLUMN public.trips.visibility IS 'private = solo miembros. public = todos pueden ver (también el QR scaneado por desconocidos).';

-- ============================================================================
-- TABLA: trip_members
-- Miembros invitados a un trip. Pueden estar registrados o no aún.
-- ============================================================================
CREATE TABLE public.trip_members (
  id          UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id     UUID                  NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id     UUID                  REFERENCES public.profiles(id) ON DELETE SET NULL,
  email       TEXT                  NOT NULL,
  role        trip_member_role      NOT NULL DEFAULT 'editor',
  status      trip_member_status    NOT NULL DEFAULT 'pending',
  invited_at  TIMESTAMPTZ           NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,

  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT unique_member_per_trip UNIQUE (trip_id, email)
);

COMMENT ON TABLE public.trip_members IS 'Miembros de un trip. user_id puede ser NULL si el email aún no se registró.';
COMMENT ON COLUMN public.trip_members.user_id IS 'NULL si el email aún no se registró. Se rellena automáticamente al registrarse.';

-- ============================================================================
-- TABLA: invitations
-- Invitaciones por email a usuarios NO registrados. Se promueven al registrarse.
-- ============================================================================
CREATE TABLE public.invitations (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT         NOT NULL,
  trip_id     UUID         NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  invited_by  UUID         NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token       TEXT         UNIQUE NOT NULL DEFAULT md5(random()::text || clock_timestamp()::text || gen_random_uuid()::text),
  expires_at  TIMESTAMPTZ  NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  accepted    BOOLEAN      NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

COMMENT ON TABLE public.invitations IS 'Invitaciones por email a usuarios sin cuenta. Token público para acceder al invite link.';

-- ============================================================================
-- TABLA: qr_codes
-- 1 QR único por trip. Resuelve a /t/{code} → muestra trip si público.
-- ============================================================================
CREATE TABLE public.qr_codes (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id       UUID         NOT NULL UNIQUE REFERENCES public.trips(id) ON DELETE CASCADE,
  code          TEXT         UNIQUE NOT NULL,
  scans_count   INTEGER      NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.qr_codes IS 'QR único por trip. Todas las pegatinas de un trip llevan el mismo QR.';
COMMENT ON COLUMN public.qr_codes.code IS 'Código de 16 caracteres hex generado al crear el trip. Es lo que codifica el QR físico.';
COMMENT ON COLUMN public.qr_codes.scans_count IS 'Contador para métricas: cuántas veces ha sido escaneado este QR.';

-- ============================================================================
-- TABLA: scrapbook_entries
-- Las fotos del scrapbook con geolocalización.
-- ============================================================================
CREATE TABLE public.scrapbook_entries (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id         UUID         NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  uploaded_by     UUID         NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  photo_url       TEXT         NOT NULL,
  thumbnail_url   TEXT,
  caption         TEXT,
  lat             DOUBLE PRECISION,
  lng             DOUBLE PRECISION,
  place_name      TEXT,
  taken_at        TIMESTAMPTZ,
  display_order   INTEGER      NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT caption_length     CHECK (caption IS NULL OR char_length(caption) <= 500),
  CONSTRAINT lat_range          CHECK (lat IS NULL OR (lat BETWEEN -90 AND 90)),
  CONSTRAINT lng_range          CHECK (lng IS NULL OR (lng BETWEEN -180 AND 180)),
  CONSTRAINT lat_lng_together   CHECK ((lat IS NULL AND lng IS NULL) OR (lat IS NOT NULL AND lng IS NOT NULL))
);

COMMENT ON TABLE public.scrapbook_entries IS 'Fotos del scrapbook. lat/lng nullable porque puede fallar GPS y rellenarse manualmente con place_name.';
COMMENT ON COLUMN public.scrapbook_entries.taken_at IS 'Fecha en que se tomó la foto (de EXIF o NOW si no hay metadata).';

-- ============================================================================
-- TABLA: sticker_templates
-- Catálogo de pegatinas predefinidas que cargamos nosotros.
-- ============================================================================
CREATE TABLE public.sticker_templates (
  id                  UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT              NOT NULL,
  category            TEXT              NOT NULL,
  image_url           TEXT              NOT NULL,
  available_shapes    sticker_shape[]   NOT NULL DEFAULT ARRAY['circle', 'square', 'rounded']::sticker_shape[],
  available_sizes     sticker_size[]    NOT NULL DEFAULT ARRAY['s', 'm', 'l']::sticker_size[],
  base_price_cents    INTEGER           NOT NULL DEFAULT 100,
  is_active           BOOLEAN           NOT NULL DEFAULT true,
  display_order       INTEGER           NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ       NOT NULL DEFAULT now(),

  CONSTRAINT name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT category_not_empty CHECK (char_length(trim(category)) > 0),
  CONSTRAINT price_positive CHECK (base_price_cents >= 0)
);

COMMENT ON TABLE public.sticker_templates IS 'Catálogo de plantillas predefinidas. category ej: travel, food, landmarks, retro.';

-- ============================================================================
-- TABLA: orders
-- Pedidos de e-commerce. Se crean por webhook de Stripe.
-- ============================================================================
CREATE TABLE public.orders (
  id                        UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                   UUID          NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  trip_id                   UUID          REFERENCES public.trips(id) ON DELETE SET NULL,
  stripe_session_id         TEXT          UNIQUE,
  stripe_payment_intent_id  TEXT          UNIQUE,
  status                    order_status  NOT NULL DEFAULT 'pending',
  total_amount_cents        INTEGER       NOT NULL,
  currency                  TEXT          NOT NULL DEFAULT 'EUR',
  shipping_address          JSONB,
  shipping_email            TEXT,
  shipping_phone            TEXT,
  notes                     TEXT,
  paid_at                   TIMESTAMPTZ,
  created_at                TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT total_positive CHECK (total_amount_cents >= 0),
  CONSTRAINT currency_iso   CHECK (char_length(currency) = 3)
);

COMMENT ON TABLE public.orders IS 'Pedido de e-commerce. trip_id se rellena DESPUÉS del checkout cuando el cliente completa el formulario.';
COMMENT ON COLUMN public.orders.shipping_address IS 'JSONB: {street, city, postal_code, country, recipient_name}';

-- ============================================================================
-- TABLA: order_items
-- Items individuales dentro de un pedido (cada línea de pegatinas).
-- ============================================================================
CREATE TABLE public.order_items (
  id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            UUID            NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  type                sticker_type    NOT NULL,
  template_id         UUID            REFERENCES public.sticker_templates(id) ON DELETE RESTRICT,
  custom_image_url    TEXT,
  quantity            INTEGER         NOT NULL,
  shape               sticker_shape   NOT NULL,
  size                sticker_size    NOT NULL,
  unit_price_cents    INTEGER         NOT NULL,
  created_at          TIMESTAMPTZ     NOT NULL DEFAULT now(),

  CONSTRAINT quantity_positive   CHECK (quantity > 0),
  CONSTRAINT unit_price_positive CHECK (unit_price_cents >= 0),
  CONSTRAINT type_consistency CHECK (
    (type = 'template' AND template_id IS NOT NULL AND custom_image_url IS NULL) OR
    (type = 'custom' AND template_id IS NULL AND custom_image_url IS NOT NULL)
  )
);

COMMENT ON TABLE public.order_items IS 'Una línea por tipo de pegatina pedida. Si type=template debe haber template_id; si custom debe haber custom_image_url.';

-- ============================================================================
-- TABLA: production_queue
-- Cola manual para gestionar pedidos con la imprenta local.
-- ============================================================================
CREATE TABLE public.production_queue (
  id                    UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id              UUID                NOT NULL UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
  status                production_status   NOT NULL DEFAULT 'queued',
  sent_to_printer_at    TIMESTAMPTZ,
  printed_at            TIMESTAMPTZ,
  shipped_at            TIMESTAMPTZ,
  delivered_at          TIMESTAMPTZ,
  tracking_number       TEXT,
  carrier               TEXT,
  printer_notes         TEXT,
  internal_notes        TEXT,
  created_at            TIMESTAMPTZ         NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ         NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.production_queue IS 'Cola que Arthur usa para gestionar manualmente la producción con su imprenta local.';

-- ============================================================================
-- TABLAS RESERVADAS PARA v1.1 (creadas pero sin uso aún)
-- ============================================================================

-- Tracking de escaneos virales (cuando un anónimo escanea un QR público)
CREATE TABLE public.viral_scans (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code_id  UUID         NOT NULL REFERENCES public.qr_codes(id) ON DELETE CASCADE,
  user_id     UUID         REFERENCES public.profiles(id) ON DELETE SET NULL,
  scanned_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  ip_hash     TEXT,
  user_agent  TEXT,
  referrer    TEXT,
  converted   BOOLEAN      NOT NULL DEFAULT false
);

COMMENT ON TABLE public.viral_scans IS 'V1.1 — Tracking de escaneos para medir coeficiente viral K. user_id NULL si anónimo.';

-- Notificaciones push/in-app (reservada v1.1)
CREATE TABLE public.notifications (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID         NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type        TEXT         NOT NULL,
  title       TEXT         NOT NULL,
  body        TEXT,
  data        JSONB,
  read        BOOLEAN      NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.notifications IS 'V1.1 — Notificaciones in-app. type ej: trip_invite, new_photo, comment.';

-- ============================================================================
-- TRIGGER updated_at automático en tablas con ese campo
-- ============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_trips BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_production_queue BEFORE UPDATE ON public.production_queue
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
