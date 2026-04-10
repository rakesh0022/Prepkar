import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NaukriYatra — Sapne se Selection Tak | AI Interview Prep & Government Jobs",
  description: "India's first platform for cracking government job interviews. AI mock interview practice in Hindi & English, job lifestyle details, salary breakdowns, success stories, and mentorship from selected officers. Bank PO, SSC, UPSC, Railway, State PSC.",
  keywords: ["government job interview", "sarkari naukri", "AI mock interview", "bank PO interview", "UPSC interview", "SSC interview", "government job salary", "IAS lifestyle", "naukri yatra"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0b10",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-[DM_Sans] text-white antialiased">{children}</body>
    </html>
  );
}
