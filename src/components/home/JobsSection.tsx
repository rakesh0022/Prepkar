"use client";
import { useState } from "react";
import Link from "next/link";
import type { Job } from "@/components/data";
import { JOB_CATEGORIES } from "@/components/data";

interface Props {
  jobs: Job[];
}

export default function JobsSection({ jobs }: Props) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? jobs.slice(0, 4) : jobs.filter(j => j.category === filter).slice(0, 4);

  return (
    <section className="fade-up-d5" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: 1.5, textTransform: "uppercase", paddingLeft: 2 }}>
          💼 Latest Government Jobs
        </div>
        <Link href="/jobs" style={{ fontSize: 11, color: "#34d399", fontWeight: 600, textDecoration: "none" }}>
          View All →
        </Link>
      </div>

      {/* Filter chips */}
      <div className="hide-scrollbar" style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12, paddingBottom: 2 }}>
        <button onClick={() => setFilter("all")} style={{
          padding: "5px 14px", borderRadius: 16, fontSize: 11, fontWeight: 600,
          border: "none", cursor: "pointer", flexShrink: 0,
          background: filter === "all" ? "#059669" : "rgba(255,255,255,0.04)",
          color: filter === "all" ? "#fff" : "#888",
        }}>All</button>
        {JOB_CATEGORIES.slice(0, 5).map(c => (
          <button key={c.id} onClick={() => setFilter(c.id)} style={{
            padding: "5px 12px", borderRadius: 16, fontSize: 11, fontWeight: 600,
            border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
            background: filter === c.id ? c.color : "rgba(255,255,255,0.04)",
            color: filter === c.id ? "#fff" : "#888",
          }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(job => (
          <Link key={job.id} href={`/jobs?id=${job.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{
              background: "rgba(255,255,255,0.025)", borderRadius: 14, padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 5, marginBottom: 5, flexWrap: "wrap" }}>
                    {job.isNew && <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>NEW</span>}
                    {job.isHot && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>🔥 HOT</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6", marginBottom: 2, lineHeight: 1.3 }}>{job.title}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{job.org}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#34d399", fontFamily: "'Outfit',sans-serif" }}>{job.vacancies.toLocaleString()}</div>
                  <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase" }}>posts</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>💰 {job.inHand} in-hand</span>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>📅 {job.lastDate}</span>
              </div>
              <div style={{ fontSize: 11, color: "#34d399", marginTop: 6, fontWeight: 600 }}>
                Salary • Lifestyle • Career Path →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
