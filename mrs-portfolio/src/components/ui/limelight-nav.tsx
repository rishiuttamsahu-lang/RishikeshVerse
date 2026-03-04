'use client';
import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
  href?: string;
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

  if (items.length === 0) return null; 

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-14 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/10 px-2 shadow-2xl ${className}`}>
      {items.map(({ id, icon, label, onClick, href }, index) => (
          <a
            key={id}
            href={href || '#'}
            ref={el => (navItemRefs.current[index] = el)}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-4 py-2 gap-2 ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
          >
            {cloneElement(icon, {
              className: `w-4 h-4 transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'opacity-100 text-white' : 'opacity-50 text-zinc-400 hover:opacity-80'
              } ${icon.props.className || ''} ${iconClassName || ''}`,
            })}
            {label && (
              <span className={`text-sm font-medium transition-all duration-300 ${
                activeIndex === index ? 'opacity-100 text-white' : 'opacity-50 text-zinc-400 hover:opacity-80'
              }`}>
                {label}
              </span>
            )}
          </a>
      ))}

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