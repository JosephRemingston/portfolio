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
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          boxShadow: isOpen 
            ? "0 10px 40px rgba(0,0,0,0.2)" 
            : "0 4px 20px rgba(0,0,0,0.15)"
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 12px 50px rgba(0,0,0,0.3)",
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span 
              key="close" 
              initial={{ rotate: -180, opacity: 0, scale: 0.5 }} 
              animate={{ rotate: 0, opacity: 1, scale: 1 }} 
              exit={{ rotate: 180, opacity: 0, scale: 0.5 }} 
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span 
              key="open" 
              initial={{ scale: 0, opacity: 0, rotate: -180 }} 
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: 0,
              }} 
              exit={{ scale: 0, opacity: 0, rotate: 180 }} 
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              y: 30, 
              scale: 0.9,
              rotateX: -15
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateX: 0
            }}
            exit={{ 
              opacity: 0, 
              y: 30, 
              scale: 0.95,
              rotateX: 10
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              height: "min(500px, calc(100vh - 10rem))",
              backgroundColor: colors.background,
              border: `1px solid ${colors.border}`,
              transformPerspective: "1000px"
            }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center gap-3 px-5 py-4 shrink-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.div 
                className="w-9 h-9 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(255,255,255,0.4)",
                    "0 0 0 8px rgba(255,255,255,0)",
                    "0 0 0 0 rgba(255,255,255,0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                <Bot className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <motion.p 
                  className="text-sm font-semibold text-white leading-tight"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Resume Chat
                </motion.p>
                <motion.p 
                  className="text-xs text-white/70"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Ask me anything
                </motion.p>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg transition-colors cursor-pointer"
                whileHover={{ 
                  backgroundColor: "rgba(255,255,255,0.3)",
                  scale: 1.1,
                  rotate: 90
                }}
                whileTap={{ scale: 0.9, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    y: 15,
                    scale: 0.95,
                    x: msg.role === "user" ? 20 : -20
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    x: 0
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: i === messages.length - 1 ? 0 : 0
                  }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <motion.div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: msg.role === "assistant" ? `${colors.accent}20` : `${colors.primary}20`,
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                      delay: 0.1
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                    ) : (
                      <User className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    )}
                  </motion.div>
                  <motion.div
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
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: 0.05
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
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
                  </motion.div>
                </motion.div>
              ))}

              {loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.8 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex gap-2.5"
                >
                  <motion.div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${colors.accent}20` }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Bot className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  </motion.div>
                  <motion.div
                    className="rounded-xl px-4 py-3 flex items-center gap-2"
                    style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 rgba(0,0,0,0)",
                        "0 2px 8px rgba(0,0,0,0.05)",
                        "0 0 0 rgba(0,0,0,0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Loader2 className="w-4 h-4" style={{ color: colors.accent }} />
                    </motion.div>
                    <span className="text-xs flex items-center gap-1" style={{ color: `${colors.foreground}80` }}>
                      Thinking
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                      >.</motion.span>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
                      >.</motion.span>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
                      >.</motion.span>
                    </span>
                  </motion.div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.form
              onSubmit={handleSubmit}
              className="shrink-0 px-4 py-3 flex items-center gap-2"
              style={{ borderTop: `1px solid ${colors.border}` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a question…"
                disabled={loading}
                className="flex-1 text-sm rounded-xl px-4 py-2.5 outline-none placeholder:opacity-50 transition-all"
                style={{
                  backgroundColor: `${colors.foreground}08`,
                  color: colors.foreground,
                  border: `1px solid ${colors.border}`,
                }}
                whileFocus={{ 
                  scale: 1.01,
                  borderColor: colors.primary,
                  boxShadow: `0 0 0 2px ${colors.primary}20`
                }}
              />
              <motion.button
                type="submit"
                disabled={loading || !query.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 cursor-pointer disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  color: "#fff",
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: -15,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.9, rotate: 0 }}
                animate={{
                  opacity: loading || !query.trim() ? 0.3 : 1
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
              >
                <motion.div
                  animate={loading ? { x: [0, 3, 0] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
