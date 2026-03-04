"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Particles } from "./particles";
import { Mail, MessageSquare, Send, User, Linkedin, Github, Instagram } from "lucide-react";
import { ContactTitleSlider } from "./dynamic-text-slider";

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
    <section id="contact" className="relative w-full min-h-screen bg-black pt-32 pb-24 px-4 overflow-hidden">
      
      {/* BACKGROUND PARTICLES */}
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
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[32px]">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect!</h3>
              
              <div className="space-y-6">
                <a href="mailto:hello@rishikesh.tech" className="flex items-center gap-4 text-gray-300 hover:text-purple-400 transition group">
                  <div className="w-12 h-12 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <Mail size={24} className="text-purple-400" />
                  </div>
                  <span className="text-lg">hello@rishikesh.tech</span>
                </a>

                <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition group">
                  <div className="w-12 h-12 bg-cyan-600/20 border border-cyan-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <MessageSquare size={24} className="text-cyan-400" />
                  </div>
                  <span className="text-lg">Available for opportunities</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">Find me on</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition group">
                    <Linkedin size={24} className="text-gray-400 group-hover:text-purple-400" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition group">
                    <Github size={24} className="text-gray-400 group-hover:text-purple-400" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition group">
                    <Instagram size={24} className="text-gray-400 group-hover:text-purple-400" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] space-y-6">
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

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
