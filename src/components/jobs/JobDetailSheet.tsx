"use client";
import { useState } from "react";
import Link from "next/link";
import type { Job } from "@/components/data";
import { calculateSalary, CITY_TYPES, type CityType } from "@/components/data";

const DIFF_COLOR: Record<string, string> = { "Moderate": "#16A34A", "Hard": "#D97706", "Very Hard": "#DC2626" };
const CAT_COLOR: Record<string, string> = { banking: "#0C7C59", ssc: "#2563EB", railway: "#DC2626", upsc: "#7C3AED", defence: "#0D9488", state: "#EA580C" };

function SectionLabel({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 3, height: 14, background: color, borderRadius: 2, display: "inline-block" }} />
      <span>{icon}</span>{text}
    </div>
  );
}

function Divider() { return <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "18px 0" }} />; }

/* ── WhatsApp + Share ── */
function ShareBar({ job }: { job: Job }) {
  const text = `🎯 *${job.title}*\n🏢 ${job.org}\n👥 ${job.vacancies.toLocaleString()} vacancies\n💰 ${job.inHand}/month\n📅 Last date: ${job.lastDate}\n\nFull roadmap, salary & lifestyle 👇\nhttps://prepkar.vercel.app/jobs?id=${job.id}\n\n— via NaukriYatra`;
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
      <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
        <div style={{ padding: "10px", background: "#25D366", color: "#fff", borderRadius: 10, fontSize: 12, fontWeight: 700, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 2px 8px rgba(37,211,102,0.25)" }}>
          <span>📱</span> Share on WhatsApp
        </div>
      </a>
      <button onClick={() => { if (navigator.share) { navigator.share({ title: job.title, text: `${job.title} — ${job.vacancies} vacancies`, url: `https://prepkar.vercel.app/jobs?id=${job.id}` }); } else { navigator.clipboard.writeText(`https://prepkar.vercel.app/jobs?id=${job.id}`); } }}
        style={{ padding: "10px 16px", background: "#F3F4F6", color: "#374151", borderRadius: 10, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}>📋 Copy</button>
    </div>
  );
}

/* ── Salary Calculator ── */
function SalaryCalc({ job }: { job: Job }) {
  const [city, setCity] = useState<CityType>("metro");
  if (!job.salaryBreakdown) return null;
  const c = calculateSalary(job.salaryBreakdown, city);
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16, border: "1px solid rgba(37,99,235,0.12)" }}>
      <div style={{ background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)", padding: "14px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 10 }}>💰 Salary Calculator</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {CITY_TYPES.map(ct => (
            <button key={ct.id} onClick={() => setCity(ct.id)} style={{ flex: 1, padding: "8px 4px", borderRadius: 8, fontSize: 11, fontWeight: 600, border: city === ct.id ? "1.5px solid #2563EB" : "1px solid rgba(0,0,0,0.06)", background: city === ct.id ? "#DBEAFE" : "#FFF", color: city === ct.id ? "#1D4ED8" : "#6B7280", cursor: "pointer", textAlign: "center" }}>{ct.label}</button>
          ))}
        </div>
        <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 10 }}>{CITY_TYPES.find(ct => ct.id === city)?.examples}</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#6B7280" }}>Monthly In-Hand</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#16A34A", fontFamily: "'Outfit'" }}>₹{c.inHand.toLocaleString()}</div>
        </div>
      </div>
      <div style={{ padding: "12px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", marginBottom: 8, letterSpacing: 0.5 }}>BREAKDOWN</div>
        {[{ l: "Basic Pay", v: c.basic, cl: "#2563EB" }, { l: "DA", v: c.da, cl: "#0D9488" }, { l: `HRA (${city})`, v: c.hra, cl: "#D97706" }, { l: "Transport", v: c.ta, cl: "#7C3AED" }, { l: "Other Allowances", v: c.other, cl: "#EA580C" }].map((it, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 4 ? "1px solid rgba(0,0,0,0.03)" : "none" }}>
            <span style={{ fontSize: 12, color: "#374151" }}>{it.l}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: it.cl, fontFamily: "'Outfit'" }}>₹{it.v.toLocaleString()}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 4px", borderTop: "1.5px solid rgba(0,0,0,0.06)", marginTop: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>Gross</span><span style={{ fontSize: 14, fontWeight: 800, fontFamily: "'Outfit'" }}>₹{c.gross.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
          <span style={{ fontSize: 11, color: "#DC2626" }}>− NPS (10%)</span><span style={{ fontSize: 11, fontWeight: 600, color: "#DC2626" }}>−₹{c.nps.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#F0FDF4", borderRadius: 8, marginTop: 6, border: "1px solid rgba(22,163,74,0.12)" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#16A34A" }}>In-Hand</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: "#16A34A", fontFamily: "'Outfit'" }}>₹{c.inHand.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Premium Career Path — Horizontal scroll with gradient cards ── */
function CareerPath({ promotionPath, color }: { promotionPath: Job["promotionPath"]; color: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div className="no-scroll" style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
        {promotionPath.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === promotionPath.length - 1;
          const opacity = 0.5 + (i / promotionPath.length) * 0.5;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {/* Card */}
              <div style={{
                minWidth: 130, borderRadius: 14, padding: "14px 12px",
                background: isFirst ? `${color}10` : isLast ? "linear-gradient(135deg, #F0FDF4, #ECFDF5)" : "#FFFFFF",
                border: isFirst ? `1.5px solid ${color}30` : isLast ? "1.5px solid rgba(22,163,74,0.2)" : "1px solid var(--border)",
                textAlign: "center", position: "relative",
                boxShadow: isFirst || isLast ? "0 2px 12px rgba(0,0,0,0.06)" : "var(--shadow-sm)",
              }}>
                {isFirst && <div style={{ fontSize: 8, fontWeight: 700, color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>START HERE</div>}
                {isLast && <div style={{ fontSize: 8, fontWeight: 700, color: "#16A34A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>PEAK ROLE</div>}
                <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", lineHeight: 1.3, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: isLast ? "#16A34A" : color, fontFamily: "'Outfit'", opacity }}>{p.salary}</div>
                <div style={{ fontSize: 9, color: "#9CA3AF", marginTop: 3 }}>{p.years}</div>
              </div>
              {/* Arrow connector */}
              {!isLast && (
                <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 2px" }}>
                  <div style={{ width: 20, height: 2, background: `linear-gradient(90deg, ${color}40, ${color}15)` }} />
                  <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: `6px solid ${color}30` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Premium Roadmap — Alternating zigzag layout ── */
function PremiumRoadmap({ roadmap, color }: { roadmap: Job["roadmap"]; color: string }) {
  return (
    <div style={{ position: "relative", marginBottom: 16 }}>
      {/* Vertical gradient line */}
      <div style={{ position: "absolute", left: 19, top: 12, bottom: 12, width: 2.5, background: `linear-gradient(to bottom, ${color}, ${color}15)`, borderRadius: 2 }} />
      {roadmap.map((step, i) => {
        const isLast = i === roadmap.length - 1;
        const progress = (i / (roadmap.length - 1)) * 100;
        return (
          <div key={i} style={{ display: "flex", gap: 16, paddingBottom: isLast ? 0 : 12, alignItems: "flex-start" }}>
            {/* Node with progress ring */}
            <div style={{
              width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
              background: isLast ? color : "#FFFFFF",
              border: `2.5px solid ${color}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, zIndex: 1,
              color: isLast ? "#fff" : color,
              boxShadow: `0 2px 10px ${color}20`,
            }}>{step.icon}</div>
            {/* Content card */}
            <div style={{
              flex: 1, borderRadius: 12, padding: "10px 14px",
              background: isLast ? `${color}08` : "#F9FAFB",
              border: isLast ? `1px solid ${color}20` : "1px solid var(--border)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{step.title}</span>
                {step.duration && (
                  <span style={{ fontSize: 9, color: "#9CA3AF", background: "rgba(0,0,0,0.03)", padding: "2px 7px", borderRadius: 6, fontWeight: 600 }}>{step.duration}</span>
                )}
              </div>
              <p style={{ fontSize: 11, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{step.detail}</p>
              {/* Progress bar */}
              <div style={{ marginTop: 6, height: 3, borderRadius: 2, background: "rgba(0,0,0,0.04)", overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${color}, ${color}80)`, transition: "width 0.5s" }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function JobDetailSheet({ job, onClose }: { job: Job; onClose: () => void }) {
  const diffColor = DIFF_COLOR[job.difficulty] ?? "#6B7280";
  const catColor = CAT_COLOR[job.category] || "#2563EB";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }} />
      <div style={{ position: "relative", background: "#FFFFFF", borderRadius: "22px 22px 0 0", width: "100%", maxWidth: 640, maxHeight: "93vh", overflowY: "auto", paddingBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}><div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(0,0,0,0.1)" }} /></div>
        <div style={{ padding: "8px 20px 0" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "rgba(0,0,0,0.04)", border: "none", color: "#9CA3AF", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✕</button>

          {/* ── Header ── */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              {job.isNew && <span style={{ background: "#16A34A", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>NEW</span>}
              {job.isHot && <span style={{ background: "#DC2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>🔥 HOT</span>}
              <span style={{ background: `${diffColor}12`, color: diffColor, fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>{job.difficulty}</span>
              <span style={{ background: "#EFF6FF", color: "#2563EB", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>🎓 {job.qualification}</span>
              <span style={{ background: "rgba(0,0,0,0.04)", color: "#6B7280", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>⏱ {job.prepTime}</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 0 3px", lineHeight: 1.25 }}>{job.title}</h2>
            <p style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>{job.org}</p>
          </div>

          <ShareBar job={job} />

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[{ l: "Vacancies", v: job.vacancies.toLocaleString(), i: "👥", hi: true }, { l: "In-hand Salary", v: job.inHand, i: "💰", hi: true }, { l: "Last Date", v: job.lastDate, i: "📅", hi: false }, { l: "Grade", v: job.grade.slice(0, 38), i: "📊", hi: false }].map((s, i) => (
              <div key={i} style={{ background: s.hi ? "#F0FDF4" : "#F9FAFB", borderRadius: 12, padding: "10px 12px", border: s.hi ? "1px solid rgba(22,163,74,0.12)" : "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 3 }}>{s.i} {s.l}</div>
                <div style={{ fontSize: 12, color: s.hi ? "#16A34A" : "#111827", fontWeight: 700 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <Divider />
          <SectionLabel icon="💰" text="Salary Calculator" color="#2563EB" />
          <SalaryCalc job={job} />

          <Divider />

          {/* ── Career Growth — Horizontal scroll ── */}
          <SectionLabel icon="📈" text="Career Growth Path" color={catColor} />
          <CareerPath promotionPath={job.promotionPath} color={catColor} />

          <Divider />

          {/* ── Premium Roadmap ── */}
          <SectionLabel icon="🗺️" text="Your Journey — Step by Step" color={catColor} />
          <PremiumRoadmap roadmap={job.roadmap} color={catColor} />

          <Divider />

          {/* ── Syllabus ── */}
          {job.syllabus && job.syllabus.length > 0 && (<>
            <SectionLabel icon="📚" text="Exam Syllabus" color="#7C3AED" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 16 }}>
              {job.syllabus.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", background: i % 2 === 0 ? "#FAF5FF" : "#FDF2F8", borderRadius: 8, border: "1px solid rgba(124,58,237,0.06)" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#7C3AED", minWidth: 16 }}>{i + 1}</span>
                  <span style={{ fontSize: 11, color: "#374151", lineHeight: 1.3 }}>{s}</span>
                </div>
              ))}
            </div>
          </>)}

          {/* ── PYQ Papers ── */}
          {job.pyqLinks && job.pyqLinks.length > 0 && (<>
            <SectionLabel icon="📝" text="Previous Year Papers" color="#EA580C" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {job.pyqLinks.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#FFF7ED", borderRadius: 10, border: "1px solid rgba(234,88,12,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>📄</span><span style={{ fontSize: 12, color: "#374151", fontWeight: 600 }}>{p.label}</span></div>
                    <span style={{ fontSize: 11, color: "#EA580C", fontWeight: 700 }}>Open →</span>
                  </div>
                </a>
              ))}
            </div>
          </>)}

          <Divider />

          {/* ── Why choose ── */}
          <SectionLabel icon="⭐" text="Why People Choose This" color="#D97706" />
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
            {job.whyChoose.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#16A34A", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}
          </div>

          <Divider />

          {/* Day in life */}
          <SectionLabel icon="🌅" text="A Day in This Job" color="#7C3AED" />
          <div style={{ borderRadius: 12, padding: "12px 14px", marginBottom: 16, background: "#FAF5FF", border: "1px solid rgba(124,58,237,0.08)" }}>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-line" }}>{job.dayInLife}</div>
          </div>

          {/* Link to full day-in-life article */}
          {(() => {
            const dayInLifeMap: Record<string, string> = {
              "ias": "ias-district-magistrate",
              "sbi-po": "sbi-po-bank-manager",
              "income-tax-inspector": "income-tax-inspector",
              "station-master": "railway-station-master",
              "rbi-grade-b": "rbi-grade-b",
              "nda": "nda-army-officer",
            };
            const articleSlug = dayInLifeMap[job.id];
            if (articleSlug) {
              return (
                <Link href={`/life/${articleSlug}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    borderRadius: 12, padding: "12px 14px", marginBottom: 16,
                    background: "linear-gradient(135deg, #F3E8FF, #FCE7F3)",
                    border: "1px solid rgba(168,85,247,0.1)",
                    display: "flex", alignItems: "center", gap: 10,
                    cursor: "pointer",
                  }}>
                    <span style={{ fontSize: 20 }}>📖</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#7C3AED" }}>Read Full Story</div>
                      <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Detailed insider account of a real day</div>
                    </div>
                    <span style={{ fontSize: 18, opacity: 0.6 }}>→</span>
                  </div>
                </Link>
              );
            }
            return null;
          })()}

          {/* Lifestyle */}
          <SectionLabel icon="🏠" text="Life After Selection" color="#2563EB" />
          <div style={{ borderRadius: 12, padding: "12px 14px", marginBottom: 16, background: "#EFF6FF", border: "1px solid rgba(37,99,235,0.08)" }}>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8 }}>{job.lifestyle}</div>
          </div>

          {/* Benefits */}
          <SectionLabel icon="🎁" text="Benefits & Perks" color="#D97706" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {job.benefits.map((b, i) => (
              <span key={i} style={{ background: "#FFFBEB", color: "#92400E", fontSize: 10, padding: "4px 10px", borderRadius: 8, fontWeight: 500, border: "1px solid rgba(245,158,11,0.12)" }}>✓ {b}</span>
            ))}
          </div>

          <Divider />

          {/* Fit guide */}
          <SectionLabel icon="🤔" text="Is This Right for You?" color="#0D9488" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{ borderRadius: 12, padding: "12px", background: "#F0FDF4", border: "1px solid rgba(22,163,74,0.12)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", marginBottom: 8 }}>✅ Choose if...</div>
              {job.fitGuide.chooseIf.map((p, i) => (<div key={i} style={{ fontSize: 11, color: "#065F46", lineHeight: 1.5, marginBottom: 5, display: "flex", gap: 6 }}><span style={{ flexShrink: 0 }}>•</span><span>{p}</span></div>))}
            </div>
            <div style={{ borderRadius: 12, padding: "12px", background: "#FEF2F2", border: "1px solid rgba(220,38,38,0.12)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", marginBottom: 8 }}>⚠️ Avoid if...</div>
              {job.fitGuide.avoidIf.map((p, i) => (<div key={i} style={{ fontSize: 11, color: "#7F1D1D", lineHeight: 1.5, marginBottom: 5, display: "flex", gap: 6 }}><span style={{ flexShrink: 0 }}>•</span><span>{p}</span></div>))}
            </div>
          </div>

          {/* Reality + Eligibility */}
          <div style={{ borderRadius: 12, padding: "12px 14px", marginBottom: 16, background: "#FFFBEB", border: "1px solid rgba(245,158,11,0.12)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#B45309", marginBottom: 5 }}>💡 Reality Check</div>
            <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>{job.realityCheck}</div>
          </div>

          <SectionLabel icon="📋" text="Eligibility" color="#7C3AED" />
          <div style={{ borderRadius: 12, padding: "12px 14px", marginBottom: 12, background: "#FAF5FF", border: "1px solid rgba(124,58,237,0.08)" }}>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7 }}>{job.eligibility}</div>
          </div>
          <SectionLabel icon="📝" text="Exam Stages" color="#EC4899" />
          <div style={{ borderRadius: 12, padding: "12px 14px", marginBottom: 16, background: "#FDF2F8", border: "1px solid rgba(236,72,153,0.08)" }}>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-line" }}>{job.exam}</div>
          </div>

          {/* Success story */}
          <div style={{ borderRadius: 14, padding: "14px", marginBottom: 16, background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: "1px solid rgba(22,163,74,0.12)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>⭐ Someone Like You Did It</div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 26 }}>{job.successStory.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 3 }}>{job.successStory.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280", fontStyle: "italic", lineHeight: 1.6 }}>&ldquo;{job.successStory.line}&rdquo;</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 8 }}>
            {job.applyLink && (<a href={job.applyLink} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}><div style={{ padding: "13px", background: "#F9FAFB", color: "#111827", border: "1px solid var(--border)", borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center" }}>📝 Apply Now ↗</div></a>)}
            <Link href="/ai-practice" style={{ flex: 1, textDecoration: "none" }}>
              <div style={{ padding: "13px", background: `linear-gradient(90deg,${catColor},#0D9488)`, color: "#fff", borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center", boxShadow: `0 4px 16px ${catColor}25` }}>🎯 Practice Interview</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
