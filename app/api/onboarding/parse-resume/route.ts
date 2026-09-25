import { NextRequest, NextResponse } from "next/server";
import db, { CANDIDATE_ID } from "@/lib/db";
import { safeGroqJSON } from "@/lib/groq";

const FALLBACK = {
  fullName: "Rohit Gupta",
  education: "MBA, Indian Institute of Management Ahmedabad",
  experienceYears: 7,
  companies: ["Kearney", "Tata Consultancy Services"],
  industries: ["Financial Services", "Retail & Consumer"],
  suggestedPracticeAreas: ["Strategy & Business Transformation", "Enterprise AI Advisory"],
};

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();

    const parsed = await safeGroqJSON(
      "Extract candidate profile data from the resume text. Respond with ONLY valid JSON, no prose, matching exactly: " +
        `{"fullName": string, "education": string, "experienceYears": number, "companies": string[], "industries": string[], "suggestedPracticeAreas": string[]}`,
      resumeText,
      FALLBACK
    );

    db.prepare(
      `INSERT INTO candidates (id, full_name, email, education, experience_years, companies, industries, practice_areas)
       VALUES (@id, @fullName, @email, @education, @experienceYears, @companies, @industries, @practiceAreas)
       ON CONFLICT(id) DO UPDATE SET
         full_name = excluded.full_name, education = excluded.education,
         experience_years = excluded.experience_years, companies = excluded.companies,
         industries = excluded.industries, practice_areas = excluded.practice_areas`
    ).run({
      id: CANDIDATE_ID,
      fullName: parsed.fullName ?? FALLBACK.fullName,
      email: "rohit.gupta@example.com",
      education: parsed.education ?? FALLBACK.education,
      experienceYears: parsed.experienceYears ?? FALLBACK.experienceYears,
      companies: JSON.stringify(parsed.companies ?? FALLBACK.companies),
      industries: JSON.stringify(parsed.industries ?? FALLBACK.industries),
      practiceAreas: JSON.stringify(parsed.suggestedPracticeAreas ?? FALLBACK.suggestedPracticeAreas),
    });

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[parse-resume] error:", err);
    return NextResponse.json(FALLBACK, { status: 200 });
  }
}
