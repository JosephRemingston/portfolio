-- Fix blog admin write policies and creator tracking
-- This migration ensures authenticated admins can update/delete all blogs,
-- and automatically stamps creator metadata on inserts.

-- Replace owner-only policies with authenticated-admin policies
DROP POLICY IF EXISTS "Admins can update their blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can delete their blogs" ON public.blogs;

CREATE POLICY "Admins can update their blogs" ON public.blogs
  FOR UPDATE USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete their blogs" ON public.blogs
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Ensure creator metadata is set at insert time
CREATE OR REPLACE FUNCTION set_blogs_created_by()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.created_by IS NULL THEN
    NEW.created_by = auth.uid();
  END IF;

  IF NEW.updated_by IS NULL THEN
    NEW.updated_by = auth.uid();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_blogs_created_by_trigger ON public.blogs;
CREATE TRIGGER set_blogs_created_by_trigger
  BEFORE INSERT ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION set_blogs_created_by();
