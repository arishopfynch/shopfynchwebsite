-- Create admin user if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'ari@shopfynch.com'
  ) THEN
    INSERT INTO auth.users (
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
    );
  END IF;
END $$;

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