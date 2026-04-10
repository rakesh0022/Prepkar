// ─── JOB DATA ────────────────────────────────────────────
export interface Job {
  id: string; title: string; org: string; vacancies: number; lastDate: string;
  salary: string; inHand: string; category: string; isNew: boolean; isHot: boolean;
  grade: string; benefits: string[]; career: string; lifestyle: string;
  eligibility: string; exam: string; dayInLife: string; videoId?: string;
}

export const JOBS: Job[] = [
  {
    id: "sbi-po-2026", title: "SBI Probationary Officer 2026", org: "State Bank of India",
    vacancies: 2000, lastDate: "May 15, 2026", salary: "₹41,960 – ₹63,840/month", inHand: "₹52,000 – ₹58,000",
    category: "banking", isNew: true, isHot: true, grade: "Junior Management Grade Scale-I",
    benefits: ["Dearness Allowance (DA)", "House Rent Allowance (HRA) ₹15K-₹30K", "City Compensatory Allowance", "Medical Insurance (family)", "Pension (NPS)", "Leased Accommodation", "Leave Fare Concession (LFC)", "Subsidized Home/Car Loan", "Gratuity", "Festival Advance"],
    career: "Probationary Officer (2 yrs) → Officer → Manager (5-6 yrs) → Senior Manager → Chief Manager → AGM → DGM → GM → CGM → DMD → MD",
    lifestyle: "As SBI PO, you start with 2 years of probation across different branches learning all banking operations. After confirmation, you get posted to a branch. SBI provides HRA of ₹15,000-₹30,000 depending on city OR leased accommodation (SBI pays your rent directly). Work hours are 10AM-5PM. Saturdays alternate off. You get 30 days paid leave + 20 casual leaves per year. SBI provides medical insurance for your entire family including parents. After 5-6 years, you become Manager with salary of ₹80,000-₹1,00,000. By 15 years, you can be Chief Manager earning ₹1.5-2 lakh/month.",
    eligibility: "Graduation in any discipline from recognized university. Age: 21-30 years. Relaxation: OBC 3 years, SC/ST 5 years, PwD 10 years.",
    exam: "Phase 1: Prelims (June 2026) — 100 marks, 1 hour — English, Quant, Reasoning\nPhase 2: Mains (July 2026) — 200 marks + Descriptive — Reasoning, Data Analysis, General Awareness, English\nPhase 3: Interview (Sept 2026) — 50 marks — conducted by bank panel",
    dayInLife: "9:30 AM — Reach branch, check emails and circulars\n10:00 AM — Branch opens, handle counter operations or back office\n11:00 AM — Process loan applications, verify documents\n1:00 PM — Lunch break (30 min)\n1:30 PM — Customer meetings, resolve complaints\n3:00 PM — Cash verification, end-of-day scrolling\n5:00 PM — Branch closes, complete pending work\n5:30 PM — Leave for home\n\nWeekends: Saturday alternate off, Sunday always off. During month-end/year-end, may need to stay late for closing.",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: "ibps-clerk-2026", title: "IBPS Clerk XIV Recruitment", org: "Institute of Banking Personnel Selection",
    vacancies: 6128, lastDate: "June 1, 2026", salary: "₹28,150 – ₹43,910/month", inHand: "₹32,000 – ₹38,000",
    category: "banking", isNew: true, isHot: false, grade: "Clerical Cadre",
    benefits: ["DA + HRA", "Medical Insurance", "Pension (NPS)", "Leave Encashment", "Festival Advance", "Provident Fund", "Subsidized Loan"],
    career: "Clerk → Senior Clerk (3-4 yrs) → Officer via Internal Exam (JAIIB/CAIIB) → Manager → Senior Manager",
    lifestyle: "Banking clerk is one of the most stable government jobs. You are posted in your HOME STATE — no transfers outside state. Work is 10AM-5PM with good work-life balance. After 2 years, you can appear for internal promotion exam to become Officer (PO level). Many clerks become Managers within 8-10 years through internal promotions. Medical insurance covers your family. You get subsidized loans for home, car, education.",
    eligibility: "Graduation in any discipline. Age: 20-28 years. Must have computer literacy.",
    exam: "Phase 1: Prelims (Aug 2026) — English, Numerical Ability, Reasoning\nPhase 2: Mains (Oct 2026) — General/Financial Awareness, English, Quant, Reasoning, Computer\nProvisional Allotment based on Mains score",
    dayInLife: "9:45 AM — Reach branch, prepare counter\n10:00 AM — Start counter operations — deposits, withdrawals, passbook printing\n12:00 PM — Process cheques, demand drafts\n1:30 PM — Lunch break\n2:00 PM — Back to counter or back-office work\n3:30 PM — Cash tallying\n5:00 PM — Close counter\n5:15 PM — Leave\n\nWork is routine and predictable. Weekends off. Very low stress compared to private sector.",
  },
  {
    id: "ssc-cgl-2026", title: "SSC CGL 2026", org: "Staff Selection Commission",
    vacancies: 14582, lastDate: "April 30, 2026", salary: "₹25,500 – ₹81,100/month", inHand: "₹44,000 – ₹65,000",
    category: "ssc", isNew: false, isHot: true, grade: "Group B & C — Income Tax Inspector, Auditor, ASO, SI",
    benefits: ["DA + HRA + Transport Allowance", "Medical Reimbursement", "Government Quarter (Type II/III)", "Pension (NPS)", "Children Education Allowance ₹2,250/month per child", "LTC (Leave Travel Concession)", "Gratuity"],
    career: "Inspector (Grade Pay ₹4,600) → Senior Inspector → Assistant Commissioner → Deputy Commissioner → Joint Commissioner → Additional Commissioner → Commissioner",
    lifestyle: "SSC CGL opens doors to 20+ government departments. As Income Tax Inspector — you conduct tax surveys, raids, and assessments. Government Type-II quarter in the city you're posted. As Auditor in CAG — you audit government spending, travel to different offices. As Assistant Section Officer in Ministry — you work in Central Secretariat, Delhi. All posts come with government accommodation, medical facilities, and the power and respect of a central government officer.",
    eligibility: "Graduation in any discipline from recognized university. Age: 18-32 years (varies by post). Relaxation for reserved categories.",
    exam: "Tier I (June 2026) — Computer Based, 200 marks — GK, English, Quant, Reasoning\nTier II (Sept 2026) — Computer Based, 390 marks — Maths, English, GK, Computer, Statistics\nDocument Verification → Final Merit List",
    dayInLife: "As Income Tax Inspector:\n9:30 AM — Reach office, review case files\n10:00 AM — Process tax returns and assessments\n11:30 AM — Field visit for survey/verification\n1:00 PM — Lunch in office canteen (subsidized)\n2:00 PM — Meeting with taxpayers, resolve disputes\n4:00 PM — Documentation and reporting\n5:30 PM — Close for the day\n\nOccasionally involved in tax raids which are exciting and high-profile. Government vehicle provided during field visits.",
  },
  {
    id: "rrb-ntpc-2026", title: "RRB NTPC Graduate Level 2026", org: "Railway Recruitment Board",
    vacancies: 11558, lastDate: "May 20, 2026", salary: "₹29,200 – ₹92,300/month", inHand: "₹35,000 – ₹55,000",
    category: "railway", isNew: true, isHot: false, grade: "Station Master, Commercial Apprentice, Goods Guard",
    benefits: ["FREE Railway Pass (All India — Lifetime!)", "DA + HRA", "Government Quarter near station", "Medical (RELHS — best medical in govt)", "Pension", "Children Education Allowance", "Canteen Facility"],
    career: "Station Master → Station Superintendent → Divisional Operations Manager → Senior DOM → ADRM → DRM (Division head)",
    lifestyle: "The BIGGEST perk — FREE railway travel across entire India for you AND your family for LIFE! This alone is worth lakhs per year. Government quarters near railway stations. Railway medical (RELHS) is considered the best medical facility in all government services — covers everything from surgery to dental. Railway canteen provides subsidized meals. As Station Master, you manage an entire railway station — train movements, safety, staff. Very respected uniformed position.",
    eligibility: "Graduation in any discipline. Age: 18-33 years. Relaxation for reserved categories.",
    exam: "CBT-1 (July 2026) — Maths, GK, General Intelligence, English\nCBT-2 (Sept 2026) — Same subjects, higher difficulty\nTyping Test (for some posts)\nMedical Examination",
    dayInLife: "As Station Master:\n6:00 AM — Morning shift starts (rotational shifts)\n6:15 AM — Check all signals, track status, staff attendance\n7:00 AM — First trains arrive — manage platform allocation\n10:00 AM — Handle passenger complaints, ticket checking coordination\n1:00 PM — Shift handover briefing\n2:00 PM — Off duty (if morning shift)\n\nStation Masters work in shifts — morning/evening/night. Get compensatory offs. The thrill of managing a busy station with 50+ trains daily is unmatched. You wear a crisp uniform and carry authority over the entire station.",
  },
  {
    id: "upsc-cse-2026", title: "UPSC Civil Services 2026 (IAS/IPS/IFS)", org: "Union Public Service Commission",
    vacancies: 1056, lastDate: "March 25, 2026", salary: "₹56,100 – ₹2,50,000/month", inHand: "₹80,000 – ₹1,20,000 (starting)",
    category: "upsc", isNew: false, isHot: true, grade: "Group A — IAS, IPS, IFS (All India Services)",
    benefits: ["Government Bungalow (Type V-VII)", "Official Vehicle + Driver", "Domestic Help (Cook, Gardener, Peon)", "Security Personnel", "DA + HRA", "Lifetime Pension", "Free Medical for entire family", "Deputation to UN/World Bank possible", "Foreign trips for conferences", "Official phone + internet"],
    career: "Sub-Divisional Magistrate (SDM) → District Magistrate (DM/DC) → Divisional Commissioner → Secretary → Principal Secretary → Chief Secretary (highest post in state)",
    lifestyle: "As IAS officer — you are the DISTRICT MAGISTRATE, the head of entire district administration. You manage a budget of ₹500-₹2,000 crore. 10,000+ government employees report to you. You get a colonial-era bungalow with 10+ rooms, a garden, cook, gardener, security guard — all paid by the government. Official white Ambassador/SUV with red beacon. Your word is law in the district. Starting salary is ₹56,100 but total perks are worth ₹5-10 lakh/month. You can be posted to Prime Minister's Office, UN, World Bank. After retirement, you get lifetime pension + government accommodation in Delhi.",
    eligibility: "Graduation in ANY discipline from recognized university. Age: 21-32 years (General). Attempts: 6 (General), 9 (OBC), Unlimited (SC/ST). Relaxation in age: OBC +3, SC/ST +5 years.",
    exam: "Prelims (June 2026) — 2 papers, MCQ — General Studies + CSAT\nMains (Sept 2026) — 9 papers, written — Essay, GS I-IV, Optional, Language\nPersonality Test/Interview (March 2027) — 275 marks — panel of 5 members",
    dayInLife: "As District Magistrate:\n6:00 AM — Wake up in government bungalow, morning walk in garden\n7:30 AM — Read newspapers, review daily briefing prepared by PA\n9:00 AM — Reach Collectorate, flag hoisting on special days\n9:30 AM — Meeting with department heads — review targets, issues\n11:00 AM — Public hearing (Jan Sunwai) — common people bring complaints directly to you\n1:00 PM — Lunch at bungalow (cook prepares)\n2:00 PM — Field visit — inspect schools, hospitals, road construction\n4:00 PM — Review law and order situation with SP (Police chief)\n5:00 PM — VIP meetings, political coordination\n7:00 PM — Return to bungalow, evening walk\n8:00 PM — Dinner, family time\n\nDuring elections, natural disasters, or VIP visits — you work 18-20 hour days. You are the most powerful person in the district.",
  },
  {
    id: "mpsc-2026", title: "MPSC State Services 2026", org: "Maharashtra Public Service Commission",
    vacancies: 431, lastDate: "May 10, 2026", salary: "₹38,600 – ₹1,82,400/month", inHand: "₹55,000 – ₹75,000",
    category: "state", isNew: true, isHot: false, grade: "Deputy Collector, DSP, BDO, Tahsildar, Sales Tax Inspector",
    benefits: ["Government Bungalow", "Official Vehicle (for senior posts)", "DA + HRA", "Medical", "Pension", "LTC", "Children Education Allowance"],
    career: "Tahsildar/Naib Tahsildar → Deputy Collector → Additional Collector → Collector (IAS equivalent at state level)",
    lifestyle: "As Deputy Collector in Maharashtra — you handle revenue administration, land records, disaster management for a sub-division. Government bungalow in taluka headquarters. Official jeep for field visits. You are the face of government at the local level. People address you as 'Saheb'. Very respected position in rural Maharashtra. Work involves meeting farmers, resolving land disputes, managing elections, disaster relief. After 10-15 years, you can become Collector of a district.",
    eligibility: "Graduation from recognized university. Age: 19-38 years (General). Maharashtra domicile required. Exam in Marathi and English.",
    exam: "Prelims (May 2026) — GS + CSAT (Marathi medium available)\nMains (Oct 2026) — 6 papers — Marathi, English, GS I-IV\nInterview (Feb 2027) — Personality Test",
    dayInLife: "As Deputy Collector / Tahsildar:\n10:00 AM — Reach office at Tehsil Bhavan\n10:15 AM — Review pending revenue cases, land mutation files\n11:00 AM — Public hearing — farmers come with land disputes\n12:30 PM — Field visit to survey land or inspect relief camps (during floods/drought)\n1:30 PM — Lunch\n2:00 PM — Court work — hear revenue cases as quasi-judicial authority\n4:00 PM — Meeting with Gram Sevaks, Talathis\n5:30 PM — Close office\n\nDuring elections — you become the Election Officer for your area. During natural disasters — you manage relief camps, distribute compensation. Very impactful and fulfilling role.",
  },
];

