'use client';
import React, { useState, useRef, useLayoutEffect, useEffect, cloneElement } from 'react';

type NavItem = {
  id: string | number;
  icon: React.ReactElement<any>;
  label?: string;
  onClick?: () => void;
  href?: string;
  url?: string;
};

type LimelightNavProps = {
  items: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      let currentActiveIndex = activeIndex;
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const targetUrl = item.href || item.url || '#';
        
        if (targetUrl !== '#' && targetUrl.startsWith('#')) {
          const section = document.getElementById(targetUrl.substring(1));
          if (section) {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
              currentActiveIndex = i;
              break;
            }
          }
        }
      }

      if (window.scrollY < 100) {
        currentActiveIndex = 0;
      }

      if (currentActiveIndex !== activeIndex) {
        setActiveIndex(currentActiveIndex);
        onTabChange?.(currentActiveIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, items, onTabChange]);

  if (items.length === 0) return null; 

  const handleItemClick = (index: number, e: React.MouseEvent<HTMLAnchorElement>, itemOnClick?: () => void, targetUrl?: string, label?: string) => {
    e.preventDefault();
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    isClickScrolling.current = true;
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();

    const normalizedLabel = label?.toLowerCase() || '';
    const isTopTarget = targetUrl === '#' || targetUrl === '#about' || targetUrl === '#home' || normalizedLabel === 'about' || normalizedLabel === 'home';

    const forceScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      const mainEl = document.querySelector('main');
      if (mainEl) mainEl.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (isTopTarget) {
      forceScrollToTop();
    } else if (targetUrl && targetUrl.startsWith('#')) {
      const element = document.getElementById(targetUrl.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        forceScrollToTop();
      }
    } else {
      forceScrollToTop();
    }

    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1200);
  };

  return (
    <nav className={`relative z-[9999] inline-flex items-center h-14 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/10 px-2 shadow-2xl ${className}`}>
      {items.map(({ id, icon, label, onClick, href, url }, index) => {
        const targetUrl = href || url || '#';
        
        return (
          <a
            key={id}
            href={targetUrl}
            ref={(el) => { navItemRefs.current[index] = el; }}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-4 py-2 gap-2 ${iconContainerClassName}`}
            onClick={(e) => handleItemClick(index, e, onClick, targetUrl, label)}
            aria-label={label}
          >
            {cloneElement(icon as any, {
              className: `w-4 h-4 transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'opacity-100 text-white' : 'opacity-50 text-zinc-400 hover:opacity-80'
              } ${(icon as any).props?.className || ''} ${iconClassName || ''}`,
            })}
            {label && (
              <span className={`text-sm font-medium transition-all duration-300 ${
                activeIndex === index ? 'opacity-100 text-white' : 'opacity-50 text-zinc-400 hover:opacity-80'
              }`}>
                {label}
              </span>
            )}
          </a>
        );
      })}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-10 h-[3px] rounded-full bg-white shadow-[0_20px_15px_rgba(255,255,255,0.5)] ${
          isReady ? 'transition-[left] duration-500 ease-out' : ''
        } ${limelightClassName}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-50%] top-[3px] w-[200%] h-12 [clip-path:polygon(20%_100%,40%_0,60%_0,80%_100%)] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
