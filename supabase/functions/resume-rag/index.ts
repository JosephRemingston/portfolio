const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ResumeRagRequest = {
  query?: string;
  context?: string;
  chatHistory?: ChatMessage[];
};

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
    const body = (await req.json()) as ResumeRagRequest;
    const query = body.query?.trim();

    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing query" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Context-first RAG: no vector DB lookup.
    const providedContext = body.context?.trim();
    const envContext = Deno.env.get("RESUME_CONTEXT")?.trim();
    const context = providedContext || envContext;

    if (!context) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "No context provided. Send context in request body or set RESUME_CONTEXT env var.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const model = Deno.env.get("LLM_MODEL") || "gpt-4o-mini";
    const apiKey = Deno.env.get("LLM_API_KEY") || Deno.env.get("OPENAI_API_KEY");
    const apiBase = Deno.env.get("LLM_API_BASE") || "https://api.openai.com/v1";

    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing LLM_API_KEY/OPENAI_API_KEY" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const history = (body.chatHistory || []).slice(-6);

    const systemPrompt = [
      "You are a resume assistant.",
      "Answer only using the provided CONTEXT.",
      "If the answer is not in the context, say you don't have that information.",
      "Keep answers concise and factual.",
      "When relevant, provide bullet points.",
      "Do not invent achievements, dates, companies, skills, or links.",
      "be funny for a protfolio website",
      "\nCONTEXT:\n",
      context,
    ].join("\n");

    const llmResponse = await fetch(`${apiBase}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: query },
        ],
      }),
    });

    if (!llmResponse.ok) {
      const errText = await llmResponse.text();
      return new Response(
        JSON.stringify({
          success: false,
          error: `LLM request failed (${llmResponse.status}): ${errText}`,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const llmData = await llmResponse.json();
    const answer = llmData?.choices?.[0]?.message?.content?.trim();

    return new Response(
      JSON.stringify({
        success: true,
        answer: answer || "I could not generate an answer.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
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
