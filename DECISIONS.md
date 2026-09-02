# Decision Register — sekolah-ceo-ai-resume

Updated: 2026-09-03

Record accepted decisions that materially constrain product behavior,
architecture, security, data, operations, or delivery. Repository evidence must
support each decision; AI output alone is not evidence.

| ID | Status | Decision | Drivers | Evidence | Supersedes |
|---|---|---|---|---|---|
| DEC-001 | ACCEPTED | All content lives in JSON files inside `src/data/*.json` | Decouple UI components from data; allow easy content updates | Current data files and TS types | — |
| DEC-002 | ACCEPTED | Phase 8 Content Replacement using Master Analysis | Raw masterclass transcripts have been analyzed into precise structures; old data is placeholder | `MASTER_ANALYSIS.md` in root | — |

