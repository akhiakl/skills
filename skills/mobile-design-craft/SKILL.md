---
name: mobile-design-craft
description: Designs, builds, reviews and polishes native-feeling React Native apps with Expo and Expo Router for iOS and Android. Use when asked to build, design, redesign, review, audit, polish or document a mobile app, screen, tab bar, onboarding, settings, paywall, list, form or component in an Expo or React Native project, or when the request mentions iOS, Android, Liquid Glass, Material 3, haptics, safe areas, Dynamic Type, app dark mode, app icon, splash screen or store screenshots. Runs discover, ask, plan, build, verify and writes DESIGN.md. Do not use for websites or web apps in Next.js, Vite, Angular or plain HTML, including making a website responsive on phones (use web-design-craft); Flutter, SwiftUI-only or Kotlin/Compose-only projects; Expo SDK upgrades, native module authoring, or EAS build, submit, update and billing setup.
license: MIT
compatibility: Works in any Agent Skills client. Optional Node 18+ for scripts/. Targets Expo SDK 57 to 58 and React Native 0.86 to 0.88 (verified 2026-10-23). Simulator, emulator, Maestro optional.
metadata:
  author: akhiakl
  version: "1.0.0"
---

# Mobile Design Craft

Build Expo apps that feel native on each platform and still look like the brand. This skill owns design decisions and verification. For API depth, defer to the official docs and to installed Expo skills (expo-native-ui, expo-design-system, expo-router, expo-animation) or animate-expo.

## Pick a mode

| Mode | When | What to do |
|---|---|---|
| build | New app, screen or flow | Run Phases 1 to 5 |
| review | Feedback on existing screens | Phase 1, run slop-lint, output `Where (file:line) / Before / After / Why` table. No edits |
| audit | Scored quality check | Run `references/verify.md` checks, score a11y, performance, platform fit, distinctiveness, copy 0 to 4, list P0 to P3 findings. No edits |
| polish | Nearly done | Keep structure; fix spacing, type, states, motion, haptics, copy. One line per change |
| document | Capture the system | Extract tokens from code into DESIGN.md. No visual changes |

## Dials (1 to 10, user can override in chat)

- **VARIANCE**: platform stock (1) to fully custom brand chrome (10). Above 6 needs a stated reason.
- **MOTION**: system transitions only (1) to choreographed (10). Always honor Reduce Motion.
- **DENSITY**: spacious consumer (1) to data-dense pro tool (10).

Defaults: consumer 4/5/4, productivity 3/4/6, finance or health 3/3/6, game or kids 8/8/3, media 6/6/4.

## Phase 1: Discover (silent)

1. `package.json`: expo SDK, react-native, expo-router, styling lib (StyleSheet, nativewind, unistyles, tamagui), reanimated, gesture-handler, list lib, expo-image.
2. `app.json` / `app.config.*`: name, scheme, userInterfaceStyle, icon, splash, plugins, `ios.supportsTablet`.
3. `app/` route tree: `_layout` files, tabs, stacks, modals.
4. Existing tokens: `src/theme/`, `constants/Colors.ts`, `global.css`, tailwind config, `DESIGN.md` (binding if present).
5. Existing components and icon set.

Write a Context Read: app and audience, primary job, stack and SDK, brand signals to keep, dials, unknowns. Never introduce a second theme system beside an existing one. Check versions against `references/stack.md`.

## Phase 2: Ask (max 5 questions, one batch, each with a default)

1. Platform stance: platform-adaptive (default) or brand-uniform?
2. Audience and the one task they open the app for.
3. Brand inputs: logo, color, font, or "propose" (default: propose).
4. Dials (default per app type above).
5. Must-haves: dark mode (default yes), tablet and resizable layout (default adaptive single column with max width), offline, auth.

If the repo answers it, do not ask. If the user says "just build", use defaults and state them.

## Phase 3: Design Plan (show before building)

1. **Tokens**: OKLCH colors, light and dark, semantic roles with `on-*` pairs (`references/core/color.md`), 4-based spacing, radius scale, type scale, motion durations and springs, haptic map. RN mapping: `references/styling-theming.md`.
2. **Type**: system font (SF Pro, Roboto) by default; at most one custom display face. State the Dynamic Type strategy.
3. **Navigation map**: tabs (3 to 5), stacks, sheets, modals. Native primitives first: `references/navigation.md`.
4. **Wireframes**: ASCII per key screen, including empty, loading, error and offline states.
5. **Signature moment**: one memorable interaction (gesture, transition, haptic or illustration). Name it, justify it, give its Reduce Motion fallback.
6. **Platform stance** per `references/platform.md`; motion and haptics per `references/motion-haptics.md`.
7. **Self-critique**: check against `references/mobile-anti-patterns.md` and `references/core/anti-patterns-universal.md`. Say what changed.

## Phase 4: Build (tokens first)

1. Theme tokens in `src/theme/` and a `useTheme` hook driven by `useColorScheme`. Convert OKLCH to hex with `node scripts/contrast.mjs --hex DESIGN.md` (RN does not parse `oklch()`).
2. Primitives: Text (font scaling on), Button (Pressable, 44pt/48dp hit area, pressed state, haptic), IconButton (`accessibilityLabel` required), Screen (safe areas, keyboard).
3. Routes with Expo Router native tabs and native stack; secondary tasks as `formSheet`.
4. Screens: lists with FlashList v2 or LegendList, images with expo-image, every state designed.
5. Motion last: Reanimated CSS transitions for state changes, worklets for gesture and scroll.
6. Copy per `references/mobile-copy.md` and `references/core/copy.md`. Store assets per `references/store-assets.md`.

Load only the references the task needs. Performance rules: `references/performance.md`. Accessibility: `references/a11y.md`. Inspiration: `references/inspiration.md`.

## Phase 5: Verify

Run `references/verify.md`: type check, expo-doctor, dependency check, lint, slop-lint, contrast, export bundle; device checks only if a simulator, emulator or Maestro is available. Report each check as pass, fixed, or skipped with reason. Then write or update DESIGN.md from `assets/DESIGN.template.md`, including the Platform section.

## Hard rules

- Never disable font scaling globally. Never set `maxFontSizeMultiplier` below 1.3 on body text.
- Every icon-only Pressable gets `accessibilityRole="button"` and `accessibilityLabel`.
- Hit areas 44x44pt iOS, 48x48dp Android (`hitSlop` when the visual is smaller).
- Liquid Glass and blur on the navigation layer only, with an opaque fallback.
- No JS-drawn tab bars or headers unless VARIANCE is 7 or more and the user agreed.
- `useWindowDimensions`, not `Dimensions.get`; layouts survive resize, foldables and orientation changes.
- Safe areas on all four edges; Android is always edge-to-edge.
- Reduce Motion replaces movement with fades or nothing.

## Scripts (Node 18+, no dependencies, optional)

- `node scripts/slop-lint.mjs [--json] [--design DESIGN.md] <paths>`: React Native and universal rules from `scripts/rules.json`. Exit 2 on findings.
- `node scripts/contrast.mjs DESIGN.md`: WCAG contrast for every `on-*` pair. `--pair <fg> <bg>` for one pair. `--hex DESIGN.md` prints hex tokens for the theme file.

Paths are relative to this skill's folder. Without Node, apply the anti-pattern lists by hand.
