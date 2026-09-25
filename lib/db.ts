// import Database from "better-sqlite3";
// import path from "path";

// const db = new Database(path.join(process.cwd(), "local.db"));
// db.pragma("journal_mode = WAL");

// db.exec(`
//   CREATE TABLE IF NOT EXISTS candidates (
//     id TEXT PRIMARY KEY,
//     full_name TEXT NOT NULL,
//     email TEXT UNIQUE NOT NULL,
//     education TEXT,
//     experience_years INTEGER,
//     companies TEXT,
//     industries TEXT,
//     practice_areas TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS entitlements (
//     id TEXT PRIMARY KEY,
//     candidate_id TEXT NOT NULL,
//     product_code TEXT NOT NULL,
//     status TEXT DEFAULT 'ACTIVE',
//     activated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS question_bank (
//     id TEXT PRIMARY KEY,
//     competency_code TEXT NOT NULL,
//     difficulty_level INTEGER DEFAULT 1,
//     pattern_type TEXT NOT NULL,
//     prompt TEXT NOT NULL,
//     options_json TEXT,
//     correct_answer TEXT,
//     domain_tag TEXT
//   );

//   CREATE TABLE IF NOT EXISTS assessment_sessions (
//     id TEXT PRIMARY KEY,
//     candidate_id TEXT NOT NULL,
//     current_step INTEGER DEFAULT 1,
//     accumulated_score REAL DEFAULT 0.0,
//     current_difficulty INTEGER DEFAULT 2,
//     completed BOOLEAN DEFAULT FALSE,
//     started_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS served_questions (
//     id TEXT PRIMARY KEY,
//     candidate_id TEXT NOT NULL,
//     question_id TEXT NOT NULL,
//     candidate_response TEXT,
//     is_correct BOOLEAN,
//     served_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS visual_artifacts (
//     id TEXT PRIMARY KEY,
//     candidate_id TEXT NOT NULL,
//     question_id TEXT,
//     artifact_type TEXT,
//     image_base64 TEXT NOT NULL,
//     svg_json TEXT,
//     evaluated_score INTEGER,
//     feedback TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS video_submissions (
//     id TEXT PRIMARY KEY,
//     candidate_id TEXT NOT NULL,
//     prompt_id TEXT NOT NULL,
//     transcript_text TEXT NOT NULL,
//     wpm INTEGER,
//     filler_count INTEGER,
//     confidence_score INTEGER,
//     sentiment_tone TEXT,
//     pyramid_structure_score INTEGER,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS case_submissions (
//     id TEXT PRIMARY KEY,
//     candidate_id TEXT NOT NULL,
//     issue_tree_json TEXT NOT NULL,
//     memo_text TEXT NOT NULL,
//     ai_mode TEXT NOT NULL,
//     problem_structuring_score INTEGER DEFAULT 85,
//     is_draft BOOLEAN DEFAULT FALSE,
//     submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS competency_scores (
//     id TEXT PRIMARY KEY,
//     candidate_id TEXT UNIQUE NOT NULL,
//     cci INTEGER DEFAULT 84,
//     cpi INTEGER DEFAULT 88,
//     cri TEXT DEFAULT 'Ready - Senior Path',
//     evidence_confidence INTEGER DEFAULT 92,
//     competency_vector TEXT NOT NULL,
//     schwartz_values TEXT NOT NULL,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS audit_overrides (
//     id TEXT PRIMARY KEY,
//     reviewer_name TEXT NOT NULL,
//     candidate_id TEXT NOT NULL,
//     competency_code TEXT NOT NULL,
//     old_score INTEGER NOT NULL,
//     new_score INTEGER NOT NULL,
//     reason TEXT NOT NULL,
//     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
//   );
// `);

// const CANDIDATE_ID = "candidate-rohit-123";

// const { c } = db.prepare("SELECT COUNT(*) as c FROM candidates").get() as { c: number };

