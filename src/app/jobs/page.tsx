"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { JOBS, JOB_CATEGORIES, type Job } from "@/components/data";

function JobDetail({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "relative", background: "#12131a", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 640,
        maxHeight: "92vh", overflow: "auto", padding: "6px 0 32px",
      }}>
        {/* Handle bar */}
        <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 16px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.15)" }} />
        </div>
        <div style={{ padding: "0 20px" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)", border: "none", color: "#888", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✕</button>

          {/* Badges */}
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {job.isNew && <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>NEW</span>}
            {job.isHot && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>🔥 HOT</span>}
          </div>

          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 0 3px", lineHeight: 1.25 }}>{job.title}</h2>
          <p style={{ color: "#888", fontSize: 12, margin: "0 0 16px" }}>{job.org}</p>

          {/* Quick Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[
              { l: "Vacancies", v: job.vacancies.toLocaleString(), i: "👥" },
              { l: "In-hand Salary", v: job.inHand, i: "💰" },
              { l: "Last Date", v: job.lastDate, i: "📅" },
              { l: "Grade/Post", v: job.grade.slice(0, 40), i: "📊" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 3 }}>{s.i} {s.l}</div>
                <div style={{ fontSize: 12, color: "#e5e7eb", fontWeight: 600 }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Career Path */}
          <InfoBlock color="#059669" icon="📈" title="Career Growth Path" text={job.career} />

          {/* Life After Selection */}
          <InfoBlock color="#3b82f6" icon="🏠" title="Life After Selection" text={job.lifestyle} />

          {/* A Day In The Life */}
          <InfoBlock color="#8b5cf6" icon="📋" title="A Day In This Job" text={job.dayInLife} />

          {/* Benefits */}
          <div style={{ borderRadius: 12, padding: "14px 14px", marginBottom: 12, background: "rgba(245,158,11,0.06)", borderLeft: "3px solid #f59e0b" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🎁 Benefits & Perks</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {job.benefits.map((b, i) => (
                <span key={i} style={{ background: "rgba(245,158,11,0.1)", color: "#fcd34d", fontSize: 10, padding: "3px 9px", borderRadius: 6, fontWeight: 500 }}>✓ {b}</span>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <InfoBlock color="#a78bfa" icon="📋" title="Eligibility" text={job.eligibility} />

          {/* Exam Stages */}
          <InfoBlock color="#f472b6" icon="📝" title="Exam Stages" text={job.exam} />

          {/* CTA */}
          <Link href={`/interview`} style={{ textDecoration: "none" }}>
            <div style={{
              width: "100%", padding: "14px", background: "#059669", color: "#fff", border: "none",
              borderRadius: 12, fontSize: 14, fontWeight: 700, textAlign: "center", marginTop: 8, cursor: "pointer",
            }}>
              🎯 Practice Interview for This Role
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ color, icon, title, text }: { color: string; icon: string; title: string; text: string }) {
  return (
    <div style={{ borderRadius: 12, padding: "14px 14px", marginBottom: 12, background: `${color}0C`, borderLeft: `3px solid ${color}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{icon} {title}</div>
      <div style={{ fontSize: 12, color: "#c9cdd3", lineHeight: 1.7, whiteSpace: "pre-line" }}>{text}</div>
    </div>
  );
}

function JobsInner() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const found = JOBS.find(j => j.id === id);
      if (found) setSelectedJob(found);
    }
  }, [searchParams]);

  const filtered = filter === "all" ? JOBS : JOBS.filter(j => j.category === filter);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0b10", paddingBottom: 80 }}>
      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40, padding: "14px 16px",
        background: "rgba(10,11,16,0.95)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Link href="/" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>←</Link>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 800 }}>Government Jobs</h1>
        </div>
        <div className="hide-scrollbar" style={{ display: "flex", gap: 6, overflowX: "auto" }}>
          <button onClick={() => setFilter("all")} style={{ padding: "5px 14px", borderRadius: 16, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", flexShrink: 0, background: filter === "all" ? "#059669" : "rgba(255,255,255,0.04)", color: filter === "all" ? "#000" : "#888" }}>All ({JOBS.length})</button>
          {JOB_CATEGORIES.map(c => {
            const count = JOBS.filter(j => j.category === c.id).length;
            if (count === 0) return null;
            return (
              <button key={c.id} onClick={() => setFilter(c.id)} style={{ padding: "5px 12px", borderRadius: 16, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", background: filter === c.id ? c.color : "rgba(255,255,255,0.04)", color: filter === c.id ? "#fff" : "#888" }}>
                {c.icon} {c.label} ({count})
              </button>
            );
          })}
        </div>
      </header>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 16px" }}>
        <p style={{ fontSize: 12, color: "#555", marginBottom: 14 }}>Tap any job to see full salary breakdown, lifestyle details, career path, and daily routine</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(job => (
            <div key={job.id} onClick={() => setSelectedJob(job)} style={{
              background: "rgba(255,255,255,0.025)", borderRadius: 14, padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "border-color 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 5, marginBottom: 5 }}>
                    {job.isNew && <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>NEW</span>}
                    {job.isHot && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>🔥 HOT</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6", lineHeight: 1.3, marginBottom: 2 }}>{job.title}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{job.org}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#34d399", fontFamily: "'Outfit',sans-serif" }}>{job.vacancies.toLocaleString()}</div>
                  <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase" }}>posts</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>💰 {job.inHand} in-hand</span>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>📅 Last: {job.lastDate}</span>
              </div>
              <div style={{ fontSize: 11, color: "#34d399", marginTop: 6, fontWeight: 600 }}>Salary • Lifestyle • Career Path • Benefits →</div>
            </div>
          ))}
        </div>
      </div>

      {selectedJob && <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />}
      <BottomNav />
    </main>
  );
}

export default function JobsPage() {
  return <Suspense><JobsInner /></Suspense>;
}