// ─── CATEGORIES ──────────────────────────────────────────
export const JOB_CATEGORIES = [
  { id: "banking", label: "Banking", icon: "🏦", color: "#16a34a" },
  { id: "ssc", label: "SSC", icon: "📋", color: "#2563eb" },
  { id: "railway", label: "Railway", icon: "🚂", color: "#dc2626" },
  { id: "upsc", label: "UPSC", icon: "🏛️", color: "#9333ea" },
  { id: "state", label: "State PSC", icon: "🗳️", color: "#ea580c" },
  { id: "defence", label: "Defence", icon: "🎖️", color: "#0d9488" },
  { id: "teaching", label: "Teaching", icon: "📚", color: "#c026d3" },
  { id: "police", label: "Police", icon: "🛡️", color: "#4f46e5" },
];

// ─── INTERVIEW CATEGORIES ────────────────────────────────
export const INTERVIEW_CATS = [
  { id: "bank_po", title: "Bank PO / Clerk", sub: "SBI, IBPS, RBI", icon: "🏦", color: "#16a34a", roles: ["SBI PO", "IBPS Clerk", "RBI Grade B"] },
  { id: "fresher_it", title: "Fresher / IT Job", sub: "TCS, Infosys, Wipro", icon: "💼", color: "#3b82f6", roles: ["TCS HR Round", "Infosys Interview", "Generic Fresher"] },
  { id: "mba", title: "MBA Admission", sub: "CAT, XAT, IIM PI", icon: "🎓", color: "#f59e0b", roles: ["IIM Interview", "XLRI Interview", "General MBA PI"] },
  { id: "govt_job", title: "Government Job", sub: "SSC, UPSC, State PSC", icon: "🏛️", color: "#ef4444", roles: ["UPSC Personality Test", "SSC Interview", "State PSC Interview"] },
];

