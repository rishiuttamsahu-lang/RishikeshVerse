"use client";
import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
}

const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      ...props
    },
    ref
  ) => {
    const pathVariants: Variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: underlineDuration, ease: "easeInOut" },
      },
    };

    return (
      <span
        ref={ref}
        className={cn("relative inline-block whitespace-nowrap", props.className)}
      >
        <motion.span
          className={cn("relative z-10 inline-block", textClassName)}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          {text}
        </motion.span>
        <motion.svg
          width="100%"
          height="20"
          viewBox="0 0 300 20"
          preserveAspectRatio="none"
          className={cn("absolute -bottom-2 left-0 z-0 text-[#9E00FF]", underlineClassName)}
        >
          <motion.path
            d={underlinePath}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              d: underlineHoverPath,
              transition: { duration: 0.8 },
            }}
          />
        </motion.svg>
      </span>
    );
  }
);

AnimatedText.displayName = "AnimatedText";
export { AnimatedText };