"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import StreakBar from "@/components/home/StreakBar";
import DailyChallenge from "@/components/home/DailyChallenge";
import TargetExams from "@/components/home/TargetExams";
import StoriesStrip from "@/components/home/StoriesStrip";
import WhyNaukriYatra from "@/components/home/WhyNaukriYatra";
import LatestNotifications from "@/components/home/LatestNotifications";
import GoalSelector from "@/components/home/GoalSelector";
import { COUNTDOWNS, STORIES, getTodaysQuiz } from "@/components/data";
import { getNewNotificationsCount } from "@/data/notifications";
import { useStreak } from "@/hooks/useStreak";
import { useDailyQuizAnswer } from "@/hooks/useDailyQuiz";
import { useSavedArticles } from "@/hooks/useSavedArticles";

export default function Home() {
  const { streak, isNew } = useStreak();
  const { answer, saveAnswer } = useDailyQuizAnswer();
  const { savedArticles, savedCount } = useSavedArticles();
  const quiz = getTodaysQuiz();
  const newNotifCount = getNewNotificationsCount();

  const storiesForStrip = STORIES.map(s => ({ ...s, bgColor: s.color, image: s.image }));

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>

      {/* Desktop top nav spacer */}
      <div className="desktop-only" style={{ height: 56 }} />

      {/* ═══ HERO ═══ */}
      <section className="anim-up hero-section" style={{
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        borderRadius: "0 0 32px 32px",
      }}>
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/hero-bg.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 20%",
            zIndex: 0,
          }}
        />

        {/* Multi-layer gradient overlay — heavy at bottom, lighter at top */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(160deg, rgba(10,15,40,0.82) 0%, rgba(10,15,40,0.65) 45%, rgba(10,15,40,0.88) 100%)",
        }} />
        {/* Subtle colour tint — teal at top-left, purple at bottom-right */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "radial-gradient(ellipse at 10% 0%, rgba(20,184,166,0.18) 0%, transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(109,40,217,0.18) 0%, transparent 55%)",
        }} />

        {/* Content */}
        <div className="hero-inner" style={{ position: "relative", zIndex: 2 }}>

          {/* ── Left / centre column ── */}
          <div className="hero-text">
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(94,234,212,0.12)",
              border: "1px solid rgba(94,234,212,0.3)",
              borderRadius: 100, padding: "6px 14px",
              marginBottom: 20,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5EEAD4", display: "inline-block", boxShadow: "0 0 8px #5EEAD4" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#5EEAD4", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Government Job Preparation
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}>
              Sapne se<br />
              <span style={{
                color: "#5EEAD4",
                textShadow: "0 0 40px rgba(94,234,212,0.4)",
              }}>Selection Tak</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.6,
              marginBottom: 32,
              maxWidth: 420,
            }}>
              AI mock interviews, salary calculators, exam roadmaps &amp; daily practice — all free.
            </p>

            {/* CTAs — side by side */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/quiz" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #D97706, #B45309)",
                  color: "#fff", padding: "14px 24px",
                  borderRadius: 14, fontSize: 15, fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(217,119,6,0.4)",
                  whiteSpace: "nowrap",
                }}>
                  📝 Quiz Practice
                </div>
              </Link>
              <Link href="/ai-practice" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  color: "#fff", padding: "14px 24px",
                  borderRadius: 14, fontSize: 15, fontWeight: 700,
                  whiteSpace: "nowrap",
                }}>
                  🎯 AI Practice
                </div>
              </Link>
            </div>

            {/* Social proof pills */}
            <div style={{
              display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap",
            }}>
              {[
                { icon: "🔔", text: `${newNotifCount} live notifications` },
                { icon: "🆓", text: "Free · No signup" },
                { icon: "🗺️", text: "17+ roadmaps" },
              ].map((item) => (
                <div key={item.text} style={{
                  display: "flex", alignItems: "center", gap: 5,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 100, padding: "5px 12px",
                  fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600,
                }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: stat cards (desktop only) ── */}
          <div className="hero-stats desktop-only">
            {[
              { emoji: "🏛️", label: "UPSC CSE", sub: "Prelims · Jun 1", days: Math.max(0, Math.ceil((new Date("2026-06-01").getTime() - Date.now()) / 86400000)), color: "#7C3AED" },
              { emoji: "📋", label: "SSC CGL", sub: "Tier I · Jun 20", days: Math.max(0, Math.ceil((new Date("2026-06-20").getTime() - Date.now()) / 86400000)), color: "#2563EB" },
              { emoji: "🏦", label: "SBI PO", sub: "Prelims · Aug 1", days: Math.max(0, Math.ceil((new Date("2026-08-01").getTime() - Date.now()) / 86400000)), color: "#059669" },
            ].map((exam) => (
              <div key={exam.label} style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: `${exam.color}25`,
                  border: `1.5px solid ${exam.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>
                  {exam.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{exam.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 1 }}>{exam.sub}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: exam.color, fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>{exam.days}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>days</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 16px" }}>

        {/* ═══ STREAK BAR ═══ */}
        <div className="anim-up-1" style={{ paddingTop: 20 }}>
          <StreakBar streak={streak} isNew={isNew} quizDone={answer !== null} />
        </div>

        {/* ═══ GOAL SELECTOR ═══ */}
        <div className="anim-up-2">
          <GoalSelector />
        </div>

        {/* ═══ DAILY CHALLENGE ═══ */}
        <div className="anim-up-2">
          <DailyChallenge quiz={quiz} answer={answer} onAnswer={saveAnswer} />
        </div>

        {/* ═══ DREAM CARDS ═══ */}
        {savedCount > 0 && (
          <section className="anim-up-2" style={{ paddingTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
                  Recently Saved
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-light)", margin: "4px 0 0" }}>
                  Jump back into the guides and facts you bookmarked
                </p>
              </div>
              <Link href="/saved" style={{ textDecoration: "none", fontSize: 12, fontWeight: 800, color: "#0891B2" }}>
                View all →
              </Link>
            </div>

            <div className="no-scroll" style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 10 }}>
              {savedArticles.slice(0, 4).map((article, index) => (
                <Link key={article.id} href={article.href} style={{ textDecoration: "none", flexShrink: 0, width: 240 }}>
                  <div className={`card-premium anim-up-${Math.min(index + 2, 6)}`} style={{
                    background: "#FFFFFF",
                    borderRadius: 18,
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)",
                    padding: "16px 16px 14px",
                    height: "100%",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{
                        width: 42,
                        height: 42,
                        borderRadius: 14,
                        background: `${article.accent}14`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                      }}>
                        {article.icon}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 8px",
                          borderRadius: 999,
                          background: `${article.accent}12`,
                          color: article.accent,
                          fontSize: 10,
                          fontWeight: 800,
                          marginBottom: 6,
                        }}>
                          {article.type === "blog" ? "Blog" : article.type === "life" ? "Life Story" : "Current Affairs"}
                        </div>
                        <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 700 }}>{article.readTime}</div>
                      </div>
                    </div>

                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-dark)", lineHeight: 1.4, marginBottom: 8 }}>
                      {article.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-light)", lineHeight: 1.55, marginBottom: 12 }}>
                      {article.description}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: article.accent }}>Open again →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="anim-up-2" style={{ padding: "20px 0 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>
              What if you become...
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--text-light)", marginBottom: 14 }}>
            Tap to explore the life, salary, and roadmap
          </p>

          <div style={{ position: "relative" }}>
            {/* Fade edges to hint scrollability */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 8, width: 20, background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 8, width: 20, background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />

            {/* Scroll container */}
            <div id="dreamScroll" className="no-scroll" style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12, scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}>
              {[
                { title: "District Magistrate", sub: "UPSC → IAS", perk: "Bungalow + Vehicle + ₹2.5L/month", emoji: "🏛️", bg: "linear-gradient(135deg,#4C1D95,#6D28D9)", link: "/jobs/upsc-cse-2026" },
                { title: "Bank PO → Manager", sub: "SBI PO Exam", perk: "₹52K start + Housing + Medical", emoji: "🏦", bg: "linear-gradient(135deg,#064E3B,#059669)", link: "/jobs/sbi-po-2026" },
                { title: "Income Tax Inspector", sub: "SSC CGL Exam", perk: "₹65K + Govt Quarter + Raids", emoji: "📋", bg: "linear-gradient(135deg,#1E3A8A,#2563EB)", link: "/jobs/ssc-cgl-2026" },
                { title: "Station Master", sub: "RRB NTPC Exam", perk: "FREE trains for life + Uniform", emoji: "🚂", bg: "linear-gradient(135deg,#7F1D1D,#DC2626)", link: "/jobs/rrb-ntpc-2026" },
                { title: "RBI Officer", sub: "RBI Grade B", perk: "₹1.05L/month + Metro posting", emoji: "💰", bg: "linear-gradient(135deg,#0F4C81,#1D7ED8)", link: "/jobs/rbi-grade-b-2026" },
                { title: "Army Officer", sub: "NDA Exam", perk: "₹65K + Adventure + Honor", emoji: "🎖️", bg: "linear-gradient(135deg,#134E4A,#0D9488)", link: "/jobs/nda-2026" },
              ].map((d, i) => (
                <Link key={i} href={d.link} style={{ textDecoration: "none", flexShrink: 0, scrollSnapAlign: "start" }}>
                  <div className="card-premium" style={{
                    width: 180, borderRadius: 16, padding: "20px 16px", color: "#fff",
                    background: d.bg, boxShadow: "var(--shadow-md)",
                    display: "flex", flexDirection: "column", height: "100%",
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 12, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}>{d.emoji}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4, lineHeight: 1.2 }}>{d.title}</div>
                    <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 16, fontWeight: 500 }}>{d.sub}</div>
                    <div style={{ marginTop: "auto" }}>
                      <div style={{
                        fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)",
                        padding: "6px 10px", borderRadius: 8, display: "inline-block", lineHeight: 1.4
                      }}>{d.perk}</div>
                    </div>
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

        {/* ═══ SUCCESS STORIES ═══ */}
        <div className="anim-up-4" style={{ paddingTop: 20 }}>
          <StoriesStrip stories={storiesForStrip} />
        </div>

        {/* ═══ LATEST NOTIFICATIONS ═══ */}
        <div style={{ paddingTop: 20 }}>
          <LatestNotifications />
        </div>

        {/* ═══ WHY NAUKRIYATRA ═══ */}
        <div style={{ paddingTop: 20 }}>
          <WhyNaukriYatra />
        </div>

        {/* ═══ FOOTER ═══ */}
        <Footer />
      </div>

      <BottomNav />
    </main>
  );
}
