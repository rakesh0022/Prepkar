import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId, amount, days } = await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) return NextResponse.json({ error: "Payment system not configured" }, { status: 500 });

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", keySecret).update(body).digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Calculate expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (days || 30));

    // Update subscription
    const { error } = await supabase
      .from("subscriptions")
      .upsert({
        user_id: user.id,
        plan: planId,
        status: "active",
        razorpay_payment_id,
        razorpay_order_id,
        amount,
        currency: "INR",
        expires_at: planId === "lifetime" ? new Date("2099-12-31").toISOString() : expiresAt.toISOString(),
        free_tests_used: 0,
      }, { onConflict: "user_id" });

    if (error) {
      console.error("Subscription update error:", error);
      return NextResponse.json({ error: "Failed to activate subscription" }, { status: 500 });
    }

    return NextResponse.json({ success: true, plan: planId });
  } catch (error: unknown) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
