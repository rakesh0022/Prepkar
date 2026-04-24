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
      <div className="h-[3px] w-full bg-slate-300/40 backdrop-blur-sm">
        <div
          className="h-full rounded-full bg-gradient-to-r from-slate-400 via-emerald-400 to-emerald-600 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
