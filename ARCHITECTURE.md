# Architecture — sekolah-ceo-ai-resume

Updated: 2026-09-01
Expected stack: Existing repository (detected by project-check)

## Selected capabilities

| Capability | Decision | Proven operational |
|---|---|---|
| Database | `none` | No |
| Authentication | `none` | No |
| Deployment target | `none` | No |

Bootstrap source state: native generator: none. These selections constrain future
architecture work but do not create services, credentials, schemas, or remote
resources.

## Current system

Architecture is not documented yet. Inspect the repository and describe only components and data flows proven by code or runtime configuration.

## Boundaries

Record system boundaries, trust boundaries, external integrations, and ownership before adding diagrams.

## Data

Record authoritative data stores, invariants, migration constraints, and retention requirements when present.

## Decisions

Record accepted constraints in `DECISIONS.md`. Costly-to-reverse decisions may
also have detailed ADRs; create that directory only when the first ADR exists.

## Verification

List the smallest commands or runtime scenarios that prove architectural changes behave as intended.

## Data Architecture (JSON Content Models)
The system is entirely static and data-driven. All masterclass content is stored in `src/data/*.json`. 

- `sessions.json`: Contains the deep-dive analysis, YouTube URLs, timestamps, and curriculum topics.
- `tools.json`: Matrix of all AI tools mentioned, categorized by use case, difficulty, and business impact.
- `prompts.json`: The Executive Prompt Vault templates with metadata (variables, expected output).
- `cheatsheets.json`: Quick 3-minute executive summaries per session.
- `faq.json`: Q&A addressing executive concerns.
- `roadmap.json`: 30-60-90 days implementation checklist.
- `quiz.json`: 5-question executive AI maturity assessment.

Any updates to the masterclass content MUST be done inside these JSON files, not in the Astro/React UI components.
