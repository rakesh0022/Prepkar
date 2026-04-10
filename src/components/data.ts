// ─── Countdown ───────────────────────────────────────────────────────────────
export type Countdown = {
  name: string;
  date: string;
  days: number;
  color: string;
};

// ─── Quiz ─────────────────────────────────────────────────────────────────────
export type QuizQuestion = {
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

// ─── Job ──────────────────────────────────────────────────────────────────────
export interface RoadmapStep {
  icon: string;
  title: string;   // display title (was "step" in old shape — unified to "title")
  detail: string;
  duration?: string;
}

export interface FitGuide {
  chooseIf: string[];
  avoidIf: string[];
}

export interface Job {
  id: string;
  title: string;
  org: string;
  vacancies: number;
  lastDate: string;
  salary: string;
  inHand: string;
  category: string;
  isNew: boolean;
  isHot: boolean;
  grade: string;
  benefits: string[];
  career: string;
  lifestyle: string;
  eligibility: string;
  exam: string;
  dayInLife: string;
  whyChoose: string[];      // array of bullet strings
  challenges: string;
  impact: string;
  roadmap: RoadmapStep[];
  promotionPath: { title: string; salary: string; years: string }[];
  // enriched fields used by JobDetailSheet
  difficulty: "Moderate" | "Hard" | "Very Hard";
  prepTime: string;
  realityCheck: string;
  fitGuide: FitGuide;
  successStory: { emoji: string; name: string; line: string };
  applyLink?: string;
}

// ─── Jobs data ────────────────────────────────────────────────────────────────
export const JOBS: Job[] = [
  {
    id: "sbi-po-2026",
    title: "SBI Probationary Officer",
    org: "State Bank of India",
    vacancies: 2000,
    lastDate: "May 15, 2026",
    salary: "₹41,960 – ₹63,840",
    inHand: "₹52K – ₹58K",
    category: "banking",
    isNew: true,
    isHot: true,
    grade: "Junior Management Scale-I",
    difficulty: "Hard",
    prepTime: "8–12 months",
    applyLink: "https://sbi.co.in/careers",
    benefits: ["HRA ₹15K–₹30K", "Medical Insurance (Family)", "Pension (NPS)", "Leased Housing", "LFC Travel", "Subsidized Loans", "30 Paid Leaves", "Gratuity"],
    career: "PO → Manager → Senior Manager → Chief Manager → AGM → DGM → GM",
    lifestyle: "SBI provides leased accommodation or HRA based on city. Work hours 10 AM–5 PM with alternate Saturdays off. Medical insurance covers your entire family including parents. Transfers every 3–4 years across the country.",
    eligibility: "Graduation in any discipline. Age 21–30 years. OBC +3, SC/ST +5, PwD +10 years relaxation.",
    exam: "Prelims → Mains → Interview",
    dayInLife: "9:30 AM — Arrive at branch, check circulars\n10:00 AM — Branch opens, manage operations\n11:00 AM — Process loan applications\n1:00 PM — Lunch break\n1:30 PM — Customer meetings\n3:00 PM — Cash verification\n5:00 PM — Branch closes\n5:30 PM — Head home",
    whyChoose: [
      "India's largest bank — the brand carries enormous respect",
      "Stable career with a clear promotion path to senior management",
      "Leased housing or HRA — SBI pays your rent directly",
      "Medical insurance covers your entire family including parents",
    ],
    challenges: "Initial postings can be rural. Month-end and year-end require longer hours. Transfers every 3–4 years. Probation period involves intensive learning.",
    realityCheck: "Transfers are frequent — you may be posted anywhere in India. Month-end and year-end involve long hours. But job security is absolute and the brand opens every door.",
    impact: "As a Bank PO, you directly help people access financial services — opening accounts for villagers who never had a bank account, processing crop loans for farmers, helping small businesses get credit. You bring banking to the last mile of India.",
    fitGuide: {
      chooseIf: [
        "You want a prestigious, stable career in banking",
        "You are okay with transfers across India",
        "You want a clear path to senior management",
        "You value perks like leased housing and family medical cover",
      ],
      avoidIf: [
        "You cannot relocate — SBI posts anywhere in India",
        "You want a 9-to-5 with zero pressure",
        "You dislike customer-facing work",
      ],
    },
    successStory: {
      emoji: "👨‍💼",
      name: "Arunraj K",
      line: "Farmer's son from Tamil Nadu. 200+ mocks. Cleared SBI PO in 1st attempt.",
    },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Any graduate, 21–30 years, Indian citizen", duration: "1 day" },
      { icon: "📝", title: "Apply Online", detail: "SBI official portal, ₹750 fee", duration: "30 min" },
      { icon: "📖", title: "Prelims Exam", detail: "MCQ — Reasoning, English, Quant — 1 hour", duration: "3–4 months prep" },
      { icon: "✍️", title: "Mains Exam", detail: "Detailed exam + descriptive English paper", duration: "2 months prep" },
      { icon: "🎯", title: "Panel Interview", detail: "30 min face-to-face with senior bankers", duration: "1 month prep" },
      { icon: "🏦", title: "Join & Training", detail: "2-year probation with branch training", duration: "2 years" },
      { icon: "📈", title: "Career Growth", detail: "Manager in 6 yrs → Chief Manager → GM", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Probationary Officer", salary: "₹52,000/month", years: "Year 0–2" },
      { title: "Officer", salary: "₹62,000/month", years: "Year 2–5" },
      { title: "Manager", salary: "₹85,000/month", years: "Year 5–10" },
      { title: "Senior Manager", salary: "₹1,10,000/month", years: "Year 10–15" },
      { title: "Chief Manager", salary: "₹1,50,000/month", years: "Year 15–20" },
      { title: "AGM / DGM", salary: "₹2,00,000+/month", years: "Year 20+" },
    ],
  },
  {
    id: "ssc-cgl-2026",
    title: "SSC CGL 2026",
    org: "Staff Selection Commission",
    vacancies: 14582,
    lastDate: "Apr 30, 2026",
    salary: "₹25,500 – ₹81,100",
    inHand: "₹44K – ₹65K",
    category: "ssc",
    isNew: false,
    isHot: true,
    grade: "Income Tax Inspector, Auditor, ASO",
    difficulty: "Hard",
    prepTime: "8–14 months",
    applyLink: "https://ssc.gov.in",
    benefits: ["DA + HRA + Transport", "Govt Quarter (Type II/III)", "Medical", "Pension", "Education Allowance ₹2,250/child", "LTC", "Gratuity"],
    career: "Inspector → Sr. Inspector → Asst. Commissioner → Dy. Commissioner → Commissioner",
    lifestyle: "Government quarter in the city of posting. Subsidized canteen. 9:30–5:30 work hours. Respect and authority of a central government officer from day one.",
    eligibility: "Graduation in any discipline. Age 18–32. Category relaxation applies.",
    exam: "Tier I (MCQ) → Tier II (Detailed MCQ) → Document Verification",
    dayInLife: "9:30 AM — Reach office, review case files\n10:00 AM — Process tax assessments\n11:30 AM — Field visit for survey\n1:00 PM — Lunch in office canteen\n2:00 PM — Meet taxpayers\n4:00 PM — Documentation\n5:30 PM — Leave",
    whyChoose: [
      "One exam, 20+ department options to choose from",
      "Income Tax Inspector — authority, exciting field work including raids",
      "Government accommodation in the city you're posted",
      "Stable career with regular promotions over 25 years",
    ],
    challenges: "30 lakh+ candidates for 15,000 posts. Initial department might not be preferred. Some posts involve heavy paperwork. Transfers across states.",
    realityCheck: "Tier II is genuinely tough — Maths and English at a high level. The process takes 12–18 months end-to-end. But the variety of posts and departments makes it worth the effort.",
    impact: "As Income Tax Inspector, you ensure tax compliance — the foundation of government revenue. Your work funds schools, hospitals, roads. As Auditor in CAG, you hold the government accountable for how it spends public money.",
    fitGuide: {
      chooseIf: [
        "You want variety — 20+ departments to choose from",
        "You like the idea of field work (IT raids, audits, surveys)",
        "You want a central government post with good perks",
        "You are strong in Maths and English",
      ],
      avoidIf: [
        "You are weak in Maths — Tier II is heavily Maths-based",
        "You want a single-city posting with no transfers",
        "You need a job quickly — SSC CGL takes 12–18 months end-to-end",
      ],
    },
    successStory: {
      emoji: "👩‍💻",
      name: "Priya Sharma",
      line: "Failed 3 times. 4th attempt — Income Tax Inspector, Delhi. ₹65K/month + govt quarter.",
    },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Any graduate, 18–32 years", duration: "1 day" },
      { icon: "📝", title: "Apply on SSC Portal", detail: "Online, ₹100 fee (₹0 for women/SC/ST)", duration: "30 min" },
      { icon: "💻", title: "Tier I Exam", detail: "Computer-based MCQ screening", duration: "3–4 months prep" },
      { icon: "📖", title: "Tier II Exam", detail: "Detailed exam — rank-deciding", duration: "3–4 months prep" },
      { icon: "✅", title: "Document Check", detail: "Verify certificates at SSC office", duration: "1–2 months" },
      { icon: "🏛️", title: "Post Allocation", detail: "Based on rank + preference list", duration: "1 month" },
      { icon: "📈", title: "Career Growth", detail: "Inspector → Commissioner over 25 years", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Inspector / Auditor", salary: "₹52,000/month", years: "Year 0–5" },
      { title: "Senior Inspector", salary: "₹68,000/month", years: "Year 5–10" },
      { title: "Asst. Commissioner", salary: "₹95,000/month", years: "Year 10–18" },
      { title: "Dy. Commissioner", salary: "₹1,30,000/month", years: "Year 18–25" },
      { title: "Commissioner", salary: "₹2,00,000+/month", years: "Year 25+" },
    ],
  },
  {
    id: "rrb-ntpc-2026",
    title: "RRB NTPC Graduate Level",
    org: "Railway Recruitment Board",
    vacancies: 11558,
    lastDate: "May 20, 2026",
    salary: "₹29,200 – ₹92,300",
    inHand: "₹35K – ₹55K",
    category: "railway",
    isNew: true,
    isHot: false,
    grade: "Station Master, Goods Guard, Comm. Apprentice",
    difficulty: "Moderate",
    prepTime: "6–10 months",
    applyLink: "https://rrbapply.gov.in",
    benefits: ["FREE Railway Pass — Lifetime!", "DA + HRA", "Railway Quarter", "RELHS Medical (Best in Govt)", "Pension", "Education Allow.", "Canteen"],
    career: "Station Master → Superintendent → DOM → Sr. DOM → ADRM → DRM",
    lifestyle: "FREE railway travel across India for you AND family — forever. Railway quarters near stations. RELHS medical covers everything. Respected uniformed position.",
    eligibility: "Graduation in any discipline. Age 18–33. Category relaxation applies.",
    exam: "CBT-1 → CBT-2 → Typing Test → Medical",
    dayInLife: "6:00 AM — Morning shift begins\n6:15 AM — Check signals, track status\n7:00 AM — First trains — manage platforms\n10:00 AM — Passenger coordination\n1:00 PM — Shift handover\n2:00 PM — Off duty",
    whyChoose: [
      "Lifetime free railway travel for entire family — worth lakhs per year",
      "Railway medical (RELHS) is the best healthcare in all govt services",
      "Unique charm of managing stations in uniform",
      "Railway community has its own colonies, clubs, hospitals",
    ],
    challenges: "Shift work including nights and holidays. Remote station postings initially. High alertness required — mistakes can be serious. Frequent transfers in early years.",
    realityCheck: "Station Masters work rotational shifts including nights. Postings can be in remote areas. But the railway community is tight-knit and the perks are unmatched.",
    impact: "Indian Railways carries 2.3 crore passengers DAILY. As Station Master, you ensure safe, on-time travel for thousands every day. During natural disasters, railways become the lifeline — you coordinate emergency trains.",
    fitGuide: {
      chooseIf: [
        "You love the idea of a uniformed, operational role",
        "Free lifetime railway travel excites you",
        "You are okay with shift duties and remote postings",
        "You want the best government medical facility (RELHS)",
      ],
      avoidIf: [
        "You cannot work night shifts or rotational hours",
        "You want to stay in a specific city",
        "You have vision issues — Station Master requires good eyesight",
      ],
    },
    successStory: {
      emoji: "🧑‍✈️",
      name: "Rohit Meena",
      line: "Station Master, Kota. Took parents to Kerala on free railway pass — first time they saw the sea.",
    },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Any graduate, 18–33 years", duration: "1 day" },
      { icon: "📝", title: "Apply on RRB Portal", detail: "Through your regional RRB", duration: "30 min" },
      { icon: "💻", title: "CBT-1", detail: "Computer-based screening test", duration: "3–4 months prep" },
      { icon: "📖", title: "CBT-2", detail: "Main exam — rank-deciding", duration: "2–3 months prep" },
      { icon: "🏥", title: "Typing + Medical", detail: "Skill test + fitness check", duration: "2 weeks prep" },
      { icon: "🚂", title: "Join Railways", detail: "Training at Zonal Institute", duration: "3–6 months" },
      { icon: "📈", title: "Career Growth", detail: "Station Master → DRM over 20+ years", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Station Master", salary: "₹42,000/month", years: "Year 0–5" },
      { title: "Station Superintendent", salary: "₹58,000/month", years: "Year 5–10" },
      { title: "DOM", salary: "₹80,000/month", years: "Year 10–18" },
      { title: "Sr. DOM / ADRM", salary: "₹1,20,000/month", years: "Year 18–25" },
      { title: "DRM", salary: "₹1,80,000+/month", years: "Year 25+" },
    ],
  },
  {
    id: "upsc-cse-2026",
    title: "UPSC Civil Services (IAS/IPS)",
    org: "Union Public Service Commission",
    vacancies: 1056,
    lastDate: "Mar 25, 2026",
    salary: "₹56,100 – ₹2,50,000",
    inHand: "₹80K – ₹1.2L (start)",
    category: "upsc",
    isNew: false,
    isHot: true,
    grade: "IAS, IPS, IFS — All India Services",
    difficulty: "Very Hard",
    prepTime: "1–3 years",
    applyLink: "https://upsc.gov.in",
    benefits: ["Govt Bungalow (Type V–VII)", "Vehicle + Driver", "Domestic Staff", "Security", "Lifetime Pension", "Free Medical", "Foreign Deputation", "Phone + Internet"],
    career: "SDM → DM → Div. Commissioner → Secretary → Principal Secy → Chief Secy",
    lifestyle: "As DM — head of entire district. Budget of ₹500–₹2,000 crore. 10,000+ employees. Bungalow with 10+ rooms, cook, gardener, security. Official vehicle with beacon. Total perks worth ₹5–10L/month. Possible UN/World Bank postings.",
    eligibility: "Graduation in ANY field. Age 21–32. Attempts: 6 (Gen), 9 (OBC), Unlimited (SC/ST).",
    exam: "Prelims (MCQ) → Mains (9 papers, 5 days) → Personality Test",
    dayInLife: "6:00 AM — Wake in govt bungalow\n7:30 AM — Review daily briefing\n9:00 AM — Collectorate, meet dept. heads\n11:00 AM — Jan Sunwai — public hearing\n1:00 PM — Lunch at bungalow\n2:00 PM — Field visits — schools, hospitals\n4:00 PM — Review law & order with SP\n7:00 PM — Return home",
    whyChoose: [
      "The most prestigious position in India — District Magistrate at 25",
      "Authority over an entire district of 10–50 lakh people",
      "Bungalow, vehicle, driver, domestic staff — all provided",
      "Power to genuinely change millions of lives",
    ],
    challenges: "Most competitive exam in India — 10 lakh applicants for 1,000 seats. 1–3 years preparation. Remote initial postings. Immense pressure and scrutiny. Political challenges.",
    realityCheck: "Average successful candidate attempts 3–4 times. Preparation demands 10–12 hours daily for 1–2 years. Poor work-life balance during crises. But there is no ceiling on impact or prestige.",
    impact: "As District Magistrate, YOU are responsible for everything — education, healthcare, roads, law & order, disaster relief for an entire district. During COVID, DMs ran vaccination drives. During floods, they managed rescue operations. You literally shape the future of millions.",
    fitGuide: {
      chooseIf: [
        "You want to create real change at a district/national level",
        "You can commit 1–3 years of focused preparation",
        "You are motivated by power, prestige, and public service",
        "You have strong reading habits and analytical thinking",
      ],
      avoidIf: [
        "You need income within 1–2 years",
        "You cannot handle repeated failure and uncertainty",
        "You want a predictable 9-to-5 lifestyle",
      ],
    },
    successStory: {
      emoji: "👩‍💼",
      name: "Tina Dabi",
      line: "AIR 1, UPSC 2015. 8 hours daily, 2 years. NCERTs + consistency. Nothing else.",
    },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Any graduate, 21–32 yrs, max 6 attempts (Gen)", duration: "1 day" },
      { icon: "📝", title: "Apply on UPSC Portal", detail: "₹100 fee (₹0 for SC/ST/Women)", duration: "30 min" },
      { icon: "📖", title: "Prelims", detail: "2 MCQ papers — General Studies + CSAT", duration: "6–8 months prep" },
      { icon: "✍️", title: "Mains", detail: "9 descriptive papers over 5 days", duration: "4–6 months prep" },
      { icon: "🎯", title: "Personality Test", detail: "30-min board interview by 5-member panel", duration: "1 month prep" },
      { icon: "🏔️", title: "LBSNAA Training", detail: "2 years at Mussoorie — officer training", duration: "2 years" },
      { icon: "🇮🇳", title: "Serve the Nation", detail: "SDM → DM → Secretary → Chief Secretary", duration: "Career" },
    ],
    promotionPath: [
      { title: "SDM / Under Secretary", salary: "₹80,000/month", years: "Year 0–4" },
      { title: "District Magistrate", salary: "₹1,20,000/month", years: "Year 4–9" },
      { title: "Div. Commissioner", salary: "₹1,50,000/month", years: "Year 9–16" },
      { title: "Secretary", salary: "₹2,00,000/month", years: "Year 16–25" },
      { title: "Chief Secretary", salary: "₹2,50,000+/month", years: "Year 25+" },
    ],
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────
export const JOB_CATEGORIES = [
  { id: "banking", label: "Banking", icon: "🏦", color: "#0C7C59" },
  { id: "ssc",     label: "SSC",     icon: "📋", color: "#2563eb" },
  { id: "railway", label: "Railway", icon: "🚂", color: "#dc2626" },
  { id: "upsc",    label: "UPSC",    icon: "🏛️", color: "#7c3aed" },
  { id: "defence", label: "Defence", icon: "🎖️", color: "#0d9488" },
  { id: "state",   label: "State PSC", icon: "🗳️", color: "#ea580c" },
];

// ─── Interview categories ─────────────────────────────────────────────────────
export const INTERVIEW_CATS = [
  { id: "bank_po",    title: "Bank PO / Clerk",  sub: "SBI, IBPS, RBI",       icon: "🏦", color: "#0C7C59", roles: ["SBI PO", "IBPS Clerk", "RBI Grade B"] },
  { id: "fresher_it", title: "Fresher / IT Job",  sub: "TCS, Infosys, Wipro",  icon: "💼", color: "#2563eb", roles: ["TCS HR Round", "Infosys Interview", "Generic Fresher"] },
  { id: "mba",        title: "MBA Admission",     sub: "CAT, XAT, IIM",        icon: "🎓", color: "#d97706", roles: ["IIM Interview", "XLRI Interview", "General MBA PI"] },
  { id: "govt_job",   title: "Government Job",    sub: "SSC, UPSC, PSC",       icon: "🏛️", color: "#dc2626", roles: ["UPSC Personality Test", "SSC Interview", "State PSC Interview"] },
];

// ─── Hero stories ─────────────────────────────────────────────────────────────
export const HERO_STORIES = [
  { quote: "Failed 3 times. Family said stop trying. 4th attempt — selected as Income Tax Inspector.", name: "Priya S.", role: "SSC CGL 2024", emoji: "💪" },
  { quote: "Small village, no coaching, just a phone and free YouTube. Cleared SBI PO in first attempt.", name: "Arun K.", role: "SBI PO 2023", emoji: "🌟" },
  { quote: "Started preparation at 28. Everyone said too late. Cleared UPSC at 30. It's never too late.", name: "Vikram R.", role: "IAS 2024", emoji: "🔥" },
];

// ─── Success stories ──────────────────────────────────────────────────────────
export const STORIES = [
  { name: "Tina Dabi",    achievement: "AIR 1, UPSC 2015",       now: "IAS Officer, Rajasthan", quote: "NCERT books were my foundation. I didn't chase too many sources — I mastered a few and revised them multiple times. Consistency and self-belief are the only secrets.", emoji: "👩‍💼", tag: "UPSC",    color: "#7c3aed" },
  { name: "Arunraj K",    achievement: "SBI PO 2023, 1st Attempt", now: "PO, SBI Chennai",       quote: "I come from a farming family in rural Tamil Nadu. I prepared in my village library with just a smartphone. I gave 200+ mock tests. The day I saw my name in the selection list, my mother cried for an hour.", emoji: "👨‍💼", tag: "Banking", color: "#0C7C59" },
  { name: "Priya Sharma", achievement: "SSC CGL 2024",            now: "IT Inspector, Delhi",    quote: "I failed 3 times. My family wanted me to stop. I cried many nights alone. But I kept going. 4th attempt — cracked it. Now I earn ₹65,000/month with a government quarter in Delhi.", emoji: "👩‍💻", tag: "SSC",     color: "#2563eb" },
  { name: "Rohit Meena",  achievement: "RRB NTPC 2023",           now: "Station Master, Kota",   quote: "FREE train travel for my family — forever. Last month I took my parents to Kerala. First time they saw the sea. My mother said 'beta, you changed our life.'", emoji: "🧑‍✈️", tag: "Railway", color: "#dc2626" },
];

// ─── Countdowns ───────────────────────────────────────────────────────────────
export const COUNTDOWNS: Countdown[] = [
  { name: "UPSC Prelims",   date: "Jun 1",  days: 53, color: "#7c3aed" },
  { name: "SBI PO Prelims", date: "Jun 15", days: 67, color: "#0C7C59" },
  { name: "SSC CGL Tier I", date: "Jun 20", days: 72, color: "#2563eb" },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
export function getDaysLeft(dateStr: string): number {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - today.getTime();
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
