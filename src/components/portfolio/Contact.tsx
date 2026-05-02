import { Mail, MapPin } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import type { Profile, Social } from "../../types/portfolio";
import Icon from "./Icon";

interface ContactProps {
  profile: Profile;
  socials: Social[];
}

export default function Contact({ profile, socials }: ContactProps) {
  const { colors, mode } = useTheme();
  const borderColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const subtleSurface = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
  const mutedText = mode === "dark" ? "rgba(255,255,255,0.68)" : "rgba(0,0,0,0.58)";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-base font-semibold" style={{ color: colors.foreground }}>
          Contact details
        </h3>
        <p className="text-sm leading-6" style={{ color: mutedText }}>
          The fastest way to reach me is by email. If it is easier, you can also use the social links below.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-start gap-3 rounded-md border px-4 py-3 transition-colors"
          style={{
            borderColor,
            backgroundColor: subtleSurface,
          }}
        >
          <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: colors.primary }} />
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium" style={{ color: mutedText }}>
              Email
            </p>
            <p className="truncate text-sm" style={{ color: colors.foreground }}>
              {profile.email}
            </p>
          </div>
        </a>

        <div
          className="flex items-start gap-3 rounded-md border px-4 py-3"
          style={{
            borderColor,
            backgroundColor: subtleSurface,
          }}
        >
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: colors.accent }} />
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium" style={{ color: mutedText }}>
              Location
            </p>
            <p className="text-sm" style={{ color: colors.foreground }}>
              {profile.location}
            </p>
          </div>
        </div>
      </div>

      {socials.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium" style={{ color: colors.foreground }}>
            Elsewhere
          </h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors"
                style={{
                  color: colors.foreground,
                  borderColor,
                  backgroundColor: subtleSurface,
                }}
              >
                <Icon name={social.icon} className="h-4 w-4" />
                {social.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
