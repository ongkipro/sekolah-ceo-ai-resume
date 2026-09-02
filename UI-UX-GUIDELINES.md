# UI/UX Guidelines: Sekolah CEO AI - Executive Knowledge Base

## 1. Design Philosophy
- **Executive-First**: Content must be scan-able within 3 minutes.
- **High Signal-to-Noise Ratio**: Eliminate decorative fluff; prioritize data, frameworks, and actionable insights.
- **Clarity Over Cleverness**: Use plain Indonesian (Bahasa Indonesia santai namun profesional) instead of complex tech jargon.
- **Fast & Responsive**: Sub-second load times using Astro static generation, mobile-friendly navigation.

## 2. Color Palette & Typography
- **Primary Brand (Trust & Authority)**: Deep Indigo/Navy (`#1e1b4b`) and Slate (`#0f172a`).
- **Accent (Action & Highlights)**: Electric Blue (`#3b82f6`) or Teal (`#0d9488`).
- **Backgrounds**: Soft Off-White (`#f8fafc`) for readability, contrasting with clean White (`#ffffff`) for content cards.
- **Typography**:
  - **Headings**: Inter or Plus Jakarta Sans (Bold, authoritative).
  - **Body**: Inter (Regular, readable, high legibility for long text).

## 3. Component Guidelines
### A. Executive Cards (Bento Grid)
- Soft shadows, rounded corners (`rounded-xl` or `rounded-2xl`).
- Hover states with subtle lifting (`-translate-y-1` and enhanced shadow).

### B. Interactive Elements
- **Tabs & Accordions**: Used to hide secondary details while keeping the main outline clean. Must have clear open/close indicators (+/- or carets).
- **Buttons**: Prominent primary buttons for core actions (e.g., "Copy Prompt"). Subtle ghost buttons for secondary actions.

### C. Search & Navigation
- **Sidebar**: Fixed on desktop for quick 12-route access. Hidden behind a hamburger menu on mobile.
- **Command Palette (`Cmd+K`)**: Must be universally accessible, instantly finding terms, sessions, or prompts.

## 4. Accessibility (a11y)
- Minimum contrast ratio of 4.5:1 for all text.
- Focus rings on all interactive elements.
- Semantic HTML tags (`<main>`, `<article>`, `<nav>`, `<aside>`).
- ARIA labels for icon-only buttons.

## 5. Mobile Responsiveness
- Stack grid columns on screens `< 768px`.
- Move sidebar navigation to a bottom tab bar or accessible off-canvas drawer on mobile devices.
- Ensure tap targets are at least `44x44px`.
