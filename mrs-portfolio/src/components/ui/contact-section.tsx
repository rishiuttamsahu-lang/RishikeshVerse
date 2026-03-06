"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, User, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { ContactTitleSlider } from "./dynamic-text-slider";
import RotatingEarth from "./wireframe-dotted-globe";
import { GlowCard } from "./spotlight-card";
import { Particles } from "./particles";
import { MovingDotCard } from "./moving-dot-card";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6d803096-1eb1-46a5-b77a-75dbf9357bf6", 
          ...formData
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6 relative z-10 w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Inputs Styling */
        .uiverse-container { display: flex; background: linear-gradient(173deg, #23272f 0%, #14161a 100%); border-radius: 1rem; box-shadow: 8px 8px 16px #0e1013, -8px -8px 20px #383e4b; padding: 0.3rem; gap: 0.3rem; position: relative; width: 100%; }
        .uiverse-input { border-radius: 0.8rem; background: #23272f; box-shadow: inset 5px 5px 10px #0e1013, inset -5px -5px 10px #383e4b; width: 100%; padding: 1rem 1rem 1rem 3.2rem; border: 1px solid transparent; color: white; transition: all 0.2s ease-in-out; outline: none; }
        .uiverse-input:focus { border: 1px solid #ffee00; box-shadow: inset 0px 0px 10px rgba(255, 212, 59, 0.5), 0px 0px 30px rgba(255, 212, 59, 0.2); }
        .uiverse-textarea { padding-left: 1rem !important; min-height: 120px; }
        
        @media (max-width: 768px) {
          .uiverse-container { background: #121214; box-shadow: none; border: 1px solid rgba(255,255,255,0.05); }
          .uiverse-input { background: transparent; box-shadow: none; }
        }

        /* 🔥 EXACT ORIGINAL BUTTON CSS 🔥 */
        .button {
          position: relative;
          cursor: pointer;
          border: none;
          width: 100%; 
          height: 56px; 
          background: #111;
          color: #fff;
          border-radius: 8px; 
        }

        .button:disabled { opacity: 0.7; cursor: not-allowed; }

        .text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 100%;
          font-weight: bold;
        }

        .button::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(
              circle at 50% 50%,
              #0000 0,
              #0000 20%,
              #111111aa 50%
            ),
            radial-gradient(ellipse 100% 100%, #fff, #fff0);
          background-size:
            3px 3px,
            auto auto;
          transition: 0.3s;
          border-radius: 8px;
        }

        .button:hover:not(:disabled)::before, .button:active:not(:disabled)::before {
          opacity: 0.3;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -40px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
            #fff3 var(--e), #fff0;
        }

        .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(4px) url(#unopaq);
          z-index: -2;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px) url(#unopaq);
          opacity: 0;
          z-index: -2;
          transition: 0.3s;
        }

        .button:hover:not(:disabled) .a::after, .button:active:not(:disabled) .a::after {
          opacity: 1;
        }

        .l { left: -2px; }
        .r { right: -2px; }
        .l, .r {
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .t { top: -2px; }
        .b { bottom: -2px; }
        .t, .b {
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }

        .backdrop {
          position: absolute;
          inset: -30px; 
          background: radial-gradient(
            circle at 50% 50%,
            #0000 0,
            #0000 20%,
            #111111aa 50%
          );
          background-size: 3px 3px;
          z-index: -1;
          pointer-events: none;
        }
      `}} />

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-2">Your Name</label>
        <div className="uiverse-container">
          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
          <input type="text" placeholder="Rishikesh Yadav" className="uiverse-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
      </div>

      <div className="space-y-2 mt-6">
        <label className="text-sm font-medium text-gray-400 ml-2">Email Address</label>
        <div className="uiverse-container">
          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
          <input type="email" placeholder="rishi@example.com" className="uiverse-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
      </div>

      <div className="space-y-2 mt-6">
        <label className="text-sm font-medium text-gray-400 ml-2">Message</label>
        <div className="uiverse-container">
          <textarea placeholder="Let's build something cool..." className="uiverse-input uiverse-textarea resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
        </div>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 text-sm mt-4 bg-green-400/10 p-3 rounded-lg border border-green-400/20">
          <CheckCircle size={18} /> Message sent successfully! I'll get back to you soon.
        </motion.div>
      )}
      {submitStatus === 'error' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 text-sm mt-4 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
          <AlertCircle size={18} /> Something went wrong. Please try again.
        </motion.div>
      )}

      {/* 🔥 EXACT ORIGINAL BUTTON HTML 🔥 */}
      <div className="relative w-full mt-8">
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
            <feColorMatrix
              values="1 0 0 0 0 
                      0 1 0 0 0 
                      0 0 1 0 0 
                      0 0 0 3 0"
            ></feColorMatrix>
          </filter>
        </svg>

        <div className="backdrop"></div>
        <button type="submit" className="button" disabled={isSubmitting}>
          <div className="a l"></div>
          <div className="a r"></div>
          <div className="a t"></div>
          <div className="a b"></div>
          <div className="text">
            {isSubmitting ? (
              <><Loader2 size={18} className="animate-spin" /> Transmitting...</>
            ) : (
              <><Send size={18} /> Send Message</>
            )}
          </div>
        </button>
      </div>
    </form>
  );

  return (
    <section id="contact" className="relative w-full h-auto lg:min-h-screen bg-black pt-16 pb-12 lg:pt-32 lg:pb-24 px-4 overflow-hidden">
      
      {/* Hidden particles on mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
        <Particles particleColors={["#9E00FF", "#ffffff", "#00D1FF"]} particleCount={600} particleSpread={10} speed={0.1} particleBaseSize={300} moveParticlesOnHover={true} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ContactTitleSlider />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-6 lg:mt-0">
          
          {/* Globe Hidden on Mobile */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:block w-full h-full">
            <GlowCard customSize={true} glowColor="purple" className="flex flex-col items-center justify-center p-8 min-h-[500px] w-full h-full bg-black/40">
              <RotatingEarth className="w-full h-full" />
            </GlowCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full h-full max-w-md mx-auto lg:max-w-none">
            
            {/* DESKTOP VIEW */}
            <div className="hidden lg:block w-full h-full">
              <GlowCard customSize={true} glowColor="cyan" className="p-8 w-full h-full bg-[#09090b]/80 flex flex-col justify-center rounded-3xl">
                {formContent}
              </GlowCard>
            </div>

            {/* MOBILE VIEW */}
            <div className="block lg:hidden w-full h-full">
              <MovingDotCard className="bg-[#09090b] flex flex-col justify-center">
                {formContent}
              </MovingDotCard>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}