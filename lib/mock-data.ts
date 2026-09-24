import type {
  Competency,
  CompetencyScore,
  ProductOffer,
  CandidateProfile,
  AssessmentQuestion,
  SchwartzValue,
  ScoreIndices,
  RoadmapMilestone,
  TargetRoleMatch,
  CalibrationMetric,
  OverrideLogEntry,
} from "./types";

export const CANDIDATE: CandidateProfile = {
  id: "cand-10492",
  fullName: "Rohit Gupta",
  targetRole: "Enterprise Transformation Lead",
  email: "rohit.gupta@example.com",
  education: "MBA, Indian Institute of Management Ahmedabad",
  yearsExperience: 7,
  pastCompanies: ["Kearney", "Tata Consultancy Services", "Flipkart Strategy Office"],
  practiceAreas: ["Strategy & Business Transformation", "Operating Model / TOM Design", "Enterprise AI Advisory"],
  primaryIndustries: ["Financial Services", "Retail & Consumer", "Technology"],
  enterpriseId: "MET-EN-2291",
  avatarInitials: "RG",
};

export const COMPETENCIES: Competency[] = [
  { id: "C01", name: "Enterprise Strategy", group: "Strategy & Analysis", description: "Ability to craft and stress-test enterprise-level strategic direction." },
  { id: "C02", name: "Research & Insight", group: "Strategy & Analysis", description: "Synthesizing market and client data into actionable insight." },
  { id: "C03", name: "Competitive Benchmarking", group: "Strategy & Analysis", description: "Positioning clients relative to market and peer set." },
  { id: "C04", name: "Value Chain Transformation", group: "Transformation & Process", description: "Redesigning end-to-end value chains for efficiency and growth." },
  { id: "C05", name: "Business Analysis", group: "Strategy & Analysis", description: "Structuring ambiguous business problems into testable components." },
  { id: "C06", name: "Process Design", group: "Transformation & Process", description: "Re-engineering operational processes for scale." },
  { id: "C07", name: "Target Operating Model Design", group: "Transformation & Process", description: "Designing organization, governance and capability models." },
  { id: "C08", name: "Financial Modelling", group: "Strategy & Analysis", description: "Building robust business cases and financial models." },
  { id: "C09", name: "Change Management", group: "Transformation & Process", description: "Leading organizational adoption of transformation initiatives." },
  { id: "C10", name: "Stakeholder Management", group: "Soft Skills & Communication", description: "Navigating senior stakeholder dynamics and alignment." },
  { id: "C11", name: "Programme Governance", group: "Execution & AI", description: "Structuring delivery governance for large transformation programmes." },
  { id: "C12", name: "Enterprise AI Awareness", group: "Execution & AI", description: "Applying AI/GenAI capability to enterprise problems responsibly." },
  { id: "C13", name: "Problem Structuring", group: "Soft Skills & Communication", description: "Issue-tree based decomposition of complex problems." },
  { id: "C14", name: "Data-Driven Decision Making", group: "Execution & AI", description: "Using data and analytics to drive recommendations." },
  { id: "C15", name: "Executive Writing & Speaking", group: "Soft Skills & Communication", description: "Communicating crisply to senior/executive audiences." },
  { id: "C16", name: "Client Relationship Management", group: "Soft Skills & Communication", description: "Building trusted advisor relationships with clients." },
  { id: "C17", name: "Professional Judgement & Ethics", group: "Soft Skills & Communication", description: "Sound, ethical judgement under ambiguity and pressure." },
  { id: "C18", name: "Risk & Controls Awareness", group: "Execution & AI", description: "Identifying and mitigating programme and enterprise risk." },
  { id: "C19", name: "Team Leadership", group: "Soft Skills & Communication", description: "Leading and developing high-performing consulting teams." },
  { id: "C20", name: "Innovation & Growth Design", group: "Transformation & Process", description: "Designing new growth vectors and innovation pipelines." },
];

