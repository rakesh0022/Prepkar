import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories — Government Exam Toppers — NaukriYatra",
  description: "Real success stories from government exam toppers. SBI PO, SSC CGL, UPSC, Railway aspirants who cracked competitive exams. Their journey from dream to selection.",
  keywords: ["government exam success stories", "IAS success story", "SBI PO topper", "SSC CGL selection", "UPSC success"],
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "Government Exam Success Stories — NaukriYatra",
    description: "Real people, real struggles, real selection. Stories from SBI PO, SSC CGL, UPSC, Railway toppers.",
  },
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
