-- Remove the overly permissive policy that exposes student stories to public
DROP POLICY IF EXISTS "Everyone can view published student stories" ON public.student_stories;

-- Add a secure policy that restricts access to authenticated users only
CREATE POLICY "Authenticated users can view student stories" 
ON public.student_stories 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);