export const COMPETENCY_SCORES: CompetencyScore[] = [
  { competencyId: "C01", candidateLevel: 3, benchmarkLevel: 3, evidenceConfidence: 91 },
  { competencyId: "C02", candidateLevel: 4, benchmarkLevel: 3, evidenceConfidence: 95 },
  { competencyId: "C03", candidateLevel: 3, benchmarkLevel: 2, evidenceConfidence: 88 },
  { competencyId: "C04", candidateLevel: 3, benchmarkLevel: 3, evidenceConfidence: 90 },
  { competencyId: "C05", candidateLevel: 4, benchmarkLevel: 3, evidenceConfidence: 96 },
  { competencyId: "C06", candidateLevel: 2, benchmarkLevel: 3, evidenceConfidence: 74 },
  { competencyId: "C07", candidateLevel: 2, benchmarkLevel: 3, evidenceConfidence: 68 },
  { competencyId: "C08", candidateLevel: 3, benchmarkLevel: 3, evidenceConfidence: 87 },
  { competencyId: "C09", candidateLevel: 3, benchmarkLevel: 2, evidenceConfidence: 89 },
  { competencyId: "C10", candidateLevel: 4, benchmarkLevel: 3, evidenceConfidence: 93 },
  { competencyId: "C11", candidateLevel: 2, benchmarkLevel: 3, evidenceConfidence: 71 },
  { competencyId: "C12", candidateLevel: 3, benchmarkLevel: 2, evidenceConfidence: 85 },
  { competencyId: "C13", candidateLevel: 4, benchmarkLevel: 3, evidenceConfidence: 97 },
  { competencyId: "C14", candidateLevel: 3, benchmarkLevel: 3, evidenceConfidence: 90 },
  { competencyId: "C15", candidateLevel: 4, benchmarkLevel: 3, evidenceConfidence: 94 },
  { competencyId: "C16", candidateLevel: 3, benchmarkLevel: 3, evidenceConfidence: 88 },
  { competencyId: "C17", candidateLevel: 3, benchmarkLevel: 3, evidenceConfidence: 92 },
  { competencyId: "C18", candidateLevel: 2, benchmarkLevel: 3, evidenceConfidence: 70 },
  { competencyId: "C19", candidateLevel: 3, benchmarkLevel: 2, evidenceConfidence: 86 },
  { competencyId: "C20", candidateLevel: 3, benchmarkLevel: 3, evidenceConfidence: 84 },
];

export const RADAR_GROUPS: { group: string; competencyIds: string[] }[] = [
  { group: "Strategy", competencyIds: ["C01", "C02", "C03", "C05"] },
  { group: "Value Chain & TOM", competencyIds: ["C04", "C06", "C07"] },
  { group: "AI Transformation", competencyIds: ["C11", "C12", "C14", "C18"] },
  { group: "Executive Communication", competencyIds: ["C10", "C15", "C16", "C19"] },
  { group: "Judgement & Structuring", competencyIds: ["C13", "C17", "C09", "C20"] },
];

export const PRODUCT_OFFERS: ProductOffer[] = [
  {
    tier: "MC-A",
    name: "Management Consulting Assessment",
    price: 25,
    focus: "Strategy, process, TOM, and problem structuring readiness.",
    includes: ["Core diagnostic across 12 consulting competencies", "Summary of Findings", "Case challenge + executive video response"],
  },
  {
    tier: "PV-A",
    name: "Professional Personality & Values",
    price: 25,
    focus: "Enterprise Talent DNA and Schwartz-informed values profile.",
    includes: ["Talent DNA behavioural profile", "Schwartz values wheel", "Personality Summary"],
  },
  {
    tier: "COMBO-A",
    name: "Combined Assessment Bundle",
    price: 40,
    recommended: true,
    focus: "Full consulting capability + personality profile, shared questions run once.",
    includes: ["Everything in MC-A", "Everything in PV-A", "Unified Client Readiness Index", "Priority queueing for human review"],
  },
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q-f02-01",
    moduleCode: "F02",
    section: "Section 3 of 6 · Value Chain & Operating Models",
    type: "single-select",
    prompt: "A retail client's fulfilment cost has risen 18% YoY despite flat order volumes. What is the first structural lens you'd apply?",
    helperText: "Choose the option that best reflects a structured, evidence-first approach.",
    options: [
      { id: "a", label: "Map the end-to-end value chain to isolate where cost is entering the system", description: "Structural, process-first diagnostic." },
      { id: "b", label: "Recommend an immediate headcount reduction in fulfilment centres", description: "Solution-first, low evidence." },
      { id: "c", label: "Benchmark against two competitors and copy their model", description: "External-reference shortcut." },
      { id: "d", label: "Survey warehouse staff for anecdotal causes", description: "Qualitative-only, low rigor." },
    ],
    competencyTags: ["C04", "C05", "C13"],
  },
  {
    id: "q-f02-02",
    moduleCode: "F02",
    section: "Section 3 of 6 · Value Chain & Operating Models",
    type: "multi-select",
    prompt: "Which of the following are valid components of a Target Operating Model (TOM) redesign? Select all that apply.",
    options: [
      { id: "a", label: "Organization design & governance" },
      { id: "b", label: "Process & workflow architecture" },
      { id: "c", label: "Office furniture procurement" },
      { id: "d", label: "Technology & data architecture" },
      { id: "e", label: "Performance management & incentives" },
    ],
    competencyTags: ["C07"],
  },
  {
    id: "q-f05-rank",
    moduleCode: "F05",
    section: "Section 4 of 6 · Talent DNA",
    type: "rank-4",
    prompt: "Rank the following in order of what drives you most at work, from 1 (most) to 4 (least).",
    helperText: "Drag to reorder, or use the up/down controls. No duplicate ranks allowed.",
    options: [
      { id: "a", label: "Solving ambiguous, high-stakes problems" },
      { id: "b", label: "Mentoring and developing junior talent" },
      { id: "c", label: "Delivering measurable client impact" },
      { id: "d", label: "Building durable, reusable frameworks" },
    ],
    competencyTags: ["C17", "C19"],
  },
  {
    id: "q-adaptive-01",
    moduleCode: "F09",
    section: "Section 5 of 6 · Adaptive Scenario",
    type: "adaptive-scenario",
    prompt: "Follow-up (triggered by your Strategy & Transformation domain selection): Your client's board wants a 90-day transformation roadmap, but the CFO privately tells you the real budget only covers 30 days of execution. What do you do?",
    helperText: "This question was dynamically inserted based on your selected practice area.",
    options: [
      { id: "a", label: "Design a phased roadmap with an honest 30-day funded core and a contingent 60-day extension" },
      { id: "b", label: "Present the full 90-day plan to the board as requested without raising the budget gap" },
      { id: "c", label: "Escalate the conflict directly to the board without consulting the CFO first" },
      { id: "d", label: "Scale down ambition silently and hope no one notices the mismatch" },
    ],
    competencyTags: ["C17", "C11", "C16"],
  },
  {
    id: "q-video-01",
    moduleCode: "F16",
    section: "Section 6 of 6 · Executive Presentation",
    type: "video-response",
    prompt: "In 2–5 minutes, present your recommendation for the fulfilment cost case to a simulated client CFO. Structure your answer using the Pyramid Principle.",
    helperText: "You have 30 seconds of prep time before recording begins.",
    competencyTags: ["C15", "C10"],
  },
];

