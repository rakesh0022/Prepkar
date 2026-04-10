"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { INTERVIEW_CATS } from "@/components/data";

interface Msg { role: "user" | "assistant"; content: string }
interface Scores { [k: string]: string | number }

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 26, c = 2 * Math.PI * r, o = c - (score / 10) * c;
  return (
    <div style={{ textAlign: "center", margin: "0 5px" }}>
      <svg width="62" height="62" viewBox="0 0 62 62">
        <circle cx="31" cy="31" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4.5" />
        <circle cx="31" cy="31" r={r} fill="none" stroke={color} strokeWidth="4.5"
          strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round"
          transform="rotate(-90 31 31)" style={{ transition: "stroke-dashoffset 1s ease" }} />
        <text x="31" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">{score}</text>
      </svg>
      <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 1 }}>{label.replace(/_/g, " ")}</div>
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
  const [qNum, setQNum] = useState(0);
  const [scores, setScores] = useState<Scores | null>(null);
  const [err, setErr] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inpRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  useEffect(() => { if (screen === "chat" && !loading) inpRef.current?.focus(); }, [screen, loading, msgs]);

  async function api(messages: Msg[]) {
    const r = await fetch("/api/interview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages, category: cat.id, role }) });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error || "Request failed"); }
    return r.json();
  }

  async function begin() {
    setScreen("chat"); setMsgs([]); setQNum(0); setScores(null); setErr(""); setLoading(true);
    try {
      const d = await api([{ role: "user", content: `I am a candidate for ${role} interview. Start with a greeting and first question.` }]);
      setMsgs([{ role: "assistant", content: d.reply }]); setQNum(1);
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : "Failed"); } finally { setLoading(false); }
  }

  async function send() {
    if (!input.trim() || loading) return;
    const t = input.trim(); setInput(""); setErr("");
    const nm: Msg[] = [...msgs, { role: "user", content: t }]; setMsgs(nm); setLoading(true);
    try {
      const d = await api([{ role: "user", content: `I am a candidate for ${role} interview. Start with greeting and first question.` }, ...nm]);
      if (d.scorecard) {
        if (d.reply) setMsgs(p => [...p, { role: "assistant", content: d.reply }]);
        setTimeout(() => { setScores(d.scorecard); setScreen("score"); }, 1200);
      } else { setMsgs(p => [...p, { role: "assistant", content: d.reply }]); setQNum(p => p + 1); }
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : "Failed"); } finally { setLoading(false); }
  }

  /* ── SELECT ── */
  if (screen === "select") return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/" style={{ color: "var(--text-muted)", fontSize: 13, textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 800 }}>AI Mock Interview</h1>
      </header>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }}>
          Practice with AI that scores every answer. 5 questions, instant feedback, completely free.
        </p>
        {INTERVIEW_CATS.map((c, i) => (
          <button key={c.id} className="anim-up" onClick={() => { setCat(c); setRole(c.roles[0]); setScreen("setup"); }}
            style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "15px 16px", marginBottom: 8, borderRadius: 14, background: "var(--bg-card)", border: "1px solid var(--border)", cursor: "pointer", textAlign: "left", color: "#fff", animationDelay: `${i * 0.06}s`, transition: "border-color 0.2s" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{c.title}</div><div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>{c.sub}</div></div>
            <span style={{ color: "var(--text-muted)", fontSize: 16 }}>→</span>
          </button>
        ))}
      </div>
      <BottomNav />
    </main>
  );

  /* ── SETUP ── */
  if (screen === "setup") return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "28px 16px" }} className="anim-up">
        <button onClick={() => setScreen("select")} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Back</button>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${cat.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 12 }}>{cat.icon}</div>
        <h2 style={{ fontFamily: "'Outfit'", fontSize: 21, fontWeight: 800, marginBottom: 3 }}>{cat.title}</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 22 }}>Select your target role</p>
        {cat.roles.map(r => (
          <button key={r} onClick={() => setRole(r)} style={{ display: "block", width: "100%", padding: "12px 16px", marginBottom: 6, borderRadius: 10, textAlign: "left", fontSize: 13, fontWeight: 600, cursor: "pointer", background: role === r ? `${cat.color}12` : "transparent", border: `1.5px solid ${role === r ? cat.color : "var(--border)"}`, color: role === r ? "#fff" : "var(--text-muted)", transition: "all 0.2s" }}>
            {role === r ? "● " : "○ "}{r}
          </button>
        ))}
        <button onClick={begin} style={{ width: "100%", marginTop: 18, padding: "14px", background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Start Mock Interview →</button>
        <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", marginTop: 10 }}>5 questions · ~10 min · AI scores each answer</p>
      </div>
      <BottomNav />
    </main>
  );

  /* ── SCORE ── */
  if (screen === "score" && scores) {
    const sk = Object.keys(scores).filter(k => typeof scores[k] === "number");
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div className="anim-up" style={{ background: "var(--bg-card)", borderRadius: 20, padding: "28px 20px", maxWidth: 460, width: "100%", textAlign: "center", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>🎯</div>
          <h2 style={{ fontFamily: "'Outfit'", fontSize: 21, fontWeight: 800, marginBottom: 2 }}>Your Scorecard</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 18 }}>{cat.title} — {role}</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2, marginBottom: 18 }}>
            {sk.map(k => <ScoreRing key={k} score={scores[k] as number} label={k} color={cat.color} />)}
          </div>
          {scores.summary && <div style={{ borderRadius: 10, padding: "12px 14px", textAlign: "left", marginBottom: 10, background: `${cat.color}0A`, borderLeft: `3px solid ${cat.color}` }}><div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Summary</div><div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{scores.summary as string}</div></div>}
          {scores.tip && <div style={{ borderRadius: 10, padding: "12px 14px", textAlign: "left", marginBottom: 16, background: "rgba(251,191,36,0.06)", borderLeft: "3px solid #f59e0b" }}><div style={{ fontSize: 9, fontWeight: 700, color: "#f59e0b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>💡 Improvement Tip</div><div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{scores.tip as string}</div></div>}
          <button onClick={() => setScreen("select")} style={{ width: "100%", padding: "13px", background: cat.color, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try Another Interview</button>
        </div>
      </main>
    );
  }

  /* ── CHAT ── */
  return (
    <main style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `${cat.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{cat.icon}</div>
          <div><div style={{ fontSize: 13, fontWeight: 700 }}>{role}</div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Question {Math.min(qNum, 5)} of 5</div></div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>{[1,2,3,4,5].map(n => <div key={n} style={{ width: 18, height: 3, borderRadius: 2, background: n <= qNum ? cat.color : "rgba(255,255,255,0.05)" }} />)}</div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px" }} className="no-scroll">
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }} className="anim-up">
            <div style={{ maxWidth: "84%", padding: "11px 15px", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? cat.color : "var(--bg-card)", color: m.role === "user" ? "#fff" : "var(--text-secondary)" }}>
              {m.role === "assistant" && <div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Interviewer</div>}
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ display: "flex", gap: 4, padding: "10px 16px", background: "var(--bg-card)", borderRadius: 14, width: "fit-content" }}>{[0,1,2].map(n => <div key={n} style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color, animation: `pulseDot 1.2s ease ${n*0.2}s infinite` }} />)}</div>}
        {err && <p style={{ fontSize: 11, color: "#f87171", background: "rgba(239,68,68,0.08)", padding: "8px 12px", borderRadius: 8, textAlign: "center" }}>{err}</p>}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "8px 14px 16px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <textarea ref={inpRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Type your answer..." disabled={loading} rows={2} style={{ flex: 1, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#fff", resize: "none", fontFamily: "inherit", outline: "none" }} />
          <button onClick={send} disabled={loading || !input.trim()} style={{ width: 40, height: 40, borderRadius: 10, border: "none", fontSize: 17, cursor: "pointer", flexShrink: 0, background: !input.trim() || loading ? "var(--bg-card)" : cat.color, color: !input.trim() || loading ? "var(--text-muted)" : "#fff" }}>↑</button>
        </div>
        <p style={{ textAlign: "center", fontSize: 9, color: "#444", marginTop: 5 }}>Enter to send · Shift+Enter for new line</p>
      </div>
    </main>
  );
}
