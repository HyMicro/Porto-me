"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { AboutSkillsSection } from "@/components/about-skills-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* 1. Loading Screen with Massive Real Typographic Scale */}
      <LoadingScreen
        name="AHYAD"
        onComplete={() => setIsLoading(false)}
      />

      {/* 2. Main Portfolio Content (Revealed smoothly after loading screen) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col min-h-screen"
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section (Reference Style with menew.jpeg & Editorial Heading) */}
          <HeroSection />

          {/* Seamless Infinite Logo Marquee Scroller */}
          <LogoMarquee />

          {/* About & Core Disciplines */}
          <AboutSkillsSection />

          {/* Professional Experience (Bumi Studio & Consulting) */}
          <ExperienceSection />

          {/* Case Studies / Featured Projects */}
          <ProjectsSection />

          {/* Minimalist Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}