export const SCHWARTZ_VALUES: SchwartzValue[] = [
  { id: "self-direction", name: "Self-Direction", group: "Openness to Change", score: 82 },
  { id: "stimulation", name: "Stimulation", group: "Openness to Change", score: 74 },
  { id: "hedonism", name: "Hedonism", group: "Openness to Change", score: 48 },
  { id: "achievement", name: "Achievement", group: "Self-Enhancement", score: 88 },
  { id: "power", name: "Power", group: "Self-Enhancement", score: 55 },
  { id: "security", name: "Security", group: "Conservation", score: 60 },
  { id: "conformity", name: "Conformity", group: "Conservation", score: 47 },
  { id: "tradition", name: "Tradition", group: "Conservation", score: 38 },
  { id: "benevolence", name: "Benevolence", group: "Self-Transcendence", score: 71 },
  { id: "universalism", name: "Universalism", group: "Self-Transcendence", score: 66 },
];

export const SCORE_INDICES: ScoreIndices = {
  cci: 84,
  cpi: 88,
  criLabel: "Ready · Senior Path",
  criScore: 86,
  evidenceConfidence: 92,
};

export const TARGET_ROLE_MATCHES: TargetRoleMatch[] = [
  { role: "Transformation Consultant", matchPercent: 89 },
  { role: "Enterprise Strategy Manager", matchPercent: 84 },
  { role: "TOM Design Lead", matchPercent: 71 },
  { role: "AI Advisory Consultant", matchPercent: 78 },
];

export const TOP_STRENGTHS = [
  { competencyId: "C13" as const, note: "Exceptional issue-tree structuring under ambiguous case constraints." },
  { competencyId: "C05" as const, note: "Rapidly decomposes messy business problems into testable hypotheses." },
  { competencyId: "C15" as const, note: "Executive-ready communication with strong Pyramid Principle discipline." },
];

export const PRIORITY_GAPS = [
  { competencyId: "C07" as const, note: "TOM design responses lacked governance-layer depth versus L3 benchmark." },
  { competencyId: "C11" as const, note: "Programme governance case answers under-addressed risk escalation paths." },
  { competencyId: "C18" as const, note: "Risk & controls awareness scored below benchmark in the case challenge." },
];

