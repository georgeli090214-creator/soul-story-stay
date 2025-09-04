-- Drop the problematic view and recreate it properly
DROP VIEW IF EXISTS public.families_public;

-- Recreate the view without SECURITY DEFINER (it's a regular view by default)
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

-- Enable RLS on the view
ALTER VIEW public.families_public SET (security_barrier = true);

-- Grant SELECT access to the view 
GRANT SELECT ON public.families_public TO anon, authenticated;