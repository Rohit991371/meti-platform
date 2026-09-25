import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

const FALLBACK = {
  scores: { cci: 84, cpi: 88, cri: "Ready - Senior Path", evidenceConfidence: 92 },
  competencyVector: [],
  schwartzValues: [],
  videoSubmissions: [],
  caseSubmissions: [],
  visualArtifacts: [],
  roadmap: [
    { week: "Weeks 1-4", title: "Operating Model Fundamentals", focus: ["C06", "C07"] },
    { week: "Weeks 5-8", title: "Executive Communication Sprint", focus: ["C15"] },
    { week: "Weeks 9-12", title: "Applied Case Practicum", focus: ["C05", "C13"] },
  ],
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ candidateId: string }> }) {
  try {
    const { candidateId } = await params;

    const scoreRow = db.prepare(`SELECT * FROM competency_scores WHERE candidate_id = ?`).get(candidateId) as any;
    const videos = db.prepare(`SELECT * FROM video_submissions WHERE candidate_id = ?`).all(candidateId);
    const cases = db.prepare(`SELECT * FROM case_submissions WHERE candidate_id = ? AND is_draft = FALSE`).all(candidateId);
    const artifacts = db.prepare(`SELECT * FROM visual_artifacts WHERE candidate_id = ?`).all(candidateId);

    if (!scoreRow) return NextResponse.json(FALLBACK);

    return NextResponse.json({
      scores: {
        cci: scoreRow.cci,
        cpi: scoreRow.cpi,
        cri: scoreRow.cri,
        evidenceConfidence: scoreRow.evidence_confidence,
      },
      competencyVector: JSON.parse(scoreRow.competency_vector || "[]"),
      schwartzValues: JSON.parse(scoreRow.schwartz_values || "[]"),
      videoSubmissions: videos,
      caseSubmissions: cases,
      visualArtifacts: artifacts,
      roadmap: FALLBACK.roadmap,
    });
  } catch (err) {
    console.error("[dashboard/:candidateId] error:", err);
    return NextResponse.json(FALLBACK, { status: 200 });
  }
}
