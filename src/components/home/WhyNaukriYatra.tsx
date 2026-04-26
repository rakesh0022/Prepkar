"use client";

import Link from "next/link";
import { NOTIFICATIONS } from "@/data/notifications";
import { DAILY_QUIZ_POOL } from "@/components/data";

// ── Honest, real stats derived from actual data ───────────────────────────
function getRealStats() {
  const notifCount = NOTIFICATIONS.length;
  const questionCount = DAILY_QUIZ_POOL.length;
  // Days since launch (April 1 2026) — honest "days of content"
  const launchDate = new Date("2026-04-01");
  const today = new Date();
  const daysSinceLaunch = Math.max(
    Math.floor((today.getTime() - launchDate.getTime()) / 86_400_000),
    1
  );
  return { notifCount, questionCount, daysSinceLaunch };
}

const FEATURES = [
  {
    icon: "🤖",
    title: "AI Mock Interviews",
    desc: "Get scored on essays, interviews & prelims by AI — free, no signup",
    color: "#7C3AED",
    bg: "#F5F3FF",
    link: "/ai-practice",
  },
  {
    icon: "📊",
    title: "Real Salary Data",
    desc: "7th Pay Commission breakdowns, city-wise in-hand salary calculator",
    color: "#2563EB",
    bg: "#EFF6FF",
    link: "/salary-calculator",
  },
  {
    icon: "🗺️",
    title: "Full Roadmaps",
    desc: "Step-by-step prep guide for 17+ govt jobs — syllabus, PYQs, timeline",
    color: "#059669",
    bg: "#ECFDF5",
    link: "/jobs",
  },
  {
    icon: "📅",
    title: "Exam Calendar",
    desc: "Never miss a deadline — live countdowns for every major exam",
    color: "#DC2626",
    bg: "#FEF2F2",
    link: "/jobs",
  },
  {
    icon: "⚡",
    title: "Daily Quiz",
    desc: "One new question every day across GK, Reasoning, Maths & English",
    color: "#D97706",
    bg: "#FFFBEB",
    link: "/quiz",
  },
  {
    icon: "🆓",
    title: "100% Free",
    desc: "No paywalls, no premium tiers — every feature is free, always",
    color: "#0D9488",
    bg: "#F0FDFA",
    link: "/about",
  },
];

export default function WhyNaukriYatra() {
  const { notifCount, questionCount, daysSinceLaunch } = getRealStats();

  return (
    <section style={{ padding: "32px 0 20px", marginBottom: 20 }}>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#EFF6FF", padding: "6px 16px",
          borderRadius: 100, marginBottom: 12,
          border: "1px solid #BFDBFE",
        }}>
          <span style={{ fontSize: 14 }}>✨</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#1E40AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Why Choose Us
          </span>
        </div>
        <h2 style={{
          fontSize: 26, fontWeight: 900, color: "#111827",
          fontFamily: "'Outfit', sans-serif",
          marginBottom: 8, lineHeight: 1.2,
        }}>
          Everything in one place.<br />
          <span style={{ color: "#2563EB" }}>All free.</span>
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
          Built for serious aspirants — no fluff, no fake numbers, just the tools that actually help you prepare.
        </p>
      </div>

      {/* ── Honest stats strip ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        marginBottom: 24,
        padding: "0 4px",
      }}>
        {[
          { value: `${notifCount}+`, label: "Live notifications", icon: "🔔", color: "#2563EB" },
          { value: `${questionCount}`, label: "Quiz questions", icon: "📝", color: "#059669" },
          { value: `${daysSinceLaunch}`, label: "Days of updates", icon: "📅", color: "#D97706" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "var(--bg-card)",
            borderRadius: 14,
            padding: "14px 10px",
            textAlign: "center",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{
              fontSize: 22, fontWeight: 900, color: stat.color,
              fontFamily: "'Outfit', sans-serif", lineHeight: 1,
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, marginTop: 3, lineHeight: 1.3 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Feature grid: 2 cols mobile, 3 cols desktop ── */}
      <div className="why-grid">
        {FEATURES.map((f) => (
          <Link key={f.title} href={f.link} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "var(--bg-card)",
                borderRadius: 16,
                padding: "16px 14px",
                border: "1.5px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                height: "100%",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 8px 24px ${f.color}18`;
                e.currentTarget.style.borderColor = `${f.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: f.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>
                {f.icon}
              </div>
              {/* Text */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5 }}>
                  {f.desc}
                </div>
              </div>
              {/* Arrow */}
              <div style={{ marginTop: "auto", fontSize: 11, fontWeight: 700, color: f.color }}>
                Explore →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── CSS for responsive grid ── */}
      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          padding: 0 4px;
        }
        @media (min-width: 768px) {
          .why-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
}
