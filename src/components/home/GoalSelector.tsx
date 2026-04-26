"use client";

import { useState } from "react";
import Link from "next/link";
import { GOAL_OPTIONS, useGoalSelector } from "@/hooks/useGoalSelector";
import type { GoalId } from "@/hooks/useGoalSelector";

export default function GoalSelector() {
  const { goalId, goal, daysLeft, setGoal, loaded } = useGoalSelector();
  const [open, setOpen] = useState(false);

  // Don't render until localStorage is read (avoids hydration flash)
  if (!loaded) return null;

  // ── No goal set: show the picker prompt ──────────────────────────────────
  if (!goal) {
    return (
      <div style={{ marginBottom: 20 }}>
        <div style={{
          borderRadius: 18,
          padding: "18px 16px",
          background: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)",
          border: "1.5px solid #BFDBFE",
          boxShadow: "0 2px 12px rgba(37,99,235,0.08)",
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0,
            }}>🎯</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111827" }}>
                Pick your target exam
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", marginTop: 1 }}>
                Get a personalised countdown + relevant updates
              </div>
            </div>
          </div>

          {/* Exam grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}>
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setGoal(opt.id)}
                style={{
                  padding: "10px 6px",
                  borderRadius: 12,
                  border: `1.5px solid ${opt.color}25`,
                  background: `${opt.color}08`,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.15s ease",
                  minHeight: 64,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${opt.color}18`;
                  e.currentTarget.style.borderColor = `${opt.color}50`;
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${opt.color}08`;
                  e.currentTarget.style.borderColor = `${opt.color}25`;
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span style={{ fontSize: 20 }}>{opt.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: opt.color, textAlign: "center", lineHeight: 1.2 }}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Goal set: show the personalised banner ────────────────────────────────
  const urgency = daysLeft !== null && daysLeft <= 30;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        borderRadius: 18,
        padding: "16px",
        background: `linear-gradient(135deg, ${goal.color}12 0%, ${goal.color}06 100%)`,
        border: `1.5px solid ${goal.color}30`,
        boxShadow: `0 2px 16px ${goal.color}12`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Icon */}
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: `${goal.color}18`,
            border: `2px solid ${goal.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24,
          }}>
            {goal.icon}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Your Goal
              </span>
              <button
                onClick={() => setOpen(v => !v)}
                style={{
                  fontSize: 10, fontWeight: 600, color: goal.color,
                  background: `${goal.color}12`, border: "none",
                  borderRadius: 6, padding: "2px 7px", cursor: "pointer",
                }}
              >
                Change
              </button>
            </div>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#111827", lineHeight: 1.2 }}>
              {goal.label}
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>
              {goal.countdownLabel}
            </div>
          </div>

          {/* Countdown */}
          <div style={{
            flexShrink: 0, textAlign: "center",
            background: urgency ? "#FEF2F2" : `${goal.color}10`,
            border: `1.5px solid ${urgency ? "#FECACA" : `${goal.color}25`}`,
            borderRadius: 14, padding: "10px 14px",
          }}>
            <div style={{
              fontSize: 28, fontWeight: 900,
              color: urgency ? "#DC2626" : goal.color,
              fontFamily: "'Outfit', sans-serif",
              lineHeight: 1,
            }}>
              {daysLeft}
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>
              days left
            </div>
          </div>
        </div>

        {/* Quick links row */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Link
            href={goal.jobLink}
            style={{ textDecoration: "none", flex: 1 }}
          >
            <div style={{
              padding: "9px 12px",
              background: goal.color,
              color: "#fff",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              textAlign: "center",
              boxShadow: `0 4px 12px ${goal.color}30`,
            }}>
              📖 Full Roadmap
            </div>
          </Link>
          <Link
            href="/quiz"
            style={{ textDecoration: "none", flex: 1 }}
          >
            <div style={{
              padding: "9px 12px",
              background: `${goal.color}12`,
              color: goal.color,
              border: `1.5px solid ${goal.color}25`,
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              textAlign: "center",
            }}>
              📝 Practice Now
            </div>
          </Link>
          <Link
            href="/notifications"
            style={{ textDecoration: "none", flex: 1 }}
          >
            <div style={{
              padding: "9px 12px",
              background: `${goal.color}12`,
              color: goal.color,
              border: `1.5px solid ${goal.color}25`,
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              textAlign: "center",
            }}>
              🔔 Updates
            </div>
          </Link>
        </div>

        {/* Inline change picker */}
        {open && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${goal.color}20` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 8 }}>
              Switch to a different exam:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {GOAL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setGoal(opt.id as GoalId); setOpen(false); }}
                  style={{
                    padding: "8px 4px",
                    borderRadius: 10,
                    border: `1.5px solid ${opt.id === goalId ? opt.color : `${opt.color}20`}`,
                    background: opt.id === goalId ? `${opt.color}18` : `${opt.color}06`,
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    minHeight: 56,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{opt.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: opt.color, textAlign: "center", lineHeight: 1.2 }}>
                    {opt.label}
                  </span>
                </button>
              ))}
              <button
                onClick={() => { setGoal(null); setOpen(false); }}
                style={{
                  padding: "8px 4px", borderRadius: 10,
                  border: "1.5px solid #E5E7EB", background: "#F9FAFB",
                  cursor: "pointer", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 3, minHeight: 56,
                }}
              >
                <span style={{ fontSize: 18 }}>✕</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#9CA3AF", textAlign: "center" }}>Clear</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
