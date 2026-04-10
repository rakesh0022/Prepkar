export interface Job {
  id: string; title: string; org: string; vacancies: number; lastDate: string;
  salary: string; inHand: string; category: string; isNew: boolean; isHot: boolean;
  grade: string; benefits: string[]; career: string; lifestyle: string;
  eligibility: string; exam: string; dayInLife: string;
  whyPeopleChoose: string; challenges: string;
  roadmap: { step: string; detail: string; icon: string }[];
}

export const JOBS: Job[] = [
  {
    id: "sbi-po-2026", title: "SBI Probationary Officer 2026", org: "State Bank of India",
    vacancies: 2000, lastDate: "May 15, 2026", salary: "₹41,960 – ₹63,840/month", inHand: "₹52,000 – ₹58,000",
    category: "banking", isNew: true, isHot: true, grade: "Junior Management Scale-I",
    benefits: ["DA + HRA ₹15K–₹30K", "Medical Insurance (Family)", "Pension (NPS)", "Leased Housing", "Leave Fare Concession", "Subsidized Loans", "Gratuity", "30 Paid Leaves/Year"],
    career: "Probationary Officer → Officer → Manager (5–6 yrs) → Senior Manager → Chief Manager → AGM → DGM → GM",
    lifestyle: "You start with 2 years of training across branches, learning every aspect of banking. After confirmation, SBI provides leased accommodation or HRA of ₹15,000–₹30,000 based on city. Work hours are 10 AM–5 PM with alternate Saturdays off. Medical insurance covers your entire family including parents. After 5–6 years, you become Manager earning ₹80,000–₹1,00,000. By 15 years, Chief Manager at ₹1.5–2 lakh/month.",
    eligibility: "Graduation in any discipline. Age: 21–30 years. OBC +3, SC/ST +5, PwD +10 years relaxation.",
    exam: "Prelims (June 2026) — English, Quant, Reasoning — 100 marks, 1 hour\nMains (July 2026) — Reasoning, Data Analysis, GK, English — 200 marks + Descriptive\nInterview (Sept 2026) — Panel interview — 50 marks",
    dayInLife: "9:30 AM — Arrive at branch, check circulars and emails\n10:00 AM — Branch opens, manage counter or back office operations\n11:00 AM — Process loan applications, verify customer documents\n1:00 PM — Lunch break\n1:30 PM — Customer meetings, resolve complaints and queries\n3:00 PM — Cash verification, end-of-day reconciliation\n5:00 PM — Branch closes, complete pending paperwork\n5:30 PM — Head home",
    whyPeopleChoose: "SBI is India's largest bank — the brand name carries enormous respect. The job offers stability, good salary with regular increments, housing support, and a clear promotion path. Many POs become branch managers within 7–8 years. The work-life balance is genuinely good compared to private sector banking.",
    challenges: "Initial postings can be in rural branches far from your hometown. Month-end and year-end closing periods require longer hours. Customer handling can be stressful. Transfers happen every 3–4 years. The probation period involves extensive learning and evaluation.",
    roadmap: [
      { step: "Check Eligibility", detail: "Graduate, 21–30 years, Indian citizen", icon: "📋" },
      { step: "Apply Online", detail: "SBI official website, ₹750 fee (₹0 for SC/ST)", icon: "📝" },
      { step: "Clear Prelims", detail: "MCQ exam — Reasoning, English, Quant", icon: "📖" },
      { step: "Clear Mains", detail: "Detailed exam + descriptive English paper", icon: "✍️" },
      { step: "Face Interview", detail: "30-min panel interview by senior bankers", icon: "🎯" },
      { step: "Join as PO", detail: "2-year probation with training across branches", icon: "🏦" },
      { step: "Grow Your Career", detail: "Manager in 6 yrs → Chief Manager → GM", icon: "📈" },
    ],
  },
  {
    id: "ssc-cgl-2026", title: "SSC CGL 2026", org: "Staff Selection Commission",
    vacancies: 14582, lastDate: "April 30, 2026", salary: "₹25,500 – ₹81,100/month", inHand: "₹44,000 – ₹65,000",
    category: "ssc", isNew: false, isHot: true, grade: "Income Tax Inspector, Auditor, ASO, Examiner",
    benefits: ["DA + HRA + Transport Allowance", "Government Quarter (Type II/III)", "Medical Reimbursement", "Pension (NPS)", "Children Education ₹2,250/child/month", "Leave Travel Concession", "Gratuity"],
    career: "Inspector → Senior Inspector → Asst. Commissioner → Deputy Commissioner → Joint Commissioner → Commissioner",
    lifestyle: "SSC CGL opens doors to 20+ central government departments. As Income Tax Inspector — you conduct surveys, assessments, and even raids. You get a government quarter in whatever city you're posted. As an Auditor in CAG — you audit how the government spends public money. As ASO in a Ministry — you work in the Central Secretariat in Delhi. Every post comes with the authority and respect of being a central government officer.",
    eligibility: "Graduation in any discipline. Age: 18–32 years (varies by post). Category relaxation applies.",
    exam: "Tier I (June 2026) — MCQ: GK, English, Quant, Reasoning — 200 marks\nTier II (Sept 2026) — MCQ: Maths, English, GK, Computer — 390 marks\nDocument Verification → Final Merit List",
    dayInLife: "As Income Tax Inspector:\n9:30 AM — Reach office, review assigned case files\n10:00 AM — Process and assess tax returns\n11:30 AM — Field visit for verification or survey\n1:00 PM — Lunch in subsidized office canteen\n2:00 PM — Meet taxpayers, resolve disputes\n4:00 PM — Documentation, file reports\n5:30 PM — Leave for the day\n\nOccasionally involved in high-profile tax raids — these are exciting and come with field duty allowance.",
    whyPeopleChoose: "SSC CGL is one of the most versatile exams — one exam, 20+ job options across different departments. The Income Tax Inspector post is especially popular because of the authority and the exciting work profile. Government quarters in cities, stable 9–5 job, and regular promotions make it a favourite among graduates.",
    challenges: "The competition is intense — over 30 lakh candidates appear for ~15,000 posts. Initial posting might not be your preferred department. Some posts involve extensive paperwork. Transfers can take you to any state. Promotion pace varies by department.",
    roadmap: [
      { step: "Check Eligibility", detail: "Graduate, 18–32 years", icon: "📋" },
      { step: "Apply on SSC Portal", detail: "Online application, ₹100 fee (₹0 for women/SC/ST)", icon: "📝" },
      { step: "Clear Tier I", detail: "Computer-based MCQ — qualifying round", icon: "💻" },
      { step: "Clear Tier II", detail: "Detailed exam — this score decides your rank", icon: "📖" },
      { step: "Document Verification", detail: "Verify certificates at SSC regional office", icon: "✅" },
      { step: "Get Allocated", detail: "Post allocated based on rank + preference", icon: "🏛️" },
      { step: "Join & Grow", detail: "Inspector → Commissioner over 20–25 years", icon: "📈" },
    ],
  },
  {
    id: "rrb-ntpc-2026", title: "RRB NTPC Graduate Level 2026", org: "Railway Recruitment Board",
    vacancies: 11558, lastDate: "May 20, 2026", salary: "₹29,200 – ₹92,300/month", inHand: "₹35,000 – ₹55,000",
    category: "railway", isNew: true, isHot: false, grade: "Station Master, Goods Guard, Commercial Apprentice",
    benefits: ["FREE Railway Pass — All India, Lifetime!", "DA + HRA", "Railway Quarter", "RELHS Medical (Best in Govt)", "Pension", "Children Education", "Subsidized Canteen"],
    career: "Station Master → Station Superintendent → DOM → Senior DOM → ADRM → DRM",
    lifestyle: "The single biggest perk — FREE railway travel across entire India for you AND your family for LIFE. This alone saves lakhs every year. Railway quarters near stations. RELHS medical is considered the best medical facility in all government services — covers surgery, dental, everything. As Station Master, you manage an entire station — train movements, safety, passenger coordination. Respected uniformed position.",
    eligibility: "Graduation in any discipline. Age: 18–33 years. Category relaxation applies.",
    exam: "CBT-1 (July 2026) — Maths, GK, Reasoning, English\nCBT-2 (Sept 2026) — Same subjects, higher difficulty\nTyping Test (for some posts) → Medical Exam",
    dayInLife: "As Station Master (shift-based):\n6:00 AM — Morning shift begins\n6:15 AM — Check signals, track status, staff attendance\n7:00 AM — First trains arrive — manage platform allocation\n10:00 AM — Handle passenger queries, coordinate with control room\n1:00 PM — Shift handover briefing\n2:00 PM — Off duty\n\nYou work in rotational shifts (morning/evening/night) with compensatory offs. The thrill of managing a busy junction with 50+ daily trains is unmatched.",
    whyPeopleChoose: "The lifetime free railway pass is the #1 reason — your family can travel anywhere in India for free, forever. Railway medical is outstanding. The job has a unique charm — managing stations, wearing a crisp uniform, having authority over train movements. Railway community is like a family with its own colonies, clubs, and hospitals.",
    challenges: "Shift-based work means irregular hours including nights and holidays. Remote station postings are common initially. The job requires high alertness — a single mistake can have serious consequences. Transfers can be frequent in the early years.",
    roadmap: [
      { step: "Check Eligibility", detail: "Graduate, 18–33 years", icon: "📋" },
      { step: "Apply on RRB Portal", detail: "Online application through regional RRB", icon: "📝" },
      { step: "Clear CBT-1", detail: "Computer-based screening test", icon: "💻" },
      { step: "Clear CBT-2", detail: "Main exam — rank-deciding", icon: "📖" },
      { step: "Typing + Medical", detail: "Skills test (if applicable) + fitness check", icon: "🏥" },
      { step: "Join Indian Railways", detail: "Training at Zonal Railway Training Institute", icon: "🚂" },
      { step: "Grow Your Career", detail: "Station Master → DRM over 20+ years", icon: "📈" },
    ],
  },
  {
    id: "upsc-cse-2026", title: "UPSC Civil Services 2026", org: "Union Public Service Commission",
    vacancies: 1056, lastDate: "March 25, 2026", salary: "₹56,100 – ₹2,50,000/month", inHand: "₹80,000 – ₹1,20,000 (starting)",
    category: "upsc", isNew: false, isHot: true, grade: "IAS, IPS, IFS — All India Services",
    benefits: ["Government Bungalow (Type V–VII)", "Official Vehicle + Driver", "Domestic Staff", "Security Personnel", "Lifetime Pension", "Free Medical (Family)", "Foreign Deputation (UN/World Bank)", "Official Phone + Internet"],
    career: "SDM → District Magistrate → Divisional Commissioner → Secretary → Principal Secretary → Chief Secretary",
    lifestyle: "As IAS officer — you become the District Magistrate, heading the entire district administration. Budget of ₹500–₹2,000 crore under your control. 10,000+ employees report to you. A colonial-era bungalow with 10+ rooms, garden, cook, gardener, security — all government-provided. Official SUV with beacon light. Starting salary ₹56,100 but total perks worth ₹5–10 lakh/month. Possible postings include PMO, UN, World Bank. Lifetime pension after retirement.",
    eligibility: "Graduation in ANY discipline. Age: 21–32 (General). Attempts: 6 (Gen), 9 (OBC), Unlimited (SC/ST).",
    exam: "Prelims (June 2026) — 2 MCQ papers: GS + CSAT\nMains (Sept 2026) — 9 written papers: Essay, GS I–IV, Optional, Languages\nPersonality Test (March 2027) — Board interview, 275 marks",
    dayInLife: "As District Magistrate:\n6:00 AM — Wake up in government bungalow\n7:30 AM — Read newspapers, review daily briefing from PA\n9:00 AM — Reach Collectorate, meet department heads\n11:00 AM — Jan Sunwai — citizens bring complaints directly to you\n1:00 PM — Lunch at bungalow\n2:00 PM — Field visit — inspect schools, hospitals, roads\n4:00 PM — Review law & order with SP\n5:30 PM — VIP coordination, political meetings\n7:00 PM — Return home\n\nDuring elections, disasters, or VIP visits — 18–20 hour days. You are the most powerful person in the district.",
    whyPeopleChoose: "IAS is the most prestigious service in India — the power to genuinely change lives of millions. No other job at age 25 gives you authority over an entire district. The respect, the lifestyle, the impact — nothing compares. Many IAS officers go on to become Secretaries to the Government of India, shaping national policy.",
    challenges: "The exam is extraordinarily competitive — 10 lakh applicants for 1,000 seats. Preparation takes 1–3 years of dedicated study. Initial postings are often in remote, underdeveloped areas. The job involves immense pressure and public scrutiny. Political interference is a reality. Work-life balance can be poor during crisis periods.",
    roadmap: [
      { step: "Check Eligibility", detail: "Graduate in any field, 21–32 years, max 6 attempts (Gen)", icon: "📋" },
      { step: "Apply on UPSC Portal", detail: "Online application, ₹100 fee (₹0 for SC/ST/Women)", icon: "📝" },
      { step: "Clear Prelims", detail: "2 objective papers — General Studies + CSAT", icon: "📖" },
      { step: "Clear Mains", detail: "9 descriptive papers over 5 days — the real challenge", icon: "✍️" },
      { step: "Personality Test", detail: "30-min board interview by UPSC panel of 5", icon: "🎯" },
      { step: "Training at LBSNAA", detail: "Mussoorie — 2 years of rigorous officer training", icon: "🏔️" },
      { step: "Serve the Nation", detail: "SDM → DM → Secretary → Chief Secretary", icon: "🇮🇳" },
    ],
  },
];

