import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Send, User, FileText } from "lucide-react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getGradient, getSectionGradient, getGlowColor } from "../../lib/themes";
import type { Profile, Social } from "../../types/portfolio";
import Icon from "./Icon";
import { useState } from "react";

interface ContactProps {
  profile: Profile;
  socials: Social[];
}

export default function Contact({ profile, socials }: ContactProps) {
  const { colors, mode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const fieldBackground = mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)";
  const fieldBorder = mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";

  const handleFieldFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = `${colors.primary}99`;
    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}22`;
  };

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = fieldBorder;
    e.currentTarget.style.boxShadow = "none";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setSubmitState("error");
      setSubmitMessage("Missing Supabase environment variables.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitState("idle");
      setSubmitMessage("");

      await axios.post(`${supabaseUrl}/functions/v1/contactForm`, formData, {
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        timeout: 15000,
      });

      setSubmitState("success");
      setSubmitMessage("Message sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || error.message || "Failed to send message."
        : "Failed to send message.";

      setSubmitState("error");
      setSubmitMessage(typeof message === "string" ? message : "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full blur-3xl pointer-events-none"
        style={{ background: getGlowColor(colors, mode) }}
      />
      <div
        className="absolute -top-28 -left-28 w-52 h-52 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${colors.accent}22` }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div
            className="h-6 sm:h-8 w-1 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.accent})` }}
          />
          <h2 className="text-base sm:text-lg font-semibold" style={{ color: colors.foreground }}>
            Contact
          </h2>
        </div>
        <p className="mb-4 sm:mb-5 text-xs sm:text-sm" style={{ color: `${colors.foreground}99` }}>
          Have an idea, collaboration, or role in mind? Send a message.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-4 sm:gap-5">
          <div
            className="rounded-xl border p-4 sm:p-5 backdrop-blur-md h-fit"
            style={{
              backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.65)",
              borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            }}
          >
            <p className="text-xs sm:text-sm mb-3" style={{ color: `${colors.foreground}99` }}>
              Reach out directly
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-start gap-2.5 rounded-lg border p-3 transition-colors"
                style={{
                  borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
                }}
              >
                <Mail className="w-4 h-4 mt-0.5" style={{ color: colors.primary }} />
                <div className="min-w-0">
                  <p className="text-xs" style={{ color: `${colors.foreground}99` }}>
                    Email
                  </p>
                  <p className="text-sm truncate" style={{ color: colors.foreground }}>
                    {profile.email}
                  </p>
                </div>
              </a>

              <div
                className="flex items-start gap-2.5 rounded-lg border p-3"
                style={{
                  borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
                }}
              >
                <MapPin className="w-4 h-4 mt-0.5" style={{ color: colors.accent }} />
                <div>
                  <p className="text-xs" style={{ color: `${colors.foreground}99` }}>
                    Location
                  </p>
                  <p className="text-sm" style={{ color: colors.foreground }}>
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm mt-4 mb-2" style={{ color: `${colors.foreground}99` }}>
              Social profiles
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs sm:text-sm"
                  style={{
                    color: colors.foreground,
                    borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                    backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
                  }}
                >
                  <Icon name={social.icon} className="w-3.5 h-3.5" />
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border p-4 sm:p-5 backdrop-blur-md space-y-3"
            style={{
              backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.65)",
              borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs mb-1.5 block" style={{ color: `${colors.foreground}99` }}>
                  Name
                </span>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: `${colors.foreground}80` }} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    placeholder="Your name"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm transition-all outline-none"
                    style={{
                      backgroundColor: fieldBackground,
                      borderColor: fieldBorder,
                      color: colors.foreground,
                    }}
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs mb-1.5 block" style={{ color: `${colors.foreground}99` }}>
                  Email
                </span>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: `${colors.foreground}80` }} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm transition-all outline-none"
                    style={{
                      backgroundColor: fieldBackground,
                      borderColor: fieldBorder,
                      color: colors.foreground,
                    }}
                    required
                  />
                </div>
              </label>
            </div>

            <label className="block">
              <span className="text-xs mb-1.5 block" style={{ color: `${colors.foreground}99` }}>
                Subject
              </span>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: `${colors.foreground}80` }} />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
                  onBlur={handleFieldBlur}
                  placeholder="Project inquiry"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm transition-all outline-none"
                  style={{
                    backgroundColor: fieldBackground,
                    borderColor: fieldBorder,
                    color: colors.foreground,
                  }}
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs mb-1.5 block" style={{ color: `${colors.foreground}99` }}>
                Message
              </span>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-3 top-3" style={{ color: `${colors.foreground}80` }} />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleFieldFocus}
                  onBlur={handleFieldBlur}
                  rows={5}
                  placeholder="Tell me a little about what you want to build..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm transition-all outline-none resize-none"
                  style={{
                    backgroundColor: fieldBackground,
                    borderColor: fieldBorder,
                    color: colors.foreground,
                  }}
                  required
                />
              </div>
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: getGradient(colors),
                  boxShadow: `0 8px 18px -10px ${colors.primary}99`,
                  opacity: isSubmitting ? 0.8 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>

            {submitState !== "idle" && (
              <p
                className="text-xs"
                style={{ color: submitState === "success" ? colors.accent : "#ef4444" }}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </motion.section>
  );
}
