import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — ₹99/month Unlimited AI Practice — NaukriYatra",
  description: "NaukriYatra Pro plans starting at ₹99/month. Unlimited AI mock tests, all exam stages, detailed scoring. Yearly ₹499, Lifetime ₹999. 5 free tests included.",
  openGraph: {
    title: "NaukriYatra Pro — Unlimited AI Practice",
    description: "Plans from ₹99/month. Unlimited mock tests for SBI PO, SSC CGL, UPSC & more.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
