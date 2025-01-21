/*
  # Fix RLS policies for blog_posts table
  
  1. Changes
    - Drop existing policies
    - Create new simplified policies that allow full access for authenticated users
    - Keep public read-only access for published posts
  
  2. Security
    - Authenticated users can perform all operations
    - Public users can only read published posts
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can read all posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;

-- Create simplified policies
CREATE POLICY "Enable all operations for authenticated users"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable read access for published posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);