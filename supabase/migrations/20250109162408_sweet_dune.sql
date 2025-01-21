/*
  # Fix Authentication and Policies

  1. Changes
    - Drop existing policies
    - Create new simplified RLS policies
    - Grant necessary permissions
    - Fix authentication setup
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Enable read-only access for anonymous users" ON blog_posts;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create a single policy for authenticated users that allows all operations
CREATE POLICY "authenticated_full_access"
  ON blog_posts
  AS PERMISSIVE
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a policy for anonymous users to read published posts
CREATE POLICY "anon_read_published"
  ON blog_posts
  AS PERMISSIVE
  FOR SELECT
  TO anon
  USING (published = true);

-- Ensure proper permissions are granted
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON blog_posts TO authenticated;
GRANT SELECT ON blog_posts TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;