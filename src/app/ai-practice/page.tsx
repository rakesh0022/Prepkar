"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import AuthGuard from "@/components/AuthGuard";
import { createClient } from "@/lib/supabase/client";
import { PRACTICE_CATS, type PracticeCategory, type PracticeStage } from "@/components/data";
import { getSubscriptionStatus, incrementTestCount, type SubscriptionStatus } from "@/lib/subscription";

interface Msg { role: "user" | "assistant"; content: string }
interface Scores { [k: string]: string | number }

function Ring({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 26, c = 2 * Math.PI * r, o = c - (score / 10) * c;
  return (<div style={{ textAlign: "center", margin: "0 5px" }}><svg width="62" height="62" viewBox="0 0 62 62"><circle cx="31" cy="31" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4.5" /><circle cx="31" cy="31" r={r} fill="none" stroke={color} strokeWidth="4.5" strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" transform="rotate(-90 31 31)" style={{ transition: "stroke-dashoffset 1s ease" }} /><text x="31" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">{score}</text></svg><div style={{ fontSize: 9, color: "#6B7280", marginTop: 1 }}>{label.replace(/_/g, " ")}</div></div>);
}

function PracticeContent() {
  const [scr, setScr] = useState<"sel" | "stage" | "chat" | "done">("sel");
  const [cat, setCat] = useState<PracticeCategory>(PRACTICE_CATS[0]);
  const [stage, setStage] = useState<PracticeStage>(PRACTICE_CATS[0].stages[0]);
  const [lang, setLang] = useState<"english" | "hindi" | "marathi" | "kannada" | "tamil">("english");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [inp, setInp] = useState("");
  const [ld, setLd] = useState(false);
  const [qn, setQn] = useState(0);
  const [sc, setSc] = useState<Scores | null>(null);
  const [er, setEr] = useState("");
  const [subStatus, setSubStatus] = useState<SubscriptionStatus | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const iRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const supabase = createClient();

  // Load subscription status on mount (user is already authenticated via AuthGuard)
  const loadSubscription = useCallback(async () => {
    const status = await getSubscriptionStatus();
    setSubStatus(status);
  }, []);

  useEffect(() => { loadSubscription(); }, [loadSubscription]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, ld]);
  useEffect(() => { if (scr === "chat" && !ld) iRef.current?.focus(); }, [scr, ld, msgs]);

  const [practiceCount] = useState(14283);

  async function api(m: Msg[]) {
    const r = await fetch("/api/interview", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: m, category: cat.id, role: `${cat.title} - ${stage.label}`, stage: stage.id, lang }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error || "Failed"); }
    return r.json();
  }

  async function begin() {
    // Check login before starting
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      window.location.href = `/login?next=/ai-practice`;
      return;
    }

    // Gate: check free test limit
    if (subStatus && !subStatus.canTakeTest) { router.push("/pricing"); return; }

    setScr("chat"); setMsgs([]); setQn(0); setSc(null); setEr(""); setLd(true);
    const isMcq = stage.id.includes("mcq") || stage.id.includes("prelims") || stage.id.includes("cbt") || stage.id === "prelims_csat" || stage.id === "written_mcq";
    const isDesc = stage.id === "descriptive" || stage.id === "mains_essay";
    const langHintMap: Record<string, string> = { hindi: " Answer in Hindi (Devanagari).", marathi: " Answer in Marathi (Devanagari).", kannada: " Answer in Kannada.", tamil: " Answer in Tamil." };
    const langHint = langHintMap[lang] || "";
    const startMsg = isMcq
      ? `I want to practice ${stage.label} for ${cat.title}. Start with the first MCQ question.${langHint}`
      : isDesc
      ? `I want to practice ${stage.label} for ${cat.title}. Give me the first writing prompt.${langHint}`
      : `I am a candidate for ${cat.title} ${stage.label}. Start with greeting and first question.${langHint}`;
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

  // ── SCREEN: Select Exam ──
  if (scr === "sel") return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* ═══ PREMIUM HERO ═══ */}
      <section className="anim-up" style={{
        background: "linear-gradient(135deg, #0F2440 0%, #1E3A5F 40%, #2563EB 100%)",
        color: "#fff", padding: "44px 16px 40px", textAlign: "center", position: "relative", overflow: "hidden",
        borderRadius: "0 0 24px 24px",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle at 30% 40%, #fff 1px, transparent 1px), radial-gradient(circle at 70% 70%, #fff 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div style={{ position: "absolute", top: -80, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(94,234,212,0.08)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(94,234,212,0.12)", borderRadius: 100, padding: "6px 16px", marginBottom: 16, backdropFilter: "blur(8px)", border: "1px solid rgba(94,234,212,0.2)" }}>
            <span style={{ fontSize: 14 }}>🎯</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#5EEAD4", letterSpacing: 0.5 }}>AI-POWERED PRACTICE</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
            Prelims to Interview<br/>
            <span style={{ color: "#5EEAD4" }}>All in One Place</span>
          </h1>
          <p style={{ fontSize: 13, opacity: 0.75, marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>
            AI scores every answer · Multi-language support · Real exam patterns
          </p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 28 }}>
            {[
              { n: "6", l: "Exams" },
              { n: "20+", l: "Stages" },
              { n: practiceCount.toLocaleString(), l: "Sessions" },
            ].map((s, i) => (
              <div key={i} className="anim-up" style={{ textAlign: "center", animationDelay: `${0.15 + i * 0.1}s` }}>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Outfit'", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 10, opacity: 0.6, marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Sub status badge */}
          {subStatus && (
            <div style={{ marginTop: 20 }}>
              {subStatus.isPro ? (
                <span className="badge badge-pro" style={{ fontSize: 11, padding: "5px 14px" }}>✨ PRO — Unlimited Access</span>
              ) : (
                <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)", padding: "5px 14px", borderRadius: 100 }}>
                  {subStatus.freeTestsRemaining} of 5 free tests remaining
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "24px 16px" }}>

        {/* ═══ QUICK LINKS — consolidated ═══ */}
        <div className="anim-up-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          <Link href="/quiz" style={{ textDecoration: "none" }}>
            <div className="card-lift" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "14px", display: "flex", alignItems: "center", gap: 10, height: "100%" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(109,40,217,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📚</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dark)" }}>Question Bank</div>
                <div style={{ fontSize: 10, color: "var(--text-light)", marginTop: 1 }}>Static MCQ sets</div>
              </div>
            </div>
          </Link>
          <Link href="/prepare" style={{ textDecoration: "none" }}>
            <div className="card-lift" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "14px", display: "flex", alignItems: "center", gap: 10, height: "100%" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📖</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dark)" }}>Study Plans</div>
                <div style={{ fontSize: 10, color: "var(--text-light)", marginTop: 1 }}>Month-wise guides</div>
              </div>
            </div>
          </Link>
        </div>

        {/* ═══ UPGRADE BANNER (free users only) ═══ */}
        {subStatus && !subStatus.isPro && (
          <Link href="/pricing" className="anim-up-2" style={{ textDecoration: "none", display: "block", marginBottom: 24 }}>
            <div style={{
              background: "linear-gradient(135deg, #F59E0B, #D97706)", borderRadius: 14,
              padding: "14px 18px", display: "flex", alignItems: "center", gap: 12,
              boxShadow: "0 4px 16px rgba(245,158,11,0.25)",
            }}>
              <span style={{ fontSize: 22 }}>💎</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Upgrade to Pro</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 1 }}>
                  Unlimited AI practice · All exams · All stages
                </div>
              </div>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>→</span>
            </div>
          </Link>
        )}

        {/* ═══ EXAM SELECTION ═══ */}
        <div className="divider-text anim-up-2" style={{ marginBottom: 16 }}>Choose Your Exam</div>

        <div className="desktop-2col">
          {PRACTICE_CATS.map((c, i) => (
            <button key={c.id} className="anim-up card-premium" onClick={() => { setCat(c); setStage(c.stages[0]); setScr("stage"); }} style={{
              display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "16px 18px",
              borderRadius: 16, background: "var(--bg-card)",
              border: "1px solid var(--border)", borderLeft: `4px solid ${c.color}`,
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer", textAlign: "left", color: "var(--text-dark)", animationDelay: `${0.15 + i * 0.05}s`, marginBottom: 0,
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: `${c.color}10`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0,
              }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-dark)" }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>{c.sub}</div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6,
                  fontSize: 10, fontWeight: 700, color: c.color,
                  background: `${c.color}0A`, padding: "3px 10px", borderRadius: 100,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.color, display: "inline-block" }} />
                  {c.stages.length} stages
                </div>
              </div>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: `${c.color}08`, color: c.color,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>→</div>
            </button>
          ))}
        </div>
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

        {/* Language selector */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, marginTop: 20 }}>🌐 Language / भाषा</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 6 }}>
          {([
            { id: "english" as const, label: "English", desc: "English" },
            { id: "hindi" as const, label: "हिंदी", desc: "Hindi" },
            { id: "marathi" as const, label: "मराठी", desc: "Marathi" },
            { id: "kannada" as const, label: "ಕನ್ನಡ", desc: "Kannada" },
            { id: "tamil" as const, label: "தமிழ்", desc: "Tamil" },
          ]).map(l => (
            <button key={l.id} onClick={() => setLang(l.id)} style={{
              padding: "10px 6px", borderRadius: 12, textAlign: "center", cursor: "pointer",
              background: lang === l.id ? `${cat.color}08` : "#FFFFFF",
              border: lang === l.id ? `2px solid ${cat.color}` : "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: lang === l.id ? cat.color : "#111827" }}>{l.label}</div>
              <div style={{ fontSize: 9, color: "#9CA3AF", marginTop: 2 }}>{l.desc}</div>
            </button>
          ))}
        </div>

        <button onClick={begin} style={{
          width: "100%", marginTop: 18, padding: "14px",
          background: cat.color, color: "#fff", border: "none", borderRadius: 12,
          fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px ${cat.color}30`,
        }}>
          {(subStatus && !subStatus.canTakeTest) ? "Upgrade to Continue →" : `Start ${stage.label} →`}
        </button>

        {subStatus && !subStatus.isPro && (
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
          {/* Share Score on WhatsApp */}
          <button onClick={() => {
            const overall = sk.find(k => k === "overall") ? sc["overall"] : sk.length > 0 ? sc[sk[0]] : 0;
            const text = `🎯 I just scored ${overall}/10 on ${cat.title} — ${stage.label} practice on NaukriYatra!\n\n${sc.weakest_topic ? `📌 Weakest: ${sc.weakest_topic}\n` : ""}${sc.tip ? `💡 Tip: ${sc.tip}\n\n` : "\n"}Try it free 👇\nhttps://prepkar.vercel.app/ai-practice`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
          }} style={{ width: "100%", marginTop: 10, padding: "12px", borderRadius: 12, border: "none", background: "#25D366", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span>📤</span> Share Score on WhatsApp
          </button>
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

export default function PracticePage() {
  return <PracticeContent />;
}
