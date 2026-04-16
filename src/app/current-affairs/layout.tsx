import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Current Affairs 2026 — GK for Govt Exams — NaukriYatra",
  description: "Daily current affairs for government exam preparation. Polity, Economy, Science, Banking, Defence, Sports — updated daily. Perfect for SSC, UPSC, Bank PO, Railway GK section.",
  keywords: ["current affairs 2026", "daily GK", "government exam current affairs", "SSC GK", "UPSC current affairs", "banking awareness 2026"],
  openGraph: {
    title: "Daily Current Affairs 2026 — NaukriYatra",
    description: "Daily GK updates for govt exams. Polity, Economy, Science, Banking — all in one place.",
  },
};

export default function CurrentAffairsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
