-- ============================================================================
-- Memento Mundi — Migration 005: RLS Policies
-- ============================================================================
-- Run order: FIFTH (after 004_functions_and_triggers.sql)
-- Description: Row Level Security policies — CRÍTICO para la seguridad
--
-- Reglas de negocio:
-- 1. Trips públicos: cualquiera (incluso anónimo) puede LEER trip + entries.
-- 2. Trips privados: solo owner + miembros aceptados pueden LEER.
-- 3. Subir fotos: SOLO miembros aceptados (owner siempre es miembro).
-- 4. Editar/borrar foto: solo el autor o el owner.
-- 5. Modificar trip: solo el owner.
-- 6. Orders/items: solo el comprador puede leer; nadie escribe (service_role).
-- ============================================================================

-- ============================================================================
-- HABILITAR RLS EN TODAS LAS TABLAS
-- ============================================================================
ALTER TABLE public.profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_members        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrapbook_entries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sticker_templates   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_queue    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viral_scans         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications       ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- profiles
-- ============================================================================

-- Cualquiera puede ver perfiles (son públicos por diseño, como Twitter)
CREATE POLICY "Profiles are publicly viewable"
  ON public.profiles FOR SELECT
  USING (true);

-- Solo el propio user puede actualizar su profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- INSERT solo via trigger handle_new_user() (security definer)
-- DELETE no permitido (cascade desde auth.users)

-- ============================================================================
-- trips
-- ============================================================================

-- SELECT: público si visibility='public', o si user es miembro/owner
CREATE POLICY "Public trips are viewable by everyone"
  ON public.trips FOR SELECT
  USING (
    visibility = 'public'
    OR auth.uid() = owner_id
    OR public.is_trip_member(id, auth.uid())
  );

-- INSERT: el user autenticado puede crear trips (será owner)
CREATE POLICY "Authenticated users can create trips"
  ON public.trips FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- UPDATE: solo el owner
CREATE POLICY "Trip owners can update their trips"
  ON public.trips FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- DELETE: solo el owner
CREATE POLICY "Trip owners can delete their trips"
  ON public.trips FOR DELETE
  USING (auth.uid() = owner_id);

-- ============================================================================
-- trip_members
-- ============================================================================

-- SELECT: el owner ve a todos, cada miembro se ve a sí mismo
-- También: si el trip es público, todos pueden ver la lista de miembros
CREATE POLICY "Members and owner can view trip members"
  ON public.trip_members FOR SELECT
  USING (
    auth.uid() = user_id
    OR public.is_trip_owner(trip_id, auth.uid())
    OR public.is_trip_public(trip_id)
  );

-- INSERT: solo el owner del trip puede añadir miembros
CREATE POLICY "Trip owners can add members"
  ON public.trip_members FOR INSERT
  WITH CHECK (public.is_trip_owner(trip_id, auth.uid()));

-- UPDATE: el owner puede cambiar role; el miembro puede cambiar su propio status
CREATE POLICY "Owners and members can update appropriately"
  ON public.trip_members FOR UPDATE
  USING (
    public.is_trip_owner(trip_id, auth.uid())
    OR auth.uid() = user_id
  )
  WITH CHECK (
    public.is_trip_owner(trip_id, auth.uid())
    OR auth.uid() = user_id
  );

-- DELETE: el owner puede sacar miembros; el miembro puede salirse
CREATE POLICY "Owners and members can remove themselves"
  ON public.trip_members FOR DELETE
  USING (
    public.is_trip_owner(trip_id, auth.uid())
    OR auth.uid() = user_id
  );

-- ============================================================================
-- invitations
-- ============================================================================

-- SELECT: solo via token público (manejado en API) o si es el invitado logueado
CREATE POLICY "Invitations viewable by invited email"
  ON public.invitations FOR SELECT
  USING (
    -- El user logueado coincide con el email invitado
    email IN (SELECT email FROM auth.users WHERE id = auth.uid())
    OR public.is_trip_owner(trip_id, auth.uid())
  );

-- INSERT: solo el owner del trip
CREATE POLICY "Trip owners can create invitations"
  ON public.invitations FOR INSERT
  WITH CHECK (
    auth.uid() = invited_by
    AND public.is_trip_owner(trip_id, auth.uid())
  );

