'use client';

import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function Interactive3DRobot({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}