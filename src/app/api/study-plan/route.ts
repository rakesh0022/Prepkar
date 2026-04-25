import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const VALID_EXAMS = new Set([
  "UPSC CSE", "SSC CGL", "SSC CHSL", "SBI PO", "SBI Clerk",
  "IBPS PO", "IBPS Clerk", "RBI Grade B", "RRB NTPC", "RRB Group D",
  "LIC AAO", "NDA", "CDS", "Delhi Police", "CAPF", "State PSC",
]);

const VALID_HOURS = new Set(["1-2", "3-4", "5-6", "8+"]);
const VALID_STUDENT_TYPES = new Set(["working", "fulltime"]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { exam, examDate, dailyHours, strongSubjects, weakSubjects, studentType } = body;

    if (!exam || !VALID_EXAMS.has(exam)) {
      return NextResponse.json({ error: "Invalid exam selection" }, { status: 400 });
    }
    if (!examDate || isNaN(new Date(examDate).getTime())) {
      return NextResponse.json({ error: "Invalid exam date" }, { status: 400 });
    }
    if (!dailyHours || !VALID_HOURS.has(dailyHours)) {
      return NextResponse.json({ error: "Invalid daily hours" }, { status: 400 });
    }
    if (!studentType || !VALID_STUDENT_TYPES.has(studentType)) {
      return NextResponse.json({ error: "Invalid student type" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim().length < 10) {
      return NextResponse.json({ error: "API not configured" }, { status: 500 });
    }

    const msUntilExam = new Date(examDate).getTime() - Date.now();
    const rawWeeks = Math.ceil(msUntilExam / (1000 * 60 * 60 * 24 * 7));
    const weeksUntilExam = Math.max(4, Math.min(12, rawWeeks));

    const prompt = buildPrompt({
      exam,
      examDate,
      dailyHours,
      strongSubjects: Array.isArray(strongSubjects) ? strongSubjects : [],
      weakSubjects: Array.isArray(weakSubjects) ? weakSubjects : [],
      studentType,
      weeksUntilExam,
    });

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 8192 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errData = await geminiRes.json();
      throw new Error(errData.error?.message ?? "Gemini API request failed");
    }

    const data = await geminiRes.json();
    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const extracted = extractJSON(text);
    if (!extracted) {
      console.error("Raw Gemini text (first 500):", text.slice(0, 500));
      throw new Error("Could not locate JSON in AI response");
    }

    const cleaned = repairJSON(extracted);

    let plan: { weeks: unknown[] };
    try {
      plan = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse failed after repair. Cleaned text (first 300):", cleaned.slice(0, 300));
      throw new Error("AI returned malformed JSON — please try again");
    }

    if (!Array.isArray(plan.weeks) || plan.weeks.length === 0) {
      throw new Error("Invalid study plan structure");
    }

    return NextResponse.json(plan);
  } catch (error: unknown) {
    console.error("Study plan API error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate study plan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── JSON extraction helpers ──────────────────────────────────────────────────

/**
 * Extracts the first complete JSON object containing a "weeks" key.
 * Uses brace-depth + string-context tracking instead of a greedy regex,
 * so it handles large outputs that the regex approach can mis-parse.
 */
function extractJSON(text: string): string | null {
  let start = -1;

  // Find the opening brace that belongs to our weeks object
  for (let i = 0; i < text.length - 8; i++) {
    if (text[i] !== "{") continue;
    const peek = text.slice(i, i + 12).replace(/\s/g, "");
    if (peek.startsWith('{"weeks"') || peek.startsWith("{\"weeks\"")) {
      start = i;
      break;
    }
  }
  if (start === -1) return null;

  let depth = 0;
  let inStr = false;
  let esc = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (esc) { esc = false; continue; }
    if (ch === "\\" && inStr) { esc = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

/** Fixes the most common Gemini JSON mistakes: trailing commas before } or ] */
function repairJSON(json: string): string {
  return json
    .replace(/,(\s*[}\]])/g, "$1")   // trailing commas
    .replace(/\t/g, " ")              // literal tabs inside strings
    .trim();
}

// ─────────────────────────────────────────────────────────────────────────────

function buildPrompt(p: {
  exam: string;
  examDate: string;
  dailyHours: string;
  strongSubjects: string[];
  weakSubjects: string[];
  studentType: string;
  weeksUntilExam: number;
}): string {
  const maxHoursPerDay =
    p.dailyHours === "1-2" ? 2 : p.dailyHours === "3-4" ? 4 : p.dailyHours === "5-6" ? 6 : 8;
  const isWorking = p.studentType === "working";

  const examSyllabusHints: Record<string, string> = {
    "UPSC CSE": "Prelims (GS Paper I & CSAT) + Mains (GS I-IV, Essay, Optional). High weightage: Polity, Economy, Environment, History. NCERT foundation is critical.",
    "SSC CGL": "Tier I: Reasoning, Quant, English, GA (100 marks each). Tier II: Math (200), English (200). Geometry and Trigonometry are high weightage.",
    "SSC CHSL": "Tier I: Reasoning, Quant, English, GA. Tier II: Descriptive. Focus on accuracy over speed.",
    "SBI PO": "Prelims: Reasoning, Quant, English. Mains: GA, Banking, Data Analysis, Computer, Descriptive. Banking Awareness is differentiator.",
    "SBI Clerk": "Prelims: English, Reasoning, Numerical Ability. Mains: General/Financial Awareness, English, Reasoning, Computer, Quant.",
    "IBPS PO": "Same pattern as SBI PO. GA & Banking Awareness section is key differentiator in Mains.",
    "IBPS Clerk": "Prelims: English, Reasoning, Numerical. Mains: Reasoning + Computer, English, Quant, GA + Financial Awareness.",
    "RBI Grade B": "Phase I: Reasoning, Quant, English, GA. Phase II: Economic & Social Issues, Finance & Management, English. Economy & Finance is hardest section.",
    "RRB NTPC": "CBT 1: Maths, Reasoning, GA (100 questions). CBT 2: Same subjects (120 questions). GA has highest weightage at 40 marks.",
    "RRB Group D": "CBT: Maths, Reasoning, General Science, GK & Current Affairs. Science section is unique to Group D.",
    "LIC AAO": "Prelims: Reasoning, Quant, English. Mains: Insurance & Financial Market Awareness, Data Analysis, Reasoning, English. Insurance Awareness is the differentiator.",
    "NDA": "Math (300 marks): Algebra, Matrices, Trigonometry, Calculus, Statistics. GAT (600 marks): English, Physics, Chemistry, History, Geography, Polity, Biology.",
    "CDS": "Math, English, General Knowledge. Officer training interview is crucial.",
    "Delhi Police": "Reasoning, GK, Numerical Ability, Computer, English. Physical test after written.",
    "CAPF": "Paper I: General Ability & Intelligence. Paper II: General Studies, Essay & Comprehension. Essay writing is 25% of marks.",
    "State PSC": "Prelims: GS + CSAT. Mains: History, Geography, Polity, Economy, Science, Current Affairs of state. Tailor to specific state.",
  };

  const syllabusHint = examSyllabusHints[p.exam] ?? "Follow standard government exam preparation pattern.";

  return `You are an expert Indian government exam coach generating a personalized study plan.

CANDIDATE PROFILE:
- Exam: ${p.exam}
- Exam Date: ${p.examDate}
- Weeks Available: ${p.weeksUntilExam} weeks
- Daily Study Time: ${p.dailyHours} hours/day (max ${maxHoursPerDay} hours)
- Strong Subjects: ${p.strongSubjects.length > 0 ? p.strongSubjects.join(", ") : "None specified"}
- Weak Subjects: ${p.weakSubjects.length > 0 ? p.weakSubjects.join(", ") : "None specified"}
- Profile: ${isWorking ? "Working professional — study in morning (1-2h) and evening (1-2h) on weekdays, longer on weekends" : "Full-time student — flexible schedule, can study continuously"}

EXAM SYLLABUS & STRATEGY:
${syllabusHint}

WEEK THEME PROGRESSION (adapt to ${p.weeksUntilExam} weeks):
- Weeks 1-2: Foundation & Basics
- Weeks 3-5: Core Concepts & Intermediate
- Weeks 6-8: Advanced Topics & Previous Year Papers
- Weeks 9-10: Mock Tests & Analysis
- Last 1-2 Weeks: Rapid Revision & Final Mock Tests

STRICT RULES:
1. Generate EXACTLY ${p.weeksUntilExam} weeks.
2. Each week has exactly 7 days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.
3. Each day has 2-4 tasks. Sunday is lighter (max 2 tasks — revision/rest).
4. Total task hours per day MUST NOT exceed ${maxHoursPerDay} hours.
5. Allocate MORE time to weak subjects. Maintain (not increase) strong subjects.
6. Include mock tests on Saturdays starting week 3.
7. Last 2 weeks: only mock tests, PYQ practice, and rapid revision.
8. ${isWorking ? "On weekdays, max 1.5 hours per task. On weekends, up to 3 hours per task." : "Distribute hours evenly. Weekends can have longer sessions."}
9. Resources: exactly 2 items per task. Each resource is a plain string under 50 characters. No apostrophes, no colons, no special characters.
10. Each subject must have a consistent hex color throughout the plan:
    Quantitative Aptitude/Maths=#0D9488, Reasoning=#2563EB, English=#16A34A,
    General Awareness/GK/Current Affairs=#D97706, Banking/Finance Awareness=#6D28D9,
    History/Polity/Geography=#DC2626, Economy/Finance=#059669, Science/Physics/Chemistry=#0891B2,
    Computer/IT=#0EA5E9, Mock Test/PYQ=#374151, Revision=#6B7280, Essay/Writing=#F59E0B, Ethics=#8B5CF6

JSON FORMATTING RULES — STRICTLY FOLLOW:
- No trailing commas anywhere
- No markdown code fences
- No comments inside JSON
- No text before or after the JSON object
- All string values use only double quotes
- hours must be a number (not a string)

Return ONLY this exact JSON structure, nothing else:
{"weeks":[{"week":1,"theme":"Foundation Building","days":[{"day":"Monday","tasks":[{"subject":"Quantitative Aptitude","topic":"Number System and Simplification","hours":1.5,"resources":["RS Aggarwal Chapter 1 to 3","Adda247 YouTube Number System"],"color":"#0D9488"}]}]}]}`;
}
