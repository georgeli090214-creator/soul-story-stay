-- Clean up any existing test data and create fresh mock data

-- Delete existing test data (in reverse dependency order)
DELETE FROM public.student_stories WHERE family_id IN (
  'f1111111-1111-1111-1111-111111111111', 'f2222222-2222-2222-2222-222222222222', 'f3333333-3333-3333-3333-333333333333',
  'f4444444-4444-4444-4444-444444444444', 'f5555555-5555-5555-5555-555555555555', 'f6666666-6666-6666-6666-666666666666',
  'f7777777-7777-7777-7777-777777777777', 'f8888888-8888-8888-8888-888888888888'
);

DELETE FROM public.students WHERE user_id IN (
  'a1111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222', 'a3333333-3333-3333-3333-333333333333'
);

DELETE FROM public.families WHERE user_id IN (
  '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666',
  '77777777-7777-7777-7777-777777777777', '88888888-8888-8888-8888-888888888888'
);

DELETE FROM public.user_profiles WHERE email LIKE '%@homestay.com' OR email LIKE '%@student.com';

-- Now insert fresh test data
-- Insert user profiles with proper UUIDs
INSERT INTO public.user_profiles (id, user_id, email, user_type) VALUES
('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'johnson.family@homestay.com', 'host_family'),
('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'chen.family@homestay.com', 'host_family'),
('33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'martinez.family@homestay.com', 'host_family'),
('44444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'williams.family@homestay.com', 'host_family'),
('55555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'nakamura.family@homestay.com', 'host_family'),
('66666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'smith.family@homestay.com', 'host_family'),
('77777777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', 'garcia.family@homestay.com', 'host_family'),
('88888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 'taylor.family@homestay.com', 'host_family');

-- Insert complete family profiles
INSERT INTO public.families (
  id, user_id, name, description, hosting_experience, price_range, location, 
  current_students, total_students_hosted, average_stay_months, verified,
  values, photos, video_url, why_we_host, family_story
) VALUES 
(
  'f1111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'The Johnson Family',
  'Warm and welcoming family in downtown Seattle with two teenagers.',
  'experienced',
  '1200-1500',
  'Seattle, WA',
  2, 15, 8, true,
  ARRAY['outdoor_activities', 'cultural_exchange', 'academic_support'],
  ARRAY['https://example.com/johnson1.jpg', 'https://example.com/johnson2.jpg'],
  'https://youtube.com/watch?v=johnson_family',
  'We believe cultural exchange enriches our childrens lives.',
  'The Johnsons have been hosting international students for over 8 years.'
),
(
  'f2222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'The Chen Family',
  'Bilingual Chinese-American family in Los Angeles.',
  'very_experienced',
  '1000-1300',
  'Los Angeles, CA',
  1, 22, 10, true,
  ARRAY['language_practice', 'cultural_exchange', 'city_life'],
  ARRAY['https://example.com/chen1.jpg', 'https://example.com/chen2.jpg'],
  'https://youtube.com/watch?v=chen_family',
  'As immigrants ourselves, we understand the challenges.',
  'David and Linda Chen moved to LA from Taiwan 20 years ago.'
),
(
  'f3333333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'The Martinez Family',
  'Active Hispanic family in sunny Phoenix.',
  'experienced',
  '900-1200',
  'Phoenix, AZ',
  1, 12, 6, true,
  ARRAY['outdoor_activities', 'cooking', 'family_oriented'],
  ARRAY['https://example.com/martinez1.jpg'],
  NULL,
  'Family is everything to us.',
  'Carlos works in construction and Maria is a nurse.'
),
(
  'f4444444-4444-4444-4444-444444444444',
  '44444444-4444-4444-4444-444444444444',
  'The Williams Family',
  'Professional family in Boston suburbs.',
  'experienced',
  '1400-1700',
  'Cambridge, MA',
  1, 18, 9, true,
  ARRAY['academic_support', 'cultural_exchange', 'city_access'],
  ARRAY['https://example.com/williams1.jpg'],
  'https://youtube.com/watch?v=williams_family',
  'Education is incredibly important to our family.',
  'Robert is a university professor and Jennifer is a lawyer.'
),
(
  'f5555555-5555-5555-5555-555555555555',
  '55555555-5555-5555-5555-555555555555',
  'The Nakamura Family',
  'Japanese-American family in San Francisco Bay Area.',
  'new',
  '1300-1600',
  'Palo Alto, CA',
  0, 3, 12, false,
  ARRAY['cultural_exchange', 'technology', 'quiet_environment'],
  ARRAY['https://example.com/nakamura1.jpg'],
  NULL,
  'We recently started hosting to share our multicultural experience.',
  'Ken works in Silicon Valley tech and Yuki is an artist.'
),
(
  'f6666666-6666-6666-6666-666666666666',
  '66666666-6666-6666-6666-666666666666',
  'The Smith Family',
  'Classic American family in Chicago suburbs.',
  'experienced',
  '1100-1400',
  'Chicago, IL',
  2, 14, 7, true,
  ARRAY['family_oriented', 'pets_friendly', 'outdoor_activities'],
  ARRAY['https://example.com/smith1.jpg'],
  'https://youtube.com/watch?v=smith_family',
  'We love giving students the full American family experience.',
  'Jim is a firefighter and Susan teaches elementary school.'
),
(
  'f7777777-7777-7777-7777-777777777777',
  '77777777-7777-7777-7777-777777777777',
  'The Garcia Family',
  'Vibrant family in Miami with strong Latin American connections.',
  'very_experienced',
  '1200-1500',
  'Miami, FL',
  2, 25, 11, true,
  ARRAY['beach_life', 'language_practice', 'cultural_exchange'],
  ARRAY['https://example.com/garcia1.jpg'],
  'https://youtube.com/watch?v=garcia_family',
  'Miami is such a multicultural city.',
  'Miguel works in international business and Carmen is a Spanish teacher.'
),
(
  'f8888888-8888-8888-8888-888888888888',
  '88888888-8888-8888-8888-888888888888',
  'The Taylor Family',
  'Creative family in Portland, Oregon.',
  'experienced',
  '1000-1300',
  'Portland, OR',
  1, 11, 8, true,
  ARRAY['arts_culture', 'music', 'outdoor_activities'],
  ARRAY['https://example.com/taylor1.jpg'],
  NULL,
  'Art and music are universal languages.',
  'Dave is a professional musician and Lisa is a graphic designer.'
);

-- Create sample student profiles for stories  
INSERT INTO public.user_profiles (id, user_id, email, user_type) VALUES
('a1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'yuki.tanaka@student.com', 'student'),
('a2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'marie.dubois@student.com', 'student'),
('a3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'pedro.silva@student.com', 'student');

INSERT INTO public.students (id, user_id, name, age, university, hometown, bio, photo_url) VALUES
('b1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Yuki Tanaka', 20, 'University of Washington', 'Tokyo, Japan', 'Computer Science student from Tokyo.', 'https://example.com/yuki.jpg'),
('b2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Marie Dubois', 19, 'UCLA', 'Paris, France', 'Art student from Paris.', 'https://example.com/marie.jpg'),
('b3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Pedro Silva', 21, 'Arizona State University', 'São Paulo, Brazil', 'Business student who loves soccer.', 'https://example.com/pedro.jpg');

-- Create student stories with correct enum values
INSERT INTO public.student_stories (
  id, student_id, family_id, title, content, story_type, photos
) VALUES
(
  'c1111111-1111-1111-1111-111111111111',
  'b1111111-1111-1111-1111-111111111111',
  'f1111111-1111-1111-1111-111111111111',
  'My Amazing Year with the Johnson Family',
  'Living with the Johnson family in Seattle has been the best decision of my life!',
  'milestone',
  ARRAY['https://example.com/yuki_story1.jpg']
),
(
  'c2222222-2222-2222-2222-222222222222',
  'b2222222-2222-2222-2222-222222222222',
  'f2222222-2222-2222-2222-222222222222',
  'Finding Home Away from Home in Los Angeles',
  'The Chen family helped me navigate my first year in America with such kindness.',
  'growth_letter',
  ARRAY['https://example.com/marie_story1.jpg']
),
(
  'c3333333-3333-3333-3333-333333333333',
  'b3333333-3333-3333-3333-333333333333',
  'f3333333-3333-3333-3333-333333333333',
  'Mexican-American Culture and Desert Adventures',
  'Carlos and Maria Martinez showed me a side of America I never expected!',
  'moment',
  ARRAY['https://example.com/pedro_story1.jpg']
);