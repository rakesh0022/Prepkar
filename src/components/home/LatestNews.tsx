"use client";

const NEWS = [
  {
    title: "SSC CGL 2026 Notification Released — 14,582 Vacancies",
    source: "Jagran Josh",
    url: "https://www.jagranjosh.com/articles/ssc-cgl-notification-1643694498-1",
    date: "Apr 2026",
    tag: "SSC",
    tagColor: "#2563EB",
    hot: true,
  },
  {
    title: "SBI PO 2026 Registration Begins — Apply Before May 15",
    source: "SBI Official",
    url: "https://sbi.bank.in/web/careers/current-openings",
    date: "Apr 2026",
    tag: "Banking",
    tagColor: "#0C7C59",
    hot: true,
  },
  {
    title: "UPSC CSE 2026 Prelims on June 1 — Last-Minute Strategy",
    source: "Sarkari Result",
    url: "https://www.sarkariresult.com/upsc/",
    date: "Apr 2026",
    tag: "UPSC",
    tagColor: "#7C3AED",
    hot: false,
  },
  {
    title: "RRB NTPC 2026 — 11,558 Posts, CBT-1 Date Announced",
    source: "Railway Board",
    url: "https://www.rrbapply.gov.in/",
    date: "Mar 2026",
    tag: "Railway",
    tagColor: "#DC2626",
    hot: false,
  },
  {
    title: "Delhi Police Constable 2026 — 6,433 Vacancies Open",
    source: "SSC Official",
    url: "https://ssc.gov.in/login",
    date: "Mar 2026",
    tag: "Defence",
    tagColor: "#0D9488",
    hot: false,
  },
];

export default function LatestNews() {
  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 1.5, textTransform: "uppercase" }}>
            📰 Latest Notifications
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
            Fresh updates from official sources
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {NEWS.map((n, i) => (
          <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{
              background: "#FFFFFF", borderRadius: 12, padding: "12px 14px",
              border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
              display: "flex", gap: 12, alignItems: "flex-start",
              transition: "box-shadow 0.2s",
            }}>
              <div style={{
                width: 4, borderRadius: 2, alignSelf: "stretch", flexShrink: 0,
                background: n.tagColor,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 4, alignItems: "center" }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 4,
                    background: `${n.tagColor}10`, color: n.tagColor,
                  }}>{n.tag}</span>
                  {n.hot && <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 4, background: "#FEF2F2", color: "#DC2626" }}>🔥 NEW</span>}
                  <span style={{ fontSize: 9, color: "#9CA3AF", marginLeft: "auto" }}>{n.date}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", lineHeight: 1.4, marginBottom: 3 }}>{n.title}</div>
                <div style={{ fontSize: 10, color: "#2563EB", fontWeight: 600 }}>{n.source} →</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
