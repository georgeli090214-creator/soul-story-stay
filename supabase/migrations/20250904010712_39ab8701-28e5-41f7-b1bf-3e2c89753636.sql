-- Clean up existing test data
DELETE FROM student_stories WHERE family_id IN (
  SELECT id FROM families WHERE name LIKE '%Family'
);
DELETE FROM students WHERE name IN ('Yuki Tanaka', 'Marie Dubois', 'Pedro Silva');
DELETE FROM families WHERE name LIKE '%Family';
DELETE FROM user_profiles WHERE email LIKE '%.family@homestay.com' OR email LIKE '%@student.com';

-- Insert comprehensive family and student data with rich content and photos
INSERT INTO user_profiles (id, user_id, email, user_type) VALUES
-- Family accounts
('f1111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 'johnson.warmhome@homestay.com', 'admin'),
('f2222222-2222-2222-2222-222222222222', 'f2222222-2222-2222-2222-222222222222', 'chen.cozyhome@homestay.com', 'admin'),
('f3333333-3333-3333-3333-333333333333', 'f3333333-3333-3333-3333-333333333333', 'martinez.familyhome@homestay.com', 'admin'),
('f4444444-4444-4444-4444-444444444444', 'f4444444-4444-4444-4444-444444444444', 'williams.sweetHome@homestay.com', 'admin'),
('f5555555-5555-5555-5555-555555555555', 'f5555555-5555-5555-5555-555555555555', 'nakamura.garden@homestay.com', 'admin'),
('f6666666-6666-6666-6666-666666666666', 'f6666666-6666-6666-6666-666666666666', 'smith.countryside@homestay.com', 'admin'),
('f7777777-7777-7777-7777-777777777777', 'f7777777-7777-7777-7777-777777777777', 'garcia.casa@homestay.com', 'admin'),
('f8888888-8888-8888-8888-888888888888', 'f8888888-8888-8888-8888-888888888888', 'taylor.oceanview@homestay.com', 'admin'),
-- Student accounts
('s1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'yuki.sunshine@student.com', 'student'),
('s2222222-2222-2222-2222-222222222222', 's2222222-2222-2222-2222-222222222222', 'marie.paris@student.com', 'student'),
('s3333333-3333-3333-3333-333333333333', 's3333333-3333-3333-3333-333333333333', 'pedro.adventure@student.com', 'student'),
('s4444444-4444-4444-4444-444444444444', 's4444444-4444-4444-4444-444444444444', 'anna.dreams@student.com', 'student'),
('s5555555-5555-5555-5555-555555555555', 's5555555-5555-5555-5555-555555555555', 'lucas.explorer@student.com', 'student'),
('s6666666-6666-6666-6666-666666666666', 's6666666-6666-6666-6666-666666666666', 'sofia.artist@student.com', 'student'),
('s7777777-7777-7777-7777-777777777777', 's7777777-7777-7777-7777-777777777777', 'chen.curious@student.com', 'student'),
('s8888888-8888-8888-8888-888888888888', 's8888888-8888-8888-8888-888888888888', 'emma.wanderer@student.com', 'student');

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

-- Insert rich, heartwarming student stories
INSERT INTO student_stories (id, student_id, family_id, title, content, story_type, photos) VALUES
-- Johnson Family stories
('story001-1111-1111-1111-111111111111', 'std11111-1111-1111-1111-111111111111', 'fam11111-1111-1111-1111-111111111111', 
'My American Family Adventure', 
'When I first arrived at the Johnson''s home in Portland, I was nervous and homesick. But Sarah''s warm smile and David''s dad jokes immediately made me feel welcome. The twins, Emma and Jack, were so curious about Japan - they wanted to learn origami and even attempted to use chopsticks at dinner! 

The most magical moment was during my first Thanksgiving with them. Sarah taught me how to make pumpkin pie, and I shared how to prepare traditional Japanese dishes. We spent the entire day cooking together, sharing stories about our childhoods, and I realized I had found my American family.

Every Friday movie night became sacred to me. We would pile onto their big couch with homemade popcorn, and even though we came from different worlds, we laughed at the same jokes. David would always let me pick the movie, and slowly I began to understand American humor and culture.

When it was time for me to leave, we all cried. Emma and Jack made me a scrapbook filled with photos of our adventures - hiking in Forest Park, visiting Powell''s Books, and countless family dinners. Sarah gave me her grandmother''s recipe book, saying "Now you can bring our family traditions to Japan."

The Johnsons didn''t just give me a place to stay; they gave me a second family, confidence in my English, and memories that will last forever.', 
'experience', 
ARRAY[
  'https://images.unsplash.com/photo-1544967882-d17bf3371bd4?w=600',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
  'https://images.unsplash.com/photo-1556909088-65f3c1f62a53?w=600'
]),

-- Chen Family story
('story002-2222-2222-2222-222222222222', 'std22222-2222-2222-2222-222222222222', 'fam22222-2222-2222-2222-222222222222',
'Finding My Path in San Francisco',
'Living with the Chens changed my entire perspective on what it means to chase the American dream. Michael and Lily understood the challenges of being far from home because they had walked that path themselves. 

Lily''s morning yoga sessions on their balcony became my daily ritual. As we watched the sunrise over San Francisco Bay, she would share wisdom about finding balance in a fast-paced city. "Success isn''t just about career," she would say, "it''s about building a life that feels authentic to you."

Michael became my unofficial career mentor. He would spend evenings helping me prepare for interviews, explaining American business culture, and sharing his own journey from being an uncertain immigrant to a successful tech professional. His network opened doors I never could have imagined.

But beyond the practical help, it was the small moments that mattered most. Lily teaching me to make dumplings for Chinese New Year, Michael and me exploring different neighborhoods on weekends, and our deep conversations about identity and belonging.

When I got my first internship at a startup, they celebrated as if it were their own achievement. Lily made my favorite congee, and Michael gave me a leather portfolio with the inscription: "For Marie - may your dreams be as limitless as the San Francisco sky."

They taught me that home isn''t a place - it''s the people who believe in your dreams and support your journey.',
'experience',
ARRAY[
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600',
  'https://images.unsplash.com/photo-1524675609479-9e46d6c4b56c?w=600',
  'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600'
]),

-- Martinez Family story  
('story003-3333-3333-3333-333333333333', 'std33333-3333-3333-3333-333333333333', 'fam33333-3333-3333-3333-333333333333',
'Music, Food, and Family Love',
'¡Qué experiencia increíble! From my first day with the Martinez family, I felt like I had been transported into a warm, musical fairy tale. Rosa''s cooking filled the house with the most amazing aromas, and Carlos''s guitar always seemed to be playing somewhere in the background.

Rosa took me under her wing like I was her own son. She taught me to make tamales from scratch - a process that takes two whole days! "Pedro," she would say, "cooking is like music. You need to feel it in your heart, not just follow the recipe." I learned that she was right. Every meal became a celebration of culture and love.

Carlos discovered my passion for music production and became like a second father to me. We would spend hours in his small studio, blending traditional Mexican rhythms with modern beats. He taught me to play guitar, and I showed him how to use digital recording software. Together, we created a song that mixed mariachi with electronic music - something neither of us could have imagined alone.

Sofia, their daughter, became like a little sister. She helped me practice English while I taught her Portuguese songs. We would all sit in their beautiful garden, sharing stories under the string lights Rosa had hung between the trees.

The night before I left, they organized a farewell party with all their extended family. There was music, dancing, and enough food for an army. Carlos presented me with a handmade guitar, and Rosa gave me a recipe book filled with all the dishes she had taught me to make.

"Mi hijo," Rosa said with tears in her eyes, "you will always have a home here." That''s when I realized that family isn''t about blood - it''s about the love you choose to share.',
'experience',
ARRAY[
  'https://images.unsplash.com/photo-1566042666817-048a9d31b4aa?w=600',
  'https://images.unsplash.com/photo-1563822249-d86512ece5e4?w=600',
  'https://images.unsplash.com/photo-1532201080278-be5c7bdaafe3?w=600'
]),

-- Williams Family story
('story004-4444-4444-4444-444444444444', 'std44444-4444-4444-4444-444444444444', 'fam44444-4444-4444-4444-444444444444',
'Mountains, Mindfulness, and Growth',
'I thought I was just looking for a place to stay while studying at CU Boulder. What I found with the Williams family was a completely new way of seeing the world and my place in it.

Tom and Jennifer live in perfect harmony with nature, and they welcomed me into their sustainable lifestyle with patience and enthusiasm. Jennifer taught me about permaculture in their garden, showing me how every plant and animal has a purpose in the ecosystem. "Anna," she would say, "just like in our garden, everyone has a unique role in making the world more beautiful."

Tom became my hiking guide and philosophical mentor. Every weekend, we would explore different trails in the Rockies. During these hikes, he would share Native American wisdom about respecting the earth and finding peace in natural rhythms. These conversations changed how I think about environmental science - it''s not just about data and policies, it''s about reconnecting with our planet.

The most transformative experience was a three-day camping trip they organized for my birthday. We hiked to a remote lake, lived simply with minimal impact, and spent evenings around the campfire sharing stories and dreams. Under the endless Colorado sky, I felt more connected to myself and nature than ever before.

Jennifer taught me meditation and yoga, practices that helped me manage the stress of graduate school. Their home became my sanctuary - a place where I could study in their cozy library, help in the garden, and find balance between academic pressure and personal growth.

When I defended my thesis on sustainable agriculture, they were in the front row cheering. Tom said, "We always knew you would use your knowledge to heal the earth." Their belief in me gave me the courage to pursue my dreams of environmental conservation.

The Williams family didn''t just teach me about sustainability - they taught me about living authentically and finding peace in simplicity.',
'experience',
ARRAY[
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600',
  'https://images.unsplash.com/photo-1464822759844-d150ad6cdf0d?w=600'
]),

-- Nakamura Family story
('story005-5555-5555-5555-555555555555', 'std55555-5555-5555-5555-555555555555', 'fam55555-5555-5555-5555-555555555555',
'Discovering Inner Peace and Cultural Harmony',
'Moving in with the Nakamura family was like stepping into a living meditation. Their home perfectly blended Japanese tradition with modern American life, creating a space of profound tranquility and learning.

Every morning, Keiko would invite me to join her in the traditional tea ceremony in their tatami room. At first, I was clumsy and impatient, but slowly I learned that the beauty was in the mindful attention to each movement. "Lucas-kun," she would say gently, "the tea ceremony teaches us that every moment is precious and deserves our full presence."

Hiroshi became my calligraphy sensei, teaching me that each brush stroke requires patience and intention. During our evening sessions, he would share philosophical insights about balance and harmony. Through practicing Japanese characters, I learned to quiet my busy mind and find peace in the present moment.

Their Japanese garden became my favorite study spot. Surrounded by carefully placed stones, flowing water, and seasonal flowers, I found that complex programming problems became clearer. The garden taught me that, like code, beauty comes from simplicity and purposeful design.

What moved me most was how they honored both cultures. We celebrated American holidays like the Fourth of July with traditional Japanese foods, and observed Japanese festivals like cherry blossom season with American-style picnics. They showed me that identity doesn''t have to be either-or - it can be beautifully both.

Keiko''s ikebana lessons became metaphors for life. "Each flower has its perfect place," she would explain as we arranged seasonal bouquets. "Just like people in a family, or code in a program - everything works best when it''s in harmony with everything else."

When I graduated, they gave me a handmade zabuton (meditation cushion) and a calligraphy scroll that read "Where the heart is, there is home." Hiroshi said, "You came as a student, but you leave as family."

The Nakamuras taught me that technology and ancient wisdom can coexist beautifully, and that finding inner peace makes everything else possible.',
'experience',
ARRAY[
  'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600',
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600',
  'https://images.unsplash.com/photo-1550907809-a0e9d6e0e6b5?w=600'
]),

-- Smith Family story
('story006-6666-6666-6666-666666666666', 'std66666-6666-6666-6666-666666666666', 'fam66666-6666-6666-6666-666666666666',
'Country Roads and Life Lessons',
'Trading Madrid''s bustling streets for the peaceful Tennessee countryside was the best decision I ever made. The Smith family welcomed me into their world of genuine Southern hospitality and simple living that taught me profound life lessons.

Mary Smith''s kitchen became my second classroom. Every morning, I would wake to the smell of fresh biscuits and strong coffee. She patiently taught me to cook traditional Southern dishes - fried chicken, cornbread, and her famous banana pudding. "Honey," she would say in her sweet drawl, "cooking is just another way of showing love. You put your heart into every dish."

Jim became my unlikely mentor in confidence and rural wisdom. He taught me to ride horses, starting with gentle old Belle who seemed to understand my nervousness. "Sofia," he would chuckle, "horses can sense your feelings. If you trust them, they''ll trust you." Those riding lessons became metaphors for overcoming fear and finding courage.

Farm life taught me about hard work and genuine satisfaction. Collecting eggs each morning, helping with hay season, and learning to drive a tractor - these simple tasks grounded me in ways that city life never had. I discovered that working with your hands creates a different kind of happiness than academic achievements.

The front porch became our evening sanctuary. Jim would play his harmonica while Mary worked on her quilting, and I would share stories about Spain while they told tales of Tennessee history. Under the star-filled country sky, far from city lights, I learned to appreciate the beauty of quiet moments.

When they found out I was struggling financially, they quietly reduced my rent and started "paying" me for farm help. Their generosity came without fanfare or expectation - just pure kindness because they considered me family.

The night before I left, the whole community came for a farewell barbecue. Jim presented me with a handmade leather journal and said, "You came here as a foreign student, but you''re leaving as our Tennessee daughter."

The Smiths taught me that wealth isn''t measured in money but in the richness of relationships and the satisfaction of honest work.',
'experience',
ARRAY[
  'https://images.unsplash.com/photo-1422207049116-cfaf69531072?w=600',
  'https://images.unsplash.com/photo-1542880951-4edf61f1d9b1?w=600',
  'https://images.unsplash.com/photo-1571019613587-3e7ddd9d6ba3?w=600'
]),

-- Garcia Family story  
('story007-7777-7777-7777-777777777777', 'std77777-7777-7777-7777-777777777777', 'fam77777-7777-7777-7777-777777777777',
'Colors, Creativity, and Coastal Dreams',
'Living with the Garcia family was like stepping into a living art gallery where every day brought new inspiration and creative discovery. Their colorful beach cottage became the canvas for my artistic awakening.

Carmen''s pottery studio became my favorite refuge. With the sound of ocean waves in the background, she taught me to center clay and myself. "Chen," she would say, her hands covered in earth-colored clay, "art isn''t about perfection - it''s about expressing what lives in your heart." Under her patient guidance, I created my first ceramic pieces, each one capturing a memory of my time in America.

Diego opened my eyes to the power of public art. He took me along when he painted murals throughout San Diego, explaining how art can transform communities and tell important stories. Together, we created a small mural on their garden wall - a fusion of Chinese dragons and California poppies that represented my journey between cultures.

Their home itself was a masterpiece of creative living. Every room burst with color, handmade furniture, and artwork from local artists. Sunlight streamed through stained glass windows Carmen had crafted, casting rainbow reflections that danced across Diego''s paintings. Living there taught me that a home should be an expression of the soul.

Evening beach walks became my meditation. We would stroll along the sand, collecting shells and driftwood for Carmen''s art projects while Diego photographed the changing light. These quiet moments helped me process my experiences and find clarity about my artistic direction.

The most magical evening was when they surprised me with a small exhibition of my work in their backyard studio. Local artist friends came to celebrate, and I felt for the first time that I might actually be a real artist. Carmen hugged me and whispered, "Mijo, your art has found its voice."

When I left, they gave me a set of professional art supplies and a small painting Diego had created - a sunrise over the ocean with the inscription "For Chen - may your art always find the light."

The Garcias didn''t just teach me artistic techniques - they taught me to see beauty everywhere and trust my creative instincts.',
'experience',
ARRAY[
  'https://images.unsplash.com/photo-1495578942200-681feca4e671?w=600',
  'https://images.unsplash.com/photo-1561566889-a34a0c69e7bb?w=600',
  'https://images.unsplash.com/photo-1529259797334-6d0c7805e5d9?w=600'
]),

-- Taylor Family story
('story008-8888-8888-8888-888888888888', 'std88888-8888-8888-8888-888888888888', 'fam88888-8888-8888-8888-888888888888',
'Four Seasons of Growth and Discovery',
'The Taylor family didn''t just give me a home by the lake - they gave me a full year of American seasonal experiences that taught me about resilience, joy, and the beauty of change.

I arrived in late summer when the lake was perfect for swimming and kayaking. Robert taught me to fish from their dock, and though I rarely caught anything, those peaceful morning hours became my favorite meditation. Linda would bring us coffee and join our quiet conversations about life, dreams, and the patterns of nature.

Fall in Minnesota was magical beyond description. Linda and I would take long walks around the lake, collecting colorful leaves that she pressed between the pages of old books. She taught me to identify different trees and shared how each season brings its own lessons. "Emma," she would say, "just like trees need winter to rest and grow, sometimes we need quiet periods to discover our strength."

Winter was my biggest challenge as a Danish student who thought she knew cold weather! But the Taylors made it an adventure. Robert taught me to ice fish and cross-country ski, while Linda introduced me to the cozy Danish concept of "hygge" that she had learned from previous Scandinavian students. Their home became a warm sanctuary with hot cocoa, board games, and countless hours of conversation by the fireplace.

Spring brought new life and new understanding. I helped Linda plant her extensive garden, learning about Minnesota native plants and sustainable gardening practices. As we worked in the rich earth, she shared her philosophy about growth: "Plants teach us patience. You can''t rush growth, but with proper care and faith, beautiful things emerge."

The most precious tradition was their weekend "lake talks." Every Saturday evening, regardless of season, we would sit by the lake and share what we had learned that week. These conversations helped me process my exchange experience and gain perspective on my goals for environmental policy.

When it was time to leave, they presented me with a photo album documenting my full year through all four seasons, and a small jar of soil from their garden. "Plant something beautiful in Denmark," Linda said, "and remember that growth happens in cycles."

The Taylors taught me that home isn''t just a place - it''s a rhythm of life shared with people who care about your growth.',
'experience',
ARRAY[
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
  'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=600',
  'https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=600'
]);