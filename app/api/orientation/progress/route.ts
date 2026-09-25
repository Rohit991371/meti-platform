import { NextRequest, NextResponse } from "next/server";

// In-memory per-server progress store (orientation is pre-auth, low stakes — no DB table needed).
const progressStore = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const { candidateId, videoId, watchedPercentage } = await req.json();
    const key = `${candidateId || "anon"}:${videoId || "V01"}`;
    progressStore.set(key, watchedPercentage ?? 0);
    return NextResponse.json({ unlocked: (watchedPercentage ?? 0) >= 80 });
  } catch (err) {
    console.error("[orientation/progress] error:", err);
    return NextResponse.json({ unlocked: false }, { status: 200 });
  }
}
