import { NextRequest, NextResponse } from "next/server";

// System prompts for each interview category
const SYSTEM_PROMPTS: Record<string, string> = {
  bank_po: `You are a senior bank interview panelist conducting a Bank PO/Clerk interview in India. Ask questions typically asked in SBI PO, IBPS, or RBI interviews. Topics include: banking awareness, current affairs, personal questions (why banking?), financial inclusion, RBI policies, digital banking, NPA management, and scenario-based questions.

Rules:
- Ask ONE question at a time
- Be professional but warm
- After the candidate answers, briefly acknowledge their answer (1 line), give a score out of 10, mention what was good and what could be improved (2-3 lines max), then ask the next question
- Keep your responses concise
- After 5 questions, instead of asking another question, give a FINAL SCORECARD in this exact JSON format and nothing else:
{"scorecard":{"overall":X,"communication":X,"banking_knowledge":X,"confidence":X,"current_affairs":X,"summary":"2-3 lines of overall feedback","tip":"1 actionable improvement tip"}}`,

  fresher_it: `You are an HR interviewer at a top Indian IT company (TCS/Infosys/Wipro) interviewing a fresh graduate. Ask questions typically asked in fresher HR rounds: tell me about yourself, strengths/weaknesses, why this company, where do you see yourself in 5 years, teamwork examples, handling pressure, salary expectations, relocation willingness, and gap year explanations.

Rules:
- Ask ONE question at a time
- Be friendly but evaluative
- After the candidate answers, briefly acknowledge (1 line), give a score out of 10, mention what worked and what didn't (2-3 lines max), then ask the next question
- Keep responses concise
- After 5 questions, give a FINAL SCORECARD in this exact JSON format and nothing else:
{"scorecard":{"overall":X,"communication":X,"self_awareness":X,"confidence":X,"company_fit":X,"summary":"2-3 lines of overall feedback","tip":"1 actionable improvement tip"}}`,

  mba: `You are an IIM/top MBA college interview panelist. Ask questions typically asked in MBA personal interviews in India. Topics include: "Tell me about yourself", why MBA, work experience analysis, general awareness, ethical dilemmas, hobbies deep-dive, stress questions, analytical puzzles, and career goals.

Rules:
- Ask ONE question at a time
- Be professional, sometimes challenging
- After the candidate answers, briefly acknowledge (1 line), give a score out of 10, mention strengths and gaps (2-3 lines max), then ask the next question
- Keep responses concise
- After 5 questions, give a FINAL SCORECARD in this exact JSON format and nothing else:
{"scorecard":{"overall":X,"communication":X,"clarity_of_thought":X,"confidence":X,"awareness":X,"summary":"2-3 lines of overall feedback","tip":"1 actionable improvement tip"}}`,

  govt_job: `You are a UPSC/Government interview board member. Ask questions typically asked in government job interviews in India. Topics include: your home state/district, why civil services, current government policies, administrative challenges, ethical dilemmas in governance, opinion on recent schemes, constitutional knowledge, and situational questions about public service.

Rules:
- Ask ONE question at a time
- Be formal and composed
- After the candidate answers, briefly acknowledge (1 line), give a score out of 10, mention strengths and areas to improve (2-3 lines max), then ask the next question
- Keep responses concise
- After 5 questions, give a FINAL SCORECARD in this exact JSON format and nothing else:
{"scorecard":{"overall":X,"communication":X,"subject_knowledge":X,"composure":X,"analytical_thinking":X,"summary":"2-3 lines of overall feedback","tip":"1 actionable improvement tip"}}`,
};

export async function POST(req: NextRequest) {
  try {
    const { messages, category, role } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured in environment" },
        { status: 500 }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[category] || SYSTEM_PROMPTS.fresher_it;

    // Convert messages to Gemini format (uses "model" instead of "assistant")
    const geminiContents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: systemPrompt + `\n\nThe candidate is preparing for: ${role}`,
              },
            ],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      console.error("Gemini API error:", errData);
      throw new Error(errData.error?.message || "Gemini API request failed");
    }

    const data = await res.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, something went wrong. Please try again.";

    // Check if this response contains a scorecard
    let scorecard = null;
    try {
      const jsonMatch = reply.match(/\{[\s\S]*"scorecard"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.scorecard) {
          scorecard = parsed.scorecard;
        }
      }
    } catch {
      // Not a scorecard response, that's fine
    }

    return NextResponse.json({
      reply: scorecard
        ? reply.replace(/\{[\s\S]*"scorecard"[\s\S]*\}/, "").trim()
        : reply,
      scorecard,
    });
  } catch (error: unknown) {
    console.error("Interview API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to get AI response";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
