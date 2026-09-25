// import { NextRequest, NextResponse } from "next/server";
// import db, { CANDIDATE_ID } from "@/lib/db";
// import { groq } from "@/lib/groq";

// export async function POST(req: NextRequest) {
//   try {
//     const { candidateId, userQuestion } = await req.json();

//     const row = db
//       .prepare(`SELECT * FROM competency_scores WHERE candidate_id = ?`)
//       .get(candidateId || CANDIDATE_ID) as { competency_vector: string } | undefined;

//     const vector = row ? JSON.parse(row.competency_vector) : [];
//     const lowestTwo = [...vector]
//       .sort((a: any, b: any) => a.level - b.level)
//       .slice(0, 2)
//       .map((v: any) => v.name)
//       .join(" and ");

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [
//         {
//           role: "system",
//           content: `You are METI AI Copilot. The candidate's lowest scores are ${
//             lowestTwo || "Operating Model Design and Value Chain Transformation"
//           }. Answer the user question in 2 short sentences using strictly these score facts.`,
//         },
//         { role: "user", content: userQuestion || "" },
//       ],
//     });

//     const reply = completion.choices[0]?.message?.content ?? "I couldn't generate a response.";
//     return NextResponse.json({ reply });
//   } catch (err) {
//     console.error("[copilot/chat] error:", err);
//     return NextResponse.json({ reply: "I'm having trouble reaching the AI service right now — please try again shortly." }, { status: 200 });
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import db, { CANDIDATE_ID } from "@/lib/db";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { candidateId, userQuestion } = await req.json();

    const row = db
      .prepare(`SELECT * FROM competency_scores WHERE candidate_id = ?`)
      .get(candidateId || CANDIDATE_ID) as { competency_vector: string } | undefined;

    const vector = row ? JSON.parse(row.competency_vector) : [];
    const lowestTwo = [...vector]
      .sort((a: any, b: any) => a.level - b.level)
      .slice(0, 2)
      .map((v: any) => v.name)
      .join(" and ");

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are METI AI Copilot. The candidate's lowest scores are ${
            lowestTwo || "Operating Model Design and Value Chain Transformation"
          }. Answer the user question in 2 short sentences using strictly these score facts.`,
        },
        { role: "user", content: userQuestion || "" },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "I couldn't generate a response.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[copilot/chat] error:", err);
    return NextResponse.json({ reply: "I'm having trouble reaching the AI service right now — please try again shortly." }, { status: 200 });
  }
}