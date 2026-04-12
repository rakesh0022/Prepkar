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

    const { data } = await supabase
      .from("practice_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    setSessions(data || []);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
        <p style={{ color: "#6B7280", fontSize: 13 }}>Loading your dashboard...</p>
      </div>
    </main>
  );

  const totalSessions = sessions.length;
  const avgScore = totalSessions > 0 ? Math.round(sessions.reduce((a, s) => a + (s.score_overall || 0), 0) / totalSessions) : 0;
  const bestScore = totalSessions > 0 ? Math.max(...sessions.map(s => s.score_overall || 0)) : 0;
  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Aspirant";

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      {/* Header */}
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #0D9488)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: "'Outfit'",
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Hi, {userName}!</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={handleSignOut} style={{
            padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600,
            background: "#FEF2F2", color: "#DC2626", border: "none", cursor: "pointer",
          }}>Sign Out</button>
        </div>
      </header>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "20px 16px" }}>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px 12px", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#2563EB", fontFamily: "'Outfit'" }}>{totalSessions}</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>Sessions</div>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px 12px", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#16A34A", fontFamily: "'Outfit'" }}>{avgScore}/10</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>Avg Score</div>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px 12px", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#D97706", fontFamily: "'Outfit'" }}>{bestScore}/10</div>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>Best Score</div>
          </div>
        </div>

        {/* Quick action */}
        <Link href="/interview" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "14px 16px", borderRadius: 14,
            background: "linear-gradient(90deg, #2563EB, #0D9488)",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 4px 16px rgba(37,99,235,0.25)", marginBottom: 24,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Start New Practice</div>
              <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>Prelims MCQ · Mains · Interview</div>
            </div>
            <span style={{ fontSize: 20 }}>🎯</span>
          </div>
        </Link>

        {/* Practice history */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
          📊 Practice History
        </div>

        {sessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>📝</div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>No practice sessions yet</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>Complete your first AI practice to see scores here</p>
            <Link href="/interview" style={{ textDecoration: "none" }}>
              <div style={{
                display: "inline-block", marginTop: 16, padding: "10px 24px",
                background: "#2563EB", color: "#fff", borderRadius: 10,
                fontSize: 13, fontWeight: 700,
              }}>Start Practicing →</div>
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sessions.map(s => {
              const date = new Date(s.created_at);
              const scoreColor = s.score_overall >= 7 ? "#16A34A" : s.score_overall >= 5 ? "#D97706" : "#DC2626";
              return (
                <div key={s.id} style={{
                  background: "#FFFFFF", borderRadius: 12, padding: "14px 16px",
                  border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  {/* Score circle */}
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                    border: `3px solid ${scoreColor}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: scoreColor, fontFamily: "'Outfit'" }}>{s.score_overall}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{s.exam_name}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{s.stage_name} · {s.question_count} questions</div>
                    <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>
                      {date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </div>
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
