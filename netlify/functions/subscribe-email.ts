import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Upsert email into waitlist
    const { error: dbError } = await supabase
      .from('waitlist_emails')
      .upsert({ email }, { onConflict: 'email' });

    if (dbError) {
      console.error('Database error:', dbError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save email' }),
      };
    }

    // Send coupon email
    await resend.emails.send({
      from: 'Serge <noreply@serge.ai>',
      to: email,
      subject: '🎁 Your 20% Serge launch coupon',
      html: `
        <h1>Welcome to Serge! 🎉</h1>
        <p>Thank you for joining our waitlist. Here's your exclusive launch discount:</p>
        <div style="background: #f3f4f6; padding: 1rem; margin: 1rem 0; text-align: center; font-size: 1.5rem; font-weight: bold;">
          SERGE20
        </div>
        <p>Use this code at launch to get 20% off your first 3 months.</p>
        <p>We'll notify you as soon as Serge is ready!</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}