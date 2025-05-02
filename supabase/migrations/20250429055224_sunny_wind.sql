/*
  # Add insert policy for email subscribers

  1. Changes
    - Add policy to allow inserting new email subscribers
    - This allows unauthenticated users to submit their email addresses

  2. Security
    - Policy only allows INSERT operations
    - No other operations (SELECT, UPDATE, DELETE) are permitted for anonymous users
*/

CREATE POLICY "Allow anonymous email submissions" ON email_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);