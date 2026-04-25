import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Day in the Life — Real Stories from Government Job Officers | NaukriYatra",
  description: "Discover what a real day looks like for IAS officers, bank managers, income tax inspectors, and more. Behind-the-scenes stories from India's most prestigious government jobs.",
  keywords: "day in the life, IAS officer, SBI PO, government job reality, career stories, job experience",
  alternates: { canonical: "/life" },
};

export default function LifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
