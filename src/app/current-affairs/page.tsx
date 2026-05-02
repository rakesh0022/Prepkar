"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import SaveArticleButton from "@/components/reading/SaveArticleButton";
import { CURRENT_AFFAIRS, CURRENT_AFFAIRS_META, type CurrentAffairsEntry } from "@/components/data";
import { makeCurrentAffairsSlug, makeSavedArticleId } from "@/lib/savedArticles";

const TOPICS = ["All", "Polity", "Economy", "Science", "International", "Sports", "Awards", "Defence", "Banking", "Environment"];

const topicColors: Record<string, string> = {
  Polity: "#7C3AED",
  Economy: "#16A34A",
  Science: "#2563EB",
  International: "#0D9488",
  Sports: "#DC2626",
  Awards: "#D97706",
  Defence: "#134E4A",
  Banking: "#0C7C59",
  Environment: "#059669",
};

const topicIcons: Record<string, string> = {
  Polity: "🏛️",
  Economy: "💹",
  Science: "🧪",
  International: "🌍",
  Sports: "🏅",
  Awards: "🏆",
  Defence: "🛡️",
  Banking: "🏦",
  Environment: "🌿",
};

type TimeFilter = 'week' | 'month' | '3months';

// Quiz questions based on facts
const generateQuiz = (facts: CurrentAffairsEntry[]) => {
  if (facts.length === 0) return null;
  
  const fact = facts[Math.floor(Math.random() * Math.min(5, facts.length))];
  
  // Simple quiz generation - in production, you'd have pre-written questions
  return {
    question: `Which topic does this relate to: "${fact.fact.substring(0, 60)}..."?`,
    options: [fact.topic, ...TOPICS.filter(t => t !== 'All' && t !== fact.topic).slice(0, 3)].sort(() => Math.random() - 0.5),
    correct: fact.topic,
    explanation: `This fact is about ${fact.topic}. Source: ${fact.source}`,
  };
};

