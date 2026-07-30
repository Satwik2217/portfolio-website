import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectShowcase from "@/components/ProjectShowcase";
import EventHorizonSection from "@/components/EventHorizonSection";
import Achievements from "@/components/Achievements";
import ResumeCTA from "@/components/ResumeCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

export default function Home() {
  return (
    <>
      <LenisProvider>
        <Navigation />
        <CustomCursor />
        <main className="min-h-screen bg-bg">
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ExperienceTimeline />
          <ProjectShowcase />
          <EventHorizonSection />
          <Achievements />
          <ResumeCTA />
          <Contact />
          <Footer />
        </main>
      </LenisProvider>
    </>
  );
}
