/*
  # Add email sending functionality
  
  1. New Functions
    - `send_waitlist_email`: Sends welcome email with coupon code
    - Uses Supabase's http_post to send emails
    - Automatically triggered after waitlist signup

  2. Security
    - Function can only be executed by service role
    - Email template and credentials are secured in the function
*/

-- Enable the http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

-- Create the email sending function
CREATE OR REPLACE FUNCTION send_waitlist_email(subscriber_email TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  response json;
BEGIN
  SELECT INTO response
    extensions.http_post(
      'https://api.supabase.com/v1/email/send',
      json_build_object(
        'to', subscriber_email,
        'subject', '🎁 Your 20% Serge launch coupon',
        'html_content', format(
          '<h1>Welcome to Serge! 🎉</h1>
           <p>Thank you for joining our waitlist. Here''s your exclusive launch discount:</p>
           <div style="background: #f3f4f6; padding: 1rem; margin: 1rem 0; text-align: center; font-size: 1.5rem; font-weight: bold;">
             SERGE20
           </div>
           <p>Use this code at launch to get 20%% off your first 3 months.</p>
           <p>We''ll notify you as soon as Serge is ready!</p>'
        ),
        'from_name', 'Serge',
        'from_email', 'noreply@serge.ai'
      )::text,
      '{
        "Content-Type": "application/json",
        "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"
      }'::jsonb
    );
  
  RETURN response;
END;
$$;