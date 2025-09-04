-- Clean up existing test data first
DELETE FROM student_stories WHERE family_id IN (
  SELECT id FROM families WHERE name LIKE '%Family'
);
DELETE FROM students WHERE name IN ('Yuki Tanaka', 'Marie Dubois', 'Pedro Silva');
DELETE FROM families WHERE name LIKE '%Family';
DELETE FROM user_profiles WHERE email LIKE '%.family@homestay.com' OR email LIKE '%@student.com';

-- Insert comprehensive family and student data with rich content and photos
INSERT INTO user_profiles (user_id, email, user_type) VALUES
-- Family accounts with proper UUIDs
('f1111111-1111-1111-1111-111111111111', 'johnson.warmhome@homestay.com', 'admin'),
('f2222222-2222-2222-2222-222222222222', 'chen.cozyhome@homestay.com', 'admin'),
('f3333333-3333-3333-3333-333333333333', 'martinez.familyhome@homestay.com', 'admin'),
('f4444444-4444-4444-4444-444444444444', 'williams.sweetHome@homestay.com', 'admin'),
('f5555555-5555-5555-5555-555555555555', 'nakamura.garden@homestay.com', 'admin'),
('f6666666-6666-6666-6666-666666666666', 'smith.countryside@homestay.com', 'admin'),
('f7777777-7777-7777-7777-777777777777', 'garcia.casa@homestay.com', 'admin'),
('f8888888-8888-8888-8888-888888888888', 'taylor.oceanview@homestay.com', 'admin'),
-- Student accounts with proper UUIDs
('s1111111-1111-1111-1111-111111111111', 'yuki.sunshine@student.com', 'student'),
('s2222222-2222-2222-2222-222222222222', 'marie.paris@student.com', 'student'),
('s3333333-3333-3333-3333-333333333333', 'pedro.adventure@student.com', 'student'),
('s4444444-4444-4444-4444-444444444444', 'anna.dreams@student.com', 'student'),
('s5555555-5555-5555-5555-555555555555', 'lucas.explorer@student.com', 'student'),
('s6666666-6666-6666-6666-666666666666', 'sofia.artist@student.com', 'student'),
('s7777777-7777-7777-7777-777777777777', 'chen.curious@student.com', 'student'),
('s8888888-8888-8888-8888-888888888888', 'emma.wanderer@student.com', 'student');

-- Insert rich family profiles with comprehensive photo arrays
INSERT INTO families (
  id, user_id, name, location, hosting_experience, price_range, values, verified,
  family_story, why_we_host, description, photos, current_students, total_students_hosted, average_stay_months
) VALUES
-- Johnson Family - Warm suburban home
('fam11111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 'The Johnson Family', 'Portland, Oregon', '8 years of hosting experience', '$800-1200/month',
ARRAY['Family Time', 'Cultural Exchange', 'Home Cooking', 'Outdoor Activities'],
true,
'We are the Johnsons - David, Sarah, and our twins Emma and Jack (12 years old). Our home has been a gateway for international students since 2016. We believe that sharing meals, stories, and daily life creates bonds that last a lifetime. Our house sits in a quiet neighborhood with tree-lined streets, just 15 minutes from downtown Portland. We have a large backyard perfect for BBQs and a cozy living room where we gather for movie nights every Friday.',
'Hosting students has enriched our family in ways we never imagined. We love learning about different cultures, trying new recipes together, and watching our children develop global perspectives. Every student brings something special to our home, and we are honored to be part of their American journey.',
'A warm, welcoming suburban home perfect for students seeking genuine American family experience.',
ARRAY[
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
  'https://images.unsplash.com/photo-1600563438938-a42d7a9bb245?w=800',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800'
], 1, 15, 8),

-- Chen Family - Modern downtown condo
('fam22222-2222-2222-2222-222222222222', 'f2222222-2222-2222-2222-222222222222', 'The Chen Family', 'San Francisco, California', '5 years of hosting experience', '$1200-1800/month',
ARRAY['Urban Living', 'Technology', 'Healthy Lifestyle', 'Career Development'],
true,
'Michael and Lily Chen moved to San Francisco 10 years ago and understand the challenges of adapting to a new culture. Our modern downtown condo offers students the excitement of city life while providing a supportive family environment. Michael works in tech, and Lily is a yoga instructor. We love exploring the city''s neighborhoods, trying diverse cuisines, and sharing our journey of building a life in America.',
'Having experienced the immigrant journey ourselves, we want to help students feel at home while pursuing their dreams. We provide guidance on navigating American culture, professional development, and building lasting friendships.',
'Modern urban living with stunning city views and easy access to universities and internships.',
ARRAY[
  'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
  'https://images.unsplash.com/photo-1600566753051-e7b8b57e3040?w=800',
  'https://images.unsplash.com/photo-1600563438938-a42d7a9bb245?w=800',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
], 2, 12, 10),