// ─── SUCCESS STORIES ─────────────────────────────────────
export const STORIES = [
  { name: "Tina Dabi", achievement: "AIR 1, UPSC CSE 2015", now: "IAS Officer, Jaipur", quote: "I studied 8 hours daily for 2 years. NCERT books are the foundation. Consistency is the only secret. Don't chase too many sources — master a few.", emoji: "👩‍💼", tag: "UPSC", bgColor: "#9333ea" },
  { name: "Arunraj K", achievement: "SBI PO 2023, 1st Attempt", now: "Probationary Officer, SBI Chennai", quote: "I am from a small village in Tamil Nadu. My father is a farmer. I studied in my local library with just a phone and free YouTube. If I can clear SBI PO, anyone can. The key is mock tests — I gave 200+ mocks.", emoji: "👨‍💼", tag: "Banking", bgColor: "#16a34a" },
  { name: "Priya Sharma", achievement: "SSC CGL 2024, Income Tax Inspector", now: "IT Inspector, Delhi", quote: "Failed 3 times. My family asked me to give up. I cried many nights. But on the 4th attempt, I cracked it. Now I earn ₹65,000/month with a government quarter in Delhi. Never give up on your sarkari naukri dream.", emoji: "👩‍💻", tag: "SSC", bgColor: "#2563eb" },
  { name: "Rohit Meena", achievement: "RRB NTPC 2023, Station Master", now: "Station Master, Kota Junction", quote: "The best part of railway job? FREE travel across India for my entire family forever! Last month I took my parents to Kerala — first time they saw the sea. This job changed our lives.", emoji: "🧑‍✈️", tag: "Railway", bgColor: "#dc2626" },
  { name: "Sneha Patil", achievement: "MPSC 2024, Deputy Collector", now: "Deputy Collector, Satara", quote: "I prepared in Marathi medium from a small town in Maharashtra. People said state services are very hard. But I studied smartly — previous year papers + newspaper reading daily. Now I serve my own district as an officer.", emoji: "👩‍⚖️", tag: "State PSC", bgColor: "#ea580c" },
];

// ─── EXAM COUNTDOWNS ─────────────────────────────────────
export const COUNTDOWNS = [
  { name: "UPSC Prelims", date: "Jun 1", daysLeft: 53, color: "#9333ea" },
  { name: "SBI PO Prelims", date: "Jun 15", daysLeft: 67, color: "#16a34a" },
  { name: "SSC CGL Tier I", date: "Jun 20", daysLeft: 72, color: "#2563eb" },
  { name: "RRB NTPC CBT-1", date: "Jul 10", daysLeft: 92, color: "#dc2626" },
  { name: "IBPS Clerk", date: "Aug 10", daysLeft: 123, color: "#ea580c" },
];

// ─── DAILY QUIZ ──────────────────────────────────────────
export const DAILY_QUIZ = {
  question: "An SBI PO interview panel asks: 'What is the current repo rate set by RBI?' What is the correct answer?",
  options: ["6.00%", "6.25%", "6.50%", "5.75%"],
  correct: 1,
  explanation: "RBI cut the repo rate to 6.25% in February 2025 (later reduced to 6.00% in April 2025). Always check the latest rate before your interview — this is one of the most commonly asked banking interview questions!",
  topic: "Interview Question of the Day",
};
