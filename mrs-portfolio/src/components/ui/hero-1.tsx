'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { ShinyButton } from '@/components/ui/shiny-button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { AnimatedText } from '@/components/ui/animated-underline-text-one';
import { User, Code, Briefcase, Mail, Menu, X } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
}

interface AnnouncementBanner {
  text: string;
  link?: {
    text: string;
    href: string;
  };
}

interface CallToAction {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface GradientColors {
  from: string;
  to: string;
}

interface HeroLandingProps {
  navigationItems: NavigationItem[];
  announcementBanner: AnnouncementBanner;
  title: string;
  description: string;
  callToActions: CallToAction[];
  gradientColors: GradientColors;
  className?: string;
  children?: React.ReactNode;
}

export function HeroLanding({
  navigationItems,
  announcementBanner,
  title,
  description,
  callToActions,
  gradientColors,
  className = '',
  children,
}: HeroLandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', url: '#about', icon: User },
    { name: 'Skills', url: '#skills', icon: Code },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Contact', url: '#contact', icon: Mail }
  ];

  const renderCallToAction = (cta: CallToAction, index: number) => {
    if (cta.variant === 'primary') {
      // Primary -> Explore Projects -> ShinyButton
      return (
        <a key={index} href={cta.href} className="inline-block">
          <ShinyButton className="w-full sm:w-44">
            {cta.text}
          </ShinyButton>
        </a>
      )
    } else {
      // Secondary -> Contact Me -> InteractiveHoverButton
      return (
        <a key={index} href={cta.href} className="inline-block">
          <InteractiveHoverButton text={cta.text} className="w-full sm:w-40 h-[50px]" />
        </a>
      )
    }
  }

  return (
    <div className={`min-h-screen w-full overflow-hidden relative bg-black !z-[99999] ${className || ''}`}>
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
        <div className="stars absolute inset-0" />
        <ShootingStars starColor="#9E00FF" trailColor="#2EB9DF" minSpeed={15} maxSpeed={35} minDelay={1000} maxDelay={3000} />
        <ShootingStars starColor="#FF0099" trailColor="#FFB800" minSpeed={10} maxSpeed={25} minDelay={2000} maxDelay={4000} />
        <ShootingStars starColor="#00FF9E" trailColor="#00B8FF" minSpeed={20} maxSpeed={40} minDelay={1500} maxDelay={3500} />
      </div>

      {/* Embedded CSS for static stars to avoid hydration issues */}
      <style>{`
        .stars {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s ease-in-out infinite;
          opacity: 0.5;
        }
        @keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
      `}</style>

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen text-white">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 absolute top-0 left-0 w-full !z-[99999] pointer-events-none">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold pointer-events-auto">Logo</div>
        
            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-center pointer-events-auto">
              <NavBar items={navItems} />
            </div>
        
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white pointer-events-auto"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main id="about" className="container mx-auto px-4 py-12 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              {/* Announcement Banner */}
              <div className="inline-flex items-center gap-2 text-sm bg-zinc-900/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-white">
                <span className="text-white">{announcementBanner.text}</span>
                {announcementBanner.link && (
                  <a
                    target="_blank"
                    href={announcementBanner.link.href}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {announcementBanner.link.text}
                  </a>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight mb-4">
                Hi, <AnimatedText text="I'm Rishikesh." />
                <br />
                Welcome to my 3D Universe.
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                {description}
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {callToActions.map((cta, index) => renderCallToAction(cta, index))}
              </div>
            </div>

            {/* Right Column - 3D Robot Component (HIDDEN ON MOBILE FOR PERFORMANCE) */}
            <div className="hidden lg:block lg:mt-0">
              <div className="w-full h-96 lg:h-[500px] rounded-xl bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 flex items-center justify-center overflow-hidden">
                {children ? (
                  children
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🤖</div>
                    <p>3D Robot</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Dialog */}
      <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DialogContent className="bg-black border-zinc-800 p-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-bold">Menu</div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-lg text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}