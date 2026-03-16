import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_THEME = {
  primary: "#059669",
  secondary: "#065f46",
  accent: "#10b981",
  highlight: "#34d399",
  muted: "#6ee7b7",
  background: "#0a0a0a",
  foreground: "#fafafa",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
};

const handler = async (request: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactRequest = await request.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio contact form <server@resend.dev>",
        to: ["ljremi@gmail.com"],
        reply_to: email,
        subject: `New Contact Request: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>New Contact Request</title>
            </head>
            <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${EMAIL_THEME.background}; margin: 0; padding: 0; color: ${EMAIL_THEME.foreground};">
              <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <div style="background-color: ${EMAIL_THEME.card}; border: 1px solid ${EMAIL_THEME.border}; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55); backdrop-filter: blur(4px);">
                  
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, ${EMAIL_THEME.secondary}, ${EMAIL_THEME.primary}); padding: 24px 32px; border-bottom: 1px solid ${EMAIL_THEME.border};">
                    <span style="color: ${EMAIL_THEME.foreground}; font-size: 19px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;">Portfolio Contact</span>
                  </div>

                  <!-- Content -->
                  <div style="padding: 32px;">
                    <h2 style="color: ${EMAIL_THEME.foreground}; margin-top: 0; margin-bottom: 24px; font-size: 20px; font-weight: 600;">New Message Received</h2>
                    
                    <div style="margin-bottom: 24px;">
                      <div style="color: ${EMAIL_THEME.highlight}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; font-weight: 600;">Sender</div>
                      <div style="color: ${EMAIL_THEME.foreground}; font-size: 16px;">${name}</div>
                      <div style="color: ${EMAIL_THEME.accent}; font-size: 14px; margin-top: 4px; opacity: 0.95;">${email}</div>
                    </div>

                    <div style="margin-bottom: 24px;">
                      <div style="color: ${EMAIL_THEME.highlight}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; font-weight: 600;">Subject</div>
                      <div style="color: ${EMAIL_THEME.foreground}; font-size: 16px;">${subject}</div>
                    </div>

                    <div style="margin-bottom: 8px;">
                      <div style="color: ${EMAIL_THEME.highlight}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; font-weight: 600;">Message</div>
                      <div style="background-color: rgba(0, 0, 0, 0.22); border: 1px solid ${EMAIL_THEME.border}; border-radius: 8px; padding: 20px; color: ${EMAIL_THEME.foreground}; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div style="padding: 24px; text-align: center; border-top: 1px solid ${EMAIL_THEME.border}; background-color: rgba(0, 0, 0, 0.22);">
                    <p style="margin: 0; color: ${EMAIL_THEME.muted}; font-size: 12px; opacity: 0.85;">Sent from your portfolio contact form</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);