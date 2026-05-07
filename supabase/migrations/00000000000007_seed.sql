-- ============================================================================
-- Memento Mundi — Migration 007: Seed Data
-- ============================================================================
-- Run order: SEVENTH (last)
-- Description: Datos iniciales para desarrollo/testing.
--              Solo ejecutar en dev — NO en producción salvo el catálogo.
-- ============================================================================

-- ============================================================================
-- SEED: sticker_templates
-- Catálogo inicial de pegatinas predefinidas (ejemplos placeholder)
-- En producción real, las imágenes reales se cargan vía Supabase Studio
-- ============================================================================

INSERT INTO public.sticker_templates (name, category, image_url, available_shapes, available_sizes, base_price_cents, display_order)
VALUES
  -- Categoría: Travel
  ('Avión retro',           'travel',     'https://placeholder.mementomundi.com/stickers/plane-retro.svg',     ARRAY['circle','rounded']::sticker_shape[],            ARRAY['s','m','l']::sticker_size[],     150, 1),
  ('Maleta vintage',        'travel',     'https://placeholder.mementomundi.com/stickers/suitcase.svg',        ARRAY['rounded','die_cut']::sticker_shape[],           ARRAY['s','m','l']::sticker_size[],     150, 2),
  ('Brújula',               'travel',     'https://placeholder.mementomundi.com/stickers/compass.svg',         ARRAY['circle']::sticker_shape[],                      ARRAY['s','m','l']::sticker_size[],     130, 3),
  ('Mapa del mundo',        'travel',     'https://placeholder.mementomundi.com/stickers/world-map.svg',       ARRAY['circle','square','rounded']::sticker_shape[],   ARRAY['m','l','xl']::sticker_size[],    180, 4),
  ('Pasaporte',             'travel',     'https://placeholder.mementomundi.com/stickers/passport.svg',        ARRAY['rounded']::sticker_shape[],                     ARRAY['s','m']::sticker_size[],         140, 5),

  -- Categoría: Landmarks
  ('Torre Eiffel',          'landmarks',  'https://placeholder.mementomundi.com/stickers/eiffel.svg',          ARRAY['die_cut']::sticker_shape[],                     ARRAY['m','l']::sticker_size[],         200, 6),
  ('Coliseo',               'landmarks',  'https://placeholder.mementomundi.com/stickers/colosseum.svg',       ARRAY['die_cut','rounded']::sticker_shape[],           ARRAY['m','l']::sticker_size[],         200, 7),
  ('Big Ben',               'landmarks',  'https://placeholder.mementomundi.com/stickers/big-ben.svg',         ARRAY['die_cut']::sticker_shape[],                     ARRAY['m','l']::sticker_size[],         200, 8),
  ('Estatua de la libertad','landmarks',  'https://placeholder.mementomundi.com/stickers/liberty.svg',         ARRAY['die_cut']::sticker_shape[],                     ARRAY['m','l']::sticker_size[],         200, 9),
  ('Sagrada Familia',       'landmarks',  'https://placeholder.mementomundi.com/stickers/sagrada.svg',         ARRAY['die_cut']::sticker_shape[],                     ARRAY['m','l']::sticker_size[],         200, 10),

  -- Categoría: Food & Drink
  ('Croissant',             'food',       'https://placeholder.mementomundi.com/stickers/croissant.svg',       ARRAY['die_cut','rounded']::sticker_shape[],           ARRAY['s','m']::sticker_size[],         120, 11),
  ('Pizza',                 'food',       'https://placeholder.mementomundi.com/stickers/pizza.svg',           ARRAY['circle','die_cut']::sticker_shape[],            ARRAY['s','m']::sticker_size[],         120, 12),
  ('Tapas',                 'food',       'https://placeholder.mementomundi.com/stickers/tapas.svg',           ARRAY['rounded']::sticker_shape[],                     ARRAY['s','m']::sticker_size[],         120, 13),
  ('Cocktail tropical',     'food',       'https://placeholder.mementomundi.com/stickers/cocktail.svg',        ARRAY['die_cut']::sticker_shape[],                     ARRAY['s','m']::sticker_size[],         120, 14),
  ('Café',                  'food',       'https://placeholder.mementomundi.com/stickers/coffee.svg',          ARRAY['circle']::sticker_shape[],                      ARRAY['s','m']::sticker_size[],         110, 15),

  -- Categoría: Nature
  ('Palmera',               'nature',     'https://placeholder.mementomundi.com/stickers/palm.svg',            ARRAY['die_cut','rounded']::sticker_shape[],           ARRAY['s','m','l']::sticker_size[],     140, 16),
  ('Montaña',               'nature',     'https://placeholder.mementomundi.com/stickers/mountain.svg',        ARRAY['die_cut','rounded']::sticker_shape[],           ARRAY['s','m','l']::sticker_size[],     140, 17),
  ('Sol',                   'nature',     'https://placeholder.mementomundi.com/stickers/sun.svg',             ARRAY['circle']::sticker_shape[],                      ARRAY['s','m']::sticker_size[],         100, 18),
  ('Ola',                   'nature',     'https://placeholder.mementomundi.com/stickers/wave.svg',            ARRAY['die_cut']::sticker_shape[],                     ARRAY['s','m','l']::sticker_size[],     130, 19),
  ('Cactus',                'nature',     'https://placeholder.mementomundi.com/stickers/cactus.svg',          ARRAY['die_cut']::sticker_shape[],                     ARRAY['s','m']::sticker_size[],         120, 20),

  -- Categoría: Retro / Gen Z aesthetic
  ('Polaroid',              'retro',      'https://placeholder.mementomundi.com/stickers/polaroid.svg',        ARRAY['square']::sticker_shape[],                      ARRAY['m','l']::sticker_size[],         150, 21),
  ('Casette',               'retro',      'https://placeholder.mementomundi.com/stickers/cassette.svg',        ARRAY['rounded']::sticker_shape[],                     ARRAY['m','l']::sticker_size[],         150, 22),
  ('Cámara analógica',      'retro',      'https://placeholder.mementomundi.com/stickers/camera.svg',          ARRAY['die_cut','rounded']::sticker_shape[],           ARRAY['s','m']::sticker_size[],         150, 23),
  ('Vinyl',                 'retro',      'https://placeholder.mementomundi.com/stickers/vinyl.svg',           ARRAY['circle']::sticker_shape[],                      ARRAY['m','l']::sticker_size[],         140, 24),
  ('Walkman',               'retro',      'https://placeholder.mementomundi.com/stickers/walkman.svg',         ARRAY['die_cut']::sticker_shape[],                     ARRAY['m','l']::sticker_size[],         160, 25),

  -- Categoría: Mood / Frases
  ('Wanderlust',            'mood',       'https://placeholder.mementomundi.com/stickers/wanderlust.svg',      ARRAY['rounded','square']::sticker_shape[],            ARRAY['m','l']::sticker_size[],         130, 26),
  ('Memento Mundi',         'mood',       'https://placeholder.mementomundi.com/stickers/memento-mundi.svg',   ARRAY['die_cut','rounded']::sticker_shape[],           ARRAY['m','l']::sticker_size[],         170, 27),
  ('Adventure awaits',      'mood',       'https://placeholder.mementomundi.com/stickers/adventure.svg',       ARRAY['rounded']::sticker_shape[],                     ARRAY['m','l']::sticker_size[],         130, 28),
  ('Nos vemos en el mundo', 'mood',       'https://placeholder.mementomundi.com/stickers/see-you.svg',         ARRAY['rounded']::sticker_shape[],                     ARRAY['m','l']::sticker_size[],         130, 29),
  ('Coordenadas',           'mood',       'https://placeholder.mementomundi.com/stickers/coordinates.svg',     ARRAY['rounded']::sticker_shape[],                     ARRAY['s','m']::sticker_size[],         130, 30);

-- ============================================================================
-- NOTAS PARA DESARROLLO LOCAL
-- ============================================================================
-- Para crear datos de prueba (trip + miembros + entries) localmente,
-- ejecutar manualmente desde Supabase Studio o un script Node, ya que
-- requieren un user_id válido en auth.users.
--
-- Ejemplo (PSEUDO-CÓDIGO para script):
--   1. Crear user en Auth → obtener user_id
--   2. INSERT INTO trips (owner_id, name, destination, visibility) VALUES (...)
--      → trigger genera slug + qr_code + añade owner como member
--   3. INSERT INTO trip_members (trip_id, email, role, status) VALUES (...)
--   4. INSERT INTO scrapbook_entries (trip_id, uploaded_by, photo_url, lat, lng, place_name) VALUES (...)
-- ============================================================================
