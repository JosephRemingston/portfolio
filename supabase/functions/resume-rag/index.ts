import { GoogleGenerativeAI } from "npm:@google/generative-ai@0.21.0";

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

const SYSTEM_PROMPT = [
  "You are a resume assistant.",
  "Answer only using the provided CONTEXT.",
  "If the answer is not in the context, say you don't have that information.",
  "Keep answers concise and factual.",
  "When relevant, provide bullet points.",
  "Do not invent achievements, dates, companies, skills, or links.",
  "Be funny for a portfolio website.",
].join("\n");

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

    const modelName = Deno.env.get("LLM_MODEL") || "gemini-2.5-flash";
    const apiKey = Deno.env.get("GEMINI_API_KEY") || Deno.env.get("LLM_API_KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing GEMINI_API_KEY/LLM_API_KEY" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const history = (body.chatHistory || []).slice(-6);

    const historyText = history
      .map((m) => `${m.role === "assistant" ? "Assistant" : "User"}: ${m.content}`)
      .join("\n");

    const userPrompt = [
      "CONTEXT:",
      context,
      "",
      historyText ? "RECENT CHAT HISTORY:" : "",
      historyText,
      historyText ? "" : "",
      `USER QUESTION: ${query}`,
    ]
      .filter(Boolean)
      .join("\n");

    let answer = "";
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 700,
          topP: 0.95,
          topK: 40,
        },
      });

      const result = await model.generateContent(userPrompt);
      answer = result.response.text()?.trim() || "";
    } catch (llmError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: llmError instanceof Error ? `LLM request failed: ${llmError.message}` : "LLM request failed",
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

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
