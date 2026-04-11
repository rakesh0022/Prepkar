import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// ─── Stage-aware system prompts ───────────────────────────────────────────────
function getSystemPrompt(category: string, stage: string, role: string): string {
  // MCQ-style stages
  if (stage.includes("mcq") || stage.includes("prelims") || stage.includes("cbt") || stage === "prelims_csat" || stage === "written_mcq") {
    const topicMap: Record<string, string> = {
      // SBI PO
      "sbi_po|prelims_mcq": "Reasoning Ability, Quantitative Aptitude, and English Language at SBI PO Prelims level",
      "sbi_po|mains_mcq": "General Awareness, Banking Awareness, Data Analysis, and Computer Aptitude at SBI PO Mains level",
      // SSC CGL
      "ssc_cgl|tier1_mcq": "General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, English Comprehension at SSC CGL Tier-I level",
      "ssc_cgl|tier2_mcq": "Advanced Quantitative Aptitude, English Language & Comprehension, Statistics at SSC CGL Tier-II level",
      // UPSC
      "upsc_cse|prelims_gs": "Indian History, Geography, Indian Polity, Economy, Environment, Science & Technology, Current Affairs for UPSC Prelims General Studies Paper I",
      "upsc_cse|prelims_csat": "Reading Comprehension, Logical Reasoning, Analytical Ability, Decision Making, Basic Numeracy for UPSC CSAT Paper II",
      // RRB NTPC
      "rrb_ntpc|cbt1_mcq": "Mathematics, General Intelligence & Reasoning, General Awareness, General Science for RRB NTPC CBT-1",
      "rrb_ntpc|cbt2_mcq": "Advanced Mathematics, General Intelligence & Reasoning, General Awareness, General Science for RRB NTPC CBT-2",
      // IBPS
      "ibps_po|prelims_mcq": "Reasoning Ability, Quantitative Aptitude, English Language for IBPS PO Prelims",
      "ibps_po|mains_mcq": "General/Financial Awareness, Reasoning & Computer Aptitude, Data Analysis, English for IBPS PO Mains",
      // Defence
      "defence|written_mcq": "Mathematics, English, General Knowledge for NDA/CDS written examination",
    };

    const topics = topicMap[`${category}|${stage}`] || `general knowledge and aptitude for ${role}`;

    return `You are an AI exam practice system for Indian government competitive exams. Generate MCQ questions one at a time on: ${topics}.

Rules:
- Present ONE question at a time with 4 options labeled (A), (B), (C), (D)
- After the candidate answers, immediately tell them if they are CORRECT or WRONG
- Show the correct answer and give a brief 1-2 line explanation of WHY that answer is correct
- Then give a difficulty rating: Easy/Medium/Hard
- Then ask the next question on a DIFFERENT topic
- Keep questions exam-realistic — use actual exam-level difficulty and question patterns
- After 10 questions, give a FINAL SCORECARD in this JSON format and nothing else:
{"scorecard":{"overall":X,"accuracy":X,"speed_rating":X,"difficulty_handled":X,"weakest_topic":"topic name","summary":"2-3 lines","tip":"1 actionable tip"}}

Format each question clearly:
**Q: [question text]**
(A) option1
(B) option2
(C) option3
(D) option4`;
  }

  // Descriptive / Essay stages
  if (stage === "descriptive" || stage === "mains_essay") {
    const essayContext = stage === "mains_essay"
      ? "UPSC Civil Services Mains essay paper. Topics can be philosophical, social, economic, or abstract."
      : "Bank PO descriptive paper. Topics include formal letters, essays on banking/economy, and report writing.";

    return `You are an AI evaluator for ${essayContext}

Rules:
- Give ONE writing prompt at a time
- The candidate will write their response
- Evaluate their response on: Content (out of 10), Language & Grammar (out of 10), Structure (out of 10), and Overall (out of 10)
- Give specific feedback: what was good, what was missing, and how to improve
- Then give the next prompt
- After ${stage === "mains_essay" ? "1 essay" : "2 prompts"}, give a FINAL SCORECARD:
{"scorecard":{"overall":X,"content":X,"language":X,"structure":X,"summary":"2-3 lines","tip":"1 tip"}}`;
  }

  // SSB Interview (Defence)
  if (stage === "ssb_interview") {
    return `You are an SSB (Services Selection Board) interview panel officer conducting a personal interview for NDA/CDS candidates. Ask questions that test Officer-Like Qualities (OLQs): leadership, decision-making, courage, initiative, group planning ability, social adaptability, and sense of responsibility.

Rules:
- Ask ONE question at a time
- Be formal and evaluative, like a real SSB board
- After the candidate answers, briefly acknowledge (1 line), score out of 10, mention what showed OLQs and what didn't (2-3 lines), then ask next question
- Include situational/reaction tests, personal questions, and opinion-based questions
- After 5 questions, give a FINAL SCORECARD:
{"scorecard":{"overall":X,"leadership":X,"decision_making":X,"communication":X,"olq_rating":X,"summary":"2-3 lines","tip":"1 tip"}}

The candidate is preparing for: ${role}`;
  }

  // Default: Interview panel (Bank PO, SSC, UPSC personality test)
  const interviewContextMap: Record<string, string> = {
    sbi_po: "senior bank interview panelist conducting a Bank PO interview. Topics: banking awareness, current affairs, why banking, financial inclusion, RBI policies, digital banking, NPA management",
    ssc_cgl: "SSC CGL document verification and personality assessment interviewer. Topics: your educational background, why government service, current affairs, department preferences, willingness for transfers",
    upsc_cse: "UPSC Civil Services personality test board member. Topics: home state/district, why civil services, current policies, administrative challenges, ethical dilemmas, constitutional knowledge, opinion on recent schemes",
    ibps_po: "IBPS PO interview panelist for public sector bank recruitment. Topics: banking fundamentals, financial inclusion, recent RBI circulars, why this bank, career goals in banking",
    defence: "Armed forces selection board member conducting a personal interview",
  };

  const context = interviewContextMap[category] || "government job interview panelist for Indian competitive exams";

  return `You are a ${context}.

Rules:
- Ask ONE question at a time
- Be professional but warm
- After the candidate answers, briefly acknowledge (1 line), give score out of 10, mention strengths and improvements (2-3 lines), then ask next question
- Keep responses concise
- After 5 questions, give a FINAL SCORECARD:
{"scorecard":{"overall":X,"communication":X,"subject_knowledge":X,"confidence":X,"awareness":X,"summary":"2-3 lines of overall feedback","tip":"1 actionable improvement tip"}}

The candidate is preparing for: ${role}`;
}

