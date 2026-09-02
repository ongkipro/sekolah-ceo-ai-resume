# Product Requirements Document (PRD)

## Title: Sekolah CEO AI (Agustus 2026) Executive Knowledge Base & Modular Multi-Page Portal
## Author: Business System Architect & Full-Stack Developer
## Status: Live & Deployed Locally (Full Learning Accelerator Suite)
## Target Audience: CEOs, Business Owners, Founders, C-Level Executives

---

## 1. Executive Summary & Goals
Transform the raw, multi-speaker, 12+ hour recording transcripts from the **Sekolah CEO AI (Agustus 2026)** masterclass into an executive-grade, modular knowledge portal with 12 dedicated routes, role-based learning pathways, 3-minute executive cheat-sheets, scenario-based AI maturity assessments, interactive video timestamp synchronization, prompt vaults, and decision simulators.

### Core Goals:
1. **Accelerated Executive Learning**: 3-minute quick reads, personalized role pathways (CEO, CFO, CMO, COO), and decision quizzes.
2. **Modular Multi-Page Navigation**: 12 focused, uncluttered pages with dedicated URLs and sidebar navigation.
3. **Dual-View Comprehension & Timestamp Sync**: Dedicated curriculum route with interactive YouTube timestamp synchronizer, layman analogies, verbatim transcript highlights, and session action plans.
4. **Layman-Accessible AI Education**: Demystify complex AI concepts through relatable real-world analogies and a searchable A-Z glossary.
5. **Execution Readiness & ROI Simulation**: 8 customizable master prompts, 4 visual architecture blueprints, an interactive job desk headcount simulator, and a 30-60-90 day persistent roadmap tracker.

---

## 2. Dedicated Site Architecture & Routes (12 Modules)

| Route | Module Name | Purpose |
| :--- | :--- | :--- |
| `/` | **Executive Dashboard** | Master overview, Bento KPIs, Fast-Track Learning strip, 8 module portal cards. |
| `/cheatsheet` | **Contekkan 3 Menit** | 3-minute quick reads per session: Lakukan Besok, Kesalahan Fatal, 3 Angka Kunci, 1 Master Prompt. |
| `/pathways` | **Jalur Belajar Peran** | Personalized learning paths for CEO/Owner, CFO/Finance, CMO/Marketing, & COO/Ops. |
| `/quiz` | **Tes Kematangan AI** | 5 Scenario-based executive decision questions with instant scoring & AI maturity badge. |
| `/curriculum` | **Kurikulum & Video Sync**| 4 sessions (~12+ hours), topic accordions, layman analogies, YouTube sync, & session to-do lists. |
| `/glossary` | **Kamus Istilah AI Awam** | Searchable A-Z glossary with plain analogies and business impact insights. |
| `/architecture`| **Arsitektur & Alur Kerja** | Visual interactive diagrams for the 4 core AI business workflows. |
| `/prompts` | **Executive Prompt Vault** | 8 master prompt templates with inline variable customizers and 1-click clipboard copy. |
| `/simulator` | **CEO Decision Simulator** | Interactive micro-task deconstruction and ROI headcount cost-cut calculator. |
| `/tools` | **AI Tools Directory** | Filterable comparison matrix of 8+ recommended AI software platforms. |
| `/roadmap` | **30-60-90 Days Roadmap** | Phase-by-phase implementation checklist with localStorage persistence and PDF print. |
| `/faq` | **Executive FAQ** | Q&A addressing data privacy, costs, legal considerations, and organizational resistance. |

---

## 3. Numbered Requirements (EARS Syntax)

- **REQ-1**: The system shall provide a multi-page app layout (`AppLayout.astro`) featuring a desktop sticky sidebar navigation, top header, breadcrumbs, search palette, and mobile bottom navigation bar.
- **REQ-2**: When the user clicks any topic timestamp pill on `/curriculum`, the system shall automatically jump and play the embedded YouTube video at the exact start second without page refresh.
- **REQ-3**: For every masterclass session on `/curriculum`, the system shall display the speaker profile, golden quote, core pillars, structured takeaways, layman analogy box, and verbatim transcript quotes.
- **REQ-4**: When the user triggers the global shortcut `Cmd+K` from any route, the system shall open a modal running client-side fuzzy search (Fuse.js) across all routes and topics, navigating directly to the selected page.
- **REQ-5**: The system shall provide a dedicated `/tools` route with category pills, impact ratings (1–5 stars), difficulty badges, and official external links.
- **REQ-6**: The system shall provide a dedicated `/prompts` route containing 8 customizable master prompts with dynamic inline business variables.
- **REQ-7**: When the user clicks "Copy Prompt", the system shall compile the template with current variable values, copy it to the clipboard, and show a success confirmation toast.
- **REQ-8**: The system shall provide a dedicated `/roadmap` route where checkbox completion states persist in `localStorage`.
- **REQ-9**: When the user requests a print or PDF export, the system shall apply a clean executive print stylesheet hiding UI controls and video players.
- **REQ-10**: The web application shall be built using Astro static multi-page generation with selective React hydration for zero runtime bloat.
- **REQ-11**: The system shall deliver sub-second page transitions and zero compile-time warnings.
- **REQ-12**: The system shall provide a dedicated `/glossary` route searchable by term, category, and business impact.
- **REQ-13**: The system shall provide a dedicated `/simulator` route to calculate weekly hours saved and operational cost reductions (up to 90%).
- **REQ-14**: The system shall provide a dedicated `/faq` route answering critical business questions regarding data privacy, enterprise AI costs, staff transitions, and risk controls.
- **REQ-15**: On the `/curriculum` route, the system shall dynamically render a dedicated **Session Executive Resume** and an interactive **To-Do List Action Plan** with `localStorage` persistence.
- **REQ-16**: The system shall provide a dedicated `/cheatsheet` route presenting 3-minute executive summaries (Lakukan Besok, Kesalahan Fatal, 3 Angka Kunci, Master Prompt) for each session.
- **REQ-17**: The system shall provide a dedicated `/pathways` route with role-based curriculum recommendations (CEO, CFO, CMO, COO).
- **REQ-18**: The system shall provide a dedicated `/quiz` route with 5 scenario-based business questions, scoring, and maturity level badges.

---

## 4. Technical Architecture & Tech Stack
- **Framework**: Astro v5 (Static Output, Multi-Page MPA)
- **UI Islands**: React 19 (`@astrojs/react`)
- **Styling**: Tailwind CSS v3 (`@astrojs/tailwind`)
- **Icons**: Lucide React
- **Fuzzy Search Engine**: Fuse.js
- **Persistence**: Browser `localStorage`

## Phase 8: Data Precision & Content Injection (Sep 2026)
- **REQ-19**: The system shall dynamically consume the highly precise Master Analysis transcript data across all routes (Sessions, Prompts, Tools, FAQ, Cheatsheets), replacing any old placeholder or unverified data.
- **REQ-20**: The raw data injection shall preserve the JSON structure in `src/data/*.json` to ensure the React and Astro components continue rendering without breaking.
