"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import StreakBar from "@/components/home/StreakBar";
import DailyChallenge from "@/components/home/DailyChallenge";
import TargetExams from "@/components/home/TargetExams";
import InterviewCTA from "@/components/home/InterviewCTA";
import StoriesStrip from "@/components/home/StoriesStrip";
import MentorshipBanner from "@/components/home/MentorshipBanner";
import WaitlistModal from "@/components/WaitlistModal";
import { HERO_STORIES, COUNTDOWNS, STORIES, JOBS, getTodaysQuiz } from "@/components/data";
import { useStreak } from "@/hooks/useStreak";
import { useDailyQuizAnswer } from "@/hooks/useDailyQuiz";

export default function Home() {
  const [si, setSi] = useState(0);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const { streak, isNew } = useStreak();
  const { answer, saveAnswer } = useDailyQuizAnswer();
  const quiz = getTodaysQuiz();

  useEffect(() => { const t = setInterval(() => setSi(i => (i + 1) % HERO_STORIES.length), 5000); return () => clearInterval(t); }, []);
  const s = HERO_STORIES[si];

  const storiesForStrip = STORIES.map(s => ({ ...s, bgColor: s.color }));

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>

      {/* ═══ HERO — FULL WIDTH, DREAM-FOCUSED ═══ */}
      <section className="anim-up" style={{
        background: "var(--bg-hero)", color: "#fff",
        padding: "48px 24px 40px", textAlign: "center",
        borderRadius: "0 0 28px 28px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, marginBottom: 28, opacity: 0.9 }}>
            Naukri<span style={{ color: "#5EEAD4" }}>Yatra</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800,
            lineHeight: 1.2, marginBottom: 8, letterSpacing: -0.5,
          }}>
            Sapne se<br />
            <span style={{ color: "#5EEAD4" }}>Selection Tak</span>
          </h1>
          <p style={{ fontSize: 14, opacity: 0.65, marginBottom: 28, lineHeight: 1.5 }}>
            Your journey to a government job starts here
          </p>

          {/* Rotating story */}
          <div key={si} className="anim-fade" style={{
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)",
            borderRadius: 16, padding: "18px 20px", maxWidth: 420, margin: "0 auto 24px",
            border: "1px solid rgba(255,255,255,0.12)", textAlign: "left",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, rgba(94,234,212,0.3), rgba(59,130,246,0.3))",
                border: "2px solid rgba(94,234,212,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
              }}>{s.emoji}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "#5EEAD4", fontWeight: 600 }}>{s.role}</div>
              </div>
              <div style={{
                marginLeft: "auto", background: "rgba(94,234,212,0.15)",
                border: "1px solid rgba(94,234,212,0.3)", borderRadius: 8,
                padding: "2px 8px", fontSize: 9, fontWeight: 700, color: "#5EEAD4",
              }}>✓ SELECTED</div>
            </div>
            <p style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.6, margin: 0, fontStyle: "italic", opacity: 0.9 }}>
              &ldquo;{s.quote}&rdquo;
            </p>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24 }}>
            {HERO_STORIES.map((_, i) => (
              <button key={i} onClick={() => setSi(i)} style={{
                width: i === si ? 20 : 6, height: 6, borderRadius: 4,
                background: i === si ? "#5EEAD4" : "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer", transition: "all 0.3s",
              }} />
            ))}
          </div>

          <Link href="/interview" style={{ textDecoration: "none" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(90deg, #3B82F6, #14B8A6)",
              color: "#fff", padding: "14px 28px",
              borderRadius: 12, fontSize: 15, fontWeight: 700,
              boxShadow: "0 4px 24px rgba(59,130,246,0.4)",
            }}>
              <span>🎯</span> Start Interview Practice — Free
            </div>
          </Link>
          <p style={{ fontSize: 11, opacity: 0.4, marginTop: 10 }}>
            AI mock interview with instant scoring
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px" }}>

        {/* ═══ STREAK BAR ═══ */}
        <div className="anim-up-1" style={{ paddingTop: 20 }}>
          <StreakBar streak={streak} isNew={isNew} quizDone={answer !== null} />
        </div>

        {/* ═══ DAILY CHALLENGE ═══ */}
        <div className="anim-up-2">
          <DailyChallenge quiz={quiz} answer={answer} onAnswer={saveAnswer} />
        </div>

        {/* ═══ MOTIVATION FACTS ═══ */}
        <section className="anim-up-2" style={{ paddingBottom: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { n: "25L+", l: "Vacancies in 2026", c: "#16A34A" },
              { n: "₹56K", l: "Starting IAS salary", c: "#2563EB" },
              { n: "FREE", l: "Travel for Railway officers", c: "#DC2626" },
            ].map((f, i) => (
              <div key={i} style={{
                background: "#FFFFFF", borderRadius: 14, padding: "16px 12px",
                textAlign: "center", border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: f.c, fontFamily: "'Outfit'" }}>{f.n}</div>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3, lineHeight: 1.3 }}>{f.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ TARGET EXAMS ═══ */}
        <div className="anim-up-3" style={{ paddingTop: 12 }}>
          <TargetExams exams={COUNTDOWNS} />
        </div>

        {/* ═══ DREAM CARDS ═══ */}
        <section className="anim-up-3" style={{ padding: "8px 0 0" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
            What if you become...
          </h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 14 }}>
            Tap to explore the life, salary, and roadmap
          </p>

          <div className="no-scroll" style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
            {[
              { title: "District Magistrate", sub: "UPSC → IAS", perk: "Bungalow + Vehicle + ₹2.5L/month", emoji: "🏛️", bg: "linear-gradient(135deg,#4c1d95,#6d28d9)", link: "/jobs?id=upsc-cse-2026" },
              { title: "Bank PO → Manager", sub: "SBI PO Exam", perk: "₹52K start + Housing + Medical", emoji: "🏦", bg: "linear-gradient(135deg,#064e3b,#0C7C59)", link: "/jobs?id=sbi-po-2026" },
              { title: "Income Tax Inspector", sub: "SSC CGL Exam", perk: "₹65K + Govt Quarter + Raids", emoji: "📋", bg: "linear-gradient(135deg,#1e3a5f,#2563eb)", link: "/jobs?id=ssc-cgl-2026" },
              { title: "Station Master", sub: "RRB NTPC Exam", perk: "FREE trains for life + Uniform", emoji: "🚂", bg: "linear-gradient(135deg,#7f1d1d,#dc2626)", link: "/jobs?id=rrb-ntpc-2026" },
              { title: "RBI Officer", sub: "RBI Grade B", perk: "₹1.05L/month + Metro posting", emoji: "💰", bg: "linear-gradient(135deg,#0F4C81,#1D7ED8)", link: "/jobs?id=rbi-grade-b-2026" },
              { title: "Army Officer", sub: "NDA Exam", perk: "₹65K + Adventure + Honor", emoji: "🎖️", bg: "linear-gradient(135deg,#134E4A,#0D9488)", link: "/jobs?id=nda-2026" },
            ].map((d, i) => (
              <Link key={i} href={d.link} style={{ textDecoration: "none", flexShrink: 0 }}>
                <div style={{
                  width: 200, borderRadius: 16, padding: "22px 18px", color: "#fff",
                  background: d.bg, boxShadow: "var(--shadow-md)",
                }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{d.emoji}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{d.title}</div>
                  <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 10 }}>{d.sub}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, background: "rgba(255,255,255,0.15)",
                    padding: "5px 10px", borderRadius: 8, display: "inline-block",
                  }}>{d.perk}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ INTERVIEW CTA ═══ */}
        <div className="anim-up-4" style={{ paddingTop: 20 }}>
          <InterviewCTA />
        </div>

        {/* ═══ SUCCESS STORIES ═══ */}
        <div className="anim-up-5">
          <StoriesStrip stories={storiesForStrip} />
        </div>

        {/* ═══ MENTORSHIP BANNER ═══ */}
        <div className="anim-up-5">
          <MentorshipBanner onJoin={() => setShowWaitlist(true)} />
        </div>

        {/* ═══ WHY GOVERNMENT JOB ═══ */}
        <section className="anim-up-6" style={{ padding: "8px 0 0" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
            Why a Government Job?
          </h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
            The difference is real — and it compounds over a lifetime.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "🏠", title: "Housing", govt: "Govt quarter or HRA ₹15K–₹30K paid by employer", pvt: "Pay rent from your own salary", color: "#2563EB" },
              { icon: "🏥", title: "Medical", govt: "Free healthcare for entire family — forever", pvt: "Pay premiums, limited coverage", color: "#16A34A" },
              { icon: "💰", title: "Pension", govt: "Monthly pension after retirement — for life", pvt: "No pension. Only PF if lucky", color: "#D97706" },
              { icon: "⏰", title: "Work-Life Balance", govt: "Fixed hours, 30 leaves/year, weekends off", pvt: "Overtime, weekend calls, burnout", color: "#0D9488" },
              { icon: "🔒", title: "Job Security", govt: "Cannot be laid off. Permanent from Day 1", pvt: "Layoffs, PIPs, restructuring", color: "#7C3AED" },
              { icon: "📈", title: "Growth", govt: "Clear promotion path, no politics", pvt: "Depends on manager, company politics", color: "#EA580C" },
            ].map((b, i) => (
              <div key={i} style={{
                background: "#FFFFFF", borderRadius: 14, padding: "14px 16px",
                border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: `${b.color}0D`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>{b.icon}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{b.title}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    <div style={{
                      background: `${b.color}08`, borderRadius: 8, padding: "7px 10px",
                      border: `1px solid ${b.color}18`,
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: b.color, letterSpacing: 0.5, marginBottom: 3 }}>GOVT JOB ✓</div>
                      <div style={{ fontSize: 11, color: "#374151", lineHeight: 1.4 }}>{b.govt}</div>
                    </div>
                    <div style={{
                      background: "#F9FAFB", borderRadius: 8, padding: "7px 10px",
                      border: "1px solid rgba(0,0,0,0.04)",
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "#9CA3AF", letterSpacing: 0.5, marginBottom: 3 }}>PRIVATE JOB</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.4 }}>{b.pvt}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ EXPLORE + PRACTICE CTAs ═══ */}
        <section style={{ padding: "28px 0 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/jobs" style={{ textDecoration: "none" }}>
              <div style={{
                background: "#FFFFFF", borderRadius: 14, padding: "18px 20px",
                border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Explore All {JOBS.length} Careers</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Salary, lifestyle, roadmap for every govt job</div>
                </div>
                <div style={{ fontSize: 24 }}>💼</div>
              </div>
            </Link>
            <Link href="/interview" style={{ textDecoration: "none" }}>
              <div style={{
                background: "#FFFFFF", borderRadius: 14, padding: "18px 20px",
                border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Practice Mock Interview</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>AI interviewer scores every answer</div>
                </div>
                <div style={{ fontSize: 24 }}>🎯</div>
              </div>
            </Link>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ textAlign: "center", padding: "32px 0 8px" }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 15, fontWeight: 800, color: "#111827", marginBottom: 3 }}>
            Naukri<span style={{ color: "#2563EB" }}>Yatra</span>
          </div>
          <p style={{ fontSize: 11, color: "#6B7280" }}>Sapne se Selection Tak</p>
          <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 6 }}>© 2026 NaukriYatra · Made in India</p>
        </footer>
      </div>

      <BottomNav />
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
    </main>
  );
}