// if (c === 0) {
//   db.prepare(
//     `INSERT INTO candidates (id, full_name, email, education, experience_years, companies, industries, practice_areas)
//      VALUES (@id, @fullName, @email, @education, @experienceYears, @companies, @industries, @practiceAreas)`
//   ).run({
//     id: CANDIDATE_ID,
//     fullName: "Rohit Gupta",
//     email: "rohit.gupta@example.com",
//     education: "MBA, Indian Institute of Management Ahmedabad",
//     experienceYears: 7,
//     companies: JSON.stringify(["Kearney", "Tata Consultancy Services", "Flipkart Strategy Office"]),
//     industries: JSON.stringify(["Financial Services", "Retail & Consumer", "Technology"]),
//     practiceAreas: JSON.stringify(["Strategy & Business Transformation", "Operating Model / TOM Design", "Enterprise AI Advisory"]),
//   });

//   db.prepare(
//     `INSERT INTO entitlements (id, candidate_id, product_code, status) VALUES (?, ?, 'COMBO-A', 'ACTIVE')`
//   ).run("ent-seed-1", CANDIDATE_ID);

//   const questions = [
//     {
//       id: "q-001",
//       competency_code: "C01",
//       difficulty_level: 2,
//       pattern_type: "SINGLE_CHOICE",
//       prompt: "A client's operating cost is rising faster than revenue. Which lever addresses root cause fastest?",
//       options_json: JSON.stringify(["Renegotiate vendor contracts", "Redesign the operating model", "Freeze hiring", "Launch a marketing campaign"]),
//       correct_answer: "Redesign the operating model",
//       domain_tag: "Operating Model",
//     },
//     {
//       id: "q-002",
//       competency_code: "C04",
//       difficulty_level: 2,
//       pattern_type: "SINGLE_CHOICE",
//       prompt: "In a value chain diagnostic, which stage typically hides the most cost leakage in a retail fulfilment network?",
//       options_json: JSON.stringify(["Last-mile delivery", "Marketing", "Executive compensation", "Legal compliance"]),
//       correct_answer: "Last-mile delivery",
//       domain_tag: "Value Chain",
//     },
//     {
//       id: "q-003",
//       competency_code: "C09",
//       difficulty_level: 3,
//       pattern_type: "MULTI_SELECT",
//       prompt: "Select all THREE risks most likely to derail a large-scale transformation programme.",
//       options_json: JSON.stringify(["Lack of executive sponsorship", "Unclear governance ownership", "Change fatigue among staff", "Too many status meetings"]),
//       correct_answer: JSON.stringify(["Lack of executive sponsorship", "Unclear governance ownership", "Change fatigue among staff"]),
//       domain_tag: "Change Management",
//     },
//     {
//       id: "q-004",
//       competency_code: "C13",
//       difficulty_level: 3,
//       pattern_type: "MULTI_SELECT",
//       prompt: "Which THREE elements belong in a MECE issue tree for a declining-margin diagnostic?",
//       options_json: JSON.stringify(["Revenue drivers", "Cost drivers", "Competitor social media activity", "Pricing structure"]),
//       correct_answer: JSON.stringify(["Revenue drivers", "Cost drivers", "Pricing structure"]),
//       domain_tag: "Problem Structuring",
//     },
//     {
//       id: "q-005",
//       competency_code: "C07",
//       difficulty_level: 3,
//       pattern_type: "DRAWING_CANVAS",
//       prompt: "Sketch a Target Operating Model showing governance, process, and technology layers for a mid-size retail bank.",
//       options_json: JSON.stringify({ canvasType: "TOM_SKETCH", guidance: "Include at least 3 layers and their connections." }),
//       correct_answer: null,
//       domain_tag: "Operating Model",
//     },
//     {
//       id: "q-006",
//       competency_code: "C06",
//       difficulty_level: 2,
//       pattern_type: "DRAWING_CANVAS",
//       prompt: "Map the current-state BPMN workflow for a client's order-to-cash process, highlighting bottlenecks.",
//       options_json: JSON.stringify({ canvasType: "BPMN_PROCESS", guidance: "Mark at least one bottleneck node." }),
//       correct_answer: null,
//       domain_tag: "Process Design",
//     },
//   ];

//   const insertQ = db.prepare(
//     `INSERT INTO question_bank (id, competency_code, difficulty_level, pattern_type, prompt, options_json, correct_answer, domain_tag)
//      VALUES (@id, @competency_code, @difficulty_level, @pattern_type, @prompt, @options_json, @correct_answer, @domain_tag)`
//   );
//   for (const q of questions) insertQ.run(q);

