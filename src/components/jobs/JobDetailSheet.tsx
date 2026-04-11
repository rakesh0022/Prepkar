"use client";
import Link from "next/link";
import type { Job } from "@/components/data";

const DIFF_COLOR: Record<string, string> = {
  "Moderate": "#16A34A",
  "Hard": "#D97706",
  "Very Hard": "#DC2626",
};

function SectionLabel({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
      <span>{icon}</span>{text}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "16px 0" }} />;
}

export default function JobDetailSheet({ job, onClose }: { job: Job; onClose: () => void }) {
  const diffColor = DIFF_COLOR[job.difficulty] ?? "#6B7280";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }} />

      <div style={{
        position: "relative", background: "#FFFFFF",
        borderRadius: "22px 22px 0 0", width: "100%", maxWidth: 640,
        maxHeight: "93vh", overflowY: "auto", paddingBottom: 36,
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(0,0,0,0.1)" }} />
        </div>

        <div style={{ padding: "8px 20px 0" }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 16,
            background: "rgba(0,0,0,0.04)", border: "none", color: "#9CA3AF",
            borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14,
          }}>✕</button>

          {/* Hero header */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              {job.isNew && <span style={{ background: "#16A34A", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>NEW</span>}
              {job.isHot && <span style={{ background: "#DC2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>🔥 HOT</span>}
              <span style={{ background: `${diffColor}12`, color: diffColor, fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>
                {job.difficulty}
              </span>
              <span style={{ background: "#EFF6FF", color: "#2563EB", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>
                🎓 {job.qualification}
              </span>
              <span style={{ background: "rgba(0,0,0,0.04)", color: "#6B7280", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>
                ⏱ {job.prepTime} prep
              </span>
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 0 3px", lineHeight: 1.25 }}>{job.title}</h2>
            <p style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>{job.org}</p>
          </div>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[
              { l: "Vacancies", v: job.vacancies.toLocaleString(), i: "👥", hi: true },
              { l: "In-hand Salary", v: job.inHand, i: "💰", hi: true },
              { l: "Last Date", v: job.lastDate, i: "📅", hi: false },
              { l: "Grade", v: job.grade.slice(0, 38), i: "📊", hi: false },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.hi ? "#F0FDF4" : "#F9FAFB",
                borderRadius: 12, padding: "10px 12px",
                border: s.hi ? "1px solid rgba(22,163,74,0.15)" : "1px solid var(--border)",
              }}>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 3 }}>{s.i} {s.l}</div>
                <div style={{ fontSize: 12, color: s.hi ? "#16A34A" : "#111827", fontWeight: 700 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <Divider />

          {/* Why choose */}
          <SectionLabel icon="⭐" text="Why People Choose This Job" color="#D97706" />
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
            {job.whyChoose.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#16A34A", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}
          </div>

          <Divider />

          {/* Premium Career Roadmap */}
          <SectionLabel icon="🗺️" text="Your Journey — Step by Step" color="#2563EB" />
          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{
              position: "absolute", left: 15, top: 8, bottom: 8, width: 2,
              background: "linear-gradient(to bottom, #2563EB, rgba(37,99,235,0.1))",
              borderRadius: 2,
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {job.roadmap.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, paddingBottom: i < job.roadmap.length - 1 ? 16 : 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: i === job.roadmap.length - 1 ? "#2563EB" : "#FFFFFF",
                    border: "2px solid #2563EB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, zIndex: 1,
                    color: i === job.roadmap.length - 1 ? "#fff" : "#2563EB",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.15)",
                  }}>{step.icon}</div>
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{step.title}</span>
                      {step.duration && (
                        <span style={{ fontSize: 9, color: "#9CA3AF", background: "rgba(0,0,0,0.03)", padding: "2px 7px", borderRadius: 6 }}>
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 11, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Promotion path */}
          <SectionLabel icon="📈" text="Career Growth Path" color="#16A34A" />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
            {job.promotionPath.map((p, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: i === 0 ? "#EFF6FF" : "#F9FAFB",
                borderRadius: 10, padding: "12px 14px",
                border: i === 0 ? "1px solid rgba(37,99,235,0.2)" : "1px solid var(--border)",
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{p.years}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#2563EB", fontFamily: "'Outfit'" }}>{p.salary}</div>
              </div>
            ))}
          </div>

          <Divider />

          {/* Day in life */}
          <SectionLabel icon="🌅" text="A Day in This Job" color="#7C3AED" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "#FAF5FF", border: "1px solid rgba(124,58,237,0.1)",
          }}>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-line" }}>{job.dayInLife}</div>
          </div>

          {/* Lifestyle */}
          <SectionLabel icon="🏠" text="Life After Selection" color="#2563EB" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "#EFF6FF", border: "1px solid rgba(37,99,235,0.1)",
          }}>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8 }}>{job.lifestyle}</div>
          </div>

          {/* Benefits */}
          <SectionLabel icon="🎁" text="Benefits & Perks" color="#D97706" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {job.benefits.map((b, i) => (
              <span key={i} style={{
                background: "#FFFBEB", color: "#92400E",
                fontSize: 10, padding: "4px 10px", borderRadius: 8, fontWeight: 500,
                border: "1px solid rgba(245,158,11,0.15)",
              }}>✓ {b}</span>
            ))}
          </div>

          <Divider />

          {/* Fit guide */}
          <SectionLabel icon="🤔" text="Is This Job Right for You?" color="#0D9488" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{ borderRadius: 12, padding: "12px", background: "#F0FDF4", border: "1px solid rgba(22,163,74,0.15)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", marginBottom: 8 }}>✅ Choose if you...</div>
              {job.fitGuide.chooseIf.map((p, i) => (
                <div key={i} style={{ fontSize: 11, color: "#065F46", lineHeight: 1.5, marginBottom: 5, display: "flex", gap: 6 }}>
                  <span style={{ flexShrink: 0 }}>•</span><span>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 12, padding: "12px", background: "#FEF2F2", border: "1px solid rgba(220,38,38,0.15)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", marginBottom: 8 }}>⚠️ Avoid if you...</div>
              {job.fitGuide.avoidIf.map((p, i) => (
                <div key={i} style={{ fontSize: 11, color: "#7F1D1D", lineHeight: 1.5, marginBottom: 5, display: "flex", gap: 6 }}>
                  <span style={{ flexShrink: 0 }}>•</span><span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reality check */}
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "#FFFBEB", border: "1px solid rgba(245,158,11,0.15)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#B45309", marginBottom: 5 }}>💡 Reality Check</div>
            <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>{job.realityCheck}</div>
          </div>

          {/* Eligibility */}
          <SectionLabel icon="📋" text="Eligibility" color="#7C3AED" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 12,
            background: "#FAF5FF", border: "1px solid rgba(124,58,237,0.1)",
          }}>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7 }}>{job.eligibility}</div>
          </div>

          <SectionLabel icon="📝" text="Exam Stages" color="#EC4899" />
          <div style={{
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            background: "#FDF2F8", border: "1px solid rgba(236,72,153,0.1)",
          }}>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-line" }}>{job.exam}</div>
          </div>

          {/* Success story */}
          <div style={{
            borderRadius: 14, padding: "14px", marginBottom: 16,
            background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)",
            border: "1px solid rgba(22,163,74,0.15)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
              ⭐ Someone Like You Did It
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 26 }}>{job.successStory.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 3 }}>{job.successStory.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280", fontStyle: "italic", lineHeight: 1.6 }}>
                  &ldquo;{job.successStory.line}&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 8 }}>
            {job.applyLink && (
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
                <div style={{
                  padding: "13px", background: "#F9FAFB",
                  color: "#111827", border: "1px solid var(--border)",
                  borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center",
                }}>📝 Apply Now ↗</div>
              </a>
            )}
            <Link href="/interview" style={{ flex: 1, textDecoration: "none" }}>
              <div style={{
                padding: "13px", background: "linear-gradient(90deg,#2563EB,#0D9488)",
                color: "#fff", borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center",
                boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
              }}>🎯 Practice Interview</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
