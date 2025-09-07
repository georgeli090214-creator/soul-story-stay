-- Create family profile for johnson.family@homestay.com
INSERT INTO public.families (
  user_id,
  name,
  location,
  hosting_experience,
  price_range,
  current_students,
  total_students_hosted,
  average_stay_months,
  verified,
  description,
  values,
  why_we_host,
  family_story
) VALUES (
  'db6666aa-7436-467b-8294-59e35d645e55'::uuid,
  'The Johnson Homestay Family',
  'Toronto, Ontario',
  '6 years of hosting experience',
  '$1000-1400/month',
  0,
  12,
  9,
  true,
  'Warm and welcoming Canadian family offering authentic homestay experience in Toronto.',
  ARRAY['Family Time', 'Cultural Exchange', 'Canadian Culture', 'Education Support'],
  'We love sharing Canadian culture with international students and helping them succeed in their studies.',
  'We are the Johnson family living in Toronto. We have been hosting international students for 6 years and love the cultural exchange experience.'
) ON CONFLICT (user_id) DO NOTHING;