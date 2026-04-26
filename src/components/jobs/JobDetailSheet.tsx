"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Job } from "@/components/data";
import { calculateSalary, CITY_TYPES, type CityType } from "@/components/data";
import ReadingProgressBar from "@/components/reading/ReadingProgressBar";
import { computeReadingTime } from "@/lib/readingUtils";
import { getJobCategoryImage } from "@/lib/imageUtils";
import OptimizedImage from "@/components/OptimizedImage";

const DIFF_COLOR: Record<string, string> = { "Moderate": "#16A34A", "Hard": "#D97706", "Very Hard": "#DC2626" };
const CAT_COLOR: Record<string, string> = { banking: "#0C7C59", ssc: "#2563EB", railway: "#DC2626", upsc: "#7C3AED", defence: "#0D9488", state: "#EA580C" };

function clamp(n: number, min: number, max: number) { return Math.min(Math.max(n, min), max); }

function formatINR(n: number) {
  const v = Math.round(n);
  if (!Number.isFinite(v)) return "₹0";
  return `₹${v.toLocaleString("en-IN")}`;
}

function parseMoneyToken(token: string): number | null {
  const cleaned = token
    .replace(/[,₹\s]/g, "")
    .replace(/\/(mo|month|m)\b/gi, "")
    .trim();

  const m = cleaned.match(/^(\d+(?:\.\d+)?)(K|L|Cr)?$/i);
  if (!m) return null;
  const base = Number(m[1]);
  if (!Number.isFinite(base)) return null;
  const unit = (m[2] || "").toUpperCase();
  const mult = unit === "K" ? 1000 : unit === "L" ? 100000 : unit === "CR" ? 10000000 : 1;
  return Math.round(base * mult);
}

function parseMoneyRangeAvg(s: string): number | null {
  const normalized = s
    .replace(/[–—]/g, "-")
    .replace(/to/gi, "-")
    .replace(/\+/g, "")
    .trim();

  const tokens = normalized
    .split(/[^0-9A-Za-z.,]+/)
    .map(t => t.trim())
    .filter(Boolean)
    .filter(t => /[0-9]/.test(t));

  if (tokens.length === 0) return null;
  const vals = tokens.map(parseMoneyToken).filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  if (vals.length === 0) return null;
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  return Math.round((min + max) / 2);
}

function parseDayInLifeTimeline(dayInLife: string) {
  const lines = dayInLife
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  return lines.map((line, idx) => {
    const parts = line.split(/[–—-]/);
    if (parts.length >= 2) {
      const time = parts[0].trim();
      const text = parts.slice(1).join("—").trim();
      return { id: `${idx}`, time, text };
    }
    return { id: `${idx}`, time: "•", text: line };
  });
}