//   db.prepare(
//     `INSERT INTO competency_scores (id, candidate_id, cci, cpi, cri, evidence_confidence, competency_vector, schwartz_values)
//      VALUES (?, ?, 84, 88, 'Ready - Senior Path', 92, ?, ?)`
//   ).run(
//     "score-seed-1",
//     CANDIDATE_ID,
//     JSON.stringify([
//       { code: "C01", name: "Enterprise Strategy", level: 3 },
//       { code: "C04", name: "Value Chain Transformation", level: 3 },
//       { code: "C06", name: "Process Design", level: 2 },
//       { code: "C07", name: "Target Operating Model Design", level: 2 },
//       { code: "C09", name: "Change Management", level: 3 },
//       { code: "C13", name: "Problem Structuring", level: 4 },
//       { code: "C15", name: "Executive Writing & Speaking", level: 3 },
//     ]),
//     JSON.stringify([
//       { name: "Achievement", score: 82 },
//       { name: "Self-Direction", score: 76 },
//       { name: "Security", score: 61 },
//       { name: "Universalism", score: 58 },
//     ])
//   );

//   const overrides = [
//     { id: "ovr-1", reviewer_name: "Dr. Anjali Mehta", candidate_id: CANDIDATE_ID, competency_code: "C07", old_score: 2, new_score: 3, reason: "TOM sketch showed stronger governance layering than AI rubric credited." },
//     { id: "ovr-2", reviewer_name: "James Whitfield", candidate_id: CANDIDATE_ID, competency_code: "C15", old_score: 3, new_score: 3, reason: "Confirmed AI score after reviewing video transcript structure." },
//   ];
//   const insertOvr = db.prepare(
//     `INSERT INTO audit_overrides (id, reviewer_name, candidate_id, competency_code, old_score, new_score, reason)
//      VALUES (@id, @reviewer_name, @candidate_id, @competency_code, @old_score, @new_score, @reason)`
//   );
//   for (const o of overrides) insertOvr.run(o);
// }

// export default db;
// export { CANDIDATE_ID };



// EMERGENCY REPLACEMENT: pure in-memory JS store, zero native dependencies.
// Mimics better-sqlite3's db.prepare(sql).run()/.get()/.all() shape exactly,
// so every existing route file keeps working unchanged.

export const CANDIDATE_ID = "candidate-rohit-123";

type Row = Record<string, any>;

const tables: Record<string, Row[]> = {
  candidates: [],
  entitlements: [],
  question_bank: [],
  assessment_sessions: [],
  served_questions: [],
  visual_artifacts: [],
  video_submissions: [],
  case_submissions: [],
  competency_scores: [],
  audit_overrides: [],
};

function norm(sql: string) {
  return sql.replace(/\s+/g, " ").trim();
}

type Handler = (args: any[]) => any;
const handlers = new Map<string, Handler>();
function reg(sql: string, fn: Handler) {
  handlers.set(norm(sql), fn);
}

const now = () => new Date().toISOString();

reg(`SELECT * FROM audit_overrides ORDER BY timestamp DESC`, () =>
  [...tables.audit_overrides].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
);

