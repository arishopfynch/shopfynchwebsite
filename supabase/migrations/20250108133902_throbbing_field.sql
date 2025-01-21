/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `image` (text)
      - `category` (text)
      - `date` (timestamptz)
      - `read_time` (text)
      - `published` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `blog_posts` table
    - Add policies for authenticated users to manage posts
    - Allow public read access for published posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  read_time text NOT NULL,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage all posts
CREATE POLICY "Users can manage all posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow public to read published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);