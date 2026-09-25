import { NextRequest, NextResponse } from "next/server";

// Q1: "Self-report claims outweigh case evidence" is FALSE — evidence is weighted higher.
const ANSWER_KEY: Record<string, boolean> = {
  "self-report-outweighs-evidence": false,
  "schwartz-is-pass-fail": false,
};

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json(); // { [questionKey]: boolean }
    const entries = Object.entries(answers || {});
    const allCorrect = entries.every(([k, v]) => ANSWER_KEY[k] === v);
    return NextResponse.json({ unlocked: allCorrect && entries.length > 0 });
  } catch (err) {
    console.error("[orientation/knowledge-check] error:", err);
    return NextResponse.json({ unlocked: false }, { status: 200 });
  }
}