reg(
  `INSERT INTO audit_overrides (id, reviewer_name, candidate_id, competency_code, old_score, new_score, reason)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ([id, reviewer_name, candidate_id, competency_code, old_score, new_score, reason]) => {
    tables.audit_overrides.push({ id, reviewer_name, candidate_id, competency_code, old_score, new_score, reason, timestamp: now() });
    return { changes: 1 };
  }
);

reg(`SELECT * FROM assessment_sessions WHERE candidate_id = ? AND completed = FALSE`, ([candidate_id]) =>
  tables.assessment_sessions.find((r) => r.candidate_id === candidate_id && !r.completed)
);

reg(
  `INSERT INTO assessment_sessions (id, candidate_id, current_step, accumulated_score, current_difficulty, completed)
   VALUES (?, ?, 1, 0, 2, FALSE)`,
  ([id, candidate_id]) => {
    tables.assessment_sessions.push({ id, candidate_id, current_step: 1, accumulated_score: 0, current_difficulty: 2, completed: false, started_at: now() });
    return { changes: 1 };
  }
);

reg(`SELECT * FROM assessment_sessions WHERE id = ?`, ([id]) => tables.assessment_sessions.find((r) => r.id === id));

reg(`SELECT * FROM question_bank WHERE id = ?`, ([id]) => tables.question_bank.find((r) => r.id === id));

reg(
  `INSERT INTO served_questions (id, candidate_id, question_id, candidate_response, is_correct)
   VALUES (?, ?, ?, ?, ?)`,
  ([id, candidate_id, question_id, candidate_response, is_correct]) => {
    tables.served_questions.push({ id, candidate_id, question_id, candidate_response, is_correct, served_at: now() });
    return { changes: 1 };
  }
);

reg(
  `SELECT * FROM question_bank
   WHERE pattern_type = ?
     AND id NOT IN (SELECT question_id FROM served_questions WHERE candidate_id = ?)
   ORDER BY ABS(difficulty_level - ?) ASC
   LIMIT 1`,
  ([pattern_type, candidate_id, difficulty]) => {
    const served = new Set(tables.served_questions.filter((r) => r.candidate_id === candidate_id).map((r) => r.question_id));
    const pool = tables.question_bank.filter((r) => r.pattern_type === pattern_type && !served.has(r.id));
    pool.sort((a, b) => Math.abs(a.difficulty_level - difficulty) - Math.abs(b.difficulty_level - difficulty));
    return pool[0];
  }
);

reg(
  `UPDATE assessment_sessions SET current_step = ?, accumulated_score = ?, current_difficulty = ?, completed = ?
   WHERE id = ?`,
  ([current_step, accumulated_score, current_difficulty, completed, id]) => {
    const row = tables.assessment_sessions.find((r) => r.id === id);
    if (row) Object.assign(row, { current_step, accumulated_score, current_difficulty, completed: !!completed });
    return { changes: row ? 1 : 0 };
  }
);

reg(
  `INSERT INTO visual_artifacts (id, candidate_id, question_id, artifact_type, image_base64, svg_json, evaluated_score, feedback)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ([id, candidate_id, question_id, artifact_type, image_base64, svg_json, evaluated_score, feedback]) => {
    tables.visual_artifacts.push({ id, candidate_id, question_id, artifact_type, image_base64, svg_json, evaluated_score, feedback, created_at: now() });
    return { changes: 1 };
  }
);

