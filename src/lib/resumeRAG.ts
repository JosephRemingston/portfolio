// Type definitions for Resume RAG Edge Function

export interface ResumeRAGQueryRequest {
  query: string;
  chatHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ResumeRAGResult {
  id: string;
  content: string;
  metadata: Record<string, any>;
  score?: number;
}

export interface ResumeRAGQueryResponse {
  success: boolean;
  results?: ResumeRAGResult[];
  answer?: string;
  error?: string;
}

export class ResumeRAGClient {
  private supabaseUrl: string;
  private supabaseKey: string;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
  }

  async query(
    query: string,
    options: {
      chatHistory?: Array<{
        role: "user" | "assistant";
        content: string;
      }>;
    } = {}
  ): Promise<ResumeRAGQueryResponse> {
    try {
      const response = await fetch(
        `${this.supabaseUrl}/functions/v1/resume-rag`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.supabaseKey}`,
          },
          body: JSON.stringify({
            query,
            chatHistory: options.chatHistory,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ResumeRAGQueryResponse = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
