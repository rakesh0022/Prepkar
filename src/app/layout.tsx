import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepKar - AI Mock Interview Practice | Bank PO, MBA, Fresher, Govt Jobs",
  description:
    "Free AI-powered mock interview practice for Bank PO, SBI, IBPS, MBA admission, fresher IT jobs, and government exams. Practice in Hindi & English. Get instant feedback and scorecard.",
  keywords: [
    "mock interview",
    "AI interview practice",
    "Bank PO interview",
    "SBI PO interview questions",
    "IBPS interview preparation",
    "MBA interview prep",
    "fresher interview questions",
    "government job interview",
    "UPSC personality test",
    "interview practice Hindi",
  ],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f1117",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[DM_Sans] bg-[#0f1117] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
