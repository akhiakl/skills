# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions follow semver.

## [1.0.0] - 2026-10-23
### Added
- web-design-craft skill: 5-phase build workflow and core references (anti-patterns, performance, responsive and a11y, motion, copy, inspiration).
- Modes: build, review, audit, polish, document (`references/modes/`).
- Dials: VARIANCE, MOTION, DENSITY with defaults per project type.
- `scripts/slop-lint.mjs` with shared `rules.json`, and `scripts/contrast.mjs` (OKLCH aware). Node 18+, zero dependencies.
- `assets/DESIGN.template.md` in Google DESIGN.md (alpha) format.
- References: forms, data-dense UI, fonts, color method, SEO and OG, i18n, imagery and icons, version-sensitive facts, framework notes (Angular, Tailwind v4, shadcn).
- Evals: 7 capability cases with fixtures, 20 trigger queries.
- CI: spec validation, house rules, script self-tests, `claude plugin validate --strict`.
### Notes
- Description written for trigger accuracy with explicit exclusions; spec fields `license`, `compatibility`, `metadata.version` added.
- Verification steps are conditional and tool-neutral (no assumed browser or screenshot tool).
