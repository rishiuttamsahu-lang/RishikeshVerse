import Image from "next/image";
import { HeroLanding } from '@/components/ui/hero-1';
import { Interactive3DRobot } from '@/components/blocks/interactive-3d-robot';
import { SkillsSection } from '@/components/ui/skills-section';
import { ProjectsSection } from '@/components/ui/projects-section';

export default function Home() {
  return (
    <>
      <HeroLanding
        navigationItems={[
          { name: 'About', href: '#' },
          { name: 'Skills', href: '#skills' },
          { name: 'Projects', href: '#projects' },
          { name: 'Contact', href: '#contact' }
        ]}
        announcementBanner={{
          text: "🚀 Currently building the",
          link: {
            text: "Study Hub Platform",
            href: "#projects"
          }
        }}
        title="Hi, I'm Rishikesh. Welcome to my 3D Universe."
        description="A passionate web developer weaving code and creativity. Exploring the frontiers of modern web development, C++, and Python."
        callToActions={[
          { text: "Explore Projects", href: "#projects", variant: "primary" },
          { text: "Contact Me", href: "#contact", variant: "secondary" }
        ]}
        gradientColors={{
          from: "oklch(0.7 0.15 280)",
          to: "oklch(0.6 0.2 320)"
        }}
        className="min-h-screen"
      >
        <Interactive3DRobot
          scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
          className="w-full h-[500px] lg:h-full min-h-[500px]"
        />
      </HeroLanding>
      <SkillsSection />
      <ProjectsSection />
    </>
  );
}
