# Version-sensitive facts

Verify against the installed version before relying on any line. Update the date when re-checked.

| Fact | Last verified |
|---|---|
| Core Web Vitals good thresholds: LCP 2.5s, INP 200ms, CLS 0.1 at p75 | 2026-10 |
| WCAG 2.2 AA adds 2.4.11 Focus Not Obscured, 2.5.7 Dragging, 2.5.8 Target Size 24px, 3.3.8 Accessible Authentication | 2026-10 |
| Next.js 16: Cache Components opt-in via `cacheComponents`, `"use cache"`, `cacheLife`, `cacheTag`; Turbopack default | 2026-10 |
| React Compiler stable and supported in Next.js 16 | 2026-10 |
| Angular: standalone default, `@defer`, signals, zoneless available, `NgOptimizedImage` | 2026-10 |
| Tailwind v4: CSS-first `@theme`, OKLCH default palette | 2026-10 |
| Baseline: container size queries, `:has()`, `dvh/svh`, same-document View Transitions, CSS anchor positioning, `@starting-style`, Popover API | 2026-10 |
| Not Baseline: cross-document View Transitions (progressive enhancement only) | 2026-10 |
| Google DESIGN.md format is alpha; motion, dark mode and breakpoints are not yet tokenized | 2026-10 |

Check Baseline status at web.dev/baseline or with the `web-features` npm package.
