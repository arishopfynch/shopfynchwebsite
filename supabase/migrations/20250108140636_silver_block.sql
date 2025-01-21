/*
  # Add author and publish date columns to blog posts

  1. Changes
    - Add author column
    - Add publish_date column
    - Rename read_time to read_time_minutes for clarity
    - Add default values for new columns

  2. Security
    - Existing RLS policies remain unchanged
*/

-- Add new columns
ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS author text NOT NULL DEFAULT 'Admin',
  ADD COLUMN IF NOT EXISTS publish_date timestamptz NOT NULL DEFAULT now();

-- Rename read_time to read_time_minutes
ALTER TABLE blog_posts 
  RENAME COLUMN read_time TO read_time_minutes;