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

      {/* ═══ HERO — FULL WIDTH, DREAM-FOCUSED ═══ */}
      <section className="anim-up hero-section" style={{
        background: "var(--bg-hero)", color: "#fff",
        padding: "64px 24px 56px", textAlign: "center",
        borderRadius: "0 0 28px 28px", position: "relative", overflow: "hidden",
        backgroundImage: "url('/images/hero/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        minHeight: "420px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.5) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div className="desktop-only" style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, marginBottom: 32, opacity: 0.9 }}>
            Naukri<span style={{ color: "#5EEAD4" }}>Yatra</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800,
            lineHeight: 1.2, marginBottom: 10, letterSpacing: -0.5,
          }}>
            Sapne se<br />
            <span style={{ color: "#5EEAD4" }}>Selection Tak</span>
          </h1>
          <p style={{ fontSize: 15, opacity: 0.7, marginBottom: 36, lineHeight: 1.5 }}>
            Your journey to a government job starts here
          </p>

          <div className="flex flex-wrap justify-center gap-2.5">
            <Link href="/quiz" style={{ textDecoration: "none" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "linear-gradient(90deg, #D97706, #B45309)",
                color: "#fff", padding: "12px 22px",
                borderRadius: 12, fontSize: 14, fontWeight: 700,
                boxShadow: "0 4px 20px rgba(217,119,6,0.35)",
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
          </div>

          {/* ── Honest social proof strip ── */}
          <div style={{
            display: "flex", justifyContent: "center", gap: 16,
            marginTop: 20, flexWrap: "wrap",
          }}>
            {[
              { icon: "🔔", text: `${newNotifCount} new notifications` },
              { icon: "📝", text: "Free · No signup needed" },
              { icon: "🎯", text: "17+ job roadmaps" },
            ].map((item) => (
              <div key={item.text} style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 600,
              }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
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
