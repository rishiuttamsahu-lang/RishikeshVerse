"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType = 'github' | 'instagram' | 'website' | 'linkedin' | 'twitter' | 'email';
type GlowColor = 'white';

interface SkillIconProps { type: IconType; }

interface SocialConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
  href: string;
}

interface OrbitingSkillProps { config: SocialConfig; angle: number; }
interface GlowingOrbitPathProps { radius: number; glowColor?: GlowColor; animationDelay?: number; }

// --- Social Icons SVG Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  github: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ), color: '#ffffff'
  },
  instagram: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ), color: '#ffffff'
  },
  website: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ), color: '#ffffff'
  },
  linkedin: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.849-3.037-1.85 0-2.132 1.445-2.132 2.939v5.667H9.356V9h3.411v1.564h.049c.475-.9 1.637-1.85 3.37-1.85 3.606 0 4.264 2.372 4.264 5.459v6.279zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ), color: '#ffffff'
  },
  twitter: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ), color: '#ffffff'
  },
  email: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ), color: '#ffffff'
  }
};

const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

const socialsConfig: SocialConfig[] = [
  { id: 'github', orbitRadius: 100, size: 40, speed: 1, iconType: 'github', phaseShift: 0, glowColor: 'white', label: 'GitHub', href: 'https://github.com/rishiuttamsahu-lang' },
  { id: 'instagram', orbitRadius: 100, size: 40, speed: 1, iconType: 'instagram', phaseShift: (2 * Math.PI) / 3, glowColor: 'white', label: 'Instagram', href: 'https://www.instagram.com/itz_rishi_8468/' },
  { id: 'website', orbitRadius: 100, size: 40, speed: 1, iconType: 'website', phaseShift: (4 * Math.PI) / 3, glowColor: 'white', label: 'Study Hub', href: 'https://fycs-study-hub.vercel.app/' },
  { id: 'linkedin', orbitRadius: 180, size: 40, speed: -0.6, iconType: 'linkedin', phaseShift: 0, glowColor: 'white', label: 'LinkedIn', href: '#' },
  { id: 'twitter', orbitRadius: 180, size: 40, speed: -0.6, iconType: 'twitter', phaseShift: (2 * Math.PI) / 3, glowColor: 'white', label: 'X (Twitter)', href: '#' },
  { id: 'email', orbitRadius: 180, size: 40, speed: -0.6, iconType: 'email', phaseShift: (4 * Math.PI) / 3, glowColor: 'white', label: 'Email Me', href: 'mailto:rishiuttamsahu@gmail.com' },
];

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label, href } = config;
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`, height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}
        style={{ boxShadow: isHovered ? `0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)` : `0 0 10px rgba(255,255,255,0.1)` }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full text-xs font-bold text-black whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </a>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(({ radius, glowColor = 'white', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const colors = { primary: 'rgba(255, 255, 255, 0.3)', secondary: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)' };

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px`, animationDelay: `${animationDelay}s` }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 40px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite', animationDelay: `${animationDelay}s`
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${colors.border}`, boxShadow: `inset 0 0 15px ${colors.secondary}` }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingSocials() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    let animationFrameId: number;
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'white', delay: 0 },
    { radius: 180, glowColor: 'white', delay: 1.5 }
  ];

  return (
    <section className="w-full bg-black py-20 flex flex-col items-center justify-center overflow-hidden border-t border-zinc-800">
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16 relative z-10">
         Connect With Me
      </h2>
      <div 
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[450px] md:h-[450px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-zinc-700">
          <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
            </svg>
          </div>
        </div>
        {orbitConfigs.map((config) => <GlowingOrbitPath key={`path-${config.radius}`} radius={config.radius} glowColor={config.glowColor} animationDelay={config.delay} />)}
        {socialsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return <OrbitingSkill key={config.id} config={config} angle={angle} />;
        })}
      </div>
    </section>
  );
}