export default function CurrentAffairsPage() {
  const [selTopic, setSelTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<number, boolean>>({});

  // Calculate date ranges
  const now = new Date();
  const getDateThreshold = () => {
    const date = new Date(now);
    if (timeFilter === 'week') {
      date.setDate(date.getDate() - 7);
    } else if (timeFilter === 'month') {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setMonth(date.getMonth() - 3);
    }
    return date;
  };

  // Filter and search
  const filtered = useMemo(() => {
    const threshold = getDateThreshold();
    
    return CURRENT_AFFAIRS.filter((entry) => {
      const entryDate = new Date(entry.date);
      const matchesTopic = selTopic === "All" || entry.topic === selTopic;
      const matchesTime = entryDate >= threshold;
      const matchesSearch = searchQuery === "" || 
        entry.fact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.topic.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTopic && matchesTime && matchesSearch;
    });
  }, [selTopic, searchQuery, timeFilter]);

  // Count facts per category
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach(entry => {
      counts[entry.topic] = (counts[entry.topic] || 0) + 1;
    });
    return counts;
  }, [filtered]);

  // Calculate stats
  const todayFacts = CURRENT_AFFAIRS.filter(e => {
    const d = new Date(e.date);
    return d.toDateString() === now.toDateString();
  }).length;

  const weekFacts = CURRENT_AFFAIRS.filter(e => {
    const d = new Date(e.date);
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo;
  }).length;

  const importantThisWeek = CURRENT_AFFAIRS.filter(e => {
    const d = new Date(e.date);
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo && e.importance === 'High';
  }).length;

  // Group by date
  const grouped = filtered.reduce<Record<string, CurrentAffairsEntry[]>>((acc, entry) => {
    const dateLabel = new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(entry);
    return acc;
  }, {});

  const handleShare = (fact: CurrentAffairsEntry) => {
    const text = `📰 Current Affair\n\n${fact.fact}\n\n📌 ${fact.topic} | Source: ${fact.source}\n\n— via NaukriYatra\nhttps://prepkar.vercel.app/current-affairs`;
    
    if (navigator.share) {
      navigator.share({ title: 'Current Affair', text, url: 'https://prepkar.vercel.app/current-affairs' });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Header */}
      <div style={{ background: "var(--bg-card)", borderBottom: "2px solid var(--border)", paddingBottom: 12 }}>
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/" style={{ color: "var(--text-light)", fontSize: 18, textDecoration: "none", fontWeight: "700" }}>←</Link>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--text-dark)", marginBottom: 2, letterSpacing: '-0.02em' }}>Current Affairs</h1>
            <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>
              Updated {new Date(CURRENT_AFFAIRS_META.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Daily Summary Card */}
        <div style={{ 
          margin: "0 16px 12px", 
          background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(37,99,235,0.15))", 
          borderRadius: 16, 
          padding: 16,
          border: "2px solid rgba(37,99,235,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 32 }}>📊</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1e40af", marginBottom: 4 }}>Your Daily Digest</div>
              <div style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 600 }}>
                Today: {todayFacts} new facts • This week: {weekFacts} facts | {importantThisWeek} marked Important
              </div>
            </div>
          </div>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 8, 
            background: "rgba(255,255,255,0.7)", 
            padding: "8px 12px", 
            borderRadius: 10,
          }}>
            <span style={{ fontSize: 18 }}>🔥</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1e40af" }}>
              Your streak: Read 5 days in a row!
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div style={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 40, 
        background: "color-mix(in srgb, var(--bg) 98%, transparent)", 
        backdropFilter: "blur(12px)",
        borderBottom: "2px solid var(--border)",
        padding: "12px 16px",
      }}>
        {/* Search */}
        <div style={{ marginBottom: 12 }}>
          <input 
            type="text"
            placeholder="🔍 Search current affairs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-dark)",
              fontSize: 14,
              fontWeight: 600,
              outline: "none",
            }}
          />
        </div>

        {/* Time Filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {[
            { id: 'week' as TimeFilter, label: 'This Week' },
            { id: 'month' as TimeFilter, label: 'This Month' },
            { id: '3months' as TimeFilter, label: 'Last 3 Months' },
          ].map(tf => (
            <button
              key={tf.id}
              onClick={() => setTimeFilter(tf.id)}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                border: timeFilter === tf.id ? "2px solid #3b82f6" : "2px solid var(--border)",
                background: timeFilter === tf.id ? "rgba(37,99,235,0.1)" : "var(--bg-card)",
                color: timeFilter === tf.id ? "#3b82f6" : "var(--text-light)",
                cursor: "pointer",
              }}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="no-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {TOPICS.map((topic) => {
            const count = topic === 'All' ? filtered.length : topicCounts[topic] || 0;
            return (
              <button
                key={topic}
                onClick={() => setSelTopic(topic)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  background: selTopic === topic ? (topic === "All" ? "#3b82f6" : topicColors[topic] || "#3b82f6") : "var(--bg-card-2)",
                  color: selTopic === topic ? "#fff" : "var(--text-light)",
                  boxShadow: selTopic === topic ? `0 4px 12px ${(topicColors[topic] || "#3b82f6")}30` : "none",
                }}
              >
                {topic} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>No facts found</div>
            <div style={{ fontSize: 14 }}>Try adjusting your filters or search query</div>
          </div>
        ) : (
          Object.entries(grouped).map(([date, items], groupIndex) => (
            <div key={date} style={{ marginBottom: 32 }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 800, 
                color: "var(--text-dark)", 
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                <span style={{ 
                  width: 4, 
                  height: 16, 
                  background: "linear-gradient(to bottom, #3b82f6, #2563eb)", 
                  borderRadius: 2,
                }} />
                {date}
              </div>

              <div className="desktop-2col" style={{ gap: 16 }}>
                {items.map((item) => {
                  const slug = makeCurrentAffairsSlug(item.date, item.topic, item.fact);
                  const accent = topicColors[item.topic] || "#6B7280";
                  const isImportant = item.importance === "High";
                  
                  // Extract first sentence as title
                  const sentences = item.fact.split(/[.!?]/);
                  const title = sentences[0] + (sentences[0].endsWith('.') ? '' : '.');
                  const body = sentences.slice(1).join('. ').trim();

                  const factDate = new Date(item.date);
                  const day = factDate.getDate();
                  const month = factDate.toLocaleDateString("en-IN", { month: "short" });

                  return (
                    <div
                      key={slug}
                      id={slug}
                      style={{
                        background: "var(--bg-card)",
                        borderRadius: 16,
                        padding: 16,
                        border: "2px solid var(--border)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        borderLeft: isImportant ? `4px solid #f59e0b` : `4px solid ${accent}`,
                        scrollMarginTop: 140,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div style={{ display: "flex", gap: 14 }}>
                        {/* Date Badge */}
                        <div style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: `0 4px 12px ${accent}30`,
                        }}>
                          <div style={{ fontSize: 20, fontWeight: 900, color: "white", lineHeight: 1 }}>{day}</div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase" }}>{month}</div>
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Category + Important */}
                          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                            <span style={{
                              fontSize: 10,
                              fontWeight: 800,
                              padding: "4px 10px",
                              borderRadius: 6,
                              background: `${accent}15`,
                              color: accent,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}>
                              {topicIcons[item.topic]} {item.topic}
                            </span>
                            {isImportant && (
                              <span style={{ 
                                fontSize: 10, 
                                fontWeight: 800, 
                                padding: "4px 10px", 
                                borderRadius: 6, 
                                background: "#fef3c7", 
                                color: "#d97706",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}>
                                ⭐ Important
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <div style={{ 
                            fontSize: 15, 
                            fontWeight: 800, 
                            color: "var(--text-dark)", 
                            marginBottom: 8,
                            lineHeight: 1.4,
                          }}>
                            {title}
                          </div>

                          {/* Body */}
                          {body && (
                            <p style={{ 
                              fontSize: 14, 
                              color: "var(--text-body)", 
                              lineHeight: 1.6, 
                              margin: "0 0 12px 0",
                            }}>
                              {body}
                            </p>
                          )}

                          {/* Source */}
                          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12, fontWeight: 600 }}>
                            📄 Source: {item.source}
                          </div>

                          {/* Action Icons */}
                          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <SaveArticleButton
                              article={{
                                id: makeSavedArticleId('current-affairs', slug),
                                type: 'current-affairs',
                                slug,
                                title: item.fact,
                                description: `${item.topic} · ${item.importance} importance · Source: ${item.source}`,
                                category: item.topic,
                                readTime: 'Quick fact',
                                href: `/current-affairs#${slug}`,
                                icon: topicIcons[item.topic] || "📰",
                                accent,
                              }}
                            />
                            
                            <button
                              onClick={() => handleShare(item)}
                              style={{
                                padding: "6px 12px",
                                borderRadius: 8,
                                fontSize: 11,
                                fontWeight: 700,
                                border: "2px solid var(--border)",
                                background: "var(--bg-card)",
                                color: "#6b7280",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              📤 Share
                            </button>

                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                padding: "6px 12px",
                                borderRadius: 8,
                                fontSize: 11,
                                fontWeight: 700,
                                border: `2px solid ${accent}30`,
                                background: `${accent}10`,
                                color: accent,
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              🔗 Official Source
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Quiz Card after every 5 facts */}
                {(groupIndex * 10 + items.length) % 5 === 0 && items.length > 0 && (() => {
                  const quizIndex = Math.floor((groupIndex * 10 + items.length) / 5);
                  const quiz = generateQuiz(items);
                  if (!quiz) return null;

                  const userAnswer = quizAnswers[quizIndex];
                  const showResult = showQuizResults[quizIndex];
                  const isCorrect = userAnswer === quiz.correct;

                  return (
                    <div
                      key={`quiz-${quizIndex}`}
                      style={{
                        background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                        borderRadius: 16,
                        padding: 20,
                        border: "3px solid #fcd34d",
                        boxShadow: "0 4px 16px rgba(245, 158, 11, 0.2)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <span style={{ fontSize: 32 }}>🎯</span>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 900, color: "#92400e", marginBottom: 4 }}>
                            Test Yourself!
                          </div>
                          <div style={{ fontSize: 12, color: "#78350f", fontWeight: 600 }}>
                            Quick quiz on recent facts
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-dark)", marginBottom: 12 }}>
                        {quiz.question}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                        {quiz.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setQuizAnswers(prev => ({ ...prev, [quizIndex]: option }));
                              setShowQuizResults(prev => ({ ...prev, [quizIndex]: true }));
                            }}
                            disabled={showResult}
                            style={{
                              padding: "12px 16px",
                              borderRadius: 10,
                              fontSize: 13,
                              fontWeight: 700,
                              border: showResult 
                                ? option === quiz.correct 
                                  ? "2px solid #16a34a" 
                                  : option === userAnswer 
                                    ? "2px solid #dc2626" 
                                    : "2px solid #e5e7eb"
                                : "2px solid #e5e7eb",
                              background: showResult 
                                ? option === quiz.correct 
                                  ? "#f0fdf4" 
                                  : option === userAnswer 
                                    ? "#fef2f2" 
                                    : "var(--bg-card)"
                                : "var(--bg-card)",
                              color: showResult 
                                ? option === quiz.correct 
                                  ? "#16a34a" 
                                  : option === userAnswer 
                                    ? "#dc2626"
                                    : "var(--text-light)" 
                                : "var(--text-dark)",
                              cursor: showResult ? "default" : "pointer",
                              textAlign: "left",
                            }}
                          >
                            {option} {showResult && option === quiz.correct && "✅"}
                            {showResult && option === userAnswer && option !== quiz.correct && "❌"}
                          </button>
                        ))}
                      </div>

                      {showResult && (
                        <div style={{
                          padding: 12,
                          borderRadius: 10,
                          background: isCorrect ? "#f0fdf4" : "#fef2f2",
                          border: `2px solid ${isCorrect ? "#bbf7d0" : "#fecaca"}`,
                        }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: isCorrect ? "#16a34a" : "#dc2626", marginBottom: 6 }}>
                            {isCorrect ? "🎉 Correct!" : "❌ Incorrect"}
                          </div>
                          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>
                            {quiz.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          ))
        )}

        <div style={{ textAlign: "center", padding: "32px 0", color: "#9CA3AF" }}>
          <p style={{ fontSize: 13, marginBottom: 8, fontWeight: 600 }}>
            📚 More facts added regularly. Save the ones you want to revise.
          </p>
          <Link href={CURRENT_AFFAIRS_META.reportErrorUrl} style={{ fontSize: 13, fontWeight: 700, color: "#3b82f6", textDecoration: "none" }}>
            Report an issue →
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
