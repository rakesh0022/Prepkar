"use client";

import { useState, useRef, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────
interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  accentBg: string;
  roles: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "bank_po",
    title: "Bank PO / Clerk",
    subtitle: "SBI, IBPS, RBI",
    icon: "🏦",
    accent: "#22c55e",
    accentBg: "rgba(34,197,94,0.1)",
    roles: ["SBI PO", "IBPS Clerk", "RBI Grade B"],
  },
  {
    id: "fresher_it",
    title: "Fresher / IT Job",
    subtitle: "TCS, Infosys, Wipro HR Round",
    icon: "💼",
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.1)",
    roles: ["TCS HR Round", "Infosys Interview", "Generic Fresher"],
  },
  {
    id: "mba",
    title: "MBA Admission",
    subtitle: "CAT, XAT, IIM PI",
    icon: "🎓",
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.1)",
    roles: ["IIM Interview", "XLRI Interview", "General MBA PI"],
  },
  {
    id: "govt_job",
    title: "Government Job",
    subtitle: "SSC, UPSC, State PSC",
    icon: "🏛️",
    accent: "#ef4444",
    accentBg: "rgba(239,68,68,0.1)",
    roles: ["UPSC Personality Test", "SSC Interview", "State PSC Interview"],
  },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Scorecard {
  [key: string]: string | number;
}

