export type NotificationCategory = "SSC" | "Banking" | "UPSC" | "Railway" | "Defence" | "State";

export interface Notification {
  id: string;
  title: string;
  category: NotificationCategory;
  date: string; // ISO format: "2026-04-25"
  source: string;
  sourceUrl: string;
  examId?: string; // Optional: links to a job in JOBS data
}

// Category colors
export const CATEGORY_COLORS: Record<NotificationCategory, string> = {
  SSC: "#D97706",
  Banking: "#059669",
  UPSC: "#7C3AED",
  Railway: "#DC2626",
  Defence: "#0D9488",
  State: "#2563EB",
};

// Helper: Check if notification is new (within last 7 days)
export function isNotificationNew(dateStr: string): boolean {
  const notifDate = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - notifDate.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

// Helper: Format date for display
export function formatNotificationDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Notifications data (sorted by date, newest first)
export const NOTIFICATIONS: Notification[] = [
  {
    id: "ssc-cgl-2026",
    title: "SSC CGL 2026 Notification Released — 14,582 Vacancies",
    category: "SSC",
    date: "2026-04-25",
    source: "SSC Official",
    sourceUrl: "https://ssc.gov.in/",
    examId: "ssc-cgl",
  },
  {
    id: "sbi-po-2026",
    title: "SBI PO 2026 Registration Begins — Apply Before May 15",
    category: "Banking",
    date: "2026-04-24",
    source: "SBI Official",
    sourceUrl: "https://sbi.co.in/web/careers",
    examId: "sbi-po",
  },
  {
    id: "upsc-cse-2026-prelims",
    title: "UPSC CSE 2026 Prelims on June 1 — Last-Minute Strategy",
    category: "UPSC",
    date: "2026-04-23",
    source: "UPSC Official",
    sourceUrl: "https://upsc.gov.in/",
    examId: "upsc-cse",
  },
  {
    id: "rrb-ntpc-2026",
    title: "RRB NTPC 2026 — 11,558 Posts, CBT-1 Date Announced",
    category: "Railway",
    date: "2026-04-20",
    source: "Railway Board",
    sourceUrl: "https://www.rrbapply.gov.in/",
    examId: "rrb-ntpc",
  },
  {
    id: "delhi-police-2026",
    title: "Delhi Police Constable 2026 — 6,433 Vacancies Open",
    category: "Defence",
    date: "2026-04-18",
    source: "SSC Official",
    sourceUrl: "https://ssc.gov.in/",
    examId: "delhi-police",
  },
  {
    id: "ibps-clerk-2026",
    title: "IBPS Clerk 2026 Notification — 8,500+ Vacancies Expected",
    category: "Banking",
    date: "2026-04-15",
    source: "IBPS Official",
    sourceUrl: "https://www.ibps.in/",
    examId: "ibps-clerk",
  },
  {
    id: "ssc-chsl-2026",
    title: "SSC CHSL 2026 Registration Extended Till April 30",
    category: "SSC",
    date: "2026-04-12",
    source: "SSC Official",
    sourceUrl: "https://ssc.gov.in/",
    examId: "ssc-chsl",
  },
  {
    id: "uppsc-2026",
    title: "UPPSC PCS 2026 Prelims Admit Card Released",
    category: "State",
    date: "2026-04-10",
    source: "UPPSC Official",
    sourceUrl: "https://uppsc.up.nic.in/",
    examId: "uppsc",
  },
  {
    id: "rbi-grade-b-2026",
    title: "RBI Grade B 2026 Phase-I Result Declared",
    category: "Banking",
    date: "2026-04-08",
    source: "RBI Official",
    sourceUrl: "https://www.rbi.org.in/",
    examId: "rbi-grade-b",
  },
  {
    id: "nda-2026-ii",
    title: "NDA 2026-II Notification Out — Apply Before May 20",
    category: "Defence",
    date: "2026-04-05",
    source: "UPSC Official",
    sourceUrl: "https://upsc.gov.in/",
    examId: "nda",
  },
];

// Get new notifications count
export function getNewNotificationsCount(): number {
  return NOTIFICATIONS.filter(n => isNotificationNew(n.date)).length;
}

// Get notifications by category
export function getNotificationsByCategory(category: NotificationCategory): Notification[] {
  return NOTIFICATIONS.filter(n => n.category === category);
}

// Get latest N notifications
export function getLatestNotifications(count: number): Notification[] {
  return NOTIFICATIONS.slice(0, count);
}
