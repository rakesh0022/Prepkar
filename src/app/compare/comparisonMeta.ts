export type ComparisonCategory = 'UPSC' | 'Banking' | 'SSC' | 'Railway' | 'Career';

export type SourceLink = {
  label: string;
  url: string;
};

export type ComparisonOverview = {
  slug: string;
  leftLabel: string;
  rightLabel: string;
  leftIcon: string;
  rightIcon: string;
  category: ComparisonCategory;
  previewStat: string;
  bestForLeft: string;
  bestForRight: string;
  difficultyLeft: number;
  difficultyRight: number;
  trending?: boolean;
};

export type ComparisonMatrixRow = {
  factor: string;
  left: string;
  right: string;
  verdict: string;
};

export type ComparisonDetailMeta = ComparisonOverview & {
  heroKicker: string;
  verdictTitle: string;
  verdictBody: string;
  recommendation: string;
  sourceLinks: SourceLink[];
  leftSalaryLabel: string;
  rightSalaryLabel: string;
  leftSalaryValue: number;
  rightSalaryValue: number;
  leftVacancyLabel: string;
  rightVacancyLabel: string;
  leftVacancyValue: number;
  rightVacancyValue: number;
  radarData: { factor: string; left: number; right: number }[];
  salaryBars: { label: string; left: number; right: number }[];
  vacancyBars: { label: string; left: number; right: number }[];
  matrix: ComparisonMatrixRow[];
  relatedSlugs: string[];
};

export const CATEGORY_STYLES: Record<ComparisonCategory, { accent: string; soft: string; ring: string; header: string }> = {
  UPSC: { accent: '#2563EB', soft: '#EFF6FF', ring: 'rgba(37,99,235,0.16)', header: 'linear-gradient(135deg, #F8FBFF 0%, #EFF6FF 100%)' },
  Banking: { accent: '#047857', soft: '#ECFDF5', ring: 'rgba(4,120,87,0.16)', header: 'linear-gradient(135deg, #F5FFFA 0%, #ECFDF5 100%)' },
  SSC: { accent: '#EA580C', soft: '#FFF7ED', ring: 'rgba(234,88,12,0.16)', header: 'linear-gradient(135deg, #FFF9F4 0%, #FFF7ED 100%)' },
  Railway: { accent: '#DC2626', soft: '#FEF2F2', ring: 'rgba(220,38,38,0.16)', header: 'linear-gradient(135deg, #FFF7F7 0%, #FEF2F2 100%)' },
  Career: { accent: '#1D4ED8', soft: '#F8FAFC', ring: 'rgba(29,78,216,0.12)', header: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)' },
};

