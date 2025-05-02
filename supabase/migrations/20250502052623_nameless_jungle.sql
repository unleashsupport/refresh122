/*
  # Fix waitlist RLS policies

  1. Changes
    - Add policy to allow anonymous users to insert emails
    - Keep service role policy for all operations
    
  2. Security
    - Anonymous users can only insert new emails
    - Service role retains full access
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable all operations for service role" ON waitlist_emails;

-- Recreate service role policy
CREATE POLICY "Enable all operations for service role" ON waitlist_emails
  FOR ALL
  TO service_role
  USING (true);

-- Add policy for anonymous insertions
CREATE POLICY "Allow anonymous email submissions" ON waitlist_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);