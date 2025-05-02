/*
  # Update waitlist emails policies

  1. Changes
    - Drop existing policies to avoid conflicts
    - Add policy for anonymous email submissions
    - Keep service role policy for all operations

  2. Security
    - Allow anonymous users to insert emails
    - Maintain service role access for all operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable all operations for service role" ON waitlist_emails;
DROP POLICY IF EXISTS "Allow anonymous email submissions" ON waitlist_emails;

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