-- Create 8 mock host families with complete profiles and stories
-- Note: You'll need to create these user accounts manually in Supabase Auth first

-- Email/Password combinations for manual account creation:
-- johnson.family@homestay.com / TestPass123!
-- chen.family@homestay.com / TestPass123!
-- martinez.family@homestay.com / TestPass123!
-- williams.family@homestay.com / TestPass123!
-- nakamura.family@homestay.com / TestPass123!
-- smith.family@homestay.com / TestPass123!
-- garcia.family@homestay.com / TestPass123!
-- taylor.family@homestay.com / TestPass123!

-- Insert user profiles (replace UUIDs with actual auth user IDs after account creation)
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
-- Johnson Family - Seattle
(
  'fam11111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'The Johnson Family',
  'Warm and welcoming family in downtown Seattle with two teenagers. We love showing students around the Pacific Northwest and sharing our outdoor lifestyle.',
  'experienced',
  '1200-1500',
  'Seattle, WA',
  2,
  15,
  8,
  true,
  ARRAY['outdoor_activities', 'cultural_exchange', 'academic_support'],
  ARRAY['https://example.com/johnson1.jpg', 'https://example.com/johnson2.jpg'],
  'https://youtube.com/watch?v=johnson_family',
  'We believe cultural exchange enriches our children''s lives and helps create global understanding. Hosting students has taught our family so much about the world.',
  'The Johnsons have been hosting international students for over 8 years. Mark works in tech while Sarah is a high school teacher. Their kids Emma (16) and Jake (14) have made lifelong friendships with students from around the world.'
),
-- Chen Family - Los Angeles  
(
  'fam22222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'The Chen Family',
  'Bilingual Chinese-American family in Los Angeles. Perfect for students wanting to experience both American and Chinese culture.',
  'very_experienced',
  '1000-1300',
  'Los Angeles, CA',
  1,
  22,
  10,
  true,
  ARRAY['language_practice', 'cultural_exchange', 'city_life'],
  ARRAY['https://example.com/chen1.jpg', 'https://example.com/chen2.jpg', 'https://example.com/chen3.jpg'],
  'https://youtube.com/watch?v=chen_family',
  'As immigrants ourselves, we understand the challenges of adapting to American culture. We want to provide a supportive bridge for international students.',
  'David and Linda Chen moved to LA from Taiwan 20 years ago. David is an engineer and Linda runs a small restaurant. They speak fluent Mandarin and English, making communication easy for Asian students while helping with English practice.'
),
-- Martinez Family - Phoenix
(
  'fam33333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'The Martinez Family',
  'Active Hispanic family in sunny Phoenix. We love cooking traditional Mexican food and exploring Arizona outdoor adventures.',
  'experienced',
  '900-1200',
  'Phoenix, AZ',
  1,
  12,
  6,
  true,
  ARRAY['outdoor_activities', 'cooking', 'family_oriented'],
  ARRAY['https://example.com/martinez1.jpg', 'https://example.com/martinez2.jpg'],
  NULL,
  'Family is everything to us. We want to share our Mexican-American traditions while learning about our students'' cultures. Our home is always full of laughter and good food.',
  'Carlos works in construction and Maria is a nurse. They have three children aged 8, 12, and 15. The Martinez family loves weekend trips to the Grand Canyon and Sedona, and Maria makes the best authentic tacos in Phoenix!'
),
-- Williams Family - Boston
(
  'fam44444-4444-4444-4444-444444444444',
  '44444444-4444-4444-4444-444444444444',
  'The Williams Family',
  'Professional family in Boston suburbs. Great for students attending Harvard, MIT, or other Boston area universities.',
  'experienced',
  '1400-1700',
  'Cambridge, MA',
  1,
  18,
  9,
  true,
  ARRAY['academic_support', 'cultural_exchange', 'city_access'],
  ARRAY['https://example.com/williams1.jpg', 'https://example.com/williams2.jpg'],
  'https://youtube.com/watch?v=williams_family',
  'Education is incredibly important to our family. We love supporting students in their academic journey while sharing New England culture and history.',
  'Robert is a university professor and Jennifer is a lawyer. They have one daughter in college. Living near Harvard Square puts them at the heart of academic Boston, perfect for serious students.'
),
-- Nakamura Family - Palo Alto
(
  'fam55555-5555-5555-5555-555555555555',
  '55555555-5555-5555-5555-555555555555',
  'The Nakamura Family',
  'Japanese-American family in San Francisco Bay Area. Blend of traditional Japanese values with modern American lifestyle.',
  'new',
  '1300-1600',
  'Palo Alto, CA',
  0,
  3,
  12,
  false,
  ARRAY['cultural_exchange', 'technology', 'quiet_environment'],
  ARRAY['https://example.com/nakamura1.jpg'],
  NULL,
  'We recently started hosting to share our multicultural experience and help students feel at home in America while maintaining connection to their roots.',
  'Ken works in Silicon Valley tech and Yuki is an artist. They practice traditional Japanese tea ceremony and have a beautiful zen garden. Perfect for students who appreciate tranquility and cultural depth.'
),
-- Smith Family - Chicago
(
  'fam66666-6666-6666-6666-666666666666',
  '66666666-6666-6666-6666-666666666666',
  'The Smith Family',
  'Classic American family in Chicago suburbs. Two friendly dogs, backyard BBQs, and authentic Midwest hospitality.',
  'experienced',
  '1100-1400',
  'Chicago, IL',
  2,
  14,
  7,
  true,
  ARRAY['family_oriented', 'pets_friendly', 'outdoor_activities'],
  ARRAY['https://example.com/smith1.jpg', 'https://example.com/smith2.jpg', 'https://example.com/smith3.jpg'],
  'https://youtube.com/watch?v=smith_family',
  'We love giving students the full American family experience - from backyard barbecues to cheering at local sports games. Our home is your home.',
  'Jim is a firefighter and Susan teaches elementary school. They have twin boys (age 10) and two golden retrievers. Perfect for students wanting the classic American suburban family experience.'
),
-- Garcia Family - Miami
(
  'fam77777-7777-7777-7777-777777777777',
  '77777777-7777-7777-7777-777777777777',
  'The Garcia Family',
  'Vibrant family in Miami with strong Latin American connections. Bilingual Spanish-English household near beautiful beaches.',
  'very_experienced',
  '1200-1500',
  'Miami, FL',
  2,
  25,
  11,
  true,
  ARRAY['beach_life', 'language_practice', 'cultural_exchange'],
  ARRAY['https://example.com/garcia1.jpg', 'https://example.com/garcia2.jpg'],
  'https://youtube.com/watch?v=garcia_family',
  'Miami is such a multicultural city, and we love being part of students'' international experience. Plus, who doesn''t want to live near the beach?',
  'Miguel works in international business and Carmen is a Spanish teacher. Their daughter Sofia (17) has grown up with students from around the world. The family loves salsa dancing and weekend beach trips.'
),
-- Taylor Family - Portland
(
  'fam88888-8888-8888-8888-888888888888',
  '88888888-8888-8888-8888-888888888888',
  'The Taylor Family',
  'Creative family in Portland, Oregon. Musicians and artists who love sharing the unique Pacific Northwest culture.',
  'experienced',
  '1000-1300',
  'Portland, OR',
  1,
  11,
  8,
  true,
  ARRAY['arts_culture', 'music', 'outdoor_activities'],
  ARRAY['https://example.com/taylor1.jpg', 'https://example.com/taylor2.jpg'],
  NULL,
  'Art and music are universal languages. We love sharing Portland''s creative scene and the beautiful nature of Oregon with our students.',
  'Dave is a professional musician and Lisa is a graphic designer. They have a home music studio and art space. Perfect for creative students who want to experience Portland''s famous arts scene and natural beauty.'
);