// ─── SCORE CIRCLE COMPONENT ────────────────────────────────
function ScoreCircle({
  score,
  label,
  color,
}: {
  score: number;
  label: string;
  color: string;
}) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 10) * circ;

  return (
    <div className="flex flex-col items-center mx-2">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="5"
        />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text
          x="36"
          y="40"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill="white"
        >
          {score}
        </text>
      </svg>
      <span className="text-[10px] text-gray-400 mt-1 text-center leading-tight max-w-[72px]">
        {label.replace(/_/g, " ")}
      </span>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState<"home" | "setup" | "interview" | "scorecard">("home");
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [error, setError] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (screen === "interview" && !loading) inputRef.current?.focus();
  }, [screen, loading, messages]);

  // ─── API CALL ──────────────────────────────────────────
  async function callAPI(conversationMessages: Message[]) {
    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: conversationMessages,
        category: category?.id,
        role: selectedRole,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "API request failed");
    }

    return res.json();
  }

  // ─── START INTERVIEW ───────────────────────────────────
  async function startInterview() {
    setScreen("interview");
    setMessages([]);
    setQuestionCount(0);
    setScorecard(null);
    setError("");
    setLoading(true);

    try {
      const initMessage: Message = {
        role: "user",
        content: `I am a candidate appearing for a ${selectedRole} interview. Please start the interview by greeting me and asking your first question.`,
      };

      const data = await callAPI([initMessage]);
      setMessages([{ role: "assistant", content: data.reply }]);
      setQuestionCount(1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to start interview");
    } finally {
      setLoading(false);
    }
  }

  // ─── SEND ANSWER ───────────────────────────────────────
  async function sendAnswer() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setError("");

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const fullConvo: Message[] = [
        {
          role: "user",
          content: `I am a candidate appearing for a ${selectedRole} interview. Please start the interview by greeting me and asking your first question.`,
        },
        ...newMessages,
      ];

      const data = await callAPI(fullConvo);

      if (data.scorecard) {
        if (data.reply) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        }
        setTimeout(() => {
          setScorecard(data.scorecard);
          setScreen("scorecard");
        }, 1200);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        setQuestionCount((prev) => prev + 1);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to get response");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAnswer();
    }
  }

  // ─── HOME SCREEN ───────────────────────────────────────
  if (screen === "home") {
    return (
      <main className="min-h-dvh bg-[#0f1117] px-5 py-12 max-w-lg mx-auto">
        <div className="animate-fade-up text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-4">
            AI Mock Interview
          </div>
          <h1 className="font-[Outfit] text-4xl font-extrabold tracking-tight mb-2">
            Prep<span className="text-emerald-400">Kar</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Practice with AI. Get instant feedback.
            <br />
            Land your dream job.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-3 pl-1">
            Choose your interview
          </p>
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat);
                setSelectedRole(cat.roles[0]);
                setScreen("setup");
              }}
              className={`animate-fade-up ${
                i === 1 ? "delay-100" : i === 2 ? "delay-200" : i === 3 ? "delay-300" : ""
              } w-full flex items-center gap-4 p-4 mb-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all active:scale-[0.98] text-left`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: cat.accentBg }}
              >
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[15px] text-white">
                  {cat.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{cat.subtitle}</div>
              </div>
              <span className="text-gray-600 text-lg">→</span>
            </button>
          ))}
        </div>

        <div className="text-center text-[11px] text-gray-600 pt-4 border-t border-white/5">
          5 questions per session • Instant AI feedback • 100% Free
        </div>
      </main>
    );
  }

  // ─── SETUP SCREEN ──────────────────────────────────────
  if (screen === "setup" && category) {
    return (
      <main className="min-h-dvh bg-[#0f1117] px-5 py-12 max-w-lg mx-auto animate-fade-up">
        <button
          onClick={() => setScreen("home")}
          className="text-gray-500 text-sm mb-8 hover:text-white transition-colors"
        >
          ← Back
        </button>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
          style={{ backgroundColor: category.accentBg }}
        >
          {category.icon}
        </div>

        <h2 className="font-[Outfit] text-2xl font-bold mb-1">{category.title}</h2>
        <p className="text-gray-500 text-sm mb-8">
          Select your role and start practicing
        </p>

        <p className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-3">
          Interview Role
        </p>

        {category.roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className="w-full text-left p-4 mb-2 rounded-xl border transition-all"
            style={{
              backgroundColor:
                selectedRole === role ? category.accentBg : "transparent",
              borderColor:
                selectedRole === role
                  ? category.accent
                  : "rgba(255,255,255,0.06)",
              color: selectedRole === role ? "white" : "rgba(255,255,255,0.5)",
            }}
          >
            <span className="font-semibold text-sm">
              {selectedRole === role ? "● " : "○ "}
              {role}
            </span>
          </button>
        ))}

        <button
          onClick={startInterview}
          className="w-full mt-6 py-4 rounded-xl font-bold text-[15px] transition-all active:scale-[0.98]"
          style={{ backgroundColor: category.accent, color: "#000" }}
        >
          Start Mock Interview →
        </button>

        <p className="text-center text-[11px] text-gray-600 mt-4">
          5 questions • ~10 minutes • AI evaluates each answer
        </p>
      </main>
    );
  }

  // ─── SCORECARD SCREEN ──────────────────────────────────
  if (screen === "scorecard" && scorecard && category) {
    const scoreKeys = Object.keys(scorecard).filter(
      (k) => typeof scorecard[k] === "number"
    );

    return (
      <main className="min-h-dvh bg-[#0f1117] px-5 py-12 max-w-lg mx-auto animate-fade-up">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 text-center">
          <div className="text-5xl mb-3">🎯</div>
          <h2 className="font-[Outfit] text-2xl font-bold mb-1">
            Your Scorecard
          </h2>
          <p className="text-gray-500 text-xs mb-6">
            {category.title} — {selectedRole}
          </p>

          <div className="flex justify-center flex-wrap gap-1 mb-6">
            {scoreKeys.map((k) => (
              <ScoreCircle
                key={k}
                score={scorecard[k] as number}
                label={k}
                color={category.accent}
              />
            ))}
          </div>

          {scorecard.summary && (
            <div
              className="rounded-xl p-4 text-left mb-3 border-l-4"
              style={{
                backgroundColor: category.accentBg,
                borderLeftColor: category.accent,
              }}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: category.accent }}>
                Summary
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {scorecard.summary}
              </p>
            </div>
          )}

          {scorecard.tip && (
            <div className="rounded-xl p-4 text-left mb-6 bg-amber-500/10 border-l-4 border-amber-500">
              <p className="text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-1">
                💡 Top Tip
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {scorecard.tip}
              </p>
            </div>
          )}

          <button
            onClick={() => setScreen("home")}
            className="w-full py-4 rounded-xl font-bold text-[15px] transition-all active:scale-[0.98]"
            style={{ backgroundColor: category.accent, color: "#000" }}
          >
            Try Another Interview
          </button>
        </div>
      </main>
    );
  }

  // ─── INTERVIEW SCREEN ──────────────────────────────────
  if (!category) return null;

  return (
    <main className="h-dvh flex flex-col bg-[#0f1117]">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-white/5 flex items-center justify-between bg-[#0f1117]">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
            style={{ backgroundColor: category.accentBg }}
          >
            {category.icon}
          </div>
          <div>
            <p className="text-sm font-semibold">{selectedRole}</p>
            <p className="text-[11px] text-gray-500">
              Question {Math.min(questionCount, 5)} of 5
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="w-6 h-1 rounded-full transition-colors"
              style={{
                backgroundColor:
                  n <= questionCount ? category.accent : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto px-4 py-5 hide-scrollbar space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
          >
            <div
              className="max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              style={{
                borderRadius:
                  msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                backgroundColor:
                  msg.role === "user" ? category.accent : "rgba(255,255,255,0.05)",
                color: msg.role === "user" ? "#000" : "#d1d5db",
              }}
            >
              {msg.role === "assistant" && (
                <p
                  className="text-[9px] font-bold tracking-widest uppercase mb-1.5"
                  style={{ color: category.accent }}
                >
                  Interviewer
                </p>
              )}
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-fade-up">
            <div className="px-5 py-3 rounded-2xl bg-white/5 flex gap-1.5">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: category.accent,
                    animation: `pulse-dot 1.2s ease-in-out ${n * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-red-400 text-xs bg-red-400/10 inline-block px-4 py-2 rounded-lg">
              {error}
            </p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 pb-5 pt-3 border-t border-white/5 bg-[#0f1117]">
        <div className="flex gap-2.5 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer..."
            disabled={loading}
            rows={2}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-white/20 transition-colors disabled:opacity-40"
          />
          <button
            onClick={sendAnswer}
            disabled={loading || !input.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 transition-all active:scale-95 disabled:opacity-30"
            style={{
              backgroundColor:
                !input.trim() || loading ? "rgba(255,255,255,0.05)" : category.accent,
              color: !input.trim() || loading ? "#555" : "#000",
            }}
          >
            ↑
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-600 mt-2">
          Enter to send • Shift+Enter for new line
        </p>
      </div>
    </main>
  );
}
