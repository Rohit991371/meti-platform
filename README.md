# METI — Modus Enterprise Talent Intelligence Platform

> **Modus Enterprise Transformation Assessment & Development Platform**
> *Hackathon MVP Submission — Enterprise Management Consulting Track*

---

## 📌 Executive Overview

**METI (Modus Enterprise Talent Intelligence)** is an evidence-based enterprise consulting capability, professional personality, and development platform designed by **Modus Enterprise Transformation**.

Unlike standard recruitment portals or static quiz forms, METI uses an **adaptive AI assessment engine**, video communication analytics, visual drawing canvases, and multi-agent evidence scoring to evaluate consulting candidates across **20 Core Enterprise Competencies (C01–C20)**.

---

## 🚀 Key Features

### 1. Adaptive AI Assessment Engine
- Dynamic difficulty branching based on real-time response scoring.
- CV-grounded calibration: resumes are parsed via Groq AI to tailor initial assessment domains.
- No-duplicate rule: candidates never see the same question twice, enforced server-side.
- Three question patterns: Single Choice, Multi-Select, and Drawing Canvas (BPMN / Target Operating Model sketches).

### 2. Video Communication Analysis
- Deterministic delivery metrics: words-per-minute and filler-word density.
- AI-evaluated executive tone (decisive vs. hesitant) and Pyramid Principle structural clarity — evaluated on transcript content only, with no facial, physical, or accent-based scoring.

### 3. Case Study Workspace
- Split-screen case brief with an interactive Issue Tree builder and executive memo editor.
- Supports declared Closed-AI and AI-Assisted response modes.
- Submissions scored server-side for MECE structure and business analysis quality.

### 4. Candidate Intelligence Dashboard
- Composite indices: Consulting Capability Index (CCI), Consulting Potential Index (CPI), Client Readiness Index (CRI), and Evidence Confidence (EC).
- Competency radar, Schwartz Values wheel, and a 12–16 week personalized development roadmap.
- Grounded AI Copilot that answers candidate questions using their actual score data, not a generic chatbot.

### 5. Admin Governance Panel
- Full audit trail of every human reviewer override of an AI-generated score, with timestamp and rationale.
- Displays AI-vs-human agreement rate for calibration tracking.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Lucide Icons.
- **Backend Runtime:** Next.js API Route Handlers, 10 dedicated endpoints across orientation, onboarding, entitlements, assessment, case review, dashboard, copilot, and admin governance.
- **Data Layer:** A lightweight server-side data store (`lib/db.ts`) exposing a SQL-like `prepare().run()/.get()/.all()` interface — straightforward to swap for a persistent SQL database (SQLite/Postgres) in a production deployment.
- **AI Orchestration:** Groq SDK, calling `openai/gpt-oss-120b`, with strict JSON-schema prompts and safe fallback responses on any AI or data error so the app never crashes mid-assessment.

---

## 🎨 Color Palette & Design System

- **Deep Purple Base (`#321E48`):** Dominant dark header, sidebar, and container background.
- **Muted Slate Blue (`#43637E`):** Secondary cards, borders, and sub-headings.
- **Vibrant Mint Cyan (`#65DCD5`):** Active states, glowing borders, primary CTAs, and radar chart accents.
- **Soft Mint Cream (`#D9FFF4`):** Background highlights, pill badges, and light text gradients.

---

## 📁 Repository Structure

```text
meti-platform/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       ├── orientation/          # Video progress & knowledge checks
│       ├── onboarding/           # Groq resume parsing
│       ├── entitlements/         # Product activation
│       ├── assessment/           # Adaptive engine, drawing, video evaluation
│       ├── case/                 # Case study submission & scoring
│       ├── dashboard/            # Candidate intelligence aggregation
│       ├── copilot/              # Grounded AI chat
│       └── admin/                # Governance & override audit log
├── components/
│   ├── ui/
│   ├── landing/
│   ├── onboarding/
│   ├── catalogue/
│   ├── assessment/
│   ├── case-workspace/
│   ├── dashboard/
│   ├── ai-copilot/
│   └── admin/
├── lib/
│   ├── db.ts                     # Server-side data layer
│   ├── groq.ts                   # Groq client + safe JSON call wrapper
│   ├── mock-data.ts              # Fallback/demo baseline data
│   ├── types.ts
│   └── utils.ts
├── README.md
└── package.json
```

---

## ⚙️ Running Locally

```bash
npm install --legacy-peer-deps
```

Create `.env.local` in the project root:
```
GROQ_API_KEY=your_groq_api_key_here
```

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## 🧭 Assessment Workflow

```text
[Orientation & Video] → [Register & Choose Product] → [Core Diagnostic]
  → [Case Challenge & Video Response] → [AI Scoring & Human Calibration]
  → [Report & Personal Development Roadmap]
```

1. **Orientation:** Candidates watch guidance videos and pass a short knowledge check.
2. **Onboarding:** Resume upload auto-populates the candidate profile via AI extraction.
3. **Core Assessment:** Adaptive question modules across Talent DNA, values, and technical competencies.
4. **Case Challenge:** Written case response plus a recorded executive presentation.
5. **Scoring & Calibration:** AI scores every submission against standardized rubrics; low-confidence attempts flag for human review.
6. **Report & Roadmap:** Candidates receive a summary immediately, with an upgrade path to the full Detailed Intelligence Report and a personalized development roadmap.

---

## 🔒 Key Guardrails

- **No unfair video bias:** scoring evaluates transcript content and verbal delivery metrics only — never facial expression, appearance, or accent.
- **Schwartz Values are descriptive, not pass/fail:** used to tailor coaching, never as a rejection filter.
- **Human-in-the-loop:** high-stakes "Client-Ready" determinations require human consultant confirmation.
- **Zero-crash resilience:** every API route degrades gracefully to a safe fallback response rather than failing the candidate's session.