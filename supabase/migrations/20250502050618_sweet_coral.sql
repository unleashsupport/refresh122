/*
  # Add email trigger
  
  1. New Trigger
    - Automatically sends welcome email when new subscriber added
    - Uses the send_waitlist_email function
    
  2. Security
    - Trigger runs with security definer permissions
*/

-- Create the trigger function
CREATE OR REPLACE FUNCTION trigger_send_waitlist_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM send_waitlist_email(NEW.email);
  RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER send_welcome_email
  AFTER INSERT ON waitlist_emails
  FOR EACH ROW
  EXECUTE FUNCTION trigger_send_waitlist_email();