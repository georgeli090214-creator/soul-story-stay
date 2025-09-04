-- Create a secure public view that excludes user_id for anonymous access
CREATE VIEW public.families_public AS
SELECT 
  id,
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
  photos,
  video_url,
  why_we_host,
  family_story,
  created_at,
  updated_at
FROM public.families
WHERE verified = true;

-- Grant access to the view for anonymous and authenticated users  
GRANT SELECT ON public.families_public TO anon, authenticated;

-- Drop the existing anonymous access policy from families table
DROP POLICY IF EXISTS "Anonymous users can view basic family info" ON public.families;

-- Update families table policies - only allow authenticated access
CREATE POLICY "Authenticated users can view verified families" 
ON public.families 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND verified = true);

-- Add explicit policy to block all anonymous access to user_profiles
-- (defense in depth, even though existing policies should already block this)
CREATE POLICY "Block all anonymous access to user_profiles" 
ON public.user_profiles 
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);