export const JOB_CATEGORIES = [
  { id: "banking", label: "Banking", icon: "🏦", color: "#16a34a" },
  { id: "ssc", label: "SSC", icon: "📋", color: "#2563eb" },
  { id: "railway", label: "Railway", icon: "🚂", color: "#dc2626" },
  { id: "upsc", label: "UPSC", icon: "🏛️", color: "#9333ea" },
  { id: "state", label: "State PSC", icon: "🗳️", color: "#ea580c" },
  { id: "defence", label: "Defence", icon: "🎖️", color: "#0d9488" },
];

export const INTERVIEW_CATS = [
  { id: "bank_po", title: "Bank PO / Clerk", sub: "SBI, IBPS, RBI", icon: "🏦", color: "#16a34a", roles: ["SBI PO", "IBPS Clerk", "RBI Grade B"] },
  { id: "fresher_it", title: "Fresher / IT Job", sub: "TCS, Infosys, Wipro", icon: "💼", color: "#3b82f6", roles: ["TCS HR Round", "Infosys Interview", "Generic Fresher"] },
  { id: "mba", title: "MBA Admission", sub: "CAT, XAT, IIM PI", icon: "🎓", color: "#f59e0b", roles: ["IIM Interview", "XLRI Interview", "General MBA PI"] },
  { id: "govt_job", title: "Government Job", sub: "SSC, UPSC, State PSC", icon: "🏛️", color: "#ef4444", roles: ["UPSC Personality Test", "SSC Interview", "State PSC Interview"] },
];

