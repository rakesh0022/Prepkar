import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — NaukriYatra",
  description: "Important disclaimer for NaukriYatra. Information is for educational purposes only. Verify from official sources.",
  keywords: "disclaimer, educational content, government job information, NaukriYatra",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  const sections = [
    { title: "Educational Platform", content: "NaukriYatra is an independent educational platform not affiliated with UPSC, SSC, SBI, RRB, or any government body. All content is provided for informational and educational purposes only." },
    { title: "Information Accuracy", content: "Exam dates, cutoffs, salary figures, and other information are sourced from official government websites and public sources. While we strive for accuracy, this information may change without notice. Always verify from primary official sources before making decisions." },
    { title: "AI Interview Practice", content: "Our AI-generated interview questions are designed for practice purposes only and may not reflect actual exam questions or evaluation criteria. Performance in practice sessions does not guarantee success in real examinations." },
    { title: "No Guarantee of Results", content: "NaukriYatra provides tools and resources to help with exam preparation, but we cannot guarantee job selection, exam results, or career outcomes. Success depends on individual effort, preparation, and various external factors." },
    { title: "Third-Party Links", content: "We may provide links to external websites for additional resources. We are not responsible for the content, accuracy, or practices of these third-party sites. Use them at your own discretion." },
    { title: "User Responsibility", content: "Users are responsible for their own exam preparation and decisions. NaukriYatra is not liable for any consequences arising from the use or misuse of information provided on this platform." },
    { title: "Content Updates", content: "Exam patterns, syllabi, and requirements change frequently. We regularly update our content, but users should stay informed about the latest developments through official channels." },
    { title: "Contact for Concerns", content: "If you have concerns about any information on our platform, please contact us at contact@naukriyatra.com so we can review and correct it if necessary." },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80, paddingTop: 0 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px" }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 13, textDecoration: "none" }}>← Back to Home</Link>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#111827", marginTop: 16, marginBottom: 4 }}>Disclaimer</h1>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 28 }}>Last updated: April 19, 2026</p>

        <div style={{ background: "#FFF3CD", borderRadius: 16, padding: "20px", border: "1px solid rgba(255,193,7,0.2)", marginBottom: 24 }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Important Notice</div>
          <p style={{ fontSize: 14, color: "#856404", lineHeight: 1.6 }}>
            This information is for educational purposes only. NaukriYatra is not responsible for decisions made based on information on this site. Always verify from official government sources.
          </p>
        </div>

        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 24 }}>
          NaukriYatra provides educational content and tools to help with government job exam preparation. Please read this disclaimer carefully before using our services.
        </p>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{i + 1}. {s.title}</h2>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{s.content}</p>
          </div>
        ))}

        <div style={{ background: "#F8F9FA", borderRadius: 16, padding: "20px", border: "1px solid #E9ECEF", marginTop: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Questions?</h3>
          <p style={{ fontSize: 14, color: "#6C757D", lineHeight: 1.6, marginBottom: 12 }}>
            If you have any questions about this disclaimer or our services, please contact us.
          </p>
          <a href="mailto:contact@naukriyatra.com" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>
            contact@naukriyatra.com
          </a>
        </div>
      </div>
    </main>
  );
}