"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface PracticeSession {
  id: string;
  created_at: string;
  exam_name: string;
  stage_name: string;
  score_overall: number;
  score_data: Record<string, unknown>;
  question_count: number;
}

function WeeklyStreak({ sessions }: { sessions: PracticeSession[] }) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const sessionDates = new Set(sessions.map(s => new Date(s.created_at).toDateString()));
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const currentStreak = (() => {
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (sessionDates.has(d.toDateString())) streak++;
      else if (i > 0) break;
    }
    return streak;
  })();

  return (
    <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>This Week</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 16 }}>🔥</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#D97706" }}>{currentStreak} day streak</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, textAlign: "center" }}>
        {days.map((d, i) => {
          const active = sessionDates.has(d.toDateString());
          const isToday = d.toDateString() === today.toDateString();
          return (
            <div key={i}>
              <div style={{ fontSize: 9, color: "#9CA3AF", marginBottom: 4, fontWeight: 600 }}>{dayLabels[d.getDay()]}</div>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", margin: "0 auto",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? "linear-gradient(135deg, #16A34A, #0D9488)" : isToday ? "#F3F4F6" : "transparent",
                border: isToday && !active ? "2px dashed #D1D5DB" : "none",
              }}>
                {active ? <span style={{ color: "#fff", fontSize: 11 }}>✓</span> : <span style={{ color: "#D1D5DB", fontSize: 10 }}>{d.getDate()}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeakAreas({ sessions }: { sessions: PracticeSession[] }) {
  if (sessions.length < 2) return null;
  const examScores: Record<string, { total: number; count: number }> = {};
  sessions.forEach(s => {
    if (!examScores[s.exam_name]) examScores[s.exam_name] = { total: 0, count: 0 };
    examScores[s.exam_name].total += s.score_overall || 0;
    examScores[s.exam_name].count++;
  });
  const sorted = Object.entries(examScores)
    .map(([name, d]) => ({ name, avg: Math.round(d.total / d.count), count: d.count }))
    .sort((a, b) => a.avg - b.avg);
  const weak = sorted.filter(s => s.avg < 7).slice(0, 3);
  const strong = sorted.filter(s => s.avg >= 7).slice(-2);
  if (weak.length === 0 && strong.length === 0) return null;

  return (
    <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Performance Insights</div>
      {weak.length > 0 && (
        <>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Needs Improvement</div>
          {weak.map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < weak.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: 12, color: "#374151" }}>{w.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 60, height: 5, borderRadius: 3, background: "#FEE2E2", overflow: "hidden" }}>
                  <div style={{ width: `${w.avg * 10}%`, height: "100%", borderRadius: 3, background: "#DC2626" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", width: 30, textAlign: "right" }}>{w.avg}/10</span>
              </div>
            </div>
          ))}
        </>
      )}
      {strong.length > 0 && (
        <>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", letterSpacing: 1, textTransform: "uppercase", marginTop: weak.length > 0 ? 14 : 0, marginBottom: 8 }}>Strong Areas</div>
          {strong.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < strong.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: 12, color: "#374151" }}>{s.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 60, height: 5, borderRadius: 3, background: "#DCFCE7", overflow: "hidden" }}>
                  <div style={{ width: `${s.avg * 10}%`, height: "100%", borderRadius: 3, background: "#16A34A" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", width: 30, textAlign: "right" }}>{s.avg}/10</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setUser(user);
    const { data } = await supabase.from("practice_sessions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(50);
    setSessions(data || []);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleSignOut() { await supabase.auth.signOut(); router.push("/"); router.refresh(); }

  if (loading) return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#6B7280", fontSize: 13 }}>Loading...</p>
    </main>
  );

  const totalSessions = sessions.length;
  const avgScore = totalSessions > 0 ? Math.round(sessions.reduce((a, s) => a + (s.score_overall || 0), 0) / totalSessions) : 0;
  const bestScore = totalSessions > 0 ? Math.max(...sessions.map(s => s.score_overall || 0)) : 0;
  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Aspirant";
  const lastSession = sessions[0];
  const examsTried = new Set(sessions.map(s => s.exam_name));
  const allExams = ["SBI PO", "SSC CGL", "UPSC CSE", "RRB NTPC", "IBPS PO", "NDA/CDS"];
  const untried = allExams.filter(e => !examsTried.has(e));

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #0D9488)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: "'Outfit'" }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Hi, {userName}!</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={handleSignOut} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: "#FEF2F2", color: "#DC2626", border: "none", cursor: "pointer" }}>Sign Out</button>
        </div>
      </header>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "20px 16px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[{ n: totalSessions, l: "Sessions", c: "#2563EB" }, { n: `${avgScore}/10`, l: "Avg Score", c: "#16A34A" }, { n: `${bestScore}/10`, l: "Best", c: "#D97706" }].map((s, i) => (
            <div key={i} style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px 12px", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.c, fontFamily: "'Outfit'" }}>{s.n}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <WeeklyStreak sessions={sessions} />
        <WeakAreas sessions={sessions} />

        {/* Recommendations */}
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Recommended Next</div>
          {lastSession && lastSession.score_overall < 6 && (
            <Link href="/prepare" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "#FFFBEB", border: "1px solid rgba(245,158,11,0.15)", marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>📖</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>Review {lastSession.exam_name} Strategy</div>
                  <div style={{ fontSize: 10, color: "#B45309" }}>Last score was {lastSession.score_overall}/10 — study plan can help</div>
                </div>
                <span style={{ color: "#D97706" }}>→</span>
              </div>
            </Link>
          )}
          <Link href="/ai-practice" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "#EFF6FF", border: "1px solid rgba(37,99,235,0.12)", marginBottom: untried.length > 0 ? 8 : 0 }}>
              <span style={{ fontSize: 18 }}>🎯</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1E3A5F" }}>{lastSession ? `Continue ${lastSession.exam_name}` : "Start First Practice"}</div>
                <div style={{ fontSize: 10, color: "#3B82F6" }}>AI mock with instant scoring</div>
              </div>
              <span style={{ color: "#2563EB" }}>→</span>
            </div>
          </Link>
          {untried.length > 0 && (
            <Link href="/ai-practice" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "#F0FDF4", border: "1px solid rgba(22,163,74,0.12)" }}>
                <span style={{ fontSize: 18 }}>🆕</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#065F46" }}>Try {untried[0]}</div>
                  <div style={{ fontSize: 10, color: "#16A34A" }}>{untried.length} exams unexplored</div>
                </div>
                <span style={{ color: "#16A34A" }}>→</span>
              </div>
            </Link>
          )}
        </div>

        {/* Quick Links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          <Link href="/current-affairs" style={{ textDecoration: "none" }}>
            <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "14px 12px", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>📰</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>Current Affairs</div>
            </div>
          </Link>
          <Link href="/prepare" style={{ textDecoration: "none" }}>
            <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "14px 12px", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>📖</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>Study Plans</div>
            </div>
          </Link>
        </div>

        {/* History */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>📊 Practice History</div>
        {sessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>📝</div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>No sessions yet</p>
            <Link href="/ai-practice" style={{ textDecoration: "none" }}>
              <div style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: "#2563EB", color: "#fff", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>Start Practicing →</div>
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sessions.slice(0, 20).map(s => {
              const date = new Date(s.created_at);
              const sc = s.score_overall >= 7 ? "#16A34A" : s.score_overall >= 5 ? "#D97706" : "#DC2626";
              return (
                <div key={s.id} style={{ background: "#FFFFFF", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, border: `3px solid ${sc}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: sc, fontFamily: "'Outfit'" }}>{s.score_overall}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{s.exam_name}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{s.stage_name} · {s.question_count}q</div>
                    <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>{date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  );
}
