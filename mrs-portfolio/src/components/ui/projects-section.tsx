"use client";
import React from "react";
import { BGPattern } from "./bg-pattern";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full min-h-screen bg-black py-24 flex flex-col items-center justify-start overflow-hidden border-t border-white/5">
      <BGPattern variant="grid" mask="fade-edges" fill="rgba(255, 255, 255, 0.15)" size={40} />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center mt-12">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
          Featured <span className="text-[#9E00FF]">Projects</span>
        </h2>
        <p className="text-gray-400 text-lg">Explore my latest work and case studies</p>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      </div>
    </section>
  );
}
