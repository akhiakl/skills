# Anti-patterns: defaults that make a page look generated

A check, not a ban. Any item is fine if the brief or brand asks for it. Never use one because it is the default.

## Visual looks
- Warm cream background (near #F4F1EA) with high-contrast serif and terracotta accent (near #D97757).
- Near-black background with one acid-green, cyan or vermilion accent.
- Broadsheet layout (hairline rules, zero radius, dense columns) with no reason in the subject.
- SaaS card kit: identical rounded cards, one radius everywhere, the same soft shadow, gradient washes as decoration.
- Purple-to-blue or cyan-on-dark gradients, neon glows, glassmorphism as a default surface.
- Centered hero, two-line headline, two buttons, three icon cards, logos, testimonials, pricing, FAQ, regardless of product.

## Typography
- Inter, Roboto, Arial, Open Sans or system-ui by habit. If used, use on purpose (OpenType features, display cut, tracking).
- LLM-favorite display serifs (Fraunces, Instrument Serif) by habit.
- One headline word in italic, another color or another family.
- Tracked-out ALL-CAPS eyebrow above every heading.
- Monospace for small labels with no technical reason.
- Hero headline wrapping to four lines: the font size is wrong, not the copy.
- Body weights below 400. Weight changes on hover (layout shift).

## Color
- Pure #000 or untinted grays. Tint neutrals toward the brand hue.
- #0B0B0B or #111 used reflexively as "black".
- Gray text on colored backgrounds. Use a shade of the background hue.
- Competing accents. Accent as decoration instead of meaning (action, focus, status).
- Raw palette utilities (`text-blue-600`) in components instead of semantic tokens.

## Layout
- Everything centered. Pick a deliberate alignment axis (usually left).
- Equal spacing everywhere, so groups are ambiguous.
- 01 / 02 / 03 markers on content that is not a sequence.
- Every section the same width and rhythm. Vary density and scale on purpose.
- Cards in cards. Cards where spacing or a divider would do.

## Components and details
- Big rounded icon tiles above every heading. Emoji as icons.
- Colored side-stripe borders on cards and alerts as decoration.
- "A · B · C" meta strings and spaced-dash labels.
- An arrow on every link and button.
- Fake browser chrome, fake dashboards with random numbers, stock "team" photos.
- Invented testimonials, ratings, logos, user counts or awards.

## Motion
- Fade-and-slide-up on every section.
- Hover lift and shadow on every card.
- Bounce or elastic easing on UI. `ease-in` on entrances.
- Animating from `scale(0)`. `transition: all`.
- Animation on keyboard-triggered or high-frequency actions.

## Responsive
- "Responsive" meaning features removed on mobile. Adapt, do not amputate.
- Desktop layout squeezed down with tiny text and targets.
- `100vh` heroes that jump under mobile browser bars.
- Hover-only affordances on touch.
