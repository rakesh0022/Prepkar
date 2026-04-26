"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface Story {
  name: string;
  achievement: string;
  now: string;
  quote: string;
  emoji: string;
  tag: string;
  color: string;
  image?: string;
  examDetails?: string;
  rank?: string;
  attempt?: string;
}

interface Props {
  stories: Story[];
}

// Derive exam details from existing data fields
function getExamDetails(s: Story): string {
  if (s.examDetails) return s.examDetails;
  const parts: string[] = [];
  parts.push(s.achievement);
  if (s.rank) parts.push(`Rank: ${s.rank}`);
  if (s.attempt) parts.push(`Attempt: ${s.attempt}`);
  return parts.join(" | ");
}

// Per-tag gradient backgrounds
const TAG_GRADIENTS: Record<string, string> = {
  "UPSC":      "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
  "Banking":   "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
  "SSC":       "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
  "Railway":   "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
  "Defence":   "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)",
  "State PSC": "linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)",
};

function StoryCard({
  story,
  active,
}: {
  story: Story;
  active: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const bg = TAG_GRADIENTS[story.tag] || "linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)";
  const examLine = getExamDetails(story);

  return (
    <div
      style={{
        background: bg,
        borderRadius: 20,
        padding: "20px 18px 18px",
        border: `1.5px solid ${story.color}20`,
        boxShadow: active
          ? `0 8px 32px ${story.color}20, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        height: "100%",
        transition: "box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Decorative large quote mark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -8,
          right: 14,
          fontSize: 96,
          lineHeight: 1,
          color: story.color,
          opacity: 0.07,
          fontFamily: "Georgia, serif",
          fontWeight: 900,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>

      {/* Header: photo + name + tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            flexShrink: 0,
            background: `${story.color}18`,
            border: `2.5px solid ${story.color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            overflow: "hidden",
          }}
        >
          {story.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image}
                alt={story.name}
                width={48}
                height={48}
                style={{ width: 48, height: 48, objectFit: "cover", borderRadius: "50%" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const sib = (e.target as HTMLImageElement).nextElementSibling as HTMLElement | null;
                  if (sib) sib.style.removeProperty("display");
                }}
              />
              <span style={{ display: "none" }}>{story.emoji}</span>
            </>
          ) : (
            story.emoji
          )}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>
            {story.name}
          </div>
          <div style={{ fontSize: 11, color: story.color, fontWeight: 700, marginTop: 2 }}>
            {story.now}
          </div>
        </div>
        {/* Tag pill */}
        <div
          style={{
            flexShrink: 0,
            fontSize: 9,
            fontWeight: 800,
            color: story.color,
            background: `${story.color}15`,
            padding: "3px 8px",
            borderRadius: 8,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {story.tag}
        </div>
      </div>

      {/* Exam details line */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#6B7280",
          background: "rgba(0,0,0,0.04)",
          borderRadius: 8,
          padding: "5px 10px",
          letterSpacing: "0.02em",
        }}
      >
        🏆 {examLine}
      </div>

      {/* Quote */}
      <div style={{ position: "relative", flex: 1 }}>
        <p
          style={{
            fontSize: 13,
            color: "#374151",
            fontStyle: "italic",
            lineHeight: 1.65,
            margin: 0,
            borderLeft: `3px solid ${story.color}50`,
            paddingLeft: 10,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: expanded ? 999 : 3,
            transition: "all 0.3s ease",
          }}
        >
          &ldquo;{story.quote}&rdquo;
        </p>
      </div>

      {/* Footer: expand + read more */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: story.color,
            background: `${story.color}12`,
            border: "none",
            borderRadius: 8,
            padding: "5px 10px",
            cursor: "pointer",
            minHeight: 44,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
        <Link
          href="/stories"
          onClick={(e) => e.stopPropagation()}
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: story.color,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 3,
            minHeight: 44,
            padding: "5px 4px",
          }}
        >
          Full Story →
        </Link>
      </div>
    </div>
  );
}

export default function StoriesStrip({ stories }: Props) {
  const total = stories.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll the carousel track to a given card index — never touches page scroll
  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (card) {
      // Use scrollLeft on the container, NOT scrollIntoView (which moves the page)
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
    setCurrent(idx);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % total;
        const track = trackRef.current;
        if (track) {
          const card = track.children[next] as HTMLElement | undefined;
          if (card) track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [paused, total]);

  // Sync dot indicator with scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth || 1;
      const idx = Math.round(track.scrollLeft / (cardWidth + 12)); // 12 = gap
      setCurrent(Math.min(idx, total - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [total]);

  return (
    <section style={{ marginBottom: 20 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#6B7280",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            ⭐ Success Stories
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
            If they can do it, so can you
          </div>
        </div>
        <Link
          href="/stories"
          style={{ fontSize: 11, color: "#2563EB", fontWeight: 600, textDecoration: "none", flexShrink: 0, minHeight: 44, display: "flex", alignItems: "center" }}
        >
          View All →
        </Link>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="hide-scrollbar no-scroll stories-track"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 4,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {stories.map((s, i) => (
          <div
            key={i}
            className="story-card-wrap"
            style={{
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
          >
            <StoryCard story={s} active={i === current} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 12,
        }}
      >
        {stories.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to story ${i + 1}`}
            style={{
              width: i === current ? 20 : 7,
              height: 7,
              borderRadius: 4,
              background: i === current ? "#2563EB" : "#D1D5DB",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              minHeight: 44,
              display: "flex",
              alignSelf: "center",
            }}
          />
        ))}
      </div>

      {/* Responsive card sizing */}
      <style>{`
        .story-card-wrap {
          width: calc(100vw - 48px);
          max-width: 320px;
        }
        @media (min-width: 768px) {
          .story-card-wrap {
            width: 300px;
          }
        }
        @media (min-width: 1024px) {
          .stories-track {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr);
            overflow-x: visible !important;
            scroll-snap-type: none !important;
          }
          .story-card-wrap {
            width: auto !important;
            max-width: none !important;
          }
        }
      `}</style>
    </section>
  );
}