export const COMPARISON_META: Record<string, ComparisonDetailMeta> = {
  'ias-vs-ips': {
    slug: 'ias-vs-ips',
    leftLabel: 'IAS',
    rightLabel: 'IPS',
    leftIcon: '🏛️',
    rightIcon: '🛡️',
    category: 'UPSC',
    previewStat: 'Salary basis: ₹56,100 vs ₹56,100',
    bestForLeft: 'Policy-focused students',
    bestForRight: 'Action-oriented students',
    difficultyLeft: 5,
    difficultyRight: 5,
    trending: true,
    heroKicker: 'Governance vs field command',
    verdictTitle: 'Choose influence style, not just prestige',
    verdictBody: 'IAS fits students who want broad administrative authority, policy work, and stronger work-life balance. IPS fits students who want command presence, policing, and frontline authority despite the heavier operational pressure.',
    recommendation: 'Pick IAS for policy, posting flexibility, and long-term administrative reach. Pick IPS for field leadership, law enforcement, and higher operational intensity.',
    sourceLinks: [
      { label: 'DoPT IAS Pay Rules 2016', url: 'https://dopt.gov.in/sites/default/files/IAS_PAY_Rules2016.pdf' },
      { label: 'DoPT Monthly Remuneration / AIS Pay Rules', url: 'https://dopt.gov.in/monthly-remuneration' },
    ],
    leftSalaryLabel: 'Entry pay basis',
    rightSalaryLabel: 'Entry pay basis',
    leftSalaryValue: 56100,
    rightSalaryValue: 56100,
    leftVacancyLabel: 'Approx annual selections',
    rightVacancyLabel: 'Approx annual selections',
    leftVacancyValue: 180,
    rightVacancyValue: 200,
    radarData: [
      { factor: 'Power', left: 96, right: 90 },
      { factor: 'Lifestyle', left: 82, right: 56 },
      { factor: 'Risk', left: 48, right: 86 },
      { factor: 'Prestige', left: 95, right: 93 },
      { factor: 'Policy Reach', left: 98, right: 74 },
      { factor: 'Transfers', left: 66, right: 58 },
    ],
    salaryBars: [
      { label: 'Entry', left: 56.1, right: 56.1 },
      { label: '10 Years', left: 90, right: 90 },
      { label: '20 Years', left: 150, right: 140 },
    ],
    vacancyBars: [
      { label: 'Annual selections', left: 180, right: 200 },
      { label: 'Success odds x1000', left: 1, right: 1 },
    ],
    matrix: [
      { factor: 'Role style', left: 'Administrative command across departments', right: 'Police command and investigations', verdict: 'IAS broader, IPS sharper' },
      { factor: 'Work-life balance', left: 'More predictable', right: 'Emergency-driven', verdict: 'IAS easier to sustain' },
      { factor: 'Risk profile', left: 'Political and administrative pressure', right: 'Field and law-and-order risk', verdict: 'IPS is tougher physically' },
      { factor: 'Promotion ceiling', left: 'Chief Secretary / Secretary track', right: 'Commissioner / police chief track', verdict: 'IAS has broader apex roles' },
      { factor: 'Best for', left: 'Students who want governance and policy', right: 'Students who want action and command', verdict: 'Interest fit matters most' },
    ],
    relatedSlugs: ['upsc-vs-state-psc', 'government-vs-private'],
  },
  'sbi-po-vs-ibps-po': {
    slug: 'sbi-po-vs-ibps-po',
    leftLabel: 'SBI PO',
    rightLabel: 'IBPS PO',
    leftIcon: '🏦',
    rightIcon: '💼',
    category: 'Banking',
    previewStat: 'Basic pay: ₹48,480 vs ₹48,480',
    bestForLeft: 'Brand-first aspirants',
    bestForRight: 'Faster-entry bank aspirants',
    difficultyLeft: 4,
    difficultyRight: 3,
    heroKicker: 'Same pay band, different banking experience',
    verdictTitle: 'The edge comes from posting quality and brand value',
    verdictBody: 'Both roles now sit on the same revised public-sector bank pay scale, but SBI still wins on prestige, international exposure, and metro-weighted branch network. IBPS PO remains the easier way to enter PSU banking at scale.',
    recommendation: 'Choose SBI PO if you want strongest brand, broader pathways, and better long-term signaling. Choose IBPS PO if your priority is easier entry with very similar salary structure.',
    sourceLinks: [
      { label: 'SBI officer salary revision circular', url: 'https://sbi.co.in/documents/17826/21606/050924-e-CIRCULAR%2B9TH%2BJOINT%2BNOTE%2BSALARY%2BREVISION%2BOF%2BOFFICERS.pdf/44a8586d-f728-aa1a-e472-d7dac62ab401?t=1725517531955' },
      { label: 'IBPS PO XV detailed notification', url: 'https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XV.pdf' },
      { label: 'SBI careers current openings', url: 'https://sbi.co.in/careers/current-openings' },
    ],
    leftSalaryLabel: 'Basic pay basis',
    rightSalaryLabel: 'Basic pay basis',
    leftSalaryValue: 48480,
    rightSalaryValue: 48480,
    leftVacancyLabel: 'Annual recruitment',
    rightVacancyLabel: 'Annual recruitment',
    leftVacancyValue: 541,
    rightVacancyValue: 5208,
    radarData: [
      { factor: 'Salary', left: 86, right: 84 },
      { factor: 'Posting', left: 82, right: 68 },
      { factor: 'Prestige', left: 92, right: 74 },
      { factor: 'Growth', left: 88, right: 80 },
      { factor: 'Ease', left: 62, right: 74 },
      { factor: 'Mobility', left: 84, right: 70 },
    ],
    salaryBars: [
      { label: 'Basic pay', left: 48.48, right: 48.48 },
      { label: 'In-hand', left: 63, right: 62 },
      { label: 'Senior role', left: 160, right: 145 },
    ],
    vacancyBars: [
      { label: 'Annual seats', left: 541, right: 5208 },
      { label: 'Difficulty index', left: 82, right: 70 },
    ],
    matrix: [
      { factor: 'Pay scale', left: 'Same Scale I banking pay band', right: 'Same Scale I banking pay band', verdict: 'Near-equal on pay' },
      { factor: 'Brand signal', left: 'Highest among PSU banks', right: 'Depends on allotted bank', verdict: 'SBI wins perception' },
      { factor: 'Posting quality', left: 'Higher chance of major branches', right: 'Varies by bank and network', verdict: 'SBI slightly better' },
      { factor: 'Exam difficulty', left: 'Harder', right: 'Slightly easier', verdict: 'IBPS improves odds' },
      { factor: 'Best for', left: 'Students who want brand and metro exposure', right: 'Students who want broader seat volume', verdict: 'Depends on risk appetite' },
    ],
    relatedSlugs: ['government-vs-private', 'ssc-cgl-vs-chsl'],
  },
  'ssc-cgl-vs-chsl': {
    slug: 'ssc-cgl-vs-chsl',
    leftLabel: 'SSC CGL',
    rightLabel: 'SSC CHSL',
    leftIcon: '📋',
    rightIcon: '🗂️',
    category: 'SSC',
    previewStat: 'Entry pay: ₹44,900 vs ₹19,900',
    bestForLeft: 'Graduates aiming for authority',
    bestForRight: '12th-pass quick-entry aspirants',
    difficultyLeft: 5,
    difficultyRight: 3,
    heroKicker: 'Faster entry vs stronger career ceiling',
    verdictTitle: 'CGL wins on power, pay, and growth',
    verdictBody: 'If you are eligible for both, CGL is the stronger long-term path by a wide margin. CHSL still makes sense as a lower-barrier government entry route, especially if you want to start early and upgrade later.',
    recommendation: 'Choose CGL if you can handle the tougher exam and want superior pay, authority, and promotions. Choose CHSL if you need a quicker, more accessible government entry point.',
    sourceLinks: [
      { label: 'SSC CGL 2024 official notice', url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_CGLE_2024_06_24.pdf' },
      { label: 'SSC CHSL 2024 official notice', url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice%20of%20CHSLE%202024_05_04_24.pdf' },
    ],
    leftSalaryLabel: 'Pay level basis',
    rightSalaryLabel: 'Pay level basis',
    leftSalaryValue: 44900,
    rightSalaryValue: 19900,
    leftVacancyLabel: 'Tentative vacancies',
    rightVacancyLabel: 'Tentative vacancies',
    leftVacancyValue: 17727,
    rightVacancyValue: 3712,
    radarData: [
      { factor: 'Salary', left: 92, right: 48 },
      { factor: 'Authority', left: 90, right: 30 },
      { factor: 'Ease', left: 44, right: 78 },
      { factor: 'Growth', left: 94, right: 45 },
      { factor: 'Lifestyle', left: 74, right: 68 },
      { factor: 'Prestige', left: 88, right: 50 },
    ],
    salaryBars: [
      { label: 'Entry pay', left: 44.9, right: 19.9 },
      { label: 'In-hand', left: 58, right: 27 },
      { label: '20-year ceiling', left: 105, right: 60 },
    ],
    vacancyBars: [
      { label: 'Tentative seats', left: 17727, right: 3712 },
      { label: 'Success ease index', left: 42, right: 78 },
    ],
    matrix: [
      { factor: 'Eligibility', left: 'Graduate', right: '12th pass', verdict: 'CHSL easier to enter' },
      { factor: 'Pay level', left: 'Level 7', right: 'Level 2 / 4', verdict: 'CGL far higher' },
      { factor: 'Role type', left: 'Inspector / executive / analyst track', right: 'Clerical / assistant track', verdict: 'CGL has more authority' },
      { factor: 'Difficulty', left: 'Very hard', right: 'Moderate', verdict: 'CHSL easier by a lot' },
      { factor: 'Best for', left: 'Students chasing long-term upside', right: 'Students needing accessible entry', verdict: 'Choose based on ambition and eligibility' },
    ],
    relatedSlugs: ['sbi-po-vs-ibps-po', 'government-vs-private'],
  },
  'upsc-vs-state-psc': {
    slug: 'upsc-vs-state-psc',
    leftLabel: 'UPSC',
    rightLabel: 'State PSC',
    leftIcon: '🏛️',
    rightIcon: '🗳️',
    category: 'UPSC',
    previewStat: 'Entry pay basis: ₹56,100 vs ₹45K-55K',
    bestForLeft: 'National-scope aspirants',
    bestForRight: 'Home-state-focused aspirants',
    difficultyLeft: 5,
    difficultyRight: 4,
    heroKicker: 'National reach vs state-rooted stability',
    verdictTitle: 'The trade-off is ceiling versus stability',
    verdictBody: 'UPSC gives you broader career reach, stronger signaling, and national-level mobility. State PSC gives you a more achievable exam and a more family-stable life in one state.',
    recommendation: 'Choose UPSC if you want the highest ceiling and are ready for a longer grind. Choose State PSC if you value home-state stability, faster odds, and a more realistic preparation horizon.',
    sourceLinks: [
      { label: 'DoPT IAS Pay Rules 2016', url: 'https://dopt.gov.in/sites/default/files/IAS_PAY_Rules2016.pdf' },
      { label: 'DoPT Monthly Remuneration / AIS Pay Rules', url: 'https://dopt.gov.in/monthly-remuneration' },
    ],
    leftSalaryLabel: 'IAS pay basis',
    rightSalaryLabel: 'Typical State PSC range',
    leftSalaryValue: 56100,
    rightSalaryValue: 50000,
    leftVacancyLabel: 'Annual selections',
    rightVacancyLabel: 'Annual selections',
    leftVacancyValue: 1050,
    rightVacancyValue: 350,
    radarData: [
      { factor: 'Salary', left: 90, right: 76 },
      { factor: 'Reach', left: 98, right: 58 },
      { factor: 'Stability', left: 60, right: 88 },
      { factor: 'Difficulty', left: 96, right: 70 },
      { factor: 'Growth', left: 94, right: 72 },
      { factor: 'Family Life', left: 62, right: 86 },
    ],
    salaryBars: [
      { label: 'Entry pay', left: 56.1, right: 50 },
      { label: '10 Years', left: 100, right: 80 },
      { label: '20 Years', left: 145, right: 108 },
    ],
    vacancyBars: [
      { label: 'Annual seats', left: 1050, right: 350 },
      { label: 'Ease index', left: 35, right: 68 },
    ],
    matrix: [
      { factor: 'Scope', left: 'Pan-India service', right: 'Within one state', verdict: 'UPSC broader' },
      { factor: 'Preparation load', left: 'Longer and harder', right: 'More achievable', verdict: 'State PSC easier' },
      { factor: 'Career ceiling', left: 'Central and state apex roles', right: 'State-heavy ceiling', verdict: 'UPSC wins ceiling' },
      { factor: 'Family stability', left: 'Frequent transfers', right: 'Home-state rooted', verdict: 'State PSC wins stability' },
      { factor: 'Best for', left: 'Students chasing highest reach', right: 'Students wanting service with stability', verdict: 'Priority decides the winner' },
    ],
    relatedSlugs: ['ias-vs-ips', 'government-vs-private'],
  },
  'government-vs-private': {
    slug: 'government-vs-private',
    leftLabel: 'Government',
    rightLabel: 'Private',
    leftIcon: '🏢',
    rightIcon: '💻',
    category: 'Career',
    previewStat: 'Entry monthly value: ₹60K-90K vs ₹40K-60K',
    bestForLeft: 'Security-first students',
    bestForRight: 'High-upside risk takers',
    difficultyLeft: 4,
    difficultyRight: 3,
    heroKicker: 'Peace of mind versus faster upside',
    verdictTitle: 'This one is values-first, not universally one-sided',
    verdictBody: 'Government usually wins on security, retirement comfort, and work-life balance. Private can outpace it heavily on salary upside, skill velocity, and promotion speed if you can handle uncertainty.',
    recommendation: 'Choose government for stability, predictable growth, and family time. Choose private for salary upside, faster growth, and skill acceleration.',
    sourceLinks: [
      { label: 'DoPT IAS Pay Rules 2016', url: 'https://dopt.gov.in/sites/default/files/IAS_PAY_Rules2016.pdf' },
      { label: 'IBPS PO XV detailed notification', url: 'https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XV.pdf' },
      { label: 'SBI officer salary revision circular', url: 'https://sbi.co.in/documents/17826/21606/050924-e-CIRCULAR%2B9TH%2BJOINT%2BNOTE%2BSALARY%2BREVISION%2BOF%2BOFFICERS.pdf/44a8586d-f728-aa1a-e472-d7dac62ab401?t=1725517531955' },
    ],
    leftSalaryLabel: 'Entry monthly value',
    rightSalaryLabel: 'Entry monthly value',
    leftSalaryValue: 75000,
    rightSalaryValue: 50000,
    leftVacancyLabel: 'Security index',
    rightVacancyLabel: 'Security index',
    leftVacancyValue: 99,
    rightVacancyValue: 65,
    radarData: [
      { factor: 'Security', left: 98, right: 54 },
      { factor: 'Salary Upside', left: 68, right: 95 },
      { factor: 'Lifestyle', left: 88, right: 52 },
      { factor: 'Prestige', left: 90, right: 62 },
      { factor: 'Skill Growth', left: 58, right: 92 },
      { factor: 'Retirement', left: 96, right: 40 },
    ],
    salaryBars: [
      { label: 'Entry', left: 75, right: 50 },
      { label: '10 Years', left: 125, right: 225 },
      { label: 'Retirement comfort', left: 65, right: 20 },
    ],
    vacancyBars: [
      { label: 'Job security', left: 99, right: 65 },
      { label: 'Promotion speed', left: 52, right: 88 },
    ],
    matrix: [
      { factor: 'Security', left: 'Very high', right: 'Market-linked', verdict: 'Government wins' },
      { factor: 'Salary upside', left: 'Moderate but stable', right: 'Much higher ceiling', verdict: 'Private wins' },
      { factor: 'Work-life balance', left: 'Usually better', right: 'Often tougher', verdict: 'Government wins balance' },
      { factor: 'Retirement', left: 'Much more secure', right: 'Depends on investing', verdict: 'Government wins peace of mind' },
      { factor: 'Best for', left: 'Students who want certainty', right: 'Students who want acceleration', verdict: 'Pick by risk profile' },
    ],
    relatedSlugs: ['sbi-po-vs-ibps-po', 'upsc-vs-state-psc'],
  },
  'rbi-grade-b-vs-sbi-po': {
    slug: 'rbi-grade-b-vs-sbi-po',
    leftLabel: 'RBI Grade B',
    rightLabel: 'SBI PO',
    leftIcon: '🏦',
    rightIcon: '💼',
    category: 'Banking',
    previewStat: 'In-hand: ₹85K–₹95K vs ₹60K–₹65K',
    bestForLeft: 'Policy & prestige seekers',
    bestForRight: 'Faster-entry banking aspirants',
    difficultyLeft: 5,
    difficultyRight: 4,
    trending: false,
    heroKicker: 'Central bank prestige vs commercial banking scale',
    verdictTitle: 'RBI Grade B wins on almost every metric — if you can crack it',
    verdictBody: 'RBI Grade B offers higher salary, better work culture, superior work-life balance, and the highest prestige in Indian banking. The catch: it is significantly harder to crack with far fewer seats.',
    recommendation: 'Choose RBI Grade B if you want the best banking career and can handle the tougher exam. Choose SBI PO for faster, more accessible entry into top-tier banking.',
    sourceLinks: [
      { label: 'RBI Grade B 2024 notification', url: 'https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=4356' },
      { label: 'SBI officer salary revision circular', url: 'https://sbi.co.in/documents/17826/21606/050924-e-CIRCULAR%2B9TH%2BJOINT%2BNOTE%2BSALARY%2BREVISION%2BOF%2BOFFICERS.pdf/44a8586d-f728-aa1a-e472-d7dac62ab401?t=1725517531955' },
    ],
    leftSalaryLabel: 'Entry in-hand',
    rightSalaryLabel: 'Entry in-hand',
    leftSalaryValue: 90000,
    rightSalaryValue: 62000,
    leftVacancyLabel: 'Annual vacancies',
    rightVacancyLabel: 'Annual vacancies',
    leftVacancyValue: 250,
    rightVacancyValue: 541,
    radarData: [
      { factor: 'Salary', left: 94, right: 76 },
      { factor: 'Prestige', left: 98, right: 84 },
      { factor: 'Work-Life', left: 92, right: 72 },
      { factor: 'Growth', left: 88, right: 80 },
      { factor: 'Ease', left: 38, right: 62 },
      { factor: 'Posting', left: 90, right: 70 },
    ],
    salaryBars: [
      { label: 'Entry in-hand', left: 90, right: 62 },
      { label: '5 Years', left: 115, right: 85 },
      { label: '15 Years', left: 175, right: 140 },
    ],
    vacancyBars: [
      { label: 'Annual seats', left: 250, right: 541 },
      { label: 'Difficulty index', left: 92, right: 72 },
    ],
    matrix: [
      { factor: 'Salary', left: '₹85K–₹95K in-hand', right: '₹60K–₹65K in-hand', verdict: 'RBI Grade B wins by ₹25K+' },
      { factor: 'Prestige', left: 'Apex central bank', right: 'Largest commercial bank', verdict: 'RBI Grade B wins' },
      { factor: 'Work culture', left: 'Policy & research, 9-to-5', right: 'Operations, target-driven', verdict: 'RBI Grade B wins' },
      { factor: 'Exam difficulty', left: 'Very hard, ~200 seats', right: 'Hard, 500–2000 seats', verdict: 'SBI PO easier to crack' },
      { factor: 'Best for', left: 'Students who want best banking career', right: 'Students who want faster banking entry', verdict: 'Depends on exam readiness' },
    ],
    relatedSlugs: ['sbi-po-vs-ibps-po', 'government-vs-private'],
  },
};

export const COMPARE_FILTERS: ComparisonCategory[] = ['UPSC', 'Banking', 'SSC', 'Railway', 'Career'];
