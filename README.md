# METI — Modus Enterprise Talent Intelligence Platform

Frontend MVP for **METI**, an evidence-based Enterprise Talent Intelligence & Assessment
platform for management consulting candidates. Built as a hackathon prototype: a single
Next.js application with an instant demo switcher so every one of the seven core screens can
be reached in one click during a live walkthrough.

> This is a **frontend-only prototype**. All data is mocked in `lib/mock-data.ts` — there is
> no backend, database, or real AI scoring pipeline wired up. It is built to look and feel
> like the real product described in the TDD.

---

## 1. What's in this MVP

| # | Screen | Route in the app | What it demonstrates |
|---|--------|------------------|------------------------|
| 1 | **Landing & Video Orientation** | `Landing` tab | Hero, V01 video player with transcript + progress tracking, 2-question readiness check modal |
| 2 | **Registration & CV Parser** | `Onboarding` tab | Mock auth, drag-and-drop resume upload, auto-populated profile form (React Hook Form + Zod), practice-area chips |
| 3 | **Product Catalogue** | `Catalogue` tab | MC-A / PV-A / COMBO-A pricing tiers, recommended badge, upsell notice for the $250 report |
| 4 | **Adaptive Assessment Engine** | `Assessment` tab | Stepper header with live timer + autosave, single/multi-select, drag-and-drop Rank-4 (dnd-kit), adaptive scenario question, video/audio response recorder with waveform |
| 5 | **Case Study Workspace** | `Case Study` tab | Split-screen layout — client brief & dataset on the left, Issue Tree / Recommendations / Artifact Upload tabs with an AI-policy toggle on the right |
| 6 | **Candidate Dashboard & Report** | `Dashboard` tab | CCI/CPI/CRI/EC metric tiles, C01–C20 competency radar (Recharts), capability heatmap (L0–L4), Schwartz values wheel, Summary vs. $250 Detailed report switcher with a 12–16 week roadmap, floating AI Results Explainer chat drawer |
| 7 | **Admin & Governance Panel** | `Admin` tab | Calibration & fairness metrics, human-vs-AI agreement rate, protected-field exclusion badge, score override log |

All seven screens are reachable at any time from the fixed **Demo Switcher** — a top nav bar
on desktop/tablet and a bottom nav bar on mobile.

---

## 2. Architecture

### 2.1 Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript | File-based routing not required for a single-page demo, but gives a production-shaped foundation to grow into real routes later |
| Styling | Tailwind CSS v4 + a small Shadcn-style primitive set | Utility-first speed, full control over the METI design tokens |
| Icons | lucide-react | Consistent, tree-shakeable icon set |
| Animation | Framer Motion | Page/tab transitions, staggered reveals, the copilot drawer |
| Charts | Recharts | Competency radar, Schwartz values radial chart |
| Drag & drop | @dnd-kit | Rank-4 Talent DNA question, keyboard/touch accessible |
| Forms | React Hook Form + Zod | Typed, validated onboarding form |

### 2.2 Folder structure

