# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions follow semver.

## [Unreleased]
### Added
- **pr-review** plugin and skill (0.1.0): reviews a GitHub PR from a URL, posts a verdict badge and severity-badged inline comments, re-reviews only new commits, drops merged PRs from its tracked list.

## [1.0.0] - 2026-10-24
### Added
- **web-design-craft**: 5-phase build workflow; modes (build, review, audit, polish, document); VARIANCE, MOTION, DENSITY dials; references for performance, responsive and a11y, motion, inspiration, forms, data-dense UI, fonts, SEO and OG, i18n, imagery, facts, and Angular, Tailwind v4 and shadcn notes.
- **mobile-design-craft**: React Native and Expo (SDK 57 to 58) skill with the same workflow, platform-adaptive guidance (HIG and Liquid Glass, Material 3 Expressive), navigation, theming, motion and haptics, accessibility, performance, mobile copy, store assets, inspiration and device-free verification. 23 lint rules for React Native.
- **Shared core** in `shared/`: universal anti-patterns, OKLCH color method, copy rules, Google DESIGN.md template, `slop-lint.mjs` (file-scope rules, path excludes) and `contrast.mjs` (WCAG contrast, OKLCH to hex). `scripts/sync-shared.mjs` copies it into each skill so every skill installs standalone.
- Evals: 13 capability cases with fixtures and two trigger sets that test routing between the skills.
- CI: shared-core drift check, spec validation, house rules, script self-tests, `claude plugin validate --strict`.
- Claude Code plugin `design-craft` bundling both skills.
