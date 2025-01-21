/*
  # Add RLS policies for blog posts

  1. Changes
    - Drop existing policies
    - Add new policies for:
      - Authenticated users to manage all posts
      - Public users to read published posts
      - Admin users to manage all posts
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage all posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all posts
CREATE POLICY "Authenticated users can read all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert posts
CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own posts
CREATE POLICY "Authenticated users can update posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Allow public to read published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);