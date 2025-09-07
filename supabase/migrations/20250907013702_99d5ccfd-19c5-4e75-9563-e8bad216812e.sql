-- Create a test student user account
-- Note: This is for testing purposes only. In production, users should register through the normal signup flow.

-- Insert into auth.users (this requires admin privileges and should be done carefully)
-- Since we can't directly insert into auth.users, let's create the profile data that would be created by the trigger

-- First, let's insert a test user profile that matches what would be created by signup
INSERT INTO public.user_profiles (
  user_id,
  email, 
  user_type
) VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'test.student@example.com',
  'student'::user_type
) ON CONFLICT (user_id) DO NOTHING;

-- Create a student profile for this user
INSERT INTO public.students (
  user_id,
  name,
  age,
  university,
  hometown,
  bio
) VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'Test Student',
  22,
  'Test University',
  'Test City',
  'This is a test student account for development purposes.'
) ON CONFLICT (user_id) DO NOTHING;