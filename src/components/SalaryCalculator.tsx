"use client";

import { useState } from "react";
import salaryData from "@/data/salary-data.json";

export default function SalaryCalculator() {
  const [selectedPost, setSelectedPost] = useState("");
  const [cityType, setCityType] = useState("xCity");
  const [experience, setExperience] = useState(0);
  const [includePerks, setIncludePerks] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const posts = salaryData.posts;
  const allowances = salaryData.allowances;
  const deductions = salaryData.deductions;

  const selectedPostData = posts.find((p) => p.id === selectedPost);

  const calculateSalary = () => {
    if (!selectedPostData) return null;

    // Find the appropriate increment level based on experience
    const getBasicPay = () => {
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
        if (experience >= milestone.years && increments[milestone.key]) {
          return increments[milestone.key];
        }
      }
      
      // If experience is less than 3 years, use entry-level salary
      return selectedPostData.basicPay.entry;
    };

    const basicPay = getBasicPay();
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

  const cityIcons: Record<string, string> = {
    xCity: "🏙️",
    yCity: "🌆",
    zCity: "🏘️",
  };

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
          {/* Step 1: Job Post Selection */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 700,
              color: "#1F2937",
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 16 }}>💼</span> Select Job Post
            </label>
            <select
              value={selectedPost}
              onChange={(e) => setSelectedPost(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #E5E7EB",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 600,
                color: "#1F2937",
                background: "#F9FAFB",
                cursor: "pointer",
                transition: "all 0.2s",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "#FFFFFF";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E7EB";
                e.target.style.background = "#F9FAFB";
              }}
            >
              <option value="">Choose a job post...</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.name} ({post.category})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: City Type - Premium Pills */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 700,
              color: "#1F2937",
              marginBottom: 12,
            }}>
              <span style={{ fontSize: 16 }}>📍</span> City Type
            </label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { value: "xCity", label: "X City", sub: "Delhi, Mumbai", percent: "HRA 30%" },
                { value: "yCity", label: "Y City", sub: "Pune, Jaipur", percent: "HRA 20%" },
                { value: "zCity", label: "Z City", sub: "Others", percent: "HRA 10%" },
              ].map((city) => (
                <button
                  key={city.value}
                  onClick={() => handleCityChange(city.value)}
                  style={{
                    flex: "1 1 auto",
                    minWidth: "fit-content",
                    padding: "14px 16px",
                    borderRadius: 14,
                    fontSize: 12,
                    fontWeight: 700,
                    border: cityType === city.value ? "2px solid #667eea" : "2px solid #E5E7EB",
                    background: cityType === city.value
                      ? "linear-gradient(135deg, #EEF2FF, #F3E8FF)"
                      : "#FFFFFF",
                    color: cityType === city.value ? "#667eea" : "#6B7280",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: cityType === city.value ? "scale(1.02)" : "scale(1)",
                    boxShadow: cityType === city.value
                      ? "0 4px 16px rgba(102,126,234,0.15)"
                      : "none",
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{cityIcons[city.value]}</div>
                  <div style={{ fontWeight: 800, marginBottom: 2 }}>{city.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.7 }}>{city.sub}</div>
                  <div style={{ fontSize: 10, marginTop: 4, fontWeight: 600 }}>{city.percent}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Experience Slider */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 13,
              fontWeight: 700,
              color: "#1F2937",
              marginBottom: 12,
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>📈</span> Years of Experience
              </span>
              <span style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#667eea",
                fontFamily: "'Outfit', sans-serif",
              }}>
                {experience} years
              </span>
            </label>
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
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9CA3AF", marginTop: 8, fontWeight: 600 }}>
              <span>0</span>
              <span>3</span>
              <span>7</span>
              <span>14</span>
              <span>20</span>
              <span>30</span>
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
          {salary && (
            <>
              {/* Hero In-Hand Display */}
              <div style={{
                padding: "24px 20px",
                background: "linear-gradient(to bottom, #F9FAFB, #FFFFFF)",
                borderRadius: 20,
                marginBottom: 20,
                border: "1px solid #E5E7EB",
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
                    fontSize: 48,
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
                    ₹{Math.round(salary.netInHand).toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "#9CA3AF",
                    fontWeight: 500,
                  }}>
                    After all deductions
                  </div>
                </div>
              </div>

              {/* Breakdown Section */}
              <div style={{
                background: "#F9FAFB",
                borderRadius: 20,
                padding: "20px",
                marginBottom: 20,
              }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#6B7280",
                  marginBottom: 16,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}>
                  <span style={{ width: 3, height: 14, background: "#667eea", borderRadius: 2 }} />
                  Salary Breakdown
                </div>

                <div style={{ marginBottom: 16 }}>
                  {[
                    { l: "Basic Pay", v: salary.basicPay, cl: "#667eea", icon: "💼" },
                    { l: `Dearness Allowance (${allowances.da}%)`, v: salary.da, cl: "#0D9488", icon: "📈" },
                    { l: `HRA (${(allowances.hra as Record<string, number>)[cityType]}%)`, v: salary.hra, cl: "#D97706", icon: "🏠" },
                    { l: "Transport Allowance", v: salary.ta, cl: "#7C3AED", icon: "🚗" },
                  ].map((it, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.04)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 16 }}>{it.icon}</span>
                        <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{it.l}</span>
                      </div>
                      <span style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: it.cl,
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        ₹{Math.round(it.v).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Gross Total */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 16px",
                  background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)",
                  borderRadius: 12,
                  marginBottom: 12,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1F2937" }}>Gross Salary</span>
                  <span style={{
                    fontSize: 17,
                    fontWeight: 900,
                    fontFamily: "'Outfit', sans-serif",
                    color: "#1F2937",
                  }}>
                    ₹{Math.round(salary.gross).toLocaleString()}
                  </span>
                </div>

                {/* Deductions */}
                <div style={{
                  background: "#FEF2F2",
                  borderRadius: 12,
                  padding: "12px 16px",
                  marginBottom: 12,
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14 }}>➖</span>
                      <span style={{ fontSize: 12, color: "#DC2626", fontWeight: 600 }}>NPS Deduction ({deductions.nps}%)</span>
                    </div>
                    <span style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#DC2626",
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      −₹{Math.round(salary.npsDeduction).toLocaleString()}
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14 }}>➖</span>
                      <span style={{ fontSize: 12, color: "#DC2626", fontWeight: 600 }}>Professional Tax</span>
                    </div>
                    <span style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#DC2626",
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      −₹{deductions.professionalTax}
                    </span>
                  </div>
                </div>

                {/* Final In-Hand */}
                <div style={{
                  padding: "18px 20px",
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
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>NET IN-HAND SALARY</div>
                    </div>
                    <div style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: "#fff",
                      fontFamily: "'Outfit', sans-serif",
                      textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}>
                      ₹{Math.round(salary.netInHand).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

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

          {/* Comparison Note */}
          <div style={{
            background: "linear-gradient(135deg, #DBEAFE, #E0E7FF)",
            padding: "16px 18px",
            borderRadius: 16,
            textAlign: "center",
            border: "2px solid #93C5FD",
          }}>
            <p style={{
              fontSize: 13,
              color: "#1E40AF",
              fontWeight: 600,
              lineHeight: 1.6,
              margin: 0,
            }}>
              💡 <strong>Did you know?</strong> An entry-level IAS officer's total compensation (including perks) equals ₹25-30 LPA in private sector terms!
            </p>
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
      `}</style>
    </div>
  );
}
