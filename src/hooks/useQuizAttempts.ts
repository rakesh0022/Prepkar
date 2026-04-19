'use client';

import { useEffect, useState } from 'react';

const FREE_DAILY_LIMIT = 2;
const STORAGE_KEY = 'quizAttempts';

interface AttemptData {
  date: string;
  count: number;
}

export function useQuizAttempts() {
  const [attempts, setAttempts] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: AttemptData = JSON.parse(raw);
      if (data.date === today) {
        setAttempts(data.count);
        setLimitReached(data.count >= FREE_DAILY_LIMIT);
        return;
      }
    }
    // New day or no data — reset
    setAttempts(0);
    setLimitReached(false);
  }, [today]);

  const recordAttempt = () => {
    const newCount = attempts + 1;
    const data: AttemptData = { date: today, count: newCount };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setAttempts(newCount);
    if (newCount >= FREE_DAILY_LIMIT) setLimitReached(true);
    return newCount;
  };

  return { attempts, limitReached, recordAttempt, limit: FREE_DAILY_LIMIT };
}
