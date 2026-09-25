import { NextRequest, NextResponse } from "next/server";
import db, { CANDIDATE_ID } from "@/lib/db";

const VALID_CODES = ["MC-A", "PV-A", "COMBO-A", "D250"];

export async function POST(req: NextRequest) {
  try {
    const { candidateId, productCode } = await req.json();
    if (!VALID_CODES.includes(productCode)) {
      return NextResponse.json({ error: "Invalid product code" }, { status: 400 });
    }

    const id = `ent-${Date.now()}`;
    db.prepare(
      `INSERT INTO entitlements (id, candidate_id, product_code, status) VALUES (?, ?, ?, 'ACTIVE')`
    ).run(id, candidateId || CANDIDATE_ID, productCode);

    const rows = db
      .prepare(`SELECT product_code FROM entitlements WHERE candidate_id = ? AND status = 'ACTIVE'`)
      .all(candidateId || CANDIDATE_ID) as { product_code: string }[];

    return NextResponse.json({ success: true, activeEntitlements: rows.map((r) => r.product_code) });
  } catch (err) {
    console.error("[entitlements/activate] error:", err);
    return NextResponse.json({ success: false, activeEntitlements: ["COMBO-A"] }, { status: 200 });
  }
}
