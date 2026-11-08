import { Providers } from "@/components/layout/Providers";
import { Chrome } from "@/components/layout/Chrome";
import { Footer } from "@/components/layout/Footer";
import { InkDefs } from "@/components/visuals/Ink";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <Providers>
      <InkDefs />
      <Chrome />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </Providers>
  );
}
