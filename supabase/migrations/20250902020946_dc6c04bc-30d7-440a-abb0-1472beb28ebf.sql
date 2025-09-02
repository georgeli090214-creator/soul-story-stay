-- Create enum for user types
CREATE TYPE public.user_type AS ENUM ('student', 'host_family', 'admin');

-- Create enum for inquiry status
CREATE TYPE public.inquiry_status AS ENUM ('pending', 'accepted', 'declined');

-- Create enum for story type
CREATE TYPE public.story_type AS ENUM ('moment', 'growth_letter', 'milestone');

-- Create families table
CREATE TABLE public.families (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  price_range TEXT NOT NULL,
  hosting_experience TEXT NOT NULL,
  description TEXT,
  family_story TEXT,
  why_we_host TEXT,
  video_url TEXT,
  photos TEXT[],
  values TEXT[],
  current_students INTEGER DEFAULT 0,
  total_students_hosted INTEGER DEFAULT 0,
  average_stay_months INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  age INTEGER,
  university TEXT,
  hometown TEXT,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inquiries table for connection requests
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  status public.inquiry_status DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table for communication
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student stories table for growth documentation
CREATE TABLE public.student_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  story_type public.story_type NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  photos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_profiles table to link auth users with their type
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  user_type public.user_type NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for families
CREATE POLICY "Families are viewable by everyone" ON public.families FOR SELECT USING (true);
CREATE POLICY "Families can update their own profile" ON public.families FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all families" ON public.families FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE user_id = auth.uid() AND user_type = 'admin'
  )
);

-- Create RLS policies for students
CREATE POLICY "Students can view their own profile" ON public.students FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students can update their own profile" ON public.students FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Students can create their own profile" ON public.students FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for inquiries
CREATE POLICY "Students can view their own inquiries" ON public.inquiries 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE students.id = inquiries.student_id AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Families can view inquiries to them" ON public.inquiries 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.families 
      WHERE families.id = inquiries.family_id AND families.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can create inquiries" ON public.inquiries 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE students.id = inquiries.student_id AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Families can update inquiry status" ON public.inquiries 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.families 
      WHERE families.id = inquiries.family_id AND families.user_id = auth.uid()
    )
  );

-- Create RLS policies for messages
CREATE POLICY "Users can view messages in their inquiries" ON public.messages 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.inquiries 
      WHERE inquiries.id = messages.inquiry_id 
      AND (
        EXISTS (
          SELECT 1 FROM public.students 
          WHERE students.id = inquiries.student_id AND students.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1 FROM public.families 
          WHERE families.id = inquiries.family_id AND families.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can send messages in their inquiries" ON public.messages 
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.inquiries 
      WHERE inquiries.id = messages.inquiry_id 
      AND (
        EXISTS (
          SELECT 1 FROM public.students 
          WHERE students.id = inquiries.student_id AND students.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1 FROM public.families 
          WHERE families.id = inquiries.family_id AND families.user_id = auth.uid()
        )
      )
    )
  );

-- Create RLS policies for student stories
CREATE POLICY "Everyone can view published student stories" ON public.student_stories FOR SELECT USING (true);
CREATE POLICY "Students can create their own stories" ON public.student_stories 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE students.id = student_stories.student_id AND students.user_id = auth.uid()
    )
  );

-- Create RLS policies for user profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.user_profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles up 
    WHERE up.user_id = auth.uid() AND up.user_type = 'admin'
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_families_updated_at
  BEFORE UPDATE ON public.families
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();