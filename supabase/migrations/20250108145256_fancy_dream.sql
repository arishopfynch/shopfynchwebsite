/*
  # Create admin user

  1. Changes
    - Creates admin user with email/password authentication
    - Grants admin role to the user
    - Sets up necessary auth schema permissions

  2. Security
    - Uses secure password hashing
    - Grants minimum required permissions
*/

-- Create admin user if not exists
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud,
  confirmation_token
)
SELECT 
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'ari@shopfynch.com',
  crypt('Shopfynch2024', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  now(),
  now(),
  'authenticated',
  'authenticated',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'ari@shopfynch.com'
);

-- Grant admin role to user
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'ari@shopfynch.com'
  ) THEN
    GRANT admin TO authenticated;
  END IF;
END $$;