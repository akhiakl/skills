---
name: web-design-craft
description: Designs, builds, reviews and polishes distinctive, production-grade web UI (landing pages, marketing sites, dashboards, app screens, components) in React, Next.js, Angular, Tailwind or plain HTML/CSS. Use when the user asks to build, redesign, restyle, review, audit, critique or polish a page or component; says it looks generic, bland, AI-made or off; asks for a design system, design tokens, DESIGN.md, dark mode, responsive layout, typography or color palette; or wants Core Web Vitals or WCAG 2.2 checks on UI. Produces a design plan, tokens-first code, and a verified DESIGN.md. Do not use for backend/API work, pure state-management or data-fetching bugs, unit tests, React Native, Expo or native iOS/Android apps (use mobile-design-craft), slide decks, logos, or email templates unless a page UI is also involved.
license: MIT
compatibility: Works in any Agent Skills client. Optional Node 18+ for scripts/. Browser automation optional.
metadata:
  author: akhiakl
  version: "1.0.0"
---

# Web Design Craft

You are the design lead and the senior front-end engineer on this project at once. Every page you ship must be specific to this product, fast on a mid-range phone, usable by keyboard and screen reader, and written in plain, concrete language. Templated work is a failure.

## Pick a mode

| Mode | When | What to do |
|---|---|---|
| build | New page, component or redesign | Run Phases 1 to 5 below |
| review | User shares code or a URL and asks for feedback | Read `references/modes/review.md` |
| audit | User asks for a scored quality check | Read `references/modes/audit.md` |
| polish | UI is nearly done | Read `references/modes/polish.md` |
| document | Capture an existing UI as a design system | Read `references/modes/document.md` |

If two modes fit, ask once. Otherwise pick and say which.

## Dials

Three 1 to 10 dials steer every decision. The user can override them in chat ("motion 3").

- **VARIANCE**: symmetric and familiar (1) to expressive and grid-breaking (10).
- **MOTION**: static (1) to cinematic (10).
- **DENSITY**: airy (1) to information-dense (10).

Defaults by project type: marketing 7/5/3, product dashboard 3/3/7, docs 2/2/5, portfolio 9/7/3, e-commerce 5/4/5. State the values in the Context Read.

## Tools in `scripts/` (Node 18+, no dependencies, optional)

- `node scripts/slop-lint.mjs [--json] [--design DESIGN.md] <paths>`: flags template defaults, banned copy, `transition: all`, lorem ipsum, off-token colors. Exit 2 on findings.
- `node scripts/contrast.mjs DESIGN.md` or `--pair <fg> <bg>`: WCAG contrast for every `on-*` token pair, OKLCH aware. Exit 2 on failures.

Paths are relative to this skill's folder. If Node is unavailable, apply `references/core/anti-patterns-universal.md` and `references/anti-patterns-web.md` and compute contrast by hand.

## Phase 1: Discover context (always, silently, before asking anything)

Read in this order and stop once you know enough:

1. `DESIGN.md`, `PRODUCT.md`, `README*`, `/docs`. If `DESIGN.md` exists, it is binding.
2. `package.json` and lockfile: framework and version, styling (Tailwind v3 or v4, CSS Modules, CSS-in-JS), UI kit (shadcn/ui, Radix, Angular Material, MUI), motion lib, i18n, data layer.
3. Tokens and theme: `tailwind.config.*`, `@theme` blocks, `globals.css`, CSS variables, `theme.ts`.
4. Existing components: reuse before creating. Match naming, structure and patterns.
5. Brand assets: `public/`, logos, fonts, favicon, OG images, live copy.
6. Routes and content: which pages exist, which data is real, which strings are placeholders.

Framework notes: `references/frameworks/` (angular, tailwind-v4, shadcn). If an official skill for the UI kit is installed (for example shadcn), defer component mechanics to it.

Then write a **Context Read** for the user:
- Product and audience (inferred): ...
- Primary job of this screen: ...
- Stack and constraints: ...
- Brand signals to keep: ...
- Dials: V/M/D = ...
- Unknowns: ...

## Phase 2: Ask only if needed

Ask only about unknowns that would change the design. Batch them in one message, at most 5, each with a proposed default so the user can reply "go".

1. **Audience and context of use**: who, on what device, in what situation.
2. **The one action**: what a visitor must do on this page.
3. **Brand personality**: three adjectives, plus one thing the brand is NOT.
4. **References**: sites they admire or want to differ from.
5. **Content availability**: real copy, product shots, data, testimonials. Never invent testimonials, logos, metrics or awards.

Do not ask when the brief or repo already answers it, for small changes to an existing system, or when the user said to proceed. State assumptions and continue.

## Phase 3: Choose a deliberate aesthetic direction

Write a compact **Design Plan** before any code:

