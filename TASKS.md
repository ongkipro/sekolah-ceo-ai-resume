# Tasks: Sekolah CEO AI Executive Knowledge Base Web App

## Rules for the AI
- One task per request. Mark `[x]` before moving on.
- Do ONLY the task's scope. Need something outside it → ask, don't assume.
- Respect `AGENTS.md`: YAGNI, native-first, no unrequested abstractions.
- 1 task ≈ 1 commit that passes its own check.

## Phase 1: Foundation & Data Layer
- [x] **T1** — Initialize Astro project with Tailwind CSS, Lucide icons, and React island support.
- [x] **T2** — Compile structured JSON content collections for all 4 sessions, tools matrix, and executive prompts.

## Phase 2: Core Session Views & Interactive Player
- [x] **T3** — Build the Session Detail View with topic accordions, key takeaways, and speaker badges.
- [x] **T4** — Implement the YouTube Timestamp Player Controller with synchronized video playback.

## Phase 3: Executive Tools, Search & Prompt Vault
- [x] **T5** — Build the Executive Prompt Vault with one-click clipboard copy and inline variable customizer.
- [x] **T6** — Create the Interactive AI Tools Comparison Matrix with category and impact filtering.
- [x] **T7** — Implement the global Command Palette search (`Cmd/Ctrl + K`) using Fuse.js.

## Phase 4: Action Plan & Production Polish
- [x] **T8** — Build the 30-60-90 Day Interactive Checklist with `localStorage` persistence and progress tracking.
- [x] **T9** — Add print stylesheet and Markdown/PDF export for the executive action plan.
- [x] **T10** — Responsive design audit, SEO metadata, OpenGraph tags, and build verification.

## Phase 5: Layman Comprehension & Multi-Page Architecture
- [x] **T11** — Add Layman Analogies ("Bahasa Sederhananya") to all 24+ curriculum topics.
- [x] **T12** — Build the Interactive Layman's AI Glossary (`LaymanGlossary.tsx` at `/glossary`).
- [x] **T13** — Build the Executive Decision & Headcount Allocator Simulator (`ExecutiveDecisionSimulator.tsx` at `/simulator`).
- [x] **T14** — Build the Executive FAQ Accordion (`ExecutiveFAQ.tsx` at `/faq`).

## Phase 6: Session-Specific Resumes & Dynamic Action Plan To-Do Lists
- [x] **T15** — Build `SessionResumeActionPlan.tsx` and integrate into `/curriculum` with dynamic tab switching, progress meter, and `localStorage` persistence per session.

## Phase 7: Fast-Track Learning Acceleration Suite
- [x] **T16** — Build the 3-Minute Executive Cheatsheets (`ExecutiveCheatsheet.tsx` at `/cheatsheet`) with "Do Tomorrow", "Fatal Mistakes", "Key Numbers", and "Master Prompt".
      Primary requirement: REQ-16
      Constraints: None
      Dependencies: T1
      Done when: Navigate to `/cheatsheet`, switch sessions, and test prompt copy.
- [x] **T17** — Build the Personalized Role-Based Learning Pathways (`LearningPathways.tsx` at `/pathways`) for CEO, CFO, CMO, and COO.
      Primary requirement: REQ-17
      Constraints: None
      Dependencies: T1
      Done when: Select CFO role and verify tailored modules and routes appear.
- [x] **T18** — Build the Scenario-Based Executive AI Maturity Assessment (`ExecutiveQuiz.tsx` at `/quiz`).
      Primary requirement: REQ-18
      Constraints: None
      Dependencies: T1
      Done when: Complete 5 questions, verify instant score calculation, and receive AI maturity level badge.

## Phase 8: Data Replacement & Finalization
- [x] **T19** — Inject precise content into `sessions.json` using the Master Analysis (Breakdown of all 4 sessions, frameworks, and quotes).
      Primary requirement: REQ-19
      Dependencies: None
- [x] **T20** — Inject precise content into `tools.json` and `prompts.json` based on the real tools (N8N, Company Brain, Claude, Lovable, etc.) and prompts (Run My Day, HR Assessment) from the Master Analysis.
      Primary requirement: REQ-19
      Dependencies: None
- [x] **T21** — Inject precise content into `cheatsheets.json`, `glossary.json`, and `quiz.json` reflecting the actual strategic insights (e.g. John Kotter 8-steps, B.R.I.E.F framework, ZMOT).
      Primary requirement: REQ-19
      Dependencies: None
- [x] **T22** — Final audit and build verification to ensure no UI breakage occurs after data injection.