```text
meti-platform/
├── app/
│   ├── layout.tsx          # Root HTML shell, fonts, metadata
│   ├── page.tsx             # Orchestrator: owns the active-screen state,
│   │                         # renders the Demo Switcher + AnimatePresence transitions
│   └── globals.css          # Design tokens (CSS variables), Tailwind import, utility classes
│
├── components/
│   ├── ui/                  # Shadcn-style primitives: button, card, tabs, dialog,
│   │                         # badge, progress, input, select, textarea, avatar,
│   │                         # separator, scroll-area, tooltip, switch, accordion, label
│   ├── layout/
│   │   └── demo-switcher.tsx   # Fixed top/bottom nav — 1-click toggle between all 7 screens
│   │
│   ├── landing/              # Screen 1
│   │   ├── hero.tsx
│   │   ├── video-explainer.tsx
│   │   ├── knowledge-check.tsx
│   │   └── landing-screen.tsx      # Aggregates the above into the full screen
│   │
│   ├── onboarding/           # Screen 2
│   │   ├── step-header.tsx
│   │   ├── resume-upload.tsx
│   │   ├── profile-form.tsx
│   │   └── onboarding-screen.tsx
│   │
│   ├── catalogue/             # Screen 3
│   │   └── catalogue-screen.tsx
│   │
│   ├── assessment/            # Screen 4
│   │   ├── assessment-header.tsx
│   │   ├── select-question.tsx
│   │   ├── rank-question.tsx
│   │   ├── video-recorder.tsx
│   │   └── assessment-screen.tsx
│   │
│   ├── case-workspace/        # Screen 5
│   │   ├── case-exhibits.tsx
│   │   ├── response-tabs.tsx
│   │   └── case-workspace-screen.tsx
│   │
│   ├── dashboard/             # Screen 6
│   │   ├── report-header.tsx
│   │   ├── metric-tiles.tsx
│   │   ├── competency-radar.tsx
│   │   ├── capability-heatmap.tsx
│   │   ├── values-wheel.tsx
│   │   ├── report-switcher.tsx
│   │   └── dashboard-screen.tsx
│   │
│   ├── ai-copilot/            # Floating chat used on Screen 6
│   │   └── copilot-drawer.tsx
│   │
│   └── admin/                 # Screen 7
│       ├── calibration-panel.tsx
│       ├── override-log.tsx
│       └── admin-screen.tsx
│
├── lib/
│   ├── types.ts               # All TypeScript interfaces: CompetencyId, CandidateProfile,
│   │                          # AssessmentQuestion, SchwartzValue, ScoreIndices, etc.
│   ├── mock-data.ts           # Every piece of mock state: candidate Rohit Gupta,
│   │                          # 20 competencies + scores, Schwartz values, product tiers,
│   │                          # roadmap, calibration metrics, override log, copilot replies
│   └── utils.ts                # cn() class-merge helper, clampScore, levelLabel
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts          # METI color tokens (navy/slate/mint/cream), shadows, radii
├── postcss.config.mjs
├── next.config.mjs
└── components.json             # Shadcn CLI config, in case you add more primitives later
```

### 2.3 How screen navigation works

There is **one route** (`app/page.tsx`). It holds a single piece of state,
`screen: ScreenId`, and renders the matching screen component inside a Framer Motion
`AnimatePresence` for the fade/slide transition. The `DemoSwitcher` component and each
screen's own "Continue" buttons all call the same `onNavigate(screen)` callback — so the app
behaves like a guided multi-step flow for a normal candidate, but any screen can also be
jumped to directly for a live demo.

```
User clicks nav / CTA
        │
        ▼
 navigate(screenId) in app/page.tsx
        │
        ▼
 setScreen(screenId) → AnimatePresence swaps the rendered screen component
```

### 2.4 Design system

Tokens are defined in two places that stay in sync:
- `app/globals.css` — CSS variables used by the design system and glass/gradient utility
  classes (`.glass-card`, `.glass-dark`, `.text-gradient-mint`, `.mint-glow-border`)
- `tailwind.config.ts` — the same palette exposed as Tailwind utilities (`bg-meti-navy`,
  `text-meti-mint`, etc.)

| Token | Hex | Usage |
|---|---|---|
| `meti-navy` | `#321E48` | Sidebar/header backgrounds, primary text |
| `meti-slate` | `#43637E` | Secondary text, borders, muted UI |
| `meti-mint` | `#65DCD5` | Primary accent, CTAs, active states, focus rings |
| `meti-cream` | `#D9FFF4` | Light backgrounds, pill highlights, card borders |

Typography uses **Plus Jakarta Sans**, loaded via Google Fonts in `app/layout.tsx`.

### 2.5 Mock data model

Everything the UI reads comes from `lib/mock-data.ts`, typed against `lib/types.ts`. This
keeps every screen fully populated on load (per the brief) and makes it trivial to swap in a
real API later — a screen only needs its imports changed from `@/lib/mock-data` to a fetch
call or React Query hook returning the same shapes.

---

## 3. Notes on fidelity to the TDD / task brief

- **Immutable versioning, human-in-the-loop, no facial-recognition bias** — represented in
  the Admin panel's Calibration & Fairness dashboard and override log, not enforced by any
  real backend (there isn't one in this prototype).
- **20 AI agents (A01–A20)** — referenced contextually in copy (e.g. "Agent A03 · Resume
  Intelligence Agent", "Scored by Agent A09… and A10…") rather than simulated as separate
  services.
- **Multi-tier reporting (Free / $25 / $250)** — represented as UI state in
  `report-switcher.tsx` (`unlocked` boolean); no real payment flow is wired up.

## 4. Known simplifications (by design, for a 2-hour prototype)

- No real authentication, file parsing, video recording/upload, or payment processing —
  all are simulated with timers and local component state.
- No routing between screens (single page, client-state driven) — intentional, so the whole
  app can be demoed without page reloads.
- No test suite — out of scope for a hackathon frontend sprint.
