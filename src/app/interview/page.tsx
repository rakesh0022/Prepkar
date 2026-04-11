"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { PRACTICE_CATS, type PracticeCategory, type PracticeStage } from "@/components/data";

interface Msg { role: "user" | "assistant"; content: string }
interface Scores { [k: string]: string | number }

function Ring({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 26, c = 2 * Math.PI * r, o = c - (score / 10) * c;
  return (<div style={{ textAlign: "center", margin: "0 5px" }}><svg width="62" height="62" viewBox="0 0 62 62"><circle cx="31" cy="31" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4.5" /><circle cx="31" cy="31" r={r} fill="none" stroke={color} strokeWidth="4.5" strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" transform="rotate(-90 31 31)" style={{ transition: "stroke-dashoffset 1s ease" }} /><text x="31" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">{score}</text></svg><div style={{ fontSize: 9, color: "#6B7280", marginTop: 1 }}>{label.replace(/_/g, " ")}</div></div>);
}

export default function PracticePage() {
  const [scr, setScr] = useState<"sel" | "stage" | "chat" | "done">("sel");
  const [cat, setCat] = useState<PracticeCategory>(PRACTICE_CATS[0]);
  const [stage, setStage] = useState<PracticeStage>(PRACTICE_CATS[0].stages[0]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [inp, setInp] = useState("");
  const [ld, setLd] = useState(false);
  const [qn, setQn] = useState(0);
  const [sc, setSc] = useState<Scores | null>(null);
  const [er, setEr] = useState("");
  const end = useRef<HTMLDivElement>(null);
  const iRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, ld]);
  useEffect(() => { if (scr === "chat" && !ld) iRef.current?.focus(); }, [scr, ld, msgs]);

  // Social proof
  const [practiceCount] = useState(14283);

  async function api(m: Msg[]) {
    const r = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: m, category: cat.id, role: `${cat.title} - ${stage.label}`, stage: stage.id }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error || "Failed"); }
    return r.json();
  }

  async function begin() {
    setScr("chat"); setMsgs([]); setQn(0); setSc(null); setEr(""); setLd(true);
    const isMcq = stage.id.includes("mcq") || stage.id.includes("prelims") || stage.id.includes("cbt") || stage.id === "prelims_csat" || stage.id === "written_mcq";
    const isDesc = stage.id === "descriptive" || stage.id === "mains_essay";
    const startMsg = isMcq
      ? `I want to practice ${stage.label} for ${cat.title}. Start with the first MCQ question.`
      : isDesc
      ? `I want to practice ${stage.label} for ${cat.title}. Give me the first writing prompt.`
      : `I am a candidate for ${cat.title} ${stage.label}. Start with greeting and first question.`;
    try {
      const d = await api([{ role: "user", content: startMsg }]);
      setMsgs([{ role: "assistant", content: d.reply }]); setQn(1);
    } catch (e: unknown) { setEr(e instanceof Error ? e.message : "Failed"); }
    finally { setLd(false); }
  }

  async function send() {
    if (!inp.trim() || ld) return;
    const t = inp.trim(); setInp(""); setEr("");
    const isMcq = stage.id.includes("mcq") || stage.id.includes("prelims") || stage.id.includes("cbt") || stage.id === "prelims_csat" || stage.id === "written_mcq";
    const startMsg = isMcq
      ? `I want to practice ${stage.label} for ${cat.title}. Start with the first MCQ question.`
      : stage.id === "descriptive" || stage.id === "mains_essay"
      ? `I want to practice ${stage.label} for ${cat.title}. Give me the first writing prompt.`
      : `I am a candidate for ${cat.title} ${stage.label}. Start with greeting and first question.`;
    const nm: Msg[] = [...msgs, { role: "user", content: t }]; setMsgs(nm); setLd(true);
    try {
      const d = await api([{ role: "user", content: startMsg }, ...nm]);
      if (d.scorecard) {
        if (d.reply) setMsgs(p => [...p, { role: "assistant", content: d.reply }]);
        setTimeout(() => { setSc(d.scorecard); setScr("done"); }, 1200);
      } else { setMsgs(p => [...p, { role: "assistant", content: d.reply }]); setQn(p => p + 1); }
    } catch (e: unknown) { setEr(e instanceof Error ? e.message : "Failed"); }
    finally { setLd(false); }
  }

  // ── SCREEN: Select Exam ──
  if (scr === "sel") return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)" }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 15, textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>AI Practice</h1>
      </header>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 14, color: "#374151", marginBottom: 6, lineHeight: 1.5, fontWeight: 500 }}>
          Practice every stage — from Prelims MCQ to Final Interview
        </p>
        <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 16, lineHeight: 1.5 }}>
          AI generates exam-realistic questions, scores your answers, and tells you exactly where to improve.
        </p>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, background: "#F0FDF4", borderRadius: 10, padding: "8px 14px", border: "1px solid rgba(22,163,74,0.12)" }}>
          <span style={{ fontSize: 16 }}>🎯</span>
          <span style={{ fontSize: 12, color: "#065F46", fontWeight: 600 }}>{practiceCount.toLocaleString()} sessions practiced this month</span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", marginLeft: "auto", animation: "pulseDot 2s ease infinite" }} />
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
          Choose Your Exam
        </div>

        {PRACTICE_CATS.map((c, i) => (
          <button key={c.id} className="anim-up" onClick={() => { setCat(c); setStage(c.stages[0]); setScr("stage"); }} style={{
            display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "15px 16px", marginBottom: 8,
            borderRadius: 14, background: "#FFFFFF", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
            cursor: "pointer", textAlign: "left", color: "#111827", animationDelay: `${i * 0.05}s`,
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 1 }}>{c.sub}</div>
              <div style={{ fontSize: 10, color: c.color, fontWeight: 600, marginTop: 3 }}>{c.stages.length} practice stages available</div>
            </div>
            <span style={{ color: "#9CA3AF", fontSize: 18 }}>→</span>
          </button>
        ))}
      </div>
      <BottomNav />
    </main>
  );

  // ── SCREEN: Select Stage ──
  if (scr === "stage") return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 16px" }} className="anim-up">
        <button onClick={() => setScr("sel")} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Back</button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${cat.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{cat.icon}</div>
          <div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, color: "#111827", margin: 0 }}>{cat.title}</h2>
            <p style={{ color: "#6B7280", fontSize: 12, margin: "2px 0 0" }}>{cat.sub}</p>
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
          Select Practice Stage
        </div>

        {cat.stages.map((s, i) => (
          <button key={s.id} onClick={() => setStage(s)} className="anim-up" style={{
            display: "block", width: "100%", padding: "14px 16px", marginBottom: 8,
            borderRadius: 14, textAlign: "left", cursor: "pointer",
            background: stage.id === s.id ? `${cat.color}06` : "#FFFFFF",
            border: stage.id === s.id ? `2px solid ${cat.color}` : "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)", animationDelay: `${i * 0.05}s`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cat.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2, lineHeight: 1.4 }}>{s.description}</div>
              </div>
              <div style={{
                background: `${cat.color}10`, color: cat.color,
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, flexShrink: 0,
              }}>{s.questionCount}Q</div>
            </div>
          </button>
        ))}

        <button onClick={begin} style={{
          width: "100%", marginTop: 18, padding: "14px",
          background: cat.color, color: "#fff", border: "none", borderRadius: 12,
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          boxShadow: `0 4px 16px ${cat.color}30`,
        }}>
          Start {stage.label} →
        </button>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>🟢 {Math.floor(Math.random() * 25) + 10} people practicing right now</span>
        </div>
      </div>
      <BottomNav />
    </main>
  );

  // ── SCREEN: Done / Scorecard ──
  if (scr === "done" && sc) {
    const sk = Object.keys(sc).filter(k => typeof sc[k] === "number");
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div className="anim-up" style={{ background: "#FFFFFF", borderRadius: 20, padding: "28px 20px", maxWidth: 460, width: "100%", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>🎯</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 2 }}>Your Scorecard</h2>
          <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 18 }}>{cat.title} — {stage.label}</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2, marginBottom: 18 }}>{sk.map(k => <Ring key={k} score={sc[k] as number} label={k} color={cat.color} />)}</div>
          {sc.weakest_topic && <div style={{ borderRadius: 10, padding: "10px 14px", textAlign: "left", marginBottom: 10, background: "#FEF2F2", borderLeft: "3px solid #DC2626" }}><div style={{ fontSize: 9, fontWeight: 700, color: "#DC2626", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Weakest Area</div><div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{sc.weakest_topic as string}</div></div>}
          {sc.summary && <div style={{ borderRadius: 10, padding: "10px 14px", textAlign: "left", marginBottom: 10, background: `${cat.color}06`, borderLeft: `3px solid ${cat.color}` }}><div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Summary</div><div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{sc.summary as string}</div></div>}
          {sc.tip && <div style={{ borderRadius: 10, padding: "10px 14px", textAlign: "left", marginBottom: 16, background: "#FFFBEB", borderLeft: "3px solid #F59E0B" }}><div style={{ fontSize: 9, fontWeight: 700, color: "#D97706", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>💡 Tip</div><div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{sc.tip as string}</div></div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setScr("stage"); }} style={{ flex: 1, padding: "13px", background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Try Another Stage</button>
            <button onClick={begin} style={{ flex: 1, padding: "13px", background: cat.color, color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Retry {stage.label}</button>
          </div>
        </div>
      </main>
    );
  }

  // ── SCREEN: Chat ──
  const isMcq = stage.id.includes("mcq") || stage.id.includes("prelims") || stage.id.includes("cbt") || stage.id === "prelims_csat" || stage.id === "written_mcq";
  const maxQ = stage.questionCount;

  return (
    <main style={{ height: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `${cat.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{cat.icon}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{cat.title} — {stage.label}</div>
            <div style={{ fontSize: 10, color: "#6B7280" }}>
              {isMcq ? `Question ${Math.min(qn, maxQ)} of ${maxQ}` : `Question ${Math.min(qn, maxQ)} of ${maxQ}`}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: maxQ }, (_, n) => (
            <div key={n} style={{ width: 16, height: 3, borderRadius: 2, background: n < qn ? cat.color : "#E5E7EB" }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "14px" }} className="no-scroll">
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }} className="anim-up">
            <div style={{
              maxWidth: "84%", padding: "11px 15px", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
              borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.role === "user" ? cat.color : "#FFFFFF",
              color: m.role === "user" ? "#fff" : "#374151",
              border: m.role === "user" ? "none" : "1px solid var(--border)",
              boxShadow: m.role === "user" ? "none" : "var(--shadow-sm)",
            }}>
              {m.role === "assistant" && <div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{isMcq ? "Examiner" : stage.id.includes("essay") || stage.id === "descriptive" ? "Evaluator" : "Interviewer"}</div>}
              {m.content}
            </div>
          </div>
        ))}
        {ld && <div style={{ display: "flex", gap: 4, padding: "10px 16px", background: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 14, width: "fit-content", boxShadow: "var(--shadow-sm)" }}>{[0, 1, 2].map(n => <div key={n} style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color, animation: `pulseDot 1.2s ease ${n * 0.2}s infinite` }} />)}</div>}
        {er && <p style={{ fontSize: 11, color: "#DC2626", background: "rgba(220,38,38,0.06)", padding: "8px 12px", borderRadius: 8, textAlign: "center" }}>{er}</p>}
        <div ref={end} />
      </div>

      <div style={{ padding: "8px 14px 16px", borderTop: "1px solid var(--border)", flexShrink: 0, background: "var(--bg)" }}>
        {/* Quick MCQ buttons for single-letter answers */}
        {isMcq && (
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            {["A", "B", "C", "D"].map(opt => (
              <button key={opt} onClick={() => { setInp(opt); setTimeout(() => { const fakeInp = opt; setInp(""); setEr(""); const nm: Msg[] = [...msgs, { role: "user", content: fakeInp }]; setMsgs(nm); setLd(true); const isMcqS = stage.id.includes("mcq") || stage.id.includes("prelims") || stage.id.includes("cbt") || stage.id === "prelims_csat" || stage.id === "written_mcq"; const startMsg = isMcqS ? `I want to practice ${stage.label} for ${cat.title}. Start with the first MCQ question.` : `I am a candidate for ${cat.title} ${stage.label}. Start with greeting and first question.`; api([{ role: "user", content: startMsg }, ...nm]).then(d => { if (d.scorecard) { if (d.reply) setMsgs(p => [...p, { role: "assistant", content: d.reply }]); setTimeout(() => { setSc(d.scorecard); setScr("done"); }, 1200); } else { setMsgs(p => [...p, { role: "assistant", content: d.reply }]); setQn(p => p + 1); } }).catch(e => setEr(e instanceof Error ? e.message : "Failed")).finally(() => setLd(false)); }, 0); }}
                disabled={ld}
                style={{
                  flex: 1, padding: "10px", borderRadius: 10, fontSize: 15, fontWeight: 700,
                  border: `1.5px solid ${cat.color}20`, background: `${cat.color}06`, color: cat.color,
                  cursor: ld ? "default" : "pointer",
                }}>
                {opt}
              </button>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <textarea ref={iRef} value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={isMcq ? "Type A, B, C, or D (or tap above)" : stage.id.includes("essay") || stage.id === "descriptive" ? "Write your response..." : "Type your answer..."}
            disabled={ld} rows={isMcq ? 1 : 2}
            style={{ flex: 1, background: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#111827", resize: "none", fontFamily: "inherit", outline: "none" }} />
          <button onClick={send} disabled={ld || !inp.trim()} style={{ width: 40, height: 40, borderRadius: 10, border: "none", fontSize: 17, cursor: "pointer", flexShrink: 0, background: !inp.trim() || ld ? "rgba(0,0,0,0.04)" : cat.color, color: !inp.trim() || ld ? "#9CA3AF" : "#fff", boxShadow: inp.trim() && !ld ? `0 2px 8px ${cat.color}30` : "none" }}>↑</button>
        </div>
      </div>
    </main>
  );
}
