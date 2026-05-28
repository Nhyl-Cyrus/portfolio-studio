// CONTROLLER + VIEW COMPOSER
// Wires controller hooks (state + interaction) to view components.
// Keeps no business data of its own – data lives in the model layer.
import { useState } from "react";

import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

import { useTheme } from "@/controllers/useTheme";
import { useReveal } from "@/controllers/useReveal";
import { useScrollSpy } from "@/controllers/useScrollSpy";
import { useTypedRole } from "@/controllers/useTypedRole";

import { HERO_STATS, NAV_LINKS, ROLES } from "@/models";

export default function Portfolio() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { scrolled, activeId, scrollTo } = useScrollSpy("hero");
  const typed = useTypedRole(ROLES);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  const navigate = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <Navbar
        brand="NCG"
        links={NAV_LINKS}
        activeId={activeId}
        scrolled={scrolled}
        theme={theme}
        menuOpen={menuOpen}
        onToggleTheme={toggleTheme}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onNavigate={navigate}
      />
      <Sidebar open={menuOpen} links={NAV_LINKS} onNavigate={navigate} />

      <main>
        <HeroSection
          name={["Nhyl Cyrus", "J. Gervasio"]}
          typedRole={typed}
          description="Motivated IT student seeking entry-level opportunities in software development, data encoding, and computer systems. Skilled in programming fundamentals, organization, and problem-solving."
          stats={HERO_STATS}
          onNavigate={navigate}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer
        brand="NCG"
        copyright="© 2026 Nhyl Cyrus J. Gervasio. Built with React & Tailwind."
        githubUrl="https://github.com/Nhyl-Cyrus"
      />
    </div>
  );
}
