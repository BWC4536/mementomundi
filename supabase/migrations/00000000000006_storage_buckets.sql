-- ============================================================================
-- Memento Mundi — Migration 006: Storage Buckets and Storage RLS
-- ============================================================================
-- Run order: SIXTH (after 005_rls_policies.sql)
-- Description: Crea buckets de Supabase Storage y aplica RLS
--
-- IMPORTANTE: Estas instrucciones DEBEN ejecutarse desde el dashboard de
-- Supabase o vía API, ya que CREATE BUCKET no es SQL estándar.
-- Este archivo documenta la configuración esperada como SQL pseudocode +
-- las policies de storage.objects que sí son SQL real.
-- ============================================================================

-- ============================================================================
-- BUCKETS A CREAR (vía dashboard de Supabase Storage o supabase.storage.createBucket)
-- ============================================================================
-- 1. avatars            (public)   - Fotos de perfil
-- 2. trip-covers        (public)   - Foto de portada del trip
-- 3. scrapbook-photos   (private)  - Fotos del scrapbook (RLS-controlled)
-- 4. custom-stickers    (private)  - Imágenes para pegatinas custom
-- ============================================================================

-- Crear buckets via SQL (Supabase storage extension)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('avatars',           'avatars',          true,  2097152,  ARRAY['image/jpeg','image/png','image/webp']),
  ('trip-covers',       'trip-covers',      true,  5242880,  ARRAY['image/jpeg','image/png','image/webp']),
  ('scrapbook-photos',  'scrapbook-photos', false, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/heic']),
  ('custom-stickers',   'custom-stickers',  false, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- POLICIES: avatars
-- ============================================================================

-- Cualquiera puede ver avatares
CREATE POLICY "Avatars are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Solo el user puede subir su propio avatar (path: {user_id}/avatar.jpg)
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================================
-- POLICIES: trip-covers
-- ============================================================================

-- Path estructura: {trip_id}/cover.jpg
-- Cualquiera puede ver covers (la app filtra visibilidad por trip)
CREATE POLICY "Trip covers are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'trip-covers');

-- Solo el owner del trip puede subir/cambiar la portada
CREATE POLICY "Trip owners can upload cover"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'trip-covers'
    AND EXISTS (
      SELECT 1 FROM public.trips
      WHERE trips.id::text = (storage.foldername(name))[1]
        AND trips.owner_id = auth.uid()
    )
  );

CREATE POLICY "Trip owners can update cover"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'trip-covers'
    AND EXISTS (
      SELECT 1 FROM public.trips
      WHERE trips.id::text = (storage.foldername(name))[1]
        AND trips.owner_id = auth.uid()
    )
  );

CREATE POLICY "Trip owners can delete cover"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'trip-covers'
    AND EXISTS (
      SELECT 1 FROM public.trips
      WHERE trips.id::text = (storage.foldername(name))[1]
        AND trips.owner_id = auth.uid()
    )
  );

-- ============================================================================
-- POLICIES: scrapbook-photos
-- ============================================================================

-- Path estructura: {trip_id}/{entry_id}.jpg
-- SELECT: si trip público → todos. Si privado → owner + miembros
CREATE POLICY "Scrapbook photos follow trip visibility"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'scrapbook-photos'
    AND (
      -- Trip público
      EXISTS (
        SELECT 1 FROM public.trips
        WHERE trips.id::text = (storage.foldername(name))[1]
          AND trips.visibility = 'public'
      )
      -- O user es miembro/owner
      OR EXISTS (
        SELECT 1 FROM public.trips
        WHERE trips.id::text = (storage.foldername(name))[1]
          AND (
            trips.owner_id = auth.uid()
            OR public.is_trip_member(trips.id, auth.uid())
          )
      )
    )
  );

-- INSERT: solo miembros del trip
CREATE POLICY "Trip members can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'scrapbook-photos'
    AND auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.trips
      WHERE trips.id::text = (storage.foldername(name))[1]
        AND (
          trips.owner_id = auth.uid()
          OR public.is_trip_member(trips.id, auth.uid())
        )
    )
  );

-- UPDATE: el que subió o el owner
CREATE POLICY "Uploaders or trip owners can update photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'scrapbook-photos'
    AND (
      owner = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.trips
        WHERE trips.id::text = (storage.foldername(name))[1]
          AND trips.owner_id = auth.uid()
      )
    )
  );

-- DELETE: el que subió o el owner del trip
CREATE POLICY "Uploaders or trip owners can delete photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'scrapbook-photos'
    AND (
      owner = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.trips
        WHERE trips.id::text = (storage.foldername(name))[1]
          AND trips.owner_id = auth.uid()
      )
    )
  );

-- ============================================================================
-- POLICIES: custom-stickers
-- ============================================================================

-- Path estructura: {user_id}/{order_item_id}.jpg
-- SELECT: solo el user que subió + admin (service_role)
CREATE POLICY "Users can view their custom stickers"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'custom-stickers'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- INSERT: solo el user en su propia carpeta
CREATE POLICY "Users can upload their custom stickers"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'custom-stickers'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- DELETE: solo el user
CREATE POLICY "Users can delete their custom stickers"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'custom-stickers'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
