"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import StreakBar from "@/components/home/StreakBar";
import DailyChallenge from "@/components/home/DailyChallenge";
import TargetExams from "@/components/home/TargetExams";
import StoriesStrip from "@/components/home/StoriesStrip";
import LatestNews from "@/components/home/LatestNews";
import { HERO_STORIES, COUNTDOWNS, STORIES, getTodaysQuiz } from "@/components/data";
import { useStreak } from "@/hooks/useStreak";
import { useDailyQuizAnswer } from "@/hooks/useDailyQuiz";

export default function Home() {
  const [si, setSi] = useState(0);
  const { streak, isNew } = useStreak();
  const { answer, saveAnswer } = useDailyQuizAnswer();
  const quiz = getTodaysQuiz();

  useEffect(() => { const t = setInterval(() => setSi(i => (i + 1) % HERO_STORIES.length), 5000); return () => clearInterval(t); }, []);
  const s = HERO_STORIES[si];

  const storiesForStrip = STORIES.map(s => ({ ...s, bgColor: s.color, image: s.image }));

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>

      {/* Desktop top nav spacer */}
      <div className="desktop-only" style={{ height: 56 }} />

      {/* ═══ HERO — FULL WIDTH, DREAM-FOCUSED ═══ */}
      <section className="anim-up" style={{
        background: "var(--bg-hero)", color: "#fff",
        padding: "48px 24px 40px", textAlign: "center",
        borderRadius: "0 0 28px 28px", position: "relative", overflow: "hidden",
        backgroundImage: "url('/images/hero/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.5) 100%)" }} />
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
                overflow: "hidden",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.name}
                  width={38}
                  height={38}
                  style={{ width: 38, height: 38, objectFit: "cover", borderRadius: "50%" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).nextElementSibling && ((e.target as HTMLImageElement).nextElementSibling as HTMLElement).style.removeProperty("display"); }}
                />
                <span style={{ display: "none" }}>{s.emoji}</span>
              </div>
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

          <Link href="/ai-practice" style={{ textDecoration: "none" }}>
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

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 16px" }}>

        {/* ═══ STREAK BAR ═══ */}
        <div className="anim-up-1" style={{ paddingTop: 20 }}>
          <StreakBar streak={streak} isNew={isNew} quizDone={answer !== null} />
        </div>

        {/* ═══ DAILY CHALLENGE ═══ */}
        <div className="anim-up-2">
          <DailyChallenge quiz={quiz} answer={answer} onAnswer={saveAnswer} />
        </div>

        {/* ═══ PLATFORM HIGHLIGHTS ═══ */}
        <section className="anim-up-2" style={{ paddingBottom: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { n: "17+", l: "Govt Exams Covered", c: "#2563EB" },
              { n: "6", l: "Practice Stages per Exam", c: "#16A34A" },
              { n: "AI", l: "Scores Every Answer", c: "#7C3AED" },
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

          <div style={{ position: "relative" }}>
            {/* Fade edges to hint scrollability */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 8, width: 20, background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 2, pointerEvents: "none", borderRadius: "16px 0 0 16px" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 8, width: 20, background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 2, pointerEvents: "none", borderRadius: "0 16px 16px 0" }} />

            {/* Scroll container */}
            <div id="dreamScroll" className="no-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}>
              {[
                { title: "District Magistrate", sub: "UPSC → IAS", perk: "Bungalow + Vehicle + ₹2.5L/month", emoji: "🏛️", bg: "linear-gradient(135deg,#4c1d95,#6d28d9)", link: "/jobs?id=upsc-cse-2026" },
                { title: "Bank PO → Manager", sub: "SBI PO Exam", perk: "₹52K start + Housing + Medical", emoji: "🏦", bg: "linear-gradient(135deg,#064e3b,#0C7C59)", link: "/jobs?id=sbi-po-2026" },
                { title: "Income Tax Inspector", sub: "SSC CGL Exam", perk: "₹65K + Govt Quarter + Raids", emoji: "📋", bg: "linear-gradient(135deg,#1e3a5f,#2563eb)", link: "/jobs?id=ssc-cgl-2026" },
                { title: "Station Master", sub: "RRB NTPC Exam", perk: "FREE trains for life + Uniform", emoji: "🚂", bg: "linear-gradient(135deg,#7f1d1d,#dc2626)", link: "/jobs?id=rrb-ntpc-2026" },
                { title: "RBI Officer", sub: "RBI Grade B", perk: "₹1.05L/month + Metro posting", emoji: "💰", bg: "linear-gradient(135deg,#0F4C81,#1D7ED8)", link: "/jobs?id=rbi-grade-b-2026" },
                { title: "Army Officer", sub: "NDA Exam", perk: "₹65K + Adventure + Honor", emoji: "🎖️", bg: "linear-gradient(135deg,#134E4A,#0D9488)", link: "/jobs?id=nda-2026" },
              ].map((d, i) => (
                <Link key={i} href={d.link} style={{ textDecoration: "none", flexShrink: 0, scrollSnapAlign: "start" }}>
                  <div style={{
                    width: 170, borderRadius: 16, padding: "20px 16px", color: "#fff",
                    background: d.bg, boxShadow: "var(--shadow-md)",
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{d.emoji}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{d.title}</div>
                    <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 10 }}>{d.sub}</div>
                    <div style={{
                      fontSize: 10, fontWeight: 600, background: "rgba(255,255,255,0.15)",
                      padding: "4px 9px", borderRadius: 8, display: "inline-block",
                    }}>{d.perk}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRACTICE SECTION ═══ */}
        <section className="anim-up-4" style={{ paddingTop: 20 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
            Start Practicing
          </h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 14 }}>
            Choose your practice mode
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {/* Quiz Practice Card */}
            <Link href="/quiz" style={{ textDecoration: "none" }}>
              <div style={{
                background: "linear-gradient(135deg, #FEF3C7, #FED7AA)",
                borderRadius: 16, padding: "20px 16px", textAlign: "center",
                border: "1px solid rgba(217,119,6,0.1)",
                boxShadow: "var(--shadow-sm)",
                minHeight: 160,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📝</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Quiz Practice</div>
                  <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}>500+ MCQs across 8 subjects</div>
                </div>
                <div style={{
                  marginTop: 14, padding: "10px", background: "#D97706", color: "#fff",
                  borderRadius: 10, fontSize: 13, fontWeight: 700,
                }}>
                  Start Quiz →
                </div>
              </div>
            </Link>

            {/* AI Practice Card */}
            <Link href="/ai-practice" style={{ textDecoration: "none" }}>
              <div style={{
                background: "linear-gradient(135deg, #E0E7FF, #DDD6FE)",
                borderRadius: 16, padding: "20px 16px", textAlign: "center",
                border: "1px solid rgba(109,40,217,0.1)",
                boxShadow: "var(--shadow-sm)",
                minHeight: 160,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🎯</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>AI Practice</div>
                  <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}>Essay, interview & descriptive practice</div>
                </div>
                <div style={{
                  marginTop: 14, padding: "10px", background: "#6D28D9", color: "#fff",
                  borderRadius: 10, fontSize: 13, fontWeight: 700,
                }}>
                  Start AI Practice →
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ═══ SUCCESS STORIES ═══ */}
        <div className="anim-up-5">
          <StoriesStrip stories={storiesForStrip} />
        </div>

        {/* ═══ LATEST NEWS ═══ */}
        <div style={{ paddingTop: 20 }}>
          <LatestNews />
        </div>

        {/* ═══ FOOTER — PREMIUM ═══ */}
        <footer style={{ marginTop: 24, borderRadius: 20, padding: "28px 20px 20px", background: "linear-gradient(135deg, #0F2440, #1E3A5F)", color: "#fff" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
              Naukri<span style={{ color: "#5EEAD4" }}>Yatra</span>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0 }}>Sapne se Selection Tak</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Prepare</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="/quiz" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Practice Quizzes</a>
                <a href="/current-affairs" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Current Affairs</a>
                <a href="/prepare" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Study Plans</a>
                <a href="/ai-practice" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>AI Practice</a>
                <a href="/jobs" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Explore Careers</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Tools</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="/compare" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Career Comparisons</a>
                <a href="/cutoffs" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Cutoff Analysis</a>
                <a href="/exam-calendar" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Exam Calendar</a>
                <a href="/salary-calculator" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Salary Calculator</a>
                <a href="/life" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Day in Life Stories</a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Legal</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="/privacy" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Privacy Policy</a>
              <a href="/terms" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Terms of Service</a>
              <a href="/disclaimer" style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Disclaimer</a>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: 0 }}>© 2026 NaukriYatra</p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: 0 }}>Made with ❤️ in India 🇮🇳</p>
          </div>
        </footer>
      </div>

      <BottomNav />
    </main>
  );
}
