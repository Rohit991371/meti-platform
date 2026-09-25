import { NextRequest, NextResponse } from "next/server";
import db, { CANDIDATE_ID } from "@/lib/db";

const PATTERN_ROTATION = ["SINGLE_CHOICE", "MULTI_SELECT", "DRAWING_CANVAS"];

function getSession(candidateId: string) {
  let session = db
    .prepare(`SELECT * FROM assessment_sessions WHERE candidate_id = ? AND completed = FALSE`)
    .get(candidateId) as any;
  if (!session) {
    const id = `sess-${Date.now()}`;
    db.prepare(
      `INSERT INTO assessment_sessions (id, candidate_id, current_step, accumulated_score, current_difficulty, completed)
       VALUES (?, ?, 1, 0, 2, FALSE)`
    ).run(id, candidateId);
    session = db.prepare(`SELECT * FROM assessment_sessions WHERE id = ?`).get(id);
  }
  return session;
}

export async function POST(req: NextRequest) {
  try {
    const { candidateId: rawId, lastQuestionId, lastResponse } = await req.json();
    const candidateId = rawId || CANDIDATE_ID;
    const session = getSession(candidateId);

    let difficulty = session.current_difficulty;
    let accumulated = session.accumulated_score;

    // Score the previous answer and adapt difficulty.
    if (lastQuestionId) {
      const prevQ = db.prepare(`SELECT * FROM question_bank WHERE id = ?`).get(lastQuestionId) as any;
      let isCorrect = false;
      if (prevQ?.correct_answer) {
        try {
          const correct = JSON.parse(prevQ.correct_answer);
          isCorrect = Array.isArray(correct)
            ? Array.isArray(lastResponse) && correct.sort().join() === [...lastResponse].sort().join()
            : correct === lastResponse;
        } catch {
          isCorrect = prevQ.correct_answer === lastResponse;
        }
      }
      difficulty = Math.max(1, Math.min(4, difficulty + (isCorrect ? 1 : -1)));
      accumulated += isCorrect ? 10 : 0;

      db.prepare(
        `INSERT INTO served_questions (id, candidate_id, question_id, candidate_response, is_correct)
         VALUES (?, ?, ?, ?, ?)`
      ).run(`sq-${Date.now()}`, candidateId, lastQuestionId, JSON.stringify(lastResponse ?? null), isCorrect ? 1 : 0);
    }

    const nextStep = session.current_step + (lastQuestionId ? 1 : 0);
    const nextPattern = PATTERN_ROTATION[(nextStep - 1) % PATTERN_ROTATION.length];

    const nextQuestion = db
      .prepare(
        `SELECT * FROM question_bank
         WHERE pattern_type = ?
           AND id NOT IN (SELECT question_id FROM served_questions WHERE candidate_id = ?)
         ORDER BY ABS(difficulty_level - ?) ASC
         LIMIT 1`
      )
      .get(nextPattern, candidateId, difficulty) as any;

    db.prepare(
      `UPDATE assessment_sessions SET current_step = ?, accumulated_score = ?, current_difficulty = ?, completed = ?
       WHERE id = ?`
    ).run(nextStep, accumulated, difficulty, nextQuestion ? 0 : 1, session.id);

    if (!nextQuestion) {
      return NextResponse.json({ done: true, accumulatedScore: accumulated });
    }

    return NextResponse.json({
      done: false,
      question: {
        id: nextQuestion.id,
        competencyCode: nextQuestion.competency_code,
        patternType: nextQuestion.pattern_type,
        prompt: nextQuestion.prompt,
        options: JSON.parse(nextQuestion.options_json || "[]"),
        difficultyLevel: nextQuestion.difficulty_level,
      },
      currentDifficulty: difficulty,
      accumulatedScore: accumulated,
    });
  } catch (err) {
    console.error("[assessment/next-question] error:", err);
    return NextResponse.json(
      {
        done: false,
        question: {
          id: "fallback-q",
          competencyCode: "C01",
          patternType: "SINGLE_CHOICE",
          prompt: "Which lever most directly improves client margin in the short term?",
          options: ["Cost reduction", "Brand refresh", "Office relocation", "Logo redesign"],
          difficultyLevel: 2,
        },
        currentDifficulty: 2,
        accumulatedScore: 0,
      },
      { status: 200 }
    );
  }
}
