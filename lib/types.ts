// ---------------------------------------------------------------------------
// METI Platform — Core Type Definitions
// Competencies C01–C20, Candidate profiles, Assessment questions, Scoring
// ---------------------------------------------------------------------------

export type CompetencyId =
  | "C01" | "C02" | "C03" | "C04" | "C05"
  | "C06" | "C07" | "C08" | "C09" | "C10"
  | "C11" | "C12" | "C13" | "C14" | "C15"
  | "C16" | "C17" | "C18" | "C19" | "C20";

export type CompetencyGroup =
  | "Strategy & Analysis"
  | "Transformation & Process"
  | "Execution & AI"
  | "Soft Skills & Communication";

export interface Competency {
  id: CompetencyId;
  name: string;
  group: CompetencyGroup;
  description: string;
}

export interface CompetencyScore {
  competencyId: CompetencyId;
  candidateLevel: number; // 0 - 4
  benchmarkLevel: number; // 0 - 4
  evidenceConfidence: number; // 0 - 100
}

export type ProductTier = "MC-A" | "PV-A" | "COMBO-A";

export interface ProductOffer {
  tier: ProductTier;
  name: string;
  price: number;
  recommended?: boolean;
  focus: string;
  includes: string[];
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  targetRole: string;
  email: string;
  education: string;
  yearsExperience: number;
  pastCompanies: string[];
  practiceAreas: string[];
  primaryIndustries: string[];
  enterpriseId: string;
  avatarInitials: string;
}

export type QuestionType =
  | "single-select"
  | "multi-select"
  | "rank-4"
  | "adaptive-scenario"
  | "video-response";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface AssessmentQuestion {
  id: string;
  moduleCode: string; // F01 - F18
  section: string;
  type: QuestionType;
  prompt: string;
  helperText?: string;
  options?: QuestionOption[];
  competencyTags: CompetencyId[];
}

export interface SchwartzValue {
  id: string;
  name: string;
  group: "Openness to Change" | "Self-Enhancement" | "Conservation" | "Self-Transcendence";
  score: number; // 0-100 relative priority
}

export interface ScoreIndices {
  cci: number; // Consulting Capability Index
  cpi: number; // Consulting Potential Index
  criLabel: string; // Client Readiness Index label
  criScore: number;
  evidenceConfidence: number; // %
}

export interface RoadmapMilestone {
  week: string;
  title: string;
  focusCompetencies: CompetencyId[];
  description: string;
  status: "upcoming" | "in-progress" | "complete";
}

export interface TargetRoleMatch {
  role: string;
  matchPercent: number;
}

export interface CalibrationMetric {
  label: string;
  value: string;
  status: "good" | "watch" | "alert";
  detail: string;
}

export interface OverrideLogEntry {
  id: string;
  candidate: string;
  competency: CompetencyId;
  aiScore: number;
  humanScore: number;
  reviewer: string;
  reason: string;
  date: string;
}

export type ScreenId =
  | "landing"
  | "onboarding"
  | "catalogue"
  | "assessment"
  | "case-workspace"
  | "dashboard"
  | "admin";
