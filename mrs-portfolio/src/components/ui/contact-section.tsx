"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, User } from "lucide-react";
import { ContactTitleSlider } from "./dynamic-text-slider";
import RotatingEarth from "./wireframe-dotted-globe";
import { GlowCard } from "./spotlight-card";
import { Particles } from "./particles";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    // FIX 1: 'bg-black' ko restore kiya aur particles add kiye
    <section id="contact" className="relative w-full min-h-screen bg-black pt-32 pb-24 px-4 overflow-hidden">
      
      {/* LOCAL PARTICLES BACKGROUND RESTORED */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#9E00FF", "#ffffff", "#00D1FF"]}
          particleCount={600}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={300}
          moveParticlesOnHover={true}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* NEW INTERACTIVE SLIDER TITLE */}
        <ContactTitleSlider />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - 3D Interactive Globe */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <GlowCard customSize={true} glowColor="purple" className="flex flex-col items-center justify-center p-8 min-h-[400px] lg:min-h-[500px] w-full h-full bg-black/40">
              <RotatingEarth className="w-full h-full" />
            </GlowCard>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <GlowCard customSize={true} glowColor="cyan" className="p-8 w-full h-full bg-black/40 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* 🚀 NEW SCI-FI CROSSHAIR BUTTON 🚀 */}
              <div className="relative w-full mt-8">
                <style dangerouslySetInnerHTML={{ __html: `
                  .sci-fi-button {
                    position: relative;
                    cursor: pointer;
                    border: 1px solid rgba(255,255,255,0.1);
                    width: 100%;
                    height: 56px;
                    background: #09090b;
                    color: #fff;
                    border-radius: 8px;
                  }
                  .sci-fi-text {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-weight: bold;
                  }
                  .sci-fi-button::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    background: radial-gradient(circle at 50% 50%, transparent 0, transparent 20%, rgba(17,17,17,0.66) 50%), radial-gradient(ellipse 100% 100%, #fff, transparent);
                    background-size: 3px 3px, auto auto;
                    transition: 0.3s;
                    border-radius: 8px;
                  }
                  .sci-fi-button:hover::before {
                    opacity: 0.3;
                  }
                  .sci-fi-a {
                    pointer-events: none;
                    position: absolute;
                    --w: 2px;
                    --t: -30px;
                    --s: calc(var(--t) * -1);
                    --e: calc(100% + var(--t));
                    --g: transparent, rgba(255,255,255,0.2) var(--s), rgba(255,255,255,0.66) var(--s), #fff, rgba(255,255,255,0.66) var(--e), rgba(255,255,255,0.2) var(--e), transparent;
                  }
                  .sci-fi-a::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: inherit;
                    filter: blur(4px) url(#unopaq);
                    z-index: -2;
                  }
                  .sci-fi-a::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: inherit;
                    filter: blur(10px) url(#unopaq);
                    opacity: 0;
                    z-index: -2;
                    transition: 0.3s;
                  }
                  .sci-fi-button:hover .sci-fi-a::after {
                    opacity: 1;
                  }
                  .sci-fi-l { left: -2px; }
                  .sci-fi-r { right: -2px; }
                  .sci-fi-l, .sci-fi-r {
                    background: linear-gradient(var(--g));
                    top: var(--t);
                    bottom: var(--t);
                    width: var(--w);
                  }
                  .sci-fi-t { top: -2px; }
                  .sci-fi-b { bottom: -2px; }
                  .sci-fi-t, .sci-fi-b {
                    background: linear-gradient(90deg, var(--g));
                    left: var(--t);
                    right: var(--t);
                    height: var(--w);
                  }
                  .sci-fi-backdrop {
                    position: absolute;
                    inset: -30px;
                    background: radial-gradient(circle at 50% 50%, transparent 0, transparent 20%, rgba(17,17,17,0.66) 50%);
                    background-size: 3px 3px;
                    z-index: -1;
                    pointer-events: none;
                  }
                `}} />

                <svg style={{ position: "absolute", width: 0, height: 0 }}>
                  <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
                    <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
                  </filter>
                </svg>

                <div className="sci-fi-backdrop"></div>
                
                <button type="submit" className="sci-fi-button">
                  <div className="sci-fi-a sci-fi-l"></div>
                  <div className="sci-fi-a sci-fi-r"></div>
                  <div className="sci-fi-a sci-fi-t"></div>
                  <div className="sci-fi-a sci-fi-b"></div>
                  <div className="sci-fi-text">
                    <Send size={18} /> Send Message
                  </div>
                </button>
              </div>
            </form>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}