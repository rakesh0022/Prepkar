"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { JOBS, JOB_CATEGORIES, type Job } from "@/components/data";

/* ── JOB DETAIL SHEET ── */
function JobSheet({ job, onClose }: { job: Job; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "life" | "roadmap">("overview");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(180deg, #14151e, #111219)", borderRadius: "22px 22px 0 0",
        maxHeight: "93vh", overflow: "auto", paddingBottom: 32,
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.12)" }} />
        </div>

        <div style={{ padding: "0 20px" }}>
          {/* Header */}
          <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
            {job.isNew && <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>NEW</span>}
            {job.isHot && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>🔥 TRENDING</span>}
          </div>
          <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, lineHeight: 1.25, marginBottom: 2 }}>{job.title}</h2>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>{job.org}</p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
            {[
              { l: "Vacancies", v: job.vacancies.toLocaleString(), i: "👥" },
              { l: "In-Hand Salary", v: job.inHand, i: "💰" },
              { l: "Last Date", v: job.lastDate, i: "📅" },
              { l: "Post / Grade", v: job.grade.length > 35 ? job.grade.slice(0, 35) + "…" : job.grade, i: "📊" },
            ].map((s, i) => (
              <div key={i} style={{ background: "var(--bg-card)", borderRadius: 10, padding: "10px 12px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2 }}>{s.i} {s.l}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 18, background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 3 }}>
            {(["overview", "life", "roadmap"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "9px 0", borderRadius: 8, fontSize: 12, fontWeight: 600,
                border: "none", cursor: "pointer", transition: "all 0.2s",
                background: tab === t ? "var(--accent)" : "transparent",
                color: tab === t ? "#000" : "var(--text-muted)",
              }}>
                {t === "overview" ? "Overview" : t === "life" ? "Life & Salary" : "Roadmap"}
              </button>
            ))}
          </div>

          {/* TAB: Overview */}
          {tab === "overview" && (
            <div className="anim-fade">
              <Block color="#16a34a" icon="💡" title="Why People Choose This Job" text={job.whyPeopleChoose} />
              <Block color="#f59e0b" icon="⚡" title="Challenges & Reality" text={job.challenges} />
              <Block color="#8b5cf6" icon="📋" title="Eligibility" text={job.eligibility} />
              <Block color="#ec4899" icon="📝" title="Exam Stages" text={job.exam} />
            </div>
          )}

          {/* TAB: Life & Salary */}
          {tab === "life" && (
            <div className="anim-fade">
              <Block color="#3b82f6" icon="🏠" title="Life After Selection" text={job.lifestyle} />
              <Block color="#8b5cf6" icon="📋" title="A Typical Day" text={job.dayInLife} />
              <Block color="#16a34a" icon="📈" title="Career Growth" text={job.career} />
              {/* Benefits */}
              <div style={{ borderRadius: 12, padding: "14px", marginBottom: 14, background: "rgba(245,158,11,0.05)", borderLeft: "3px solid #f59e0b" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🎁 Benefits & Perks</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {job.benefits.map((b, i) => (
                    <span key={i} style={{ background: "rgba(245,158,11,0.08)", color: "#fcd34d", fontSize: 10, padding: "4px 9px", borderRadius: 6, fontWeight: 500 }}>✓ {b}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Roadmap */}
          {tab === "roadmap" && (
            <div className="anim-fade">
              <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }}>
                Your step-by-step path from application to career growth:
              </p>
              <div style={{ position: "relative", paddingLeft: 28 }}>
                {/* Vertical line */}
                <div style={{
                  position: "absolute", left: 10, top: 8, bottom: 8, width: 2,
                  background: "linear-gradient(to bottom, var(--accent), rgba(52,211,153,0.1))",
                  borderRadius: 2,
                }} />
                {job.roadmap.map((r, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: i === job.roadmap.length - 1 ? 0 : 20 }}>
                    {/* Dot */}
                    <div style={{
                      position: "absolute", left: -22, top: 3, width: 16, height: 16,
                      borderRadius: "50%", background: "var(--bg-deep)",
                      border: "2px solid var(--accent)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 8,
                    }}>{r.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>
                      {r.step}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {r.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Link href="/interview" style={{ textDecoration: "none" }}>
            <div style={{
              width: "100%", padding: "14px", marginTop: 20,
              background: "linear-gradient(135deg, #059669, #0d9488)",
              borderRadius: 12, fontSize: 14, fontWeight: 700,
              color: "#fff", textAlign: "center",
            }}>
              🎯 Practice Interview for This Role
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Block({ color, icon, title, text }: { color: string; icon: string; title: string; text: string }) {
  return (
    <div style={{ borderRadius: 12, padding: "14px", marginBottom: 14, background: `${color}08`, borderLeft: `3px solid ${color}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{icon} {title}</div>
      <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{text}</div>
    </div>
  );
}

/* ── INNER (needs Suspense for useSearchParams) ── */
function JobsInner() {
  const params = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Job | null>(null);

  useEffect(() => {
    const id = params.get("id");
    if (id) { const f = JOBS.find(j => j.id === id); if (f) setSelected(f); }
  }, [params]);

  const list = filter === "all" ? JOBS : JOBS.filter(j => j.category === filter);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 40, padding: "12px 16px",
        background: "rgba(12,13,20,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Link href="/" style={{ color: "var(--text-muted)", fontSize: 13, textDecoration: "none" }}>←</Link>
          <h1 style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 800 }}>Explore Careers</h1>
        </div>
        <div className="no-scroll" style={{ display: "flex", gap: 5, overflowX: "auto" }}>
          <Pill label={`All (${JOBS.length})`} active={filter === "all"} color="#059669" onClick={() => setFilter("all")} />
          {JOB_CATEGORIES.map(c => {
            const n = JOBS.filter(j => j.category === c.id).length;
            return n > 0 ? <Pill key={c.id} label={`${c.icon} ${c.label}`} active={filter === c.id} color={c.color} onClick={() => setFilter(c.id)} /> : null;
          })}
        </div>
      </header>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "14px 16px" }}>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>
          Tap any career to see lifestyle, salary, daily routine, and your complete roadmap to selection.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {list.map(job => (
            <div key={job.id} onClick={() => setSelected(job)} style={{
              background: "var(--bg-card)", borderRadius: 14, padding: "15px 16px",
              border: "1px solid var(--border)", cursor: "pointer", transition: "border-color 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 5, marginBottom: 4 }}>
                    {job.isNew && <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>NEW</span>}
                    {job.isHot && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>🔥 TRENDING</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>{job.title}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{job.org}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "var(--accent)", fontFamily: "'Outfit'" }}>{job.vacancies.toLocaleString()}</div>
                  <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>posts</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>💰 {job.inHand}</span>
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>📅 {job.lastDate}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 8, fontWeight: 600 }}>
                Lifestyle · Salary · Roadmap · Career Path →
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <JobSheet job={selected} onClose={() => setSelected(null)} />}
      <BottomNav />
    </main>
  );
}

function Pill({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 13px", borderRadius: 14, fontSize: 11, fontWeight: 600,
      border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
      background: active ? color : "var(--bg-card)", color: active ? "#fff" : "var(--text-muted)",
      transition: "all 0.2s",
    }}>{label}</button>
  );
}

export default function JobsPage() {
  return <Suspense><JobsInner /></Suspense>;
}
