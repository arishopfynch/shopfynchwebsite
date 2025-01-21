/*
  # Fix RLS Policies for Blog Posts

  1. Changes
    - Drop existing policies
    - Create new simplified policies with proper access control
    - Add explicit grant for authenticated users
  
  2. Security
    - Enable RLS
    - Allow authenticated users full access
    - Allow public read-only access to published posts
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read all posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to update posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to delete posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow public to read published posts" ON blog_posts;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create a single policy for authenticated users with full access
CREATE POLICY "Enable full access for authenticated users"
  ON blog_posts
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create read-only policy for anonymous users
CREATE POLICY "Enable read-only access for anonymous users"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);

-- Grant explicit permissions to authenticated users
GRANT ALL ON blog_posts TO authenticated;