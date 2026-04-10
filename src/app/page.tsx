"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { JOBS, JOB_CATEGORIES, INTERVIEW_CATS, STORIES, COUNTDOWNS, DAILY_QUIZ } from "@/components/data";

export default function Home() {
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [jobFilter, setJobFilter] = useState("all");
  const filtered = jobFilter === "all" ? JOBS.slice(0, 4) : JOBS.filter(j => j.category === jobFilter).slice(0, 4);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0b10", paddingBottom: 80 }}>
      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, padding: "12px 16px",
        background: "rgba(10,11,16,0.95)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg,#059669,#06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 900, color: "#000", fontFamily: "'Outfit',sans-serif",
          }}>NY</div>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: -0.5 }}>
            Naukri<span style={{ color: "#34d399" }}>Yatra</span>
          </span>
        </div>
        <div style={{ background: "rgba(251,191,36,0.12)", borderRadius: 16, padding: "4px 12px", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 13 }}>🔥</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fbbf24" }}>7 day streak</span>
        </div>
      </header>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px" }}>
        {/* Hero */}
        <div className="fade-up" style={{ textAlign: "center", padding: "28px 0 20px" }}>
          <div style={{
            display: "inline-block", background: "linear-gradient(90deg,rgba(5,150,105,0.15),rgba(5,150,105,0.05))",
            border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20,
            padding: "4px 14px", fontSize: 11, fontWeight: 600, color: "#6ee7b7", marginBottom: 12, letterSpacing: 0.4,
          }}>✨ 14,582 new vacancies this week</div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 26, fontWeight: 900, lineHeight: 1.2, margin: "0 0 6px" }}>
            Sapne se<br /><span style={{ background: "linear-gradient(90deg,#34d399,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Selection Tak</span>
          </h1>
          <p style={{ color: "#6b7280", fontSize: 13 }}>Jobs • Interview Practice • Lifestyle • Mentorship</p>
        </div>

        {/* Exam Countdowns */}
        <section className="fade-up-d1" style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, paddingLeft: 2 }}>⏰ Exam Countdowns</div>
          <div className="hide-scrollbar" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {COUNTDOWNS.map((c, i) => (
              <div key={i} style={{
                minWidth: 130, background: "rgba(255,255,255,0.025)", borderRadius: 14, padding: "14px 14px 12px",
                border: "1px solid rgba(255,255,255,0.05)", flexShrink: 0,
              }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: c.color, fontFamily: "'Outfit',sans-serif" }}>{c.daysLeft}</div>
                <div style={{ fontSize: 9, color: "#555", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>days left</div>
                <div style={{ fontSize: 12, color: "#d1d5db", fontWeight: 600, marginTop: 6 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: "#4b5563" }}>{c.date}, 2026</div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Interview Question */}
        <section className="fade-up-d2" style={{
          marginBottom: 24, borderRadius: 16, padding: "18px 16px",
          background: "linear-gradient(135deg,rgba(5,150,105,0.08),rgba(6,182,212,0.06))",
          border: "1px solid rgba(52,211,153,0.12)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#34d399", letterSpacing: 1.2, textTransform: "uppercase" }}>🎯 {DAILY_QUIZ.topic}</div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>April 10, 2026</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#e5e7eb", lineHeight: 1.6, marginBottom: 12, fontWeight: 500 }}>{DAILY_QUIZ.question}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {DAILY_QUIZ.options.map((opt, i) => {
              const isCorrect = i === DAILY_QUIZ.correct;
              const picked = quizAnswer === i;
              const done = quizAnswer !== null;
              return (
                <button key={i} onClick={() => !done && setQuizAnswer(i)} style={{
                  padding: "10px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                  cursor: done ? "default" : "pointer", textAlign: "left", transition: "all 0.2s",
                  border: done && isCorrect ? "2px solid #22c55e" : done && picked ? "2px solid #ef4444" : "1px solid rgba(255,255,255,0.07)",
                  background: done && isCorrect ? "rgba(34,197,94,0.12)" : done && picked ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.03)",
                  color: done && isCorrect ? "#4ade80" : done && picked ? "#f87171" : "#d1d5db",
                }}>
                  {done && isCorrect ? "✓ " : done && picked ? "✗ " : ""}{opt}
                </button>
              );
            })}
          </div>
          {quizAnswer !== null && (
            <div style={{ marginTop: 10, background: "rgba(34,197,94,0.08)", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#86efac", lineHeight: 1.6 }}>
              💡 {DAILY_QUIZ.explanation}
            </div>
          )}
        </section>

        {/* Jobs */}
        <section className="fade-up-d3" style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: 1.5, textTransform: "uppercase", paddingLeft: 2 }}>💼 Latest Government Jobs</div>
            <Link href="/jobs" style={{ fontSize: 11, color: "#34d399", fontWeight: 600, textDecoration: "none" }}>View All →</Link>
          </div>
          <div className="hide-scrollbar" style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12, paddingBottom: 2 }}>
            <button onClick={() => setJobFilter("all")} style={{ padding: "5px 14px", borderRadius: 16, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", flexShrink: 0, background: jobFilter === "all" ? "#059669" : "rgba(255,255,255,0.04)", color: jobFilter === "all" ? "#000" : "#888" }}>All</button>
            {JOB_CATEGORIES.slice(0, 5).map(c => (
              <button key={c.id} onClick={() => setJobFilter(c.id)} style={{ padding: "5px 12px", borderRadius: 16, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", background: jobFilter === c.id ? c.color : "rgba(255,255,255,0.04)", color: jobFilter === c.id ? "#fff" : "#888" }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(job => (
              <Link key={job.id} href={`/jobs?id=${job.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{
                  background: "rgba(255,255,255,0.025)", borderRadius: 14, padding: "14px 16px",
                  border: "1px solid rgba(255,255,255,0.05)", transition: "border-color 0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 5, marginBottom: 5, flexWrap: "wrap" }}>
                        {job.isNew && <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8, letterSpacing: 0.5 }}>NEW</span>}
                        {job.isHot && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8, letterSpacing: 0.5 }}>🔥 HOT</span>}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6", marginBottom: 2, lineHeight: 1.3 }}>{job.title}</div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>{job.org}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                      <div style={{ fontSize: 17, fontWeight: 800, color: "#34d399", fontFamily: "'Outfit',sans-serif" }}>{job.vacancies.toLocaleString()}</div>
                      <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase" }}>posts</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>💰 {job.inHand} in-hand</span>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>📅 {job.lastDate}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#34d399", marginTop: 6, fontWeight: 600 }}>See salary, lifestyle, career path & perks →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* AI Interview */}
        <section className="fade-up-d4" style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, paddingLeft: 2 }}>🎯 AI Mock Interview — Crack the Final Round</div>
          <p style={{ fontSize: 12, color: "#555", marginBottom: 12, lineHeight: 1.5, paddingLeft: 2 }}>
            30-40% candidates fail in the interview after clearing the written exam. Don&apos;t be one of them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {INTERVIEW_CATS.map(cat => (
              <Link key={cat.id} href={`/interview?cat=${cat.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "rgba(255,255,255,0.025)", borderRadius: 14, padding: "16px 14px",
                  border: "1px solid rgba(255,255,255,0.05)", textAlign: "center", transition: "border-color 0.2s",
                }}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#f3f4f6" }}>{cat.title}</div>
                  <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{cat.sub}</div>
                  <div style={{ marginTop: 8, fontSize: 10, fontWeight: 700, color: cat.color, background: `${cat.color}18`, padding: "4px 10px", borderRadius: 6, display: "inline-block" }}>Practice Free →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: 1.5, textTransform: "uppercase", paddingLeft: 2 }}>⭐ Success Stories — They Made It</div>
            <Link href="/stories" style={{ fontSize: 11, color: "#34d399", fontWeight: 600, textDecoration: "none" }}>All →</Link>
          </div>
          <div className="hide-scrollbar" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {STORIES.slice(0, 3).map((s, i) => (
              <div key={i} style={{
                minWidth: 250, background: "rgba(255,255,255,0.025)", borderRadius: 16, padding: "16px 14px",
                border: "1px solid rgba(255,255,255,0.05)", flexShrink: 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f3f4f6" }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: s.bgColor, fontWeight: 700 }}>{s.achievement}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "#9ca3af", fontStyle: "italic", lineHeight: 1.6, marginBottom: 8 }}>&ldquo;{s.quote.slice(0, 120)}...&rdquo;</p>
                <div style={{ fontSize: 10, color: "#6b7280" }}>Now: {s.now}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mentorship Teaser */}
        <section style={{
          marginBottom: 24, borderRadius: 16, padding: "22px 16px", textAlign: "center",
          background: "linear-gradient(135deg,rgba(251,191,36,0.08),rgba(245,158,11,0.05))",
          border: "1px solid rgba(251,191,36,0.15)",
        }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🤝</div>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Talk to Someone Who Cracked It</h3>
          <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5, marginBottom: 12 }}>
            Connect with real selected officers — Bank POs, IAS officers, SSC toppers.<br />
            Learn directly from someone who sat in YOUR interview panel.
          </p>
          <div style={{ display: "inline-block", background: "#f59e0b", color: "#000", padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Coming Soon — Join Waitlist</div>
        </section>

        {/* Stats */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
          {[
            { v: "3.2L+", l: "Aspirants", i: "👥" },
            { v: "50K+", l: "Mock Interviews", i: "🎯" },
            { v: "6", l: "Job Categories", i: "💼" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: "14px 10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{s.i}</div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Outfit',sans-serif" }}>{s.v}</div>
              <div style={{ fontSize: 9, color: "#6b7280" }}>{s.l}</div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 800, marginBottom: 4 }}>
            Naukri<span style={{ color: "#34d399" }}>Yatra</span>
          </div>
          <p style={{ fontSize: 11, color: "#4b5563", marginBottom: 2 }}>Sapne se Selection Tak</p>
          <p style={{ fontSize: 10, color: "#374151" }}>© 2026 NaukriYatra — Made with ❤️ in India</p>
        </footer>
      </div>

      <BottomNav />
    </main>
  );
}
