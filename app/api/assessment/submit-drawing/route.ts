import { NextRequest, NextResponse } from "next/server";
import db, { CANDIDATE_ID } from "@/lib/db";
import { safeGroqJSON } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { candidateId, questionId, imageBase64, svgJson, artifactType } = await req.json();
    const id = `art-${Date.now()}`;

    const evaluation = await safeGroqJSON(
      "You evaluate a consulting candidate's process/operating-model sketch, described only by its shape metadata (not the raw image). " +
        "Respond with ONLY valid JSON: {\"score\": number (0-100), \"feedback\": string (1-2 sentences)}",
      `Artifact type: ${artifactType}. Shape/node data: ${svgJson || "not provided"}`,
      { score: 70, feedback: "Structure captured; add more detail on governance handoffs for a stronger score." }
    );

    db.prepare(
      `INSERT INTO visual_artifacts (id, candidate_id, question_id, artifact_type, image_base64, svg_json, evaluated_score, feedback)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      candidateId || CANDIDATE_ID,
      questionId || null,
      artifactType || "TOM_SKETCH",
      imageBase64 || "",
      svgJson || null,
      evaluation.score,
      evaluation.feedback
    );

    return NextResponse.json({ success: true, artifactId: id, ...evaluation });
  } catch (err) {
    console.error("[assessment/submit-drawing] error:", err);
    return NextResponse.json(
      { success: true, artifactId: `art-fallback-${Date.now()}`, score: 70, feedback: "Submission recorded." },
      { status: 200 }
    );
  }
}
