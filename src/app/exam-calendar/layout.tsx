import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam Calendar 2026 — Important Dates & Deadlines — NaukriYatra",
  description: "Complete exam calendar for 2026. SSC, Banking, UPSC, Railway, Defence exams. Registration deadlines, exam dates, and countdown timers.",
  keywords: ["exam calendar 2026", "exam dates", "government exam schedule", "registration dates", "exam deadlines"],
  alternates: { canonical: "/exam-calendar" },
  openGraph: {
    title: "2026 Exam Calendar — Important Dates & Deadlines — NaukriYatra",
    description: "Track all government exam dates, registration deadlines, and set calendar reminders.",
  },
};

export default function ExamCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
