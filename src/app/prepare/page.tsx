"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const STRATEGIES = [
  {
    id: "sbi-po", title: "SBI PO", color: "#0C7C59", icon: "🏦",
    timeline: "4–6 months",
    months: [
      { m: "Month 1–2", focus: "Build Foundation", tasks: ["Complete Quantitative Aptitude basics (Percentage, Profit/Loss, SI/CI, Ratio)", "Start Reasoning (Puzzles, Seating, Syllogism)", "Read The Hindu daily — note 5 current affairs", "Practice 1 sectional test daily"] },
      { m: "Month 3–4", focus: "Advanced Practice", tasks: ["Data Interpretation — advanced sets, caselet DI", "Banking Awareness — RBI policies, financial terms, schemes", "English — RC passages, error spotting, cloze tests", "Start full-length mocks — 2 per week"] },
      { m: "Month 5–6", focus: "Mock Test Phase", tasks: ["1 full mock daily, analyze every wrong answer", "Descriptive practice — 2 essays, 2 letters per week", "Interview preparation — record yourself answering", "Revise all short notes, GA capsule"] },
    ],
    books: ["Quantitative Aptitude — R.S. Aggarwal", "Reasoning — Arihant or M.K. Pandey", "Banking Awareness — Arihant", "English — S.P. Bakshi (Objective English)"],
    youtube: ["Adda247 (Hindi)", "Oliveboard (English)", "Study IQ Banking", "Unacademy Bank Exams"],
    tips: ["Speed matters more than accuracy in Prelims — attempt 75+ questions", "Mains GA section is the real differentiator — don't ignore it", "Descriptive essay should be structured: Intro → Body (3 points) → Conclusion", "Interview panel wants honesty, not rehearsed answers"],
  },
  {
    id: "ssc-cgl", title: "SSC CGL", color: "#2563EB", icon: "📋",
    timeline: "6–8 months",
    months: [
      { m: "Month 1–2", focus: "Tier-I Basics", tasks: ["Complete arithmetic — Percentage, Average, Algebra, Geometry", "Reasoning — Pattern, Analogy, Classification, Coding-Decoding", "GK — Static GK (Polity, History, Geography), Science basics", "English — Vocabulary, Idioms, One-word substitution"] },
      { m: "Month 3–4", focus: "Tier-I Advanced", tasks: ["Advanced Maths — Trigonometry, Coordinate Geometry, Mensuration", "Reasoning — Advanced puzzles, mirror/water images", "Current Affairs — last 6 months compilation", "Start sectional tests — 2 per day"] },
      { m: "Month 5–6", focus: "Tier-II Preparation", tasks: ["Tier-II Maths — 200 marks, higher difficulty", "Tier-II English — comprehension, essay, letter", "Full-length mocks — Tier-I (3/week) + Tier-II (2/week)", "Previous year paper analysis — last 5 years"] },
    ],
    books: ["Quantitative Aptitude — Kiran's SSC Mathematics", "Reasoning — Rakesh Yadav", "English — Neetu Singh (Plinth to Paramount)", "GK — Lucent's GK"],
    youtube: ["Dear Sir (Maths)", "Rakesh Yadav Readers Club", "The Study Power", "Pinnacle SSC"],
    tips: ["SSC loves Geometry — master all theorems and shortcuts", "Tier-I is just qualifying — focus on speed, attempt all 100 questions", "GK is unpredictable — cover static GK + last 6 months current affairs", "Handwriting matters in Tier-II descriptive — practice daily"],
  },
  {
    id: "upsc-cse", title: "UPSC CSE", color: "#7C3AED", icon: "🏛️",
    timeline: "12–18 months",
    months: [
      { m: "Month 1–4", focus: "NCERT Foundation", tasks: ["Complete all NCERT books Class 6–12 (History, Geography, Polity, Science, Economy)", "Make short notes from each chapter", "Read Indian Express + The Hindu editorial daily", "Start answer writing practice — 1 answer/day"] },
      { m: "Month 5–8", focus: "Standard Books + Prelims", tasks: ["Laxmikanth (Polity), Spectrum (History), Shankar IAS (Environment)", "Geography — Majid Husain, Economy — Ramesh Singh", "Prelims test series — weekly tests", "CSAT practice — comprehension and reasoning"] },
      { m: "Month 9–12", focus: "Mains + Interview", tasks: ["Answer writing — 10 answers daily (150/250 words)", "Essay practice — 2 per week on philosophical, social, political topics", "Optional subject deep study", "Mock interviews — practice with friends/mentors"] },
    ],
    books: ["Indian Polity — M. Laxmikanth", "Modern India — Spectrum", "Indian Geography — Majid Husain", "Economy — Ramesh Singh", "Environment — Shankar IAS"],
    youtube: ["Drishti IAS (Hindi)", "Unacademy UPSC", "StudyIQ IAS", "Vision IAS"],
    tips: ["NCERT is non-negotiable — read them 3 times minimum", "Answer writing is the #1 skill for Mains — practice daily", "Don't join too many test series — pick 1 and stick to it", "Newspaper reading is not optional — 1 hour daily, make notes"],
  },
  {
    id: "rrb-ntpc", title: "RRB NTPC", color: "#DC2626", icon: "🚂",
    timeline: "3–5 months",
    months: [
      { m: "Month 1–2", focus: "Foundation", tasks: ["Maths basics — Number System, LCM/HCF, Percentage, Average", "Reasoning — Analogy, Classification, Series, Blood Relations", "General Awareness — Indian Railways facts, polity basics, science", "English — Basic grammar, vocabulary, comprehension"] },
      { m: "Month 3–4", focus: "Practice Phase", tasks: ["Full-length mocks — 1 daily", "Previous year papers — last 3 years", "GK revision — monthly current affairs capsule", "Speed building — attempt 100 questions in 90 minutes"] },
    ],
    books: ["Maths — R.S. Aggarwal (Arithmetic)", "Reasoning — Arihant Verbal & Non-Verbal", "GK — Lucent's GK + Railway GK by Kiran", "English — Plinth to Paramount"],
    youtube: ["RRB Adda247", "Study 91", "Exampur Railway", "Gagan Pratap Maths"],
    tips: ["NTPC paper is easier than SSC CGL — focus on accuracy", "General Awareness has 40 questions — highest weightage", "Practice previous year papers — questions repeat patterns", "Railway-specific GK (zones, HQs, ministers) is always asked"],
  },
];

