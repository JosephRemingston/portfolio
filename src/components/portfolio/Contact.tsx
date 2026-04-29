import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import type { Profile, Social } from "../../types/portfolio";
import Icon from "./Icon";

interface ContactProps {
  profile: Profile;
  socials: Social[];
}

export default function Contact({ profile, socials }: ContactProps) {
  const { colors, mode } = useTheme();

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative p-4 sm:p-6"
    >
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: colors.foreground }}>
            Contact
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: `${colors.foreground}99` }}>
            Reach me at
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-4 p-3 sm:p-4 rounded-lg border transition-colors hover:border-opacity-60"
            style={{
              borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
              backgroundColor: mode === "dark" ? "transparent" : "transparent",
            }}
          >
            <Mail className="w-5 h-5 flex-shrink-0" style={{ color: colors.primary }} />
            <div className="min-w-0">
              <p className="text-xs" style={{ color: `${colors.foreground}99` }}>
                Email
              </p>
              <p className="text-sm truncate" style={{ color: colors.foreground }}>
                {profile.email}
              </p>
            </div>
          </a>

          {/* Location */}
          <div
            className="flex items-center gap-4 p-3 sm:p-4 rounded-lg border"
            style={{
              borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            }}
          >
            <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: colors.accent }} />
            <div>
              <p className="text-xs" style={{ color: `${colors.foreground}99` }}>
                Location
              </p>
              <p className="text-sm" style={{ color: colors.foreground }}>
                {profile.location}
              </p>
            </div>
          </div>

          {/* Social Links */}
          {socials.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap justify-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs sm:text-sm border transition-colors"
                    style={{
                      color: colors.foreground,
                      borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                      backgroundColor: mode === "dark" ? "transparent" : "transparent",
                    }}
                  >
                    <Icon name={social.icon} className="w-3.5 h-3.5" />
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
