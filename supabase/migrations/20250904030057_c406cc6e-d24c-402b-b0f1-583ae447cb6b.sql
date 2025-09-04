-- Drop the insecure families_public view that bypasses RLS policies
-- This view was running with SECURITY DEFINER which allows unauthenticated access
-- to family data, bypassing the authentication requirements in RLS policies
DROP VIEW IF EXISTS public.families_public;