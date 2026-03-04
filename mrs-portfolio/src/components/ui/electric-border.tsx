"use client";
import React, { useEffect, useRef, useCallback, CSSProperties, ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface ElectricBorderProps {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#ffffff',
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  const random = useCallback((x: number): number => {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1;
  }, []);

  const noise2D = useCallback(
    (x: number, y: number): number => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);
      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);
      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    },
    [random]
  );

  const octavedNoise = useCallback(
    (x: number, octaves: number, lacunarity: number, gain: number, amplitude: number, frequency: number, time: number, seed: number, baseFlatness: number): number => {
      let y = 0;
      let amp = amplitude;
      let freq = frequency;
      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amp;
        if (i === 0) octaveAmplitude *= baseFlatness;
        y += octaveAmplitude * noise2D(freq * x + seed * 100, time * freq * 0.3);
        freq *= lacunarity;
        amp *= gain;
      }
      return y;
    },
    [noise2D]
  );

  const getCornerPoint = useCallback((centerX: number, centerY: number, radius: number, startAngle: number, arcLength: number, progress: number) => {
    const angle = startAngle + progress * arcLength;
    return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };
  }, []);

  const getRoundedRectPoint = useCallback((t: number, left: number, top: number, width: number, height: number, radius: number) => {
    const sw = width - 2 * radius;
    const sh = height - 2 * radius;
    const ca = (Math.PI * radius) / 2;
    const tp = 2 * sw + 2 * sh + 4 * ca;
    const d = t * tp;
    let acc = 0;
    if (d <= acc + sw) return { x: left + radius + (d - acc), y: top };
    acc += sw;
    if (d <= acc + ca) return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, (d - acc) / ca);
    acc += ca;
    if (d <= acc + sh) return { x: left + width, y: top + radius + (d - acc) };
    acc += sh;
    if (d <= acc + ca) return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, (d - acc) / ca);
    acc += ca;
    if (d <= acc + sw) return { x: left + width - radius - (d - acc), y: top + height };
    acc += sw;
    if (d <= acc + ca) return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, (d - acc) / ca);
    acc += ca;
    if (d <= acc + sh) return { x: left, y: top + height - radius - (d - acc) };
    acc += sh;
    return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, (d - acc) / ca);
  }, [getCornerPoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width + 120;
      const h = rect.height + 120;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      return { w, h };
    };

    let { w, h } = updateSize();

    const draw = (now: number) => {
      const dt = (now - lastFrameTimeRef.current) / 1000;
      timeRef.current += dt * speed;
      lastFrameTimeRef.current = now;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      const left = 60, top = 60;
      const bw = w - 120, bh = h - 120;
      const rad = Math.min(borderRadius, bw / 2, bh / 2);
      const samples = Math.floor((2 * (bw + bh) + 2 * Math.PI * rad) / 2);

      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const p = i / samples;
        const pt = getRoundedRectPoint(p, left, top, bw, bh, rad);
        const xn = octavedNoise(p * 8, 10, 1.6, 0.7, chaos, 10, timeRef.current, 0, 0);
        const yn = octavedNoise(p * 8, 10, 1.6, 0.7, chaos, 10, timeRef.current, 1, 0);
        if (i === 0) ctx.moveTo(pt.x + xn * 60, pt.y + yn * 60);
        else ctx.lineTo(pt.x + xn * 60, pt.y + yn * 60);
      }
      ctx.closePath();
      ctx.stroke();
      animationRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => { const s = updateSize(); w = s.w; h = s.h; });
    ro.observe(container);
    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); ro.disconnect(); };
  }, [color, speed, chaos, borderRadius, octavedNoise, getRoundedRectPoint]);

  return (
    <div ref={containerRef} className={cn("relative isolate", className)} style={{ ...style, borderRadius }} >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 border-2 blur-[1px] opacity-60" style={{ borderColor: color, borderRadius }} />
        <div className="absolute inset-0 border-2 blur-[4px]" style={{ borderColor: color, borderRadius }} />
        <div className="absolute inset-0 scale-[1.05] blur-[30px] opacity-20" style={{ background: `linear-gradient(-30deg, ${color}, transparent, ${color})`, borderRadius }} />
      </div>
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};

export default ElectricBorder;
