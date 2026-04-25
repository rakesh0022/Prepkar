"use client";

import { useCallback, useEffect, useState } from "react";

export interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  hours: number;
  resources: string[];
  color: string;
}

export interface StudyDay {
  day: string;
  tasks: StudyTask[];
}

export interface StudyWeek {
  week: number;
  theme: string;
  days: StudyDay[];
}

export interface StudyPlanData {
  examName: string;
  examDate: string;
  generatedAt: string;
  weeks: StudyWeek[];
}

interface PlanState {
  plan: StudyPlanData | null;
  completedTasks: string[];
  startDate: string;
  streak: number;
  lastActiveDate: string;
}

const STORAGE_KEY = "ny_study_plan";
const DEFAULT_STATE: PlanState = {
  plan: null,
  completedTasks: [],
  startDate: "",
  streak: 0,
  lastActiveDate: "",
};

function readState(): PlanState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PlanState) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

function writeState(state: PlanState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function useStudyPlan() {
  const [state, setState] = useState<PlanState>(DEFAULT_STATE);

  useEffect(() => {
    const s = readState();
    // Reset streak if more than 1 day has passed without activity
    if (s.lastActiveDate && s.lastActiveDate !== today() && s.lastActiveDate !== yesterday()) {
      s.streak = 0;
    }
    setState(s);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readState());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  type RawTask = Omit<StudyTask, "id">;
  type RawDay = { day: string; tasks: RawTask[] };
  type RawWeek = { week: number; theme: string; days: RawDay[] };

  const savePlan = useCallback((raw: { weeks: RawWeek[] }, examName: string, examDate: string) => {
    const todayStr = today();

    // Enrich tasks with generated IDs
    const enrichedWeeks: StudyWeek[] = raw.weeks.map((w) => ({
      ...w,
      days: w.days.map((d, dayIdx) => ({
        ...d,
        tasks: d.tasks.map((t, taskIdx) => ({
          ...t,
          id: `w${w.week}_d${dayIdx}_t${taskIdx}`,
        })),
      })),
    }));

    const plan: StudyPlanData = {
      examName,
      examDate,
      generatedAt: todayStr,
      weeks: enrichedWeeks,
    };

    const newState: PlanState = {
      plan,
      completedTasks: [],
      startDate: todayStr,
      streak: 0,
      lastActiveDate: "",
    };
    writeState(newState);
    setState(newState);
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setState((prev) => {
      const todayStr = today();
      const isCompleting = !prev.completedTasks.includes(taskId);

      const completedTasks = isCompleting
        ? [...prev.completedTasks, taskId]
        : prev.completedTasks.filter((id) => id !== taskId);

      let { streak, lastActiveDate } = prev;

      if (isCompleting && lastActiveDate !== todayStr) {
        // First task completed today — update streak
        if (lastActiveDate === yesterday() || lastActiveDate === "") {
          streak = streak + 1;
        } else {
          streak = 1; // Gap detected, restart streak
        }
        lastActiveDate = todayStr;
      }

      const newState = { ...prev, completedTasks, streak, lastActiveDate };
      writeState(newState);
      return newState;
    });
  }, []);

  const clearPlan = useCallback(() => {
    writeState(DEFAULT_STATE);
    setState(DEFAULT_STATE);
  }, []);

  const totalTasks =
    state.plan?.weeks.reduce(
      (sum, w) => sum + w.days.reduce((s, d) => s + d.tasks.length, 0),
      0
    ) ?? 0;
  const completedCount = state.completedTasks.length;
  const progress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return {
    plan: state.plan,
    completedTasks: new Set(state.completedTasks),
    streak: state.streak,
    progress,
    totalTasks,
    completedCount,
    startDate: state.startDate,
    savePlan,
    toggleTask,
    clearPlan,
  };
}
