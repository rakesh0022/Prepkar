"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import JobDetailSheet from "@/components/jobs/JobDetailSheet";
import { JOBS, JOB_CATEGORIES, QUALIFICATION_FILTERS, type Job, type Qualification } from "@/components/data";

const CAT_COLOR: Record<string, string> = { banking: "#0C7C59", ssc: "#2563EB", railway: "#DC2626", upsc: "#7C3AED", defence: "#0D9488", state: "#EA580C" };
const CAT_ICON: Record<string, string> = { banking: "🏦", ssc: "📋", railway: "🚂", upsc: "🏛️", defence: "🎖️", state: "🗳️" };
const CAT_BG: Record<string, string> = {
  banking: "#FFFFFF",
  ssc: "#FFFFFF",
  railway: "#FFFFFF",
  upsc: "#FFFFFF",
  defence: "#FFFFFF",
  state: "#FFFFFF",
};

function Pill({ label, on, color, click }: { label: string; on: boolean; color: string; click: () => void }) {
  return <button onClick={click} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", background: on ? color : "#FFFFFF", color: on ? "#fff" : "#6B7280", transition: "all 0.2s", boxShadow: on ? `0 2px 8px ${color}30` : "0 1px 2px rgba(0,0,0,0.04)" }}>{label}</button>;
}

function JobCard({ job, onShare }: { job: Job; onShare: (e: React.MouseEvent) => void }) {
  const color = CAT_COLOR[job.category] || "#2563EB";

  return (
    <Link href={`/jobs/${job.id}`} style={{ textDecoration: "none", display: "block" }}>
    <div className="anim-up" style={{
      background: "#FFFFFF", borderRadius: 14, overflow: "hidden",
      border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
      cursor: "pointer", marginBottom: 12,
      borderLeft: `3px solid ${color}`,
    }}>
      {/* Job thumbnail */}
      {job.image && (
        <div style={{ width: "100%", height: 100, overflow: "hidden", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={job.image}
            alt={job.title}
            width={600}
            height={400}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
          />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 40,
            background: "linear-gradient(transparent, rgba(255,255,255,0.95))",
          }} />
        </div>
      )}
      <div style={{ padding: "14px 16px" }}>
        {/* Title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 5, marginBottom: 4, flexWrap: "wrap" }}>
              {job.isNew && <span style={{ background: "#F0FDF4", color: "#16A34A", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 6 }}>NEW</span>}
              {job.isHot && <span style={{ background: "#FEF2F2", color: "#DC2626", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 6 }}>TRENDING</span>}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{job.title}</div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{job.org}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color, fontFamily: "'Outfit'" }}>{job.vacancies.toLocaleString()}</div>
            <div style={{ fontSize: 9, color: "#9CA3AF" }}>posts</div>
          </div>
        </div>

        {/* Info row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>💰 {job.inHand}/mo</span>
          <span style={{ fontSize: 12, color: "#374151" }}>📅 {job.lastDate}</span>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 5 }}>
            <span style={{ background: "#F3F4F6", color: "#6B7280", fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>🎓 {job.qualification}</span>
            <span style={{ background: "#F3F4F6", color: "#6B7280", fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>{job.difficulty}</span>
          </div>
          <button onClick={onShare} style={{
            background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 6,
            padding: "4px 10px", fontSize: 10, fontWeight: 600, cursor: "pointer",
          }}>
            Share ↗
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
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
    const text = `🎯 *${job.title}*\n🏢 ${job.org}\n👥 ${job.vacancies.toLocaleString()} vacancies\n💰 ${job.inHand}/month\n📅 Last date: ${job.lastDate}\n\nCheck full details 👇\nhttps://prepkar.vercel.app/jobs/${job.id}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  // Summary stats
  const totalVacancies = JOBS.reduce((a, j) => a + j.vacancies, 0);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <header style={{ position: "sticky", top: 0, zIndex: 40, padding: "12px 16px 10px", background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Link href="/" style={{ color: "#6B7280", fontSize: 15, textDecoration: "none", fontWeight: 600 }}>←</Link>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>Explore Careers</h1>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: 10 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#9CA3AF" }}>🔍</span>
          <input
            type="text" placeholder="Search jobs, exams, departments..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 36px 10px 36px", borderRadius: 12,
              border: "1.5px solid var(--border)", background: "#FFFFFF",
              fontSize: 13, color: "#111827", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
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

        {/* Category pills */}
        <div className="no-scroll" style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 8 }}>
          <Pill label={`All (${JOBS.length})`} on={filter === "all"} color="#2563EB" click={() => setFilter("all")} />
          {JOB_CATEGORIES.map(c => {
            const n = JOBS.filter(j => j.category === c.id).length;
            return n ? <Pill key={c.id} label={`${c.icon} ${c.label} (${n})`} on={filter === c.id} color={c.color} click={() => setFilter(c.id)} /> : null;
          })}
        </div>

        {/* Qualification filter */}
        <div className="no-scroll" style={{ display: "flex", gap: 5, overflowX: "auto" }}>
          {QUALIFICATION_FILTERS.map(q => (
            <button key={q.id} onClick={() => setQualFilter(q.id)} style={{
              padding: "4px 12px", borderRadius: 10, fontSize: 10, fontWeight: 600,
              border: qualFilter === q.id ? "1.5px solid #2563EB" : "1px solid rgba(0,0,0,0.06)",
              background: qualFilter === q.id ? "#EFF6FF" : "#FFFFFF",
              color: qualFilter === q.id ? "#2563EB" : "#9CA3AF",
              cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
            }}>🎓 {q.label}</button>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "14px 16px" }}>

        {/* Summary banner */}
        {!search && filter === "all" && qualFilter === "all" && (
          <div style={{
            display: "flex", gap: 8, marginBottom: 16,
            background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)",
            borderRadius: 14, padding: "14px 16px",
            border: "1px solid rgba(37,99,235,0.1)",
          }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#2563EB", fontFamily: "'Outfit'" }}>{JOBS.length}</div>
              <div style={{ fontSize: 9, color: "#6B7280", fontWeight: 600 }}>CAREERS</div>
            </div>
            <div style={{ width: 1, background: "rgba(0,0,0,0.06)" }} />
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#16A34A", fontFamily: "'Outfit'" }}>{(totalVacancies / 1000).toFixed(0)}K+</div>
              <div style={{ fontSize: 9, color: "#6B7280", fontWeight: 600 }}>VACANCIES</div>
            </div>
            <div style={{ width: 1, background: "rgba(0,0,0,0.06)" }} />
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#D97706", fontFamily: "'Outfit'" }}>6</div>
              <div style={{ fontSize: 9, color: "#6B7280", fontWeight: 600 }}>CATEGORIES</div>
            </div>
          </div>
        )}

        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>No jobs match {search ? `"${search}"` : "your filters"}</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>Try a different search or filter</p>
          </div>
        )}

        <div className="desktop-2col">
          {list.map((job, i) => (
            <div key={job.id} style={{ animationDelay: `${Math.min(i * 0.04, 0.3)}s` }}>
              <JobCard job={job} onShare={(e) => shareJob(e, job)} />
            </div>
          ))}
        </div>
      </div>
      {sel && <JobDetailSheet job={sel} onClose={() => setSel(null)} />}
      <BottomNav />
    </main>
  );
}

export default function JobsPage() { return <Suspense><JobsInner /></Suspense>; }
