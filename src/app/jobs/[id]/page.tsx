"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { notFound } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import JobDetailSheet from "@/components/jobs/JobDetailSheet";
import { JOBS } from "@/components/data";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const job = JOBS.find((j) => j.id === id);
  if (!job) notFound();

  return (
    <main style={{ minHeight: "100vh", background: "#fff", paddingBottom: 76 }}>
      <JobDetailSheet
        job={job}
        onClose={() => router.back()}
        fullPage
      />
      <BottomNav />
    </main>
  );
}
