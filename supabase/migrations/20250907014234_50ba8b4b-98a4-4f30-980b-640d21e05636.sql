-- Add test family accounts
INSERT INTO public.user_profiles (
  user_id,
  email, 
  user_type
) VALUES 
  ('22222222-2222-2222-2222-222222222222'::uuid, 'johnson.family@example.com', 'host_family'::user_type),
  ('33333333-3333-3333-3333-333333333333'::uuid, 'chen.family@example.com', 'host_family'::user_type),
  ('44444444-4444-4444-4444-444444444444'::uuid, 'martinez.family@example.com', 'host_family'::user_type)
ON CONFLICT (user_id) DO NOTHING;

-- Add test student accounts
INSERT INTO public.user_profiles (
  user_id,
  email, 
  user_type
) VALUES 
  ('55555555-5555-5555-5555-555555555555'::uuid, 'yuki.tanaka@student.com', 'student'::user_type),
  ('66666666-6666-6666-6666-666666666666'::uuid, 'maria.gonzalez@student.com', 'student'::user_type),
  ('77777777-7777-7777-7777-777777777777'::uuid, 'james.smith@student.com', 'student'::user_type)
ON CONFLICT (user_id) DO NOTHING;

-- Create family profiles
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
) VALUES 
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    'The Johnson Family',
    'Portland, Oregon',
    '8 years of hosting experience',
    '$800-1200/month',
    1,
    15,
    8,
    true,
    'A warm, welcoming suburban home perfect for students seeking genuine American family experience.',
    ARRAY['Family Time', 'Cultural Exchange', 'Home Cooking', 'Outdoor Activities'],
    'Hosting students has enriched our family in ways we never imagined. We love learning about different cultures and sharing our American traditions.',
    'We are David, Sarah, and our twins Emma and Jack. Our home has been a gateway for international students since 2016.'
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    'The Chen Family',
    'San Francisco, California',
    '5 years of hosting experience',
    '$1200-1800/month',
    2,
    12,
    10,
    true,
    'Modern urban living with stunning city views and easy access to universities and internships.',
    ARRAY['Urban Living', 'Technology', 'Healthy Lifestyle', 'Career Development'],
    'Having experienced the immigrant journey ourselves, we want to help students feel at home while pursuing their dreams.',
    'Michael and Lily Chen moved to San Francisco 10 years ago and understand the challenges of adapting to a new culture.'
  ),
  (
    '44444444-4444-4444-4444-444444444444'::uuid,
    'The Martinez Family',
    'Austin, Texas',
    '12 years of hosting experience',
    '$700-1000/month',
    1,
    28,
    9,
    true,
    'A vibrant, music-filled home where Mexican warmth meets American hospitality.',
    ARRAY['Music', 'Cooking', 'Family Traditions', 'Community'],
    'We believe in treating our students like family members, not just boarders. Every student leaves knowing how to make traditional Mexican dishes.',
    'Bienvenidos! We are Carlos, Rosa, and our daughter Sofia. Our home reflects our Mexican heritage blended with American traditions.'
  )
ON CONFLICT (user_id) DO NOTHING;

-- Create student profiles
INSERT INTO public.students (
  user_id,
  name,
  age,
  university,
  hometown,
  bio
) VALUES 
  (
    '55555555-5555-5555-5555-555555555555'::uuid,
    'Yuki Tanaka',
    21,
    'University of California, Berkeley',
    'Tokyo, Japan',
    'Hello! I am Yuki from Tokyo, studying computer science. I love photography, hiking, and trying new foods. Looking forward to experiencing American culture!'
  ),
  (
    '66666666-6666-6666-6666-666666666666'::uuid,
    'Maria Gonzalez',
    23,
    'Stanford University',
    'Madrid, Spain',
    'Hola! I am Maria from Madrid, pursuing my masters in international business. I enjoy cooking, dancing, and learning about different cultures.'
  ),
  (
    '77777777-7777-7777-7777-777777777777'::uuid,
    'James Smith',
    20,
    'University of Texas at Austin',
    'London, UK',
    'Hi! I am James from London, studying engineering. I love football (soccer), music, and exploring new places. Excited to live with an American family!'
  )
ON CONFLICT (user_id) DO NOTHING;