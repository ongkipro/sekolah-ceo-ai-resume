# PLAN: Sekolah CEO AI Executive Knowledge Base Architecture

## Architecture Overview

```mermaid
graph TD
    Client[Browser Client]
    
    subgraph "Astro Static App (Edge Distributed)"
        Layout[App Shell & Layout]
        Router[Astro File-based Routing]
        
        subgraph "Static Content Collections"
            S1[Day 1 Sesi 1 - Mas Anjas]
            S2[Day 1 Sesi 2 - Technical Hands-on]
            S3[Day 2 Sesi 1 - Mas Satya]
            S4[Day 2 Sesi 2 - Pak Natali]
            Prompts[Executive Prompts DB]
            Tools[AI Tools Comparison Matrix]
            Roadmap[30-60-90 Roadmap Data]
        end
        
        subgraph "Interactive React Islands"
            Search[Cmd+K Search Modal (Fuse.js)]
            Player[YouTube Player Controller]
            PromptDrawer[Prompt Copy & Customizer]
            Checklist[Roadmap Tracker (localStorage)]
            ThemeToggle[Dark/Light Switcher]
        end
    end
    
    Client --> Layout
    Layout --> Search
    Layout --> Player
    Layout --> PromptDrawer
    Layout --> Checklist
    Router --> S1
    Router --> S2
    Router --> S3
    Router --> S4
    Router --> Tools
    Router --> Roadmap
```

## Data Schema & Content Collections

### 1. Sessions Schema (`src/content/sessions/*.json`)
```typescript
interface SessionItem {
  id: string; // "day-1-sesi-1"
  title: string;
  day: number;
  sessionNumber: number;
  speaker: {
    name: string;
    role: string;
    company: string;
    avatarUrl?: string;
  };
  duration: string; // "2h 48m"
  youtubeId: string; // "hhYAv9s1cMg"
  topics: Array<{
    id: string;
    title: string;
    timestamp: string; // "042:15"
    timestampSeconds: number; // 2535
    category: "Prototyping" | "Operations" | "Growth" | "Management" | "Audit" | "Technical";
    summary: string;
    keyTakeaways: string[];
    frameworks?: Array<{
      name: string;
      description: string;
      diagramMermaid?: string;
    }>;
    prompts?: string[];
  }>;
}
```

### 2. Prompts Schema (`src/content/prompts/*.json`)
```typescript
interface ExecutivePrompt {
  id: string;
  title: string;
  category: "Audit" | "Operations" | "Sales" | "Strategy" | "HR";
  speaker: string;
  framework: "B.R.I.E.F." | "RootCause" | "YieldPricing" | "Custom";
  template: string;
  variables: Array<{
    key: string;
    label: string;
    defaultValue: string;
  }>;
  instructions: string;
  exampleOutput: string;
}
```

### 3. Tools Matrix Schema (`src/content/tools.json`)
```typescript
interface AITool {
  name: string;
  url: string;
  category: "Intelligence" | "Prototyping" | "Audio/Research" | "Video/Content" | "Growth/CRM" | "Automation";
  pricingModel: "Freemium" | "Paid" | "OpenSource";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  impactScore: 1 | 2 | 3 | 4 | 5;
  recommendedUseCases: string[];
  sessionMentioned: string[];
}
```

## UI/UX & Component Structure

- **Sidebar / Header Navigation**:
  - Event Overview & Executive Summary
  - Day 1 Sesi 1 (Mas Anjas: Enterprise, Prototyping, Growth)
  - Day 1 Sesi 2 (Technical Hands-On & Hardware/POS Integrations)
  - Day 2 Sesi 1 (Mas Satya: 90% Cost Cut, Koran Perusahaan, Ops)
  - Day 2 Sesi 2 (Pak Natali: LLM Math, Audit .docx, Dynamic Pricing)
  - Executive Prompt Vault (B.R.I.E.F., Audit, Sales)
  - AI Tools Matrix (Interactive table with category/impact filters)
  - 30-60-90 Day Action Plan (Interactive roadmap)
- **Interactive Player Widget**:
  - Sticky or floating YouTube mini-player with timestamp navigation.
- **Copy & Share Drawer**:
  - Instant clipboard copy for prompts and actionable executive templates.

## Risks & Mitigations
- **Risk 1**: YouTube embed API restrictions or ad blockers.
  * *Mitigation*: Provide both embedded player and direct clickable `https://youtu.be/<id>?t=<sec>` external fallback links.
- **Risk 2**: Search index size on mobile.
  * *Mitigation*: Index only structured metadata, titles, and key takeaways in client-side search index (<150KB); full raw transcripts remain on separate dedicated lazy-loaded pages.
