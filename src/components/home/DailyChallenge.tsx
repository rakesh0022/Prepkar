"use client";
import type { QuizQuestion } from "@/components/data";

interface Props {
  quiz: QuizQuestion;
  answer: number | null;
  onAnswer: (i: number) => void;
}

export default function DailyChallenge({ quiz, answer, onAnswer }: Props) {
  const done = answer !== null;

  return (
    <section style={{
      marginBottom: 20, borderRadius: 18, padding: "18px 16px",
      background: "linear-gradient(135deg, #ECFDF5, #F0FDFA)",
      backgroundImage: "url('/images/sections/daily-challenge.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay",
      border: "1px solid rgba(16,185,129,0.18)",
      boxShadow: "var(--shadow-sm)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", letterSpacing: 1.2, textTransform: "uppercase" }}>
            ⚡ Today&apos;s Challenge
          </div>
          <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>
            {quiz.topic} &bull; {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </div>
        </div>
        {done && (
          <div style={{
            fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 10,
            background: answer === quiz.correct ? "rgba(22,163,74,0.12)" : "rgba(220,38,38,0.1)",
            color: answer === quiz.correct ? "#16A34A" : "#DC2626",
          }}>
            {answer === quiz.correct ? "✓ Correct!" : "✗ Wrong"}
          </div>
        )}
      </div>

      <p style={{ fontSize: 14, color: "#111827", lineHeight: 1.65, marginBottom: 12, fontWeight: 500 }}>
        {quiz.question}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {quiz.options.map((opt, i) => {
          const isCorrect = i === quiz.correct;
          const picked = answer === i;
          return (
            <button key={i} onClick={() => !done && onAnswer(i)} style={{
              padding: "10px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
              cursor: done ? "default" : "pointer", textAlign: "left", transition: "all 0.2s",
              border: done && isCorrect ? "2px solid #16A34A"
                : done && picked ? "2px solid #DC2626"
                : "1px solid rgba(0,0,0,0.08)",
              background: done && isCorrect ? "rgba(22,163,74,0.08)"
                : done && picked ? "rgba(220,38,38,0.06)"
                : "#FFFFFF",
              color: done && isCorrect ? "#16A34A"
                : done && picked ? "#DC2626"
                : "#374151",
            }}>
              {done && isCorrect ? "✓ " : done && picked && !isCorrect ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>

      {done && (
        <div style={{
          marginTop: 12, background: "rgba(22,163,74,0.06)", borderRadius: 10,
          padding: "10px 12px", fontSize: 12, color: "#065F46", lineHeight: 1.6,
          border: "1px solid rgba(22,163,74,0.12)",
        }}>
          💡 {quiz.explanation}
        </div>
      )}

      {!done && (
        <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 8, textAlign: "center" }}>
          New question every day • Your answer is saved automatically
        </p>
      )}
      </div>
    </section>
  );
}
