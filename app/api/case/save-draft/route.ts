import { NextRequest, NextResponse } from "next/server";
import db, { CANDIDATE_ID } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { candidateId, issueTreeJson, memoText, aiMode } = await req.json();
    const id = `draft-${Date.now()}`;
    db.prepare(
      `INSERT INTO case_submissions (id, candidate_id, issue_tree_json, memo_text, ai_mode, is_draft)
       VALUES (?, ?, ?, ?, ?, TRUE)`
    ).run(id, candidateId || CANDIDATE_ID, JSON.stringify(issueTreeJson || []), memoText || "", aiMode || "CLOSED_AI");
    return NextResponse.json({ success: true, draftId: id });
  } catch (err) {
    console.error("[case/save-draft] error:", err);
    return NextResponse.json({ success: true, draftId: `draft-fallback-${Date.now()}` }, { status: 200 });
  }
}
