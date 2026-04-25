"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useStudyPlan } from "@/hooks/useStudyPlan";
import type { StudyWeek } from "@/hooks/useStudyPlan";

// ─── Exam catalogue ───────────────────────────────────────────────────────────
const EXAMS = [
  { id: "UPSC CSE",    label: "UPSC CSE",    icon: "🏛️", color: "#7C3AED", sub: "Civil Services" },
  { id: "SSC CGL",     label: "SSC CGL",     icon: "📋", color: "#2563EB", sub: "Combined Graduate Level" },
  { id: "SSC CHSL",    label: "SSC CHSL",    icon: "📝", color: "#0891B2", sub: "Higher Secondary Level" },
  { id: "SBI PO",      label: "SBI PO",      icon: "🏦", color: "#0C7C59", sub: "Probationary Officer" },
  { id: "SBI Clerk",   label: "SBI Clerk",   icon: "🏧", color: "#059669", sub: "Junior Associate" },
  { id: "IBPS PO",     label: "IBPS PO",     icon: "🏛", color: "#0D9488", sub: "Probationary Officer" },
  { id: "IBPS Clerk",  label: "IBPS Clerk",  icon: "💳", color: "#0891B2", sub: "Clerical Cadre" },
  { id: "RBI Grade B", label: "RBI Grade B", icon: "💰", color: "#D97706", sub: "Officer Grade" },
  { id: "RRB NTPC",    label: "RRB NTPC",    icon: "🚂", color: "#DC2626", sub: "Non-Technical Popular" },
  { id: "RRB Group D", label: "RRB Group D", icon: "🛤️", color: "#B91C1C", sub: "Level 1 Posts" },
  { id: "LIC AAO",     label: "LIC AAO",     icon: "🛡️", color: "#7C3AED", sub: "Asst. Admin Officer" },
  { id: "NDA",         label: "NDA",         icon: "⚔️", color: "#1D4ED8", sub: "National Defence Academy" },
  { id: "CDS",         label: "CDS",         icon: "🎖️", color: "#1E40AF", sub: "Combined Defence Services" },
  { id: "Delhi Police",label: "Delhi Police",icon: "👮", color: "#374151", sub: "Constable / SI" },
  { id: "CAPF",        label: "CAPF / BSF",  icon: "🪖", color: "#4B5563", sub: "Central Armed Police" },
  { id: "State PSC",   label: "State PSC",   icon: "🗺️", color: "#6D28D9", sub: "State Civil Services" },
];

const EXAM_SUBJECTS: Record<string, string[]> = {
  "UPSC CSE":    ["History", "Geography", "Polity", "Economy", "Environment", "Science & Technology", "Ethics", "Essay", "Current Affairs", "CSAT"],
  "SSC CGL":     ["Quantitative Aptitude", "Reasoning", "English", "General Awareness", "Computer"],
  "SSC CHSL":    ["Quantitative Aptitude", "Reasoning", "English", "General Awareness"],
  "SBI PO":      ["Quantitative Aptitude", "Reasoning", "English", "General Awareness", "Banking Awareness", "Computer"],
  "SBI Clerk":   ["Quantitative Aptitude", "Reasoning", "English", "General/Financial Awareness", "Computer"],
  "IBPS PO":     ["Quantitative Aptitude", "Reasoning", "English", "General Awareness", "Banking Awareness", "Computer"],
  "IBPS Clerk":  ["Quantitative Aptitude", "Reasoning", "English", "General/Financial Awareness", "Computer"],
  "RBI Grade B": ["Economy & Finance", "Banking Awareness", "English", "Quantitative Aptitude", "Reasoning", "Current Affairs", "Management"],
  "RRB NTPC":    ["Mathematics", "Reasoning", "General Science", "General Awareness"],
  "RRB Group D": ["Mathematics", "Reasoning", "General Science", "General Awareness"],
  "LIC AAO":     ["Quantitative Aptitude", "Reasoning", "English", "General Knowledge", "Insurance Awareness", "Computer"],
  "NDA":         ["Mathematics", "English", "General Knowledge", "Physics", "Chemistry", "History & Geography"],
  "CDS":         ["Mathematics", "English", "General Knowledge"],
  "Delhi Police":["Reasoning", "General Knowledge", "Quantitative Aptitude", "Computer", "English"],
  "CAPF":        ["General Ability & Intelligence", "General Studies", "Essay & Comprehension", "Current Affairs"],
  "State PSC":   ["History", "Geography", "Polity", "Economy", "Current Affairs", "Reasoning", "English"],
};

