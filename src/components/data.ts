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
  title: string;
  detail: string;
  duration?: string;
}

export interface FitGuide {
  chooseIf: string[];
  avoidIf: string[];
}

export type Qualification = "10th" | "12th" | "Graduate" | "Post Graduate";

export interface Job {
  id: string;
  title: string;
  org: string;
  vacancies: number;
  lastDate: string;
  salary: string;
  inHand: string;
  category: string;
  qualification: Qualification;
  isNew: boolean;
  isHot: boolean;
  grade: string;
  benefits: string[];
  career: string;
  lifestyle: string;
  eligibility: string;
  exam: string;
  dayInLife: string;
  whyChoose: string[];
  challenges: string;
  impact: string;
  roadmap: RoadmapStep[];
  promotionPath: { title: string; salary: string; years: string }[];
  difficulty: "Moderate" | "Hard" | "Very Hard";
  prepTime: string;
  realityCheck: string;
  fitGuide: FitGuide;
  successStory: { emoji: string; name: string; line: string };
  applyLink?: string;
  syllabus?: string[];
  pyqLinks?: { label: string; url: string }[];
  salaryBreakdown?: { basic: number; da: number; hra: Record<string, number>; ta: number; other: number };
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
    qualification: "Graduate",
    isNew: true,
    isHot: true,
    grade: "Junior Management Scale-I",
    difficulty: "Hard",
    prepTime: "8–12 months",
    applyLink: "https://sbi.bank.in/web/careers/current-openings",
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
      chooseIf: ["You want a prestigious, stable career in banking", "You are okay with transfers across India", "You want a clear path to senior management", "You value perks like leased housing and family medical cover"],
      avoidIf: ["You cannot relocate — SBI posts anywhere in India", "You want a 9-to-5 with zero pressure", "You dislike customer-facing work"],
    },
    successStory: { emoji: "👨‍💼", name: "Arunraj K", line: "Farmer's son from Tamil Nadu. 200+ mocks. Cleared SBI PO in 1st attempt." },
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
    syllabus: ["Reasoning Ability", "Quantitative Aptitude", "English Language", "General/Financial Awareness", "Computer Aptitude", "Descriptive English (Letter/Essay)"],
    pyqLinks: [
      { label: "SBI PO Prelims 2024 Paper", url: "https://www.google.com/search?q=SBI+PO+Prelims+2024+previous+year+paper+pdf" },
      { label: "SBI PO Mains 2024 Paper", url: "https://www.google.com/search?q=SBI+PO+Mains+2024+previous+year+paper+pdf" },
      { label: "SBI PO Interview Questions", url: "https://www.google.com/search?q=SBI+PO+interview+questions+asked+2024" },
    ],
    salaryBreakdown: { basic: 27620, da: 14090, hra: { metro: 8286, urban: 5524, rural: 3714 }, ta: 3600, other: 4500 },

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
    qualification: "Graduate",
    isNew: false,
    isHot: true,
    grade: "Income Tax Inspector, Auditor, ASO",
    difficulty: "Hard",
    prepTime: "8–14 months",
    applyLink: "https://ssc.gov.in/login",
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
      chooseIf: ["You want variety — 20+ departments to choose from", "You like the idea of field work (IT raids, audits, surveys)", "You want a central government post with good perks", "You are strong in Maths and English"],
      avoidIf: ["You are weak in Maths — Tier II is heavily Maths-based", "You want a single-city posting with no transfers", "You need a job quickly — SSC CGL takes 12–18 months end-to-end"],
    },
    successStory: { emoji: "👩‍💻", name: "Priya Sharma", line: "Failed 3 times. 4th attempt — Income Tax Inspector, Delhi. ₹65K/month + govt quarter." },
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
    syllabus: ["General Intelligence & Reasoning", "General Awareness", "Quantitative Aptitude", "English Comprehension", "Statistics", "General Studies (Finance & Economics)"],
    pyqLinks: [
      { label: "SSC CGL Tier-I 2024 Papers", url: "https://www.google.com/search?q=SSC+CGL+Tier+1+2024+previous+year+paper+pdf" },
      { label: "SSC CGL Tier-II 2024 Papers", url: "https://www.google.com/search?q=SSC+CGL+Tier+2+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 44900, da: 22900, hra: { metro: 13470, urban: 8980, rural: 6040 }, ta: 3600, other: 2000 },

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
    qualification: "Graduate",
    isNew: true,
    isHot: false,
    grade: "Station Master, Goods Guard, Comm. Apprentice",
    difficulty: "Moderate",
    prepTime: "6–10 months",
    applyLink: "https://www.rrbapply.gov.in/",
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
      chooseIf: ["You love the idea of a uniformed, operational role", "Free lifetime railway travel excites you", "You are okay with shift duties and remote postings", "You want the best government medical facility (RELHS)"],
      avoidIf: ["You cannot work night shifts or rotational hours", "You want to stay in a specific city", "You have vision issues — Station Master requires good eyesight"],
    },
    successStory: { emoji: "🧑‍✈️", name: "Rohit Meena", line: "Station Master, Kota. Took parents to Kerala on free railway pass — first time they saw the sea." },
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
    syllabus: ["Mathematics", "General Intelligence & Reasoning", "General Awareness", "General Science"],
    pyqLinks: [
      { label: "RRB NTPC CBT-1 2024 Papers", url: "https://www.google.com/search?q=RRB+NTPC+CBT+1+previous+year+paper+pdf" },
      { label: "RRB NTPC CBT-2 Papers", url: "https://www.google.com/search?q=RRB+NTPC+CBT+2+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 29200, da: 14900, hra: { metro: 8760, urban: 5840, rural: 3930 }, ta: 3600, other: 2000 },

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
    qualification: "Graduate",
    isNew: false,
    isHot: true,
    grade: "IAS, IPS, IFS — All India Services",
    difficulty: "Very Hard",
    prepTime: "1–3 years",
    applyLink: "https://upsconline.nic.in/mainmenu2",
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
      chooseIf: ["You want to create real change at a district/national level", "You can commit 1–3 years of focused preparation", "You are motivated by power, prestige, and public service", "You have strong reading habits and analytical thinking"],
      avoidIf: ["You need income within 1–2 years", "You cannot handle repeated failure and uncertainty", "You want a predictable 9-to-5 lifestyle"],
    },
    successStory: { emoji: "👩‍💼", name: "Tina Dabi", line: "AIR 1, UPSC 2015. 8 hours daily, 2 years. NCERTs + consistency. Nothing else." },
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
    syllabus: ["Indian Heritage & Culture", "History & Geography of World", "Constitution & Polity", "Social Justice", "International Relations", "Economics", "Environment & Ecology", "Science & Technology", "Ethics & Integrity", "Essay", "Optional Subject"],
    pyqLinks: [
      { label: "UPSC Prelims 2024 GS Paper", url: "https://www.google.com/search?q=UPSC+Prelims+2024+GS+Paper+1+pdf" },
      { label: "UPSC Mains 2024 Papers", url: "https://www.google.com/search?q=UPSC+Mains+2024+question+paper+pdf" },
      { label: "UPSC Toppers Answer Copies", url: "https://www.google.com/search?q=UPSC+toppers+answer+sheet+copy+pdf" },
    ],
    salaryBreakdown: { basic: 56100, da: 28600, hra: { metro: 16830, urban: 11220, rural: 7540 }, ta: 7200, other: 15000 },

  },
  // ─── NEW JOBS ───────────────────────────────────────────────────────────
  {
    id: "ibps-clerk-2026",
    title: "IBPS Clerk 2026",
    org: "Institute of Banking Personnel Selection",
    vacancies: 6128,
    lastDate: "Jun 10, 2026",
    salary: "₹19,900 – ₹47,920",
    inHand: "₹28K – ₹35K",
    category: "banking",
    qualification: "Graduate",
    isNew: true,
    isHot: true,
    grade: "Clerical Cadre — Public Sector Banks",
    difficulty: "Moderate",
    prepTime: "4–8 months",
    applyLink: "https://www.ibps.in/",
    benefits: ["HRA", "Medical Insurance", "Pension (NPS)", "LFC", "30 Leaves/year", "Subsidized Loan", "Gratuity"],
    career: "Clerk → Single Window Operator → Officer Scale-I → Manager → Sr. Manager",
    lifestyle: "Regular bank hours 10 AM–5 PM. Clerical work at branch. Mostly city postings. After 3 years you can appear for internal promotion to Officer. Good entry-level salary with free medical.",
    eligibility: "Graduation in any discipline. Age 20–28 years. Relaxation for reserved categories.",
    exam: "Prelims (MCQ) → Mains (MCQ) → Language Proficiency Test",
    dayInLife: "9:45 AM — Arrive at branch\n10:00 AM — Branch opens, counter work\n11:00 AM — Process deposits/withdrawals\n1:00 PM — Lunch\n1:30 PM — Account openings, KYC\n3:00 PM — End of counter hours\n5:00 PM — Balancing, close",
    whyChoose: [
      "Easiest entry into banking — moderate difficulty",
      "11 public sector banks to choose from based on rank",
      "Promotion to Officer is guaranteed after 3 years",
      "City postings in most cases",
    ],
    challenges: "Starting salary is lower than PO. Clerical work can feel repetitive. Customer queues during peak hours. Slower promotion path.",
    realityCheck: "The salary is modest initially but grows fast. Many Bank Managers today started as Clerks. Internal promotion exams give you a clear path up. Think of it as your entry ticket.",
    impact: "You are the first face people see at the bank. For rural branches, you help farmers open their first bank account, pensioners collect their money, and small shopkeepers get credit.",
    fitGuide: {
      chooseIf: ["You want a stable bank job with lower competition", "You are okay starting at clerical level with a promotion path", "You want mostly city-based postings", "You prefer a structured 10–5 routine"],
      avoidIf: ["You want a high starting salary from day one", "You find repetitive counter work frustrating", "You want immediate officer-level authority"],
    },
    successStory: { emoji: "👩‍🏫", name: "Sneha Gupta", line: "Commerce graduate from Lucknow. Cleared IBPS Clerk first attempt. Now preparing for internal PO promotion." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Any graduate, 20–28 years", duration: "1 day" },
      { icon: "📝", title: "Apply on IBPS Portal", detail: "Online registration, ₹175 fee", duration: "30 min" },
      { icon: "💻", title: "Prelims", detail: "Reasoning + English + Quant — 1 hour", duration: "2–3 months prep" },
      { icon: "📖", title: "Mains", detail: "Detailed MCQ — rank deciding", duration: "2 months prep" },
      { icon: "🗣️", title: "Language Test", detail: "Local language proficiency check", duration: "1 week" },
      { icon: "🏦", title: "Join Bank", detail: "Allotted to one of 11 PSBs", duration: "1 month" },
      { icon: "📈", title: "Promote to Officer", detail: "Internal exam after 3 years", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Clerk", salary: "₹28,000/month", years: "Year 0–3" },
      { title: "Single Window Operator", salary: "₹35,000/month", years: "Year 3–6" },
      { title: "Officer Scale-I", salary: "₹52,000/month", years: "Year 6–10" },
      { title: "Manager", salary: "₹75,000/month", years: "Year 10–18" },
      { title: "Senior Manager", salary: "₹1,00,000+/month", years: "Year 18+" },
    ],
    syllabus: ["English Language", "Numerical Ability", "Reasoning Ability", "General/Financial Awareness", "Computer Aptitude"],
    pyqLinks: [
      { label: "IBPS Clerk Prelims 2024", url: "https://www.google.com/search?q=IBPS+Clerk+Prelims+2024+previous+year+paper+pdf" },
      { label: "IBPS Clerk Mains 2024", url: "https://www.google.com/search?q=IBPS+Clerk+Mains+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 19900, da: 10150, hra: { metro: 5970, urban: 3980, rural: 2686 }, ta: 3600, other: 2000 },

  },
  {
    id: "rbi-grade-b-2026",
    title: "RBI Grade B Officer",
    org: "Reserve Bank of India",
    vacancies: 294,
    lastDate: "Jul 5, 2026",
    salary: "₹55,200 – ₹76,520",
    inHand: "₹1,05K – ₹1,20K",
    category: "banking",
    qualification: "Graduate",
    isNew: true,
    isHot: true,
    grade: "Grade B — Manager in RBI",
    difficulty: "Very Hard",
    prepTime: "10–16 months",
    applyLink: "https://opportunities.rbi.org.in/",
    benefits: ["RBI Township Housing", "Full Medical + Family", "Pension", "LTC", "Vehicle Loan at 0%", "Education Allow.", "Security"],
    career: "Grade B → Grade C (AGM) → Grade D (DGM) → Grade E (GM) → ED → Deputy Governor",
    lifestyle: "RBI is the most prestigious financial institution. You get township housing in metro cities. 5-day week. No rural postings. World-class office infrastructure. International exposure with IMF, World Bank.",
    eligibility: "Graduation with 60% marks. Age 21–30 years. Preference for Economics/Finance backgrounds.",
    exam: "Phase I (MCQ) → Phase II (Descriptive) → Interview",
    dayInLife: "9:30 AM — Arrive at RBI office\n10:00 AM — Policy research and data analysis\n11:30 AM — Department meeting\n1:00 PM — Lunch at RBI canteen\n2:00 PM — Draft policy notes\n3:30 PM — Review financial data\n5:30 PM — Leave office",
    whyChoose: [
      "Highest in-hand salary among all government bank jobs",
      "Metro city postings only — Mumbai, Delhi, Chennai, Kolkata",
      "You shape India's monetary policy — genuine intellectual work",
      "International exposure — IMF, World Bank deputation opportunities",
    ],
    challenges: "Very competitive — only 300 seats. Requires strong economics/finance knowledge. Phase II descriptive paper is genuinely hard. Limited vacancies mean high cutoffs.",
    realityCheck: "This is the IAS of banking. The exam is hard but the reward is exceptional. If you have an economics background, this should be your top target.",
    impact: "You literally control India's money supply. RBI Grade B officers design monetary policy, regulate banks, manage foreign exchange. Your decisions affect 140 crore people's financial lives.",
    fitGuide: {
      chooseIf: ["You have strong economics/finance knowledge", "You want the highest salary among banking exams", "You want metro city postings and intellectual work", "You aspire to work at IMF/World Bank level"],
      avoidIf: ["You are weak in economics and finance", "You want a quick, easy government job", "You prefer operational/field roles over desk work"],
    },
    successStory: { emoji: "🏦", name: "Aniket Deshmukh", line: "CA dropout. Self-study for 14 months. RBI Grade B in first attempt. In-hand ₹1.1L/month at 25." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Graduate with 60%+, Age 21–30", duration: "1 day" },
      { icon: "📝", title: "Apply on RBI Portal", detail: "Online, ₹850 fee", duration: "30 min" },
      { icon: "💻", title: "Phase I", detail: "MCQ — Economic/Social Issues, English, Quant, Reasoning", duration: "4–5 months prep" },
      { icon: "✍️", title: "Phase II", detail: "Descriptive — Economics, Finance, Management papers", duration: "3–4 months prep" },
      { icon: "🎯", title: "Interview", detail: "Panel interview on current affairs and economics", duration: "1 month prep" },
      { icon: "🏛️", title: "Join RBI", detail: "Training at CAB, Pune", duration: "3 months" },
      { icon: "📈", title: "Career Growth", detail: "Manager → GM → ED → Deputy Governor", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Grade B (Manager)", salary: "₹1,05,000/month", years: "Year 0–5" },
      { title: "Grade C (AGM)", salary: "₹1,30,000/month", years: "Year 5–10" },
      { title: "Grade D (DGM)", salary: "₹1,60,000/month", years: "Year 10–16" },
      { title: "Grade E (GM)", salary: "₹2,00,000/month", years: "Year 16–22" },
      { title: "ED / Deputy Governor", salary: "₹2,50,000+/month", years: "Year 22+" },
    ],
    syllabus: ["Economic & Social Issues", "English Language", "Quantitative Aptitude", "Reasoning", "Finance & Management", "Economics Paper"],
    pyqLinks: [
      { label: "RBI Grade B Phase-I 2024", url: "https://www.google.com/search?q=RBI+Grade+B+Phase+1+2024+previous+year+paper+pdf" },
      { label: "RBI Grade B Phase-II 2024", url: "https://www.google.com/search?q=RBI+Grade+B+Phase+2+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 55200, da: 28150, hra: { metro: 16560, urban: 11040, rural: 7430 }, ta: 3600, other: 8000 },

  },
  {
    id: "lic-aao-2026",
    title: "LIC AAO (Asst. Admin Officer)",
    org: "Life Insurance Corporation of India",
    vacancies: 750,
    lastDate: "Jun 25, 2026",
    salary: "₹33,000 – ₹55,000",
    inHand: "₹48K – ₹55K",
    category: "banking",
    qualification: "Graduate",
    isNew: true,
    isHot: false,
    grade: "Assistant Administrative Officer",
    difficulty: "Hard",
    prepTime: "6–10 months",
    applyLink: "https://licindia.in/Bottom-Links/Careers",
    benefits: ["HRA", "Pension", "Full Medical", "LTC", "Gratuity", "PF", "Bonus", "5-Day Week"],
    career: "AAO → AO → Dy. Manager → Manager → Sr. Manager → Zonal Manager",
    lifestyle: "LIC offers a comfortable 5-day work week. Good HRA in all cities. Medical covers entire family. Very low work pressure compared to banks. Strong work-life balance.",
    eligibility: "Graduation in any discipline with 60% marks. Age 21–30 years.",
    exam: "Prelims (Online MCQ) → Mains (Online) → Interview",
    dayInLife: "10:00 AM — Arrive at divisional office\n10:30 AM — Review policy applications\n12:00 PM — Agent coordination\n1:00 PM — Lunch\n2:00 PM — Claims processing\n3:30 PM — Reports and documentation\n5:30 PM — Leave for home",
    whyChoose: [
      "5-day work week — best work-life balance in government",
      "Lower competition compared to banking exams",
      "Strong pension and retirement benefits",
      "LIC brand carries immense trust across India",
    ],
    challenges: "Starting salary is slightly lower than SBI PO. Growth can be slow. Divisional office postings can feel routine. Agent management can be stressful.",
    realityCheck: "LIC AAO is the hidden gem. Lower competition, excellent perks, and the best work-life balance. The 5-day week alone makes it worth it.",
    impact: "You protect families financially. Every policy you process ensures that someone's family is covered in the worst times. LIC pays claims worth ₹1 lakh crore annually — you're part of that safety net.",
    fitGuide: {
      chooseIf: ["You prioritize work-life balance above everything", "You want 5-day work week with weekends off", "You prefer a lower-stress administrative role", "You value pension and long-term security"],
      avoidIf: ["You want the highest starting salary", "You want fast promotions and dynamic work", "You prefer field work over office administration"],
    },
    successStory: { emoji: "👩‍💻", name: "Kavita Yadav", line: "B.Sc graduate, no coaching. YouTube + free PDFs. LIC AAO in first attempt. 5-day week, life sorted." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Graduate with 60%+, Age 21–30", duration: "1 day" },
      { icon: "📝", title: "Apply on LIC Portal", detail: "Online registration", duration: "30 min" },
      { icon: "💻", title: "Prelims", detail: "Reasoning, English, Quant, GK — online MCQ", duration: "3 months prep" },
      { icon: "📖", title: "Mains", detail: "Detailed online exam — rank deciding", duration: "2–3 months prep" },
      { icon: "🎯", title: "Interview", detail: "Panel interview", duration: "1 month prep" },
      { icon: "🏢", title: "Join LIC", detail: "Training at LIC Zonal Training Centre", duration: "3 months" },
      { icon: "📈", title: "Career Growth", detail: "AO → Manager → Zonal Manager", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "AAO", salary: "₹48,000/month", years: "Year 0–3" },
      { title: "AO", salary: "₹62,000/month", years: "Year 3–7" },
      { title: "Dy. Manager", salary: "₹80,000/month", years: "Year 7–12" },
      { title: "Manager", salary: "₹1,05,000/month", years: "Year 12–18" },
      { title: "Sr. Manager / ZM", salary: "₹1,40,000+/month", years: "Year 18+" },
    ],
    syllabus: ["Reasoning Ability", "Quantitative Aptitude", "English Language", "General Knowledge & Current Affairs", "Insurance & Financial Market Awareness"],
    pyqLinks: [
      { label: "LIC AAO 2024 Paper", url: "https://www.google.com/search?q=LIC+AAO+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 33000, da: 16830, hra: { metro: 9900, urban: 6600, rural: 4440 }, ta: 3600, other: 3000 },

  },
  {
    id: "nda-2026",
    title: "NDA (National Defence Academy)",
    org: "Union Public Service Commission",
    vacancies: 400,
    lastDate: "May 1, 2026",
    salary: "₹56,100 – ₹1,77,500",
    inHand: "₹65K – ₹80K (starting)",
    category: "defence",
    qualification: "12th",
    isNew: true,
    isHot: true,
    grade: "Lieutenant — Army / Navy / Air Force",
    difficulty: "Hard",
    prepTime: "6–12 months",
    applyLink: "https://upsconline.nic.in/mainmenu2",
    benefits: ["Free Accommodation", "Uniform + Rations", "CSD Canteen", "Free Medical (Military Hospital)", "Pension", "Group Insurance", "Adventure Sports"],
    career: "Lieutenant → Captain → Major → Lt. Colonel → Colonel → Brigadier → Major General",
    lifestyle: "3-year training at NDA Khadakwasla, then IMA. Life of discipline, adventure, and honor. Posted across India's most beautiful locations. Free mess, accommodation, sports facilities. Enormous respect in society.",
    eligibility: "12th pass (or appearing). Age 16.5–19.5 years. Male candidates only (for NDA). Unmarried.",
    exam: "Written Exam (Maths + GAT) → SSB Interview (5 days) → Medical",
    dayInLife: "5:30 AM — Morning PT and drill\n7:00 AM — Breakfast at mess\n8:00 AM — Academic classes\n12:30 PM — Sports hour\n1:30 PM — Lunch\n2:30 PM — Practical training\n5:00 PM — Free time / library\n10:00 PM — Lights out",
    whyChoose: [
      "Join the armed forces after 12th — earliest entry to officer rank",
      "3 years of world-class training at NDA — free education, stipend",
      "Life of adventure, discipline, and national service",
      "Enormous social respect — Officer in uniform at 21",
    ],
    challenges: "Extremely tough SSB selection — only 5-10% pass. Physical fitness is mandatory. Strict discipline and regimented life. Postings in remote/border areas. Family separation during training.",
    realityCheck: "NDA is not just an exam — it's a lifestyle choice. The training is physically and mentally intense. But those who make it through say it's the best decision of their lives.",
    impact: "You defend India's borders. Officers lead units of 30–120 soldiers in some of the toughest terrains. From Siachen to Rajasthan desert, you serve where it matters most.",
    fitGuide: {
      chooseIf: ["You are passionate about serving in the armed forces", "You are physically fit and mentally resilient", "You want officer rank right after 12th", "You thrive in discipline and adventure"],
      avoidIf: ["You cannot handle strict discipline and physical training", "You want a comfortable, city-based life", "You are above 19.5 years of age"],
    },
    successStory: { emoji: "🎖️", name: "Capt. Vikram Batra (inspiration)", line: "Yeh dil maange more! NDA shapes legends. Every batch produces heroes." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "12th pass, 16.5–19.5 years, male, unmarried", duration: "1 day" },
      { icon: "📝", title: "Apply via UPSC", detail: "Online, ₹100 fee", duration: "30 min" },
      { icon: "💻", title: "Written Exam", detail: "Maths (300) + GAT (600) — pen and paper", duration: "4–6 months prep" },
      { icon: "🎯", title: "SSB Interview", detail: "5-day selection at Service Selection Board", duration: "1–2 months prep" },
      { icon: "🏥", title: "Medical Exam", detail: "Thorough medical at Military Hospital", duration: "1 week" },
      { icon: "🏔️", title: "NDA Training", detail: "3 years at NDA Khadakwasla + 1 year IMA", duration: "4 years" },
      { icon: "⭐", title: "Commissioned Officer", detail: "Lieutenant in Army/Navy/Air Force", duration: "Career" },
    ],
    promotionPath: [
      { title: "Lieutenant", salary: "₹65,000/month", years: "Year 0–2" },
      { title: "Captain", salary: "₹80,000/month", years: "Year 2–6" },
      { title: "Major", salary: "₹1,10,000/month", years: "Year 6–13" },
      { title: "Lt. Colonel", salary: "₹1,40,000/month", years: "Year 13–18" },
      { title: "Colonel", salary: "₹1,60,000/month", years: "Year 18–24" },
      { title: "Brigadier+", salary: "₹2,00,000+/month", years: "Year 24+" },
    ],
    syllabus: ["Mathematics (Algebra, Trigonometry, Calculus, Statistics)", "General Ability (English, GK, Physics, Chemistry, Geography, History, Current Affairs)"],
    pyqLinks: [
      { label: "NDA 2024 Maths Paper", url: "https://www.google.com/search?q=NDA+2024+Mathematics+question+paper+pdf" },
      { label: "NDA 2024 GAT Paper", url: "https://www.google.com/search?q=NDA+2024+GAT+question+paper+pdf" },
      { label: "NDA SSB Interview Tips", url: "https://www.google.com/search?q=NDA+SSB+interview+preparation+tips" },
    ],
    salaryBreakdown: { basic: 56100, da: 28600, hra: { metro: 0, urban: 0, rural: 0 }, ta: 3600, other: 12000 },

  },
  {
    id: "ssc-chsl-2026",
    title: "SSC CHSL (10+2 Level)",
    org: "Staff Selection Commission",
    vacancies: 4500,
    lastDate: "May 30, 2026",
    salary: "₹19,900 – ₹63,200",
    inHand: "₹28K – ₹42K",
    category: "ssc",
    qualification: "12th",
    isNew: true,
    isHot: false,
    grade: "DEO, LDC, PA/SA, Court Clerk",
    difficulty: "Moderate",
    prepTime: "4–8 months",
    applyLink: "https://ssc.gov.in/login",
    benefits: ["DA + HRA", "Medical", "Pension", "LTC", "Education Allow.", "Canteen"],
    career: "LDC → UDC → Assistant → Section Officer → Under Secretary",
    lifestyle: "Central government office job. Fixed 9:30–5:30 hours. Government quarter or HRA. Respect of a central government employee. Stable, predictable routine.",
    eligibility: "12th pass from recognized board. Age 18–27 years.",
    exam: "Tier I (Online MCQ) → Tier II (MCQ + Skill Test) → Document Verification",
    dayInLife: "9:30 AM — Arrive at office\n10:00 AM — File work and data entry\n11:30 AM — Dispatch and record keeping\n1:00 PM — Lunch\n1:30 PM — Typing work / noting\n3:30 PM — Office correspondence\n5:30 PM — Leave",
    whyChoose: [
      "Government job after just 12th pass — no degree needed",
      "Central government — works in ministries, courts, govt offices",
      "Clear promotion path to Section Officer and beyond",
      "Moderate difficulty — realistic for most serious aspirants",
    ],
    challenges: "Starting salary is on the lower side. Work can be clerical and routine. Promotions in LDC/UDC cadre are slow. City of posting depends on department allocated.",
    realityCheck: "CHSL is the best opportunity for 12th pass candidates who want a central government job. The pay grows significantly with promotions and DA revisions.",
    impact: "The administrative backbone of India — LDCs and UDCs ensure files move, records are maintained, and government machinery runs smoothly every single day.",
    fitGuide: {
      chooseIf: ["You have completed 12th and want a government job quickly", "You are okay with clerical/office work", "You want the security of central government employment", "You plan to study further while working"],
      avoidIf: ["You want a high starting salary", "You find office/desk work boring", "You are a graduate and can target CGL instead"],
    },
    successStory: { emoji: "📝", name: "Amit Kumar", line: "12th pass from Bihar. No coaching, only phone. SSC CHSL in 2nd attempt. Now LDC in Ministry of Finance, Delhi." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "12th pass, 18–27 years", duration: "1 day" },
      { icon: "📝", title: "Apply on SSC Portal", detail: "Online, ₹100 fee (₹0 for women/SC/ST)", duration: "30 min" },
      { icon: "💻", title: "Tier I Exam", detail: "Online MCQ — GK, English, Quant, Reasoning", duration: "3–4 months prep" },
      { icon: "📖", title: "Tier II Exam", detail: "MCQ + Skill/Typing test", duration: "2 months prep" },
      { icon: "✅", title: "Document Verification", detail: "Certificate check", duration: "1 month" },
      { icon: "🏛️", title: "Join Duty", detail: "Posted to central government office", duration: "1 month" },
      { icon: "📈", title: "Career Growth", detail: "LDC → UDC → Asst → SO → Under Secretary", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "LDC / DEO", salary: "₹28,000/month", years: "Year 0–5" },
      { title: "UDC", salary: "₹35,000/month", years: "Year 5–10" },
      { title: "Assistant", salary: "₹50,000/month", years: "Year 10–18" },
      { title: "Section Officer", salary: "₹72,000/month", years: "Year 18–25" },
      { title: "Under Secretary", salary: "₹1,00,000+/month", years: "Year 25+" },
    ],
    syllabus: ["General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
    pyqLinks: [
      { label: "SSC CHSL 2024 Papers", url: "https://www.google.com/search?q=SSC+CHSL+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 19900, da: 10150, hra: { metro: 5970, urban: 3980, rural: 2686 }, ta: 3600, other: 1500 },

  },
  {
    id: "uppsc-2026",
    title: "UPPSC PCS 2026",
    org: "UP Public Service Commission",
    vacancies: 630,
    lastDate: "Jun 15, 2026",
    salary: "₹44,900 – ₹1,42,400",
    inHand: "₹60K – ₹85K",
    category: "state",
    qualification: "Graduate",
    isNew: true,
    isHot: false,
    grade: "SDM, DSP, BDO, Naib Tehsildar",
    difficulty: "Very Hard",
    prepTime: "12–24 months",
    applyLink: "https://uppsc.up.nic.in/CandidatePages/OTRRegistration/Registration.aspx",
    benefits: ["Govt Bungalow", "Vehicle", "DA + HRA", "Full Medical", "Pension", "Security (DSP)"],
    career: "SDM → ADM → DM (via IAS) | DSP → SP → IG (via IPS track)",
    lifestyle: "As SDM you head a sub-division. Government bungalow, vehicle, respect. As DSP you manage law & order. Posted across UP — the most politically important state. Enormous power and influence.",
    eligibility: "Graduation from any recognized university. Age 21–40 years. UP domicile required.",
    exam: "Prelims → Mains (8 papers) → Interview",
    dayInLife: "8:00 AM — Office opens, review applications\n9:30 AM — Revenue court proceedings\n11:00 AM — Field visits — villages, tehsils\n1:00 PM — Lunch\n2:00 PM — Meet public, resolve disputes\n4:00 PM — Administrative work\n6:00 PM — Return to bungalow",
    whyChoose: [
      "Rule a sub-division — immense local power and respect",
      "UP PCS officers often get IAS through promotion",
      "Government bungalow, vehicle, domestic help",
      "Higher age limit (40 years) than UPSC",
    ],
    challenges: "Competition is intense in UP. Hindi medium preparation needed for some. Political interference can be challenging. Remote tehsil postings initially.",
    realityCheck: "UP PCS is a parallel path to the IAS dream. Many PCS officers eventually get IAS through promotion. The power and respect at sub-divisional level is enormous.",
    impact: "You govern at the grassroots. Revenue collection, land disputes, disaster relief, election management — everything passes through the SDM's desk. You are the government for 5–10 lakh people.",
    fitGuide: {
      chooseIf: ["You want administrative power at the local level", "You are from UP and want to serve your state", "You want an alternative path to eventually get IAS", "You are comfortable working in Hindi"],
      avoidIf: ["You don't want to be limited to UP postings", "You are uncomfortable with political dynamics", "You want to avoid remote rural postings"],
    },
    successStory: { emoji: "🏛️", name: "Anurag Yadav", line: "Village school, Hindi medium. 3 years of self-study. UPPSC SDM at 27. Family's first government officer." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Graduate, 21–40 years, UP domicile", duration: "1 day" },
      { icon: "📝", title: "Apply on UPPSC Portal", detail: "Online registration", duration: "30 min" },
      { icon: "📖", title: "Prelims", detail: "2 papers — GS and CSAT", duration: "6–8 months prep" },
      { icon: "✍️", title: "Mains", detail: "8 descriptive papers", duration: "4–6 months prep" },
      { icon: "🎯", title: "Interview", detail: "Personality test by UPPSC board", duration: "1 month prep" },
      { icon: "🏛️", title: "Training", detail: "PAC/PTC training for 1 year", duration: "1 year" },
      { icon: "📈", title: "Career Growth", detail: "SDM → ADM → DM (via promotion)", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "SDM / Naib Tehsildar", salary: "₹60,000/month", years: "Year 0–5" },
      { title: "ADM / City Magistrate", salary: "₹85,000/month", years: "Year 5–12" },
      { title: "Joint Commissioner", salary: "₹1,10,000/month", years: "Year 12–20" },
      { title: "Div. Commissioner (IAS)", salary: "₹1,50,000/month", years: "Year 20–28" },
      { title: "Secy Level (IAS)", salary: "₹2,00,000+/month", years: "Year 28+" },
    ],
    syllabus: ["General Studies Paper I & II (CSAT)", "Hindi", "Essay", "General Studies I-IV (Mains)", "Optional Subject"],
    pyqLinks: [
      { label: "UPPSC Prelims 2024 Papers", url: "https://www.google.com/search?q=UPPSC+PCS+Prelims+2024+question+paper+pdf" },
      { label: "UPPSC Mains Papers", url: "https://www.google.com/search?q=UPPSC+PCS+Mains+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 44900, da: 22900, hra: { metro: 13470, urban: 8980, rural: 6040 }, ta: 3600, other: 5000 },

  },
  {
    id: "delhi-police-2026",
    title: "Delhi Police Constable",
    org: "Staff Selection Commission",
    vacancies: 6433,
    lastDate: "Jun 30, 2026",
    salary: "₹21,700 – ₹69,100",
    inHand: "₹32K – ₹40K",
    category: "defence",
    qualification: "12th",
    isNew: true,
    isHot: true,
    grade: "Constable (Executive) — Delhi Police",
    difficulty: "Moderate",
    prepTime: "4–8 months",
    applyLink: "https://ssc.gov.in/login",
    benefits: ["Delhi Posting Only", "Uniform + Rations Allowance", "Medical", "Pension", "Quarter/HRA", "Risk Allowance"],
    career: "Constable → Head Constable → ASI → SI → Inspector → SHO",
    lifestyle: "Posted in Delhi only — the biggest advantage. 3-shift duty rotation. Police quarters available. After 5 years, eligible for Head Constable promotion. Medical and pension benefits.",
    eligibility: "12th pass. Age 18–25 years. Physical: Height 170cm (M), 157cm (F). Running, long jump tests.",
    exam: "Written Exam (MCQ) → Physical Endurance Test → Medical",
    dayInLife: "Shift-based (8 hours):\n6:00 AM — Report at police station/beat\n7:00 AM — Patrol duty in assigned area\n10:00 AM — Return, file reports\n12:00 PM — Break\n1:00 PM — Investigation assistance\n2:00 PM — Shift ends (or extended if needed)",
    whyChoose: [
      "Delhi-only posting — no transfers outside the capital",
      "Government job after 12th with decent salary",
      "Path to becoming SHO (Station House Officer)",
      "6,400+ vacancies — high chances of selection",
    ],
    challenges: "Shift duty including nights. Physical test is elimination-based. Law and order situations can be stressful. Initial years involve beat patrol and manual work.",
    realityCheck: "Delhi Police is one of the most sought-after constable posts because of the Delhi-only posting guarantee. Physical fitness is mandatory — start training early.",
    impact: "You protect the national capital. From managing VIP security to solving street crimes, from traffic management to festival duty — Delhi Police keeps 2 crore people safe.",
    fitGuide: {
      chooseIf: ["You want a government job in Delhi specifically", "You are physically fit and enjoy active work", "You have only 12th qualification but want government security", "You aspire to eventually become an Inspector"],
      avoidIf: ["You cannot pass the physical fitness test", "You dislike shift work and irregular hours", "You want an office-based desk job"],
    },
    successStory: { emoji: "👮", name: "Deepak Nagar", line: "12th pass from Haryana. 3 months of running practice. Delhi Police Constable at 20. Now preparing for SI exam." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "12th pass, 18–25 years, physically fit", duration: "1 day" },
      { icon: "📝", title: "Apply via SSC", detail: "Online on SSC portal", duration: "30 min" },
      { icon: "💻", title: "Written Exam", detail: "MCQ — GK, Reasoning, Maths, English/Hindi", duration: "3–4 months prep" },
      { icon: "🏃", title: "Physical Test", detail: "1.6 km run, long jump, high jump", duration: "2–3 months training" },
      { icon: "🏥", title: "Medical Exam", detail: "Eyes, chest, height, weight check", duration: "1 week" },
      { icon: "👮", title: "Training", detail: "9 months at Delhi Police Training College", duration: "9 months" },
      { icon: "📈", title: "Career Growth", detail: "HC → ASI → SI → Inspector → SHO", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Constable", salary: "₹32,000/month", years: "Year 0–5" },
      { title: "Head Constable", salary: "₹38,000/month", years: "Year 5–10" },
      { title: "ASI", salary: "₹48,000/month", years: "Year 10–16" },
      { title: "Sub Inspector", salary: "₹60,000/month", years: "Year 16–22" },
      { title: "Inspector / SHO", salary: "₹80,000+/month", years: "Year 22+" },
    ],
    syllabus: ["General Knowledge / Current Affairs", "Reasoning", "Numerical Ability", "English / Hindi Comprehension"],
    pyqLinks: [
      { label: "Delhi Police Constable 2024 Papers", url: "https://www.google.com/search?q=Delhi+Police+Constable+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 21700, da: 11070, hra: { metro: 6510, urban: 4340, rural: 2930 }, ta: 3600, other: 4000 },

  },
  {
    id: "rrb-group-d-2026",
    title: "RRB Group D (Track Maintainer)",
    org: "Railway Recruitment Board",
    vacancies: 32000,
    lastDate: "Jul 15, 2026",
    salary: "₹18,000 – ₹56,900",
    inHand: "₹22K – ₹28K",
    category: "railway",
    qualification: "10th",
    isNew: true,
    isHot: true,
    grade: "Track Maintainer, Helper, Pointsman",
    difficulty: "Moderate",
    prepTime: "3–6 months",
    applyLink: "https://www.rrbapply.gov.in/",
    benefits: ["FREE Railway Pass — Lifetime", "Railway Quarter", "RELHS Medical", "Pension", "Ration Money", "Education Allow."],
    career: "Trackman → Gangmate → PWI → Sr. PWI → IOW → DEN",
    lifestyle: "Same lifetime free railway travel as all railway employees. Railway colony housing. RELHS medical for entire family. Government pension. The perks are identical to senior railway officers.",
    eligibility: "10th pass (matriculation). Age 18–33 years. Physical fitness test.",
    exam: "CBT (Computer Based Test) → Physical Efficiency Test → Medical",
    dayInLife: "6:00 AM — Report at railway section\n6:30 AM — Track inspection walk\n9:00 AM — Maintenance and repair work\n12:00 PM — Lunch break\n1:00 PM — Continue section work\n3:00 PM — Report filing\n4:00 PM — Shift ends",
    whyChoose: [
      "Government job with just 10th pass — no degree needed",
      "32,000 vacancies — highest number among all railway exams",
      "Same free railway travel perks as senior officers",
      "Clear promotion path — many reach Senior Section Engineer level",
    ],
    challenges: "Physical outdoor work in all weather. Initial salary is modest. Track-side work requires alertness. Rural postings common initially.",
    realityCheck: "Group D is physical work, but the perks are identical to what senior officers get. Free railway travel alone saves ₹2-3 lakh per year for a family. The pension secures your retirement.",
    impact: "You maintain India's railway tracks — the lifeline of 2.3 crore daily passengers. Every safe journey depends on track maintainers checking rails, sleepers, and signals daily.",
    fitGuide: {
      chooseIf: ["You have 10th pass and want a government job immediately", "You don't mind physical outdoor work", "Free railway travel for family excites you", "You want government pension and RELHS medical"],
      avoidIf: ["You want air-conditioned office work", "You cannot do physical labor in heat/rain", "You have a degree and can target higher posts"],
    },
    successStory: { emoji: "🔧", name: "Raju Paswan", line: "10th pass from Jharkhand. Single phone, village library. Group D selected among 32,000. Mother travels free now." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "10th pass, 18–33 years, fit", duration: "1 day" },
      { icon: "📝", title: "Apply on RRB Portal", detail: "Online, ₹250 fee", duration: "30 min" },
      { icon: "💻", title: "CBT Exam", detail: "Maths, GI, GS, Reasoning — online", duration: "3–4 months prep" },
      { icon: "🏃", title: "Physical Test", detail: "Running, weight lifting tests", duration: "1–2 months training" },
      { icon: "🏥", title: "Medical", detail: "Vision, fitness check", duration: "1 week" },
      { icon: "🚂", title: "Join Railways", detail: "Training at zonal centre", duration: "3 months" },
      { icon: "📈", title: "Career Growth", detail: "Gangmate → PWI → IOW → DEN", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Track Maintainer", salary: "₹22,000/month", years: "Year 0–5" },
      { title: "Gangmate", salary: "₹28,000/month", years: "Year 5–10" },
      { title: "PWI", salary: "₹40,000/month", years: "Year 10–18" },
      { title: "Sr. PWI", salary: "₹55,000/month", years: "Year 18–25" },
      { title: "IOW / DEN", salary: "₹75,000+/month", years: "Year 25+" },
    ],
    syllabus: ["Mathematics", "General Intelligence & Reasoning", "General Science", "General Awareness & Current Affairs"],
    pyqLinks: [
      { label: "RRB Group D 2024 Papers", url: "https://www.google.com/search?q=RRB+Group+D+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 18000, da: 9180, hra: { metro: 5400, urban: 3600, rural: 2430 }, ta: 3600, other: 1500 },

  },
  {
    id: "ibps-po-2026",
    title: "IBPS PO 2026",
    org: "Institute of Banking Personnel Selection",
    vacancies: 3400,
    lastDate: "Aug 10, 2026",
    salary: "₹36,000 – ₹63,840",
    inHand: "₹46K – ₹52K",
    category: "banking",
    qualification: "Graduate",
    isNew: false,
    isHot: true,
    grade: "Probationary Officer — 11 Public Sector Banks",
    difficulty: "Hard",
    prepTime: "6–10 months",
    applyLink: "https://www.ibps.in/",
    benefits: ["HRA", "Medical Insurance", "Pension (NPS)", "LFC", "Leased Housing", "30 Leaves", "Subsidized Loans"],
    career: "PO → Manager → Senior Manager → Chief Manager → AGM → DGM",
    lifestyle: "Same as SBI PO but across 11 public sector banks. You choose your bank preference. HRA or leased accommodation. Medical covers entire family. Fixed banking hours.",
    eligibility: "Graduation in any discipline. Age 20–30 years.",
    exam: "Prelims → Mains → Interview",
    dayInLife: "9:45 AM — Arrive at branch\n10:00 AM — Operations review\n11:00 AM — Loan processing\n1:00 PM — Lunch\n1:30 PM — Customer meetings\n3:30 PM — Cash management\n5:00 PM — Branch closing\n5:30 PM — Home",
    whyChoose: [
      "11 banks to choose from — pick your preference",
      "Nearly identical perks to SBI PO",
      "Easier than SBI PO — slightly lower cutoffs",
      "Leased housing and family medical cover",
    ],
    challenges: "Transfers across India. Bank may not be your first preference. Rural postings in initial years. Month-end and year-end are hectic.",
    realityCheck: "IBPS PO is the practical alternative to SBI PO. The perks are nearly identical. Many IBPS PO officers later switch to SBI through lateral entry.",
    impact: "You bring banking to every corner of India. From opening Jan Dhan accounts to processing MUDRA loans for small businesses, you are the bridge between government schemes and citizens.",
    fitGuide: {
      chooseIf: ["You want a bank PO job with slightly lower competition than SBI", "You are flexible about which public sector bank you join", "You want the standard banking career path", "You prefer having 11 bank options to increase selection chances"],
      avoidIf: ["You specifically want only SBI — then prepare for SBI PO separately", "You are not okay with potential rural postings", "You want to avoid the banking sector entirely"],
    },
    successStory: { emoji: "🏦", name: "Manish Tiwari", line: "Failed SBI PO twice. Same preparation, cleared IBPS PO in PNB. Now Manager in 5 years." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Graduate, 20–30 years", duration: "1 day" },
      { icon: "📝", title: "Apply on IBPS Portal", detail: "Online, ₹850 fee", duration: "30 min" },
      { icon: "💻", title: "Prelims", detail: "Reasoning + Quant + English — 1 hour", duration: "3 months prep" },
      { icon: "📖", title: "Mains", detail: "Detailed exam — rank deciding", duration: "2–3 months prep" },
      { icon: "🎯", title: "Interview", detail: "Panel interview by bank recruiters", duration: "1 month prep" },
      { icon: "🏦", title: "Join Bank", detail: "Allotted to one of 11 PSBs", duration: "1 month" },
      { icon: "📈", title: "Career Growth", detail: "Manager → Chief Manager → DGM", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Probationary Officer", salary: "₹46,000/month", years: "Year 0–2" },
      { title: "Officer", salary: "₹56,000/month", years: "Year 2–5" },
      { title: "Manager", salary: "₹78,000/month", years: "Year 5–10" },
      { title: "Senior Manager", salary: "₹1,00,000/month", years: "Year 10–15" },
      { title: "Chief Manager", salary: "₹1,30,000+/month", years: "Year 15+" },
    ],
    syllabus: ["English Language", "Quantitative Aptitude", "Reasoning Ability", "General/Financial Awareness", "Computer Aptitude", "Descriptive English"],
    pyqLinks: [
      { label: "IBPS PO Prelims 2024", url: "https://www.google.com/search?q=IBPS+PO+Prelims+2024+previous+year+paper+pdf" },
      { label: "IBPS PO Mains 2024", url: "https://www.google.com/search?q=IBPS+PO+Mains+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 36000, da: 18360, hra: { metro: 10800, urban: 7200, rural: 4860 }, ta: 3600, other: 3000 },

  },
  {
    id: "ssc-mts-2026",
    title: "SSC MTS (Multi-Tasking Staff)",
    org: "Staff Selection Commission",
    vacancies: 8326,
    lastDate: "Jul 20, 2026",
    salary: "₹18,000 – ₹56,900",
    inHand: "₹22K – ₹28K",
    category: "ssc",
    qualification: "10th",
    isNew: true,
    isHot: false,
    grade: "Peon, Watchman, Gardener, Safaiwala in Central Govt",
    difficulty: "Moderate",
    prepTime: "3–6 months",
    applyLink: "https://ssc.gov.in/login",
    benefits: ["DA + HRA", "Medical", "Pension", "LTC", "Govt Quarter (Type I)", "Canteen"],
    career: "MTS → Clerk → UDC → Assistant",
    lifestyle: "Central government posting in ministries, offices. Fixed hours. Government quarter. Medical and pension. Minimal pressure. Many MTS staff study alongside and clear higher exams.",
    eligibility: "10th pass from recognized board. Age 18–25 years.",
    exam: "Paper I (MCQ online) → Paper II (Descriptive) → Document Verification",
    dayInLife: "9:30 AM — Report at office\n10:00 AM — Dispatch duty, file management\n11:00 AM — Office support tasks\n1:00 PM — Lunch\n2:00 PM — Photocopying, record-keeping\n4:00 PM — General office work\n5:30 PM — Leave",
    whyChoose: [
      "Central government job with just 10th pass",
      "8,300+ vacancies — good selection chances",
      "Can prepare for higher exams while working",
      "Government pension, medical, quarter — full package",
    ],
    challenges: "Very basic nature of work. Low starting salary. Limited intellectual challenge. Promotion is slow without clearing higher exams.",
    realityCheck: "MTS is your entry ticket into the government. Many IAS officers started as MTS and climbed up. The security and pension make it worthwhile while you aim higher.",
    impact: "The unsung heroes of government — MTS staff keep ministries running. File management, dispatch, and office support are essential for every government decision.",
    fitGuide: {
      chooseIf: ["You have only 10th pass and need government job security", "You plan to study further and clear higher exams while working", "You want a stress-free government job", "You value pension and medical benefits"],
      avoidIf: ["You find basic support work demeaning", "You want a challenging, intellectual job from day one", "You have higher qualifications and can target better posts"],
    },
    successStory: { emoji: "📂", name: "Sunil Sharma", line: "10th pass from MP. SSC MTS in first attempt. Now preparing for SSC CGL while working in Ministry of Home Affairs." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "10th pass, 18–25 years", duration: "1 day" },
      { icon: "📝", title: "Apply on SSC Portal", detail: "Online, ₹100 (₹0 for women/SC/ST)", duration: "30 min" },
      { icon: "💻", title: "Paper I", detail: "MCQ — GK, English, Maths, Reasoning", duration: "3 months prep" },
      { icon: "✍️", title: "Paper II", detail: "Short essay/letter writing", duration: "1 month prep" },
      { icon: "✅", title: "Document Check", detail: "Certificate verification", duration: "1 month" },
      { icon: "🏛️", title: "Join Duty", detail: "Posted to central government office", duration: "1 month" },
      { icon: "📈", title: "Career Growth", detail: "MTS → Clerk → UDC → Assistant", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "MTS", salary: "₹22,000/month", years: "Year 0–5" },
      { title: "Clerk (via LDCE)", salary: "₹30,000/month", years: "Year 5–10" },
      { title: "UDC", salary: "₹38,000/month", years: "Year 10–18" },
      { title: "Assistant", salary: "₹50,000+/month", years: "Year 18+" },
    ],
    syllabus: ["General English", "General Intelligence & Reasoning", "Numerical Aptitude", "General Awareness"],
    pyqLinks: [
      { label: "SSC MTS 2024 Papers", url: "https://www.google.com/search?q=SSC+MTS+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 18000, da: 9180, hra: { metro: 5400, urban: 3600, rural: 2430 }, ta: 3600, other: 1000 },

  },
  {
    id: "cds-2026",
    title: "CDS (Combined Defence Services)",
    org: "Union Public Service Commission",
    vacancies: 459,
    lastDate: "May 10, 2026",
    salary: "₹56,100 – ₹1,77,500",
    inHand: "₹65K – ₹80K (starting)",
    category: "defence",
    qualification: "Graduate",
    isNew: false,
    isHot: false,
    grade: "Lieutenant — Army / Navy / Air Force",
    difficulty: "Hard",
    prepTime: "6–10 months",
    applyLink: "https://upsconline.nic.in/mainmenu2",
    benefits: ["Free Accommodation", "Uniform + Rations", "CSD Canteen", "Military Hospital", "Pension", "Group Insurance"],
    career: "Lieutenant → Captain → Major → Lt. Colonel → Colonel → Brigadier",
    lifestyle: "Same as NDA but entry after graduation. Training at IMA Dehradun (Army), INA Ezhimala (Navy), AFA Dundigal (Air Force). Life of discipline, adventure, honor, and service.",
    eligibility: "Graduation for IMA, Engineering for OTA/Navy, B.Sc Physics for Air Force. Age 19.5–25 years. Unmarried males.",
    exam: "Written Exam (English + GK + Maths) → SSB Interview (5 days) → Medical",
    dayInLife: "Same as NDA — military routine with training, drills, academics, sports, and discipline.",
    whyChoose: [
      "Become an Army/Navy/Air Force officer after graduation",
      "Prestigious career with life-long respect and honor",
      "Adventure, travel, and a purpose-driven life",
      "Excellent salary + free accommodation + pension",
    ],
    challenges: "SSB interview is extremely selective. Physical fitness mandatory. Separation from family during training and postings. Tough terrain postings.",
    realityCheck: "CDS is the graduate entry into the armed forces. The SSB is tough but if you have Officer-Like Qualities, nothing can stop you.",
    impact: "You defend India at its borders. From Kashmir to Kanyakumari, officers lead men in the toughest conditions to keep 140 crore Indians safe.",
    fitGuide: {
      chooseIf: ["You are a graduate who wants to join the armed forces", "You are physically fit and mentally resilient", "You want a life of adventure and national service", "You are under 25 and unmarried"],
      avoidIf: ["You want a comfortable city-based life", "You cannot handle strict discipline", "You are above 25 years or married"],
    },
    successStory: { emoji: "⭐", name: "Lt. Avinash Singh", line: "Arts graduate. Failed CDS twice. 3rd attempt — selected. Now posted at Rajouri, J&K. Serving with pride." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "Graduate, 19.5–25 years, unmarried male", duration: "1 day" },
      { icon: "📝", title: "Apply via UPSC", detail: "Online, ₹200 fee", duration: "30 min" },
      { icon: "💻", title: "Written Exam", detail: "English + GK + Maths", duration: "3–4 months prep" },
      { icon: "🎯", title: "SSB Interview", detail: "5-day selection board", duration: "1–2 months prep" },
      { icon: "🏥", title: "Medical", detail: "Thorough military medical", duration: "1 week" },
      { icon: "🏔️", title: "Training", detail: "IMA/INA/AFA — 18 months to 2 years", duration: "1.5–2 years" },
      { icon: "⭐", title: "Commissioned", detail: "Lieutenant in Army/Navy/Air Force", duration: "Career" },
    ],
    promotionPath: [
      { title: "Lieutenant", salary: "₹65,000/month", years: "Year 0–2" },
      { title: "Captain", salary: "₹80,000/month", years: "Year 2–6" },
      { title: "Major", salary: "₹1,10,000/month", years: "Year 6–13" },
      { title: "Lt. Colonel", salary: "₹1,40,000/month", years: "Year 13–18" },
      { title: "Colonel+", salary: "₹1,60,000+/month", years: "Year 18+" },
    ],
    syllabus: ["English", "General Knowledge", "Elementary Mathematics", "Intelligence & Personality (SSB)"],
    pyqLinks: [
      { label: "CDS 2024 Papers", url: "https://www.google.com/search?q=CDS+2024+question+paper+pdf" },
      { label: "CDS SSB Interview Guide", url: "https://www.google.com/search?q=CDS+SSB+interview+preparation+guide" },
    ],
    salaryBreakdown: { basic: 56100, da: 28600, hra: { metro: 0, urban: 0, rural: 0 }, ta: 3600, other: 12000 },

  },
  {
    id: "rrb-alp-2026",
    title: "RRB ALP (Asst Loco Pilot)",
    org: "Railway Recruitment Board",
    vacancies: 5696,
    lastDate: "Aug 1, 2026",
    salary: "₹19,900 – ₹63,200",
    inHand: "₹30K – ₹38K",
    category: "railway",
    qualification: "10th",
    isNew: true,
    isHot: false,
    grade: "Assistant Loco Pilot — Indian Railways",
    difficulty: "Moderate",
    prepTime: "4–8 months",
    applyLink: "https://www.rrbapply.gov.in/",
    benefits: ["FREE Railway Pass — Lifetime", "Running Allowance", "Railway Quarter", "RELHS Medical", "Night Duty Allowance", "Pension"],
    career: "ALP → Loco Pilot → Sr. Loco Pilot → Loco Foreman → Power Controller",
    lifestyle: "Drive trains across India! Running allowance on top of salary. Same lifetime free travel. Railway colony with family quarters. Night duty allowance boosts income significantly.",
    eligibility: "10th + ITI in relevant trade OR Diploma in Engineering. Age 18–30 years.",
    exam: "CBT-1 → CBT-2 → Computer-Based Aptitude Test → Medical",
    dayInLife: "Shift-based:\n5:00 AM — Report at loco shed\n5:30 AM — Pre-departure checks\n6:00 AM — Drive train on assigned route\n12:00 PM — Arrive at destination\n1:00 PM — Rest at running room\nNext day — Return journey",
    whyChoose: [
      "Drive real trains — a childhood dream for millions",
      "Running allowance adds ₹8K-₹15K extra per month",
      "Same free railway travel as all railway employees",
      "Night duty allowance further boosts income",
    ],
    challenges: "Long hours on the track. Night shifts are common. Vision requirements are strict. Initially away from family during outstation trips.",
    realityCheck: "Being a Loco Pilot is one of the most romantic jobs in India — driving a 5,000 ton machine at 130 km/hr. The running allowance makes the salary much better than it looks on paper.",
    impact: "You physically move India. Every train you drive carries 1,000–2,500 passengers or tonnes of freight. You are responsible for their safety across hundreds of kilometers.",
    fitGuide: {
      chooseIf: ["You love trains and the idea of driving them", "You have ITI/Diploma in engineering trades", "You want extra income through running allowance", "You are okay with shift work and outstation trips"],
      avoidIf: ["You have color blindness or poor vision", "You cannot handle irregular and long working hours", "You want a desk job in an air-conditioned office"],
    },
    successStory: { emoji: "🚂", name: "Sanjay Kumar", line: "ITI from Varanasi. RRB ALP in first attempt. Now drives Rajdhani Express. Running allowance ₹12K extra." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "10th + ITI or Diploma, 18–30 years", duration: "1 day" },
      { icon: "📝", title: "Apply on RRB Portal", detail: "Online registration", duration: "30 min" },
      { icon: "💻", title: "CBT-1", detail: "Maths, GI, GS, Reasoning — screening", duration: "3 months prep" },
      { icon: "📖", title: "CBT-2", detail: "Technical subjects — rank deciding", duration: "2–3 months prep" },
      { icon: "🧠", title: "Aptitude Test", detail: "Computer-based aptitude for loco pilots", duration: "1 month prep" },
      { icon: "🚂", title: "Join Railways", detail: "Training at Loco Training Centre", duration: "6 months" },
      { icon: "📈", title: "Career Growth", detail: "Loco Pilot → Foreman → Controller", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Asst. Loco Pilot", salary: "₹30,000 + ₹10K RA", years: "Year 0–5" },
      { title: "Loco Pilot", salary: "₹42,000 + ₹12K RA", years: "Year 5–10" },
      { title: "Sr. Loco Pilot", salary: "₹55,000 + ₹15K RA", years: "Year 10–18" },
      { title: "Loco Foreman", salary: "₹70,000/month", years: "Year 18–25" },
      { title: "Power Controller", salary: "₹85,000+/month", years: "Year 25+" },
    ],
    syllabus: ["Mathematics", "General Intelligence & Reasoning", "General Science", "General Awareness", "Technical Ability (Trade-specific)"],
    pyqLinks: [
      { label: "RRB ALP 2024 Papers", url: "https://www.google.com/search?q=RRB+ALP+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 19900, da: 10150, hra: { metro: 5970, urban: 3980, rural: 2686 }, ta: 3600, other: 5000 },

  },
  {
    id: "ssc-gd-2026",
    title: "SSC GD Constable",
    org: "Staff Selection Commission",
    vacancies: 46617,
    lastDate: "Jul 30, 2026",
    salary: "₹21,700 – ₹69,100",
    inHand: "₹30K – ₹35K",
    category: "defence",
    qualification: "10th",
    isNew: true,
    isHot: true,
    grade: "Constable GD — BSF, CRPF, CISF, ITBP, SSB",
    difficulty: "Moderate",
    prepTime: "3–6 months",
    applyLink: "https://ssc.gov.in/login",
    benefits: ["Free Accommodation", "Free Food + Rations", "Medical", "Pension", "CSD Canteen", "Risk + Hardship Allowance"],
    career: "Constable → Head Constable → ASI → SI → Inspector → Commandant",
    lifestyle: "Paramilitary life — discipline, uniform, and purpose. Free food and accommodation. Posted across India including border areas. Strong sense of brotherhood and unit bonding.",
    eligibility: "10th pass. Age 18–23 years. Physical: Height 170cm (M), 157cm (F). 5 km run in 24 mins.",
    exam: "CBT (Online MCQ) → PET/PST → Medical → Document Verification",
    dayInLife: "5:30 AM — Morning PT\n7:00 AM — Breakfast\n8:00 AM — Duty/patrol\n12:00 PM — Lunch\n1:00 PM — Training/drill\n4:00 PM — Sports\n6:00 PM — Free time\n10:00 PM — Lights out",
    whyChoose: [
      "46,000+ vacancies — the highest in any central government exam",
      "Government job with just 10th pass — no degree needed",
      "Free food, accommodation, and medical — almost zero expenses",
      "Promotion path leads to Inspector and Commandant rank",
    ],
    challenges: "Border area postings are tough. Away from family for extended periods. Physical demands are high. Strict discipline and regimented lifestyle.",
    realityCheck: "SSC GD is the most accessible central government job in India. 46,000 vacancies mean realistic chances. The free food and accommodation mean your entire salary is savings.",
    impact: "You guard India's borders and internal security. CRPF fights Naxalism, BSF protects borders, CISF secures airports and metros, ITBP patrols the Himalayas. You are India's shield.",
    fitGuide: {
      chooseIf: ["You want a government job with minimum qualification", "You are physically fit and enjoy active lifestyle", "You want to serve in India's paramilitary forces", "You can live away from home in organized units"],
      avoidIf: ["You cannot handle physical training and discipline", "You cannot stay away from family for months", "You want comfortable city-based employment"],
    },
    successStory: { emoji: "🎖️", name: "Ravi Shankar", line: "10th pass from UP. SSC GD in first attempt. Now CRPF Constable. Entire salary goes to savings — food and stay are free." },
    roadmap: [
      { icon: "📋", title: "Check Eligibility", detail: "10th pass, 18–23 years, physically fit", duration: "1 day" },
      { icon: "📝", title: "Apply on SSC Portal", detail: "Online, ₹100 fee", duration: "30 min" },
      { icon: "💻", title: "CBT Exam", detail: "GK, Maths, Reasoning, English/Hindi — online", duration: "3 months prep" },
      { icon: "🏃", title: "PET/PST", detail: "5 km run, height, chest measurement", duration: "2 months training" },
      { icon: "🏥", title: "Medical", detail: "Comprehensive fitness check", duration: "1 week" },
      { icon: "🎖️", title: "Training", detail: "6–9 months at Training Centre", duration: "6–9 months" },
      { icon: "📈", title: "Career Growth", detail: "HC → ASI → SI → Inspector → Commandant", duration: "Ongoing" },
    ],
    promotionPath: [
      { title: "Constable GD", salary: "₹30,000/month", years: "Year 0–5" },
      { title: "Head Constable", salary: "₹36,000/month", years: "Year 5–10" },
      { title: "ASI", salary: "₹45,000/month", years: "Year 10–16" },
      { title: "Sub Inspector", salary: "₹56,000/month", years: "Year 16–22" },
      { title: "Inspector+", salary: "₹72,000+/month", years: "Year 22+" },
    ],
    syllabus: ["General Intelligence & Reasoning", "General Knowledge & General Awareness", "Elementary Mathematics", "English / Hindi"],
    pyqLinks: [
      { label: "SSC GD 2024 Papers", url: "https://www.google.com/search?q=SSC+GD+Constable+2024+previous+year+paper+pdf" },
    ],
    salaryBreakdown: { basic: 21700, da: 11070, hra: { metro: 0, urban: 0, rural: 0 }, ta: 3600, other: 8000 },

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

// ─── Qualification filters ────────────────────────────────────────────────────
export const QUALIFICATION_FILTERS: { id: Qualification | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "10th", label: "10th Pass" },
  { id: "12th", label: "12th Pass" },
  { id: "Graduate", label: "Graduate" },
  { id: "Post Graduate", label: "Post Graduate" },
];

// ─── Practice categories with stage-wise options ──────────────────────────────
export interface PracticeStage {
  id: string;
  label: string;
  icon: string;
  description: string;
  questionCount: number;
}

export interface PracticeCategory {
  id: string;
  title: string;
  sub: string;
  icon: string;
  color: string;
  stages: PracticeStage[];
}

export const PRACTICE_CATS: PracticeCategory[] = [
  {
    id: "sbi_po",
    title: "SBI PO",
    sub: "State Bank of India",
    icon: "🏦",
    color: "#0C7C59",
    stages: [
      { id: "prelims_mcq", label: "Prelims MCQ", icon: "📝", description: "Reasoning, Quant, English — timed MCQs like the real exam", questionCount: 10 },
      { id: "mains_mcq", label: "Mains Practice", icon: "📖", description: "GA, Banking Awareness, Data Analysis — higher difficulty", questionCount: 10 },
      { id: "descriptive", label: "Descriptive Writing", icon: "✍️", description: "Essay and letter writing — AI evaluates your answer", questionCount: 2 },
      { id: "interview", label: "Interview Panel", icon: "🎯", description: "Face a 5-question AI panel — scored on all parameters", questionCount: 5 },
    ],
  },
  {
    id: "ssc_cgl",
    title: "SSC CGL",
    sub: "Staff Selection Commission",
    icon: "📋",
    color: "#2563EB",
    stages: [
      { id: "tier1_mcq", label: "Tier-I MCQ", icon: "📝", description: "GK, Reasoning, Quant, English — screening round practice", questionCount: 10 },
      { id: "tier2_mcq", label: "Tier-II MCQ", icon: "📖", description: "Advanced Maths, English, Statistics — rank-deciding", questionCount: 10 },
      { id: "interview", label: "Document & Interview", icon: "🎯", description: "Practice answering verification and personality questions", questionCount: 5 },
    ],
  },
  {
    id: "upsc_cse",
    title: "UPSC CSE",
    sub: "Civil Services — IAS/IPS",
    icon: "🏛️",
    color: "#7C3AED",
    stages: [
      { id: "prelims_gs", label: "Prelims GS", icon: "📝", description: "General Studies MCQ — History, Polity, Geography, Science, Current Affairs", questionCount: 10 },
      { id: "prelims_csat", label: "CSAT Practice", icon: "🧠", description: "Comprehension, Logic, Decision Making, Basic Numeracy", questionCount: 10 },
      { id: "mains_essay", label: "Mains Essay", icon: "✍️", description: "Write essays on philosophical, social, economic topics — AI evaluates", questionCount: 1 },
      { id: "personality_test", label: "Personality Test", icon: "🎯", description: "5-question AI board interview — scored on all IAS panel parameters", questionCount: 5 },
    ],
  },
  {
    id: "rrb_ntpc",
    title: "RRB NTPC",
    sub: "Railway Recruitment",
    icon: "🚂",
    color: "#DC2626",
    stages: [
      { id: "cbt1_mcq", label: "CBT-1 Practice", icon: "📝", description: "Maths, GI & Reasoning, General Awareness, General Science", questionCount: 10 },
      { id: "cbt2_mcq", label: "CBT-2 Practice", icon: "📖", description: "Advanced level — rank-deciding questions", questionCount: 10 },
    ],
  },
  {
    id: "ibps_po",
    title: "IBPS PO / Clerk",
    sub: "11 Public Sector Banks",
    icon: "🏦",
    color: "#0D9488",
    stages: [
      { id: "prelims_mcq", label: "Prelims MCQ", icon: "📝", description: "Reasoning, Quant, English — similar pattern to SBI", questionCount: 10 },
      { id: "mains_mcq", label: "Mains Practice", icon: "📖", description: "GA, Computer, Banking Awareness — higher difficulty", questionCount: 10 },
      { id: "interview", label: "Interview Panel", icon: "🎯", description: "5-question AI panel for Bank PO interview round", questionCount: 5 },
    ],
  },
  {
    id: "defence",
    title: "NDA / CDS",
    sub: "Armed Forces Entry",
    icon: "🎖️",
    color: "#B45309",
    stages: [
      { id: "written_mcq", label: "Written Exam MCQ", icon: "📝", description: "Maths, English, GK — NDA/CDS written paper practice", questionCount: 10 },
      { id: "ssb_interview", label: "SSB Interview", icon: "🎯", description: "AI simulates the SSB personal interview round", questionCount: 5 },
    ],
  },
];

// Keep backward compat
export const INTERVIEW_CATS = PRACTICE_CATS.map(c => ({
  id: c.id,
  title: c.title,
  sub: c.sub,
  icon: c.icon,
  color: c.color,
  roles: c.stages.map(s => s.label),
}));

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

// ─── Daily Quiz Pool ──────────────────────────────────────────────────────────
export const DAILY_QUIZ_POOL: QuizQuestion[] = [
  { topic: "General Knowledge", question: "Who is the current Chief Justice of India?", options: ["DY Chandrachud", "Sanjiv Khanna", "NV Ramana", "SA Bobde"], correct: 1, explanation: "Justice Sanjiv Khanna is the current CJI as of 2025, succeeding DY Chandrachud." },
  { topic: "Indian Polity", question: "How many fundamental rights are there in the Indian Constitution?", options: ["5", "6", "7", "8"], correct: 1, explanation: "There are 6 fundamental rights: Equality, Freedom, Against Exploitation, Religion, Culture & Education, and Constitutional Remedies." },
  { topic: "Banking Awareness", question: "What is the full form of NEFT?", options: ["National Electronic Fund Transfer", "New Electronic Fund Transfer", "National Express Fund Transfer", "Net Electronic Fund Transfer"], correct: 0, explanation: "NEFT stands for National Electronic Fund Transfer — a payment system maintained by RBI." },
  { topic: "Current Affairs", question: "Which country hosted the G20 Summit in 2023?", options: ["Japan", "Brazil", "India", "Indonesia"], correct: 2, explanation: "India hosted the G20 Summit in September 2023 under PM Modi's presidency." },
  { topic: "Mathematics", question: "If a man walks at 5 km/hr, he misses a train by 7 minutes. If he walks at 6 km/hr, he reaches 5 minutes early. What is the distance to the station?", options: ["5 km", "6 km", "7 km", "4 km"], correct: 1, explanation: "Using the formula: Distance = (Speed1 × Speed2 × Time difference) / (Speed2 - Speed1) = (5×6×12/60)/(6-5) = 6 km." },
  { topic: "Reasoning", question: "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written?", options: ["EOJDJEFM", "FOJDIENM", "ENIDDENM", "MFEJDJOF"], correct: 0, explanation: "Each letter is shifted: odd positions +2, even positions -2 in the alphabet." },
  { topic: "English Language", question: "Choose the correct synonym of 'EPHEMERAL':", options: ["Permanent", "Transient", "Eternal", "Durable"], correct: 1, explanation: "Ephemeral means lasting for a very short time — its synonym is 'transient'." },
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

export function getTodaysQuiz(): QuizQuestion {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return DAILY_QUIZ_POOL[dayOfYear % DAILY_QUIZ_POOL.length];
}

// ─── Salary Calculator ────────────────────────────────────────────────────────
export type CityType = "metro" | "urban" | "rural";
export const CITY_TYPES: { id: CityType; label: string; examples: string }[] = [
  { id: "metro", label: "Metro", examples: "Delhi, Mumbai, Chennai, Kolkata, Bangalore, Hyderabad" },
  { id: "urban", label: "Urban", examples: "Jaipur, Lucknow, Bhopal, Patna, Ranchi, Chandigarh" },
  { id: "rural", label: "Rural", examples: "Tehsil HQ, Small towns, Village postings" },
];

export function calculateSalary(breakdown: NonNullable<Job["salaryBreakdown"]>, city: CityType) {
  const hra = breakdown.hra[city] || 0;
  const gross = breakdown.basic + breakdown.da + hra + breakdown.ta + breakdown.other;
  const nps = Math.round(breakdown.basic * 0.10);
  const inHand = gross - nps;
  return { basic: breakdown.basic, da: breakdown.da, hra, ta: breakdown.ta, other: breakdown.other, gross, nps, inHand };
}
