export interface RoadmapStep { step: string; detail: string; icon: string }

export interface Job {
  id: string; title: string; org: string; vacancies: number; lastDate: string;
  salary: string; inHand: string; category: string; isNew: boolean; isHot: boolean;
  grade: string; benefits: string[]; career: string; lifestyle: string;
  eligibility: string; exam: string; dayInLife: string;
  whyChoose: string; challenges: string; impact: string;
  roadmap: RoadmapStep[];
  promotionPath: { title: string; salary: string; years: string }[];
}

export const JOBS: Job[] = [
  {
    id: "sbi-po-2026", title: "SBI Probationary Officer", org: "State Bank of India",
    vacancies: 2000, lastDate: "May 15, 2026", salary: "₹41,960 – ₹63,840", inHand: "₹52K – ₹58K",
    category: "banking", isNew: true, isHot: true, grade: "Junior Management Scale-I",
    benefits: ["HRA ₹15K–₹30K", "Medical Insurance (Family)", "Pension (NPS)", "Leased Housing", "LFC Travel", "Subsidized Loans", "30 Paid Leaves", "Gratuity"],
    career: "PO → Manager → Senior Manager → Chief Manager → AGM → DGM → GM",
    lifestyle: "SBI provides leased accommodation or HRA based on city. Work hours 10 AM–5 PM with alternate Saturdays off. Medical insurance covers your entire family including parents. Transfers every 3–4 years across the country.",
    eligibility: "Graduation in any discipline. Age 21–30 years. OBC +3, SC/ST +5, PwD +10 years relaxation.",
    exam: "Prelims → Mains → Interview",
    dayInLife: "9:30 AM — Arrive at branch, check circulars\n10:00 AM — Branch opens, manage operations\n11:00 AM — Process loan applications\n1:00 PM — Lunch break\n1:30 PM — Customer meetings\n3:00 PM — Cash verification\n5:00 PM — Branch closes\n5:30 PM — Head home",
    whyChoose: "India's largest bank — the brand carries enormous respect. Stable career with clear promotion path. Housing support, medical insurance, and genuine work-life balance. Many POs become branch managers within 7–8 years.",
    challenges: "Initial postings can be rural. Month-end and year-end require longer hours. Transfers every 3–4 years. Probation period involves intensive learning.",
    impact: "As a Bank PO, you directly help people access financial services — opening accounts for villagers who never had a bank account, processing crop loans for farmers, helping small businesses get credit. You bring banking to the last mile of India. In rural branches, you're often the most educated person in the village, and people come to you for financial guidance.",
    roadmap: [
      { step: "Check Eligibility", detail: "Any graduate, 21–30 years, Indian citizen", icon: "📋" },
      { step: "Apply Online", detail: "SBI official portal, ₹750 fee", icon: "📝" },
      { step: "Prelims Exam", detail: "MCQ — Reasoning, English, Quant — 1 hour", icon: "📖" },
      { step: "Mains Exam", detail: "Detailed exam + descriptive English paper", icon: "✍️" },
      { step: "Panel Interview", detail: "30 min face-to-face with senior bankers", icon: "🎯" },
      { step: "Join & Training", detail: "2-year probation with branch training", icon: "🏦" },
      { step: "Career Growth", detail: "Manager in 6 yrs → Chief Manager → GM", icon: "📈" },
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
    id: "ssc-cgl-2026", title: "SSC CGL 2026", org: "Staff Selection Commission",
    vacancies: 14582, lastDate: "Apr 30, 2026", salary: "₹25,500 – ₹81,100", inHand: "₹44K – ₹65K",
    category: "ssc", isNew: false, isHot: true, grade: "Income Tax Inspector, Auditor, ASO",
    benefits: ["DA + HRA + Transport", "Govt Quarter (Type II/III)", "Medical", "Pension", "Education Allowance ₹2,250/child", "LTC", "Gratuity"],
    career: "Inspector → Sr. Inspector → Asst. Commissioner → Dy. Commissioner → Commissioner",
    lifestyle: "Government quarter in the city of posting. Subsidized canteen. 9:30–5:30 work hours. Respect and authority of a central government officer from day one.",
    eligibility: "Graduation in any discipline. Age 18–32. Category relaxation applies.",
    exam: "Tier I (MCQ) → Tier II (Detailed MCQ) → Document Verification",
    dayInLife: "9:30 AM — Reach office, review case files\n10:00 AM — Process tax assessments\n11:30 AM — Field visit for survey\n1:00 PM — Lunch in office canteen\n2:00 PM — Meet taxpayers\n4:00 PM — Documentation\n5:30 PM — Leave",
    whyChoose: "One exam, 20+ department options. Income Tax Inspector is the most popular — authority, exciting work including raids. Government accommodation in cities. Stable career with regular promotions.",
    challenges: "30 lakh+ candidates for 15,000 posts. Initial department might not be preferred. Some posts involve heavy paperwork. Transfers across states.",
    impact: "As Income Tax Inspector, you ensure tax compliance — the foundation of government revenue. Your work funds schools, hospitals, roads. During raids, you uncover black money that's returned to the system. As Auditor in CAG, you hold the government accountable for how it spends public money — protecting every citizen's tax rupee.",
    roadmap: [
      { step: "Check Eligibility", detail: "Any graduate, 18–32 years", icon: "📋" },
      { step: "Apply on SSC Portal", detail: "Online, ₹100 fee (₹0 for women/SC/ST)", icon: "📝" },
      { step: "Tier I Exam", detail: "Computer-based MCQ screening", icon: "💻" },
      { step: "Tier II Exam", detail: "Detailed exam — rank-deciding", icon: "📖" },
      { step: "Document Check", detail: "Verify certificates at SSC office", icon: "✅" },
      { step: "Post Allocation", detail: "Based on rank + preference list", icon: "🏛️" },
      { step: "Career Growth", detail: "Inspector → Commissioner over 25 years", icon: "📈" },
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
    id: "rrb-ntpc-2026", title: "RRB NTPC Graduate Level", org: "Railway Recruitment Board",
    vacancies: 11558, lastDate: "May 20, 2026", salary: "₹29,200 – ₹92,300", inHand: "₹35K – ₹55K",
    category: "railway", isNew: true, isHot: false, grade: "Station Master, Goods Guard, Comm. Apprentice",
    benefits: ["FREE Railway Pass — Lifetime!", "DA + HRA", "Railway Quarter", "RELHS Medical (Best in Govt)", "Pension", "Education Allow.", "Canteen"],
    career: "Station Master → Superintendent → DOM → Sr. DOM → ADRM → DRM",
    lifestyle: "FREE railway travel across India for you AND family — forever. Railway quarters near stations. RELHS medical covers everything. Respected uniformed position.",
    eligibility: "Graduation in any discipline. Age 18–33. Category relaxation applies.",
    exam: "CBT-1 → CBT-2 → Typing Test → Medical",
    dayInLife: "6:00 AM — Morning shift begins\n6:15 AM — Check signals, track status\n7:00 AM — First trains — manage platforms\n10:00 AM — Passenger coordination\n1:00 PM — Shift handover\n2:00 PM — Off duty",
    whyChoose: "Lifetime free railway travel for entire family — worth lakhs per year. Railway medical is the best in all govt services. Unique charm of managing stations in uniform. Railway community has its own colonies, clubs, hospitals.",
    challenges: "Shift work including nights and holidays. Remote station postings initially. High alertness required — mistakes can be serious. Frequent transfers in early years.",
    impact: "Indian Railways carries 2.3 crore passengers DAILY. As Station Master, you ensure safe, on-time travel for thousands every day. During natural disasters, railways become the lifeline — you coordinate emergency trains. You keep the world's 4th largest railway network running. Every festival season, you help millions reach their families safely.",
    roadmap: [
      { step: "Check Eligibility", detail: "Any graduate, 18–33 years", icon: "📋" },
      { step: "Apply on RRB Portal", detail: "Through your regional RRB", icon: "📝" },
      { step: "CBT-1", detail: "Computer-based screening test", icon: "💻" },
      { step: "CBT-2", detail: "Main exam — rank-deciding", icon: "📖" },
      { step: "Typing + Medical", detail: "Skill test + fitness check", icon: "🏥" },
      { step: "Join Railways", detail: "Training at Zonal Institute", icon: "🚂" },
      { step: "Career Growth", detail: "Station Master → DRM over 20+ years", icon: "📈" },
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
    id: "upsc-cse-2026", title: "UPSC Civil Services (IAS/IPS)", org: "Union Public Service Commission",
    vacancies: 1056, lastDate: "Mar 25, 2026", salary: "₹56,100 – ₹2,50,000", inHand: "₹80K – ₹1.2L (start)",
    category: "upsc", isNew: false, isHot: true, grade: "IAS, IPS, IFS — All India Services",
    benefits: ["Govt Bungalow (Type V–VII)", "Vehicle + Driver", "Domestic Staff", "Security", "Lifetime Pension", "Free Medical", "Foreign Deputation", "Phone + Internet"],
    career: "SDM → DM → Div. Commissioner → Secretary → Principal Secy → Chief Secy",
    lifestyle: "As DM — head of entire district. Budget of ₹500–₹2,000 crore. 10,000+ employees. Bungalow with 10+ rooms, cook, gardener, security. Official vehicle with beacon. Total perks worth ₹5–10L/month. Possible UN/World Bank postings.",
    eligibility: "Graduation in ANY field. Age 21–32. Attempts: 6 (Gen), 9 (OBC), Unlimited (SC/ST).",
    exam: "Prelims (MCQ) → Mains (9 papers, 5 days) → Personality Test",
    dayInLife: "6:00 AM — Wake in govt bungalow\n7:30 AM — Review daily briefing\n9:00 AM — Collectorate, meet dept. heads\n11:00 AM — Jan Sunwai — public hearing\n1:00 PM — Lunch at bungalow\n2:00 PM — Field visits — schools, hospitals\n4:00 PM — Review law & order with SP\n7:00 PM — Return home",
    whyChoose: "The most prestigious position in India. No other job gives a 25-year-old authority over an entire district. The power to genuinely change millions of lives. Respect, lifestyle, and impact that nothing else compares to.",
    challenges: "Most competitive exam in India — 10 lakh applicants for 1,000 seats. 1–3 years preparation. Remote initial postings. Immense pressure and scrutiny. Political challenges. Poor work-life balance during crises.",
    impact: "As District Magistrate, YOU are responsible for everything — education, healthcare, roads, law & order, disaster relief for an entire district of 10–50 lakh people. During COVID, DMs ran vaccination drives. During floods, they managed rescue operations. During elections, they ensure fair voting. You literally shape the future of millions. Many IAS officers go on to shape NATIONAL policy — education reforms, economic policy, foreign affairs.",
    roadmap: [
      { step: "Check Eligibility", detail: "Any graduate, 21–32 yrs, max 6 attempts (Gen)", icon: "📋" },
      { step: "Apply on UPSC Portal", detail: "₹100 fee (₹0 for SC/ST/Women)", icon: "📝" },
      { step: "Prelims", detail: "2 MCQ papers — General Studies + CSAT", icon: "📖" },
      { step: "Mains", detail: "9 descriptive papers over 5 days", icon: "✍️" },
      { step: "Personality Test", detail: "30-min board interview by 5-member panel", icon: "🎯" },
      { step: "LBSNAA Training", detail: "2 years at Mussoorie — officer training", icon: "🏔️" },
      { step: "Serve the Nation", detail: "SDM → DM → Secretary → Chief Secretary", icon: "🇮🇳" },
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

export const JOB_CATEGORIES = [
  { id: "banking", label: "Banking", icon: "🏦", color: "#0C7C59" },
  { id: "ssc", label: "SSC", icon: "📋", color: "#2563eb" },
  { id: "railway", label: "Railway", icon: "🚂", color: "#dc2626" },
  { id: "upsc", label: "UPSC", icon: "🏛️", color: "#7c3aed" },
  { id: "defence", label: "Defence", icon: "🎖️", color: "#0d9488" },
  { id: "state", label: "State PSC", icon: "🗳️", color: "#ea580c" },
];

export const INTERVIEW_CATS = [
  { id: "bank_po", title: "Bank PO / Clerk", sub: "SBI, IBPS, RBI", icon: "🏦", color: "#0C7C59", roles: ["SBI PO","IBPS Clerk","RBI Grade B"] },
  { id: "fresher_it", title: "Fresher / IT Job", sub: "TCS, Infosys, Wipro", icon: "💼", color: "#2563eb", roles: ["TCS HR Round","Infosys Interview","Generic Fresher"] },
  { id: "mba", title: "MBA Admission", sub: "CAT, XAT, IIM", icon: "🎓", color: "#d97706", roles: ["IIM Interview","XLRI Interview","General MBA PI"] },
  { id: "govt_job", title: "Government Job", sub: "SSC, UPSC, PSC", icon: "🏛️", color: "#dc2626", roles: ["UPSC Personality Test","SSC Interview","State PSC Interview"] },
];

export const HERO_STORIES = [
  { quote: "Failed 3 times. Family said stop trying. 4th attempt — selected as Income Tax Inspector.", name: "Priya S.", role: "SSC CGL 2024", emoji: "💪" },
  { quote: "Small village, no coaching, just a phone and free YouTube. Cleared SBI PO in first attempt.", name: "Arun K.", role: "SBI PO 2023", emoji: "🌟" },
  { quote: "Started preparation at 28. Everyone said too late. Cleared UPSC at 30. It's never too late.", name: "Vikram R.", role: "IAS 2024", emoji: "🔥" },
];

export const STORIES = [
  { name: "Tina Dabi", achievement: "AIR 1, UPSC 2015", now: "IAS Officer, Rajasthan", quote: "NCERT books were my foundation. I didn't chase too many sources — I mastered a few and revised them multiple times. Consistency and self-belief are the only secrets.", emoji: "👩‍💼", tag: "UPSC", color: "#7c3aed" },
  { name: "Arunraj K", achievement: "SBI PO 2023, 1st Attempt", now: "PO, SBI Chennai", quote: "I come from a farming family in rural Tamil Nadu. I prepared in my village library with just a smartphone. I gave 200+ mock tests. The day I saw my name in the selection list, my mother cried for an hour.", emoji: "👨‍💼", tag: "Banking", color: "#0C7C59" },
  { name: "Priya Sharma", achievement: "SSC CGL 2024", now: "IT Inspector, Delhi", quote: "I failed 3 times. My family wanted me to stop. I cried many nights alone. But I kept going. 4th attempt — cracked it. Now I earn ₹65,000/month with a government quarter in Delhi.", emoji: "👩‍💻", tag: "SSC", color: "#2563eb" },
  { name: "Rohit Meena", achievement: "RRB NTPC 2023", now: "Station Master, Kota", quote: "FREE train travel for my family — forever. Last month I took my parents to Kerala. First time they saw the sea. My mother said 'beta, you changed our life.'", emoji: "🧑‍✈️", tag: "Railway", color: "#dc2626" },
];

export const COUNTDOWNS = [
  { name: "UPSC Prelims", date: "Jun 1", days: 53, color: "#7c3aed" },
  { name: "SBI PO Prelims", date: "Jun 15", days: 67, color: "#0C7C59" },
  { name: "SSC CGL Tier I", date: "Jun 20", days: 72, color: "#2563eb" },
];
