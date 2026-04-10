"use client";
import Link from "next/link";
import type { Job } from "@/components/data";

const DIFF_COLOR: Record<string, string> = {
  "Moderate": "#16a34a",
  "Hard": "#f59e0b",
  "Very Hard": "#ef4444",
};

function SectionLabel({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
      <span>{icon}</span>{text}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "16px 0" }} />;
}

export default function JobDetailSheet({ job, onClose }: { job: Job; onClose: () => void }) {
  const diffColor = DIFF_COLOR[job.difficulty] ?? "#6b7280";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }} />

      <div style={{
        position: "relative", background: "#12131a",
        borderRadius: "22px 22px 0 0", width: "100%", maxWidth: 640,
        maxHeight: "93vh", overflowY: "auto", paddingBottom: 36,
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.12)" }} />
        </div>

        <div style={{ padding: "8px 20px 0" }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 16,
            background: "rgba(255,255,255,0.07)", border: "none", color: "#888",
            borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14,
          }}>✕</button>

          {/* ── Hero header ── */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              {job.isNew && <span style={{ background: "#059669", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>NEW</span>}
              {job.isHot && <span style={{ background: "#dc2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>🔥 HOT</span>}
              <span style={{ background: `${diffColor}20`, color: diffColor, fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>
                {job.difficulty}
              </span>
              <span style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>
                ⏱ {job.prepTime} prep
              </span>
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 0 3px", lineHeight: 1.25 }}>{job.title}</h2>
            <p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>{job.org}</p>
          </div>

          {/* ── Quick stats ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[
              { l: "Vacancies", v: job.vacancies.toLocaleString(), i: "👥", hi: true },
              { l: "In-hand Salary", v: job.inHand, i: "💰", hi: true },
              { l: "Last Date", v: job.lastDate, i: "📅", hi: false },
              { l: "Grade", v: job.grade.slice(0, 38), i: "📊", hi: false },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.hi ? "rgba(52,211,153,0.06)" : "rgba(255,255,255,0.03)",
                borderRadius: 12, padding: "10px 12px",
                border: s.hi ? "1px solid rgba(52,211,153,0.15)" : "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 3 }}>{s.i} {s.l}</div>
                <div style={{ fontSize: 12, color: s.hi ? "#34d399" : "#e5e7eb", fontWeight: 700 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── Why choose this job ── */}
          <SectionLabel icon="⭐" text="Why People Choose This Job" color="#f59e0b" />
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
            {job.whyChoose.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#34d399", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── Career Roadmap ── */}
          <SectionLabel icon="🗺️" text="Your Journey — Step by Step" color="#06b6d4" />
          <div style={{ position: "relative", marginBottom: 16 }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute", left: 15, top: 8, bottom: 8, width: 2,
              background: "linear-gradient(to bottom, #06b6d4, rgba(6,182,212,0.1))",
              borderRadius: 2,
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {job.roadmap.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, paddingBottom: i < job.roadmap.length - 1 ? 16 : 0 }}>
                  {/* Node */}
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: "#1a1b24", border: "2px solid #06b6d4",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, zIndex: 1,
                  }}>{step.icon}</div>
                  {/* Content */}
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#f3f4f6" }}>{step.title}</span>
                      {step.duration && (
                        <span style={{ fontSize: 9, color: "#4b5563", background: "rgba(255,255,255,0.04)", padding: "2px 7px", borderRadius: 6 }}>
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 11, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── A day in this job ── */}
          <SectionLabel icon="🌅" text="A Day in This Job" color="#8b5cf6" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.12)",
          }}>
            <div style={{ fontSize: 12, color: "#c9cdd3", lineHeight: 1.8, whiteSpace: "pre-line" }}>{job.dayInLife}</div>
          </div>

          {/* ── Life after selection ── */}
          <SectionLabel icon="🏠" text="Life After Selection" color="#3b82f6" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)",
          }}>
            <div style={{ fontSize: 12, color: "#c9cdd3", lineHeight: 1.8 }}>{job.lifestyle}</div>
          </div>

          {/* ── Benefits ── */}
          <SectionLabel icon="🎁" text="Benefits & Perks" color="#f59e0b" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {job.benefits.map((b, i) => (
              <span key={i} style={{
                background: "rgba(245,158,11,0.08)", color: "#fcd34d",
                fontSize: 10, padding: "4px 10px", borderRadius: 8, fontWeight: 500,
              }}>✓ {b}</span>
            ))}
          </div>

          <Divider />

          {/* ── Is this right for you? ── */}
          <SectionLabel icon="🤔" text="Is This Job Right for You?" color="#34d399" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{ borderRadius: 12, padding: "12px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4ade80", marginBottom: 8 }}>✅ Choose if you...</div>
              {job.fitGuide.chooseIf.map((p, i) => (
                <div key={i} style={{ fontSize: 11, color: "#86efac", lineHeight: 1.5, marginBottom: 5, display: "flex", gap: 6 }}>
                  <span style={{ flexShrink: 0 }}>•</span><span>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 12, padding: "12px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#f87171", marginBottom: 8 }}>⚠️ Avoid if you...</div>
              {job.fitGuide.avoidIf.map((p, i) => (
                <div key={i} style={{ fontSize: 11, color: "#fca5a5", lineHeight: 1.5, marginBottom: 5, display: "flex", gap: 6 }}>
                  <span style={{ flexShrink: 0 }}>•</span><span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Reality check ── */}
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#fbbf24", marginBottom: 5 }}>💡 Reality Check</div>
            <div style={{ fontSize: 12, color: "#fde68a", lineHeight: 1.6 }}>{job.realityCheck}</div>
          </div>

          {/* ── Career growth ── */}
          <SectionLabel icon="📈" text="Career Growth Path" color="#059669" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "rgba(5,150,105,0.06)", border: "1px solid rgba(5,150,105,0.15)",
          }}>
            <div style={{ fontSize: 12, color: "#6ee7b7", lineHeight: 1.8 }}>{job.career}</div>
          </div>

          {/* ── Eligibility & Exam ── */}
          <SectionLabel icon="📋" text="Eligibility" color="#a78bfa" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 12,
            background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.12)",
          }}>
            <div style={{ fontSize: 12, color: "#c9cdd3", lineHeight: 1.7 }}>{job.eligibility}</div>
          </div>

          <SectionLabel icon="📝" text="Exam Stages" color="#f472b6" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "rgba(244,114,182,0.06)", border: "1px solid rgba(244,114,182,0.12)",
          }}>
            <div style={{ fontSize: 12, color: "#c9cdd3", lineHeight: 1.8, whiteSpace: "pre-line" }}>{job.exam}</div>
          </div>

          {/* ── Success story ── */}
          <div style={{
            borderRadius: 14, padding: "14px", marginBottom: 16,
            background: "linear-gradient(135deg,rgba(52,211,153,0.08),rgba(6,182,212,0.05))",
            border: "1px solid rgba(52,211,153,0.15)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#34d399", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
              ⭐ Someone Like You Did It
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 26 }}>{job.successStory.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f3f4f6", marginBottom: 3 }}>{job.successStory.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", fontStyle: "italic", lineHeight: 1.6 }}>
                  &ldquo;{job.successStory.line}&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* ── CTAs ── */}
          <div style={{ display: "flex", gap: 8 }}>
            {job.applyLink && (
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
                <div style={{
                  padding: "13px", background: "rgba(255,255,255,0.06)",
                  color: "#f3f4f6", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center",
                }}>📝 Apply Now ↗</div>
              </a>
            )}
            <Link href="/interview" style={{ flex: 1, textDecoration: "none" }}>
              <div style={{
                padding: "13px", background: "linear-gradient(90deg,#059669,#0891b2)",
                color: "#fff", borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center",
                boxShadow: "0 4px 16px rgba(5,150,105,0.3)",
              }}>🎯 Practice Interview</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