export default function PreparePage() {
  const [sel, setSel] = useState<string | null>(null);
  const strategy = STRATEGIES.find(s => s.id === sel);

  if (!strategy) return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      
      {/* Page Header Image */}
      <div style={{
        width: "100%", height: 200, 
        backgroundImage: "url('/images/pages/prepare-header.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: 0,
      }} />
      
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 15, textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>Preparation Strategy</h1>
      </header>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 14, color: "#374151", marginBottom: 6, fontWeight: 500 }}>Month-by-month study plans from toppers</p>
        <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 20 }}>Books, YouTube channels, tips, and timeline for each exam.</p>
        <div className="desktop-2col">
          {STRATEGIES.map(s => (
            <button key={s.id} onClick={() => setSel(s.id)} className="anim-up" style={{
              display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "16px",
              borderRadius: 14, background: "#FFFFFF", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
              cursor: "pointer", textAlign: "left",
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Timeline: {s.timeline}</div>
                <div style={{ fontSize: 10, color: s.color, fontWeight: 600, marginTop: 3 }}>{s.months.length} phases · {s.books.length} books · {s.tips.length} tips</div>
              </div>
              <span style={{ color: "#9CA3AF" }}>→</span>
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "20px 16px" }}>
        <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 16 }}>← All Strategies</button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${strategy.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{strategy.icon}</div>
          <div>
            <h1 style={{ fontFamily: "'Outfit'", fontSize: 24, fontWeight: 800, color: "#111827", margin: 0 }}>{strategy.title} Strategy</h1>
            <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>Timeline: {strategy.timeline}</p>
          </div>
        </div>

        {/* Monthly roadmap */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>📅 Month-by-Month Plan</div>
        {strategy.months.map((month, i) => (
          <div key={i} style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 10, borderLeft: `3px solid ${strategy.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{month.m}</div>
              <span style={{ fontSize: 10, fontWeight: 700, color: strategy.color, background: `${strategy.color}10`, padding: "2px 8px", borderRadius: 6 }}>{month.focus}</span>
            </div>
            {month.tasks.map((task, j) => (
              <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "4px 0" }}>
                <span style={{ color: strategy.color, fontSize: 12, marginTop: 1 }}>•</span>
                <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{task}</span>
              </div>
            ))}
          </div>
        ))}

        {/* Books */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, marginTop: 20 }}>📚 Recommended Books</div>
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 20 }}>
          {strategy.books.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0", borderBottom: i < strategy.books.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: 14 }}>📖</span>
              <span style={{ fontSize: 13, color: "#374151" }}>{b}</span>
            </div>
          ))}
        </div>

        {/* YouTube */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>🎥 YouTube Channels</div>
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 20 }}>
          {strategy.youtube.map((y, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0", borderBottom: i < strategy.youtube.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: 14 }}>▶️</span>
              <span style={{ fontSize: 13, color: "#374151" }}>{y}</span>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>💡 Topper Tips</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {strategy.tips.map((tip, i) => (
            <div key={i} style={{ background: "#FFFBEB", borderRadius: 10, padding: "12px 14px", borderLeft: "3px solid #F59E0B" }}>
              <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{tip}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/ai-practice" style={{ textDecoration: "none" }}>
          <div style={{
            marginTop: 24, padding: "14px", borderRadius: 14, textAlign: "center",
            background: strategy.color, color: "#fff", fontSize: 14, fontWeight: 700,
            boxShadow: `0 4px 16px ${strategy.color}30`,
          }}>Start {strategy.title} Practice →</div>
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
