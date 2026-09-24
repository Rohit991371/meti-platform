import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import db from "@/lib/db";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Extract candidate profile data from the resume text the user provides. " +
            "Respond with ONLY valid JSON, no prose, no markdown fences, matching exactly this schema: " +
            `{"fullName": string, "education": string, "experienceYears": number, "companies": string[], "practiceAreas": string[]}`,
        },
        { role: "user", content: resumeText || "No resume text provided." },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    db.prepare(
      `INSERT INTO candidates (id, full_name, email, education, experience_years, companies, practice_areas)
       VALUES (@id, @fullName, @email, @education, @experienceYears, @companies, @practiceAreas)
       ON CONFLICT(id) DO UPDATE SET
         full_name = excluded.full_name,
         education = excluded.education,
         experience_years = excluded.experience_years,
         companies = excluded.companies,
         practice_areas = excluded.practice_areas`
    ).run({
      id: "rohit-1",
      fullName: parsed.fullName ?? "",
      email: "rohit.gupta@example.com",
      education: parsed.education ?? "",
      experienceYears: parsed.experienceYears ?? 0,
      companies: JSON.stringify(parsed.companies ?? []),
      practiceAreas: JSON.stringify(parsed.practiceAreas ?? []),
    });

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("parse-resume error:", err);
    return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 });
  }
}
