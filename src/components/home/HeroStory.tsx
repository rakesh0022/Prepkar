"use client";
import Link from "next/link";

const MANTRAS = [
  "Log bolte hain nahi hoga — par selection wahi karta hai jo rukta nahi.",
  "Ek din ya Day One. Aaj se shuru karo.",
  "Mehnat karo itni ki kismat bhi sharminda ho jaye.",
  "Sapna bada rakh, neend chhoti kar.",
  "Haar tab hoti hai jab tum koshish karna band kar do.",
  "Tumhara selection sirf ek mock interview door hai.",
  "Ghar wale poochh rahe hain? Unhe result se jawab do.",
];

export const HERO_STORIES = [
  {
    name: "Priya Sharma",
    tag: "SSC CGL",
    tagColor: "#2563eb",
    emoji: "👩‍💻",
    achievement: "Income Tax Inspector, Delhi",
    shortQuote: "Failed 3 times. Family said give up. 4th attempt — I cracked it. ₹65,000/month + govt quarter in Delhi.",
    fullQuote: "Failed 3 times. My family asked me to give up. I cried many nights. But on the 4th attempt, I cracked it.",
    bgGradient: "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.04) 100%)",
    border: "rgba(37,99,235,0.25)",
  },
  {
    name: "Arunraj K",
    tag: "SBI PO",
    tagColor: "#16a34a",
    emoji: "👨‍💼",
    achievement: "Probationary Officer, SBI Chennai",
    shortQuote: "Village kid, farmer's son. Phone + free YouTube. 200+ mocks. Cleared SBI PO on the 1st attempt.",
    fullQuote: "I am from a small village in Tamil Nadu. My father is a farmer. If I can clear SBI PO, anyone can.",
    bgGradient: "linear-gradient(135deg, rgba(22,163,74,0.18) 0%, rgba(22,163,74,0.04) 100%)",
    border: "rgba(22,163,74,0.25)",
  },
  {
    name: "Rohit Meena",
    tag: "Railway",
    tagColor: "#dc2626",
    emoji: "🧑‍✈️",
    achievement: "Station Master, Kota Junction",
    shortQuote: "Free railway pass for life. Took parents to Kerala — first time they saw the sea. This job changed everything.",
    fullQuote: "FREE travel across India for my entire family forever! Last month I took my parents to Kerala — first time they saw the sea.",
    bgGradient: "linear-gradient(135deg, rgba(220,38,38,0.18) 0%, rgba(220,38,38,0.04) 100%)",
    border: "rgba(220,38,38,0.25)",
  },
  {
    name: "Sneha Patil",
    tag: "MPSC",
    tagColor: "#ea580c",
    emoji: "👩‍⚖️",
    achievement: "Deputy Collector, Satara",
    shortQuote: "Marathi medium, small town. People said it was too hard. Now I serve my own district as an officer.",
    fullQuote: "People said state services are very hard. But I studied smartly. Now I serve my own district as an officer.",
    bgGradient: "linear-gradient(135deg, rgba(234,88,12,0.18) 0%, rgba(234,88,12,0.04) 100%)",
    border: "rgba(234,88,12,0.25)",
  },
  {
    name: "Tina Dabi",
    tag: "UPSC",
    tagColor: "#9333ea",
    emoji: "👩‍💼",
    achievement: "IAS Officer — AIR 1, UPSC 2015",
    shortQuote: "8 hours daily, 2 years. NCERT is the foundation. Consistency is the only secret.",
    fullQuote: "Consistency is the only secret. Don't chase too many sources — master a few.",
    bgGradient: "linear-gradient(135deg, rgba(147,51,234,0.18) 0%, rgba(147,51,234,0.04) 100%)",
    border: "rgba(147,51,234,0.25)",
  },
];

function getTodayIndex() {
  return new Date().getDay() % HERO_STORIES.length;
}

function getTodayMantra() {
  return MANTRAS[new Date().getDay() % MANTRAS.length];
}

export default function HeroStory() {
  const story = HERO_STORIES[getTodayIndex()];
  const mantra = getTodayMantra();

  return (
    <section className="fade-up" style={{ marginBottom: 20 }}>
      {/* Mantra pill */}
      <div style={{
        textAlign: "center", marginBottom: 18,
      }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(90deg,rgba(251,191,36,0.12),rgba(245,158,11,0.06))",
          border: "1px solid rgba(251,191,36,0.2)",
          borderRadius: 20, padding: "6px 16px",
          fontSize: 12, fontWeight: 600, color: "#fcd34d",
          lineHeight: 1.5, maxWidth: 320, textAlign: "center",
        }}>
          💬 &ldquo;{mantra}&rdquo;
        </div>
      </div>

      {/* Story card */}
      <div style={{
        borderRadius: 20, padding: "20px 18px",
        background: story.bgGradient,
        border: `1px solid ${story.border}`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative glow blob */}
        <div style={{
          position: "absolute", top: -30, right: -30, width: 120, height: 120,
          borderRadius: "50%", background: story.tagColor,
          opacity: 0.06, filter: "blur(30px)", pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16, flexShrink: 0,
            background: `${story.tagColor}22`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26,
          }}>{story.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#f3f4f6", fontFamily: "'Outfit',sans-serif" }}>{story.name}</span>
              <span style={{
                background: `${story.tagColor}22`, color: story.tagColor,
                fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 8, letterSpacing: 0.5,
              }}>{story.tag}</span>
            </div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{story.achievement}</div>
          </div>
        </div>

        <p style={{
          fontSize: 14, color: "#e2e8f0", lineHeight: 1.65, fontStyle: "italic",
          borderLeft: `3px solid ${story.tagColor}`, paddingLeft: 12, margin: "0 0 16px",
        }}>
          &ldquo;{story.shortQuote}&rdquo;
        </p>

        {/* Primary CTA */}
        <Link href="/interview" style={{ textDecoration: "none" }}>
          <div style={{
            width: "100%", padding: "14px 16px",
            background: "linear-gradient(90deg,#059669,#0891b2)",
            borderRadius: 14, textAlign: "center",
            fontSize: 15, fontWeight: 800, color: "#fff",
            fontFamily: "'Outfit',sans-serif", letterSpacing: 0.2,
            boxShadow: "0 4px 24px rgba(5,150,105,0.35)",
          }}>
            🎯 Start Free Mock Interview
          </div>
        </Link>

        <p style={{ textAlign: "center", fontSize: 10, color: "#4b5563", marginTop: 8 }}>
          5 questions • AI scores your answers • 100% free
        </p>
      </div>
    </section>
  );
}