export const ROADMAP: RoadmapMilestone[] = [
  { week: "Week 1–2", title: "TOM Governance Foundations", focusCompetencies: ["C07", "C11"], description: "Complete the Operating Model Design micro-module and shadow a live governance case study.", status: "complete" },
  { week: "Week 3–4", title: "Risk & Controls Sprint", focusCompetencies: ["C18"], description: "Work through the Enterprise Risk Frameworks workshop and submit a mitigation memo for review.", status: "in-progress" },
  { week: "Week 5–6", title: "Applied TOM Case Lab", focusCompetencies: ["C07", "C06"], description: "Pair with a senior mentor on a live-style TOM redesign case with governance scoring.", status: "upcoming" },
  { week: "Week 7–9", title: "Programme Governance Simulation", focusCompetencies: ["C11", "C18"], description: "Run a simulated steering committee exercise with escalation-path scoring.", status: "upcoming" },
  { week: "Week 10–12", title: "Executive Capstone", focusCompetencies: ["C07", "C11", "C18"], description: "Deliver a full transformation roadmap and governance model to a mock executive panel.", status: "upcoming" },
  { week: "Week 13–16", title: "Client-Ready Certification", focusCompetencies: ["C11", "C16"], description: "Final human-reviewed assessment and Client-Ready sign-off.", status: "upcoming" },
];

export const CALIBRATION_METRICS: CalibrationMetric[] = [
  { label: "Human–AI Rubric Agreement", value: "94.2%", status: "good", detail: "Rolling 30-day agreement rate across all 20 scoring agents." },
  { label: "Item Difficulty Drift", value: "+1.3%", status: "good", detail: "Within tolerance band (±3%) for versioned question sets." },
  { label: "Protected Field Exclusion", value: "Verified", status: "good", detail: "No gender, age, ethnicity, or facial signals present in scoring pipeline." },
  { label: "Low-Confidence Flags (7d)", value: "18 cases", status: "watch", detail: "Attempts routed to human consultant review this week." },
  { label: "Video Bias Audit", value: "Passed", status: "good", detail: "No correlation found between delivery pace/accent and final score." },
  { label: "Override Rate", value: "4.1%", status: "watch", detail: "Human assessors adjusted AI scores in 4.1% of reviewed cases." },
];

export const OVERRIDE_LOG: OverrideLogEntry[] = [
  { id: "ovr-001", candidate: "Ananya Sharma", competency: "C11", aiScore: 2, humanScore: 3, reviewer: "S. Patel", reason: "Transcript evidence of governance escalation undercounted by agent A13.", date: "2026-09-18" },
  { id: "ovr-002", candidate: "Daniel Osei", competency: "C07", aiScore: 3, humanScore: 2, reviewer: "M. Reyes", reason: "TOM design response lacked operating-layer specificity despite fluent delivery.", date: "2026-09-19" },
  { id: "ovr-003", candidate: "Wei Zhang", competency: "C18", aiScore: 1, humanScore: 2, reviewer: "S. Patel", reason: "Risk mitigation plan present in uploaded artifact but missed by transcript-only scan.", date: "2026-09-21" },
  { id: "ovr-004", candidate: "Fatima Al-Sayed", competency: "C15", aiScore: 4, humanScore: 4, reviewer: "M. Reyes", reason: "Confirmed — no change, spot-check calibration sample.", date: "2026-09-22" },
];

export const COPILOT_SUGGESTED_PROMPTS = [
  "Why is my TOM design score at Level 2?",
  "What should I focus on in Week 3?",
  "How is Evidence Confidence calculated?",
  "Am I on track for the Transformation Consultant role?",
];

export const COPILOT_RESPONSES: Record<string, string> = {
  "why is my tom design score at level 2?":
    "Your C07 (Target Operating Model Design) response covered process and org structure well, but didn't address governance escalation paths or RACI-level detail that L3 responses typically include. Agent A09 flagged this against the rubric's governance-depth criterion — that's the main gap driving the Level 2 rating.",
  "what should i focus on in week 3?":
    "Week 3–4 is your Risk & Controls Sprint. Focus on the Enterprise Risk Frameworks micro-module and submit a mitigation memo — this directly targets your C18 gap and feeds into the Week 5 Applied TOM Case Lab.",
  "how is evidence confidence calculated?":
    "Evidence Confidence blends three signals: (1) whether a claim is backed by a work sample vs. self-report, (2) consistency across your case response, video transcript, and resume, and (3) agent-level agreement across independent scoring passes. Yours is 92% — high sample verification.",
  "am i on track for the transformation consultant role?":
    "You're at an 89% match for Transformation Consultant, the strongest of your four tracked roles. Closing the C07 and C11 gaps in your current roadmap would likely push that above 93%.",
};

export const DEFAULT_COPILOT_REPLY =
  "That's a great question for your assessor. Based on your current report, I'd recommend starting with your Priority Gaps (C07, C11, C18) — closing those has the largest effect on your Client Readiness Index.";
