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
    <section className="fade-up-d2" style={{
      marginBottom: 20, borderRadius: 18, padding: "18px 16px",
      background: "linear-gradient(135deg,rgba(5,150,105,0.1),rgba(6,182,212,0.06))",
      border: "1px solid rgba(52,211,153,0.15)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#34d399", letterSpacing: 1.2, textTransform: "uppercase" }}>
            ⚡ Today's Challenge
          </div>
          <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>
            {quiz.topic} &bull; {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </div>
        </div>
        {done && (
          <div style={{
            fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 10,
            background: answer === quiz.correct ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.12)",
            color: answer === quiz.correct ? "#4ade80" : "#f87171",
          }}>
            {answer === quiz.correct ? "✓ Correct!" : "✗ Wrong"}
          </div>
        )}
      </div>

      <p style={{ fontSize: 14, color: "#e5e7eb", lineHeight: 1.65, marginBottom: 12, fontWeight: 500 }}>
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
              border: done && isCorrect ? "2px solid #22c55e"
                : done && picked ? "2px solid #ef4444"
                : "1px solid rgba(255,255,255,0.08)",
              background: done && isCorrect ? "rgba(34,197,94,0.14)"
                : done && picked ? "rgba(239,68,68,0.1)"
                : "rgba(255,255,255,0.04)",
              color: done && isCorrect ? "#4ade80"
                : done && picked ? "#f87171"
                : "#d1d5db",
            }}>
              {done && isCorrect ? "✓ " : done && picked && !isCorrect ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>

      {done && (
        <div style={{
          marginTop: 12, background: "rgba(34,197,94,0.08)", borderRadius: 10,
          padding: "10px 12px", fontSize: 12, color: "#86efac", lineHeight: 1.6,
        }}>
          💡 {quiz.explanation}
        </div>
      )}

      {!done && (
        <p style={{ fontSize: 10, color: "#374151", marginTop: 8, textAlign: "center" }}>
          New question every day • Your answer is saved automatically
        </p>
      )}
    </section>
  );
}
