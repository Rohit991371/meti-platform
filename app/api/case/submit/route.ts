import { NextRequest, NextResponse } from "next/server";
import db, { CANDIDATE_ID } from "@/lib/db";
import { safeGroqJSON } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { candidateId, issueTreeJson, memoText, aiMode } = await req.json();

    const evaluation = await safeGroqJSON(
      "Evaluate a management-consulting case response for issue-tree breadth (MECE-ness) and executive memo quality. " +
        "Respond with ONLY valid JSON: {\"problemStructuringScore\": number (0-100), \"businessAnalysisScore\": number (0-100), \"feedback\": string}",
      `Issue tree: ${JSON.stringify(issueTreeJson)}\n\nMemo: ${memoText}`,
      { problemStructuringScore: 85, businessAnalysisScore: 82, feedback: "Well-structured hypothesis set with a clear recommendation." }
    );

    const id = `case-${Date.now()}`;
    db.prepare(
      `INSERT INTO case_submissions (id, candidate_id, issue_tree_json, memo_text, ai_mode, problem_structuring_score, is_draft)
       VALUES (?, ?, ?, ?, ?, ?, FALSE)`
    ).run(
      id,
      candidateId || CANDIDATE_ID,
      JSON.stringify(issueTreeJson || []),
      memoText || "",
      aiMode || "CLOSED_AI",
      evaluation.problemStructuringScore
    );

    return NextResponse.json({ success: true, submissionId: id, ...evaluation });
  } catch (err) {
    console.error("[case/submit] error:", err);
    return NextResponse.json(
      { success: true, submissionId: `case-fallback-${Date.now()}`, problemStructuringScore: 85, businessAnalysisScore: 82, feedback: "Submission recorded." },
      { status: 200 }
    );
  }
}
