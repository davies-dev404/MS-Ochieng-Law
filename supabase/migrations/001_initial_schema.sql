-- =======================================================
-- M.S. Ochieng Legal – Supabase Initial Schema
-- Run this in your Supabase Dashboard → SQL Editor
-- Project: objmaggcjirhesbxnvyg
-- =======================================================

-- -------------------------------------------------------
-- 1. BLOGS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS blogs (
  id          TEXT        PRIMARY KEY,
  title       TEXT        NOT NULL,
  snippet     TEXT,
  content     TEXT,
  image       TEXT,
  date        TEXT,
  author      TEXT,
  category    TEXT,
  sectors     TEXT[]      DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for ordering by date
CREATE INDEX IF NOT EXISTS idx_blogs_date ON blogs (date DESC);

-- Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Anyone can read published blogs (public site)
CREATE POLICY "Public blogs are readable by all"
  ON blogs FOR SELECT
  USING (true);

-- Only authenticated users (admin) can write
CREATE POLICY "Authenticated users can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (true);


-- -------------------------------------------------------
-- 2. SUBSCRIBERS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscribers (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT        NOT NULL UNIQUE,
  name        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for deduplication
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (public form)
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can read the subscriber list
CREATE POLICY "Authenticated users can read subscribers"
  ON subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete subscribers"
  ON subscribers FOR DELETE
  TO authenticated
  USING (true);


-- -------------------------------------------------------
-- 3. CONSULTATIONS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS consultations (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  service     TEXT,
  message     TEXT,
  status      TEXT        DEFAULT 'Pending',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultations (created_at DESC);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a consultation request (public form)
CREATE POLICY "Anyone can submit a consultation"
  ON consultations FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can read / manage
CREATE POLICY "Authenticated users can read consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update consultations"
  ON consultations FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete consultations"
  ON consultations FOR DELETE
  TO authenticated
  USING (true);


-- -------------------------------------------------------
-- 4. VISITORS  (unique session tracking)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS visitors (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT        NOT NULL UNIQUE,
  visited_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint ensures each session is only counted once
CREATE UNIQUE INDEX IF NOT EXISTS idx_visitors_session ON visitors (session_id);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Anyone can record a visit (public action)
CREATE POLICY "Anyone can track a visit"
  ON visitors FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can see visitor count
CREATE POLICY "Authenticated users can count visitors"
  ON visitors FOR SELECT
  TO authenticated
  USING (true);