function CountUpINR({ value, className, durationMs = 900 }: { value: number; className?: string; durationMs?: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const target = Number.isFinite(value) ? Math.max(0, value) : 0;
    const start = performance.now();
    const startValue = 0;
    const delta = target - startValue;
    let raf = 0;

    const tick = (now: number) => {
      const t = clamp((now - start) / durationMs, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(startValue + delta * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  return <span className={className}>{formatINR(shown)}</span>;
}

type BenefitCardModel = {
  id: string;
  icon: string;
  title: string;
  dream: string;
  valueText: string;
  monthlyValue: number;
  countsInTotal: boolean;
  raw: string;
};

function buildBenefitCards(job: Job): BenefitCardModel[] {
  const base = job.benefits.map((raw, idx) => ({ raw, idx }));

  const cards = base.map(({ raw, idx }) => {
    const hasMoney = /[0-9]/.test(raw) || raw.includes("₹");
    const moneyAvg = hasMoney ? parseMoneyRangeAvg(raw) : null;

    const mk = (p: Omit<BenefitCardModel, "id" | "raw">): BenefitCardModel => ({
      id: `${idx}-${p.title}`,
      raw,
      ...p,
    });

    if (/(leased housing|govt quarter|government quarter|accommodation|quarters?)/i.test(raw)) {
      const worth = moneyAvg ?? 22000;
      return mk({
        icon: "🏠",
        title: "Leased Housing",
        dream: "Live in a prime area — rent handled by the department.",
        valueText: `Worth ${formatINR(worth)}/month`,
        monthlyValue: worth,
        countsInTotal: true,
      });
    }

    if (/\bhra\b|house rent allowance/i.test(raw)) {
      const worth = moneyAvg ?? 18000;
      return mk({
        icon: "🏡",
        title: "HRA / Rent Support",
        dream: "Big-city rent doesn’t eat your salary — you get rent support.",
        valueText: moneyAvg ? `Cash allowance ~${formatINR(worth)}/month (already in-hand)` : `Cash allowance (already in-hand)`,
        monthlyValue: 0,
        countsInTotal: false,
      });
    }

    if (/(medical|cghs|health|insurance)/i.test(raw)) {
      const worth = moneyAvg ?? 4500;
      return mk({
        icon: "💊",
        title: "Medical Coverage",
        dream: "Cashless treatment for you + family — stress-free health.",
        valueText: `Worth ${formatINR(worth)}/month`,
        monthlyValue: worth,
        countsInTotal: true,
      });
    }

    if (/(pension|nps)/i.test(raw)) {
      const worth = job.salaryBreakdown?.basic ? Math.round(job.salaryBreakdown.basic * 0.14) : 8000;
      return mk({
        icon: "🧓",
        title: "Pension / NPS",
        dream: "Retirement sorted — a monthly safety net building quietly.",
        valueText: `Worth ~${formatINR(worth)}/month`,
        monthlyValue: worth,
        countsInTotal: true,
      });
    }

    if (/(lfc|ltc|travel)/i.test(raw)) {
      const worth = moneyAvg ?? 2500;
      return mk({
        icon: "✈️",
        title: "LFC / LTC Travel",
        dream: "Family trips become part of the job — travel paid, memories free.",
        valueText: `Worth ~${formatINR(worth)}/month`,
        monthlyValue: worth,
        countsInTotal: true,
      });
    }

    if (/(subsidized loans?|staff loan|loan)/i.test(raw)) {
      const worth = moneyAvg ?? 4000;
      return mk({
        icon: "🏦",
        title: "Subsidized Loans",
        dream: "Home & car dreams become cheaper with staff-rate loans.",
        valueText: `Worth ~${formatINR(worth)}/month`,
        monthlyValue: worth,
        countsInTotal: true,
      });
    }

    if (/(paid leaves?|leaves?)/i.test(raw)) {
      const worth = moneyAvg ?? 2500;
      return mk({
        icon: "🌴",
        title: "Paid Leaves",
        dream: "You don’t beg for breaks — you actually get life outside work.",
        valueText: `Worth ~${formatINR(worth)}/month`,
        monthlyValue: worth,
        countsInTotal: true,
      });
    }

    if (/(gratuity)/i.test(raw)) {
      const worth = moneyAvg ?? 1500;
      return mk({
        icon: "🏅",
        title: "Gratuity",
        dream: "A solid lump-sum reward over time — future-you will thank you.",
        valueText: `Worth ~${formatINR(worth)}/month`,
        monthlyValue: worth,
        countsInTotal: true,
      });
    }

    if (/(da|dearness allowance|ta|transport allowance)/i.test(raw)) {
      const worth = moneyAvg ?? 0;
      return mk({
        icon: "📈",
        title: raw.replace(/\s*₹.*$/, "").trim() || "Allowances",
        dream: "Inflation-proofing built in — allowances update over time.",
        valueText: moneyAvg ? `Cash allowance ~${formatINR(worth)}/month (already in-hand)` : `Cash allowance (already in-hand)`,
        monthlyValue: 0,
        countsInTotal: false,
      });
    }

    if (hasMoney) {
      const worth = moneyAvg ?? 0;
      return mk({
        icon: "✨",
        title: raw.replace(/\s*₹.*$/, "").trim() || "Special Allowance",
        dream: "Extra allowance that quietly upgrades your everyday life.",
        valueText: worth ? `Cash allowance ~${formatINR(worth)}/month (already in-hand)` : `Value varies by posting`,
        monthlyValue: 0,
        countsInTotal: false,
      });
    }

    const fallbackWorth = 1800;
    return mk({
      icon: "🎁",
      title: raw,
      dream: "A premium perk that makes this role feel “above salary”.",
      valueText: `Worth ~${formatINR(fallbackWorth)}/month`,
      monthlyValue: fallbackWorth,
      countsInTotal: true,
    });
  });

  const seen = new Set<string>();
  return cards.filter(c => {
    const key = c.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function equivalentPrivateCtcLpaRange(realMonthly: number) {
  const annual = Math.max(0, realMonthly) * 12;
  if (!annual) return null;
  const low = Math.round((annual * 1.45) / 100000);
  const high = Math.round((annual * 1.75) / 100000);
  if (!low || !high) return null;
  const lo = Math.min(low, high);
  const hi = Math.max(low, high);
  return { low: lo, high: hi };
}

function getJobWordCount(job: Job) {
  const text = [
    job.career,
    job.lifestyle,
    job.eligibility,
    job.exam,
    job.dayInLife,
    job.challenges,
    job.impact,
    job.realityCheck,
    ...job.whyChoose,
    ...job.benefits,
    ...job.roadmap.map((step) => `${step.title} ${step.detail}`),
    ...job.promotionPath.map((step) => `${step.title} ${step.salary} ${step.years}`),
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return text ? text.split(" ").length : 0;
}

function estimatedSelectionOdds(difficulty: Job["difficulty"]) {
  if (difficulty === "Very Hard") return "~0.1% odds";
  if (difficulty === "Hard") return "~0.3% odds";
  return "~1% odds";
}

function categoryIllustrationPalette(category: string) {
  if (category === "banking") return { primary: "#047857", secondary: "#D97706", soft: "#ECFDF5" };
  if (category === "ssc") return { primary: "#2563EB", secondary: "#F59E0B", soft: "#EFF6FF" };
  if (category === "railway") return { primary: "#DC2626", secondary: "#F59E0B", soft: "#FEF2F2" };
  if (category === "upsc") return { primary: "#1E3A5F", secondary: "#D97706", soft: "#EFF6FF" };
  if (category === "defence") return { primary: "#0F766E", secondary: "#D97706", soft: "#F0FDFA" };
  return { primary: "#EA580C", secondary: "#2563EB", soft: "#FFF7ED" };
}

function JobCategoryIllustration({ category }: { category: string }) {
  const palette = categoryIllustrationPalette(category);
  const common = {
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (category === "banking") {
    return (
      <svg viewBox="0 0 240 160" className="h-36 w-full" aria-hidden="true">
        <rect x="20" y="90" width="200" height="46" rx="12" fill={palette.primary} opacity="0.12" />
        <path d="M36 72L120 28L204 72" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M52 72H188V128H52Z" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M80 78V122M120 78V122M160 78V122" stroke={palette.primary} strokeWidth="8" {...common} />
        <circle cx="188" cy="50" r="18" fill={palette.secondary} opacity="0.18" />
        <circle cx="188" cy="50" r="16" stroke={palette.secondary} strokeWidth="5" {...common} />
        <path d="M182 50H194M188 44V56" stroke={palette.secondary} strokeWidth="5" {...common} />
      </svg>
    );
  }

  if (category === "upsc") {
    return (
      <svg viewBox="0 0 240 160" className="h-36 w-full" aria-hidden="true">
        <path d="M36 118H204" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M62 118V82H178V118" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M48 82H192" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M82 82V60C82 44 98 32 120 32C142 32 158 44 158 60V82" stroke={palette.secondary} strokeWidth="8" {...common} />
        <path d="M92 118V92M120 118V92M148 118V92" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M42 128C66 110 88 104 120 104C152 104 174 110 198 128" stroke={palette.secondary} strokeWidth="6" opacity="0.65" {...common} />
      </svg>
    );
  }

  if (category === "ssc") {
    return (
      <svg viewBox="0 0 240 160" className="h-36 w-full" aria-hidden="true">
        <rect x="34" y="84" width="172" height="42" rx="10" fill={palette.primary} opacity="0.12" />
        <rect x="52" y="58" width="110" height="52" rx="10" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M76 94H138M76 80H126" stroke={palette.primary} strokeWidth="7" {...common} />
        <rect x="150" y="42" width="38" height="52" rx="8" stroke={palette.secondary} strokeWidth="7" {...common} />
        <path d="M160 58H178M160 72H176" stroke={palette.secondary} strokeWidth="5" {...common} />
        <path d="M70 126L88 108M172 126L154 108" stroke={palette.primary} strokeWidth="8" {...common} />
      </svg>
    );
  }

  if (category === "railway") {
    return (
      <svg viewBox="0 0 240 160" className="h-36 w-full" aria-hidden="true">
        <rect x="42" y="46" width="126" height="58" rx="18" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M64 68H144M78 46V104" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M168 70H196L208 94H176" stroke={palette.secondary} strokeWidth="8" {...common} />
        <circle cx="86" cy="118" r="12" stroke={palette.primary} strokeWidth="8" {...common} />
        <circle cx="164" cy="118" r="12" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M32 134H210" stroke={palette.secondary} strokeWidth="6" {...common} />
      </svg>
    );
  }

  if (category === "defence") {
    return (
      <svg viewBox="0 0 240 160" className="h-36 w-full" aria-hidden="true">
        <path d="M120 28L182 48V88C182 112 158 130 120 138C82 130 58 112 58 88V48L120 28Z" stroke={palette.primary} strokeWidth="8" {...common} />
        <path d="M120 46V118" stroke={palette.secondary} strokeWidth="7" {...common} />
        <path d="M100 66H140" stroke={palette.secondary} strokeWidth="7" {...common} />
        <path d="M86 116L154 48" stroke={palette.primary} strokeWidth="6" opacity="0.75" {...common} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 160" className="h-36 w-full" aria-hidden="true">
      <rect x="48" y="40" width="144" height="84" rx="20" stroke={palette.primary} strokeWidth="8" {...common} />
      <path d="M80 68H160M80 92H138" stroke={palette.secondary} strokeWidth="7" {...common} />
      <circle cx="172" cy="62" r="12" stroke={palette.primary} strokeWidth="6" {...common} />
    </svg>
  );
}

function LifestyleTimeline({ items }: { items: { id: string; time: string; text: string }[] }) {
  if (items.length === 0) return null;

  // Assign activity type by keyword for color coding
  const getActivityType = (text: string): { color: string; bg: string; dot: string } => {
    const t = text.toLowerCase();
    if (/(meeting|interview|client|customer|visit|review|discuss)/i.test(t))
      return { color: "#2563EB", bg: "#EFF6FF", dot: "#3B82F6" };
    if (/(field|survey|raid|inspection|patrol|travel|depart|arrive)/i.test(t))
      return { color: "#16A34A", bg: "#F0FDF4", dot: "#22C55E" };
    if (/(lunch|break|tea|rest|leave|home)/i.test(t))
      return { color: "#D97706", bg: "#FFFBEB", dot: "#F59E0B" };
    // default: admin/office
    return { color: "#6B7280", bg: "#F9FAFB", dot: "#9CA3AF" };
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Vertical line */}
      <div style={{
        position: "absolute", left: 28, top: 8, bottom: 8,
        width: 2, borderRadius: 2,
        background: "linear-gradient(to bottom, #F59E0B, #FDE68A, transparent)",
      }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it) => {
          const style = getActivityType(it.text);
          return (
            <div key={it.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              {/* Time badge */}
              <div style={{
                flexShrink: 0, width: 56, textAlign: "right",
                fontSize: 10, fontWeight: 700, color: "#9CA3AF",
                paddingTop: 10, lineHeight: 1.2,
              }}>
                {it.time}
              </div>
              {/* Dot */}
              <div style={{
                flexShrink: 0, width: 12, height: 12, borderRadius: "50%",
                background: style.dot, marginTop: 9,
                boxShadow: `0 0 0 3px ${style.dot}30`,
                zIndex: 1,
              }} />
              {/* Card */}
              <div style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: 12,
                background: style.bg,
                border: `1px solid ${style.color}20`,
                fontSize: 13,
                color: "#374151",
                fontWeight: 500,
                lineHeight: 1.5,
              }}>
                {it.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
  const text = `🎯 *${job.title}*\n🏢 ${job.org}\n👥 ${job.vacancies.toLocaleString()} vacancies\n💰 ${job.inHand}/month\n📅 Last date: ${job.lastDate}\n\nFull roadmap, salary & lifestyle 👇\nhttps://prepkar.vercel.app/jobs/${job.id}\n\n— via NaukriYatra`;
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
      <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
        <div style={{ padding: "10px", background: "#25D366", color: "#fff", borderRadius: 10, fontSize: 12, fontWeight: 700, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 2px 8px rgba(37,211,102,0.25)" }}>
          <span>📱</span> Share on WhatsApp
        </div>
      </a>
      <button onClick={() => { if (navigator.share) { navigator.share({ title: job.title, text: `${job.title} — ${job.vacancies} vacancies`, url: `https://prepkar.vercel.app/jobs/${job.id}` }); } else { navigator.clipboard.writeText(`https://prepkar.vercel.app/jobs/${job.id}`); } }}
        style={{ padding: "10px 16px", background: "#F3F4F6", color: "#374151", borderRadius: 10, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}>📋 Copy</button>
    </div>
  );
}

/* ── Premium Salary Calculator ── */
function SalaryCalc({ job }: { job: Job }) {
  const [city, setCity] = useState<CityType>("metro");
  const [isAnimating, setIsAnimating] = useState(false);
  
  if (!job.salaryBreakdown) return null;
  const c = calculateSalary(job.salaryBreakdown, city);

  const handleCityChange = (newCity: CityType) => {
    setIsAnimating(true);
    setCity(newCity);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const getCityIcon = (cityType: CityType): string => {
    const icons: Record<CityType, string> = {
      metro: "🏙️",
      urban: "🌆",
      rural: "🏘️",
    };
    return icons[cityType];
  };

  return (
    <div style={{ 
      borderRadius: 24, 
      overflow: "hidden", 
      marginBottom: 20,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: 2,
      boxShadow: "0 8px 32px rgba(102,126,234,0.25), 0 2px 8px rgba(0,0,0,0.1)",
    }}>
      <div style={{ 
        background: "#FFFFFF", 
        borderRadius: 22,
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px 20px 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 30% 40%, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ 
              fontSize: 11, 
              fontWeight: 800, 
              color: "rgba(255,255,255,0.9)", 
              letterSpacing: 1.5, 
              textTransform: "uppercase", 
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <span style={{ fontSize: 16 }}>💰</span> Salary Calculator
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 16 }}>
              Calculate exact in-hand salary based on 7th Pay Commission
            </div>

            {/* City Type Selector - Premium Pills */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {CITY_TYPES.map(ct => (
                <button 
                  key={ct.id} 
                  onClick={() => handleCityChange(ct.id)}
                  style={{ 
                    flex: 1, 
                    padding: "12px 8px", 
                    borderRadius: 14, 
                    fontSize: 11, 
                    fontWeight: 700,
                    border: city === ct.id ? "2px solid rgba(255,255,255,0.4)" : "2px solid transparent",
                    background: city === ct.id 
                      ? "rgba(255,255,255,0.25)" 
                      : "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    color: "#fff",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: city === ct.id ? "scale(1.02)" : "scale(1)",
                    boxShadow: city === ct.id 
                      ? "0 4px 16px rgba(0,0,0,0.15)" 
                      : "none",
                  }}
                >
                  <div style={{ fontSize: 16, marginBottom: 2 }}>{getCityIcon(ct.id)}</div>
                  <div>{ct.label}</div>
                </button>
              ))}
            </div>

            {/* City Examples */}
            <div style={{ 
              fontSize: 10, 
              color: "rgba(255,255,255,0.7)", 
              textAlign: "center",
              padding: "8px 12px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 10,
              backdropFilter: "blur(10px)",
            }}>
              {CITY_TYPES.find(ct => ct.id === city)?.examples}
            </div>
          </div>
        </div>

        {/* In-Hand Display - Hero Section */}
        <div style={{ 
          padding: "24px 20px",
          background: "linear-gradient(to bottom, #F9FAFB, #FFFFFF)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              fontSize: 11, 
              fontWeight: 600, 
              color: "#6B7280",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Monthly In-Hand Salary
            </div>
            <div style={{ 
              fontSize: 42, 
              fontWeight: 900, 
              background: "linear-gradient(135deg, #16A34A, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Outfit', sans-serif",
              marginBottom: 4,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isAnimating ? "scale(1.05)" : "scale(1)",
            }}>
              ₹{c.inHand.toLocaleString()}
            </div>
            <div style={{ 
              fontSize: 11, 
              color: "#9CA3AF",
              fontWeight: 500,
            }}>
              After all deductions
            </div>
          </div>
        </div>

        {/* Breakdown Section */}
        <div style={{ padding: "20px" }}>
          <div style={{ 
            fontSize: 10, 
            fontWeight: 800, 
            color: "#6B7280", 
            marginBottom: 12, 
            letterSpacing: 1.2,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            <span style={{ width: 3, height: 12, background: "#667eea", borderRadius: 2 }} />
            Salary Breakdown
          </div>

          {/* Allowances */}
          <div style={{ 
            background: "#F9FAFB",
            borderRadius: 16,
            padding: "14px 16px",
            marginBottom: 12,
          }}>
            {[
              { l: "Basic Pay", v: c.basic, cl: "#667eea", icon: "💼" }, 
              { l: "DA", v: c.da, cl: "#0D9488", icon: "📈" }, 
              { l: `HRA (${city})`, v: c.hra, cl: "#D97706", icon: "🏠" }, 
              { l: "Transport", v: c.ta, cl: "#7C3AED", icon: "🚗" }, 
              { l: "Other Allowances", v: c.other, cl: "#EA580C", icon: "✨" }
            ].map((it, i) => (
              <div 
                key={i} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  padding: "10px 0", 
                  borderBottom: i < 4 ? "1px solid rgba(0,0,0,0.04)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{it.icon}</span>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{it.l}</span>
                </div>
                <span style={{ 
                  fontSize: 14, 
                  fontWeight: 800, 
                  color: it.cl, 
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  ₹{it.v.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Gross Total */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            padding: "12px 16px", 
            background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)",
            borderRadius: 12,
            marginBottom: 8,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>Gross Salary</span>
            <span style={{ 
              fontSize: 16, 
              fontWeight: 900, 
              fontFamily: "'Outfit', sans-serif",
              color: "#1F2937",
            }}>
              ₹{c.gross.toLocaleString()}
            </span>
          </div>

          {/* Deduction */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            padding: "10px 16px",
            background: "#FEF2F2",
            borderRadius: 12,
            marginBottom: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>➖</span>
              <span style={{ fontSize: 12, color: "#DC2626", fontWeight: 600 }}>NPS Deduction (10%)</span>
            </div>
            <span style={{ 
              fontSize: 13, 
              fontWeight: 700, 
              color: "#DC2626",
              fontFamily: "'Outfit', sans-serif",
            }}>
              −₹{c.nps.toLocaleString()}
            </span>
          </div>

          {/* Final In-Hand - Premium Card */}
          <div style={{ 
            padding: "16px 18px", 
            background: "linear-gradient(135deg, #16A34A, #059669)",
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(22,163,74,0.25), 0 2px 8px rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 70% 30%, #fff 1px, transparent 1px)", backgroundSize: "15px 15px" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>
                  Final Take Home
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Monthly In-Hand</div>
              </div>
              <div style={{ 
                fontSize: 22, 
                fontWeight: 900, 
                color: "#fff", 
                fontFamily: "'Outfit', sans-serif",
                textShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}>
                ₹{c.inHand.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Premium Career Path — Horizontal scroll with gradient cards ── */
function CareerTimeline({ promotionPath, color }: { promotionPath: Job["promotionPath"]; color: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
      <div className="relative">
        <div className="absolute left-5 top-3 bottom-3 w-[3px] rounded-full" style={{ background: `linear-gradient(${color}, ${color}22)` }} />
        <div className="space-y-3">
          {promotionPath.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${step.title}-${step.years}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className="relative flex w-full gap-4 text-left"
              >
                <div
                  className="relative z-10 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-4 bg-white font-black"
                  style={{
                    borderColor: isActive ? color : `${color}40`,
                    color: isActive ? color : "#94A3B8",
                    boxShadow: isActive ? `0 0 0 6px ${color}18` : "none",
                  }}
                >
                  {index}
                </div>
                <div
                  className="flex-1 rounded-2xl border bg-white p-4 shadow-sm transition"
                  style={{
                    borderColor: isActive ? `${color}66` : "var(--border)",
                    background: isActive ? `linear-gradient(135deg, ${color}10, #ffffff)` : "#ffffff",
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[13px] font-extrabold text-[var(--text-dark)]">{step.title}</div>
                    <div className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white" style={{ background: color }}>
                      {step.years}
                    </div>
                  </div>
                  <div className="mt-2 text-[22px] font-black" style={{ color, fontFamily: "'Outfit'" }}>
                    {step.salary}
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-[var(--text-body)]">
                    {index === 0 && "Entry phase: learn the system fast and build reputation."}
                    {index > 0 && index < promotionPath.length - 1 && "Mid-career jump: more authority, more pay, and bigger teams."}
                    {index === promotionPath.length - 1 && "Peak role: highest influence, strongest pay, and legacy-level status."}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:h-fit">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--text-light)]">Tap Or Hover</div>
        <div className="mt-2 text-[18px] font-black text-[var(--text-dark)]">{promotionPath[activeIndex]?.title}</div>
        <div className="mt-1 text-[26px] font-black" style={{ color, fontFamily: "'Outfit'" }}>
          {promotionPath[activeIndex]?.salary}
        </div>
        <div className="mt-1 text-[12px] font-bold text-[var(--text-light)]">{promotionPath[activeIndex]?.years}</div>
        <div className="mt-4 rounded-2xl px-3 py-3 text-[12px] leading-relaxed" style={{ background: `${color}10`, color: "var(--text-body)" }}>
          {activeIndex === 0 && "This is the break-in stage. The upside is already strong, but the real compounding starts after your first major promotion."}
          {activeIndex > 0 && activeIndex < promotionPath.length - 1 && "This is where the role starts feeling premium: authority grows, your salary curve steepens, and perks usually improve too."}
          {activeIndex === promotionPath.length - 1 && "This is the aspirational finish line students dream about: top-tier pay, social stature, and decision-making power."}
        </div>
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

export default function JobDetailSheet({ job, onClose, fullPage = false }: { job: Job; onClose: () => void; fullPage?: boolean }) {
  const diffColor = DIFF_COLOR[job.difficulty] ?? "#6B7280";
  const catColor = CAT_COLOR[job.category] || "#2563EB";
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const benefitCards = useMemo(() => buildBenefitCards(job), [job]);
  const perksMonthly = useMemo(() => benefitCards.filter(b => b.countsInTotal).reduce((sum, b) => sum + (b.monthlyValue || 0), 0), [benefitCards]);
  const cashMonthly = useMemo(() => {
    if (job.salaryBreakdown) return calculateSalary(job.salaryBreakdown, "metro").inHand;
    return parseMoneyRangeAvg(job.inHand) ?? 0;
  }, [job.inHand, job.salaryBreakdown]);
  const realMonthly = useMemo(() => Math.max(0, cashMonthly) + Math.max(0, perksMonthly), [cashMonthly, perksMonthly]);
  const privateCtc = useMemo(() => equivalentPrivateCtcLpaRange(realMonthly), [realMonthly]);
  const jobWordCount = useMemo(() => getJobWordCount(job), [job]);
  const readingTime = useMemo(() => computeReadingTime(jobWordCount), [jobWordCount]);
  const selectionOdds = useMemo(() => estimatedSelectionOdds(job.difficulty), [job.difficulty]);
  const peakRole = job.promotionPath[job.promotionPath.length - 1];
  const illustrationPalette = categoryIllustrationPalette(job.category);

  return (
    <div style={fullPage ? {} : { position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      {!fullPage && <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }} />}
      <div ref={sheetRef} style={fullPage ? {
        background: "#FFFFFF",
        minHeight: "100vh",
        width: "100%",
        paddingBottom: 80,
      } : {
        position: "relative", background: "#FFFFFF", borderRadius: "22px 22px 0 0",
        width: "100%", maxWidth: 640, maxHeight: "93vh", overflowY: "auto", paddingBottom: 36,
      }}>
        <ReadingProgressBar wordCount={jobWordCount} targetRef={sheetRef} topClassName="top-0" />

        {/* Full-page: sticky top bar with back button */}
        {fullPage ? (
          <div style={{
            position: "sticky", top: 0, zIndex: 50,
            background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <button
              onClick={onClose}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#F3F4F6", border: "none", borderRadius: 10,
                padding: "8px 14px", fontSize: 13, fontWeight: 700,
                color: "#374151", cursor: "pointer",
              }}
            >
              ← Back
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {job.title}
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{job.org}</div>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
              <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(0,0,0,0.1)" }} />
            </div>
            <div style={{ position: "absolute", top: 14, right: 16 }}>
              <button onClick={onClose} style={{ background: "rgba(0,0,0,0.04)", border: "none", color: "#9CA3AF", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✕</button>
            </div>
          </>
        )}

        <div style={{ padding: fullPage ? "0 0" : "8px 20px 0", maxWidth: fullPage ? 1100 : undefined, margin: fullPage ? "0 auto" : undefined }}>

          {/* ── HERO BANNER ── */}
          <div style={{
            margin: fullPage ? 0 : "0 -20px",
            background: `linear-gradient(135deg, ${catColor} 0%, ${catColor}cc 60%, #0F172A 100%)`,
            padding: fullPage ? "28px 24px 24px" : "28px 24px 24px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Dot pattern */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.08,
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }} />
            {/* SVG illustration top-right */}
            <div style={{
              position: "absolute", right: -10, top: -10, opacity: 0.12, width: 140,
            }}>
              <JobCategoryIllustration category={job.category} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Badges */}
              <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                {job.isNew && <span style={{ background: "#16A34A", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>NEW</span>}
                {job.isHot && <span style={{ background: "#DC2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>🔥 HOT</span>}
                <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>{job.difficulty}</span>
                <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>🎓 {job.qualification}</span>
                <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>⏱ {job.prepTime}</span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 900,
                color: "#fff", margin: "0 0 4px", lineHeight: 1.2,
              }}>{job.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: "0 0 20px" }}>{job.org}</p>

              {/* Big salary with sparkle */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
                borderRadius: 16, padding: "12px 18px",
                border: "1px solid rgba(255,255,255,0.2)",
                marginBottom: 20,
              }}>
                <span style={{ fontSize: 22, animation: "sparkle 2s ease-in-out infinite" }}>✨</span>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
                    Monthly In-Hand
                  </div>
                  <div style={{
                    fontSize: 28, fontWeight: 900, color: "#fff",
                    fontFamily: "'Outfit', sans-serif", lineHeight: 1,
                  }}>
                    {job.inHand}
                  </div>
                </div>
              </div>

              {/* Key stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                {[
                  { icon: "👥", label: "Vacancies", value: job.vacancies.toLocaleString() },
                  { icon: "📅", label: "Last Date", value: job.lastDate.split(",")[0] },
                  { icon: "📖", label: "Exam", value: job.exam.split("→")[0].trim() },
                  { icon: "⏱", label: "Prep Time", value: job.prepTime },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.1)", borderRadius: 12,
                    padding: "10px 8px", textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}>
                    <div style={{ fontSize: 16, marginBottom: 4 }}>{stat.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 2 }}>{stat.value}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content wrapper — adds padding in full-page mode; two-column on desktop */}
          <div style={{ padding: fullPage ? "20px 20px 0" : "0" }}>
          {/* Desktop two-column layout wrapper — only active in fullPage mode */}
          <div className={fullPage ? "job-detail-layout" : ""}>
          {/* ── MAIN COLUMN ── */}
          <div>

          <div className="mb-4 overflow-hidden rounded-[24px] border border-amber-200/40 shadow-sm" style={{ background: `linear-gradient(135deg, ${illustrationPalette.soft}, #ffffff 60%)` }}>
            <div className="grid grid-cols-1 items-center gap-4 px-4 py-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.24em]" style={{ color: illustrationPalette.primary }}>Career Preview</div>
                <div className="mt-2 text-[22px] font-black leading-tight text-[var(--text-dark)]">What this life can actually look like after selection</div>
                <div className="mt-2 text-[13px] leading-relaxed text-[var(--text-body)]">
                  Premium perks, a defined ladder, and a role people instantly respect. This card is the visual promise behind the exam grind.
                </div>
              </div>
              <div className="rounded-[20px] px-3 py-2" style={{ background: `${illustrationPalette.primary}08` }}>
                <JobCategoryIllustration category={job.category} />
              </div>
            </div>
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

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-white px-4 py-4 shadow-sm">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-emerald-700">Real Monthly Package</div>
              <div className="mt-2 text-[30px] font-black text-emerald-600" style={{ fontFamily: "'Outfit'" }}>
                <CountUpINR value={realMonthly} />
              </div>
              <div className="mt-1 text-[12px] leading-relaxed text-emerald-800">Salary + premium perks students usually ignore in the headline figure.</div>
            </div>
            <div className="rounded-3xl border border-red-200/60 bg-gradient-to-br from-red-50 to-white px-4 py-4 shadow-sm">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-red-700">Estimated Selection Odds</div>
              <div className="mt-2 text-[30px] font-black text-red-600" style={{ fontFamily: "'Outfit'" }}>{selectionOdds}</div>
              <div className="mt-1 text-[12px] leading-relaxed text-red-800">Approximate odds based on the exam difficulty band, so the ambition feels real.</div>
            </div>
            <div className="rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white px-4 py-4 shadow-sm">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-amber-700">Peak Career Snapshot</div>
              <div className="mt-2 text-[19px] font-black leading-tight text-amber-900">{peakRole?.title}</div>
              <div className="mt-2 text-[24px] font-black text-amber-700" style={{ fontFamily: "'Outfit'" }}>{peakRole?.salary}</div>
              <div className="mt-1 text-[12px] leading-relaxed text-amber-900">{peakRole?.years}</div>
            </div>
          </div>

          <Divider />
          <SectionLabel icon="💰" text="Salary Calculator" color="#2563EB" />
          <SalaryCalc job={job} />

          <Divider />

          {/* ── Career Growth — Horizontal scroll ── */}
          <SectionLabel icon="📈" text="Career Growth Path" color={catColor} />
          <CareerTimeline promotionPath={job.promotionPath} color={catColor} />

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

          {/* Lifestyle preview */}
          <SectionLabel icon="🏠" text="Life After Selection" color="#2563EB" />
          <div style={{ marginBottom: 16 }}>
            {(() => {
              const lifestyleText = job.lifestyle || "";
              const extractSentence = (re: RegExp) => {
                const m = lifestyleText.match(re);
                return m?.[1]?.trim();
              };

              const housingHint =
                extractSentence(/(leased accommodation[^.]*\.)/i) ||
                extractSentence(/(leased housing[^.]*\.)/i) ||
                extractSentence(/(accommodation[^.]*\.)/i) ||
                extractSentence(/(quarters?[^.]*\.)/i) ||
                "Government housing support or rent allowance (varies by posting).";

              const workHint =
                extractSentence(/(work hours[^.]*\.)/i) ||
                extractSentence(/(\b\d{1,2}\s*(?:am|pm)[^.]*\.)/i) ||
                "Mostly predictable hours, with peak days during deadlines.";

              const transfersHint =
                extractSentence(/(transfers?[^.]*\.)/i) ||
                "Transfers happen — but you get stability + growth across cities.";

              const leavesHint =
                job.benefits.find(b => /leave/i.test(b)) ||
                "30+ paid leaves + holidays (role-dependent).";

              const timeline = parseDayInLifeTimeline(job.dayInLife);

              const dayInLifeMap: Record<string, string> = {
                "ias": "ias-district-magistrate",
                "sbi-po": "sbi-po-bank-manager",
                "income-tax-inspector": "income-tax-inspector",
                "station-master": "railway-station-master",
                "rbi-grade-b": "rbi-grade-b",
                "nda": "nda-army-officer",
              };
              const articleSlug = dayInLifeMap[job.id];

              // 6 aspirational lifestyle cards
              const lifestyleCards = [
                {
                  icon: "🏠",
                  title: "Government Housing",
                  detail: housingHint.replace(/\.$/, ""),
                  bg: "#FFF7ED", border: "#FED7AA", color: "#C2410C",
                },
                {
                  icon: "🚗",
                  title: "Official Vehicle",
                  detail: job.category === "upsc" || job.category === "defence"
                    ? "Official vehicle with driver for field duties and official work."
                    : "Transport allowance covers your daily commute comfortably.",
                  bg: "#EFF6FF", border: "#BFDBFE", color: "#1D4ED8",
                },
                {
                  icon: "⏰",
                  title: "Work Hours",
                  detail: workHint.replace(/\.$/, ""),
                  bg: "#F0FDF4", border: "#BBF7D0", color: "#15803D",
                },
                {
                  icon: "🏥",
                  title: "Free Medical",
                  detail: "Cashless CGHS / departmental medical for you and your entire family.",
                  bg: "#FDF2F8", border: "#F9A8D4", color: "#BE185D",
                },
                {
                  icon: "🏖️",
                  title: "30 Paid Leaves",
                  detail: String(leavesHint).replace(/\.$/, "") + " — plus national holidays.",
                  bg: "#F0FDFA", border: "#99F6E4", color: "#0F766E",
                },
                {
                  icon: "💰",
                  title: "Pension for Life",
                  detail: "NPS builds a retirement corpus. After 30 years, a monthly pension — for life.",
                  bg: "#FEFCE8", border: "#FDE68A", color: "#92400E",
                },
              ];

              return (
                <>
                  {/* 6 aspirational cards — 3 col desktop, 2 col mobile */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 10,
                    marginBottom: 16,
                  }}>
                    {lifestyleCards.map((card) => (
                      <div key={card.title} style={{
                        background: card.bg,
                        borderRadius: 16,
                        padding: "14px 12px",
                        border: `2px solid ${card.border}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: `${card.color}18`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 20,
                        }}>
                          {card.icon}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>
                          {card.title}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
                          {card.detail}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Day in the Life — colored timeline */}
                  <div style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "16px",
                    border: "2px solid #FDE68A",
                    marginBottom: 12,
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      marginBottom: 14,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#92400E", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        ⏱ Day in the Life
                      </div>
                      {articleSlug && (
                        <Link href={`/life/${articleSlug}`} style={{ fontSize: 11, fontWeight: 700, color: "#D97706", textDecoration: "none" }}>
                          Full story →
                        </Link>
                      )}
                    </div>
                    <LifestyleTimeline items={timeline.slice(0, 8)} />
                  </div>
                </>
              );
            })()}
          </div>

          {/* Benefits */}
          <SectionLabel icon="🎁" text="Benefits & Perks" color="#D97706" />
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefitCards.map((b) => (
              <div key={b.id} className="card-premium rounded-2xl border border-amber-200/40 bg-gradient-to-br from-amber-50 via-white to-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-[20px] text-amber-800 shadow-sm">
                    {b.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold text-[var(--text-dark)]">{b.title}</div>
                    <div className="mt-1 text-[12px] leading-relaxed text-[var(--text-body)]">{b.dream}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-emerald-200/30 bg-emerald-50/60 px-3 py-2">
                  <div className="text-[11px] font-semibold text-emerald-700">Estimated value</div>
                  <div className="text-[12px] font-extrabold text-emerald-700">{b.valueText}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Effective CTC Banner */}
          <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 12, border: "2px solid #FDE68A", boxShadow: "0 4px 20px rgba(245,158,11,0.12)" }}>
            <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Total Effective CTC</div>
                <div style={{ fontSize: 13, color: "#CBD5E1", fontWeight: 500 }}>Cash in-hand + all perks & benefits</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#FCD34D", fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
                  <CountUpINR value={realMonthly} />
                </div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>/month</div>
              </div>
            </div>
            {privateCtc && (
              <div style={{ background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontSize: 12, color: "#92400E", fontWeight: 600 }}>🏢 Private sector equivalent</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#92400E", fontFamily: "'Outfit', sans-serif" }}>₹{privateCtc.low}–{privateCtc.high} LPA</div>
              </div>
            )}
          </div>

          <div className="mb-4 rounded-xl border border-amber-200/40 bg-amber-50/60 px-3 py-2">
            <div className="text-[11px] text-amber-800">
              Cash allowances like HRA/DA are already in the in-hand figure. The green perks above are <strong>extra lifestyle value</strong> on top.
            </div>
          </div>

          <Divider />

          {/* Fit guide */}
          <SectionLabel icon="🤔" text="Is This Right for You?" color="#0D9488" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {/* Choose if column */}
            <div style={{ borderRadius: 16, overflow: "hidden", border: "2px solid #BBF7D0" }}>
              <div style={{ background: "#16A34A", padding: "10px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>✅ Choose if...</div>
              </div>
              <div style={{ background: "#F0FDF4", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                {job.fitGuide.chooseIf.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "8px 10px", background: "#fff", borderRadius: 10, border: "1px solid #BBF7D0" }}>
                    <span style={{ fontSize: 14, flexShrink: 0, color: "#16A34A", marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 12, color: "#065F46", lineHeight: 1.5, fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Avoid if column */}
            <div style={{ borderRadius: 16, overflow: "hidden", border: "2px solid #FECACA" }}>
              <div style={{ background: "#DC2626", padding: "10px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>✗ Avoid if...</div>
              </div>
              <div style={{ background: "#FEF2F2", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                {job.fitGuide.avoidIf.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "8px 10px", background: "#fff", borderRadius: 10, border: "1px solid #FECACA" }}>
                    <span style={{ fontSize: 14, flexShrink: 0, color: "#DC2626", marginTop: 1 }}>✗</span>
                    <span style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5, fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
              </div>
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

          {/* End main column */}
          </div>

          {/* ── DESKTOP SIDEBAR — only rendered in fullPage mode ── */}
          {fullPage && (
            <div style={{ display: "none" }} className="job-detail-sidebar">
              {/* Ad zone — Google AdSense placeholder */}
              <div style={{
                borderRadius: 16,
                border: "1.5px dashed #D1D5DB",
                background: "#F9FAFB",
                padding: "20px 16px",
                textAlign: "center",
                marginBottom: 16,
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}>
                <div style={{ fontSize: 20 }}>📢</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>Advertisement</div>
                <div style={{ fontSize: 10, color: "#D1D5DB" }}>Google AdSense</div>
              </div>

              {/* Sticky key stats card */}
              <div style={{
                position: "sticky",
                top: 72,
                borderRadius: 20,
                border: "1.5px solid var(--border)",
                background: "#fff",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                marginBottom: 16,
              }}>
                <div style={{
                  background: `linear-gradient(135deg, ${catColor} 0%, ${catColor}cc 100%)`,
                  padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Quick Facts</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "'Outfit', sans-serif" }}>{job.title}</div>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "💰", label: "In-Hand Salary", value: job.inHand, color: "#16A34A" },
                    { icon: "👥", label: "Vacancies", value: job.vacancies.toLocaleString(), color: "#2563EB" },
                    { icon: "📅", label: "Last Date", value: job.lastDate.split(",")[0], color: "#DC2626" },
                    { icon: "📖", label: "Exam", value: job.exam.split("→")[0].trim(), color: "#7C3AED" },
                    { icon: "⏱", label: "Prep Time", value: job.prepTime, color: "#D97706" },
                    { icon: "🎓", label: "Qualification", value: job.qualification, color: "#0D9488" },
                  ].map((item) => (
                    <div key={item.label} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 10px",
                      background: "#F9FAFB",
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                    }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: item.color, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "0 16px 16px" }}>
                  <Link href="/ai-practice" style={{ textDecoration: "none", display: "block" }}>
                    <div style={{
                      padding: "12px",
                      background: `linear-gradient(90deg, ${catColor}, #0D9488)`,
                      color: "#fff",
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 700,
                      textAlign: "center",
                      boxShadow: `0 4px 16px ${catColor}30`,
                    }}>🎯 Start Preparing</div>
                  </Link>
                </div>
              </div>

              {/* Second ad zone */}
              <div style={{
                borderRadius: 16,
                border: "1.5px dashed #D1D5DB",
                background: "#F9FAFB",
                padding: "20px 16px",
                textAlign: "center",
                minHeight: 250,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}>
                <div style={{ fontSize: 20 }}>📢</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>Advertisement</div>
                <div style={{ fontSize: 10, color: "#D1D5DB" }}>Google AdSense</div>
              </div>
            </div>
          )}

          {/* End two-column wrapper */}
          </div>

          {/* End content wrapper */}
          </div>
        </div>
      </div>
    </div>
  );
}
