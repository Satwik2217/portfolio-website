import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import IntroStatement from "@/components/IntroStatement";
import ProjectShowcase from "@/components/ProjectShowcase";
import HorizontalScroll from "@/components/HorizontalScroll";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import CurrentlyExploring from "@/components/CurrentlyExploring";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import CTASection from "@/components/CTASection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import SystemStatus from "@/components/SystemStatus";
import Experiments from "@/components/Experiments";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <>
      <Preloader />
      <LenisProvider>
        <ScrollProgressBar />
        <Spotlight />
        <Navigation />
        <CustomCursor />
        <main className="min-h-screen bg-background">
          <Hero />
          <IntroStatement />
          <ProjectShowcase />
          <HorizontalScroll />
          <ExperienceTimeline />
          <AboutSection />
          <SkillsSection />
          <CurrentlyExploring />
          <Education />
          <Achievements />
          <Experiments />
          <CTASection />
          <Contact />
          <Footer />
        </main>
        <SystemStatus />
      </LenisProvider>
    </>
  );
}
