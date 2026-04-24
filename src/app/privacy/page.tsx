import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — NaukriYatra",
  description: "NaukriYatra privacy policy. How we collect, use, and protect your data. Google AdSense cookie disclosure included.",
  keywords: "privacy policy, data protection, Google AdSense, cookies, NaukriYatra",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", content: "When you create an account, we collect your name, email address, and practice session data (exam scores, test history). We also collect anonymous usage data such as pages visited, features used, and device type to improve our service. We use localStorage to store quiz progress and streak data on your device." },
    { title: "How We Use Your Information", content: "Your information is used to provide and improve NaukriYatra services — storing your practice scores, showing your progress dashboard, sending exam date reminders (if opted in), and personalizing your experience. We use Supabase for secure authentication and data storage. We never sell your personal data to third parties." },
    { title: "Data Storage & Security", content: "Your data is stored securely on Supabase (hosted on AWS) with encryption at rest and in transit. We use Row Level Security to ensure users can only access their own data. Passwords are hashed and never stored in plain text." },
    { title: "Cookies and Google AdSense", content: "We use essential cookies for authentication (keeping you logged in) and analytics cookies (Google Analytics) to understand how our site is used. This site uses Google AdSense which may use cookies to serve personalized ads based on your browsing activity. You can disable non-essential cookies in your browser settings or opt out of personalized advertising at Google's Ads Settings page (ads.google.com/ads/preferences)." },
    { title: "Third-Party Services", content: "We use Google Gemini AI for mock interview practice (your responses are processed by Google's API), Supabase for authentication and data storage, Vercel for hosting, and Google Analytics for usage tracking. Each service has its own privacy policy." },
    { title: "Advertising", content: "We may display advertisements through Google AdSense. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising at Google's Ads Settings page." },
    { title: "Your Rights", content: "You can request deletion of your account and all associated data at any time by contacting us. You can export your practice history from the dashboard. You can opt out of promotional emails via the unsubscribe link." },
    { title: "Children's Privacy", content: "NaukriYatra is designed for users aged 16 and above. We do not knowingly collect data from children under 16. If you believe we have collected data from a minor, please contact us immediately." },
    { title: "Changes to This Policy", content: "We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the service after changes constitutes acceptance of the new policy." },
    { title: "Contact Us", content: "For privacy-related questions, email us at contact@naukriyatra.com or visit our Contact page." },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80, paddingTop: 0 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px" }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 13, textDecoration: "none" }}>← Back to Home</Link>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#111827", marginTop: 16, marginBottom: 4 }}>Privacy Policy</h1>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 28 }}>Last updated: April 19, 2026</p>

        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 24 }}>
          NaukriYatra (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our website and services.
        </p>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{i + 1}. {s.title}</h2>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{s.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
