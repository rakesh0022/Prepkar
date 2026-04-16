"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const TOPICS = ["All", "Polity", "Economy", "Science", "International", "Sports", "Awards", "Defence", "Banking", "Environment"];

const CURRENT_AFFAIRS = [
  // April 2026
  { date: "2026-04-14", topic: "Polity", fact: "Dr. B.R. Ambedkar Jayanti celebrated across India. President laid wreath at Parliament House.", importance: "High" },
  { date: "2026-04-13", topic: "Economy", fact: "RBI keeps repo rate unchanged at 6.0% in April 2026 MPC meeting. GDP growth projected at 6.7% for FY27.", importance: "High" },
  { date: "2026-04-13", topic: "Banking", fact: "SBI launches 'SBI Digi Plus' — a fully digital savings account with zero minimum balance for rural India.", importance: "Medium" },
  { date: "2026-04-12", topic: "International", fact: "India elected as non-permanent member of UN Security Council for 2027-28 term with highest votes.", importance: "High" },
  { date: "2026-04-12", topic: "Science", fact: "ISRO successfully launches Chandrayaan-4 mission to collect and return lunar soil samples to Earth.", importance: "High" },
  { date: "2026-04-11", topic: "Awards", fact: "National Film Awards 2025 announced — 'Laapataa Ladies' wins Best Hindi Film, Aamir Khan gets Special Jury Award.", importance: "Medium" },
  { date: "2026-04-11", topic: "Defence", fact: "Indian Navy commissions INS Arighat — India's second nuclear-powered ballistic missile submarine (SSBN).", importance: "High" },
  { date: "2026-04-10", topic: "Sports", fact: "India wins Thomas Cup 2026 for first time in history, defeating Indonesia 3-2 in the final.", importance: "High" },
  { date: "2026-04-10", topic: "Environment", fact: "India's total installed solar capacity crosses 200 GW milestone — now 3rd globally after China and USA.", importance: "High" },
  { date: "2026-04-09", topic: "Economy", fact: "India's forex reserves reach $685 billion — highest ever. Rupee strengthens to 82.4 against USD.", importance: "Medium" },
  { date: "2026-04-09", topic: "Polity", fact: "Supreme Court upholds validity of EWS reservation (103rd Amendment) in a 3:2 majority verdict.", importance: "High" },
  { date: "2026-04-08", topic: "Banking", fact: "SEBI introduces T+0 settlement for top 500 stocks from April 2026. India becomes first major market with same-day settlement.", importance: "High" },
  { date: "2026-04-08", topic: "International", fact: "PM Modi visits Germany for India-EU FTA talks. Both sides agree on 90% tariff elimination by 2028.", importance: "High" },
  { date: "2026-04-07", topic: "Science", fact: "IIT Madras develops India's first indigenous quantum computer with 50 qubits — named 'Qubit Bharat'.", importance: "High" },
  { date: "2026-04-07", topic: "Defence", fact: "HAL delivers first batch of LCA Tejas Mk2 to Indian Air Force. Total order is 97 aircraft.", importance: "High" },
  { date: "2026-04-06", topic: "Awards", fact: "Padma Awards 2026 — 7 Padma Vibhushan, 19 Padma Bhushan, and 113 Padma Shri awards announced by President.", importance: "Medium" },
  { date: "2026-04-06", topic: "Sports", fact: "Neeraj Chopra throws 90.12m at Diamond League Doha — sets new Asian record in javelin throw.", importance: "Medium" },
  { date: "2026-04-05", topic: "Economy", fact: "India overtakes Japan to become world's 4th largest economy with $4.18 trillion GDP (IMF data).", importance: "High" },
  { date: "2026-04-05", topic: "Environment", fact: "Project Cheetah Phase 2: 12 more South African cheetahs released in Gandhi Sagar Wildlife Sanctuary, Madhya Pradesh.", importance: "Medium" },
  { date: "2026-04-04", topic: "Polity", fact: "Delimitation Commission submits final report — 543 Lok Sabha seats redistributed based on 2025 Census data.", importance: "High" },
  { date: "2026-04-04", topic: "Banking", fact: "UPI transactions in March 2026 cross 18 billion — monthly transaction value exceeds ₹24 lakh crore.", importance: "Medium" },
  { date: "2026-04-03", topic: "International", fact: "BRICS New Development Bank approves $2 billion green energy fund. India to receive $500 million for solar projects.", importance: "Medium" },
  { date: "2026-04-03", topic: "Science", fact: "DRDO successfully tests hypersonic cruise missile 'Shaurya-2' with range of 1,500 km from Odisha coast.", importance: "High" },
  { date: "2026-04-02", topic: "Defence", fact: "India conducts first successful test of indigenous ballistic missile defence system 'Prithvi Air Defence' interceptor.", importance: "High" },
  { date: "2026-04-02", topic: "Economy", fact: "GST collection in March 2026 hits ₹2.10 lakh crore — highest ever single month collection.", importance: "High" },
  { date: "2026-04-01", topic: "Polity", fact: "New Criminal Laws — BNS, BNSS, BSA — complete 2 years of implementation. Conviction rate rises to 68%.", importance: "Medium" },
  { date: "2026-04-01", topic: "Banking", fact: "RBI launches 'Digital Rupee 2.0' with offline payment capability using NFC — works without internet.", importance: "High" },
  // March 2026
  { date: "2026-03-31", topic: "Economy", fact: "India's FY26 GDP growth finalized at 7.0% — fastest among G20 economies for 3rd consecutive year.", importance: "High" },
  { date: "2026-03-30", topic: "Science", fact: "India's first manned space mission Gaganyaan completes uncrewed test flight G1 — splash down in Bay of Bengal.", importance: "High" },
  { date: "2026-03-29", topic: "Sports", fact: "Indian women's cricket team wins inaugural Women's T20 Champions Trophy beating Australia in the final.", importance: "High" },
  { date: "2026-03-28", topic: "Environment", fact: "India announces 2030 Net Zero target for government buildings. All new govt construction to be GRIHA 5-star rated.", importance: "Medium" },
  { date: "2026-03-27", topic: "International", fact: "India-Middle East-Europe Economic Corridor (IMEC) begins operations — first cargo ship departs from Mundra Port.", importance: "High" },
  { date: "2026-03-26", topic: "Defence", fact: "Indian Army inducts first regiment of indigenous Pinaka Mark-II multi-barrel rocket launchers.", importance: "Medium" },
  { date: "2026-03-25", topic: "Banking", fact: "Account Aggregator ecosystem crosses 100 million linked accounts — revolutionizing credit access in India.", importance: "Medium" },
  { date: "2026-03-24", topic: "Polity", fact: "Election Commission announces dates for 5 state assembly elections — Assam, Kerala, Tamil Nadu, West Bengal, Puducherry.", importance: "High" },
  { date: "2026-03-23", topic: "Awards", fact: "Bhagat Singh's 95th Martyrdom Day. Government announces posthumous Bharat Ratna for Shaheed Bhagat Singh.", importance: "High" },
];

