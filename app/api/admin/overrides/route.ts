import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const rows = db.prepare(`SELECT * FROM audit_overrides ORDER BY timestamp DESC`).all() as any[];
    const total = rows.length;
    const agreed = rows.filter((r) => r.old_score === r.new_score).length;
    const agreementPercent = total > 0 ? Math.round((agreed / total) * 100) : 100;
    return NextResponse.json({ overrides: rows, agreementPercent, total });
  } catch (err) {
    console.error("[admin/overrides GET] error:", err);
    return NextResponse.json({ overrides: [], agreementPercent: 100, total: 0 }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { reviewerName, candidateId, competencyCode, oldScore, newScore, reason } = await req.json();
    const id = `ovr-${Date.now()}`;
    db.prepare(
      `INSERT INTO audit_overrides (id, reviewer_name, candidate_id, competency_code, old_score, new_score, reason)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(id, reviewerName, candidateId, competencyCode, oldScore, newScore, reason);
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("[admin/overrides POST] error:", err);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
