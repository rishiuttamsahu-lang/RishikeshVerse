"use client";
import * as React from "react";
import clsx from "clsx";

export type AnimatedButtonProps = {
  className?: string;
  labelIdle?: string;
  labelActive?: string;
  generating?: boolean;
  highlightHueDeg?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
};

export default function AnimatedButton({
  className,
  labelIdle = "Generate",
  labelActive = "Generating",
  generating = false,
  highlightHueDeg = 210,
  onClick,
  type = "button",
  disabled = false,
  id,
  ariaLabel,
}: AnimatedButtonProps) {
  return (
    <div className={clsx("relative inline-block", className)} id={id}>
      <button
        type={type}
        aria-label={ariaLabel || (generating ? labelActive : labelIdle)}
        aria-pressed={generating}
        disabled={disabled}
        onClick={onClick}
        className={clsx(
          "ui-anim-btn",
          "relative flex items-center justify-center cursor-pointer select-none",
          "rounded-[24px] px-6 py-2 h-[50px]",
          "bg-black text-white",
          "border border-white/20",
          "shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),inset_0px_2px_2px_rgba(255,255,255,0.15),inset_0px_4px_4px_rgba(255,255,255,0.1),inset_0px_8px_8px_rgba(255,255,255,0.05),inset_0px_16px_16px_rgba(255,255,255,0.05)]",
          "transition-[box-shadow,border,background-color] duration-400"
        )}
        style={
          {
            ["--highlight-hue" as any]: `${highlightHueDeg}deg`,
          } as React.CSSProperties
        }
      >
        <svg
          className={clsx(
            "ui-anim-btn-svg mr-2 h-5 w-5 flex-grow-0",
            "fill-[color:var(--ui-anim-svg-fill)]",
            "transition-[fill,filter,opacity] duration-400"
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.035a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          ></path>
        </svg>
        <div className="ui-anim-txt-wrapper relative flex min-w-[5.5em] items-center justify-center font-medium">
          <div
            className={clsx(
              "ui-anim-txt-1 absolute",
              generating ? "opacity-0" : "animate-[ui-appear_1s_ease-in-out_forwards]"
            )}
          >
            {Array.from(labelIdle).map((ch, i) => (
              <span key={i} className="ui-anim-letter inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
          <div
            className={clsx(
              "ui-anim-txt-2 absolute",
              generating ? "opacity-100" : "opacity-0"
            )}
          >
            {Array.from(labelActive).map((ch, i) => (
              <span key={i} className="ui-anim-letter inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
        </div>
      </button>
      <style jsx>{`
        .ui-anim-btn {
          --padding: 4px;
          --radius: 24px;
          --transition: 0.4s;
          --highlight: hsl(var(--highlight-hue), 100%, 70%);
          --highlight-50: hsla(var(--highlight-hue), 100%, 70%, 0.5);
          --highlight-30: hsla(var(--highlight-hue), 100%, 70%, 0.3);
          --highlight-20: hsla(var(--highlight-hue), 100%, 70%, 0.2);
          --highlight-80: hsla(var(--highlight-hue), 100%, 70%, 0.8);
          --ui-anim-svg-fill: #e8e8e8;
        }

        .ui-anim-btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: calc(var(--radius) + var(--padding));
          pointer-events: none;
          background-image: linear-gradient(0deg, #0004, #000a);
          z-index: -1;
          transition: box-shadow var(--transition), filter var(--transition);
        }

        .ui-anim-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(0deg, #fff, var(--highlight), var(--highlight-50), 8%, transparent);
          background-position: 0 0;
          opacity: 0;
          transition: opacity var(--transition), filter var(--transition);
        }

        .ui-anim-letter {
          color: #ffffff88;
          animation: ui-letter-anim 2s ease-in-out infinite;
          transition: color var(--transition), text-shadow var(--transition), opacity var(--transition);
        }

        @keyframes ui-letter-anim {
          50% { text-shadow: 0 0 3px #fff8; color: #fff; }
        }

        .ui-anim-btn-svg {
          filter: drop-shadow(0 0 2px #fff9);
          animation: ui-flicker 2s linear infinite;
          animation-delay: 0.5s;
        }

        @keyframes ui-flicker {
          50% { opacity: 0.3; }
        }

        @keyframes ui-appear {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .ui-anim-btn:focus .ui-anim-txt-1,
        .ui-anim-btn:active .ui-anim-txt-1 {
          animation: ui-opacity-swap 0.3s ease-in-out forwards;
          animation-delay: 1s;
        }
        .ui-anim-btn:focus .ui-anim-txt-2,
        .ui-anim-btn:active .ui-anim-txt-2 {
          animation: ui-opacity-swap 0.3s ease-in-out reverse forwards;
          animation-delay: 1s;
        }

        @keyframes ui-opacity-swap {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        .ui-anim-btn:hover {
          border-color: hsla(var(--highlight-hue), 100%, 80%, 0.4);
        }
        .ui-anim-btn:hover::after {
          opacity: 1;
          -webkit-mask-image: linear-gradient(0deg, #fff, transparent);
          mask-image: linear-gradient(0deg, #fff, transparent);
        }
        .ui-anim-btn:hover .ui-anim-btn-svg {
          fill: #fff;
          filter: drop-shadow(0 0 3px var(--highlight)) drop-shadow(0 -4px 6px #0009);
          animation: none;
        }
      `}</style>
    </div>
  );
}