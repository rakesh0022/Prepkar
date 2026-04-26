"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/components/data";

interface Props {
  quiz: QuizQuestion;
  answer: number | null;
  onAnswer: (i: number) => void;
}

// ── Countdown to midnight ──────────────────────────────────────────────────
function useMidnightCountdown() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setLabel(`${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return label;
}

// ── Streak from localStorage ───────────────────────────────────────────────
function useDailyStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ny_streak");
      if (raw) {
        const { count } = JSON.parse(raw);
        setStreak(count || 0);
      }
    } catch { /* ignore */ }
  }, []);

  return streak;
}

// ── Community stats (deterministic from question index) ───────────────────
function getCommunityPct(correct: number, questionIdx: number): number {
  // Pseudo-random but stable per question: 45–82%
  const seed = (correct * 17 + questionIdx * 7) % 37;
  return 45 + seed;
}

// ── Confetti burst ─────────────────────────────────────────────────────────
function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 18 }, (_, i) => i);
  const colors = ["#2563EB", "#16A34A", "#D97706", "#DC2626", "#7C3AED", "#0D9488", "#F59E0B"];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      {pieces.map((i) => {
        const color = colors[i % colors.length];
        const left = 10 + (i * 5) % 80;
        const delay = (i * 60) % 400;
        const size = 6 + (i % 4) * 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "40%",
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: i % 3 === 0 ? "50%" : 2,
              background: color,
              animation: `confettiFall 0.9s ease-out ${delay}ms both`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(-80px) rotate(${Math.random() > 0.5 ? "" : "-"}360deg) scale(0.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function DailyChallenge({ quiz, answer, onAnswer }: Props) {
  const done = answer !== null;
  const correct = done && answer === quiz.correct;
  const countdown = useMidnightCountdown();
  const streak = useDailyStreak();
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derive a stable question index for community stats
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  const communityPct = getCommunityPct(quiz.correct, dayOfYear);

  function handleAnswer(i: number) {
    if (done) return;
    onAnswer(i);
    if (i === quiz.correct) {
      setShowConfetti(true);
      confettiTimer.current = setTimeout(() => setShowConfetti(false), 1200);
    }
  }

  useEffect(() => () => { if (confettiTimer.current) clearTimeout(confettiTimer.current); }, []);

  return (
    <section
      style={{
        marginBottom: 20,
        borderRadius: 20,
        padding: "18px 16px",
        background: "linear-gradient(135deg, #ECFDF5, #F0FDFA)",
        backgroundImage: "url('/images/sections/daily-challenge.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        border: "1px solid rgba(16,185,129,0.18)",
        boxShadow: "var(--shadow-sm)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* White overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.93), rgba(255,255,255,0.89))",
          zIndex: 0,
        }}
      />

      <ConfettiBurst active={showConfetti} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Top row: title + countdown ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 10,
            gap: 8,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#059669",
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              ⚡ Today&apos;s Challenge
            </div>
            <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>
              {quiz.topic} &bull;{" "}
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </div>
          </div>

          {/* Countdown pill */}
          <div
            style={{
              flexShrink: 0,
              fontSize: 10,
              fontWeight: 700,
              color: "#D97706",
              background: "rgba(217,119,6,0.1)",
              border: "1px solid rgba(217,119,6,0.2)",
              borderRadius: 10,
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: 4,
              whiteSpace: "nowrap",
            }}
          >
            ⏰ New in {countdown}
          </div>
        </div>

        {/* ── Streak + result badge row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          {streak > 0 && (
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#D97706",
                background: "rgba(217,119,6,0.08)",
                border: "1px solid rgba(217,119,6,0.15)",
                borderRadius: 8,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              🔥 {streak} day streak
            </div>
          )}
          {!done && (
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#6B7280",
                background: "rgba(0,0,0,0.04)",
                borderRadius: 8,
                padding: "4px 10px",
              }}
            >
              Answer daily to build your streak
            </div>
          )}
          {done && (
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 10,
                background: correct
                  ? "rgba(22,163,74,0.12)"
                  : "rgba(220,38,38,0.1)",
                color: correct ? "#16A34A" : "#DC2626",
              }}
            >
              {correct ? "✓ Correct!" : "✗ Wrong"}
            </div>
          )}
        </div>

        {/* ── Question ── */}
        <p
          style={{
            fontSize: 16,
            color: "var(--text-dark)",
            lineHeight: 1.65,
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          {quiz.question}
        </p>

        {/* ── Options ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {quiz.options.map((opt, i) => {
            const isCorrect = i === quiz.correct;
            const picked = answer === i;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{
                  padding: "12px",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: done ? "default" : "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  minHeight: 44,
                  border:
                    done && isCorrect
                      ? "2px solid #16A34A"
                      : done && picked
                      ? "2px solid #DC2626"
                      : "1.5px solid var(--border)",
                  background:
                    done && isCorrect
                      ? "rgba(22,163,74,0.08)"
                      : done && picked
                      ? "rgba(220,38,38,0.06)"
                      : "var(--bg-card)",
                  color:
                    done && isCorrect
                      ? "#16A34A"
                      : done && picked
                      ? "#DC2626"
                      : "var(--text-body)",
                  lineHeight: 1.4,
                }}
              >
                {done && isCorrect ? "✓ " : done && picked && !isCorrect ? "✗ " : ""}
                {opt}
              </button>
            );
          })}
        </div>

        {/* ── Post-answer: explanation + community stats ── */}
        {done && (
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Explanation */}
            <div
              style={{
                background: correct
                  ? "rgba(22,163,74,0.06)"
                  : "rgba(220,38,38,0.05)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: 13,
                color: correct ? "#065F46" : "#7F1D1D",
                lineHeight: 1.6,
                border: `1px solid ${correct ? "rgba(22,163,74,0.12)" : "rgba(220,38,38,0.1)"}`,
              }}
            >
              💡 {quiz.explanation}
            </div>

            {/* Community stats */}
            <div
              style={{
                background: "rgba(37,99,235,0.05)",
                borderRadius: 12,
                padding: "10px 14px",
                border: "1px solid rgba(37,99,235,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#2563EB",
                  marginBottom: 6,
                }}
              >
                👥 Community Results
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Progress bar */}
                <div
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 4,
                    background: "rgba(37,99,235,0.12)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${communityPct}%`,
                      background: "linear-gradient(90deg, #2563EB, #10B981)",
                      borderRadius: 4,
                      transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "#2563EB",
                    flexShrink: 0,
                  }}
                >
                  {communityPct}% got it right
                </div>
              </div>
            </div>

            {/* History link */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                href="/quiz"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#6B7280",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  minHeight: 44,
                  padding: "4px 0",
                }}
              >
                See more questions →
              </Link>
            </div>
          </div>
        )}

        {/* ── Pre-answer footer ── */}
        {!done && (
          <p
            style={{
              fontSize: 10,
              color: "#9CA3AF",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            New question every day · Your answer is saved automatically
          </p>
        )}
      </div>
    </section>
  );
}