-- Martinez Family - Cozy traditional home
('fam33333-3333-3333-3333-333333333333', 'f3333333-3333-3333-3333-333333333333', 'The Martinez Family', 'Austin, Texas', '12 years of hosting experience', '$700-1000/month',
ARRAY['Music', 'Cooking', 'Family Traditions', 'Community'],
true, 
'¡Bienvenidos! We are Carlos, Rosa, and our daughter Sofia (16). Our home reflects our Mexican heritage blended with American traditions. Rosa''s homemade tamales are legendary among our students, and Carlos teaches guitar on weekends. Our house is filled with music, laughter, and the aroma of authentic Mexican cuisine. We have a beautiful garden where Rosa grows herbs and vegetables for our family meals.',
'We believe in treating our students like family members, not just boarders. Every student leaves knowing how to make at least one traditional Mexican dish and feeling confident about their place in American society. We celebrate both American holidays and our cultural traditions together.',
'A vibrant, music-filled home where Mexican warmth meets American hospitality.',
ARRAY[
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
  'https://images.unsplash.com/photo-1600563438938-a42d7a9bb245?w=800'
], 1, 28, 9),

-- Williams Family - Country cottage style
('fam44444-4444-4444-4444-444444444444', 'f4444444-4444-4444-4444-444444444444', 'The Williams Family', 'Boulder, Colorado', '6 years of hosting experience', '$900-1300/month',
ARRAY['Nature', 'Sustainability', 'Hiking', 'Mindfulness'],
true,
'Tom and Jennifer Williams live in a charming cottage-style home with breathtaking mountain views. We''re passionate about sustainable living and outdoor adventures. Our home features solar panels, a vegetable garden, and hiking trails right from our backyard. Tom is a park ranger, and Jennifer teaches environmental science. We love sharing Colorado''s natural beauty with our students through weekend camping trips and hiking excursions.',
'We host students because we want to share our love for nature and sustainable living. Many of our students discover a passion for environmental conservation during their stay with us.',
'Eco-friendly mountain cottage perfect for nature-loving students.',
ARRAY[
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
  'https://images.unsplash.com/photo-1600566753051-e7b8b57e3040?w=800',
  'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
  'https://images.unsplash.com/photo-1600563438938-a42d7a9bb245?w=800'
], 1, 18, 7),

-- Nakamura Family - Japanese-American fusion home  
('fam55555-5555-5555-5555-555555555555', 'f5555555-5555-5555-5555-555555555555', 'The Nakamura Family', 'Seattle, Washington', '10 years of hosting experience', '$1000-1400/month',
ARRAY['Meditation', 'Art', 'Cultural Fusion', 'Learning'],
true,
'Hiroshi and Keiko Nakamura offer a unique blend of Japanese and American cultures. Our home features a traditional Japanese garden, tatami room for meditation, and modern amenities. Keiko teaches ikebana (flower arranging) and Hiroshi practices calligraphy. We believe in the Japanese concept of "omotenashi" - wholehearted hospitality. Our students learn mindfulness practices while experiencing authentic Japanese traditions in an American setting.',
'We want to bridge cultures and help students understand that home can be found anywhere when hearts are open. Many of our students continue practicing meditation and Japanese arts long after leaving us.',
'Peaceful Japanese-American home with meditation garden and cultural immersion.',
ARRAY[
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
  'https://images.unsplash.com/photo-1600563438938-a42d7a9bb245?w=800',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
], 2, 22, 11),

-- Smith Family - Classic American farmhouse
('fam66666-6666-6666-6666-666666666666', 'f6666666-6666-6666-6666-666666666666', 'The Smith Family', 'Nashville, Tennessee', '15 years of hosting experience', '$600-900/month',
ARRAY['Country Living', 'Animals', 'Farming', 'Southern Hospitality'],
true,
'Y''all come on in! Jim and Mary Smith run a working farm just outside Nashville. Our century-old farmhouse has been lovingly restored while keeping its historic charm. We have horses, chickens, and a vegetable garden. Students learn about farm life, Southern cooking, and genuine hospitality. Mary''s biscuits and gravy are famous throughout the county, and Jim loves teaching students to ride horses. Our front porch swing is perfect for evening conversations under the stars.',
'Hosting students brings young energy to our farm and helps preserve our way of life. We love sharing Southern traditions and watching city students discover the peace of country living.',
'Historic farmhouse offering authentic American country living experience.',
ARRAY[
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
  'https://images.unsplash.com/photo-1600563438938-a42d7a9bb245?w=800',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800'
], 1, 35, 12),