const HOUR_OPTIONS = [
  { id: "1-2", label: "1–2 hrs", sub: "Job + study balance", icon: "🌅" },
  { id: "3-4", label: "3–4 hrs", sub: "Consistent daily routine", icon: "⚡" },
  { id: "5-6", label: "5–6 hrs", sub: "Serious preparation", icon: "🔥" },
  { id: "8+",  label: "8+ hrs",  sub: "Full-time aspirant", icon: "💪" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = "form" | "loading" | "plan";

interface FormData {
  exam: string;
  examDate: string;
  dailyHours: string;
  strongSubjects: string[];
  weakSubjects: string[];
  studentType: "working" | "fulltime" | "";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function daysUntil(dateStr: string) {
  return Math.max(0, Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000));
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function weekLabel(weekIdx: number, startDate: string) {
  if (!startDate) return "";
  const d = new Date(startDate);
  d.setDate(d.getDate() + weekIdx * 7);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? 20 : 8,
            height: 8,
            borderRadius: 4,
            background: i + 1 <= current ? "#2563EB" : "var(--border)",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function SubjectChip({
  label, selected, disabled, color, onToggle,
}: {
  label: string; selected: boolean; disabled: boolean; color?: string; onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      style={{
        padding: "7px 12px",
        borderRadius: 999,
        border: selected ? "none" : "1.5px solid var(--border)",
        background: selected ? (color || "#2563EB") : "var(--bg-card)",
        color: selected ? "#fff" : disabled ? "var(--text-faint)" : "var(--text-body)",
        fontSize: 12,
        fontWeight: selected ? 700 : 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "all 0.2s",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

function TaskRow({
  taskId, subject, topic, hours, resources, color, done, onToggle,
}: {
  taskId: string; subject: string; topic: string; hours: number;
  resources: string[]; color: string; done: boolean; onToggle: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "10px 0",
        borderBottom: "1px solid var(--border-light)",
        opacity: done ? 0.55 : 1,
        transition: "opacity 0.2s",
      }}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: 6,
          border: done ? "none" : `2px solid ${color}`,
          background: done ? color : "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
          fontFamily: "inherit",
        }}
      >
        {done && <span style={{ color: "#fff", fontSize: 12, lineHeight: 1 }}>✓</span>}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Subject + hours */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              background: color,
              padding: "2px 8px",
              borderRadius: 99,
            }}
          >
            {subject}
          </span>
          <span style={{ fontSize: 10, color: "var(--text-faint)", fontWeight: 600 }}>
            {hours}h
          </span>
        </div>

        {/* Topic */}
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-dark)",
            margin: 0,
            textDecoration: done ? "line-through" : "none",
            lineHeight: 1.4,
          }}
        >
          {topic}
        </p>

        {/* Resources */}
        {resources.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
            {resources.slice(0, 3).map((r, i) => (
              <span
                key={i}
                style={{
                  fontSize: 10,
                  color: "var(--text-light)",
                  background: "var(--bg-card-2)",
                  padding: "2px 7px",
                  borderRadius: 5,
                  border: "1px solid var(--border-light)",
                }}
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Printable Plan (hidden, for PDF capture) ─────────────────────────────────
function PrintablePlan({ weeks, examName, examDate }: { weeks: StudyWeek[]; examName: string; examDate: string }) {
  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", background: "#fff", padding: 24, width: 760 }}>
      <div style={{ marginBottom: 20, borderBottom: "2px solid #2563EB", paddingBottom: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: 0 }}>
          {examName} — Personalised Study Plan
        </h1>
        <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>
          Exam Date: {new Date(examDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · Generated by NaukriYatra
        </p>
      </div>

      {weeks.map((week) => (
        <div key={week.week} style={{ marginBottom: 24, pageBreakInside: "avoid" }}>
          <div style={{ background: "#1E3A5F", color: "#fff", padding: "8px 14px", borderRadius: "8px 8px 0 0" }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Week {week.week}: {week.theme}</span>
          </div>
          <div style={{ border: "1px solid #E5E7EB", borderTop: "none", borderRadius: "0 0 8px 8px" }}>
            {week.days.map((day, di) => (
              <div key={di} style={{ borderBottom: di < week.days.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                <div style={{ padding: "6px 14px", background: "#F9FAFB", fontWeight: 700, fontSize: 11, color: "#374151" }}>
                  {day.day}
                </div>
                {day.tasks.map((task, ti) => (
                  <div key={ti} style={{ display: "flex", gap: 10, padding: "6px 14px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 10, background: task.color, color: "#fff", borderRadius: 99, padding: "2px 8px", flexShrink: 0, marginTop: 1 }}>
                      {task.subject}
                    </span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{task.topic}</div>
                      <div style={{ fontSize: 10, color: "#9CA3AF" }}>{task.hours}h · {task.resources[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudyPlanPage() {
  const { plan, completedTasks, streak, progress, totalTasks, completedCount, startDate, savePlan, toggleTask, clearPlan } = useStudyPlan();

  const [scr, setScr] = useState<Screen>("form");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    exam: "", examDate: "", dailyHours: "", strongSubjects: [], weakSubjects: [], studentType: "",
  });
  const [currentWeek, setCurrentWeek] = useState(0);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Jump to plan view whenever a saved plan is loaded from localStorage
  useEffect(() => {
    if (plan && scr === "form") setScr("plan");
  // scr intentionally omitted — we only want to react to plan becoming available
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  const subjects = form.exam ? (EXAM_SUBJECTS[form.exam] ?? []) : [];

  const toggleStrong = useCallback((s: string) => {
    setForm((prev) => ({
      ...prev,
      strongSubjects: prev.strongSubjects.includes(s)
        ? prev.strongSubjects.filter((x) => x !== s)
        : [...prev.strongSubjects, s],
      // Remove from weak if added to strong
      weakSubjects: prev.weakSubjects.filter((x) => x !== s),
    }));
  }, []);

  const toggleWeak = useCallback((s: string) => {
    setForm((prev) => ({
      ...prev,
      weakSubjects: prev.weakSubjects.includes(s)
        ? prev.weakSubjects.filter((x) => x !== s)
        : [...prev.weakSubjects, s],
      // Remove from strong if added to weak
      strongSubjects: prev.strongSubjects.filter((x) => x !== s),
    }));
  }, []);

  async function generatePlan() {
    setError("");
    setScr("loading");
    try {
      const res = await fetch("/api/study-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam: form.exam,
          examDate: form.examDate,
          dailyHours: form.dailyHours,
          strongSubjects: form.strongSubjects,
          weakSubjects: form.weakSubjects,
          studentType: form.studentType,
        }),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error || "Failed to generate plan");
      }
      const data = await res.json();
      savePlan(data, form.exam, form.examDate);
      setCurrentWeek(0);
      setScr("plan");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setScr("form");
    }
  }

  async function downloadPDF() {
    if (!plan || !printRef.current) return;
    setDownloading(true);
    try {
      const el = printRef.current;
      el.style.display = "block";

      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      el.style.display = "none";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;

      let y = margin;
      let remaining = imgH;
      pdf.addImage(imgData, "PNG", margin, y, imgW, imgH);
      remaining -= pageH - margin;
      while (remaining > 0) {
        pdf.addPage();
        y = -(imgH - remaining) + margin;
        pdf.addImage(imgData, "PNG", margin, y, imgW, imgH);
        remaining -= pageH;
      }
      pdf.save(`${plan.examName.replace(/\s+/g, "-")}-Study-Plan.pdf`);
    } finally {
      if (printRef.current) printRef.current.style.display = "none";
      setDownloading(false);
    }
  }

  function restartForm() {
    clearPlan();
    setForm({ exam: "", examDate: "", dailyHours: "", strongSubjects: [], weakSubjects: [], studentType: "" });
    setStep(1);
    setError("");
    setScr("form");
  }

  // ── Step validation ──
  const canNext = ((): boolean => {
    if (step === 1) return !!form.exam;
    if (step === 2) return !!form.examDate && form.examDate > todayISO();
    if (step === 3) return !!form.dailyHours;
    if (step === 4) return true; // subjects optional
    if (step === 5) return !!form.studentType;
    return false;
  })();

  // ─── Form screen ──────────────────────────────────────────────────────────
  if (scr === "form") {
    const examObj = EXAMS.find((e) => e.id === form.exam);

    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
        <div className="desktop-only" style={{ height: 56 }} />

        {/* Hero */}
        <section style={{ background: "var(--bg-hero)", padding: "24px 16px 20px" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <Link href="/" style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, textDecoration: "none" }}>←</Link>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>
                AI Study Planner
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.25 }}>
              Your Personalised<br />Study Plan
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 6 }}>
              Answer 5 quick questions. AI generates your week-by-week plan.
            </p>
          </div>
        </section>

        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "20px 16px" }}>
          <StepDots current={step} total={5} />

          {/* Step 1 — Exam */}
          {step === 1 && (
            <div className="anim-up">
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", marginBottom: 4 }}>Which exam are you preparing for?</h2>
              <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 16 }}>Select one exam to get started.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {EXAMS.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setForm((p) => ({ ...p, exam: e.id, strongSubjects: [], weakSubjects: [] }))}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: form.exam === e.id ? `2px solid ${e.color}` : "1.5px solid var(--border)",
                      background: form.exam === e.id ? `${e.color}12` : "var(--bg-card)",
                      cursor: "pointer",
                      textAlign: "left",
                      boxShadow: form.exam === e.id ? `0 0 0 3px ${e.color}22` : "var(--shadow-sm)",
                      transition: "all 0.2s",
                      fontFamily: "inherit",
                    }}
                  >
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{e.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-dark)" }}>{e.label}</div>
                    <div style={{ fontSize: 10, color: "var(--text-light)", marginTop: 2 }}>{e.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Exam Date */}
          {step === 2 && (
            <div className="anim-up">
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", marginBottom: 4 }}>
                When is your {form.exam} exam?
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 20 }}>
                We'll plan backwards from this date.
              </p>
              <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 20, border: "1.5px solid var(--border)" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-light)", display: "block", marginBottom: 8 }}>
                  EXPECTED EXAM DATE
                </label>
                <input
                  type="date"
                  value={form.examDate}
                  min={todayISO()}
                  onChange={(e) => setForm((p) => ({ ...p, examDate: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1.5px solid var(--border)",
                    fontSize: 15,
                    color: "var(--text-dark)",
                    background: "#F9FAFB",
                    fontFamily: "inherit",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {form.examDate && new Date(form.examDate) > new Date() && (
                  <p style={{ fontSize: 12, color: "#16A34A", marginTop: 10, fontWeight: 600 }}>
                    ✓ {daysUntil(form.examDate)} days remaining — plan will cover{" "}
                    {Math.min(12, Math.max(4, Math.ceil(daysUntil(form.examDate) / 7)))} weeks
                  </p>
                )}
                {form.examDate && form.examDate <= todayISO() && (
                  <p style={{ fontSize: 12, color: "#DC2626", marginTop: 10 }}>Please select a future date.</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3 — Daily Hours */}
          {step === 3 && (
            <div className="anim-up">
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", marginBottom: 4 }}>
                How many hours can you study daily?
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 16 }}>
                Be realistic — consistency beats cramming.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {HOUR_OPTIONS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setForm((p) => ({ ...p, dailyHours: h.id }))}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 16px",
                      borderRadius: 14,
                      border: form.dailyHours === h.id ? "2px solid #2563EB" : "1.5px solid var(--border)",
                      background: form.dailyHours === h.id ? "#EFF6FF" : "var(--bg-card)",
                      cursor: "pointer",
                      textAlign: "left",
                      boxShadow: form.dailyHours === h.id ? "0 0 0 3px rgba(37,99,235,0.12)" : "var(--shadow-sm)",
                      transition: "all 0.2s",
                      fontFamily: "inherit",
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{h.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: form.dailyHours === h.id ? "#2563EB" : "var(--text-dark)" }}>
                        {h.label}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>{h.sub}</div>
                    </div>
                    {form.dailyHours === h.id && (
                      <span style={{ marginLeft: "auto", color: "#2563EB", fontSize: 18 }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Subjects */}
          {step === 4 && (
            <div className="anim-up">
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", marginBottom: 4 }}>
                Rate your subjects
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 16 }}>
                AI will allocate more time to weak areas. You can skip this step.
              </p>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A", display: "inline-block" }} />
                  Strong subjects (I'm confident)
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {subjects.map((s) => (
                    <SubjectChip
                      key={s}
                      label={s}
                      selected={form.strongSubjects.includes(s)}
                      disabled={form.weakSubjects.includes(s)}
                      color="#16A34A"
                      onToggle={() => toggleStrong(s)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626", display: "inline-block" }} />
                  Weak subjects (need more focus)
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {subjects.map((s) => (
                    <SubjectChip
                      key={s}
                      label={s}
                      selected={form.weakSubjects.includes(s)}
                      disabled={form.strongSubjects.includes(s)}
                      color="#DC2626"
                      onToggle={() => toggleWeak(s)}
                    />
                  ))}
                </div>
              </div>

              {(form.strongSubjects.length > 0 || form.weakSubjects.length > 0) && (
                <p style={{ fontSize: 11, color: "var(--text-light)", marginTop: 14, background: "var(--bg-card-2)", padding: "8px 12px", borderRadius: 8 }}>
                  ✓ {form.strongSubjects.length} strong · {form.weakSubjects.length} weak subjects selected
                </p>
              )}
            </div>
          )}

          {/* Step 5 — Student Type */}
          {step === 5 && (
            <div className="anim-up">
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)", marginBottom: 4 }}>
                Are you working or a full-time student?
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 16 }}>
                This helps us schedule tasks around your day.
              </p>
              {[
                { id: "working", icon: "💼", label: "Working Professional", sub: "Study around your job (mornings & evenings)" },
                { id: "fulltime", icon: "📚", label: "Full-Time Student", sub: "Flexible schedule, longer study blocks" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setForm((p) => ({ ...p, studentType: opt.id as "working" | "fulltime" }))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 18px",
                    borderRadius: 14,
                    border: form.studentType === opt.id ? "2px solid #2563EB" : "1.5px solid var(--border)",
                    background: form.studentType === opt.id ? "#EFF6FF" : "var(--bg-card)",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    marginBottom: 12,
                    boxShadow: form.studentType === opt.id ? "0 0 0 3px rgba(37,99,235,0.12)" : "var(--shadow-sm)",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: form.studentType === opt.id ? "#2563EB" : "var(--text-dark)" }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 3 }}>{opt.sub}</div>
                  </div>
                  {form.studentType === opt.id && (
                    <span style={{ marginLeft: "auto", color: "#2563EB", fontSize: 20 }}>✓</span>
                  )}
                </button>
              ))}

              {error && (
                <p style={{ fontSize: 12, color: "#DC2626", background: "rgba(220,38,38,0.06)", padding: "8px 12px", borderRadius: 8, marginTop: 4 }}>
                  {error}
                </p>
              )}

              {/* Summary card */}
              {form.studentType && examObj && (
                <div style={{ marginTop: 16, background: "var(--bg-card)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-light)", marginBottom: 8 }}>YOUR PLAN SUMMARY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {[
                      { label: "Exam", value: `${examObj.icon} ${form.exam}` },
                      { label: "Date", value: new Date(form.examDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
                      { label: "Daily Hours", value: `${form.dailyHours} hrs/day` },
                      { label: "Profile", value: form.studentType === "working" ? "Working" : "Student" },
                    ].map((item) => (
                      <div key={item.label} style={{ background: "var(--bg-card-2)", borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ fontSize: 9, color: "var(--text-faint)", fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: "var(--text-dark)", fontWeight: 700, marginTop: 2 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {step > 1 && (
              <button
                onClick={() => { setStep((s) => s - 1); setError(""); }}
                style={{
                  flex: 1,
                  padding: "13px",
                  borderRadius: 12,
                  border: "1.5px solid var(--border)",
                  background: "var(--bg-card)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-body)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                ← Back
              </button>
            )}
            {step < 5 ? (
              <button
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
                style={{
                  flex: step === 1 ? 1 : 2,
                  padding: "13px",
                  borderRadius: 12,
                  border: "none",
                  background: canNext ? "#2563EB" : "rgba(0,0,0,0.06)",
                  color: canNext ? "#fff" : "var(--text-faint)",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: canNext ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                Continue →
              </button>
            ) : (
              <button
                disabled={!canNext}
                onClick={generatePlan}
                style={{
                  flex: 2,
                  padding: "13px",
                  borderRadius: 12,
                  border: "none",
                  background: canNext ? "linear-gradient(135deg, #2563EB, #0D9488)" : "rgba(0,0,0,0.06)",
                  color: canNext ? "#fff" : "var(--text-faint)",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: canNext ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                ✨ Generate My Plan
              </button>
            )}
          </div>
        </div>

        <BottomNav />
      </main>
    );
  }

  // ─── Loading screen ───────────────────────────────────────────────────────
  if (scr === "loading") {
    const examObj = EXAMS.find((e) => e.id === form.exam);
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 340 }}>
          <div
            style={{
              width: 80, height: 80, borderRadius: 24, margin: "0 auto 20px",
              background: `linear-gradient(135deg, ${examObj?.color ?? "#2563EB"}, #0D9488)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36,
              animation: "pulse 2s ease-in-out infinite",
            }}
          >
            {examObj?.icon ?? "📅"}
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, color: "var(--text-dark)", marginBottom: 8 }}>
            Building your plan…
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 20, lineHeight: 1.6 }}>
            AI is analysing the {form.exam} syllabus and creating a personalised week-by-week schedule for you.
          </p>
          {/* Dots animation */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: examObj?.color ?? "#2563EB",
                  animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 20 }}>
            This takes 10–20 seconds. Please wait…
          </p>
        </div>
      </main>
    );
  }

  // ─── Plan view ────────────────────────────────────────────────────────────
  if (!plan) return null;

  const currentWeekData: StudyWeek | undefined = plan.weeks[currentWeek];
  const daysLeft = daysUntil(plan.examDate);
  const examObj = EXAMS.find((e) => e.id === plan.examName);

  // Count week completion
  const weekTaskIds = currentWeekData?.days.flatMap((d) => d.tasks.map((t) => t.id)) ?? [];
  const weekDone = weekTaskIds.filter((id) => completedTasks.has(id)).length;
  const weekTotal = weekTaskIds.length;

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Plan header */}
      <section style={{ background: "var(--bg-hero)", padding: "20px 16px 16px" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>{examObj?.icon ?? "📅"}</span>
              <div>
                <h1 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: 0 }}>{plan.examName}</h1>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                  {daysLeft > 0 ? `${daysLeft} days remaining` : "Exam day!"}
                </p>
              </div>
            </div>
            <button
              onClick={restartForm}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "5px 10px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              New Plan
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { icon: "✅", label: "Progress", value: `${progress}%` },
              { icon: "🔥", label: "Streak", value: `${streak}d` },
              { icon: "📋", label: "Tasks Done", value: `${completedCount}/${totalTasks}` },
            ].map((s) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{s.value}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Overall progress bar */}
          <div style={{ marginTop: 12 }}>
            <div style={{ height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #5EEAD4, #2563EB)",
                  borderRadius: 3,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "16px 16px 0" }}>

        {/* Week navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <button
            disabled={currentWeek === 0}
            onClick={() => setCurrentWeek((w) => w - 1)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: "1.5px solid var(--border)",
              background: "var(--bg-card)",
              cursor: currentWeek === 0 ? "not-allowed" : "pointer",
              opacity: currentWeek === 0 ? 0.35 : 1,
              fontSize: 16,
              fontFamily: "inherit",
            }}
          >
            ‹
          </button>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text-dark)" }}>
              Week {(currentWeekData?.week ?? 1)} of {plan.weeks.length}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 1 }}>
              {currentWeekData?.theme} · {weekLabel(currentWeek, startDate)}
            </div>
          </div>

          <button
            disabled={currentWeek === plan.weeks.length - 1}
            onClick={() => setCurrentWeek((w) => w + 1)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: "1.5px solid var(--border)",
              background: "var(--bg-card)",
              cursor: currentWeek === plan.weeks.length - 1 ? "not-allowed" : "pointer",
              opacity: currentWeek === plan.weeks.length - 1 ? 0.35 : 1,
              fontSize: 16,
              fontFamily: "inherit",
            }}
          >
            ›
          </button>
        </div>

        {/* Week progress */}
        <div style={{ background: "var(--bg-card)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 6, background: "var(--bg-card-2)", borderRadius: 3, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: weekTotal > 0 ? `${Math.round((weekDone / weekTotal) * 100)}%` : "0%",
                background: "linear-gradient(90deg, #16A34A, #0D9488)",
                borderRadius: 3,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-light)", flexShrink: 0 }}>
            {weekDone}/{weekTotal} this week
          </span>
        </div>

        {/* Day cards */}
        {currentWeekData?.days.map((day) => {
          const dayDone = day.tasks.filter((t) => completedTasks.has(t.id)).length;
          const allDone = dayDone === day.tasks.length;
          return (
            <div
              key={day.day}
              className="anim-up"
              style={{
                background: "var(--bg-card)",
                borderRadius: 14,
                marginBottom: 12,
                border: allDone ? "1.5px solid #16A34A" : "1px solid var(--border)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Day header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: allDone ? "rgba(22,163,74,0.06)" : "var(--bg-card-2)",
                  borderBottom: "1px solid var(--border-light)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: allDone ? "#16A34A" : "var(--text-dark)" }}>
                    {day.day}
                  </span>
                  {allDone && <span style={{ fontSize: 11, color: "#16A34A", fontWeight: 700 }}>✓ Done!</span>}
                </div>
                <span style={{ fontSize: 10, color: "var(--text-faint)", fontWeight: 600 }}>
                  {dayDone}/{day.tasks.length} tasks ·{" "}
                  {day.tasks.reduce((s, t) => s + t.hours, 0)}h total
                </span>
              </div>

              {/* Tasks */}
              <div style={{ padding: "0 14px" }}>
                {day.tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    taskId={task.id}
                    subject={task.subject}
                    topic={task.topic}
                    hours={task.hours}
                    resources={task.resources}
                    color={task.color}
                    done={completedTasks.has(task.id)}
                    onToggle={() => toggleTask(task.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 20, marginBottom: 8 }}>
          <button
            onClick={downloadPDF}
            disabled={downloading}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 12,
              border: "1.5px solid var(--border)",
              background: "var(--bg-card)",
              fontSize: 13,
              fontWeight: 700,
              color: downloading ? "var(--text-faint)" : "var(--text-dark)",
              cursor: downloading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              fontFamily: "inherit",
            }}
          >
            {downloading ? "⏳ Generating…" : "⬇️ Download PDF"}
          </button>
          <button
            onClick={() => { clearPlan(); setForm((p) => ({ ...p, exam: plan.examName, examDate: plan.examDate })); setStep(3); setScr("form"); }}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #2563EB, #0D9488)",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              fontFamily: "inherit",
            }}
          >
            ✨ Regenerate
          </button>
        </div>

        {/* Week tabs quick jump */}
        <div className="hide-scrollbar" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 4 }}>
          {plan.weeks.map((w, idx) => {
            const wIds = w.days.flatMap((d) => d.tasks.map((t) => t.id));
            const wDone = wIds.filter((id) => completedTasks.has(id)).length;
            const wPct = wIds.length > 0 ? Math.round((wDone / wIds.length) * 100) : 0;
            return (
              <button
                key={idx}
                onClick={() => setCurrentWeek(idx)}
                style={{
                  flexShrink: 0,
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: currentWeek === idx ? "2px solid #2563EB" : "1.5px solid var(--border)",
                  background: currentWeek === idx ? "#EFF6FF" : "var(--bg-card)",
                  fontSize: 11,
                  fontWeight: currentWeek === idx ? 800 : 500,
                  color: currentWeek === idx ? "#2563EB" : "var(--text-light)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span>W{w.week}</span>
                {wPct > 0 && (
                  <span style={{ fontSize: 9, color: wPct === 100 ? "#16A34A" : "var(--text-faint)" }}>
                    {wPct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden printable content for PDF */}
      <div ref={printRef} style={{ display: "none", position: "absolute", left: -9999, top: 0 }}>
        <PrintablePlan weeks={plan.weeks} examName={plan.examName} examDate={plan.examDate} />
      </div>

      <BottomNav />
    </main>
  );
}
