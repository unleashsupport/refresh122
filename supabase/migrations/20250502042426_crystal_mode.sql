/*
  # Create waitlist emails table

  1. New Tables
    - `waitlist_emails`
      - `email` (text, primary key)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `waitlist_emails` table
    - Add policy for service role to manage waitlist
*/

CREATE TABLE IF NOT EXISTS waitlist_emails (
  email text PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for service role" ON waitlist_emails
  FOR ALL
  TO service_role
  USING (true);