import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SecretIdentity from "@/components/SecretIdentity";
import OriginStory from "@/components/OriginStory";
import SpiderPowers from "@/components/SpiderPowers";
import CompletedMissions from "@/components/CompletedMissions";
import EventHorizonSection from "@/components/EventHorizonSection";
import HeroLog from "@/components/HeroLog";
import CodingDashboard from "@/components/CodingDashboard";
import HallOfHeroes from "@/components/HallOfHeroes";
import ResumeCTA from "@/components/ResumeCTA";
import DailyBugle from "@/components/DailyBugle";
import CallTheHero from "@/components/CallTheHero";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import Atmosphere from "@/components/Atmosphere";
import ClientEffects from "@/components/ClientEffects";

export default function Home() {
  return (
    <>
      <LenisProvider>
        <Atmosphere />
        <Navigation />
        <main className="relative">
          <Hero />
          <SecretIdentity />
          <OriginStory />
          <SpiderPowers />
          <CompletedMissions />
          <EventHorizonSection />
          <HeroLog />
          <CodingDashboard />
          <HallOfHeroes />
          <ResumeCTA />
          <DailyBugle />
          <CallTheHero />
          <Footer />
        </main>
        <ClientEffects />
      </LenisProvider>
    </>
  );
}
