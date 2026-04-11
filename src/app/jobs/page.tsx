"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import JobDetailSheet from "@/components/jobs/JobDetailSheet";
import { JOBS, JOB_CATEGORIES, QUALIFICATION_FILTERS, type Job, type Qualification } from "@/components/data";

function Pill({ label, on, color, click }: { label: string; on: boolean; color: string; click: () => void }) {
  return <button onClick={click} style={{ padding: "5px 13px", borderRadius: 14, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", background: on ? color : "rgba(0,0,0,0.04)", color: on ? "#fff" : "#6B7280", transition: "all 0.2s" }}>{label}</button>;
}

function JobsInner() {
  const params = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [qualFilter, setQualFilter] = useState<Qualification | "all">("all");
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState<Job | null>(null);

  useEffect(() => {
    const id = params.get("id");
    if (id) { const f = JOBS.find(j => j.id === id); if (f) setSel(f); }
  }, [params]);

  const list = JOBS.filter(j => {
    const catMatch = filter === "all" || j.category === filter;
    const qualMatch = qualFilter === "all" || j.qualification === qualFilter;
    const searchMatch = !search.trim() || 
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.org.toLowerCase().includes(search.toLowerCase()) ||
      j.grade.toLowerCase().includes(search.toLowerCase()) ||
      j.category.toLowerCase().includes(search.toLowerCase());
    return catMatch && qualMatch && searchMatch;
  });

  function shareJob(e: React.MouseEvent, job: Job) {
    e.stopPropagation();
    const text = `🎯 *${job.title}*\n🏢 ${job.org}\n👥 ${job.vacancies.toLocaleString()} vacancies\n💰 ${job.inHand}/month\n📅 Last date: ${job.lastDate}\n\nCheck full details 👇\nhttps://prepkar.vercel.app/jobs?id=${job.id}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <header style={{ position: "sticky", top: 0, zIndex: 40, padding: "12px 16px", background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Link href="/" style={{ color: "#6B7280", fontSize: 13, textDecoration: "none" }}>←</Link>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#111827" }}>Explore Careers</h1>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>{list.length} jobs</span>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: 10 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#9CA3AF" }}>🔍</span>
          <input
            type="text"
            placeholder="Search jobs, exams, departments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 12px 10px 36px", borderRadius: 12,
              border: "1px solid var(--border)", background: "#FFFFFF",
              fontSize: 13, color: "#111827", outline: "none",
              fontFamily: "inherit", boxSizing: "border-box",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.06)", border: "none", borderRadius: "50%",
              width: 20, height: 20, fontSize: 10, cursor: "pointer", color: "#6B7280",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          )}
        </div>

        {/* Category filter */}
        <div className="no-scroll" style={{ display: "flex", gap: 5, overflowX: "auto", marginBottom: 8 }}>
          <Pill label={`All (${JOBS.length})`} on={filter === "all"} color="#2563EB" click={() => setFilter("all")} />
          {JOB_CATEGORIES.map(c => {
            const n = JOBS.filter(j => j.category === c.id).length;
            return n ? <Pill key={c.id} label={`${c.icon} ${c.label}`} on={filter === c.id} color={c.color} click={() => setFilter(c.id)} /> : null;
          })}
        </div>

        {/* Qualification filter */}
        <div className="no-scroll" style={{ display: "flex", gap: 5, overflowX: "auto" }}>
          {QUALIFICATION_FILTERS.map(q => (
            <button key={q.id} onClick={() => setQualFilter(q.id)} style={{
              padding: "4px 12px", borderRadius: 10, fontSize: 10, fontWeight: 600,
              border: qualFilter === q.id ? "1.5px solid #2563EB" : "1px solid rgba(0,0,0,0.08)",
              background: qualFilter === q.id ? "#EFF6FF" : "#FFFFFF",
              color: qualFilter === q.id ? "#2563EB" : "#9CA3AF",
              cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
            }}>
              🎓 {q.label}
            </button>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "14px 16px" }}>
        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>No jobs match {search ? `"${search}"` : "your filters"}</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>Try a different search or filter</p>
          </div>
        )}

        {list.map(job => (
          <div key={job.id} onClick={() => setSel(job)} style={{
            background: "#FFFFFF", borderRadius: 14, padding: "16px",
            border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
            cursor: "pointer", marginBottom: 10, transition: "box-shadow 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 4, flexWrap: "wrap" }}>
                  {job.isNew && <span style={{ background: "#16A34A", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>NEW</span>}
                  {job.isHot && <span style={{ background: "#DC2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>🔥 TRENDING</span>}
                  <span style={{ background: "#EFF6FF", color: "#2563EB", fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 8 }}>🎓 {job.qualification}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{job.title}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{job.org}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#2563EB", fontFamily: "'Outfit'" }}>{job.vacancies.toLocaleString()}</div>
                <div style={{ fontSize: 9, color: "#9CA3AF", textTransform: "uppercase" }}>posts</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "#374151" }}>💰 {job.inHand}/mo</span>
              <span style={{ fontSize: 11, color: "#374151" }}>📅 {job.lastDate}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <div style={{ fontSize: 11, color: "#2563EB", fontWeight: 600 }}>Roadmap · Salary · Syllabus →</div>
              <button
                onClick={(e) => shareJob(e, job)}
                style={{
                  background: "#25D366", color: "#fff", border: "none", borderRadius: 6,
                  padding: "4px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4,
                }}
              >
                📱 Share
              </button>
            </div>
          </div>
        ))}
      </div>
      {sel && <JobDetailSheet job={sel} onClose={() => setSel(null)} />}
      <BottomNav />
    </main>
  );
}

export default function JobsPage() { return <Suspense><JobsInner /></Suspense>; }
