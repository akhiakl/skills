# Responsive and accessible in every dimension

## Viewport and layout
- Mobile-first. Components use container queries (`container-type: inline-size`, `@container`); page shifts use media queries.
- Fluid type: `font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem)`. Always include rem so zoom scales it.
- Fluid spacing tokens with clamp; scale steps at least 25% apart.
- Full height: `min-height: 100svh` (stable) or `100dvh` (tracks bars). No bare `100vh`.
- Safe areas: `env(safe-area-inset-*)` with `viewport-fit=cover`.
- Ultra-wide: cap measure (`max-inline-size: 70ch`). Check at 50% zoom.
- Stress content: 3x string length (German, Finnish), long names, empty and overfull lists.

## Input modes
- Hover effects inside `@media (hover: hover) and (pointer: fine)`; larger targets under `(pointer: coarse)`.
- Targets ≥ 24x24 CSS px (WCAG 2.5.8), 44x44 on touch. Grow hit areas with padding or pseudo-elements.
- `touch-action: manipulation` on controls, `overscroll-behavior: contain` in drawers and modals.
- Inputs ≥ 16px on mobile, correct `type`, `inputmode`, `autocomplete`, `enterkeyhint`. Allow paste.
- Drag, swipe, pinch always have tap/click and keyboard alternatives (WCAG 2.5.7).

## Theme and locale
- Light/dark via `prefers-color-scheme` plus a stored override applied before paint, `color-scheme` on `html`, `<meta name="theme-color">`.
- Dark mode is a re-tuned palette, not an inversion. Recheck contrast in both.
- Logical properties for RTL; mirror directional icons; test `dir="rtl"`.
- `Intl` for dates, numbers, currency. Language from `Accept-Language`, not IP. `translate="no"` on brand and code tokens.
- Tested paths for `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`.

## WCAG 2.2 AA essentials
- One `h1`, ordered headings, landmarks, skip link.
- Focus: visible `:focus-visible` ring ≥ 3:1. Never fully hidden by sticky headers, cookie banners or chat widgets (2.4.11); set `scroll-padding-top`.
- Dialogs and menus follow WAI-ARIA APG: focus in, trapped, returned on close, Escape closes.
- Contrast 4.5:1 body, 3:1 large text (24px or 18.66px bold) and UI/graphics. APCA as a second opinion only.
- Never color alone for status; pair with text or icon.
- Forms: visible labels, errors beside fields, focus first error on submit, `aria-live="polite"` for async updates.
- Auth: no cognitive tests; password managers and paste work (3.3.8).
- Media: captions, transcripts, pause for motion over 5s.
- Automated scanners miss most focus-obscured and target-size failures. Always do a manual keyboard and zoom pass.
