import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react";
import Markdown from "react-markdown";
import { useTheme } from "../../context/ThemeContext";
import { ResumeRAGClient } from "../../lib/resumeRAG";

const ragClient = new ResumeRAGClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || ""
);

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ResumeChat() {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! Ask me anything about my resume — skills, experience, projects, or education." },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setQuery("");
    setLoading(true);

    try {
      const result = await ragClient.query(trimmed);
      const reply = result.success
        ? result.answer || "I couldn't find a specific answer for that."
        : result.error || "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
          color: "#fff",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              height: "min(500px, calc(100vh - 10rem))",
              backgroundColor: colors.background,
              border: `1px solid ${colors.border}`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 shrink-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">Resume Chat</p>
                <p className="text-xs text-white/70">Ask me anything</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: msg.role === "assistant" ? `${colors.accent}20` : `${colors.primary}20`,
                    }}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                    ) : (
                      <User className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    )}
                  </div>
                  <div
                    className="max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                            color: "#fff",
                          }
                        : {
                            backgroundColor: colors.card,
                            color: colors.foreground,
                            border: `1px solid ${colors.border}`,
                          }
                    }
                  >
                    {msg.role === "assistant" ? (
                      <Markdown
                        components={{
                          p: ({ children }) => <p className="my-1 first:mt-0 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="my-1.5 ml-4 list-disc space-y-1 first:mt-0 last:mb-0">{children}</ul>,
                          ol: ({ children }) => <ol className="my-1.5 ml-4 list-decimal space-y-1 first:mt-0 last:mb-0">{children}</ol>,
                          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                          strong: ({ children }) => (
                            <strong className="font-semibold" style={{ color: colors.accent }}>{children}</strong>
                          ),
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: colors.primary }}>{children}</a>
                          ),
                          code: ({ children }) => (
                            <code className="rounded px-1 py-0.5 text-xs" style={{ backgroundColor: `${colors.foreground}10` }}>{children}</code>
                          ),
                        }}
                      >
                        {msg.content}
                      </Markdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${colors.accent}20` }}
                  >
                    <Bot className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  </div>
                  <div
                    className="rounded-xl px-4 py-3 flex items-center gap-2"
                    style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}
                  >
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: colors.accent }} />
                    <span className="text-xs" style={{ color: `${colors.foreground}80` }}>Thinking…</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 px-4 py-3 flex items-center gap-2"
              style={{ borderTop: `1px solid ${colors.border}` }}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a question…"
                disabled={loading}
                className="flex-1 text-sm rounded-xl px-4 py-2.5 outline-none placeholder:opacity-50"
                style={{
                  backgroundColor: `${colors.foreground}08`,
                  color: colors.foreground,
                  border: `1px solid ${colors.border}`,
                }}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-opacity cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  color: "#fff",
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
