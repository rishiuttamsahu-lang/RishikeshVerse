'use client';

import React, { useState, Fragment } from 'react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { ShinyButton } from '@/components/ui/shiny-button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { AnimatedText } from '@/components/ui/animated-underline-text-one';
import { User, Code, Briefcase, Mail, Menu } from 'lucide-react';

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
  const [activeNav, setActiveNav] = useState('About');

  const navItems = [
    { name: 'About', url: '#about', icon: User },
    { name: 'Skills', url: '#skills', icon: Code },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Contact', url: '#contact', icon: Mail }
  ];

  const handleNavClick = (itemName: string, url: string) => {
    setActiveNav(itemName);
    setTimeout(() => {
      setMobileMenuOpen(false);
      window.location.hash = url;
    }, 300); // 300ms delay for glider animation
  };

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
        <main id="about" className="container mx-auto px-4 pt-32 pb-12 lg:py-24">
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

      {/* 🚀 CUSTOM FULL-SCREEN MOBILE OVERLAY WITH GLIDER 🚀 */}
      <div className={`fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md transition-opacity duration-300 md:hidden flex items-center justify-center ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <style dangerouslySetInnerHTML={{
          __html: `
          .radio-container {
            --main-color: #fafafa;
            --main-color-opacity: #ffffff1c;
            --total-radio: 4;
            display: flex;
            flex-direction: column;
            position: relative;
            padding-left: 0.5rem;
            width: 250px;
          }
          .radio-container input { cursor: pointer; appearance: none; display: none; }
          .radio-container .glider-container {
            position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(27, 27, 27, 1) 50%, rgba(0, 0, 0, 0) 100%);
          }
          .radio-container .glider-container .glider {
            position: relative; height: calc(100% / var(--total-radio)); width: 100%;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, var(--main-color) 50%, rgba(0, 0, 0, 0) 100%);
            transition: transform 0.4s cubic-bezier(0.37, 1.95, 0.66, 0.56);
          }
          .radio-container .glider-container .glider::before {
            content: ""; position: absolute; height: 60%; width: 300%; top: 50%; transform: translateY(-50%);
            background: var(--main-color); filter: blur(10px);
          }
          .radio-container .glider-container .glider::after {
            content: ""; position: absolute; left: 0; height: 100%; width: 150px;
            background: linear-gradient(90deg, var(--main-color-opacity) 0%, rgba(0, 0, 0, 0) 100%);
          }
          .radio-container label {
            cursor: pointer; padding: 1.5rem 1rem; position: relative; color: grey;
            transition: all 0.3s ease-in-out; display: flex; align-items: center; gap: 12px; font-size: 1.25rem; font-weight: 500;
          }
          .radio-container input:checked + label { color: white; }
          .radio-container input:nth-of-type(1):checked ~ .glider-container .glider { transform: translateY(0); }
          .radio-container input:nth-of-type(2):checked ~ .glider-container .glider { transform: translateY(100%); }
          .radio-container input:nth-of-type(3):checked ~ .glider-container .glider { transform: translateY(200%); }
          .radio-container input:nth-of-type(4):checked ~ .glider-container .glider { transform: translateY(300%); }
        `}} />

        <div className="radio-container">
          {navItems.map((item) => {
            const isChecked = activeNav === item.name;
            return (
              <Fragment key={item.name}>
                <input
                  type="radio"
                  id={`radio-${item.name}`}
                  name="mobile-nav-radio"
                  checked={isChecked}
                  onChange={() => handleNavClick(item.name, item.url)}
                />
                <label htmlFor={`radio-${item.name}`}>
                  <item.icon className={`h-6 w-6 transition-colors duration-300 ${isChecked ? 'text-[#9E00FF]' : 'text-gray-500'}`} />
                  {item.name}
                </label>
              </Fragment>
            )
          })}
          <div className="glider-container">
            <div className="glider"></div>
          </div>
        </div>
      </div>
    </div>
  );
}