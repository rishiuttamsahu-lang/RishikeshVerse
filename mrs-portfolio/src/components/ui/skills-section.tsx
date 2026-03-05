"use client";
import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { FileCode2, Paintbrush, Braces, Atom, LayoutTemplate } from "lucide-react";
import { GlowingShadow } from "./glowing-shadow";
import { Spotlight } from "./spotlight";

const skills = [
  { name: "HTML", icon: FileCode2, details: "Semantic structures for modern web pages." },
  { name: "CSS", icon: Paintbrush, details: "Responsive design, animations, and styling." },
  { name: "JavaScript", icon: Braces, details: "Dynamic interactivity and functional logic." },
  { name: "React", icon: Atom, details: "Component-based architecture." },
  { name: "UI Design", icon: LayoutTemplate, details: "Intuitive user experiences." },
];

export function SkillsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["75vw", "-70%"]);

  return (
    // FIX: h-auto on mobile, 250vh on desktop
    <section ref={targetRef} id="skills" className="relative h-auto md:h-[250vh] bg-black -mt-16">
      <Spotlight className="from-purple-800 via-purple-600 to-purple-400 blur-2xl opacity-50" size={800} />
      
      <div className="md:sticky md:top-0 flex flex-col justify-start md:justify-center min-h-screen pt-24 pb-12 md:py-0">
        
        <div className="w-full text-center z-20 pointer-events-none mb-12 px-4 relative">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Rishikesh<span className="text-[#9E00FF]">Verse</span> Skills
          </h2>
          <p className="text-gray-400 text-lg">Explore my cosmic tech stack</p>
        </div>

        {/* DESKTOP: Horizontal Scroll */}
        <motion.div style={{ x }} className="hidden md:flex gap-12 z-10 w-max pr-[10vw] items-center mb-20 relative">
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

        {/* MOBILE: Vertical Stack (NO LAG) */}
        <div className="flex md:hidden flex-col gap-6 px-6 z-10 relative">
          {skills.map((skill) => (
            <GlowingShadow key={`mob-${skill.name}`}>
              <div className="relative z-10 flex flex-col items-center justify-center py-6 px-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                <skill.icon className="w-10 h-10 mb-3 text-purple-400" />
                <h3 className="font-bold text-xl mb-1 text-white">{skill.name}</h3>
                <p className="text-gray-400 text-xs text-center">{skill.details}</p>
              </div>
            </GlowingShadow>
          ))}
        </div>
      </div>
    </section>
  );
}
