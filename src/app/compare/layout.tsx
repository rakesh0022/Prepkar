import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Comparisons — IAS vs IPS, PO, SSC, Government vs Private — NaukriYatra",
  description: "Compare government job paths: IAS vs IPS, SBI PO vs IBPS PO, SSC CGL vs CHSL, UPSC vs State PSC, and Government vs Private jobs. Make informed career decisions with detailed comparisons.",
  keywords: ["IAS vs IPS", "SBI PO vs IBPS PO", "SSC CGL vs CHSL", "UPSC vs State PSC", "government vs private jobs", "career comparison", "government job comparison"],
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Career Comparisons — Choose Your Path — NaukriYatra",
    description: "Compare popular government job paths and make informed career decisions. IAS, IPS, PO, SSC, and more.",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
