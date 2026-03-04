"use client";
import React, { useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement | any>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  function mouseMoveHandler(event: any) {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const { left, width } = cardRef.current.getBoundingClientRect();
      const relativeX = clientX - left;
      setWidthPercentage(Math.max(0, Math.min(100, (relativeX / width) * 100)));
    }
  }

  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    const clientX = event.touches[0]!.clientX;
    if (cardRef.current) {
      const { left, width } = cardRef.current.getBoundingClientRect();
      const relativeX = clientX - left;
      setWidthPercentage(Math.max(0, Math.min(100, (relativeX / width) * 100)));
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-black border border-white/10 w-full max-w-[45rem] rounded-2xl p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-40 relative flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ width: "100%" }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-black z-20 will-change-transform flex items-center justify-center w-full h-full"
        >
          <p
            style={{ textShadow: "4px 4px 15px rgba(158,0,255,0.5)" }}
            className="text-4xl md:text-6xl py-10 font-black text-white bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-300 to-purple-600 whitespace-nowrap text-center w-full"
          >
            {revealText}
          </p>
        </motion.div>
        
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-full w-[4px] bg-gradient-to-b from-transparent via-purple-500 to-transparent absolute z-50 will-change-transform"
        ></motion.div>

        <div className="overflow-hidden w-full flex items-center justify-center [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="text-4xl md:text-6xl py-10 font-black bg-clip-text text-transparent bg-zinc-800 whitespace-nowrap text-center w-full">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
  return <h2 className={twMerge("text-white text-lg mb-2", className)}>{children}</h2>;
};

export const TextRevealCardDescription = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
  return <p className={twMerge("text-gray-400 text-sm", className)}>{children}</p>;
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
