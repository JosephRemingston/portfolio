-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  "coverImage" TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  author TEXT NOT NULL DEFAULT 'Author',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT FALSE,
  "viewCount" INTEGER DEFAULT 0,
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "readingTime" INTEGER DEFAULT 1,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "publishedAt" TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Normalize legacy lowercase column names (Postgres folds unquoted identifiers to lowercase)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'coverimage'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'coverImage'
  ) THEN
    EXECUTE 'ALTER TABLE public.blogs RENAME COLUMN coverimage TO "coverImage"';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'viewcount'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'viewCount'
  ) THEN
    EXECUTE 'ALTER TABLE public.blogs RENAME COLUMN viewcount TO "viewCount"';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'metatitle'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'metaTitle'
  ) THEN
    EXECUTE 'ALTER TABLE public.blogs RENAME COLUMN metatitle TO "metaTitle"';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'metadescription'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'metaDescription'
  ) THEN
    EXECUTE 'ALTER TABLE public.blogs RENAME COLUMN metadescription TO "metaDescription"';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'readingtime'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'readingTime'
  ) THEN
    EXECUTE 'ALTER TABLE public.blogs RENAME COLUMN readingtime TO "readingTime"';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'createdat'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'createdAt'
  ) THEN
    EXECUTE 'ALTER TABLE public.blogs RENAME COLUMN createdat TO "createdAt"';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'updatedat'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'updatedAt'
  ) THEN
    EXECUTE 'ALTER TABLE public.blogs RENAME COLUMN updatedat TO "updatedAt"';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'publishedat'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blogs' AND column_name = 'publishedAt'
  ) THEN
    EXECUTE 'ALTER TABLE public.blogs RENAME COLUMN publishedat TO "publishedAt"';
  END IF;
END $$;

-- Add missing columns if table already exists (for idempotent migrations)
ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS "coverImage" TEXT;

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS "metaTitle" TEXT;

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS "readingTime" INTEGER DEFAULT 1;

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS "viewCount" INTEGER DEFAULT 0;

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP WITH TIME ZONE;

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS public.blogs
ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON public.blogs (slug);
CREATE INDEX IF NOT EXISTS blogs_status_idx ON public.blogs (status);
CREATE INDEX IF NOT EXISTS blogs_published_at_idx ON public.blogs ("publishedAt" DESC);
CREATE INDEX IF NOT EXISTS blogs_featured_idx ON public.blogs (featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS blogs_tags_idx ON public.blogs USING gin(tags);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS blogs_fts_idx ON public.blogs USING gin(
  to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(content, ''))
);

-- Enable RLS (Row Level Security) - safely without error if already enabled
DO $$
BEGIN
  EXECUTE 'ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY';
EXCEPTION WHEN OTHERS THEN
  -- RLS already enabled, continue
  NULL;
END $$;

-- Public read policy - anyone can read published blogs
DROP POLICY IF EXISTS "Published blogs are readable by everyone" ON public.blogs;
CREATE POLICY "Published blogs are readable by everyone" ON public.blogs
  FOR SELECT USING (status = 'published');

-- Admin read policy - authenticated users can read all blogs (if admin)
DROP POLICY IF EXISTS "Admins can read all blogs" ON public.blogs;
CREATE POLICY "Admins can read all blogs" ON public.blogs
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Admin write policies
DROP POLICY IF EXISTS "Admins can create blogs" ON public.blogs;
CREATE POLICY "Admins can create blogs" ON public.blogs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admins can update their blogs" ON public.blogs;
CREATE POLICY "Admins can update their blogs" ON public.blogs
  FOR UPDATE USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admins can delete their blogs" ON public.blogs;
CREATE POLICY "Admins can delete their blogs" ON public.blogs
  FOR DELETE USING (auth.uid() = created_by);

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updatedAt
DROP TRIGGER IF EXISTS update_blogs_updated_at_trigger ON public.blogs;
CREATE TRIGGER update_blogs_updated_at_trigger
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_blogs_updated_at();
