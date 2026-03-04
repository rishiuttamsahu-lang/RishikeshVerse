"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

const MIN_RANGE = 40;
const ROTATION_DEG = -2.76;
const THETA = ROTATION_DEG * (Math.PI / 180);
const COS_THETA = Math.cos(THETA);
const SIN_THETA = Math.sin(THETA);

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function ContactTitleSlider() {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(250);

  useEffect(() => {
    const measure = () => setTextWidth(measureRef.current?.clientWidth ?? 300);
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (measureRef.current) ro.observe(measureRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center font-sans relative z-20 mb-16">
      <div className="max-w-5xl">
        <h2  className="font-black tracking-tighter text-5xl md:text-6xl text-white">
          Let's Build
        </h2>
        
        <span
          ref={measureRef}
          className="absolute -left-[9999px] px-4 whitespace-nowrap font-black tracking-tighter text-5xl md:text-6xl text-white"
        >
          The Future
        </span>
        
        <div className="flex justify-center gap-4 mt-4 md:mt-6">
          <OpenSourceSlider width={textWidth} />
        </div>

        <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Let's turn your ideas into a digital reality. Drop a message below and let's start coding.
        </p>
      </div>
    </div>
  );
}

function OpenSourceSlider({ width: initialWidth, height = 75, handleSize = 28, onChange }: any) {
  const width = initialWidth > 0 ? initialWidth + 35 : 0;
  
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(width);
  const [draggingHandle, setDraggingHandle] = useState<string | null>(null);
  const [dynamicRotation, setDynamicRotation] = useState(ROTATION_DEG);

  const leftRef = useRef(left);
  const rightRef = useRef(right);
  const dragRef = useRef<any>(null);

  useEffect(() => {
    leftRef.current = left;
    rightRef.current = right;
    onChange?.({ left, right, range: right - left });
  }, [left, right, onChange]);
  
  useEffect(() => {
    if (width > 0) {
      const handleMidpoint = (left + right) / 2;
      const sliderCenter = width / 2;
      const deviationFactor = (handleMidpoint - sliderCenter) / sliderCenter;
      const maxAdditionalTilt = 3; 
      const newRotation = ROTATION_DEG + (deviationFactor * maxAdditionalTilt);
      setDynamicRotation(newRotation);
    }
  }, [left, right, width]);

  useEffect(() => setRight(width), [width]);

  const startDrag = (handle: string, e: React.PointerEvent) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: leftRef.current,
      initialRight: rightRef.current,
    };
    setDraggingHandle(handle);
  };

  const moveDrag = useCallback((e: PointerEvent) => {
      if (!dragRef.current) return;
      const { handle, startX, startY, initialLeft, initialRight } = dragRef.current;
      const dX = e.clientX - startX;
      const dY = e.clientY - startY;
      const projected = dX * COS_THETA + dY * SIN_THETA;
      if (handle === "left") {
        const newLeft = clamp(initialLeft + projected, 0, rightRef.current - MIN_RANGE);
        setLeft(newLeft);
      } else {
        const newRight = clamp(initialRight + projected, leftRef.current + MIN_RANGE, width);
        setRight(newRight);
      }
    }, [width]);

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDraggingHandle(null);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [moveDrag, endDrag]);

  return (
    <div
      className="relative select-none transition-transform duration-300 ease-out"
      style={{ width, height, transform: `rotate(${dynamicRotation}deg)` }}
    >
      <div className="absolute inset-0 rounded-2xl border border-purple-500 pointer-events-none shadow-[0_0_15px_rgba(158,0,255,0.3)]" />
      {(["left", "right"]).map((handle) => {
        const x = handle === "left" ? left : right - handleSize;
        const scaleClass = draggingHandle === handle ? "scale-125" : "hover:scale-110";

        return (
          <button
            key={handle}
            type="button"
            onPointerDown={(e) => startDrag(handle, e)}
            className={`z-20 absolute top-0 h-full w-7 rounded-full bg-zinc-900 border border-purple-500 flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-purple-400 transition-transform duration-150 ease-in-out opacity-100 ${scaleClass}`}
            style={{ left: x, touchAction: "none" }}
          >
            <span className="w-1 h-8 rounded-full bg-purple-500" />
          </button>
        );
      })}
      <div
        className="flex z-10 items-center justify-center w-full h-full px-4 overflow-hidden pointer-events-none font-black tracking-tighter text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
        style={{ clipPath: `inset(0 ${width - right}px 0 ${left}px round 1rem)` }}
      >
        The Future
      </div>
    </div>
  );
}
