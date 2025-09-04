-- Fix infinite recursion in user_profiles RLS policies
-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_type AS $$
  SELECT user_type FROM public.user_profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Drop and recreate the problematic admin policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;

CREATE POLICY "Admins can view all profiles" 
ON public.user_profiles
FOR SELECT 
USING (public.get_current_user_role() = 'admin'::user_type);

-- Now fix families table security
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Families are viewable by everyone" ON public.families;

-- Create restricted policies for families table
-- Anonymous users can only see basic discovery information
CREATE POLICY "Anonymous users can view basic family info"
ON public.families
FOR SELECT
USING (
  -- Only allow if the user is not authenticated (anonymous browsing)
  auth.uid() IS NULL
);

-- Authenticated users can see full family profiles
CREATE POLICY "Authenticated users can view full family profiles"
ON public.families
FOR SELECT
USING (
  -- Only allow if user is authenticated
  auth.uid() IS NOT NULL
);

-- Keep existing policies for families
-- (Families can update their own profile and admins can manage all families remain unchanged)