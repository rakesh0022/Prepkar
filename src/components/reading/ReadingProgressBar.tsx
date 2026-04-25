"use client";

import { useEffect, useState, type RefObject } from "react";

type Props = {
  wordCount: number;
  targetRef?: RefObject<HTMLElement | null>;
  minWords?: number;
  topClassName?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ReadingProgressBar({
  wordCount,
  targetRef,
  minWords = 500,
  topClassName = "top-0 md:top-14",
}: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (wordCount <= minWords) return;

    const target = targetRef?.current;

    const update = () => {
      if (target) {
        const scrollable = target.scrollHeight - target.clientHeight;
        const next = scrollable <= 0 ? 100 : (target.scrollTop / scrollable) * 100;
        setProgress(clamp(next, 0, 100));
        return;
      }

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollable <= 0 ? 100 : (window.scrollY / scrollable) * 100;
      setProgress(clamp(next, 0, 100));
    };

    update();

    if (target) {
      target.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return () => {
        target.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [minWords, targetRef, wordCount]);

  if (wordCount <= minWords) return null;

  return (
    <div className={`pointer-events-none sticky z-40 ${topClassName}`}>
      <div className="h-[3px] w-full bg-slate-200/60">
        <div
          className="h-full origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500"
          style={{
            transform: `scaleX(${progress / 100})`,
            transition: "transform 0.2s linear",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}