export default function CurrentAffairsPage() {
  const [selTopic, setSelTopic] = useState("All");

  const filtered = selTopic === "All" ? CURRENT_AFFAIRS : CURRENT_AFFAIRS.filter(c => c.topic === selTopic);

  // Group by date
  const grouped: Record<string, typeof CURRENT_AFFAIRS> = {};
  filtered.forEach(c => {
    const d = new Date(c.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(c);
  });

  const topicColors: Record<string, string> = {
    Polity: "#7C3AED", Economy: "#16A34A", Science: "#2563EB", International: "#0D9488",
    Sports: "#DC2626", Awards: "#D97706", Defence: "#134E4A", Banking: "#0C7C59", Environment: "#059669",
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: "#6B7280", fontSize: 15, textDecoration: "none" }}>←</Link>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>Current Affairs</h1>
          <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, color: "#16A34A", background: "#F0FDF4", padding: "3px 8px", borderRadius: 6, border: "1px solid rgba(22,163,74,0.12)" }}>Updated Daily</span>
        </div>
        {/* Topic filter */}
        <div className="no-scroll" style={{ display: "flex", gap: 6, overflowX: "auto", padding: "0 16px 10px" }}>
          {TOPICS.map(t => (
            <button key={t} onClick={() => setSelTopic(t)} style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer",
              flexShrink: 0, whiteSpace: "nowrap",
              background: selTopic === t ? (t === "All" ? "#2563EB" : topicColors[t] || "#2563EB") : "#FFFFFF",
              color: selTopic === t ? "#fff" : "#6B7280",
              boxShadow: selTopic === t ? `0 2px 8px ${(topicColors[t] || "#2563EB")}30` : "0 1px 2px rgba(0,0,0,0.04)",
            }}>{t}</button>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, background: "#EFF6FF", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(37,99,235,0.12)" }}>
          <span style={{ fontSize: 16 }}>💡</span>
          <span style={{ fontSize: 11, color: "#1E3A5F", lineHeight: 1.4 }}>Read 5 facts daily = 150/month. That&apos;s enough for any GK section. Bookmark this page!</span>
        </div>

        {Object.entries(grouped).map(([date, items]) => (
          <div key={date} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 8, position: "sticky", top: 90, background: "var(--bg)", padding: "4px 0", zIndex: 10 }}>{date}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((item, i) => (
                <div key={i} className="anim-up" style={{
                  background: "#FFFFFF", borderRadius: 12, padding: "14px 16px",
                  border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                  borderLeft: `3px solid ${topicColors[item.topic] || "#6B7280"}`,
                }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4,
                      background: `${topicColors[item.topic]}10`, color: topicColors[item.topic],
                    }}>{item.topic}</span>
                    {item.importance === "High" && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: "#FEF2F2", color: "#DC2626" }}>Important</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: "#111827", lineHeight: 1.6, margin: 0 }}>{item.fact}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", padding: "20px 0", color: "#9CA3AF" }}>
          <p style={{ fontSize: 12 }}>More facts added daily. Check back tomorrow!</p>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
