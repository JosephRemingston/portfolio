const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

type ContactRequestBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  companyWebsite?: string;
  turnstileToken?: string;
};

function getEmailError(email: string): string | null {
  if (!email) {
    return "Email is required";
  }

  if (email.length > 254) {
    return "Email is too long";
  }

  const parts = email.split("@");
  if (parts.length !== 2) {
    return "Please enter a valid email";
  }

  const [localPart, domain] = parts;
  if (!localPart || !domain) {
    return "Please enter a valid email";
  }

  if (localPart.length > 64 || localPart.startsWith(".") || localPart.endsWith(".")) {
    return "Please enter a valid email";
  }

  if (localPart.includes("..") || domain.includes("..")) {
    return "Please enter a valid email";
  }

  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(localPart)) {
    return "Please enter a valid email";
  }

  if (
    !/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(
      domain
    )
  ) {
    return "Please enter a valid email";
  }

  return null;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = (await req.json()) as ContactRequestBody;
    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const subject = body.subject?.trim() || "";
    const message = body.message?.trim() || "";
    const companyWebsite = body.companyWebsite?.trim() || "";
    const turnstileToken = body.turnstileToken?.trim() || "";

    if (!name || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailError = getEmailError(email);
    if (emailError) {
      return new Response(
        JSON.stringify({ success: false, error: emailError }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (companyWebsite) {
      return new Response(
        JSON.stringify({ success: false, error: "Automated submission detected" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing Turnstile token" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const turnstileSecret =
      Deno.env.get("TURNSTILE_SECRET_KEY") ||
      (Deno.env.get("ENVIRONMENT") !== "production"
        ? TURNSTILE_TEST_SECRET_KEY
        : undefined);
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const contactToEmail = Deno.env.get("CONTACT_TO_EMAIL");
    const contactFromEmail =
      Deno.env.get("CONTACT_FROM_EMAIL") || "Portfolio Contact <onboarding@resend.dev>";

    if (!turnstileSecret || !resendApiKey || !contactToEmail) {
      return new Response(
        JSON.stringify({ success: false, error: "Contact form is not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const ipAddress =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
          ...(ipAddress ? { remoteip: ipAddress } : {}),
        }),
      }
    );

    const turnstileResult = (await turnstileResponse.json()) as {
      success?: boolean;
    };

    if (!turnstileResponse.ok || !turnstileResult.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Turnstile verification failed" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email,
        subject: `Portfolio contact: ${subject}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          "",
          message,
        ].join("\n"),
        html: `
          <div>
            <h2>New portfolio contact submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      return new Response(
        JSON.stringify({
          success: false,
          error: resendError || "Failed to send email",
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unexpected server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
