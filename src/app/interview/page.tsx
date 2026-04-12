"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { createClient } from "@/lib/supabase/client";
import { PRACTICE_CATS, type PracticeCategory, type PracticeStage } from "@/components/data";
import { getSubscriptionStatus, incrementTestCount, type SubscriptionStatus } from "@/lib/subscription";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [subStatus, setSubStatus] = useState<SubscriptionStatus | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const iRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const supabase = createClient();

  // Check auth + subscription on load
  const checkAuth = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);
    setAuthChecked(true);
    if (user) {
      const status = await getSubscriptionStatus();
      setSubStatus(status);
    }
  }, [supabase]);

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, ld]);
  useEffect(() => { if (scr === "chat" && !ld) iRef.current?.focus(); }, [scr, ld, msgs]);

  const [practiceCount] = useState(14283);

  async function api(m: Msg[]) {
    const r = await fetch("/api/interview", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: m, category: cat.id, role: `${cat.title} - ${stage.label}`, stage: stage.id }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error || "Failed"); }
    return r.json();
  }

  async function begin() {
    // Gate: must be logged in
    if (!isLoggedIn) { router.push(`/login?redirect=/interview`); return; }
    // Gate: check free test limit
    if (subStatus && !subStatus.canTakeTest) { router.push("/pricing"); return; }

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

  async function handleScorecard(d: { reply?: string; scorecard: Record<string, unknown> }) {
    if (d.reply) setMsgs(p => [...p, { role: "assistant", content: d.reply as string }]);
    // Save score + increment test count
    try {
      await fetch("/api/scores", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ examName: cat.title, stageName: stage.label, scoreOverall: (d.scorecard as Record<string, number>).overall || 0, scoreData: d.scorecard, questionCount: stage.questionCount }) });
      await incrementTestCount();
    } catch { /* silent */ }
    setTimeout(() => { setSc(d.scorecard as Scores); setScr("done"); }, 1200);
  }

  async function send() {
    if (!inp.trim() || ld) return;
    const t = inp.trim(); setInp(""); setEr("");
    const isMcqS = stage.id.includes("mcq") || stage.id.includes("prelims") || stage.id.includes("cbt") || stage.id === "prelims_csat" || stage.id === "written_mcq";
    const startMsg = isMcqS
      ? `I want to practice ${stage.label} for ${cat.title}. Start with the first MCQ question.`
      : stage.id === "descriptive" || stage.id === "mains_essay"
      ? `I want to practice ${stage.label} for ${cat.title}. Give me the first writing prompt.`
      : `I am a candidate for ${cat.title} ${stage.label}. Start with greeting and first question.`;
    const nm: Msg[] = [...msgs, { role: "user", content: t }]; setMsgs(nm); setLd(true);
    try {
      const d = await api([{ role: "user", content: startMsg }, ...nm]);
      if (d.scorecard) { await handleScorecard(d); }
      else { setMsgs(p => [...p, { role: "assistant", content: d.reply }]); setQn(p => p + 1); }
    } catch (e: unknown) { setEr(e instanceof Error ? e.message : "Failed"); }
    finally { setLd(false); }
  }

  async function sendMcq(opt: string) {
    setInp(""); setEr("");
    const nm: Msg[] = [...msgs, { role: "user", content: opt }]; setMsgs(nm); setLd(true);
    const isMcqS = stage.id.includes("mcq") || stage.id.includes("prelims") || stage.id.includes("cbt") || stage.id === "prelims_csat" || stage.id === "written_mcq";
    const startMsg = isMcqS
      ? `I want to practice ${stage.label} for ${cat.title}. Start with the first MCQ question.`
      : `I am a candidate for ${cat.title} ${stage.label}. Start with greeting and first question.`;
    try {
      const d = await api([{ role: "user", content: startMsg }, ...nm]);
      if (d.scorecard) { await handleScorecard(d); }
      else { setMsgs(p => [...p, { role: "assistant", content: d.reply }]); setQn(p => p + 1); }
    } catch (e: unknown) { setEr(e instanceof Error ? e.message : "Failed"); }
    finally { setLd(false); }
  }

  // Show loading while checking auth
  if (!authChecked) return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#6B7280" }}>Loading...</p>
    </main>
  );

  // ── SCREEN: Select Exam ──
  if (scr === "sel") return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)" }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 15, textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>AI Practice</h1>
        {/* Show login status */}
        {!isLoggedIn && (
          <Link href="/login?redirect=/interview" style={{ marginLeft: "auto", textDecoration: "none" }}>
            <div style={{ padding: "6px 14px", borderRadius: 8, background: "#2563EB", color: "#fff", fontSize: 11, fontWeight: 700 }}>Sign In</div>
          </Link>
        )}
        {isLoggedIn && subStatus && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            {subStatus.isPro ? (
              <span style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", background: "#F0FDF4", padding: "3px 8px", borderRadius: 6, border: "1px solid rgba(22,163,74,0.12)" }}>PRO ✓</span>
            ) : (
              <span style={{ fontSize: 10, fontWeight: 600, color: "#6B7280", background: "#F3F4F6", padding: "3px 8px", borderRadius: 6 }}>{subStatus.freeTestsRemaining} free left</span>
            )}
          </div>
        )}
      </header>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 14, color: "#374151", marginBottom: 6, lineHeight: 1.5, fontWeight: 500 }}>
          Practice every stage — from Prelims MCQ to Final Interview
        </p>
        <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>
          {isLoggedIn ? "Select your exam to begin." : "Sign in to start practicing — it's free."}
        </p>

        {/* Free tier info */}
        {isLoggedIn && subStatus && !subStatus.isPro && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFBEB", borderRadius: 10, padding: "10px 14px", marginBottom: 16, border: "1px solid rgba(245,158,11,0.15)" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>Free Plan: {subStatus.freeTestsRemaining} of 2 tests remaining</div>
              <div style={{ fontSize: 10, color: "#B45309", marginTop: 2 }}>Resets every 30 days</div>
            </div>
            <Link href="/pricing" style={{ textDecoration: "none" }}>
              <div style={{ padding: "6px 12px", borderRadius: 8, background: "#F59E0B", color: "#fff", fontSize: 10, fontWeight: 700 }}>Upgrade</div>
            </Link>
          </div>
        )}

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, background: "#F0FDF4", borderRadius: 10, padding: "8px 14px", border: "1px solid rgba(22,163,74,0.12)" }}>
          <span style={{ fontSize: 16 }}>🎯</span>
          <span style={{ fontSize: 12, color: "#065F46", fontWeight: 600 }}>{practiceCount.toLocaleString()} sessions this month</span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", marginLeft: "auto", animation: "pulseDot 2s ease infinite" }} />
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Choose Your Exam</div>

        <div className="desktop-2col">
          {PRACTICE_CATS.map((c, i) => (
            <button key={c.id} className="anim-up" onClick={() => { setCat(c); setStage(c.stages[0]); setScr("stage"); }} style={{
              display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "15px 16px",
              borderRadius: 14, background: "#FFFFFF", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
              cursor: "pointer", textAlign: "left", color: "#111827", animationDelay: `${i * 0.05}s`, marginBottom: 0,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 1 }}>{c.sub}</div>
                <div style={{ fontSize: 10, color: c.color, fontWeight: 600, marginTop: 3 }}>{c.stages.length} stages</div>
              </div>
              <span style={{ color: "#9CA3AF", fontSize: 18 }}>→</span>
            </button>
          ))}
        </div>

        {/* Prepare nudge */}
        <Link href="/prepare" style={{ textDecoration: "none" }}>
          <div style={{
            marginTop: 18, display: "flex", alignItems: "center", gap: 12,
            background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)", borderRadius: 14,
            padding: "14px 16px", border: "1px solid rgba(245,158,11,0.15)",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245,158,11,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>Not sure where to start?</div>
              <div style={{ fontSize: 11, color: "#B45309", marginTop: 2 }}>See month-wise study plans, books & topper tips</div>
            </div>
            <span style={{ color: "#D97706", fontSize: 14, fontWeight: 700 }}>→</span>
          </div>
        </Link>
      </div>
      <BottomNav />
    </main>
  );

  // ── SCREEN: Select Stage ──
  if (scr === "stage") return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "28px 16px" }} className="anim-up">
        <button onClick={() => setScr("sel")} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Back</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${cat.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{cat.icon}</div>
          <div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, color: "#111827", margin: 0 }}>{cat.title}</h2>
            <p style={{ color: "#6B7280", fontSize: 12, margin: "2px 0 0" }}>{cat.sub}</p>
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Select Stage</div>

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
              <div style={{ background: `${cat.color}10`, color: cat.color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, flexShrink: 0 }}>{s.questionCount}Q</div>
            </div>
          </button>
        ))}

        <button onClick={begin} style={{
          width: "100%", marginTop: 18, padding: "14px",
          background: cat.color, color: "#fff", border: "none", borderRadius: 12,
          fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px ${cat.color}30`,
        }}>
          {!isLoggedIn ? "Sign In to Start →" : (subStatus && !subStatus.canTakeTest) ? "Upgrade to Continue →" : `Start ${stage.label} →`}
        </button>

        {isLoggedIn && subStatus && !subStatus.isPro && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>
              {subStatus.freeTestsRemaining > 0
                ? `${subStatus.freeTestsRemaining} free test${subStatus.freeTestsRemaining > 1 ? "s" : ""} remaining this month`
                : "Free tests used up — "}
              {subStatus.freeTestsRemaining <= 0 && <Link href="/pricing" style={{ color: "#2563EB", fontWeight: 600 }}>Upgrade to Pro</Link>}
            </span>
          </div>
        )}
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
          {sc.weakest_topic && <div style={{ borderRadius: 10, padding: "10px 14px", textAlign: "left", marginBottom: 10, background: "#FEF2F2", borderLeft: "3px solid #DC2626" }}><div style={{ fontSize: 9, fontWeight: 700, color: "#DC2626", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Weakest Area</div><div style={{ fontSize: 12, color: "#374151" }}>{sc.weakest_topic as string}</div></div>}
          {sc.summary && <div style={{ borderRadius: 10, padding: "10px 14px", textAlign: "left", marginBottom: 10, background: `${cat.color}06`, borderLeft: `3px solid ${cat.color}` }}><div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Summary</div><div style={{ fontSize: 12, color: "#374151" }}>{sc.summary as string}</div></div>}
          {sc.tip && <div style={{ borderRadius: 10, padding: "10px 14px", textAlign: "left", marginBottom: 16, background: "#FFFBEB", borderLeft: "3px solid #F59E0B" }}><div style={{ fontSize: 9, fontWeight: 700, color: "#D97706", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>💡 Tip</div><div style={{ fontSize: 12, color: "#374151" }}>{sc.tip as string}</div></div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setScr("stage")} style={{ flex: 1, padding: "13px", background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Try Another</button>
            <button onClick={begin} style={{ flex: 1, padding: "13px", background: cat.color, color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Retry</button>
          </div>
          <Link href="/dashboard" style={{ textDecoration: "none", display: "block", marginTop: 10 }}>
            <div style={{ padding: "11px", borderRadius: 10, border: "1px solid var(--border)", textAlign: "center", fontSize: 12, fontWeight: 600, color: "#6B7280" }}>📊 View All My Scores →</div>
          </Link>
          {subStatus && !subStatus.isPro && (
            <Link href="/pricing" style={{ textDecoration: "none", display: "block", marginTop: 8 }}>
              <div style={{ padding: "10px", borderRadius: 10, background: "linear-gradient(90deg, #2563EB, #0D9488)", color: "#fff", textAlign: "center", fontSize: 11, fontWeight: 700 }}>🚀 Upgrade to Pro — Unlimited Practice</div>
            </Link>
          )}
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
          <div><div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{cat.title} — {stage.label}</div><div style={{ fontSize: 10, color: "#6B7280" }}>Q {Math.min(qn, maxQ)} of {maxQ}</div></div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>{Array.from({ length: maxQ }, (_, n) => (<div key={n} style={{ width: 16, height: 3, borderRadius: 2, background: n < qn ? cat.color : "#E5E7EB" }} />))}</div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px", maxWidth: 720, margin: "0 auto", width: "100%" }} className="no-scroll">
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }} className="anim-up">
            <div style={{
              maxWidth: "84%", padding: "11px 15px", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
              borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.role === "user" ? cat.color : "#FFFFFF",
              color: m.role === "user" ? "#fff" : "#374151",
              border: m.role === "user" ? "none" : "1px solid var(--border)", boxShadow: m.role === "user" ? "none" : "var(--shadow-sm)",
            }}>
              {m.role === "assistant" && <div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{isMcq ? "Examiner" : "Interviewer"}</div>}
              {m.content}
            </div>
          </div>
        ))}
        {ld && <div style={{ display: "flex", gap: 4, padding: "10px 16px", background: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 14, width: "fit-content", boxShadow: "var(--shadow-sm)" }}>{[0, 1, 2].map(n => <div key={n} style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color, animation: `pulseDot 1.2s ease ${n * 0.2}s infinite` }} />)}</div>}
        {er && <p style={{ fontSize: 11, color: "#DC2626", background: "rgba(220,38,38,0.06)", padding: "8px 12px", borderRadius: 8, textAlign: "center" }}>{er}</p>}
        <div ref={end} />
      </div>
      <div style={{ padding: "8px 14px 16px", borderTop: "1px solid var(--border)", flexShrink: 0, background: "var(--bg)", maxWidth: 720, margin: "0 auto", width: "100%" }}>
        {isMcq && (
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            {["A", "B", "C", "D"].map(opt => (
              <button key={opt} onClick={() => !ld && sendMcq(opt)} disabled={ld}
                style={{ flex: 1, padding: "10px", borderRadius: 10, fontSize: 15, fontWeight: 700, border: `1.5px solid ${cat.color}20`, background: `${cat.color}06`, color: cat.color, cursor: ld ? "default" : "pointer" }}>{opt}</button>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <textarea ref={iRef} value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={isMcq ? "Type A, B, C, or D" : "Type your answer..."} disabled={ld} rows={isMcq ? 1 : 2}
            style={{ flex: 1, background: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#111827", resize: "none", fontFamily: "inherit", outline: "none" }} />
          <button onClick={send} disabled={ld || !inp.trim()} style={{ width: 40, height: 40, borderRadius: 10, border: "none", fontSize: 17, cursor: "pointer", flexShrink: 0, background: !inp.trim() || ld ? "rgba(0,0,0,0.04)" : cat.color, color: !inp.trim() || ld ? "#9CA3AF" : "#fff" }}>↑</button>
        </div>
      </div>
    </main>
  );
}
