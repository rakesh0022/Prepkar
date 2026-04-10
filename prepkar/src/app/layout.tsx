import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NaukriYatra — Your Journey from Dream to Selection",
  description: "India's first platform focused on cracking government job interviews. Free AI mock interviews, career roadmaps, real salary details, officer lifestyles, and success stories. SBI PO, SSC CGL, UPSC, Railway, State PSC.",
};

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, maximumScale: 1, themeColor: "#0c0d14",
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
