// ─── Type Definitions ─────────────────────────────────────────────────────────
export type Countdown = {
  name: string;
  date: string;
  days: number;
  color: string;
};

export type QuizQuestion = {
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

// ─── Job ──────────────────────────────────────────────────────────────────────
export interface RoadmapStep {
  icon: string;
  title: string;
  detail: string;
  duration?: string;
}

export interface FitGuide {
  chooseIf: string[];
  avoidIf: string[];
}

export type Qualification = "10th" | "12th" | "Graduate" | "Post Graduate";

export interface Job {
  id: string;
  title: string;
  org: string;
  vacancies: number;
  lastDate: string;
  salary: string;
  inHand: string;
  category: string;
  qualification: Qualification;
  isNew: boolean;
  isHot: boolean;
  grade: string;
  benefits: string[];
  career: string;
  lifestyle: string;
  eligibility: string;
  exam: string;
  dayInLife: string;
  whyChoose: string[];
  challenges: string;
  impact: string;
  roadmap: RoadmapStep[];
  promotionPath: { title: string; salary: string; years: string }[];
  difficulty: "Moderate" | "Hard" | "Very Hard";
  prepTime: string;
  realityCheck: string;
  fitGuide: FitGuide;
  successStory: { emoji: string; name: string; line: string };
  applyLink?: string;
  syllabus?: string[];
  pyqLinks?: { label: string; url: string }[];
  salaryBreakdown?: { basic: number; da: number; hra: Record<string, number>; ta: number; other: number };
  image?: string;
}

export interface PracticeStage {
  id: string;
  label: string;
  icon: string;
  description: string;
  questionCount: number;
}

export interface PracticeCategory {
  id: string;
  title: string;
  sub: string;
  icon: string;
  color: string;
  stages: PracticeStage[];
}

export type CityType = "metro" | "urban" | "rural";

export interface CurrentAffairsEntry {
  date: string;
  topic: string;
  fact: string;
  importance: "High" | "Medium" | "Low";
  source: string;
  sourceUrl: string;
}

// ─── Data Imports from JSON files ──────────────────────────────────────────────
import jobsData from "@/data/jobs.json";
import storiesData from "@/data/stories.json";
import practiceCategories from "@/data/practice-categories.json";
import dailyQuestions from "@/data/daily-questions.json";
import countdownsData from "@/data/exam-countdowns.json";
import currentAffairsData from "@/data/current-affairs.json";
// --- Re-export data from JSON files (Barrel File Pattern) ---------------------
export const JOBS: Job[] = jobsData as Job[];

// ─── Categories ───────────────────────────────────────────────────────────────
export const JOB_CATEGORIES = [
  { id: "banking", label: "Banking", icon: "🏦", color: "#0C7C59" },
  { id: "ssc",     label: "SSC",     icon: "📋", color: "#2563eb" },
  { id: "railway", label: "Railway", icon: "🚂", color: "#dc2626" },
  { id: "upsc",    label: "UPSC",    icon: "🏛️", color: "#7c3aed" },
  { id: "defence", label: "Defence", icon: "🎖️", color: "#0d9488" },
  { id: "state",   label: "State PSC", icon: "🗳️", color: "#ea580c" },
];

// ─── Qualification filters ────────────────────────────────────────────────────
export const QUALIFICATION_FILTERS: { id: Qualification | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "10th", label: "10th Pass" },
  { id: "12th", label: "12th Pass" },
  { id: "Graduate", label: "Graduate" },
  { id: "Post Graduate", label: "Post Graduate" },
];

// ─── Practice categories ──────────────────────────────────────────────────────
export const PRACTICE_CATS: PracticeCategory[] = practiceCategories as PracticeCategory[];

// Keep backward compat
export const INTERVIEW_CATS = PRACTICE_CATS.map(c => ({
  id: c.id,
  title: c.title,
  sub: c.sub,
  icon: c.icon,
  color: c.color,
  roles: c.stages.map(s => s.label),
}));

// ─── Hero stories ─────────────────────────────────────────────────────────────
export const HERO_STORIES = storiesData.hero_stories;

// ─── Success stories ──────────────────────────────────────────────────────────
export const STORIES = storiesData.success_stories;

// ─── Countdowns ───────────────────────────────────────────────────────────────
export const COUNTDOWNS: Countdown[] = countdownsData as Countdown[];

// ─── Daily Quiz Pool ──────────────────────────────────────────────────────────
export const DAILY_QUIZ_POOL: QuizQuestion[] = dailyQuestions as QuizQuestion[];

// ─── Utilities ────────────────────────────────────────────────────────────────
export function getDaysLeft(dateStr: string): number {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - today.getTime();
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function getTodaysQuiz(): QuizQuestion {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return DAILY_QUIZ_POOL[dayOfYear % DAILY_QUIZ_POOL.length];
}

export function calculateSalary(breakdown: NonNullable<Job["salaryBreakdown"]>, city: CityType) {
  const hra = breakdown.hra[city] || 0;
  const gross = breakdown.basic + breakdown.da + hra + breakdown.ta + breakdown.other;
  const nps = Math.round(breakdown.basic * 0.10);
  const inHand = gross - nps;
  return { basic: breakdown.basic, da: breakdown.da, hra, ta: breakdown.ta, other: breakdown.other, gross, nps, inHand };
}

// ─── City types for salary calculation ────────────────────────────────────────
export const CITY_TYPES: { id: CityType; label: string; examples: string }[] = [
  { id: "metro", label: "Metro", examples: "Delhi, Mumbai, Chennai, Kolkata, Bangalore, Hyderabad" },
  { id: "urban", label: "Urban", examples: "Jaipur, Lucknow, Bhopal, Patna, Ranchi, Chandigarh" },
  { id: "rural", label: "Rural", examples: "Tehsil HQ, Small towns, Village postings" },
];

// ─── Current Affairs ──────────────────────────────────────────────────────────
export const CURRENT_AFFAIRS: CurrentAffairsEntry[] = currentAffairsData.entries as CurrentAffairsEntry[];

export const CURRENT_AFFAIRS_META = {
  lastUpdated: currentAffairsData.lastUpdated,
  disclaimer: currentAffairsData.disclaimer,
  reportErrorUrl: currentAffairsData.reportErrorUrl,
};
}





