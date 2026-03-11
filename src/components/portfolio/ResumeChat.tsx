import { useState } from "react";
import { ResumeRAGClient } from "../../lib/resumeRAG";

// Initialize the client with environment variables
const ragClient = new ResumeRAGClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || ""
);

export function ResumeChat() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const result = await ragClient.query(query);

      if (result.success) {
        setAnswer(result.answer || "No answer generated");
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to query resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-chat">
      <h2>Ask About My Resume</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="query">Your Question:</label>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., What are your main skills?"
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading || !query.trim()}>
          {loading ? "Searching..." : "Ask"}
        </button>
      </form>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {answer && (
        <div className="answer">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
