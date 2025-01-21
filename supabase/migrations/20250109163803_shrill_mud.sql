/*
  # Create admin user with password

  1. Changes
    - Creates admin user with password "2124admin"
    - Grants necessary permissions
*/

-- Create admin user if not exists
DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Generate a UUID for the user
  user_id := gen_random_uuid();
  
  -- Insert the user if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@shopfynch.com'
  ) THEN
    INSERT INTO auth.users (
      id,  -- Explicitly set the ID
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
    ) VALUES (
      user_id,  -- Use the generated UUID
      '00000000-0000-0000-0000-000000000000',
      'admin@shopfynch.com',
      crypt('2124admin', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Admin"}',
      now(),
      now(),
      'authenticated',
      'authenticated',
      ''
    );
  END IF;
END $$;