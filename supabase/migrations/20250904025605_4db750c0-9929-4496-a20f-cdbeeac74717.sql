-- Create user profile for existing user if it doesn't exist
INSERT INTO public.user_profiles (user_id, email, user_type)
SELECT 
  id,
  email,
  'student'::user_type
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_profiles);