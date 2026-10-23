<!-- GENERATED from shared/core/anti-patterns-universal.md. Edit the source, then run: node scripts/sync-shared.mjs -->
# Anti-patterns: universal

Defaults that make any interface, web or mobile, look generated. A check, not a ban: any item is fine if the brief or brand asks for it. Never use one because it is the default. Platform-specific lists live beside this file in each skill.

## Visual looks
- Warm cream background (near #F4F1EA) with high-contrast serif and terracotta accent (near #D97757).
- Near-black background with one acid-green, cyan or vermilion accent.
- Identical rounded cards, one radius everywhere, the same soft shadow, gradient washes as decoration.
- Purple-to-blue or cyan-on-dark gradients, neon glows, glass or blur as a default surface.
- The same section or screen sequence regardless of product (hero, three features, logos, testimonials, pricing).

## Typography
- Inter, Roboto, Arial, Open Sans or system fonts chosen by habit for brand display. If used, use them on purpose.
- LLM-favorite display serifs (Fraunces, Instrument Serif) by habit.
- One headline word in italic, another color or another family.
- Tracked-out ALL-CAPS eyebrow above every heading. Monospace labels with no technical reason.
- Body weights below 400.

## Color
- Pure #000 or untinted grays. Tint neutrals toward the brand hue.
- Gray text on colored backgrounds. Use a shade of the background hue.
- Competing accents. Accent as decoration instead of meaning (action, focus, status).
- Raw palette values inside components instead of semantic tokens.
- Color as the only signal for status.

## Layout and components
- Everything centered. Equal spacing everywhere, so groups are ambiguous.
- 01 / 02 / 03 markers on content that is not a sequence.
- Cards in cards. Cards where spacing or a divider would do.
- Big rounded icon tiles above every heading. Emoji as icons. Mixed icon families.
- Colored side-stripe borders as decoration. An arrow on every button.
- Sparkle "AI" icons on every feature.

## Content
- Fake screenshots, fake dashboards with random numbers, stock "team" photos.
- Invented testimonials, ratings, logos, user counts or awards.
- Lorem ipsum or "John Doe". Write real copy or mark `TODO(content)`.

## Motion
- The same fade-and-slide-up on everything.
- Bounce or elastic easing on routine UI. Animating from scale 0.
- Animation on high-frequency actions. No reduced-motion path.
