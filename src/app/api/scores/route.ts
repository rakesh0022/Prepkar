import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { examName, stageName, scoreOverall, scoreData, questionCount } = await req.json();

    const { data, error } = await supabase
      .from("practice_sessions")
      .insert({
        user_id: user.id,
        exam_name: examName,
        stage_name: stageName,
        score_overall: scoreOverall,
        score_data: scoreData,
        question_count: questionCount,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, session: data });
  } catch (error: unknown) {
    console.error("Score save error:", error);
    return NextResponse.json({ error: "Failed to save score" }, { status: 500 });
  }
}
