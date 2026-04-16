import { createClient } from "@/lib/supabase/client";

export const FREE_TEST_LIMIT = 5;

export const PLANS = [
  { id: "monthly", label: "Monthly", price: 99, period: "month", badge: "POPULAR", color: "#2563EB", days: 30 },
  { id: "yearly", label: "Yearly", price: 499, period: "year", badge: "SAVE 58%", color: "#16A34A", days: 365 },
  { id: "lifetime", label: "Lifetime", price: 999, period: "forever", badge: "BEST VALUE", color: "#7C3AED", days: 36500 },
] as const;

export type PlanId = typeof PLANS[number]["id"];

export interface SubscriptionStatus {
  canTakeTest: boolean;
  isPro: boolean;
  freeTestsUsed: number;
  freeTestsRemaining: number;
  plan: string;
  expiresAt: string | null;
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { canTakeTest: false, isPro: false, freeTestsUsed: 0, freeTestsRemaining: 0, plan: "none", expiresAt: null };
  }

  // Get or create subscription record
  let { data: sub } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!sub) {
    // Create free tier subscription
    const { data: newSub } = await supabase
      .from("subscriptions")
      .insert({ user_id: user.id, plan: "free", status: "active", free_tests_used: 0, free_tests_reset_at: new Date().toISOString() })
      .select()
      .single();
    sub = newSub;
  }

  if (!sub) {
    return { canTakeTest: true, isPro: false, freeTestsUsed: 0, freeTestsRemaining: FREE_TEST_LIMIT, plan: "free", expiresAt: null };
  }

  // Check if paid plan is still active
  if (sub.plan !== "free" && sub.expires_at) {
    const isExpired = new Date(sub.expires_at) < new Date();
    if (isExpired) {
      // Downgrade to free
      await supabase.from("subscriptions").update({ plan: "free", status: "expired" }).eq("user_id", user.id);
      sub.plan = "free";
    }
  }

  // If paid plan, unlimited tests
  if (sub.plan !== "free") {
    return { canTakeTest: true, isPro: true, freeTestsUsed: sub.free_tests_used || 0, freeTestsRemaining: 999, plan: sub.plan, expiresAt: sub.expires_at };
  }

  // Free plan — check monthly reset
  const resetDate = new Date(sub.free_tests_reset_at || Date.now());
  const now = new Date();
  const daysSinceReset = (now.getTime() - resetDate.getTime()) / (1000 * 60 * 60 * 24);

  let freeUsed = sub.free_tests_used || 0;
  if (daysSinceReset >= 30) {
    // Reset monthly counter
    freeUsed = 0;
    await supabase.from("subscriptions").update({ free_tests_used: 0, free_tests_reset_at: now.toISOString() }).eq("user_id", user.id);
  }

  const remaining = Math.max(0, FREE_TEST_LIMIT - freeUsed);
  return { canTakeTest: remaining > 0, isPro: false, freeTestsUsed: freeUsed, freeTestsRemaining: remaining, plan: "free", expiresAt: null };
}

export async function incrementTestCount(): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("free_tests_used, plan")
    .eq("user_id", user.id)
    .single();

  if (sub && sub.plan === "free") {
    await supabase
      .from("subscriptions")
      .update({ free_tests_used: (sub.free_tests_used || 0) + 1 })
      .eq("user_id", user.id);
  }
}
