"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { INTERVIEW_CATS } from "@/components/data";

interface Msg { role: "user" | "assistant"; content: string }
interface Scores { [k: string]: string | number }

const SAMPLE_QUESTIONS: Record<string, string[]> = {
  bank_po: ["Tell me about yourself.", "Why do you want to join banking?", "What is the role of RBI in the Indian economy?"],
  fresher_it: ["Introduce yourself.", "Why should we hire you?", "Where do you see yourself in 5 years?"],
  mba: ["Walk me through your resume.", "Why MBA and why now?", "What are your post-MBA goals?"],
  govt_job: ["Tell us about your background.", "Why do you want to serve in the government?", "What current affairs issue concerns you most?"],
};

function Ring({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 26, c = 2 * Math.PI * r, o = c - (score / 10) * c;
  return (<div style={{ textAlign: "center", margin: "0 5px" }}><svg width="62" height="62" viewBox="0 0 62 62"><circle cx="31" cy="31" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4.5" /><circle cx="31" cy="31" r={r} fill="none" stroke={color} strokeWidth="4.5" strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" transform="rotate(-90 31 31)" style={{ transition: "stroke-dashoffset 1s ease" }} /><text x="31" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">{score}</text></svg><div style={{ fontSize: 9, color: "#6B7280", marginTop: 1 }}>{label.replace(/_/g, " ")}</div></div>);
}

export default function InterviewPage() {
  const [scr, setScr] = useState<"sel" | "set" | "chat" | "done">("sel");
  const [cat, setCat] = useState(INTERVIEW_CATS[0]);
  const [role, setRole] = useState("");
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

  // Social proof counter — animated
  const [practiceCount, setPracticeCount] = useState(12847);
  useEffect(() => {
    const t = setInterval(() => setPracticeCount(c => c + Math.floor(Math.random() * 3)), 8000);
    return () => clearInterval(t);
  }, []);

  async function api(m: Msg[]) { const r = await fetch("/api/interview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: m, category: cat.id, role }) }); if (!r.ok) { const e = await r.json(); throw new Error(e.error || "Failed"); } return r.json(); }

  async function begin() { setScr("chat"); setMsgs([]); setQn(0); setSc(null); setEr(""); setLd(true); try { const d = await api([{ role: "user", content: `I am a candidate for ${role} interview. Start with greeting and first question.` }]); setMsgs([{ role: "assistant", content: d.reply }]); setQn(1); } catch (e: unknown) { setEr(e instanceof Error ? e.message : "Failed"); } finally { setLd(false); } }

  async function send() { if (!inp.trim() || ld) return; const t = inp.trim(); setInp(""); setEr(""); const nm: Msg[] = [...msgs, { role: "user", content: t }]; setMsgs(nm); setLd(true); try { const d = await api([{ role: "user", content: `I am a candidate for ${role} interview. Start with greeting and first question.` }, ...nm]); if (d.scorecard) { if (d.reply) setMsgs(p => [...p, { role: "assistant", content: d.reply }]); setTimeout(() => { setSc(d.scorecard); setScr("done"); }, 1200); } else { setMsgs(p => [...p, { role: "assistant", content: d.reply }]); setQn(p => p + 1); } } catch (e: unknown) { setEr(e instanceof Error ? e.message : "Failed"); } finally { setLd(false); } }

  if (scr === "sel") return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)" }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 13, textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#111827" }}>AI Mock Interview</h1>
      </header>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 13, color: "#374151", marginBottom: 8, lineHeight: 1.5 }}>Practice with AI that scores every answer. 5 questions, instant feedback, completely free.</p>

        {/* Social proof */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
          background: "#F0FDF4", borderRadius: 10, padding: "8px 14px",
          border: "1px solid rgba(22,163,74,0.12)",
        }}>
          <span style={{ fontSize: 16 }}>🎯</span>
          <span style={{ fontSize: 12, color: "#065F46", fontWeight: 600 }}>
            {practiceCount.toLocaleString()} interviews practiced this month
          </span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", marginLeft: "auto", animation: "pulseDot 2s ease infinite" }} />
        </div>

        {INTERVIEW_CATS.map((c, i) => (
          <button key={c.id} className="anim-up" onClick={() => { setCat(c); setRole(c.roles[0]); setScr("set"); }} style={{
            display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "15px 16px", marginBottom: 8,
            borderRadius: 14, background: "#FFFFFF", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
            cursor: "pointer", textAlign: "left", color: "#111827", animationDelay: `${i * 0.06}s`,
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 1 }}>{c.sub}</div>
            </div>
            <span style={{ color: "#9CA3AF", fontSize: 16 }}>→</span>
          </button>
        ))}
      </div>
      <BottomNav />
    </main>
  );

  if (scr === "set") {
    const sampleQs = SAMPLE_QUESTIONS[cat.id] || SAMPLE_QUESTIONS.govt_job;
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 16px" }} className="anim-up">
          <button onClick={() => setScr("sel")} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Back</button>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${cat.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 12 }}>{cat.icon}</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 3 }}>{cat.title}</h2>
          <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 22 }}>Select your target role</p>
          {cat.roles.map(r => (<button key={r} onClick={() => setRole(r)} style={{ display: "block", width: "100%", padding: "12px 16px", marginBottom: 6, borderRadius: 10, textAlign: "left", fontSize: 13, fontWeight: 600, cursor: "pointer", background: role === r ? `${cat.color}08` : "#FFFFFF", border: `1.5px solid ${role === r ? cat.color : "var(--border)"}`, color: role === r ? "#111827" : "#6B7280" }}>{role === r ? "● " : "○ "}{r}</button>))}

          {/* Sample question preview */}
          <div style={{
            marginTop: 20, borderRadius: 14, padding: "14px 16px",
            background: "#F9FAFB", border: "1px solid var(--border)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
              📋 Sample Questions You&apos;ll Face
            </div>
            {sampleQs.map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: i < sampleQs.length - 1 ? 8 : 0 }}>
                <span style={{ color: cat.color, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>Q{i + 1}.</span>
                <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5, fontStyle: "italic" }}>{q}</span>
              </div>
            ))}
          </div>

          <button onClick={begin} style={{ width: "100%", marginTop: 18, padding: "14px", background: cat.color, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px ${cat.color}30` }}>Start Mock Interview →</button>

          {/* Social proof on set screen */}
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>🟢 {Math.floor(Math.random() * 30) + 15} people practicing right now</span>
          </div>
        </div>
        <BottomNav />
      </main>
    );
  }

  if (scr === "done" && sc) {
    const sk = Object.keys(sc).filter(k => typeof sc[k] === "number");
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div className="anim-up" style={{ background: "#FFFFFF", borderRadius: 20, padding: "28px 20px", maxWidth: 460, width: "100%", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>🎯</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 2 }}>Your Scorecard</h2>
          <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 18 }}>{cat.title} — {role}</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2, marginBottom: 18 }}>{sk.map(k => <Ring key={k} score={sc[k] as number} label={k} color={cat.color} />)}</div>
          {sc.summary && <div style={{ borderRadius: 10, padding: "12px 14px", textAlign: "left", marginBottom: 10, background: `${cat.color}08`, borderLeft: `3px solid ${cat.color}` }}><div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Summary</div><div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{sc.summary as string}</div></div>}
          {sc.tip && <div style={{ borderRadius: 10, padding: "12px 14px", textAlign: "left", marginBottom: 16, background: "#FFFBEB", borderLeft: "3px solid #F59E0B" }}><div style={{ fontSize: 9, fontWeight: 700, color: "#D97706", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>💡 Tip</div><div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{sc.tip as string}</div></div>}
          <button onClick={() => setScr("sel")} style={{ width: "100%", padding: "13px", background: cat.color, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try Another Interview</button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ height: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `${cat.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{cat.icon}</div>
          <div><div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{role}</div><div style={{ fontSize: 10, color: "#6B7280" }}>Question {Math.min(qn, 5)} of 5</div></div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>{[1, 2, 3, 4, 5].map(n => <div key={n} style={{ width: 18, height: 3, borderRadius: 2, background: n <= qn ? cat.color : "#E5E7EB" }} />)}</div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px" }} className="no-scroll">
        {msgs.map((m, i) => (<div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }} className="anim-up"><div style={{ maxWidth: "84%", padding: "11px 15px", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? cat.color : "#FFFFFF", color: m.role === "user" ? "#fff" : "#374151", border: m.role === "user" ? "none" : "1px solid var(--border)", boxShadow: m.role === "user" ? "none" : "var(--shadow-sm)" }}>{m.role === "assistant" && <div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Interviewer</div>}{m.content}</div></div>))}
        {ld && <div style={{ display: "flex", gap: 4, padding: "10px 16px", background: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 14, width: "fit-content", boxShadow: "var(--shadow-sm)" }}>{[0, 1, 2].map(n => <div key={n} style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color, animation: `pulseDot 1.2s ease ${n * 0.2}s infinite` }} />)}</div>}
        {er && <p style={{ fontSize: 11, color: "#DC2626", background: "rgba(220,38,38,0.06)", padding: "8px 12px", borderRadius: 8, textAlign: "center" }}>{er}</p>}
        <div ref={end} />
      </div>
      <div style={{ padding: "8px 14px 16px", borderTop: "1px solid var(--border)", flexShrink: 0, background: "var(--bg)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <textarea ref={iRef} value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Type your answer..." disabled={ld} rows={2} style={{ flex: 1, background: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#111827", resize: "none", fontFamily: "inherit", outline: "none" }} />
          <button onClick={send} disabled={ld || !inp.trim()} style={{ width: 40, height: 40, borderRadius: 10, border: "none", fontSize: 17, cursor: "pointer", flexShrink: 0, background: !inp.trim() || ld ? "rgba(0,0,0,0.04)" : cat.color, color: !inp.trim() || ld ? "#9CA3AF" : "#fff", boxShadow: inp.trim() && !ld ? `0 2px 8px ${cat.color}30` : "none" }}>↑</button>
        </div>
      </div>
    </main>
  );
}