-- Garcia Family - Artistic coastal home
('fam77777-7777-7777-7777-777777777777', 'f7777777-7777-7777-7777-777777777777', 'The Garcia Family', 'San Diego, California', '7 years of hosting experience', '$1100-1500/month',
ARRAY['Art', 'Beach Life', 'Creativity', 'Wellness'],
true,
'Diego and Carmen Garcia are professional artists living in a colorful beach cottage. Our home is filled with original artwork, and we have a studio where students can explore their creativity. Carmen teaches pottery, and Diego is a muralist. We''re just two blocks from the beach, and sunset walks are a daily ritual. Our home reflects our artistic spirit with vibrant colors, handmade furniture, and an inspiring creative atmosphere.',
'Art has the power to connect souls across cultures. We love nurturing creativity in our students and watching them discover new forms of self-expression.',
'Artistic beach cottage where creativity flows as freely as the ocean breeze.',
ARRAY[
  'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
  'https://images.unsplash.com/photo-1600566753051-e7b8b57e3040?w=800',
  'https://images.unsplash.com/photo-1600563438938-a42d7a9bb245?w=800',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
], 1, 16, 6),

-- Taylor Family - Lakeside retreat
('fam88888-8888-8888-8888-888888888888', 'f8888888-8888-8888-8888-888888888888', 'The Taylor Family', 'Minneapolis, Minnesota', '9 years of hosting experience', '$750-1100/month',
ARRAY['Water Sports', 'Seasonal Activities', 'Reading', 'Family Games'],
true,
'Robert and Linda Taylor live in a beautiful lakeside home where every season brings new adventures. In summer, we kayak and fish on the lake. Fall brings stunning foliage and apple picking. Winter means ice skating on our lake and cozy fireside evenings. Spring brings gardening and hiking. Our home has a large library, game room, and dock for water activities. We believe in making memories through shared experiences and seasonal traditions.',
'Living through four distinct seasons teaches students about cycles of life and finding joy in every moment. We love sharing Minnesota''s natural beauty and helping students experience authentic American family traditions.',
'Lakeside home offering four-season outdoor adventures and cozy family moments.',
ARRAY[
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
  'https://images.unsplash.com/photo-1600563438938-a42d7a9bb245?w=800',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
], 2, 25, 10);

-- Insert student profiles
INSERT INTO students (id, user_id, name, university, age, hometown, bio, photo_url) VALUES
('std11111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'Yuki Tanaka', 'University of Oregon', 20, 'Tokyo, Japan', 'Art student passionate about cultural exchange and photography. Loves cooking and outdoor adventures.', 'https://images.unsplash.com/photo-1494790108755-2616b612b08f?w=400'),
('std22222-2222-2222-2222-222222222222', 's2222222-2222-2222-2222-222222222222', 'Marie Dubois', 'UC Berkeley', 22, 'Lyon, France', 'Business major fascinated by American entrepreneurship. Enjoys hiking and learning about sustainable living.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'),
('std33333-3333-3333-3333-333333333333', 's3333333-3333-3333-3333-333333333333', 'Pedro Silva', 'UT Austin', 21, 'São Paulo, Brazil', 'Music production student who loves learning about different musical traditions and family cooking.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'),
('std44444-4444-4444-4444-444444444444', 's4444444-4444-4444-4444-444444444444', 'Anna Kowalski', 'University of Colorado Boulder', 19, 'Warsaw, Poland', 'Environmental science student passionate about mountain activities and sustainable living.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'),
('std55555-5555-5555-5555-555555555555', 's5555555-5555-5555-5555-555555555555', 'Lucas Chen', 'University of Washington', 23, 'Vancouver, Canada', 'Computer science graduate student interested in meditation, art, and cross-cultural understanding.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
('std66666-6666-6666-6666-666666666666', 's6666666-6666-6666-6666-666666666666', 'Sofia Rodriguez', 'Vanderbilt University', 20, 'Madrid, Spain', 'Psychology student fascinated by American rural culture and equestrian activities.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'),
('std77777-7777-7777-7777-777777777777', 's7777777-7777-7777-7777-777777777777', 'Chen Wei', 'UC San Diego', 21, 'Beijing, China', 'Fine arts student exploring American artistic expression and beach culture.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'),
('std88888-8888-8888-8888-888888888888', 's8888888-8888-8888-8888-888888888888', 'Emma Hansen', 'University of Minnesota', 22, 'Copenhagen, Denmark', 'Exchange student studying environmental policy, loves seasonal activities and outdoor sports.', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400');