// ─── POST /api/interview ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { messages, category, role, stage } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim().length < 10) {
      console.error("ENV CHECK: GEMINI_API_KEY is", apiKey ? "too short" : "MISSING");
      return NextResponse.json({ error: "API key not configured in environment" }, { status: 500 });
    }

    const systemPrompt = getSystemPrompt(category || "govt_job", stage || "interview", role || "Government Job");

    const geminiContents = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })
    );

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: geminiContents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errData = await geminiRes.json();
      console.error("Gemini API error:", errData);
      throw new Error(errData.error?.message ?? "Gemini API request failed");
    }

    const data = await geminiRes.json();
    const reply: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, something went wrong. Please try again.";

    let scorecard: Record<string, unknown> | null = null;
    try {
      const jsonMatch = reply.match(/\{[\s\S]*"scorecard"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as { scorecard?: Record<string, unknown> };
        if (parsed.scorecard) scorecard = parsed.scorecard;
      }
    } catch { /* Not a scorecard response */ }

    return NextResponse.json({
      reply: scorecard ? reply.replace(/\{[\s\S]*"scorecard"[\s\S]*\}/, "").trim() : reply,
      scorecard,
    });
  } catch (error: unknown) {
    console.error("Interview API error:", error);
    const message = error instanceof Error ? error.message : "Failed to get AI response";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
