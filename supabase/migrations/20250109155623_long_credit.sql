/*
  # Fix Blog Schema

  1. Changes
    - Drop and recreate blog_posts table with correct schema
    - Add proper indexes
    - Set up RLS policies
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS blog_posts CASCADE;

-- Recreate table with proper schema
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  author text NOT NULL DEFAULT 'Admin',
  publish_date timestamptz NOT NULL DEFAULT now(),
  read_time_minutes text NOT NULL,
  published boolean NOT NULL DEFAULT false,
  middle_cta_enabled boolean NOT NULL DEFAULT false,
  bottom_cta_enabled boolean NOT NULL DEFAULT false,
  cta_title text DEFAULT 'Join Our Beta Program',
  cta_description text DEFAULT 'Get early access and transform your e-commerce experience.',
  cta_button_text text DEFAULT 'Join Beta',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published);
CREATE INDEX IF NOT EXISTS blog_posts_publish_date_idx ON blog_posts(publish_date);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();