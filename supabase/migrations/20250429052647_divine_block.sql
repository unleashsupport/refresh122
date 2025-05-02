/*
  # Create email subscribers table

  1. New Tables
    - `email_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `created_at` (timestamptz)
      - `verified` (boolean)
      - `verification_token` (text, unique)
      - `token_expires_at` (timestamptz)

  2. Security
    - Enable RLS on `email_subscribers` table
    - Add policy for service role to manage subscribers
*/

CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  verified boolean DEFAULT false,
  verification_token text UNIQUE,
  token_expires_at timestamptz
);

ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for service role" ON email_subscribers
  FOR ALL
  TO service_role
  USING (true);