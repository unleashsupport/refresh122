import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Environment variables would be better in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const submitEmail = async (email: string) => {
  try {
    if (!isValidEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    const sanitizedEmail = email.toLowerCase().trim();
    
    const { error } = await supabase
      .from('waitlist_emails')
      .insert([{ email: sanitizedEmail }]);
    
    if (error) {
      if (error.code === '23505') { // Unique violation
        return { success: false, duplicate: true };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting email:', error);
    return { success: false, error };
  }
}