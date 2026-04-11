"use client";
import { useEffect, useState } from "react";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Persists the user's quiz answer for today. Resets automatically the next day. */
export function useDailyQuizAnswer() {
  const [answer, setAnswerState] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ny_quiz");
      if (raw) {
        const { date, answer: saved } = JSON.parse(raw);
        if (date === todayStr()) {
          setAnswerState(saved);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  function saveAnswer(idx: number) {
    setAnswerState(idx);
    try {
      localStorage.setItem("ny_quiz", JSON.stringify({ date: todayStr(), answer: idx }));
    } catch {
      // ignore
    }
  }

  return { answer, saveAnswer };
}
