-- ============================================================================
-- Memento Mundi — Migration 001: Extensions and ENUMs
-- ============================================================================
-- Run order: FIRST
-- Description: Habilita extensions de PostgreSQL necesarias y define ENUMs
-- ============================================================================

-- Extensions necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";       -- Para uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";        -- Para gen_random_bytes(), gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";         -- Para búsqueda fuzzy en nombres de viajes (futuro)

-- ============================================================================
-- ENUMs
-- ============================================================================

-- Visibilidad de un trip
CREATE TYPE trip_visibility AS ENUM ('private', 'public');

-- Roles dentro de un trip
CREATE TYPE trip_member_role AS ENUM ('owner', 'editor', 'viewer');

-- Estados de un miembro invitado
CREATE TYPE trip_member_status AS ENUM ('pending', 'accepted', 'declined');

-- Estados de un pedido (e-commerce)
CREATE TYPE order_status AS ENUM (
  'pending',          -- Recién creado, esperando confirmación de pago
  'paid',             -- Pago confirmado por Stripe webhook
  'in_production',    -- Enviado a imprenta local
  'shipped',          -- Enviado al cliente
  'delivered',        -- Confirmado entregado
  'cancelled',        -- Cancelado/reembolsado
  'failed'            -- Pago falló
);

-- Estados de la cola de producción manual
CREATE TYPE production_status AS ENUM (
  'queued',           -- Esperando a ser procesado por Arthur
  'sent_to_printer',  -- Diseño enviado a empresa local
  'printing',         -- En producción
  'printed',          -- Impreso, esperando envío
  'shipped',          -- Enviado al cliente
  'delivered',        -- Entregado
  'reprint_needed'    -- Hay que reimprimir (defecto, error)
);

-- Tipo de pegatina dentro de un order_item
CREATE TYPE sticker_type AS ENUM ('template', 'custom');

-- Forma física de la pegatina
CREATE TYPE sticker_shape AS ENUM ('circle', 'square', 'rounded', 'die_cut');

-- Tamaño físico de la pegatina (s=2cm, m=4cm, l=6cm, xl=8cm aprox)
CREATE TYPE sticker_size AS ENUM ('s', 'm', 'l', 'xl');

-- ============================================================================
-- COMMENTS para documentación in-DB
-- ============================================================================
COMMENT ON TYPE trip_visibility IS 'private = solo miembros logueados pueden ver. public = cualquiera puede ver (incluso anónimo).';
COMMENT ON TYPE trip_member_role IS 'owner solo puede haber uno por trip. editor puede subir/editar fotos. viewer solo lectura (reservado v1.1).';
COMMENT ON TYPE trip_member_status IS 'pending = email enviado, esperando aceptación. accepted = activo en el trip. declined = rechazó la invitación.';
COMMENT ON TYPE order_status IS 'Flujo: pending → paid → in_production → shipped → delivered. Si falla el pago: failed. Si se cancela: cancelled.';
COMMENT ON TYPE production_status IS 'Flujo manual gestionado por Arthur con la imprenta local de su pueblo.';
