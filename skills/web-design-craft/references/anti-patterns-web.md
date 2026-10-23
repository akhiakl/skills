# Anti-patterns: web

Read with `references/core/anti-patterns-universal.md`. Machine-checkable items live in `scripts/rules.json` and run via `scripts/slop-lint.mjs`.

## Layout
- Centered hero, two-line headline, two buttons, three icon cards, logos, testimonials, pricing, FAQ, regardless of product.
- Broadsheet layout (hairline rules, zero radius, dense columns) with no reason in the subject.
- Every section the same width and rhythm. Vary density and scale on purpose.
- Hero headline wrapping to four lines: the font size is wrong, not the copy.

## CSS and interaction
- `transition: all`. Animating anything but `transform` and `opacity`.
- Fade-and-slide-up on every section as it scrolls in. Hover lift and shadow on every card.
- Weight changes on hover (layout shift).
- `outline: none` without a `:focus-visible` replacement.
- Gradient text (`background-clip: text`) on headings.
- `#0B0B0B` or `#111` used reflexively as black.
- "A · B · C" meta strings and spaced-dash labels.
- Fake browser chrome around screenshots.

## Responsive
- "Responsive" meaning features removed on mobile. Adapt, do not amputate.
- Desktop layout squeezed down with tiny text and targets.
- `100vh` heroes that jump under mobile browser bars.
- Hover-only affordances on touch.
- `maximum-scale=1` or `user-scalable=no`.
