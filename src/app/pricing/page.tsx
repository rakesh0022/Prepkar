"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PLANS, type PlanId } from "@/lib/subscription";
import BottomNav from "@/components/BottomNav";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function PricingPage() {
  const [loading, setLoading] = useState<PlanId | null>(null);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Get user info
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/login?redirect=/pricing"); return; }
      setUserName(user.user_metadata?.full_name || "");
      setUserEmail(user.email || "");
    });
  }, [supabase, router]);

  async function handlePurchase(planId: PlanId) {
    setError(""); setLoading(planId);
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) return;

    try {
      // Create order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, amount: plan.price }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error || "Failed to create order");
      }

      const { orderId, keyId } = await orderRes.json();

      // Open Razorpay checkout
      const options = {
        key: keyId,
        amount: plan.price * 100,
        currency: "INR",
        name: "NaukriYatra",
        description: `${plan.label} Plan — Unlimited AI Practice`,
        order_id: orderId,
        prefill: { name: userName, email: userEmail },
        theme: { color: "#2563EB" },
        handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
          // Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              planId,
              amount: plan.price,
              days: plan.days,
            }),
          });

          if (verifyRes.ok) {
            router.push("/dashboard?upgraded=true");
          } else {
            setError("Payment verification failed. Contact support if amount was deducted.");
          }
          setLoading(null);
        },
        modal: {
          ondismiss: function () { setLoading(null); },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setLoading(null);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "28px 20px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🚀</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
            Upgrade to Pro
          </h1>
          <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5 }}>
            You&apos;ve used your 2 free practice tests this month.<br />
            Unlock unlimited AI practice for all 6 exams.
          </p>
        </div>

        {/* What you get */}
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px 18px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>PRO INCLUDES</div>
          {[
            "Unlimited AI practice tests — all exams, all stages",
            "Prelims MCQ, Mains, Descriptive & Interview",
            "Detailed scorecard with weak area analysis",
            "Full practice history & progress tracking",
            "Priority AI response (faster results)",
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0" }}>
              <span style={{ color: "#16A34A", fontSize: 14 }}>✓</span>
              <span style={{ fontSize: 13, color: "#374151" }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {PLANS.map(plan => (
            <button key={plan.id} onClick={() => handlePurchase(plan.id)} disabled={loading !== null}
              style={{
                background: "#FFFFFF", borderRadius: 16, padding: "18px 20px",
                border: plan.id === "yearly" ? `2px solid ${plan.color}` : "1px solid var(--border)",
                boxShadow: plan.id === "yearly" ? `0 4px 16px ${plan.color}15` : "var(--shadow-sm)",
                cursor: loading ? "default" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                position: "relative", overflow: "hidden",
                opacity: loading && loading !== plan.id ? 0.6 : 1,
                textAlign: "left", width: "100%",
              }}>
              {/* Badge */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                background: plan.color, color: "#fff",
                fontSize: 9, fontWeight: 700, padding: "3px 12px",
                borderRadius: "0 14px 0 10px", letterSpacing: 0.5,
              }}>{plan.badge}</div>

              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#111827", fontFamily: "'Outfit'" }}>{plan.label}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                  {plan.id === "lifetime" ? "One-time payment" : `Billed ${plan.period}ly`}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: plan.color, fontFamily: "'Outfit'" }}>₹{plan.price}</div>
                <div style={{ fontSize: 10, color: "#9CA3AF" }}>
                  {plan.id === "monthly" ? "/month" : plan.id === "yearly" ? "/year (₹42/mo)" : "forever"}
                </div>
              </div>
            </button>
          ))}
        </div>

        {error && (
          <div style={{ fontSize: 12, color: "#DC2626", background: "#FEF2F2", padding: "10px 14px", borderRadius: 10, marginBottom: 16, border: "1px solid rgba(220,38,38,0.12)", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Guarantees */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[
            { icon: "🔒", text: "Secure Payment via Razorpay" },
            { icon: "💳", text: "UPI, Cards, Net Banking" },
            { icon: "↩️", text: "Cancel Anytime" },
          ].map((g, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 6px", background: "#F9FAFB", borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 16, marginBottom: 3 }}>{g.icon}</div>
              <div style={{ fontSize: 9, color: "#6B7280", fontWeight: 600 }}>{g.text}</div>
            </div>
          ))}
        </div>

        {/* Free tier note */}
        <div style={{ textAlign: "center" }}>
          <Link href="/interview" style={{ fontSize: 12, color: "#9CA3AF", textDecoration: "none" }}>
            ← Continue with free tier (2 tests/month)
          </Link>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
