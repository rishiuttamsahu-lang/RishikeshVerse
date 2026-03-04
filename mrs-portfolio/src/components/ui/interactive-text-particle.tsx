"use client";
import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface Pointer { x?: number; y?: number; }
interface Particle { ox: number; oy: number; cx: number; cy: number; or: number; cr: number; pv: number; ov: number; f: number; rgb: number[]; }
interface TextBox { str: string; x?: number; y?: number; w?: number; h?: number; }

export interface ParticleTextEffectProps {
  text?: string;
  colors?: string[];
  className?: string;
  animationForce?: number;
  particleDensity?: number;
}

const ParticleTextEffect: React.FC<ParticleTextEffectProps> = ({
  text = 'PROJECTS',
  colors = ['9E00FF', '705cb5', '43428e', 'ffffff'],
  className = '',
  animationForce = 80,
  particleDensity = 4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const pointerRef = useRef<Pointer>({});
  const hasPointerRef = useRef<boolean>(false);
  const interactionRadiusRef = useRef<number>(100);

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 300 });
  const textBox = useRef<TextBox>({ str: text }).current;

  const rand = (max = 1, min = 0) => +(min + Math.random() * (max - min));

  class ParticleClass {
    ox: number; oy: number; cx: number; cy: number; or: number; cr: number; f: number; rgb: number[];
    constructor(x: number, y: number, rgb: number[]) {
      this.ox = x; this.oy = y; this.cx = x; this.cy = y;
      this.or = rand(3, 1); this.cr = this.or;
      this.f = rand(animationForce + 15, animationForce - 15);
      this.rgb = rgb.map(c => Math.max(0, c + rand(13, -13)));
    }
    draw() {
      const ctx = ctxRef.current; if (!ctx) return;
      ctx.fillStyle = `rgb(${this.rgb.join(',')})`;
      ctx.beginPath(); ctx.arc(this.cx, this.cy, this.cr, 0, 2 * Math.PI); ctx.fill();
    }
    move(interactionRadius: number, hasPointer: boolean) {
      if (hasPointer && pointerRef.current.x !== undefined && pointerRef.current.y !== undefined) {
        const dx = this.cx - pointerRef.current.x;
        const dy = this.cy - pointerRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < interactionRadius && dist > 0) {
          const force = Math.min(this.f, (interactionRadius - dist) / dist * 2);
          this.cx += (dx / dist) * force; this.cy += (dy / dist) * force;
        }
      }
      const odx = this.ox - this.cx; const ody = this.oy - this.cy; const od = Math.hypot(odx, ody);
      if (od > 1) {
        const restore = Math.min(od * 0.1, 3);
        this.cx += (odx / od) * restore; this.cy += (ody / od) * restore;
      }
      this.draw();
    }
  }

  const initialize = () => {
    const canvas = canvasRef.current; const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const fontSize = Math.min(canvas.width / (text.length * 0.7), 120);
    ctx.font = `900 ${fontSize}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    
    const metrics = ctx.measureText(text);
    textBox.w = Math.round(metrics.width); textBox.h = fontSize;
    textBox.x = (canvas.width - textBox.w) / 2; textBox.y = (canvas.height - textBox.h) / 2;

    const grad = ctx.createLinearGradient(textBox.x, 0, textBox.x + textBox.w, 0);
    colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), `#${c}`));
    ctx.fillStyle = grad;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    particlesRef.current = [];
    for (let y = 0; y < canvas.height; y += particleDensity) {
      for (let x = 0; x < canvas.width; x += particleDensity) {
        const alpha = data[(y * canvas.width + x) * 4 + 3];
        if (alpha > 128) {
          const r = data[(y * canvas.width + x) * 4];
          const g = data[(y * canvas.width + x) * 4 + 1];
          const b = data[(y * canvas.width + x) * 4 + 2];
          particlesRef.current.push(new ParticleClass(x, y, [r, g, b]));
        }
      }
    }
  };

  const animate = () => {
    const ctx = ctxRef.current; if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    particlesRef.current.forEach(p => p.move(interactionRadiusRef.current, hasPointerRef.current));
    animationIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext('2d', { willReadFrequently: true });
    initialize();
    animate();
    return () => { if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current); };
  }, [text, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-[200px] md:h-[300px]", className)}
      onPointerMove={(e) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          hasPointerRef.current = true;
        }
      }}
      onPointerLeave={() => { hasPointerRef.current = false; }}
    />
  );
};

export { ParticleTextEffect };
