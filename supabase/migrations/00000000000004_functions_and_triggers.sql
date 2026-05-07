-- ============================================================================
-- Memento Mundi — Migration 004: Functions and Triggers
-- ============================================================================
-- Run order: FOURTH (after 003_indexes.sql)
-- Description: Lógica automática del dominio (slugs, QR, profiles, invites)
-- ============================================================================

-- ============================================================================
-- FUNCTION: handle_new_user
-- Cuando alguien se registra en auth.users → crea profile automáticamente
-- También promueve invitaciones pendientes para ese email
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Crear profile vacío
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );

  -- Promover invitaciones pendientes que coincidan con este email
  -- Marca trip_members existentes como aceptados y vincula el user_id
  UPDATE public.trip_members
  SET user_id = NEW.id,
      status = 'accepted',
      accepted_at = now()
  WHERE email = NEW.email
    AND user_id IS NULL
    AND status = 'pending';

  -- Marca invitations como aceptadas
  UPDATE public.invitations
  SET accepted = true
  WHERE email = NEW.email
    AND accepted = false
    AND expires_at > now();

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user IS 'Crea profile + promueve invitaciones pending al registrarse.';

-- ============================================================================
-- FUNCTION: generate_trip_slug
-- Genera slug automáticamente: slugify(name) + '-' + 6 chars hex
-- Ej: "Verano en Grecia" → "verano-en-grecia-a3f9k2"
-- ============================================================================
CREATE OR REPLACE FUNCTION public.generate_trip_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  base_slug TEXT;
  random_suffix TEXT;
  attempts INTEGER := 0;
  final_slug TEXT;
BEGIN
  -- Si ya viene con slug, no tocar
  IF NEW.slug IS NOT NULL AND NEW.slug != '' THEN
    RETURN NEW;
  END IF;

  -- Slugify del nombre: lowercase, eliminar acentos, espacios → guiones
  base_slug := lower(unaccent(NEW.name));
  base_slug := regexp_replace(base_slug, '[^a-z0-9]+', '-', 'g');
  base_slug := trim(both '-' from base_slug);

  -- Truncar si es muy largo
  IF char_length(base_slug) > 50 THEN
    base_slug := substring(base_slug, 1, 50);
  END IF;

  -- Si quedó vacío (caso edge: nombre solo con caracteres especiales)
  IF base_slug = '' THEN
    base_slug := 'trip';
  END IF;

  -- Loop para garantizar unicidad (max 10 intentos)
  LOOP
    random_suffix := substring(md5(random()::text || clock_timestamp()::text) FROM 1 FOR 6);
    final_slug := base_slug || '-' || random_suffix;

    -- Verificar que no existe
    IF NOT EXISTS (SELECT 1 FROM public.trips WHERE slug = final_slug) THEN
      NEW.slug := final_slug;
      RETURN NEW;
    END IF;

    attempts := attempts + 1;
    IF attempts >= 10 THEN
      -- Fallback: usar UUID truncado
      NEW.slug := base_slug || '-' || substring(gen_random_uuid()::text FROM 1 FOR 8);
      RETURN NEW;
    END IF;
  END LOOP;
END;
$$;

-- Necesitamos extension unaccent para quitar acentos
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TRIGGER on_trip_insert_generate_slug
  BEFORE INSERT ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.generate_trip_slug();

COMMENT ON FUNCTION public.generate_trip_slug IS 'Genera slug único: slugify(name) + sufijo hex de 6 chars.';

-- ============================================================================
-- FUNCTION: create_qr_for_trip
-- Cuando se crea un trip, crear automáticamente su QR único
-- ============================================================================
CREATE OR REPLACE FUNCTION public.create_qr_for_trip()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  qr_code TEXT;
  attempts INTEGER := 0;
BEGIN
  -- Loop para garantizar unicidad del code
  LOOP
    qr_code := substring(md5(random()::text || clock_timestamp()::text || gen_random_uuid()::text) FROM 1 FOR 16);

    IF NOT EXISTS (SELECT 1 FROM public.qr_codes WHERE code = qr_code) THEN
      INSERT INTO public.qr_codes (trip_id, code) VALUES (NEW.id, qr_code);
      EXIT;
    END IF;

    attempts := attempts + 1;
    IF attempts >= 10 THEN
      RAISE EXCEPTION 'No se pudo generar un QR único después de 10 intentos';
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_trip_created_make_qr
  AFTER INSERT ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.create_qr_for_trip();

COMMENT ON FUNCTION public.create_qr_for_trip IS 'Crea automáticamente el QR único asociado a un trip recién creado.';

-- ============================================================================
-- FUNCTION: add_owner_as_trip_member
-- Cuando se crea un trip, añadir al owner como miembro automáticamente
-- ============================================================================
CREATE OR REPLACE FUNCTION public.add_owner_as_trip_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  owner_email TEXT;
BEGIN
  -- Obtener email del owner desde auth.users
  SELECT email INTO owner_email
  FROM auth.users
  WHERE id = NEW.owner_id;

  IF owner_email IS NOT NULL THEN
    INSERT INTO public.trip_members (trip_id, user_id, email, role, status, accepted_at)
    VALUES (NEW.id, NEW.owner_id, owner_email, 'owner', 'accepted', now());
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_trip_created_add_owner_member
  AFTER INSERT ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.add_owner_as_trip_member();

COMMENT ON FUNCTION public.add_owner_as_trip_member IS 'Añade automáticamente al owner como trip_member con role=owner.';

-- ============================================================================
-- FUNCTION: increment_qr_scan_count
-- Llamada manualmente desde el endpoint /api/qr/scan al escanear
-- ============================================================================
CREATE OR REPLACE FUNCTION public.increment_qr_scan_count(qr_code_input TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  trip_id_result UUID;
BEGIN
  UPDATE public.qr_codes
  SET scans_count = scans_count + 1
  WHERE code = qr_code_input
  RETURNING trip_id INTO trip_id_result;

  RETURN trip_id_result;
END;
$$;

COMMENT ON FUNCTION public.increment_qr_scan_count IS 'Incrementa contador de escaneos y devuelve el trip_id asociado.';

-- ============================================================================
-- FUNCTION: is_trip_member
-- Helper para usar en RLS policies — verifica si user es miembro de un trip
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_trip_member(trip_id_input UUID, user_id_input UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.trip_members
    WHERE trip_id = trip_id_input
      AND user_id = user_id_input
      AND status = 'accepted'
  );
$$;

COMMENT ON FUNCTION public.is_trip_member IS 'Helper para RLS: ¿el user es miembro aceptado del trip?';

-- ============================================================================
-- FUNCTION: is_trip_owner
-- Helper para RLS — verifica si user es owner de un trip
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_trip_owner(trip_id_input UUID, user_id_input UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.trips
    WHERE id = trip_id_input
      AND owner_id = user_id_input
  );
$$;

COMMENT ON FUNCTION public.is_trip_owner IS 'Helper para RLS: ¿el user es owner del trip?';

-- ============================================================================
-- FUNCTION: is_trip_public
-- Helper para RLS — verifica si un trip es público
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_trip_public(trip_id_input UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.trips
    WHERE id = trip_id_input
      AND visibility = 'public'
  );
$$;

COMMENT ON FUNCTION public.is_trip_public IS 'Helper para RLS: ¿el trip es público?';
