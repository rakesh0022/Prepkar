import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Quiz Practice — 8 Subjects, Daily Attempts — NaukriYatra",
  description: "Take free quizzes for government exam prep. Polity, Economy, Geography, History, Science, Current Affairs, Quantitative Aptitude, English, Reasoning. 5 attempts/day, instant feedback.",
  keywords: ["free quiz", "government exam practice", "UPSC quiz", "SSC quiz", "banking exam practice", "current affairs quiz"],
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "Free Practice Quizzes — Test Your Knowledge — NaukriYatra",
    description: "8 subjects, 170+ questions, 5 free attempts daily. Get instant feedback and track your progress.",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
