-- =======================================================
-- M.S. Ochieng Legal – Add Visitors Table
-- Run this in: Supabase Dashboard → SQL Editor
-- Project: objmaggcjirhesbxnvyg
-- Safe to run even if table already exists.
-- =======================================================

-- 1. Create the visitors table
CREATE TABLE IF NOT EXISTS public.visitors (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT        NOT NULL UNIQUE,
  visited_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Unique index on session_id (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS idx_visitors_session
  ON public.visitors (session_id);

-- 3. Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- 4. Public INSERT policy (anonymous visitors can log a session)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'visitors'
      AND policyname = 'Anyone can track a visit'
  ) THEN
    CREATE POLICY "Anyone can track a visit"
      ON public.visitors FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- 5. Authenticated SELECT policy (admin dashboard counts)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'visitors'
      AND policyname = 'Authenticated users can count visitors'
  ) THEN
    CREATE POLICY "Authenticated users can count visitors"
      ON public.visitors FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- 6. Notify PostgREST to refresh schema cache immediately
NOTIFY pgrst, 'reload schema';
