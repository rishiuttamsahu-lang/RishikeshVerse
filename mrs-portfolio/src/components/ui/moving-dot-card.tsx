"use client";
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

export function MovingDotCard({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className="relative w-full h-full p-[1px] rounded-3xl bg-zinc-900 overflow-hidden group">
      {/* Moving Dot */}
      <div className="absolute w-20 h-20 bg-purple-500 rounded-full blur-2xl animate-[moveDot_4s_linear_infinite] z-0"></div>
      
      {/* Inner Card content */}
      <div className={cn("relative z-10 w-full h-full bg-[#09090b] rounded-[calc(1.5rem-1px)] p-6", className)}>
        {children}
      </div>
    </div>
  );
}