export const HERO_STORIES = [
  { quote: "Failed 3 times. Family said stop trying. But on the 4th attempt — selected as Income Tax Inspector.", name: "Priya S.", role: "SSC CGL 2024", emoji: "💪" },
  { quote: "Small village, no coaching, just a phone and free YouTube. Cleared SBI PO in first attempt.", name: "Arun K.", role: "SBI PO 2023", emoji: "🌟" },
  { quote: "Started preparation at age 28. Everyone said too late. Cleared UPSC at 30. It's never too late.", name: "Vikram R.", role: "IAS 2024", emoji: "🔥" },
];

export const STORIES = [
  { name: "Tina Dabi", achievement: "AIR 1, UPSC CSE 2015", now: "IAS Officer, Rajasthan", quote: "I studied 8 hours daily for 2 years. NCERT books were my foundation. I didn't chase too many sources — I mastered a few and revised them multiple times. Consistency and self-belief are the only secrets.", emoji: "👩‍💼", tag: "UPSC", color: "#9333ea" },
  { name: "Arunraj K", achievement: "SBI PO 2023 — 1st Attempt", now: "Probationary Officer, SBI Chennai", quote: "I come from a farming family in rural Tamil Nadu. I prepared in my village library with just a smartphone. I gave 200+ mock tests. The day I saw my name in the selection list, my mother cried for an hour. That moment made every struggle worth it.", emoji: "👨‍💼", tag: "Banking", color: "#16a34a" },
  { name: "Priya Sharma", achievement: "SSC CGL 2024", now: "Income Tax Inspector, Delhi", quote: "I failed 3 times. My family wanted me to stop and get married. I cried many nights alone. But I kept going. On the 4th attempt, I cracked it. Now I earn ₹65,000/month with a government quarter in Delhi. Never let anyone tell you to stop.", emoji: "👩‍💻", tag: "SSC", color: "#2563eb" },
  { name: "Rohit Meena", achievement: "RRB NTPC 2023", now: "Station Master, Kota Junction", quote: "The best part? FREE train travel across India for my entire family — forever. Last month I took my parents to Kerala. First time they saw the sea. My mother held my hand and said 'beta, you changed our life.' That's why government jobs matter.", emoji: "🧑‍✈️", tag: "Railway", color: "#dc2626" },
  { name: "Sneha Patil", achievement: "MPSC 2024", now: "Deputy Collector, Satara", quote: "I prepared in Marathi medium from a small town. People said state services are very hard. But I studied smartly — previous year papers + daily newspaper analysis. Now I serve my own district as a revenue officer. The respect you get is beyond anything money can buy.", emoji: "👩‍⚖️", tag: "State PSC", color: "#ea580c" },
];

export const COUNTDOWNS = [
  { name: "UPSC Prelims", date: "Jun 1", days: 53, color: "#9333ea" },
  { name: "SBI PO Prelims", date: "Jun 15", days: 67, color: "#16a34a" },
  { name: "SSC CGL Tier I", date: "Jun 20", days: 72, color: "#2563eb" },
  { name: "RRB NTPC CBT-1", date: "Jul 10", days: 92, color: "#dc2626" },
];

export const DAILY_CHALLENGE = {
  question: "An SBI PO interview panel asks: 'What is the current repo rate set by RBI?' — What should you answer?",
  options: ["6.00%", "6.25%", "6.50%", "5.75%"],
  correct: 1,
  explanation: "The RBI set the repo rate at 6.25% in February 2025. This is one of the most commonly asked questions in banking interviews — always check the latest rate before your interview!",
};
