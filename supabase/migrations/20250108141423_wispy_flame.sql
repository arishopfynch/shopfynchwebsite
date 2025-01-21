/*
  # Add CTA fields to blog posts

  1. Changes
    - Add middle_cta_enabled boolean field
    - Add bottom_cta_enabled boolean field
    - Add cta_title text field
    - Add cta_description text field
    - Add cta_button_text text field

  2. Security
    - Existing RLS policies remain unchanged
*/

ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS middle_cta_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS bottom_cta_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS cta_title text DEFAULT 'Join Our Beta Program',
  ADD COLUMN IF NOT EXISTS cta_description text DEFAULT 'Get early access and transform your e-commerce experience with our social shopping features.',
  ADD COLUMN IF NOT EXISTS cta_button_text text DEFAULT 'Join Beta';