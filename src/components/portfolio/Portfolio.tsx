import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { Hero, Experience, Education, Projects, SkillSlider, Blog, Footer, GitHubChart, SpotifyWidget, IllustrationOverlay, ResumeChat, Contact } from "./index";
import type { PortfolioData } from "../../types/portfolio";

interface PortfolioProps {
  data: PortfolioData;
}

const SECTION_TABS = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof SECTION_TABS)[number]["id"];

function PortfolioContent({ data }: PortfolioProps) {
  const { colors, mode } = useTheme();
  const [activeSection, setActiveSection] = useState<SectionId>("skills");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = SECTION_TABS.map((section) => section.id);

    const syncActiveSection = () => {
      let current: SectionId = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= 180) current = id;
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
    };
  }, []);

  const handleSectionTabClick = (id: SectionId) => {
    setActiveSection(id);
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.foreground}14 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        className="relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24"
        initial="hidden"
        animate="visible"
        variants={ANIMATION.stagger}
      >
        <Hero profile={data.profile} roles={data.roles} socials={data.socials} />

        <motion.section variants={ANIMATION.fadeIn} className="sticky top-3 z-30 mb-6">
          <div
            className="rounded-2xl border p-2 backdrop-blur-xl"
            style={{
              backgroundColor: mode === "dark" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.7)",
              borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            }}
          >
            <div className="flex items-center gap-2 overflow-x-auto">
              {SECTION_TABS.map((tab) => {
                const isActive = activeSection === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleSectionTabClick(tab.id)}
                    className="shrink-0 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all cursor-pointer"
                    style={
                      isActive
                        ? {
                            color: "#fff",
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          }
                        : {
                            color: `${colors.foreground}cc`,
                            backgroundColor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                          }
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section id="skills" variants={ANIMATION.fadeIn} className="mb-6 scroll-mt-28">
          <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
            My <span style={{ color: colors.foreground }} className="font-medium">skills</span>
          </p>
          <SkillSlider skills={data.skills} />
        </motion.section>

        <GitHubChart username={data.github} />
        {/* <SpotifyWidget /> */}

        <div id="experience" className="scroll-mt-28">
          <Experience experiences={data.experience} />
        </div>

        <div id="education" className="scroll-mt-28">
          <Education education={data.education} />
        </div>

        <div id="projects" className="scroll-mt-28">
          <Projects projects={data.projects} />
        </div>

        <div id="contact" className="scroll-mt-28">
          <Contact profile={data.profile} socials={data.socials} />
        </div>

        {/* <Blog blogs={data.blogs} /> */}
        <Footer quotes={data.quotes} handle={data.profile.handle} />
      </motion.div>

      {data.illustration && <IllustrationOverlay />}
      <ResumeChat />
    </div>
  );
}

export default function Portfolio({ data }: PortfolioProps) {
  return (
    <ThemeProvider initialTheme={data.theme}>
      <PortfolioContent data={data} />
    </ThemeProvider>
  );
}
