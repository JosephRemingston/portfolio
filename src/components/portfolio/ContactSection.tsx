import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import Contact from "./Contact";
import ContactForm from "./ContactForm";
import type { Profile, Social } from "../../types/portfolio";

interface ContactSectionProps {
  profile: Profile;
  socials: Social[];
}

export default function ContactSection({ profile, socials }: ContactSectionProps) {
  const { colors, mode } = useTheme();
  const sectionBorder = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const sectionSurface = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.72)";
  const mutedText = mode === "dark" ? "rgba(255,255,255,0.68)" : "rgba(0,0,0,0.58)";

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 px-4 sm:mb-6 sm:px-6"
    >
      <div className="mx-auto mb-6 max-w-5xl text-center sm:mb-8">
        <h2
          className="mb-2 text-lg font-semibold sm:text-xl"
          style={{ color: colors.foreground }}
        >
          Get in Touch
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-6" style={{ color: mutedText }}>
          Reach out if you want to discuss a project, an opportunity, or anything else worth building.
        </p>
      </div>

      <div
        className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-xl border lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]"
        style={{
          borderColor: sectionBorder,
          backgroundColor: sectionSurface,
        }}
      >
        <div
          className="border-b p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-8"
          style={{ borderColor: sectionBorder }}
        >
          <Contact profile={profile} socials={socials} />
        </div>
        <div className="p-5 sm:p-6 lg:p-8">
          <ContactForm />
        </div>
      </div>
    </motion.section>
  );
}
