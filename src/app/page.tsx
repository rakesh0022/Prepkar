"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
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
          <div className="desktop-only" style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, marginBottom: 28, opacity: 0.9 }}>
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

          <Link href="/quiz" style={{ textDecoration: "none" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(90deg, #D97706, #B45309)",
              color: "#fff", padding: "12px 22px",
              borderRadius: 12, fontSize: 14, fontWeight: 700,
              boxShadow: "0 4px 20px rgba(217,119,6,0.35)",
              marginRight: 10,
            }}>
              <span>📝</span> Quiz Practice
            </div>
          </Link>
          <Link href="/ai-practice" style={{ textDecoration: "none" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(90deg, #6D28D9, #4C1D95)",
              color: "#fff", padding: "12px 22px",
              borderRadius: 12, fontSize: 14, fontWeight: 700,
              boxShadow: "0 4px 20px rgba(109,40,217,0.35)",
            }}>
              <span>🎯</span> AI Practice
            </div>
          </Link>
          <p style={{ fontSize: 11, opacity: 0.4, marginTop: 10 }}>
            Free · No credit card needed
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

        {/* ═══ DREAM CARDS ═══ */}
        <section className="anim-up-2" style={{ padding: "20px 0 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>
              What if you become...
            </h2>
          </div>
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

        {/* ═══ TARGET EXAMS ═══ */}
        <div className="anim-up-3" style={{ paddingTop: 20 }}>
          <TargetExams exams={COUNTDOWNS} />
        </div>

        {/* ═══ TRUST SIGNALS ═══ */}
        <section className="anim-up-3" style={{ paddingTop: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { n: "17+", l: "Govt Exams", sub: "Covered", c: "#2563EB", bg: "linear-gradient(135deg,#EFF6FF,#DBEAFE)", border: "rgba(37,99,235,0.12)" },
              { n: "6",   l: "Practice",  sub: "Stages per Exam", c: "#16A34A", bg: "linear-gradient(135deg,#F0FDF4,#DCFCE7)", border: "rgba(22,163,74,0.12)" },
              { n: "AI",  l: "Scores",    sub: "Every Answer", c: "#7C3AED", bg: "linear-gradient(135deg,#F5F3FF,#EDE9FE)", border: "rgba(124,58,237,0.12)" },
            ].map((f, i) => (
              <div key={i} style={{
                background: f.bg, borderRadius: 14, padding: "14px 10px",
                textAlign: "center", border: `1px solid ${f.border}`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: f.c, fontFamily: "'Outfit'", lineHeight: 1 }}>{f.n}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: f.c, marginTop: 3 }}>{f.l}</div>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 1, lineHeight: 1.3 }}>{f.sub}</div>
              </div>
            ))}
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

        {/* ═══ EXPLORE MORE TOOLS ═══ */}
        <section style={{ paddingTop: 32 }}>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700,
            color: "#111827", marginBottom: 4,
          }}>
            Explore More Tools
          </h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
            Everything you need for exam preparation
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              {
                href: "/quiz", icon: "📝", label: "Quiz Practice",
                sub: "500+ MCQs · 8 subjects",
                bg: "linear-gradient(135deg,#FFFBEB,#FEF3C7)", border: "rgba(217,119,6,0.15)",
                iconBg: "rgba(217,119,6,0.1)", color: "#92400E",
              },
              {
                href: "/ai-practice", icon: "🎯", label: "AI Practice",
                sub: "Essay · Interview · Mains",
                bg: "linear-gradient(135deg,#F5F3FF,#EDE9FE)", border: "rgba(109,40,217,0.15)",
                iconBg: "rgba(109,40,217,0.1)", color: "#5B21B6",
              },
              {
                href: "/salary-calculator", icon: "💰", label: "Salary Calculator",
                sub: "Calculate in-hand pay",
                bg: "linear-gradient(135deg,#ECFDF5,#D1FAE5)", border: "rgba(16,185,129,0.15)",
                iconBg: "rgba(16,185,129,0.12)", color: "#065F46",
              },
              {
                href: "/cutoffs", icon: "📊", label: "Cutoff Analysis",
                sub: "Year-wise trends",
                bg: "linear-gradient(135deg,#EFF6FF,#DBEAFE)", border: "rgba(37,99,235,0.15)",
                iconBg: "rgba(37,99,235,0.1)", color: "#1E40AF",
              },
              {
                href: "/exam-calendar", icon: "📅", label: "Exam Calendar",
                sub: "Important dates",
                bg: "linear-gradient(135deg,#FFF7ED,#FFEDD5)", border: "rgba(234,88,12,0.15)",
                iconBg: "rgba(234,88,12,0.1)", color: "#9A3412",
              },
              {
                href: "/life", icon: "👔", label: "Day in Life",
                sub: "Real career stories",
                bg: "linear-gradient(135deg,#FDF4FF,#FAE8FF)", border: "rgba(168,85,247,0.15)",
                iconBg: "rgba(168,85,247,0.1)", color: "#6B21A8",
              },
            ].map((t) => (
              <Link key={t.href} href={t.href} style={{ textDecoration: "none" }}>
                <div className="card-lift" style={{
                  background: t.bg, borderRadius: 16, padding: "18px 16px",
                  border: `1px solid ${t.border}`,
                  display: "flex", flexDirection: "column", gap: 10,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: t.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  }}>
                    {t.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 2 }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: t.color, fontWeight: 500 }}>{t.sub}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.color }}>Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <Footer />
      </div>

      <BottomNav />
    </main>
  );
}
