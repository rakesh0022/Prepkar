"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { JOBS, INTERVIEW_CATS, HERO_STORIES, COUNTDOWNS, DAILY_CHALLENGE } from "@/components/data";

export default function Home() {
  const [quizPick, setQuizPick] = useState<number | null>(null);
  const [storyIdx, setStoryIdx] = useState(0);
  const streak = 1;

  // Rotate hero story every 6 seconds
  useEffect(() => {
    const t = setInterval(() => setStoryIdx(i => (i + 1) % HERO_STORIES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const story = HERO_STORIES[storyIdx];

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      {/* ── Minimal Header ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, padding: "11px 16px",
        background: "rgba(12,13,20,0.92)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 17, fontWeight: 800, letterSpacing: -0.5 }}>
          Naukri<span style={{ color: "var(--accent)" }}>Yatra</span>
        </span>
        <div style={{
          background: "rgba(251,191,36,0.1)", borderRadius: 14, padding: "3px 11px",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 12 }}>🔥</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fbbf24" }}>{streak} Day Streak</span>
        </div>
      </header>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>

        {/* ═══════════════════════════════════════════════════
            1. HERO — EMOTIONAL HOOK
        ═══════════════════════════════════════════════════ */}
        <section className="anim-up" style={{ padding: "32px 0 4px", textAlign: "center" }}>
          {/* Tagline */}
          <p style={{
            fontFamily: "'Outfit'", fontSize: 13, fontWeight: 600, color: "var(--accent)",
            letterSpacing: 1, marginBottom: 14, opacity: 0.9,
          }}>
            Sapne se Selection Tak
          </p>

          {/* Rotating Story */}
          <div key={storyIdx} className="anim-fade" style={{
            background: "var(--bg-card)", borderRadius: 16, padding: "22px 20px",
            border: "1px solid var(--border)", position: "relative", minHeight: 110,
          }}>
            <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{story.emoji}</span>
            <p style={{
              fontSize: 16, fontWeight: 600, color: "var(--text-primary)",
              lineHeight: 1.55, marginBottom: 12, fontStyle: "italic",
            }}>
              &ldquo;{story.quote}&rdquo;
            </p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              — {story.name}, <span style={{ color: "var(--accent)", fontWeight: 600 }}>{story.role}</span>
            </p>
            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
              {HERO_STORIES.map((_, i) => (
                <button key={i} onClick={() => setStoryIdx(i)} style={{
                  width: i === storyIdx ? 18 : 6, height: 6, borderRadius: 4,
                  background: i === storyIdx ? "var(--accent)" : "rgba(255,255,255,0.1)",
                  border: "none", cursor: "pointer", transition: "all 0.3s",
                }} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            2. PRIMARY CTA
        ═══════════════════════════════════════════════════ */}
        <section className="anim-up-1" style={{ padding: "20px 0 0" }}>
          <Link href="/interview" style={{ textDecoration: "none" }}>
            <div style={{
              background: "linear-gradient(135deg, #059669, #0d9488)",
              borderRadius: 14, padding: "18px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer", transition: "transform 0.2s",
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
                  Start Interview Practice
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                  Free AI mock interview — get scored instantly
                </div>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(255,255,255,0.2)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>🎯</div>
            </div>
          </Link>

          <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", marginTop: 8 }}>
            30–40% candidates fail at the interview stage. Don&apos;t be one of them.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════
            3. USER PROGRESS
        ═══════════════════════════════════════════════════ */}
        <section className="anim-up-2" style={{ padding: "24px 0 0" }}>
          <div style={{
            background: "var(--bg-card)", borderRadius: 14, padding: "16px 18px",
            border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Your Progress</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 3 }}>
                Keep going — every day of practice counts
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Outfit'", color: "#fbbf24" }}>{streak}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Day Streak</div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            4. TODAY'S CHALLENGE
        ═══════════════════════════════════════════════════ */}
        <section className="anim-up-3" style={{ padding: "24px 0 0" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: 0.5, marginBottom: 10, paddingLeft: 2 }}>
            Today&apos;s Challenge
          </h2>
          <div style={{
            background: "var(--bg-card)", borderRadius: 14, padding: "18px 16px",
            border: "1px solid var(--border)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 10px", borderRadius: 8 }}>🎯 Interview Question</span>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>April 10, 2026</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.6, marginBottom: 14, fontWeight: 500 }}>
              {DAILY_CHALLENGE.question}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {DAILY_CHALLENGE.options.map((opt, i) => {
                const correct = i === DAILY_CHALLENGE.correct;
                const picked = quizPick === i;
                const done = quizPick !== null;
                return (
                  <button key={i} onClick={() => !done && setQuizPick(i)} style={{
                    padding: "11px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                    textAlign: "left", cursor: done ? "default" : "pointer", transition: "all 0.2s",
                    border: done && correct ? "2px solid #22c55e" : done && picked ? "2px solid #ef4444" : "1px solid var(--border)",
                    background: done && correct ? "rgba(34,197,94,0.1)" : done && picked ? "rgba(239,68,68,0.08)" : "var(--bg-card)",
                    color: done && correct ? "#4ade80" : done && picked ? "#f87171" : "var(--text-primary)",
                  }}>
                    {done && correct ? "✓ " : done && picked ? "✗ " : ""}{opt}
                  </button>
                );
              })}
            </div>
            {quizPick !== null && (
              <div style={{
                marginTop: 12, borderRadius: 10, padding: "12px 14px",
                background: "rgba(34,197,94,0.06)", borderLeft: "3px solid #22c55e",
                fontSize: 12, color: "#86efac", lineHeight: 1.6,
              }}>
                {quizPick === DAILY_CHALLENGE.correct ? "Correct! " : "Not quite — "}{DAILY_CHALLENGE.explanation}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            5. EXAM TARGETS
        ═══════════════════════════════════════════════════ */}
        <section className="anim-up-4" style={{ padding: "24px 0 0" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: 0.5, marginBottom: 10, paddingLeft: 2 }}>
            Upcoming Exams
          </h2>
          <div className="no-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {COUNTDOWNS.map((c, i) => (
              <div key={i} style={{
                minWidth: 130, background: "var(--bg-card)", borderRadius: 14,
                padding: "16px 14px", border: "1px solid var(--border)", flexShrink: 0,
              }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: c.color, fontFamily: "'Outfit'" }}>{c.days}</div>
                <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>days left</div>
                <div style={{ fontSize: 12, color: "var(--text-primary)", fontWeight: 600, marginTop: 8 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{c.date}, 2026</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            6. EXPLORE JOBS
        ═══════════════════════════════════════════════════ */}
        <section className="anim-up-5" style={{ padding: "24px 0 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingLeft: 2 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: 0.5 }}>
              Explore Careers
            </h2>
            <Link href="/jobs" style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>See All →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {JOBS.slice(0, 3).map(job => (
              <Link key={job.id} href={`/jobs?id=${job.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{
                  background: "var(--bg-card)", borderRadius: 14, padding: "16px",
                  border: "1px solid var(--border)", transition: "border-color 0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 5, marginBottom: 5 }}>
                        {job.isNew && <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>NEW</span>}
                        {job.isHot && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>🔥 TRENDING</span>}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 2 }}>{job.title}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{job.org}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                      <div style={{ fontSize: 17, fontWeight: 800, color: "var(--accent)", fontFamily: "'Outfit'" }}>{job.vacancies.toLocaleString()}</div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>posts</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>💰 {job.inHand} in-hand</span>
                    <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>📅 {job.lastDate}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 8, fontWeight: 600 }}>
                    See lifestyle, salary, roadmap & career path →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            7. INTERVIEW PRACTICE GRID
        ═══════════════════════════════════════════════════ */}
        <section style={{ padding: "24px 0 0" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: 0.5, marginBottom: 10, paddingLeft: 2 }}>
            Practice by Category
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {INTERVIEW_CATS.map(c => (
              <Link key={c.id} href={`/interview?cat=${c.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "var(--bg-card)", borderRadius: 14, padding: "16px 14px",
                  border: "1px solid var(--border)", textAlign: "center", transition: "border-color 0.2s",
                }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{c.title}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{c.sub}</div>
                  <div style={{
                    marginTop: 10, fontSize: 10, fontWeight: 700, color: c.color,
                    background: `${c.color}12`, padding: "5px 10px", borderRadius: 6,
                    display: "inline-block",
                  }}>Practice Free →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            8. MENTORSHIP TEASER
        ═══════════════════════════════════════════════════ */}
        <section style={{ padding: "24px 0 0" }}>
          <div style={{
            borderRadius: 14, padding: "22px 18px", textAlign: "center",
            background: "linear-gradient(135deg, rgba(251,191,36,0.06), rgba(245,158,11,0.03))",
            border: "1px solid rgba(251,191,36,0.1)",
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🤝</div>
            <h3 style={{ fontFamily: "'Outfit'", fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
              Talk to Someone Who Made It
            </h3>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 14 }}>
              Connect with selected officers — real Bank POs, IAS officers, SSC toppers.
              Learn from someone who sat in your exact interview.
            </p>
            <div style={{
              display: "inline-block", background: "rgba(251,191,36,0.12)",
              color: "#fbbf24", padding: "10px 20px", borderRadius: 10,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>Coming Soon — Join Waitlist</div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ textAlign: "center", padding: "32px 0 16px" }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 15, fontWeight: 800, marginBottom: 3 }}>
            Naukri<span style={{ color: "var(--accent)" }}>Yatra</span>
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Your journey from dream to selection</p>
          <p style={{ fontSize: 10, color: "#333", marginTop: 6 }}>© 2026 NaukriYatra · Made in India</p>
        </footer>
      </div>

      <BottomNav />
    </main>
  );
}
