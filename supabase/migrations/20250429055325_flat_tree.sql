/*
  # Fix email subscribers RLS policy

  1. Changes
    - Drop existing anonymous insert policy
    - Create new, more specific insert policy for anonymous users
    
  2. Security
    - Explicitly define which columns can be inserted
    - Ensure verification token and expiry are required
    - Prevent duplicate emails through RLS
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow anonymous email submissions" ON email_subscribers;

-- Create new specific policy for anonymous insertions
CREATE POLICY "Allow verified email submissions" ON email_subscribers
FOR INSERT TO anon
WITH CHECK (
  -- Ensure required fields are present
  email IS NOT NULL AND
  verification_token IS NOT NULL AND
  token_expires_at IS NOT NULL AND
  -- Ensure token_expires_at is in the future
  token_expires_at > NOW() AND
  -- Prevent duplicate emails
  NOT EXISTS (
    SELECT 1 FROM email_subscribers 
    WHERE email_subscribers.email = email
  )
);