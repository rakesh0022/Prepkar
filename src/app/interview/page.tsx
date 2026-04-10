"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { INTERVIEW_CATS } from "@/components/data";

interface Msg { role: "user" | "assistant"; content: string; }
interface Scores { [k: string]: string | number; }

function ScoreCircle({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 28, circ = 2 * Math.PI * r, off = circ - (score / 10) * circ;
  return (
    <div style={{ textAlign: "center", margin: "0 6px" }}>
      <svg width="66" height="66" viewBox="0 0 66 66">
        <circle cx="33" cy="33" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle cx="33" cy="33" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          transform="rotate(-90 33 33)" style={{ transition: "stroke-dashoffset 1s ease" }} />
        <text x="33" y="37" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">{score}</text>
      </svg>
      <div style={{ fontSize: 9, color: "#888", marginTop: 1 }}>{label.replace(/_/g, " ")}</div>
    </div>
  );
}

export default function InterviewPage() {
  const [screen, setScreen] = useState<"select" | "setup" | "chat" | "score">("select");
  const [cat, setCat] = useState(INTERVIEW_CATS[0]);
  const [role, setRole] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [qCount, setQCount] = useState(0);
  const [scores, setScores] = useState<Scores | null>(null);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  useEffect(() => { if (screen === "chat" && !loading) inputRef.current?.focus(); }, [screen, loading, msgs]);

  async function callAPI(messages: Msg[]) {
    const res = await fetch("/api/interview", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, category: cat.id, role }),
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || "API failed"); }
    return res.json();
  }

  async function startInterview() {
    setScreen("chat"); setMsgs([]); setQCount(0); setScores(null); setError(""); setLoading(true);
    try {
      const data = await callAPI([{ role: "user", content: `I am a candidate appearing for a ${role} interview. Please start by greeting me and asking your first question.` }]);
      setMsgs([{ role: "assistant", content: data.reply }]); setQCount(1);
    } catch (e: unknown) { setError(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  }

  async function send() {
    if (!input.trim() || loading) return;
    const txt = input.trim(); setInput(""); setError("");
    const newMsgs: Msg[] = [...msgs, { role: "user", content: txt }]; setMsgs(newMsgs); setLoading(true);
    try {
      const full: Msg[] = [{ role: "user", content: `I am a candidate for ${role} interview. Start with greeting and first question.` }, ...newMsgs];
      const data = await callAPI(full);
      if (data.scorecard) {
        if (data.reply) setMsgs(p => [...p, { role: "assistant", content: data.reply }]);
        setTimeout(() => { setScores(data.scorecard); setScreen("score"); }, 1200);
      } else {
        setMsgs(p => [...p, { role: "assistant", content: data.reply }]); setQCount(p => p + 1);
      }
    } catch (e: unknown) { setError(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  }

  // ─── SELECT SCREEN ───
  if (screen === "select") {
    return (
      <main style={{ minHeight: "100vh", background: "#0a0b10", paddingBottom: 80 }}>
        <header style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>←</Link>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 800 }}>AI Mock Interview</h1>
        </header>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, lineHeight: 1.5 }}>
            30-40% candidates fail in the interview round after clearing written exams. Practice with AI and don&apos;t be one of them.
          </p>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 10 }}>Choose your interview</p>
          {INTERVIEW_CATS.map((c, i) => (
            <button key={c.id} className="fade-up" onClick={() => { setCat(c); setRole(c.roles[0]); setScreen("setup"); }}
              style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "16px", marginBottom: 8, borderRadius: 14, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", textAlign: "left", animationDelay: `${i * 0.07}s`, transition: "border-color 0.2s", color: "#fff" }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{c.sub}</div>
              </div>
              <span style={{ color: "#555", fontSize: 18 }}>→</span>
            </button>
          ))}
          <p style={{ textAlign: "center", fontSize: 11, color: "#444", marginTop: 16 }}>5 questions • ~10 min • AI scores each answer • 100% Free</p>
        </div>
        <BottomNav />
      </main>
    );
  }

  // ─── SETUP SCREEN ───
  if (screen === "setup") {
    return (
      <main style={{ minHeight: "100vh", background: "#0a0b10", paddingBottom: 80 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 16px" }} className="fade-up">
          <button onClick={() => setScreen("select")} style={{ background: "none", border: "none", color: "#888", fontSize: 13, cursor: "pointer", marginBottom: 20, padding: 0 }}>← Back</button>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: `${cat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 12 }}>{cat.icon}</div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{cat.title}</h2>
          <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>Select role to start practicing</p>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Interview Role</p>
          {cat.roles.map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              display: "block", width: "100%", padding: "12px 16px", marginBottom: 6, borderRadius: 10, textAlign: "left", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              background: role === r ? `${cat.color}15` : "transparent", border: `1.5px solid ${role === r ? cat.color : "rgba(255,255,255,0.06)"}`, color: role === r ? "#fff" : "#888",
            }}>{role === r ? "● " : "○ "}{r}</button>
          ))}
          <button onClick={startInterview} style={{ width: "100%", marginTop: 20, padding: "14px", background: cat.color, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Start Mock Interview →</button>
        </div>
        <BottomNav />
      </main>
    );
  }

  // ─── SCORECARD ───
  if (screen === "score" && scores) {
    const scoreKeys = Object.keys(scores).filter(k => typeof scores[k] === "number");
    return (
      <main style={{ minHeight: "100vh", background: "#0a0b10", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div className="fade-up" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 20, padding: "28px 20px", maxWidth: 480, width: "100%", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🎯</div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Your Scorecard</h2>
          <p style={{ color: "#888", fontSize: 12, marginBottom: 20 }}>{cat.title} — {role}</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4, marginBottom: 20 }}>
            {scoreKeys.map(k => <ScoreCircle key={k} score={scores[k] as number} label={k} color={cat.color} />)}
          </div>
          {scores.summary && (
            <div style={{ borderRadius: 10, padding: "12px 14px", textAlign: "left", marginBottom: 10, background: `${cat.color}0C`, borderLeft: `3px solid ${cat.color}` }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Summary</div>
              <div style={{ fontSize: 12, color: "#c9cdd3", lineHeight: 1.6 }}>{scores.summary}</div>
            </div>
          )}
          {scores.tip && (
            <div style={{ borderRadius: 10, padding: "12px 14px", textAlign: "left", marginBottom: 16, background: "rgba(251,191,36,0.08)", borderLeft: "3px solid #f59e0b" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#f59e0b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>💡 Improvement Tip</div>
              <div style={{ fontSize: 12, color: "#c9cdd3", lineHeight: 1.6 }}>{scores.tip}</div>
            </div>
          )}
          <button onClick={() => setScreen("select")} style={{ width: "100%", padding: "13px", background: cat.color, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try Another Interview</button>
        </div>
      </main>
    );
  }

  // ─── CHAT SCREEN ───
  return (
    <main style={{ height: "100dvh", display: "flex", flexDirection: "column", background: "#0a0b10" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `${cat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{cat.icon}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{role}</div>
            <div style={{ fontSize: 10, color: "#888" }}>Q {Math.min(qCount, 5)} of 5</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {[1, 2, 3, 4, 5].map(n => <div key={n} style={{ width: 20, height: 3, borderRadius: 2, background: n <= qCount ? cat.color : "rgba(255,255,255,0.06)" }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "16px 14px" }} className="hide-scrollbar">
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }} className="fade-up">
            <div style={{
              maxWidth: "84%", padding: "12px 16px", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user" ? cat.color : "rgba(255,255,255,0.04)",
              color: m.role === "user" ? "#fff" : "#c9cdd3",
            }}>
              {m.role === "assistant" && <div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Interviewer</div>}
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 5, padding: "12px 18px", background: "rgba(255,255,255,0.04)", borderRadius: 16, width: "fit-content" }}>
            {[0, 1, 2].map(n => <div key={n} style={{ width: 7, height: 7, borderRadius: "50%", background: cat.color, animation: `pulse-dot 1.2s ease ${n * 0.2}s infinite` }} />)}
          </div>
        )}
        {error && <p style={{ fontSize: 11, color: "#f87171", background: "rgba(239,68,68,0.1)", padding: "8px 12px", borderRadius: 8, textAlign: "center" }}>{error}</p>}
        <div ref={endRef} />
      </div>

      <div style={{ padding: "10px 14px 16px", borderTop: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type your answer..." disabled={loading} rows={2}
            style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#fff", resize: "none", fontFamily: "inherit", outline: "none" }}
          />
          <button onClick={send} disabled={loading || !input.trim()} style={{
            width: 42, height: 42, borderRadius: 10, border: "none", fontSize: 18, cursor: "pointer", flexShrink: 0,
            background: !input.trim() || loading ? "rgba(255,255,255,0.04)" : cat.color, color: !input.trim() || loading ? "#555" : "#fff",
          }}>↑</button>
        </div>
        <p style={{ textAlign: "center", fontSize: 9, color: "#444", marginTop: 6 }}>Enter to send • Shift+Enter for new line</p>
      </div>
    </main>
  );
}
