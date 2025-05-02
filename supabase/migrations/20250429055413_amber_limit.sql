/*
  # Fix email subscribers RLS policy

  1. Changes
    - Fix the INSERT policy for anonymous users to correctly check for duplicate emails
    - Ensure token and expiration requirements are properly enforced
  
  2. Security
    - Maintains RLS enabled on email_subscribers table
    - Updates policy to correctly handle email uniqueness check
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow verified email submissions" ON email_subscribers;

-- Create the fixed policy
CREATE POLICY "Allow verified email submissions"
ON email_subscribers
FOR INSERT
TO anon
WITH CHECK (
  -- Ensure required fields are present
  email IS NOT NULL AND
  verification_token IS NOT NULL AND
  token_expires_at IS NOT NULL AND
  -- Ensure token hasn't expired
  token_expires_at > now() AND
  -- Check for duplicate emails correctly
  NOT EXISTS (
    SELECT 1 FROM email_subscribers
    WHERE email_subscribers.email = email
  )
);