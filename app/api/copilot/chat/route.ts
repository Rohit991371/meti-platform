import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import db from "@/lib/db";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { candidateId, userQuestion } = await req.json();

    const row = db
      .prepare(`SELECT * FROM competency_scores WHERE candidate_id = ?`)
      .get(candidateId || "rohit-1") as { scores_json: string } | undefined;

    const scores = row ? JSON.parse(row.scores_json) : {};
    const lowestTwo = Object.entries(scores)
      .sort((a: any, b: any) => a[1] - b[1])
      .slice(0, 2)
      .map(([k]) => k)
      .join(" and ");

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `You are METI AI Copilot. The candidate's lowest scores are ${
            lowestTwo || "Operating Model (L1) and Value Chain (L2)"
          }. Answer the user question in 2 short sentences using strictly these score facts.`,
        },
        { role: "user", content: userQuestion || "" },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "I couldn't generate a response.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("copilot chat error:", err);
    return NextResponse.json({ reply: "Something went wrong answering that." }, { status: 500 });
  }
}
