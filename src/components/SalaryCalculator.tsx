"use client";

import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Area, AreaChart } from "recharts";
import salaryData from "@/data/salary-data.json";

export default function SalaryCalculator() {
  const [selectedPost, setSelectedPost] = useState("");
  const [cityType, setCityType] = useState("xCity");
  const [experience, setExperience] = useState(0);
  const [includePerks, setIncludePerks] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedSalary, setDisplayedSalary] = useState(0);
  const [displayedYearlySalary, setDisplayedYearlySalary] = useState(0);
  const [showSalaryReveal, setShowSalaryReveal] = useState(false);
  const [activeSlice, setActiveSlice] = useState<number | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const posts = salaryData.posts;
  const allowances = salaryData.allowances;
  const deductions = salaryData.deductions;

  const selectedPostData = posts.find((p) => p.id === selectedPost);

  const calculateSalary = () => {
    if (!selectedPostData) return null;

    // Find the appropriate increment level based on experience
    const getBasicPay = (): number => {
      const increments = selectedPostData.basicPay.afterIncrements;
      
      // Define increment milestones in descending order
      const milestones = [
        { years: 30, key: "30years" as const },
        { years: 20, key: "20years" as const },
        { years: 14, key: "14years" as const },
        { years: 7, key: "7years" as const },
        { years: 3, key: "3years" as const },
      ];
      
      // Find the highest milestone that the experience meets or exceeds
      for (const milestone of milestones) {
        const incrementValue = increments[milestone.key];
        if (experience >= milestone.years && incrementValue !== undefined) {
          return incrementValue;
        }
      }
      
      // If experience is less than 3 years, use entry-level salary
      return selectedPostData.basicPay.entry;
    };

    const basicPay: number = getBasicPay();
    const da = (basicPay * allowances.da) / 100;
    const hra = (basicPay * (allowances.hra as Record<string, number>)[cityType]) / 100;
    const ta = (allowances.ta as Record<string, number>)[cityType === "xCity" ? "metro" : "nonMetro"];

    const gross = basicPay + da + hra + ta;
    const npsDeduction = (basicPay * deductions.nps) / 100;
    const netInHand = gross - npsDeduction - deductions.professionalTax;

    const perksValue = includePerks ? selectedPostData.perks.housingValue || 0 : 0;
    const totalCtc = netInHand + perksValue;

    return {
      basicPay,
      da,
      hra,
      ta,
      gross,
      npsDeduction,
      netInHand,
      perksValue,
      totalCtc,
    };
  };

  const salary = calculateSalary();

  const shareText = selectedPostData
    ? `My dream job: ${selectedPostData.name} pays ₹${Math.round(salary?.netInHand || 0).toLocaleString()} per month in-hand! Calculate yours at prepkar.vercel.app/salary-calculator`
    : "Calculate your government job salary at prepkar.vercel.app/salary-calculator";

  const handleShare = () => {
    navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard!");
  };

  const handleCityChange = (newCity: string) => {
    setIsAnimating(true);
    setCityType(newCity);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Count-up animation effect
  useEffect(() => {
    if (!salary) {
      setDisplayedSalary(0);
      setDisplayedYearlySalary(0);
      setShowSalaryReveal(false);
      return;
    }

    const targetMonthly = Math.round(salary.netInHand);
    const targetYearly = Math.round(salary.netInHand * 12);
    
    // Show reveal animation
    setShowSalaryReveal(true);
    
    // Animate from 0 to target over 1.5 seconds
    const duration = 1500;
    const startTime = Date.now();
    const startMonthly = displayedSalary;
    const startYearly = displayedYearlySalary;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentMonthly = Math.round(startMonthly + (targetMonthly - startMonthly) * easeOut);
      const currentYearly = Math.round(startYearly + (targetYearly - startYearly) * easeOut);
      
      setDisplayedSalary(currentMonthly);
      setDisplayedYearlySalary(currentYearly);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [salary?.netInHand, selectedPost, cityType, experience, includePerks]);

  return (
    <div style={{
      borderRadius: 24,
      overflow: "hidden",
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
          padding: "24px 20px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 30% 40%, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              fontSize: 12,
              fontWeight: 800,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ fontSize: 20 }}>💰</span> Government Salary Calculator
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
              Calculate exact in-hand salary based on 7th Pay Commission
            </div>
          </div>
        </div>

        <div style={{ padding: "24px 20px" }}>
          {/* Step 1: Visual Job Cards */}
          <div style={{ marginBottom: 32 }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 800,
              color: "#1F2937",
              marginBottom: 16,
            }}>
              <span style={{ fontSize: 20 }}>💼</span> Select Your Dream Job
            </label>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", 
              gap: 12,
            }}>
              {posts.map((post) => {
                const isSelected = selectedPost === post.id;
                const jobIcons: Record<string, string> = {
                  "ias-officer": "🏛️",
                  "sbi-po": "🏦",
                  "ssc-cgl-income-tax": "💼",
                  "ssc-cgl-auditor": "📊",
                  "ssc-chsl": "📝",
                  "rrb-ntpc": "🚂",
                  "rbi-grade-b": "🏛️",
                  "nda": "🎖️",
                  "delhi-police": "👮",
                  "ibps-po": "🏦",
                };
                
                const categoryColors: Record<string, string> = {
                  "UPSC": "#7C3AED",
                  "Banking": "#10b981",
                  "SSC": "#f59e0b",
                  "Railway": "#ef4444",
                  "Defence": "#0d9488",
                };
                
                const color = categoryColors[post.category] || "#6b7280";
                
                return (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPost(post.id)}
                    style={{
                      padding: "16px 12px",
                      borderRadius: 16,
                      border: isSelected ? `3px solid ${color}` : "2px solid #e5e7eb",
                      background: isSelected ? `${color}08` : "white",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative",
                      textAlign: "center",
                      boxShadow: isSelected ? `0 4px 16px ${color}30` : "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = color;
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = `0 4px 12px ${color}20`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                      }
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        boxShadow: `0 2px 8px ${color}40`,
                      }}>
                        ✓
                      </div>
                    )}
                    
                    <div style={{ fontSize: 32, marginBottom: 8 }}>
                      {jobIcons[post.id] || "💼"}
                    </div>
                    
                    <div style={{ 
                      fontSize: 13, 
                      fontWeight: 800, 
                      color: "#111827",
                      marginBottom: 6,
                      lineHeight: 1.3,
                      minHeight: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {post.name}
                    </div>
                    
                    <div style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: color,
                      background: `${color}15`,
                      padding: "4px 8px",
                      borderRadius: 6,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      {post.category}
                    </div>
                    
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#6b7280",
                    }}>
                      ₹{(post.basicPay.entry / 1000).toFixed(0)}K - ₹{((post.basicPay.afterIncrements["30years"] || post.basicPay.entry) / 1000).toFixed(0)}K
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: City Type - Large Tappable Cards */}
          <div style={{ marginBottom: 32 }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 800,
              color: "#1F2937",
              marginBottom: 16,
            }}>
              <span style={{ fontSize: 20 }}>📍</span> Select Your City Type
            </label>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: 12,
            }}>
              {[
                { value: "xCity", label: "X City", sub: "Delhi, Mumbai, Bangalore", percent: "30%", icon: "🏙️", color: "#7C3AED" },
                { value: "yCity", label: "Y City", sub: "Pune, Jaipur, Lucknow", percent: "20%", icon: "🌆", color: "#0D9488" },
                { value: "zCity", label: "Z City", sub: "Others", percent: "10%", icon: "🏘️", color: "#D97706" },
              ].map((city) => {
                const isSelected = cityType === city.value;
                return (
                  <button
                    key={city.value}
                    onClick={() => handleCityChange(city.value)}
                    style={{
                      padding: "20px 16px",
                      borderRadius: 16,
                      border: isSelected ? `3px solid ${city.color}` : "2px solid #e5e7eb",
                      background: isSelected ? `${city.color}08` : "white",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative",
                      textAlign: "left",
                      boxShadow: isSelected ? `0 4px 16px ${city.color}30` : "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = city.color;
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = `0 4px 12px ${city.color}20`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                      }
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: city.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: "white",
                        boxShadow: `0 2px 8px ${city.color}40`,
                      }}>
                        ✓
                      </div>
                    )}
                    
                    <div style={{ fontSize: 36, marginBottom: 12 }}>
                      {city.icon}
                    </div>
                    
                    <div style={{ 
                      fontSize: 16, 
                      fontWeight: 800, 
                      color: "#111827",
                      marginBottom: 6,
                    }}>
                      {city.label}
                    </div>
                    
                    <div style={{
                      fontSize: 12,
                      color: "#6b7280",
                      marginBottom: 12,
                      lineHeight: 1.4,
                    }}>
                      {city.sub}
                    </div>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      background: `${city.color}15`,
                      borderRadius: 8,
                    }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: city.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>
                        HRA
                      </span>
                      <span style={{
                        fontSize: 18,
                        fontWeight: 900,
                        color: city.color,
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        {city.percent}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Experience Slider with Milestones */}
          <div style={{ marginBottom: 32 }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 14,
              fontWeight: 800,
              color: "#1F2937",
              marginBottom: 16,
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>📈</span> Years of Experience
              </span>
              <span style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#667eea",
                fontFamily: "'Outfit', sans-serif",
              }}>
                {experience} years
              </span>
            </label>
            
            {/* Current Designation Display */}
            {selectedPostData && (
              <div style={{
                padding: "12px 16px",
                background: "linear-gradient(135deg, #EEF2FF, #F3E8FF)",
                borderRadius: 12,
                marginBottom: 16,
                border: "2px solid #C7D2FE",
              }}>
                <div style={{ fontSize: 11, color: "#6366F1", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Current Designation
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#4338CA" }}>
                  {experience === 0 && "Probationer / Entry Level"}
                  {experience > 0 && experience < 3 && "Junior Officer"}
                  {experience >= 3 && experience < 7 && "Officer / Branch Manager"}
                  {experience >= 7 && experience < 14 && "Senior Officer / AGM"}
                  {experience >= 14 && experience < 20 && "Deputy General Manager"}
                  {experience >= 20 && experience < 30 && "General Manager"}
                  {experience === 30 && "Chief General Manager (Retirement)"}
                </div>
              </div>
            )}
            
            <div style={{ position: "relative", paddingTop: 8 }}>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: 8,
                  borderRadius: 4,
                  background: `linear-gradient(to right, #667eea 0%, #667eea ${(experience / 30) * 100}%, #E5E7EB ${(experience / 30) * 100}%, #E5E7EB 100%)`,
                  outline: "none",
                  appearance: "none",
                  WebkitAppearance: "none",
                  cursor: "pointer",
                }}
              />
              
              {/* Milestone Markers */}
              <div style={{ position: "relative", marginTop: 12 }}>
                {[
                  { years: 0, label: "Joining" },
                  { years: 5, label: "5 yrs" },
                  { years: 10, label: "10 yrs" },
                  { years: 20, label: "20 yrs" },
                  { years: 30, label: "30 yrs\n(Retirement)" },
                ].map((milestone) => (
                  <div
                    key={milestone.years}
                    style={{
                      position: "absolute",
                      left: `${(milestone.years / 30) * 100}%`,
                      transform: "translateX(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: experience >= milestone.years ? "#667eea" : "#D1D5DB",
                      border: "2px solid white",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "all 0.2s",
                    }} />
                    <div style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: experience >= milestone.years ? "#667eea" : "#9CA3AF",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                      lineHeight: 1.3,
                    }}>
                      {milestone.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Include Perks Toggle */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              background: "#F9FAFB",
              borderRadius: 14,
              cursor: "pointer",
              transition: "all 0.2s",
              border: "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F3F4F6";
              e.currentTarget.style.borderColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
              e.currentTarget.style.borderColor = "transparent";
            }}
            >
              <input
                type="checkbox"
                checked={includePerks}
                onChange={(e) => setIncludePerks(e.target.checked)}
                style={{
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                  accentColor: "#667eea",
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", flex: 1 }}>
                Include estimated perks value (housing, medical, etc.)
              </span>
              <span style={{ fontSize: 16 }}>✨</span>
            </label>
          </div>

          {/* Output Card */}
          {salary && showSalaryReveal && (
            <>
              {/* PHASE 2: Animated Hero Salary Reveal */}
              <div style={{
                padding: "32px 24px",
                background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                borderRadius: 24,
                marginBottom: 24,
                border: "2px solid #334155",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset",
              }}>
                {/* Animated background decoration */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.05,
                  backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 80%, #fff 1px, transparent 1px)",
                  backgroundSize: "50px 50px, 80px 80px",
                  animation: "float 20s ease-in-out infinite",
                }} />
                
                <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                  {/* Label */}
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#94A3B8",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}>
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#10B981",
                      boxShadow: "0 0 12px #10B981",
                      animation: "pulse 2s ease-in-out infinite",
                    }} />
                    Your Estimated In-Hand Salary
                  </div>
                  
                  {/* Main Monthly Salary - Animated Count-Up */}
                  <div style={{
                    fontSize: 56,
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily: "'Outfit', sans-serif",
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                    textShadow: "0 0 40px rgba(16,185,129,0.3)",
                    animation: "glow 2s ease-in-out infinite",
                  }}>
                    ₹{displayedSalary.toLocaleString()}
                  </div>
                  
                  {/* Per Month Label */}
                  <div style={{
                    fontSize: 14,
                    color: "#CBD5E1",
                    fontWeight: 600,
                    marginBottom: 20,
                  }}>
                    per month
                  </div>
                  
                  {/* Divider */}
                  <div style={{
                    width: 60,
                    height: 2,
                    background: "linear-gradient(90deg, transparent, #475569, transparent)",
                    margin: "0 auto 20px",
                  }} />
                  
                  {/* Yearly Salary - Animated Count-Up */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    padding: "16px 24px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                  }}>
                    <div style={{ textAlign: "left" }}>
                      <div style={{
                        fontSize: 10,
                        color: "#94A3B8",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 4,
                      }}>
                        Annual Package
                      </div>
                      <div style={{
                        fontSize: 24,
                        fontWeight: 900,
                        color: "#FCD34D",
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        ₹{displayedYearlySalary.toLocaleString()}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 32,
                      filter: "grayscale(0.3)",
                    }}>
                      💰
                    </div>
                  </div>
                  
                  {/* Subtitle */}
                  <div style={{
                    fontSize: 12,
                    color: "#64748B",
                    fontWeight: 500,
                    marginTop: 16,
                    fontStyle: "italic",
                  }}>
                    This is your estimated take-home after all deductions
                  </div>
                </div>
              </div>

              {/* PHASE 3: Donut Chart Breakdown */}
              {(() => {
                const chartData = [
                  { name: "Basic Pay",          value: Math.round(salary.basicPay),      color: "#667eea", icon: "💼", pct: Math.round((salary.basicPay / salary.gross) * 100) },
                  { name: "DA",                 value: Math.round(salary.da),            color: "#10B981", icon: "📈", pct: Math.round((salary.da / salary.gross) * 100) },
                  { name: `HRA`,                value: Math.round(salary.hra),           color: "#F59E0B", icon: "🏠", pct: Math.round((salary.hra / salary.gross) * 100) },
                  { name: "Transport",          value: Math.round(salary.ta),            color: "#7C3AED", icon: "🚗", pct: Math.round((salary.ta / salary.gross) * 100) },
                  { name: "NPS",                value: Math.round(salary.npsDeduction),  color: "#EF4444", icon: "➖", pct: Math.round((salary.npsDeduction / salary.gross) * 100) },
                  { name: "Prof. Tax",          value: deductions.professionalTax,       color: "#EC4899", icon: "➖", pct: Math.round((deductions.professionalTax / salary.gross) * 100) },
                ];
                const active = activeSlice !== null ? chartData[activeSlice] : null;

                return (
                  <div style={{
                    background: "#fff",
                    borderRadius: 24,
                    padding: "24px 20px",
                    marginBottom: 20,
                    border: "2px solid #F1F5F9",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  }}>
                    {/* Section header */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}>
                        <div style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: "linear-gradient(135deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                        }}>
                          🥧
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>Salary Breakdown</div>
                          <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>Tap any segment to inspect</div>
                        </div>
                      </div>
                      <div style={{
                        padding: "6px 12px",
                        background: "#F0FDF4",
                        borderRadius: 8,
                        border: "1px solid #BBF7D0",
                      }}>
                        <div style={{ fontSize: 10, color: "#16A34A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Gross</div>
                        <div style={{ fontSize: 14, fontWeight: 900, color: "#15803D", fontFamily: "'Outfit', sans-serif" }}>
                          ₹{Math.round(salary.gross).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Donut chart + center overlay */}
                    <div style={{ position: "relative", width: "100%", height: 260 }}>
                      <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={72}
                            outerRadius={108}
                            paddingAngle={3}
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={900}
                            onClick={(_, index) => setActiveSlice(activeSlice === index ? null : index)}
                            stroke="none"
                          >
                            {chartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                opacity={activeSlice === null || activeSlice === index ? 1 : 0.35}
                                style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => value != null ? [`₹${Number(value).toLocaleString()}`, ""] : ["—", ""]}
                            contentStyle={{
                              borderRadius: 12,
                              border: "none",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                            itemStyle={{ color: "#111827" }}
                            labelStyle={{ color: "#6B7280", fontWeight: 600 }}
                          />
                        </PieChart>
                      </ResponsiveContainer>

                      {/* Center label overlay */}
                      <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        pointerEvents: "none",
                        transition: "all 0.25s ease",
                      }}>
                        {active ? (
                          <>
                            <div style={{ fontSize: 22, marginBottom: 2 }}>{active.icon}</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: active.color, maxWidth: 80, lineHeight: 1.2 }}>{active.name}</div>
                            <div style={{ fontSize: 16, fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif" }}>
                              ₹{active.value.toLocaleString()}
                            </div>
                            <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>{active.pct}% of gross</div>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>In-Hand</div>
                            <div style={{ fontSize: 20, fontWeight: 900, color: "#16A34A", fontFamily: "'Outfit', sans-serif" }}>
                              ₹{Math.round(salary.netInHand).toLocaleString()}
                            </div>
                            <div style={{ fontSize: 10, color: "#9CA3AF" }}>after deductions</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Legend pills */}
                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      justifyContent: "center",
                      marginBottom: 24,
                    }}>
                      {chartData.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveSlice(activeSlice === i ? null : i)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 12px",
                            borderRadius: 20,
                            border: `2px solid ${activeSlice === i ? item.color : "transparent"}`,
                            background: activeSlice === i ? `${item.color}15` : "#F8FAFC",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            opacity: activeSlice !== null && activeSlice !== i ? 0.5 : 1,
                          }}
                        >
                          <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{item.name}</span>
                          <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>{item.pct}%</span>
                        </button>
                      ))}
                    </div>

                    {/* Detailed table */}
                    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #F1F5F9" }}>
                      {/* Earnings rows */}
                      {[
                        { label: "Basic Pay",                                                    value: salary.basicPay,          color: "#667eea", type: "earn" },
                        { label: `Dearness Allowance (${allowances.da}%)`,                       value: salary.da,                color: "#10B981", type: "earn" },
                        { label: `HRA (${(allowances.hra as Record<string, number>)[cityType]}%)`, value: salary.hra,             color: "#F59E0B", type: "earn" },
                        { label: "Transport Allowance",                                          value: salary.ta,                color: "#7C3AED", type: "earn" },
                      ].map((row, i) => (
                        <div key={i} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: i % 2 === 0 ? "#FAFAFA" : "#fff",
                          borderBottom: "1px solid #F1F5F9",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 4, height: 16, borderRadius: 2, background: row.color, flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{row.label}</span>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 800, color: row.color, fontFamily: "'Outfit', sans-serif" }}>
                            +₹{Math.round(row.value).toLocaleString()}
                          </span>
                        </div>
                      ))}

                      {/* Gross subtotal */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 16px",
                        background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)",
                        borderBottom: "1px solid #E0F2FE",
                      }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: "#1E40AF" }}>= Gross Salary</span>
                        <span style={{ fontSize: 16, fontWeight: 900, color: "#1E40AF", fontFamily: "'Outfit', sans-serif" }}>
                          ₹{Math.round(salary.gross).toLocaleString()}
                        </span>
                      </div>

                      {/* Deduction rows */}
                      {[
                        { label: `NPS Deduction (${deductions.nps}%)`, value: salary.npsDeduction },
                        { label: "Professional Tax",                    value: deductions.professionalTax },
                      ].map((row, i) => (
                        <div key={i} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: i % 2 === 0 ? "#FFF5F5" : "#FEF2F2",
                          borderBottom: "1px solid #FEE2E2",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 4, height: 16, borderRadius: 2, background: "#EF4444", flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: "#991B1B", fontWeight: 600 }}>{row.label}</span>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 800, color: "#DC2626", fontFamily: "'Outfit', sans-serif" }}>
                            −₹{Math.round(row.value).toLocaleString()}
                          </span>
                        </div>
                      ))}

                      {/* Final in-hand */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "18px 16px",
                        background: "linear-gradient(135deg, #16A34A, #059669)",
                      }}>
                        <div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
                            Final Take Home
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Net In-Hand Salary</div>
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
                          ₹{Math.round(salary.netInHand).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Perks Section */}
              {includePerks && selectedPostData && (
                <div style={{
                  background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                  borderRadius: 20,
                  padding: "20px",
                  marginBottom: 20,
                  border: "2px solid #FCD34D",
                }}>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#92400E",
                    marginBottom: 14,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                    <span style={{ fontSize: 16 }}>✨</span> Perks & Benefits
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    {[
                      { l: "Housing benefit value", v: salary.perksValue, icon: "🏠" },
                      { l: "Medical coverage", v: selectedPostData.perks.medical, icon: "💊" },
                      { l: "Vehicle allowance", v: selectedPostData.perks.vehicle, icon: "🚗" },
                      { l: "Travel benefits", v: selectedPostData.perks.ltc ?? selectedPostData.perks.lfc, icon: "✈️" },
                      { l: "Pension", v: selectedPostData.perks.pension, icon: "🧓" },
                    ].map((perk, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 0",
                          borderBottom: i < 4 ? "1px solid rgba(146,64,14,0.1)" : "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 14 }}>{perk.icon}</span>
                          <span style={{ fontSize: 13, color: "#78350F", fontWeight: 600 }}>{perk.l}</span>
                        </div>
                        <span style={{
                          fontSize: 13,
                          fontWeight: 800,
                          color: "#92400E",
                          fontFamily: "'Outfit', sans-serif",
                        }}>
                          {typeof perk.v === "number" ? `₹${Math.round(perk.v).toLocaleString()}` : perk.v}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.5)",
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#92400E" }}>TOTAL CTC (including perks)</span>
                    <span style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: "#92400E",
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      ₹{(salary.totalCtc / 100000).toFixed(1)} LPA
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* PHASE 4: 30-Year Growth Chart */}
          {salary && showSalaryReveal && selectedPostData && (() => {
            // Build year-by-year data using 7th CPC DA revision pattern
            // DA increases ~4% every 6 months (Jan & Jul), so ~8% per year
            // Pay Commission revision every 10 years adds ~20-25% jump
            const DA_ANNUAL_INCREASE = 4; // % per year (conservative)
            const daBase = salaryData.allowances.da;

            const growthData = Array.from({ length: 31 }, (_, yr) => {
              // Basic pay at this year (using milestone logic)
              const getBasicAtYear = (y: number): number => {
                const inc = selectedPostData.basicPay.afterIncrements;
                if (y >= 30 && inc["30years"]) return inc["30years"];
                if (y >= 20 && inc["20years"]) return inc["20years"];
                if (y >= 14 && inc["14years"]) return inc["14years"];
                if (y >= 7  && inc["7years"])  return inc["7years"];
                if (y >= 3  && inc["3years"])  return inc["3years"];
                return selectedPostData.basicPay.entry;
              };

              const basic = getBasicAtYear(yr);
              const daRate = Math.min(daBase + DA_ANNUAL_INCREASE * yr, 100); // cap at 100%
              const da = (basic * daRate) / 100;
              const hraRate = (salaryData.allowances.hra as Record<string, number>)[cityType];
              const hra = (basic * hraRate) / 100;
              const ta = (salaryData.allowances.ta as Record<string, number>)[cityType === "xCity" ? "metro" : "nonMetro"];
              const gross = basic + da + hra + ta;
              const nps = (basic * salaryData.deductions.nps) / 100;
              const inHand = gross - nps - salaryData.deductions.professionalTax;

              // Private sector equivalent: govt package has hidden value
              // Rule of thumb: multiply by 1.4-1.6x to get equivalent CTC
              const privateCTC = Math.round(inHand * 1.5);

              return {
                year: yr,
                label: yr === 0 ? "Join" : yr === 30 ? "Retire" : `${yr}`,
                govtInHand: Math.round(inHand),
                privateCTC,
              };
            });

            // Pension line: after retirement, govt pays ~50% of last basic
            const lastBasic = selectedPostData.basicPay.afterIncrements["30years"] || selectedPostData.basicPay.entry;
            const pensionMonthly = Math.round(lastBasic * 0.5);

            const currentGovt = growthData[experience]?.govtInHand ?? 0;
            const peakGovt = growthData[30]?.govtInHand ?? 0;

            return (
              <div style={{
                background: "#fff",
                borderRadius: 24,
                padding: "24px 20px",
                marginBottom: 20,
                border: "2px solid #F1F5F9",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: "linear-gradient(135deg, #0F172A, #1E3A5F)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                    }}>
                      📈
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>30-Year Salary Growth</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>Govt in-hand vs private equivalent</div>
                    </div>
                  </div>
                  {/* Peak badge */}
                  <div style={{
                    padding: "6px 12px", background: "#EFF6FF",
                    borderRadius: 8, border: "1px solid #BFDBFE", textAlign: "right",
                  }}>
                    <div style={{ fontSize: 10, color: "#3B82F6", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>At Retirement</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1D4ED8", fontFamily: "'Outfit', sans-serif" }}>
                      ₹{peakGovt.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="govtGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#667eea" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#667eea" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="privateGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#F59E0B" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="year"
                      tickFormatter={(v) => v === 0 ? "Join" : v === 30 ? "Retire" : `${v}yr`}
                      tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      interval={4}
                    />
                    <YAxis
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                      tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={48}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        `₹${Number(value).toLocaleString()}`,
                        name === "govtInHand" ? "Govt In-Hand" : "Private Equivalent",
                      ]}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{
                        borderRadius: 12, border: "none",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        fontSize: 12, fontWeight: 700,
                      }}
                    />
                    {/* Current experience reference line */}
                    {experience > 0 && (
                      <ReferenceLine
                        x={experience}
                        stroke="#10B981"
                        strokeWidth={2}
                        strokeDasharray="4 3"
                        label={{ value: "You", position: "top", fontSize: 10, fill: "#10B981", fontWeight: 700 }}
                      />
                    )}
                    <Area
                      type="monotone"
                      dataKey="privateCTC"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeDasharray="5 3"
                      fill="url(#privateGrad)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#F59E0B", stroke: "#fff", strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="govtInHand"
                      stroke="#667eea"
                      strokeWidth={2.5}
                      fill="url(#govtGrad)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#667eea", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12, marginBottom: 20 }}>
                  {[
                    { color: "#667eea", dash: false, label: "Govt In-Hand" },
                    { color: "#F59E0B", dash: true,  label: "Private Equivalent" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="24" height="10">
                        <line
                          x1="0" y1="5" x2="24" y2="5"
                          stroke={item.color}
                          strokeWidth="2.5"
                          strokeDasharray={item.dash ? "5 3" : "none"}
                        />
                      </svg>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Insight cards row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    {
                      icon: "📍",
                      label: "Current",
                      value: `₹${currentGovt.toLocaleString()}`,
                      sub: `at ${experience} yrs`,
                      bg: "#EEF2FF", border: "#C7D2FE", color: "#4338CA",
                    },
                    {
                      icon: "🏁",
                      label: "At Retirement",
                      value: `₹${peakGovt.toLocaleString()}`,
                      sub: "at 30 yrs",
                      bg: "#F0FDF4", border: "#BBF7D0", color: "#15803D",
                    },
                    {
                      icon: "🧓",
                      label: "Pension",
                      value: `₹${pensionMonthly.toLocaleString()}`,
                      sub: "monthly for life",
                      bg: "#FEF3C7", border: "#FDE68A", color: "#92400E",
                    },
                  ].map((card, i) => (
                    <div key={i} style={{
                      padding: "12px 10px",
                      background: card.bg,
                      borderRadius: 14,
                      border: `2px solid ${card.border}`,
                      textAlign: "center",
                    }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{card.icon}</div>
                      <div style={{ fontSize: 10, color: card.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
                        {card.label}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: card.color, fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>
                        {card.value}
                      </div>
                      <div style={{ fontSize: 10, color: card.color, opacity: 0.7, marginTop: 2 }}>{card.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* PHASE 5: Private Sector Comparison Banner */}
          {salary && showSalaryReveal && selectedPostData && (() => {
            const inHand = Math.round(salary.netInHand);
            const gross  = Math.round(salary.gross);

            // Equivalent private CTC needs to cover: in-hand + tax + no pension + no medical + no housing
            // Rough formula: private CTC = gross × 1.6 (to account for 30% tax, no pension, no CGHS, no housing)
            const privateCTCLow  = Math.round((gross * 1.55) / 100000 * 10) / 10;  // in LPA
            const privateCTCHigh = Math.round((gross * 1.75) / 100000 * 10) / 10;

            // Hidden benefits value per month
            const pensionValue   = Math.round(selectedPostData.basicPay.afterIncrements["30years"] || selectedPostData.basicPay.entry) * 0.5;
            const housingValue   = selectedPostData.perks.housingValue || 15000;
            const medicalValue   = 15000;
            const jobSecurity    = 20000; // notional value
            const hiddenTotal    = Math.round(pensionValue * 0.3 + housingValue + medicalValue + jobSecurity);

            const govtItems = [
              { icon: "💰", label: "In-Hand Salary",    value: `₹${inHand.toLocaleString()}/mo`,   highlight: true },
              { icon: "🏠", label: "Housing (Govt)",    value: `₹${housingValue.toLocaleString()}/mo` },
              { icon: "💊", label: "CGHS Medical",      value: "₹15,000/mo" },
              { icon: "🧓", label: "Pension (for life)", value: "✅ Guaranteed" },
              { icon: "🔒", label: "Job Security",      value: "✅ Permanent" },
              { icon: "✈️", label: "LTC / Travel",      value: "✅ Included" },
            ];

            const privateItems = [
              { icon: "💰", label: "Take-Home (est.)",  value: `₹${inHand.toLocaleString()}/mo`,   highlight: true },
              { icon: "🏠", label: "Housing",           value: "Self-funded" },
              { icon: "💊", label: "Medical",           value: "Self-funded" },
              { icon: "🧓", label: "Pension",           value: "❌ None (NPS opt.)" },
              { icon: "🔒", label: "Job Security",      value: "❌ At-will" },
              { icon: "✈️", label: "Travel",            value: "❌ Not included" },
            ];

            return (
              <div style={{
                borderRadius: 24,
                marginBottom: 20,
                overflow: "hidden",
                border: "2px solid #E2E8F0",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}>
                {/* Banner header */}
                <div style={{
                  background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
                  padding: "20px 20px 16px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", inset: 0, opacity: 0.06,
                    backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: "#94A3B8",
                      letterSpacing: 2, textTransform: "uppercase", marginBottom: 6,
                    }}>
                      ⚖️ Govt vs Private — Real Comparison
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>
                      To match this package, you need
                    </div>
                    <div style={{
                      fontSize: 32, fontWeight: 900,
                      background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      backgroundClip: "text", fontFamily: "'Outfit', sans-serif",
                    }}>
                      ₹{privateCTCLow}–{privateCTCHigh} LPA
                    </div>
                    <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
                      private sector CTC (before tax)
                    </div>
                  </div>
                </div>

                {/* Hidden value strip */}
                <div style={{
                  background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "2px solid #FCD34D",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>
                    ✨ Hidden benefits value
                  </div>
                  <div style={{
                    fontSize: 16, fontWeight: 900, color: "#92400E",
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    +₹{hiddenTotal.toLocaleString()}/mo
                  </div>
                </div>

                {/* Side-by-side comparison */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#fff" }}>
                  {/* Govt column header */}
                  <div style={{
                    padding: "12px 16px",
                    background: "linear-gradient(135deg, #EEF2FF, #F0FDF4)",
                    borderRight: "1px solid #E2E8F0",
                    borderBottom: "2px solid #667eea",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#667eea", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      🏛️ Government
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, marginTop: 2 }}>
                      {selectedPostData.name}
                    </div>
                  </div>
                  {/* Private column header */}
                  <div style={{
                    padding: "12px 16px",
                    background: "#F8FAFC",
                    borderBottom: "2px solid #F59E0B",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#D97706", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      🏢 Private Sector
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, marginTop: 2 }}>
                      Equivalent role
                    </div>
                  </div>

                  {/* Rows */}
                  {govtItems.map((item, i) => (
                    <>
                      {/* Govt cell */}
                      <div key={`g-${i}`} style={{
                        padding: "11px 16px",
                        background: i % 2 === 0
                          ? (item.highlight ? "#F0FDF4" : "#FAFAFA")
                          : (item.highlight ? "#F0FDF4" : "#fff"),
                        borderRight: "1px solid #E2E8F0",
                        borderBottom: i < govtItems.length - 1 ? "1px solid #F1F5F9" : "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}>
                        <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600 }}>
                          {item.icon} {item.label}
                        </div>
                        <div style={{
                          fontSize: 13, fontWeight: 800,
                          color: item.highlight ? "#16A34A" : "#374151",
                          fontFamily: item.highlight ? "'Outfit', sans-serif" : "inherit",
                        }}>
                          {item.value}
                        </div>
                      </div>
                      {/* Private cell */}
                      <div key={`p-${i}`} style={{
                        padding: "11px 16px",
                        background: i % 2 === 0 ? "#FAFAFA" : "#fff",
                        borderBottom: i < privateItems.length - 1 ? "1px solid #F1F5F9" : "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}>
                        <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600 }}>
                          {privateItems[i].icon} {privateItems[i].label}
                        </div>
                        <div style={{
                          fontSize: 13, fontWeight: 800,
                          color: privateItems[i].value.startsWith("❌")
                            ? "#DC2626"
                            : privateItems[i].highlight ? "#16A34A" : "#374151",
                          fontFamily: privateItems[i].highlight ? "'Outfit', sans-serif" : "inherit",
                        }}>
                          {privateItems[i].value}
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                {/* Bottom insight */}
                <div style={{
                  padding: "16px 20px",
                  background: "linear-gradient(135deg, #EFF6FF, #EEF2FF)",
                  borderTop: "2px solid #BFDBFE",
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
                  <p style={{ margin: 0, fontSize: 13, color: "#1E40AF", fontWeight: 600, lineHeight: 1.6 }}>
                    Govt benefits like <strong>pension for life, free CGHS medical, housing, and job security</strong> add
                    {" "}₹{hiddenTotal.toLocaleString()}/month in hidden value — making the real package worth{" "}
                    <strong>₹{privateCTCLow}–{privateCTCHigh} LPA</strong> in private sector terms.
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Share Button */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <button
              onClick={handleShare}
              style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(102,126,234,0.3)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(102,126,234,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(102,126,234,0.3)";
              }}
            >
              📤 Share Calculator
            </button>
          </div>

          {/* Saved indicator */}
          {selectedPost && (
            <div style={{
              marginTop: 16,
              padding: "12px 16px",
              background: "#F0FDF4",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "1px solid #BBF7D0",
            }}>
              <span style={{ fontSize: 16 }}>⭐</span>
              <span style={{ fontSize: 12, color: "#166534", fontWeight: 600 }}>
                Saved
              </span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(102,126,234,0.4);
          transition: all 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(102,126,234,0.6);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #667eea;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(102,126,234,0.4);
          transition: all 0.2s;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(102,126,234,0.6);
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(16,185,129,0.3));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(16,185,129,0.5));
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-10px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
      `}</style>
    </div>
  );
}
