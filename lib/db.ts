import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "meti.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS candidates (
    id TEXT PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE,
    education TEXT,
    experience_years INTEGER,
    companies TEXT,
    practice_areas TEXT
  );
  CREATE TABLE IF NOT EXISTS competency_scores (
    id TEXT PRIMARY KEY,
    candidate_id TEXT UNIQUE,
    cci INTEGER DEFAULT 84,
    cpi INTEGER DEFAULT 88,
    cri TEXT DEFAULT 'Ready - Senior Path',
    evidence_confidence INTEGER DEFAULT 92,
    scores_json TEXT
  );
`);

const { c } = db.prepare("SELECT COUNT(*) as c FROM candidates").get() as { c: number };

if (c === 0) {
  db.prepare(
    `INSERT INTO candidates (id, full_name, email, education, experience_years, companies, practice_areas)
     VALUES (@id, @fullName, @email, @education, @experienceYears, @companies, @practiceAreas)`
  ).run({
    id: "rohit-1",
    fullName: "Rohit Gupta",
    email: "rohit.gupta@example.com",
    education: "MBA, Indian Institute of Management",
    experienceYears: 6,
    companies: JSON.stringify(["Deloitte", "EY"]),
    practiceAreas: JSON.stringify(["Strategy & Business Transformation", "Enterprise AI Advisory"]),
  });

  db.prepare(
    `INSERT INTO competency_scores (id, candidate_id, cci, cpi, cri, evidence_confidence, scores_json)
     VALUES (@id, @candidateId, @cci, @cpi, @cri, @evidenceConfidence, @scoresJson)`
  ).run({
    id: "score-1",
    candidateId: "rohit-1",
    cci: 84,
    cpi: 88,
    cri: "Ready - Senior Path",
    evidenceConfidence: 92,
    scoresJson: JSON.stringify({
      "Operating Model (L1)": 62,
      "Value Chain (L2)": 68,
      "Enterprise Strategy (C01)": 81,
      "Executive Writing & Speaking (C15)": 79,
    }),
  });
}

export default db;
