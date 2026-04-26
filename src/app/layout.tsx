import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import ReadingProgress from "@/components/ReadingProgress";
import BackToTop from "@/components/BackToTop";

const siteUrl = "https://prepkar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NaukriYatra — Sapne se Selection Tak",
  description: "Your journey from dream to government job selection. AI interview practice, career roadmaps, salary calculators, exam syllabus. SBI PO, SSC CGL, UPSC, Railway, Banking, Defence — 17+ govt jobs with complete preparation guides.",
  keywords: ["government jobs", "sarkari naukri", "SBI PO", "SSC CGL", "UPSC", "Railway jobs", "NDA", "IBPS", "RBI Grade B", "mock interview", "salary calculator", "exam preparation", "govt job roadmap"],
  authors: [{ name: "NaukriYatra" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NaukriYatra — Sapne se Selection Tak",
    description: "Free AI mock interviews, 17+ govt job roadmaps, salary calculators, exam syllabus & PYQ papers. Your complete government job preparation companion.",
    url: siteUrl,
    siteName: "NaukriYatra",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/branding/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NaukriYatra — Sapne se Selection Tak — Government Job Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NaukriYatra — Sapne se Selection Tak",
    description: "Free AI mock interviews, 17+ govt job roadmaps, salary calculators. Your complete sarkari naukri preparation companion.",
    images: [`${siteUrl}/images/branding/og-image.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, themeColor: "#F8F9FB" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/branding/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/branding/icon-192.png" />
        {/* Add Google Search Console verification meta tag here when verified:
            <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NaukriYatra",
              url: siteUrl,
              description: "Government job preparation platform for UPSC, SSC, Banking exams",
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/jobs?search={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="font-[DM_Sans] antialiased">
        <GoogleAnalytics />
        <ReadingProgress />
        <Header />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
