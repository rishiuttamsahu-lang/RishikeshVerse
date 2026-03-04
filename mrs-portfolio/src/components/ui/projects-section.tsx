"use client";
import React from "react";
import { BGPattern } from "./bg-pattern";
import { ParticleTextEffect } from "./interactive-text-particle";
import ElectricBorder from "./electric-border";
import { ExternalLink, Github } from "lucide-react";

const myProjects = [
  {
    title: "FYCS Study Hub",
    description: "A comprehensive platform for Computer Science students to access notes, practicals, and resources effortlessly.",
    tech: ["Next.js", "Tailwind", "Firebase"],
    link: "https://fycs-study-hub.vercel.app/",
    github: "https://github.com/rishiuttamsahu-lang/FYCS-Study-Hub",
    color: "#ffffff"
  },
  {
    title: "YouTube Downloader",
    description: "High-speed video downloader with multiple format support and a clean, ad-free user interface.",
    tech: ["React", "Node.js", "API Integration"],
    link: "#",
    github: "#",
    color: "#fffb8a"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full min-h-screen bg-black pt-10 pb-20 flex flex-col items-center justify-start overflow-hidden">
      {/* Grid pattern starts higher up */}
      <div className="absolute inset-0 -top-20">
        <BGPattern variant="grid" mask="fade-edges" fill="rgba(255, 255, 255, 0.15)" size={40} />
      </div>
      
      {/* NAYA PARTICLE TITLE */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 -mt-10">
        <ParticleTextEffect 
          text="PROJECTS" 
          colors={['9E00FF', 'ffffff', '00D1FF']} 
          particleDensity={3}
          className="cursor-crosshair"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {myProjects.map((project, idx) => (
          <ElectricBorder key={idx} color={project.color} speed={1} chaos={0.1} borderRadius={20}>
            <div className="p-8 bg-zinc-900/40 backdrop-blur-md h-full flex flex-col justify-between min-h-[280px] border border-white/5 rounded-[20px]">
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 border-t border-white/5 pt-6">
                <a target="_blank" href={project.link} className="flex items-center gap-2 text-white bg-purple-600/20 border border-purple-500/30 px-4 py-2 rounded-lg hover:bg-purple-600/40 transition text-sm">
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a target="_blank" href={project.github} className="flex items-center gap-2 text-gray-400 hover:text-white transition px-4 py-2 text-sm">
                  <Github size={16} /> Source
                </a>
              </div>
            </div>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
}
