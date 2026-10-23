---
version: alpha
name: <Product> Design System
description: <one line: personality and audience>
colors:
  surface: "oklch(0.98 0.005 80)"
  on-surface: "oklch(0.22 0.01 80)"
  muted: "oklch(0.94 0.008 80)"
  on-muted: "oklch(0.45 0.01 80)"
  primary: "oklch(0.32 0.04 250)"
  on-primary: "oklch(0.98 0.01 250)"
  accent: "oklch(0.55 0.17 35)"
  on-accent: "oklch(0.99 0.01 35)"
  surface-dark: "oklch(0.18 0.01 250)"
  on-surface-dark: "oklch(0.93 0.01 250)"
typography:
  display:
    fontFamily: <Display face>
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  body-md:
    fontFamily: <Text face>
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: <Text face>
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
rounded:
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    padding: 12px
---

## Overview
Concept, audience, the one action, signature moment. Dials: VARIANCE/MOTION/DENSITY = x/x/x.

## Colors
Role of each token. Dark mode: surfaces lift lightness, accents drop chroma. Never invert.

## Typography
Pairing rationale, scale, fluid clamp() ranges, max line length 65 to 75ch.

## Layout
Grid or container-query model, breakpoints, safe areas, spacing rhythm.

## Elevation & Depth
Tonal layers or shadows, and when each is used.

## Shapes
Radius logic. Nested radius = outer minus padding.

## Components
States: default, hover (pointer only), focus-visible, active, disabled, loading, empty, error.

## Do's and Don'ts
Motion: durations, easing, reduced-motion fallback. Voice: three adjectives, banned words for this product. Patterns this product must avoid.

## Platform (apps only)
Stance (platform-adaptive or brand-uniform), navigation map (tabs, stacks, sheets), haptic map, Dynamic Type and font-scaling strategy, safe-area and edge-to-edge rules.
