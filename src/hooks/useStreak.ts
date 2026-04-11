"use client";
import { useEffect, useState } from "react";

interface StreakData {
  count: number;
  lastVisit: string; // ISO date YYYY-MM-DD
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [isNew, setIsNew] = useState(false); // true if streak just incremented today

  useEffect(() => {
    const today = todayStr();
    const yesterday = yesterdayStr();

    let data: StreakData;
    try {
      const raw = localStorage.getItem("ny_streak");
      data = raw ? JSON.parse(raw) : { count: 0, lastVisit: "" };
    } catch {
      data = { count: 0, lastVisit: "" };
    }

    if (data.lastVisit === today) {
      // Already visited today — just show current streak
      setStreak(data.count);
      setIsNew(false);
    } else if (data.lastVisit === yesterday) {
      // Consecutive day — increment
      const updated: StreakData = { count: data.count + 1, lastVisit: today };
      localStorage.setItem("ny_streak", JSON.stringify(updated));
      setStreak(updated.count);
      setIsNew(true);
    } else {
      // Streak broken or first visit — reset to 1
      const updated: StreakData = { count: 1, lastVisit: today };
      localStorage.setItem("ny_streak", JSON.stringify(updated));
      setStreak(1);
      setIsNew(data.lastVisit !== ""); // only "new" if they had a streak before
    }
  }, []);

  return { streak, isNew };
}
