"use client";
import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { FileCode2, Paintbrush, Braces, Atom, LayoutTemplate } from "lucide-react";
import { GlowingShadow } from "./glowing-shadow";
import { Spotlight } from "./spotlight";

const skills = [
  { name: "HTML", icon: FileCode2, details: "Semantic structures for modern web pages and accessibility." },
  { name: "CSS", icon: Paintbrush, details: "Responsive design, animations, and premium visual styling." },
  { name: "JavaScript", icon: Braces, details: "Dynamic interactivity and functional logic." },
  { name: "React", icon: Atom, details: "Component-based architecture and efficient state management." },
  { name: "UI Design", icon: LayoutTemplate, details: "Intuitive user experiences and futuristic aesthetics." },
];

export function SkillsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: targetRef, 
    offset: ["start start", "end end"] 
  });

  const x = useTransform(scrollYProgress, [0, 1], ["75vw", "-70%"]);

  return (
    <section ref={targetRef} id="skills" className="relative h-[300vh] bg-black -mt-16">
        
      <Spotlight
        className="from-purple-800 via-purple-600 to-purple-400 blur-2xl dark:from-purple-900 dark:via-purple-500 dark:to-purple-900 opacity-50"
        size={800}
      />
      
      <div className="absolute inset-0 pointer-events-none">
        <svg className="h-full w-full">
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40H40M40 40V0M40 40H80M40 40V80"
                stroke="rgba(255,255,255,0.05)"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="sticky top-0 flex flex-col justify-center h-screen overflow-hidden pt-20">
        
        <div className="w-full text-center z-20 pointer-events-none mb-10 mt-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Rishikesh<span className="text-[#9E00FF]">Verse</span> Skills
          </h2>
          <p className="text-gray-400 text-lg">Scroll to explore my cosmic tech stack</p>
        </div>

        <motion.div style={{ x }} className="flex gap-12 z-10 w-max pr-[10vw] items-center mb-20">
          {skills.map((skill) => (
            <div key={skill.name} className="flex-shrink-0">
              <GlowingShadow>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                  <skill.icon className="w-16 h-16 mb-6" />
                  <h3 className="font-bold tracking-wide text-2xl mb-2 text-white">{skill.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-center">{skill.details}</p>
                </div>
              </GlowingShadow>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
