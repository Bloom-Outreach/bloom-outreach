import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { PillarsSection } from "@/components/sections/pillars-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { GalleryPreviewSection } from "@/components/sections/gallery-preview-section";
import { VideoPreviewSection } from "@/components/sections/video-preview-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <PillarsSection />
      <ImpactSection />
      <GalleryPreviewSection />
      <VideoPreviewSection />
      <CtaSection />
    </>
  );
}