-- DELETE: solo el owner que creó la invitación
CREATE POLICY "Trip owners can revoke invitations"
  ON public.invitations FOR DELETE
  USING (auth.uid() = invited_by);

-- UPDATE no se permite — invitations son inmutables (se aceptan via trigger)

-- ============================================================================
-- qr_codes
-- ============================================================================

-- SELECT: público (lookup por code para resolver /t/{code})
-- El JOIN con trips ya filtra visibilidad en queries de la app
CREATE POLICY "QR codes are publicly viewable"
  ON public.qr_codes FOR SELECT
  USING (true);

-- INSERT/UPDATE/DELETE: NUNCA via cliente, solo service_role
-- (creados automáticamente por trigger create_qr_for_trip)

-- ============================================================================
-- scrapbook_entries
-- ============================================================================

-- SELECT: si trip público → cualquiera. Si privado → owner + miembros aceptados
CREATE POLICY "Scrapbook entries follow trip visibility"
  ON public.scrapbook_entries FOR SELECT
  USING (
    public.is_trip_public(trip_id)
    OR public.is_trip_owner(trip_id, auth.uid())
    OR public.is_trip_member(trip_id, auth.uid())
  );

-- INSERT: solo miembros aceptados del trip pueden subir fotos
CREATE POLICY "Trip members can upload photos"
  ON public.scrapbook_entries FOR INSERT
  WITH CHECK (
    auth.uid() = uploaded_by
    AND (
      public.is_trip_owner(trip_id, auth.uid())
      OR public.is_trip_member(trip_id, auth.uid())
    )
  );

-- UPDATE: el autor de la foto o el owner del trip
CREATE POLICY "Photo author or trip owner can update"
  ON public.scrapbook_entries FOR UPDATE
  USING (
    auth.uid() = uploaded_by
    OR public.is_trip_owner(trip_id, auth.uid())
  )
  WITH CHECK (
    auth.uid() = uploaded_by
    OR public.is_trip_owner(trip_id, auth.uid())
  );

-- DELETE: el autor de la foto o el owner del trip
CREATE POLICY "Photo author or trip owner can delete"
  ON public.scrapbook_entries FOR DELETE
  USING (
    auth.uid() = uploaded_by
    OR public.is_trip_owner(trip_id, auth.uid())
  );

-- ============================================================================
-- sticker_templates
-- ============================================================================

-- SELECT: público (catálogo)
CREATE POLICY "Sticker templates are public"
  ON public.sticker_templates FOR SELECT
  USING (is_active = true);

-- INSERT/UPDATE/DELETE: solo service_role (admin via Supabase Studio)

-- ============================================================================
-- orders
-- ============================================================================

-- SELECT: solo el propio user
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: solo service_role (vía webhook Stripe)
-- UPDATE: solo service_role
-- DELETE: nunca

-- ============================================================================
-- order_items
-- ============================================================================

-- SELECT: solo el dueño del order padre
CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
  );

-- INSERT/UPDATE/DELETE: solo service_role

-- ============================================================================
-- production_queue
-- ============================================================================

-- SELECT: solo el dueño del order para tracking del estado
CREATE POLICY "Users can view their order production status"
  ON public.production_queue FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = production_queue.order_id
        AND orders.user_id = auth.uid()
    )
  );

-- INSERT/UPDATE/DELETE: solo service_role (panel admin)

-- ============================================================================
-- viral_scans (v1.1)
-- ============================================================================

-- SELECT: el owner del trip puede ver sus métricas de escaneos
CREATE POLICY "Trip owners can view scan metrics"
  ON public.viral_scans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.qr_codes qc
      JOIN public.trips t ON t.id = qc.trip_id
      WHERE qc.id = viral_scans.qr_code_id
        AND t.owner_id = auth.uid()
    )
  );

-- INSERT: anónimo permitido (vía endpoint público)
CREATE POLICY "Anyone can register a scan"
  ON public.viral_scans FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- notifications (v1.1)
-- ============================================================================

-- SELECT: solo el destinatario
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

-- UPDATE: solo el destinatario (para marcar como leída)
CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- INSERT/DELETE: solo service_role
