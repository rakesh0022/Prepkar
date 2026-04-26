"use client";
import { useEffect, useState } from "react";

export type GoalId =
  | "ssc-cgl"
  | "ssc-chsl"
  | "upsc"
  | "sbi-po"
  | "ibps-po"
  | "rrb-ntpc"
  | "nda"
  | "rbi-grade-b"
  | "state-psc"
  | null;

export interface GoalOption {
  id: GoalId;
  label: string;
  icon: string;
  color: string;
  category: string;
  examDate: string;       // ISO date of next exam
  countdownLabel: string; // e.g. "Tier I · Jun 20"
  jobLink: string;
  notifCategory: string;  // matches NotificationCategory
}

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: "ssc-cgl",
    label: "SSC CGL",
    icon: "📋",
    color: "#2563EB",
    category: "SSC",
    examDate: "2026-06-20",
    countdownLabel: "Tier I · Jun 20",
    jobLink: "/jobs/ssc-cgl-2026",
    notifCategory: "SSC",
  },
  {
    id: "upsc",
    label: "UPSC CSE",
    icon: "🏛️",
    color: "#7C3AED",
    category: "UPSC",
    examDate: "2026-06-01",
    countdownLabel: "Prelims · Jun 1",
    jobLink: "/jobs/upsc-cse-2026",
    notifCategory: "UPSC",
  },
  {
    id: "sbi-po",
    label: "SBI PO",
    icon: "🏦",
    color: "#059669",
    category: "Banking",
    examDate: "2026-08-01",
    countdownLabel: "Prelims · Aug 1",
    jobLink: "/jobs/sbi-po-2026",
    notifCategory: "Banking",
  },
  {
    id: "rrb-ntpc",
    label: "RRB NTPC",
    icon: "🚂",
    color: "#DC2626",
    category: "Railway",
    examDate: "2026-07-15",
    countdownLabel: "CBT-1 · Jul 15",
    jobLink: "/jobs/rrb-ntpc-2026",
    notifCategory: "Railway",
  },
  {
    id: "nda",
    label: "NDA",
    icon: "🎖️",
    color: "#0D9488",
    category: "Defence",
    examDate: "2026-09-14",
    countdownLabel: "Written · Sep 14",
    jobLink: "/jobs/nda-2026",
    notifCategory: "Defence",
  },
  {
    id: "ibps-po",
    label: "IBPS PO",
    icon: "💳",
    color: "#0891B2",
    category: "Banking",
    examDate: "2026-10-05",
    countdownLabel: "Prelims · Oct 5",
    jobLink: "/jobs/ibps-po-2026",
    notifCategory: "Banking",
  },
  {
    id: "rbi-grade-b",
    label: "RBI Grade B",
    icon: "💰",
    color: "#1D4ED8",
    category: "Banking",
    examDate: "2026-11-01",
    countdownLabel: "Phase I · Nov",
    jobLink: "/jobs/rbi-grade-b-2026",
    notifCategory: "Banking",
  },
  {
    id: "ssc-chsl",
    label: "SSC CHSL",
    icon: "📄",
    color: "#D97706",
    category: "SSC",
    examDate: "2026-07-01",
    countdownLabel: "Tier I · Jul",
    jobLink: "/jobs/ssc-chsl-2026",
    notifCategory: "SSC",
  },
  {
    id: "state-psc",
    label: "State PSC",
    icon: "🗳️",
    color: "#EA580C",
    category: "State",
    examDate: "2026-08-15",
    countdownLabel: "Prelims · Aug",
    jobLink: "/jobs",
    notifCategory: "State",
  },
];

function getDaysLeft(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = target.getTime() - today.getTime();
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}

export function useGoalSelector() {
  const [goalId, setGoalIdState] = useState<GoalId>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ny_goal") as GoalId | null;
      if (saved) setGoalIdState(saved);
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  function setGoal(id: GoalId) {
    setGoalIdState(id);
    try {
      if (id) localStorage.setItem("ny_goal", id);
      else localStorage.removeItem("ny_goal");
    } catch { /* ignore */ }
  }

  const goal = GOAL_OPTIONS.find(g => g.id === goalId) ?? null;
  const daysLeft = goal ? getDaysLeft(goal.examDate) : null;

  return { goalId, goal, daysLeft, setGoal, loaded };
}
