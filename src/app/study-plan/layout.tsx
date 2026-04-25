import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Study Plan Generator — NaukriYatra",
  description:
    "Generate a personalized week-by-week study plan for UPSC, SSC CGL, SBI PO, RBI Grade B, and 12+ government exams. Powered by AI.",
  keywords: [
    "study plan", "government exam preparation", "UPSC study plan", "SSC CGL schedule",
    "SBI PO preparation", "RBI Grade B plan", "personalised study timetable",
  ],
};

export default function StudyPlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
