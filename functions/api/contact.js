// Cloudflare Pages Function — handles contact form submissions
// Forwards messages to site owner's email via Web3Forms (free, no email exposed)

const WEB3FORMS_KEY = '933e1612-10c5-41a9-b163-25c2ac9a235f';

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const body = await context.request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400, headers: corsHeaders
      });
    }

    // Basic validation
    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Input too long.' }), {
        status: 400, headers: corsHeaders
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email.' }), {
        status: 400, headers: corsHeaders
      });
    }

    // Use API key from environment variable, fall back to hardcoded
    const apiKey = context.env.CONTACT_API_KEY || WEB3FORMS_KEY;

    if (!apiKey) {
      // If no API key configured, store in KV or just log
      console.log('Contact form submission:', { name, email, message: message.substring(0, 100) });
      return new Response(JSON.stringify({ success: true, message: 'Message received! We\'ll get back to you soon.' }), {
        headers: corsHeaders
      });
    }

    // Forward to Web3Forms (delivers to your email, never exposes it)
    const resp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: apiKey,
        name,
        email,
        message,
        subject: `LeBron Tribute Site — Message from ${name}`,
        from_name: 'LeBron James Tribute Site'
      })
    });

    if (resp.ok) {
      return new Response(JSON.stringify({ success: true, message: 'Message sent! We\'ll get back to you soon.' }), {
        headers: corsHeaders
      });
    } else {
      return new Response(JSON.stringify({ error: 'Failed to send. Please try again.' }), {
        status: 500, headers: corsHeaders
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error.' }), {
      status: 500, headers: corsHeaders
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
