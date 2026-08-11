import Hero from "@/components/home/Hero";
import MissionStrip from "@/components/home/MissionStrip";
import ResearchGrid from "@/components/home/ResearchGrid";
import StatsBand from "@/components/home/StatsBand";
import NewsPreview from "@/components/home/NewsPreview";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionStrip />
      <ResearchGrid />
      <StatsBand />
      <NewsPreview />
      <CtaBand />
    </>
  );
}