reg(
  `INSERT INTO video_submissions (id, candidate_id, prompt_id, transcript_text, wpm, filler_count, confidence_score, sentiment_tone, pyramid_structure_score)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ([id, candidate_id, prompt_id, transcript_text, wpm, filler_count, confidence_score, sentiment_tone, pyramid_structure_score]) => {
    tables.video_submissions.push({ id, candidate_id, prompt_id, transcript_text, wpm, filler_count, confidence_score, sentiment_tone, pyramid_structure_score, created_at: now() });
    return { changes: 1 };
  }
);

reg(`SELECT * FROM competency_scores WHERE candidate_id = ?`, ([candidate_id]) =>
  tables.competency_scores.find((r) => r.candidate_id === candidate_id)
);

reg(
  `UPDATE competency_scores SET competency_vector = ?, updated_at = CURRENT_TIMESTAMP WHERE candidate_id = ?`,
  ([competency_vector, candidate_id]) => {
    const row = tables.competency_scores.find((r) => r.candidate_id === candidate_id);
    if (row) {
      row.competency_vector = competency_vector;
      row.updated_at = now();
    }
    return { changes: row ? 1 : 0 };
  }
);

reg(
  `INSERT INTO case_submissions (id, candidate_id, issue_tree_json, memo_text, ai_mode, problem_structuring_score, is_draft)
   VALUES (?, ?, ?, ?, ?, ?, FALSE)`,
  ([id, candidate_id, issue_tree_json, memo_text, ai_mode, problem_structuring_score]) => {
    tables.case_submissions.push({ id, candidate_id, issue_tree_json, memo_text, ai_mode, problem_structuring_score, is_draft: false, submitted_at: now() });
    return { changes: 1 };
  }
);

reg(
  `INSERT INTO case_submissions (id, candidate_id, issue_tree_json, memo_text, ai_mode, is_draft)
   VALUES (?, ?, ?, ?, ?, TRUE)`,
  ([id, candidate_id, issue_tree_json, memo_text, ai_mode]) => {
    tables.case_submissions.push({ id, candidate_id, issue_tree_json, memo_text, ai_mode, problem_structuring_score: 85, is_draft: true, submitted_at: now() });
    return { changes: 1 };
  }
);

reg(`INSERT INTO entitlements (id, candidate_id, product_code, status) VALUES (?, ?, ?, 'ACTIVE')`, ([id, candidate_id, product_code]) => {
  tables.entitlements.push({ id, candidate_id, product_code, status: "ACTIVE", activated_at: now() });
  return { changes: 1 };
});

reg(`SELECT product_code FROM entitlements WHERE candidate_id = ? AND status = 'ACTIVE'`, ([candidate_id]) =>
  tables.entitlements.filter((r) => r.candidate_id === candidate_id && r.status === "ACTIVE").map((r) => ({ product_code: r.product_code }))
);

reg(
  `INSERT INTO candidates (id, full_name, email, education, experience_years, companies, industries, practice_areas)
   VALUES (@id, @fullName, @email, @education, @experienceYears, @companies, @industries, @practiceAreas)
   ON CONFLICT(id) DO UPDATE SET
     full_name = excluded.full_name, education = excluded.education,
     experience_years = excluded.experience_years, companies = excluded.companies,
     industries = excluded.industries, practice_areas = excluded.practice_areas`,
  ([p]) => {
    let row = tables.candidates.find((r) => r.id === p.id);
    if (row) {
      Object.assign(row, {
        full_name: p.fullName,
        education: p.education,
        experience_years: p.experienceYears,
        companies: p.companies,
        industries: p.industries,
        practice_areas: p.practiceAreas,
      });
    } else {
      row = {
        id: p.id,
        full_name: p.fullName,
        email: p.email,
        education: p.education,
        experience_years: p.experienceYears,
        companies: p.companies,
        industries: p.industries,
        practice_areas: p.practiceAreas,
        created_at: now(),
      };
      tables.candidates.push(row);
    }
    return { changes: 1 };
  }
);

reg(`SELECT * FROM video_submissions WHERE candidate_id = ?`, ([candidate_id]) => tables.video_submissions.filter((r) => r.candidate_id === candidate_id));

reg(`SELECT * FROM case_submissions WHERE candidate_id = ? AND is_draft = FALSE`, ([candidate_id]) =>
  tables.case_submissions.filter((r) => r.candidate_id === candidate_id && !r.is_draft)
);

reg(`SELECT * FROM visual_artifacts WHERE candidate_id = ?`, ([candidate_id]) => tables.visual_artifacts.filter((r) => r.candidate_id === candidate_id));

function prepare(sql: string) {
  const handler = handlers.get(norm(sql));
  if (!handler) {
    console.error("[fake-db] No handler registered for query:\n", norm(sql));
  }
  const call = (...args: any[]) => (handler ? handler(args) : undefined);
  return { run: call, get: call, all: (...args: any[]) => (handler ? handler(args) ?? [] : []) };
}

const db = { prepare, exec: () => {}, pragma: () => {} };
export default db;

// ---- seed data (runs once, at module load) ----
if (tables.candidates.length === 0) {
  tables.candidates.push({
    id: CANDIDATE_ID,
    full_name: "Rohit Gupta",
    email: "rohit.gupta@example.com",
    education: "MBA, Indian Institute of Management Ahmedabad",
    experience_years: 7,
    companies: JSON.stringify(["Kearney", "Tata Consultancy Services", "Flipkart Strategy Office"]),
    industries: JSON.stringify(["Financial Services", "Retail & Consumer", "Technology"]),
    practice_areas: JSON.stringify(["Strategy & Business Transformation", "Operating Model / TOM Design", "Enterprise AI Advisory"]),
    created_at: now(),
  });

  tables.entitlements.push({ id: "ent-seed-1", candidate_id: CANDIDATE_ID, product_code: "COMBO-A", status: "ACTIVE", activated_at: now() });

  tables.question_bank.push(
    {
      id: "q-001",
      competency_code: "C01",
      difficulty_level: 2,
      pattern_type: "SINGLE_CHOICE",
      prompt: "A client's operating cost is rising faster than revenue. Which lever addresses root cause fastest?",
      options_json: JSON.stringify(["Renegotiate vendor contracts", "Redesign the operating model", "Freeze hiring", "Launch a marketing campaign"]),
      correct_answer: JSON.stringify("Redesign the operating model"),
      domain_tag: "Operating Model",
    },
    {
      id: "q-002",
      competency_code: "C04",
      difficulty_level: 2,
      pattern_type: "SINGLE_CHOICE",
      prompt: "In a value chain diagnostic, which stage typically hides the most cost leakage in a retail fulfilment network?",
      options_json: JSON.stringify(["Last-mile delivery", "Marketing", "Executive compensation", "Legal compliance"]),
      correct_answer: JSON.stringify("Last-mile delivery"),
      domain_tag: "Value Chain",
    },
    {
      id: "q-003",
      competency_code: "C09",
      difficulty_level: 3,
      pattern_type: "MULTI_SELECT",
      prompt: "Select all THREE risks most likely to derail a large-scale transformation programme.",
      options_json: JSON.stringify(["Lack of executive sponsorship", "Unclear governance ownership", "Change fatigue among staff", "Too many status meetings"]),
      correct_answer: JSON.stringify(["Lack of executive sponsorship", "Unclear governance ownership", "Change fatigue among staff"]),
      domain_tag: "Change Management",
    },
    {
      id: "q-004",
      competency_code: "C13",
      difficulty_level: 3,
      pattern_type: "MULTI_SELECT",
      prompt: "Which THREE elements belong in a MECE issue tree for a declining-margin diagnostic?",
      options_json: JSON.stringify(["Revenue drivers", "Cost drivers", "Competitor social media activity", "Pricing structure"]),
      correct_answer: JSON.stringify(["Revenue drivers", "Cost drivers", "Pricing structure"]),
      domain_tag: "Problem Structuring",
    },
    {
      id: "q-005",
      competency_code: "C07",
      difficulty_level: 3,
      pattern_type: "DRAWING_CANVAS",
      prompt: "Sketch a Target Operating Model showing governance, process, and technology layers for a mid-size retail bank.",
      options_json: JSON.stringify({ canvasType: "TOM_SKETCH", guidance: "Include at least 3 layers and their connections." }),
      correct_answer: null,
      domain_tag: "Operating Model",
    },
    {
      id: "q-006",
      competency_code: "C06",
      difficulty_level: 2,
      pattern_type: "DRAWING_CANVAS",
      prompt: "Map the current-state BPMN workflow for a client's order-to-cash process, highlighting bottlenecks.",
      options_json: JSON.stringify({ canvasType: "BPMN_PROCESS", guidance: "Mark at least one bottleneck node." }),
      correct_answer: null,
      domain_tag: "Process Design",
    }
  );

  tables.competency_scores.push({
    id: "score-seed-1",
    candidate_id: CANDIDATE_ID,
    cci: 84,
    cpi: 88,
    cri: "Ready - Senior Path",
    evidence_confidence: 92,
    competency_vector: JSON.stringify([
      { code: "C01", name: "Enterprise Strategy", level: 3 },
      { code: "C04", name: "Value Chain Transformation", level: 3 },
      { code: "C06", name: "Process Design", level: 2 },
      { code: "C07", name: "Target Operating Model Design", level: 2 },
      { code: "C09", name: "Change Management", level: 3 },
      { code: "C13", name: "Problem Structuring", level: 4 },
      { code: "C15", name: "Executive Writing & Speaking", level: 3 },
    ]),
    schwartz_values: JSON.stringify([
      { name: "Achievement", score: 82 },
      { name: "Self-Direction", score: 76 },
      { name: "Security", score: 61 },
      { name: "Universalism", score: 58 },
    ]),
    updated_at: now(),
  });

  tables.audit_overrides.push(
    {
      id: "ovr-1",
      reviewer_name: "Dr. Anjali Mehta",
      candidate_id: CANDIDATE_ID,
      competency_code: "C07",
      old_score: 2,
      new_score: 3,
      reason: "TOM sketch showed stronger governance layering than AI rubric credited.",
      timestamp: now(),
    },
    {
      id: "ovr-2",
      reviewer_name: "James Whitfield",
      candidate_id: CANDIDATE_ID,
      competency_code: "C15",
      old_score: 3,
      new_score: 3,
      reason: "Confirmed AI score after reviewing video transcript structure.",
      timestamp: now(),
    }
  );
}