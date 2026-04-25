"use client";

import { useState, useEffect } from "react";

type TextSize = 14 | 16 | 18;

export function useTextSize() {
  const [textSize, setTextSize] = useState<TextSize>(16);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ny_text_size");
      if (stored === "14" || stored === "16" || stored === "18") {
        setTextSize(Number(stored) as TextSize);
      }
    } catch {}
  }, []);

  const increase = () => {
    setTextSize((prev) => {
      const next = (prev < 18 ? prev + 2 : prev) as TextSize;
      try { localStorage.setItem("ny_text_size", String(next)); } catch {}
      return next;
    });
  };

  const decrease = () => {
    setTextSize((prev) => {
      const next = (prev > 14 ? prev - 2 : prev) as TextSize;
      try { localStorage.setItem("ny_text_size", String(next)); } catch {}
      return next;
    });
  };

  return { textSize, increase, decrease };
}
