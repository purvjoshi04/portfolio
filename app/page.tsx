import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import GithubSection from "@/components/GithubSection";
import ContactSection from "@/components/ContactSection";
import SideNav from "@/components/SideNav";

export default function HomePage() {
  return (
    <main className="relative bg-black min-h-screen">
      <SideNav />
      <HeroSection />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <GithubSection />
      <div className="section-divider" />
      <ContactSection />
    </main>
  );
}
