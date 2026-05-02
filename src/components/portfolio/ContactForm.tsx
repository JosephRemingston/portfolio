import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          retry?: "auto" | "never";
          "expired-callback"?: () => void;
          "error-callback"?: (errorCode?: string) => boolean | void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const NETLIFY_FORM_NAME = "contact";

function getEmailError(email: string): string | null {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    return "Email is required";
  }

  if (normalizedEmail.length > 254) {
    return "Email is too long";
  }

  const parts = normalizedEmail.split("@");
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

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  companyWebsite: string;
}

export default function ContactForm() {
  const { colors, mode } = useTheme();
  const isLocalhost =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
  const turnstileSiteKey =
    isLocalhost && !import.meta.env.VITE_TURNSTILE_SITE_KEY
      ? TURNSTILE_TEST_SITE_KEY
      : import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    companyWebsite: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!turnstileSiteKey || !widgetRef.current) {
      return;
    }

    let cancelled = false;

    const mountWidget = () => {
      if (
        cancelled ||
        !widgetRef.current ||
        !window.turnstile ||
        widgetIdRef.current
      ) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: turnstileSiteKey,
        theme: mode,
        retry: "never",
        callback: (token) => {
          setTurnstileToken(token);
          setTurnstileReady(true);
          setErrors((prev) => ({ ...prev, turnstile: "", form: "" }));
        },
        "expired-callback": () => {
          setTurnstileToken("");
          setTurnstileReady(false);
        },
        "error-callback": (errorCode) => {
          setTurnstileToken("");
          setTurnstileReady(false);
          setErrors((prev) => ({
            ...prev,
            turnstile:
              errorCode === "110200"
                ? "Turnstile is not authorized for this domain. Add this hostname in Cloudflare or use the test key locally."
                : "Verification failed. Please try again.",
          }));
          return true;
        },
      });
    };

    if (window.turnstile) {
      mountWidget();
      return () => {
        cancelled = true;
      };
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]'
    );

    const script =
      existingScript ||
      Object.assign(document.createElement("script"), {
        src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
        async: true,
        defer: true,
      });

    const handleLoad = () => {
      mountWidget();
    };

    script.addEventListener("load", handleLoad);

    if (!existingScript) {
      document.head.appendChild(script);
    } else if (window.turnstile) {
      mountWidget();
    }

    return () => {
      cancelled = true;
      script.removeEventListener("load", handleLoad);
    };
  }, [mode, turnstileSiteKey]);

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailError = getEmailError(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (formData.companyWebsite.trim()) {
      newErrors.form = "Automated submission detected";
    }

    if (Date.now() - startedAt < 2500) {
      newErrors.form = "Please wait a moment and try again";
    }

    if (!turnstileSiteKey) {
      newErrors.form = "Turnstile is not configured";
    } else if (!turnstileToken) {
      newErrors.turnstile = "Please complete the verification check";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name] || errors.form || errors.turnstile) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        form: "",
        turnstile: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: "", turnstile: "" }));

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "form-name": NETLIFY_FORM_NAME,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          companyWebsite: formData.companyWebsite,
          "turnstile-token": turnstileToken,
        }).toString(),
      });

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          form: "Unable to send your message right now",
        }));
        return;
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        companyWebsite: "",
      });
      setTurnstileToken("");
      setTurnstileReady(false);
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: "Unable to send your message right now",
      }));
      return;
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const inputBaseStyle = {
    borderColor: mode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)",
    backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.9)",
    color: colors.foreground,
  };

  const getFieldStyle = (hasError: boolean) => ({
    ...inputBaseStyle,
    borderColor: hasError ? "#dc2626" : inputBaseStyle.borderColor,
  });

  const captionColor = mode === "dark" ? "rgba(255,255,255,0.64)" : "rgba(0,0,0,0.56)";
  const buttonShadow = mode === "dark" ? "0 1px 2px rgba(0,0,0,0.35)" : "0 1px 2px rgba(0,0,0,0.08)";

  return (
    <div className="space-y-5">
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-md border px-3 py-2.5 text-sm"
          style={{
            backgroundColor: mode === "dark" ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.08)",
            borderColor: "rgba(34,197,94,0.35)",
            color: mode === "dark" ? "#86efac" : "#166534",
          }}
        >
          ✓ Message sent successfully!
        </motion.div>
      )}

      {errors.form && (
        <div
          className="rounded-md border px-3 py-2.5 text-sm"
          style={{
            backgroundColor: mode === "dark" ? "rgba(220,38,38,0.12)" : "rgba(220,38,38,0.08)",
            borderColor: "rgba(220,38,38,0.25)",
            color: mode === "dark" ? "#fca5a5" : "#991b1b",
          }}
        >
          {errors.form}
        </div>
      )}

      <form
        name={NETLIFY_FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="companyWebsite"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
        <div className="hidden" aria-hidden="true">
          <label htmlFor="companyWebsite">Company website</label>
          <input
            type="text"
            id="companyWebsite"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            value={formData.companyWebsite}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium"
              style={{ color: colors.foreground }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Your name"
              className="w-full rounded-md border px-3 py-2.5 text-sm transition-colors focus:outline-none"
              style={getFieldStyle(Boolean(errors.name))}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs" style={{ color: "#dc2626" }}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium"
              style={{ color: colors.foreground }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="your@email.com"
              className="w-full rounded-md border px-3 py-2.5 text-sm transition-colors focus:outline-none"
              style={getFieldStyle(Boolean(errors.email))}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs" style={{ color: "#dc2626" }}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: colors.foreground }}
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            className="w-full rounded-md border px-3 py-2.5 text-sm transition-colors focus:outline-none"
            style={getFieldStyle(Boolean(errors.subject))}
          />
          {errors.subject && (
            <p className="mt-1.5 text-xs" style={{ color: "#dc2626" }}>
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: colors.foreground }}
          >
            Message
          </label>
          <textarea
            id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Tell me a bit about the project, timeline, or what you need help with."
              rows={6}
              className="w-full resize-none rounded-md border px-3 py-2.5 text-sm leading-6 transition-colors focus:outline-none"
              style={getFieldStyle(Boolean(errors.message))}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs" style={{ color: "#dc2626" }}>
              {errors.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div ref={widgetRef} />
          {errors.turnstile && (
            <p className="text-xs" style={{ color: "#dc2626" }}>
              {errors.turnstile}
            </p>
          )}
          {!turnstileSiteKey && (
            <p className="text-xs" style={{ color: "#dc2626" }}>
              Add `VITE_TURNSTILE_SITE_KEY` to enable Cloudflare Turnstile.
            </p>
          )}
          {isLocalhost && turnstileSiteKey === TURNSTILE_TEST_SITE_KEY && (
            <p className="text-xs leading-5" style={{ color: captionColor }}>
              Using Cloudflare’s local test key on {window.location.hostname}.
            </p>
          )}
          {turnstileSiteKey && (
            <p className="text-xs leading-5" style={{ color: captionColor }}>
              Protected by Cloudflare Turnstile and submitted through Netlify Forms.
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || (!!turnstileSiteKey && !turnstileReady)}
          whileHover={{ opacity: isLoading ? 1 : 0.92 }}
          whileTap={{ opacity: isLoading ? 1 : 0.88 }}
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            boxShadow: buttonShadow,
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium text-white transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          <span>{isLoading ? "Sending..." : "Send message"}</span>
        </motion.button>
      </form>
    </div>
  );
}