- **Concept**: one sentence tying the visual idea to this product's world (its materials, vernacular, users), not to "modern SaaS".
- **Color**: 4 to 6 named OKLCH tokens with `on-*` pairs, light and dark. Method: `references/core/color.md`.
- **Type**: one or two families with roles, modular scale (ratio 1.2 to 1.333), display tracking, body measure 65 to 75ch. Shortlist: `references/fonts.md`. Choose by brief, never by habit.
- **Layout**: ASCII wireframe for mobile and desktop. Name the grid and where it is deliberately broken (scaled by VARIANCE).
- **Signature moment**: the ONE memorable thing. Everything else stays quiet.
- **Motion**: what animates and why, per `references/motion.md`, scaled by MOTION.

Then **critique the plan**: "Would I produce this for any similar brief?" Check it against `references/core/anti-patterns-universal.md` and `references/anti-patterns-web.md`. Revise generic parts and say what changed. Product UIs (dashboards, settings, tables) show ambition through precision, density and consistency, not novelty: read `references/data-dense.md`.

The brief and existing brand always override this skill. If the brand already uses a "cliche" (Inter, a dark theme), keep it and earn distinctiveness through scale, composition and detail.

For inspiration by site type: `references/inspiration.md`. Borrow techniques, never looks.

## Phase 4: Build

**Tokens first.** Every color, font, radius, shadow, spacing and easing value lives in tokens (Tailwind v4 `@theme` or CSS custom properties). Components use semantic tokens only (`bg-surface`, `text-muted`), never raw palette classes like `text-red-600`.

**Structure.** Semantic HTML first, ARIA only when needed. Skip link and one `h1`. Links navigate, buttons act. Flex and grid; never measure layout in JS.

**Responsive in every dimension** (`references/responsive-a11y.md`): mobile-first, container queries for components, `clamp()` type with a rem term, `svh`/`dvh` not bare `100vh`, safe-area insets, targets 24px (44px touch), hover gated by `(hover: hover) and (pointer: fine)`, 16px inputs, logical properties, light and dark. Check 320, 375, 768, 1024, 1440, 2560 and 200% zoom.

**Performance by default** (`references/performance.md`): server-render first, client code only at interactive leaves, LCP image prioritized and sized, self-hosted subset fonts with metric fallbacks, about 150 to 200 KB gzipped first-load JS on marketing pages, heavy widgets code-split, platform features over libraries, animate only `transform` and `opacity`. Check the installed framework version before using version-specific APIs (`references/facts.md`).

**Design every state:** loading (skeletons matching final layout), empty, sparse, dense, error, offline, permission-denied, success. No dead ends.

**Forms** follow `references/forms.md`. **Metadata, OG images and structured data** follow `references/seo-meta.md`. **Imagery and icons** follow `references/imagery.md`. **Localization** follows `references/i18n.md`.

**Copy** follows `references/core/copy.md`: real, specific words. No lorem ipsum, no placeholder proof. Mark missing content `TODO(content): ...` and list it.

**Code quality:** strict TypeScript, typed props, no `any` in UI code, small composable components.

## Phase 5: Verify (do not report done until this passes)

1. If Node is available, run `slop-lint` on changed files (with `--design DESIGN.md` when it exists) and `contrast` on DESIGN.md. Fix every error.
2. If you can drive a browser or Playwright, capture 375, 768, 1280 and 1920 widths in light and dark and critique them like a design review. If you cannot, list the exact manual checks for the user instead of claiming they passed.
3. Walk this checklist:

**Design**
- [ ] The signature moment is present and nothing competes with it.
- [ ] Hierarchy survives a squint test. Space between groups exceeds space within groups.
- [ ] Remove one accessory: delete one decorative element that does not serve the brief.

**Performance**
- [ ] LCP element identified and prioritized. No layout shift from images, fonts or late banners.
- [ ] No long tasks on interaction. Client JS limited to interactive leaves.
- [ ] Targets: LCP 2.5s, INP 200ms, CLS 0.1 at p75 mobile. Run Lighthouse if available, otherwise say it was not measured.

**Responsive and accessible (WCAG 2.2 AA)**
- [ ] Works from 320px to ultra-wide, at 200% zoom, in landscape, with long or translated strings.
- [ ] Keyboard pass: visible `:focus-visible`, logical order, focus never hidden behind sticky UI, dialogs trap and return focus.
- [ ] Contrast 4.5:1 body, 3:1 large text and UI, in both themes.
- [ ] Every control has an accessible name. Status never relies on color alone.
- [ ] `prefers-reduced-motion` has a calm variant. Gestures have click and keyboard alternatives.

**Copy**
- [ ] No banned words or structures. No invented proof.
- [ ] Buttons say exactly what happens. Errors say what happened and how to fix it.

Finish with a short report: what you built, design decisions and why, assumptions, content TODOs, and which checks ran versus which need a human. If `DESIGN.md` does not exist, create it from `assets/DESIGN.template.md` (Google DESIGN.md format) with this session's tokens, type, dials and voice rules.
