/*
  # Fix blog permissions

  1. Changes
    - Drop and recreate RLS policies with proper permissions
    - Grant necessary table permissions
    - Add function to handle user authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "authenticated_full_access" ON blog_posts;
DROP POLICY IF EXISTS "anon_read_published" ON blog_posts;

-- Create function to check if user is authenticated
CREATE OR REPLACE FUNCTION auth.is_authenticated()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (current_setting('request.jwt.claims', TRUE)::jsonb->>'role') = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "authenticated_select_posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_insert_posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.is_authenticated());

CREATE POLICY "authenticated_update_posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.is_authenticated())
  WITH CHECK (auth.is_authenticated());

CREATE POLICY "authenticated_delete_posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.is_authenticated());

-- Create policy for anonymous users
CREATE POLICY "anon_read_published"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON blog_posts TO authenticated;
GRANT SELECT ON blog_posts TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;