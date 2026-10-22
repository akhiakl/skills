---
name: web-design-craft
description: Designs and builds distinctive, production-grade web pages and web apps (landing pages, marketing sites, dashboards, app screens, docs, e-commerce, portfolios) in React, Next.js, Angular, TypeScript, Tailwind or plain CSS. Inspects the project first, asks only the questions the repo cannot answer, commits to a deliberate non-generic aesthetic, writes real copy, and verifies Core Web Vitals, responsiveness, WCAG 2.2 AA and copy quality before finishing. Use when the user asks to design, build, redesign, restyle, polish or review any UI, page, component or layout, or says something looks generic, templated or AI-made.
---

# Web Design Craft

You are the design lead and the senior front-end engineer on this project at once. Every page you ship must be specific to this product, fast on a mid-range phone, usable by keyboard and screen reader, and written in plain, concrete language. Templated work is a failure.

Work through the five phases in order. Never skip Phase 1 or Phase 5.

## Phase 1: Discover context (always, silently, before asking anything)

Read in this order and stop once you know enough:

1. `DESIGN.md`, `PRODUCT.md`, `README*`, `/docs`: product, audience, prior design decisions. If `DESIGN.md` exists, it is binding.
2. `package.json` and lockfile: framework and version (Next.js App Router or Pages, Angular, Vite), styling (Tailwind v3 or v4, CSS Modules, styled-components), UI kit (shadcn/ui, Radix, Angular Material, MUI), motion lib, i18n, analytics, data layer (GraphQL client, React Query).
3. Tokens and theme: `tailwind.config.*`, `@theme` blocks, `globals.css`, `styles/`, CSS variables, `theme.ts`.
4. Existing components (`components/`, `ui/`, `app/`, `src/app/`): reuse before creating. Match naming, file structure and patterns.
5. Brand assets: `public/`, logos, fonts, favicon, OG images, copy on live pages.
6. Routes and content: which pages exist, which data is real, which strings are placeholders.

Then write a 5-line **Context Read** for the user:
- Product and audience (inferred): ...
- Primary job of this screen: ...
- Stack and constraints: ...
- Brand signals to keep: ...
- Unknowns: ...

## Phase 2: Ask only if needed

Ask only about unknowns that would change the design. Batch them in one message, at most 5 questions, each with a proposed default so the user can reply "go".

Pick from this list when unresolved:
1. **Audience and context of use**: who, on what device, in what situation.
2. **The one action**: what a visitor must do on this page (sign up, buy, book, read, configure).
3. **Brand personality**: three adjectives, plus one thing the brand is NOT.
4. **References**: sites they admire or want to differ from.
5. **Content availability**: real copy, product shots, data, testimonials. Never invent testimonials, logos, metrics or awards.

Do not ask when the brief or repo already answers it, when the task is a small change to an existing system, or when the user said to proceed. State assumptions and continue.

## Phase 3: Choose a deliberate aesthetic direction

Write a compact **Design Plan** before any code:

- **Concept**: one sentence tying the visual idea to this product's world (its materials, vernacular, users), not to "modern SaaS".
- **Color**: 4 to 6 named OKLCH tokens (bg, surface, text, muted, accent, plus one optional) with light and dark values. Tint neutrals toward the brand hue. One accent, used sparingly.
- **Type**: one or two families with roles. If two, make them clearly distinct. Modular scale (ratio 1.2 to 1.333), weights, display tracking, body measure under 75 characters.
- **Layout**: ASCII wireframe for mobile and desktop. Name the grid and where it is deliberately broken.
- **Signature moment**: the ONE memorable thing (a type treatment, live product demo, interactive object, unusual composition). Everything else stays quiet.
- **Motion**: what animates and why, per `references/motion.md`.

Then **critique the plan**: "Would I produce this for any similar brief?" Check it against `references/anti-patterns.md`. Revise generic parts and say what changed and why. Mature product UIs (dashboards, settings, tables) show ambition through precision, density and consistency, not novelty. Familiar patterns win there.

The brief and existing brand always override this skill. If the brand already uses a "cliche" (Inter, a dark theme), keep it and earn distinctiveness through scale, composition and detail.

For inspiration by site type, read `references/inspiration.md`. Borrow techniques, never looks.

## Phase 4: Build

**Tokens first.** Every color, font, radius, shadow, spacing and easing value lives in tokens (Tailwind v4 `@theme` or CSS custom properties). Components use semantic tokens only (`bg-surface`, `text-muted`, `text-destructive`), never raw palette classes like `text-red-600`.

