# Mode: document

Capture the existing UI as a design system. No visual changes.

1. Collect tokens from code: CSS variables, Tailwind config or `@theme`, theme files, repeated literals in components. Count usage to tell real tokens from one-offs.
2. Normalize colors to OKLCH, name them by role (surface, on-surface, accent, on-accent, muted, border, danger), and pair every `on-*` with its base.
3. Extract type roles (display, heading, body, label, mono) with size, weight, line height and tracking. Extract radii, spacing scale, shadows, easing and durations.
4. Write `DESIGN.md` from `assets/DESIGN.template.md`. Put values that exist in code in the front matter. Put motion, dark mode and breakpoints in prose.
5. Run `scripts/contrast.mjs DESIGN.md` and list failing pairs as findings, without fixing them.
6. List inconsistencies (near-duplicate colors, off-scale spacing) as a cleanup backlog with counts and file references.
