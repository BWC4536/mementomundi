-- ============================================================================
-- Memento Mundi — Migration 003: Indexes
-- ============================================================================
-- Run order: THIRD (after 002_initial_schema.sql)
-- Description: Índices para optimizar queries frecuentes
-- ============================================================================

-- ============================================================================
-- profiles
-- ============================================================================
CREATE INDEX idx_profiles_username ON public.profiles(username) WHERE username IS NOT NULL;

-- ============================================================================
-- trips
-- ============================================================================
CREATE INDEX idx_trips_owner_id          ON public.trips(owner_id);
CREATE INDEX idx_trips_slug              ON public.trips(slug);
CREATE INDEX idx_trips_visibility_public ON public.trips(visibility) WHERE visibility = 'public';
CREATE INDEX idx_trips_archived          ON public.trips(archived) WHERE archived = false;
CREATE INDEX idx_trips_created_at        ON public.trips(created_at DESC);

-- ============================================================================
-- trip_members
-- ============================================================================
CREATE INDEX idx_trip_members_trip_id ON public.trip_members(trip_id);
CREATE INDEX idx_trip_members_user_id ON public.trip_members(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_trip_members_email   ON public.trip_members(email);
CREATE INDEX idx_trip_members_status  ON public.trip_members(status);

-- ============================================================================
-- invitations
-- ============================================================================
CREATE INDEX idx_invitations_email   ON public.invitations(email);
CREATE INDEX idx_invitations_token   ON public.invitations(token);
CREATE INDEX idx_invitations_trip_id ON public.invitations(trip_id);
CREATE INDEX idx_invitations_pending ON public.invitations(accepted, expires_at) WHERE accepted = false;

-- ============================================================================
-- qr_codes
-- ============================================================================
CREATE INDEX idx_qr_codes_code    ON public.qr_codes(code);
CREATE INDEX idx_qr_codes_trip_id ON public.qr_codes(trip_id);

-- ============================================================================
-- scrapbook_entries
-- ============================================================================
CREATE INDEX idx_scrapbook_entries_trip_id      ON public.scrapbook_entries(trip_id);
CREATE INDEX idx_scrapbook_entries_uploaded_by  ON public.scrapbook_entries(uploaded_by);
CREATE INDEX idx_scrapbook_entries_created_at   ON public.scrapbook_entries(created_at DESC);
CREATE INDEX idx_scrapbook_entries_taken_at     ON public.scrapbook_entries(taken_at DESC) WHERE taken_at IS NOT NULL;

-- Índice GIST para queries geoespaciales (radio, distancia)
-- Nota: si se activa PostGIS más adelante, reemplazar con GEOMETRY type
CREATE INDEX idx_scrapbook_entries_geo
  ON public.scrapbook_entries USING gist (point(lng, lat))
  WHERE lat IS NOT NULL AND lng IS NOT NULL;

-- ============================================================================
-- sticker_templates
-- ============================================================================
CREATE INDEX idx_sticker_templates_active     ON public.sticker_templates(is_active) WHERE is_active = true;
CREATE INDEX idx_sticker_templates_category   ON public.sticker_templates(category);

-- ============================================================================
-- orders
-- ============================================================================
CREATE INDEX idx_orders_user_id        ON public.orders(user_id);
CREATE INDEX idx_orders_trip_id        ON public.orders(trip_id) WHERE trip_id IS NOT NULL;
CREATE INDEX idx_orders_status         ON public.orders(status);
CREATE INDEX idx_orders_stripe_session ON public.orders(stripe_session_id) WHERE stripe_session_id IS NOT NULL;
CREATE INDEX idx_orders_created_at     ON public.orders(created_at DESC);

-- ============================================================================
-- order_items
-- ============================================================================
CREATE INDEX idx_order_items_order_id    ON public.order_items(order_id);
CREATE INDEX idx_order_items_template_id ON public.order_items(template_id) WHERE template_id IS NOT NULL;

-- ============================================================================
-- production_queue
-- ============================================================================
CREATE INDEX idx_production_queue_status   ON public.production_queue(status);
CREATE INDEX idx_production_queue_order_id ON public.production_queue(order_id);

-- ============================================================================
-- viral_scans (v1.1)
-- ============================================================================
CREATE INDEX idx_viral_scans_qr_code_id ON public.viral_scans(qr_code_id);
CREATE INDEX idx_viral_scans_scanned_at ON public.viral_scans(scanned_at DESC);

-- ============================================================================
-- notifications (v1.1)
-- ============================================================================
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, read) WHERE read = false;
CREATE INDEX idx_notifications_created_at  ON public.notifications(created_at DESC);