-- Create sample student profiles for stories
INSERT INTO public.user_profiles (id, user_id, email, user_type) VALUES
('s1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'yuki.tanaka@student.com', 'student'),
('s2222222-2222-2222-2222-222222222222', 's2222222-2222-2222-2222-222222222222', 'marie.dubois@student.com', 'student'),
('s3333333-3333-3333-3333-333333333333', 's3333333-3333-3333-3333-333333333333', 'pedro.silva@student.com', 'student');

INSERT INTO public.students (id, user_id, name, age, university, hometown, bio, photo_url) VALUES
('st111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'Yuki Tanaka', 20, 'University of Washington', 'Tokyo, Japan', 'Computer Science student from Tokyo who loves hiking and photography.', 'https://example.com/yuki.jpg'),
('st222222-2222-2222-2222-222222222222', 's2222222-2222-2222-2222-222222222222', 'Marie Dubois', 19, 'UCLA', 'Paris, France', 'Art student from Paris exploring American culture and improving English.', 'https://example.com/marie.jpg'),
('st333333-3333-3333-3333-333333333333', 's3333333-3333-3333-3333-333333333333', 'Pedro Silva', 21, 'Arizona State University', 'São Paulo, Brazil', 'Business student who loves soccer and wants to experience American university life.', 'https://example.com/pedro.jpg');

-- Create inspiring student stories
INSERT INTO public.student_stories (
  id, student_id, family_id, title, content, story_type, photos
) VALUES
(
  'story111-1111-1111-1111-111111111111',
  'st111111-1111-1111-1111-111111111111',
  'fam11111-1111-1111-1111-111111111111',
  'My Amazing Year with the Johnson Family',
  'Living with the Johnson family in Seattle has been the best decision of my life! Mark and Sarah treated me like their own child, and Emma and Jake became like real siblings to me. We went hiking in the Cascades every weekend, and I learned so much about American family life. Sarah helped me with my English homework, and Mark taught me about American technology industry. I will never forget our Thanksgiving dinner together - it was my first real American Thanksgiving and I felt so welcomed. The kids taught me American slang and I taught them Japanese. We even made sushi together for the whole family! This experience changed my perspective on both American and Japanese culture.',
  'experience',
  ARRAY['https://example.com/yuki_story1.jpg', 'https://example.com/yuki_story2.jpg']
),
(
  'story222-2222-2222-2222-222222222222',
  'st222222-2222-2222-2222-222222222222',
  'fam22222-2222-2222-2222-222222222222',
  'Finding Home Away from Home in Los Angeles',
  'The Chen family helped me navigate my first year in America with such kindness and understanding. As fellow immigrants, David and Linda really understood the challenges I faced adapting to American culture. Linda taught me to cook American-Chinese fusion dishes, and David helped me understand American business culture for my internships. Living in LA with them, I got to experience both the glamorous side of the city and the real family life. We visited Linda''s restaurant every week where I practiced English with customers. The family celebrations were amazing - combining American holidays with Chinese traditions. I learned so much Mandarin while improving my English. They truly became my American family.',
  'experience',
  ARRAY['https://example.com/marie_story1.jpg']
),
(
  'story333-3333-3333-3333-333333333333',
  'st333333-3333-3333-3333-333333333333',
  'fam33333-3333-3333-3333-333333333333',
  'Mexican-American Culture and Desert Adventures',
  'Carlos and Maria Martinez showed me a side of America I never expected! Coming from Brazil, I thought I understood Latin culture, but Mexican-American traditions were so rich and different. Maria''s cooking was incredible - she taught me to make real tacos, not the Brazilian version I knew. The family trips to Grand Canyon and Sedona were breathtaking. Their children welcomed me immediately, and I helped them with soccer while they helped me with American slang. Carlos shared stories about immigration and building a life in America that really inspired me. Family dinners were always loud, fun, and full of laughter. Maria made sure I felt at home when I was missing Brazil. This family taught me that family bonds transcend language and nationality.',
  'experience',
  ARRAY['https://example.com/pedro_story1.jpg', 'https://example.com/pedro_story2.jpg']
);