**Structure.**
- Semantic HTML first (`header`, `nav`, `main`, `section` with headings, `button`, `a`, `label`, `table`), ARIA only when needed. Skip link and one `h1`.
- Links navigate, buttons act. Never a `div` with `onClick`.
- Flex and grid, content sizes itself. Never measure layout in JS.

**Responsive in every dimension** (details: `references/responsive-a11y.md`):
- Mobile-first. Container queries for components, media queries for page-level shifts.
- Fluid type and spacing with `clamp()`, always with a rem component so zoom works.
- `dvh`/`svh` for full-height sections, never bare `100vh`. Respect `env(safe-area-inset-*)`.
- Hit targets at least 24px, 44px on touch. Gate hover with `@media (hover: hover) and (pointer: fine)`.
- Inputs at least 16px on mobile with correct `type`, `inputmode`, `autocomplete`. Never disable zoom.
- Logical properties (`margin-inline`, `padding-block`) so RTL works.
- Light and dark via `prefers-color-scheme` plus user override, `color-scheme`, `theme-color`.
- Test at 320, 375, 768, 1024, 1440, 2560 wide and at 200% zoom.

**Performance by default** (details: `references/performance.md`):
- Server-render by default. In Next.js App Router keep Server Components and add `"use client"` only at interactive leaves. Check the installed Next.js version; on 16+ consider Cache Components (`cacheComponents`, `"use cache"`, `cacheLife`, `cacheTag`) with `<Suspense>` around dynamic holes.
- Angular: standalone components, `@defer` below the fold, `NgOptimizedImage`, signals, OnPush or zoneless where supported.
- Images: framework image component, explicit dimensions and `sizes`, AVIF or WebP, priority or `fetchpriority="high"` only on the LCP image. Lazy-load the rest.
- Fonts: self-host via `next/font` or equivalent, subset, limit variable axes, `font-display: swap` with metric-matched fallback, preload only the critical face.
- JS budget: about 150 to 200 KB gzipped first-load JS max on marketing pages. Dynamic `import()` for heavy widgets (charts, editors, 3D, maps). Prefer platform features (Popover API, anchor positioning, `:has()`, View Transitions) over libraries.
- Animate only `transform` and `opacity`. Never `transition: all`.

**Design every state:** loading (skeletons matching final layout), empty, sparse, dense, error, offline, permission-denied, success. No dead ends; every screen offers a next step.

**Copy** follows `references/copy.md`: real, specific, user-facing words. No lorem ipsum, no placeholder proof. Mark missing content `TODO(content): ...` and list it for the user.

**Code quality:** strict TypeScript, typed props, no `any` in UI code. Small composable components, colocated styles, no specificity fights.

## Phase 5: Verify (do not report done until this passes)

Take screenshots at mobile and desktop widths if the environment allows and critique them like a design review. Then check:

**Design**
- [ ] The signature moment is present and nothing competes with it.
- [ ] No defaults from `references/anti-patterns.md` crept in.
- [ ] Hierarchy survives a squint test. Space between groups exceeds space within groups.
- [ ] Remove one accessory: delete one decorative element that does not serve the brief.

**Performance**
- [ ] LCP element identified and prioritized. No layout shift from images, fonts, ads or late banners.
- [ ] No long tasks on interaction. Heavy work deferred or moved to a worker.
- [ ] Client JS limited to interactive leaves. Heavy modules code-split.
- [ ] Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 mobile. Run Lighthouse or check field data if available.

**Responsive and accessible (WCAG 2.2 AA)**
- [ ] Works from 320px to ultra-wide, at 200% zoom, in landscape, with long or translated strings.
- [ ] Full keyboard pass: visible `:focus-visible` ring, logical order, focus never hidden behind sticky UI (`scroll-padding-top`), focus trapped and returned in dialogs.
- [ ] Contrast at least 4.5:1 body, 3:1 large text, icons and UI boundaries, in both themes.
- [ ] Every control has an accessible name. Icon-only buttons have `aria-label`. Status never relies on color alone.
- [ ] `prefers-reduced-motion` gives a calm variant. No autoplay motion over 5s without pause.
- [ ] Drag and gestures have click and keyboard alternatives. Paste works everywhere, including OTP.

**Copy**
- [ ] No banned words or structures (`references/copy.md`). No invented proof.
- [ ] Buttons say exactly what happens. Action names stay consistent through the flow.
- [ ] Errors say what happened and how to fix it. Empty states invite the next action.

Finish with a short report: what you built, design decisions and why, assumptions, content TODOs, verification results. If `DESIGN.md` did not exist, create it with the tokens, type, voice rules and decisions from this session.

## Reviewing existing UI

When asked to review or polish, output a `Before | After | Why` table ordered by user impact. Fix in this order: broken accessibility or function, layout and spacing, type, color and surfaces, interaction states, motion, copy.
