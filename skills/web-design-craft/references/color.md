# Color: OKLCH method

## Build the palette
1. **Brand hue.** Take it from the logo or brand; otherwise derive from the product's world (materials, place, category). Record hue angle H.
2. **Neutrals.** Tint toward H with chroma 0.005 to 0.02. Steps: surface (L 0.97 to 0.99), raised surface, border (L about 0.88), muted text (L about 0.50), text (L 0.18 to 0.25).
3. **One accent.** Chroma 0.12 to 0.20. Reserve it for primary action, focus and links. If the brand hue is calm, the accent can be a complementary or adjacent hue.
4. **Status colors.** success, warning, danger, info at matching lightness so none shouts louder than the others.
5. **`on-*` pairs.** Every background token gets an `on-` text token. Run `scripts/contrast.mjs` until all pass (4.5:1 text, 3:1 UI and large text).

## Dark mode transform
- Not an inversion. Surfaces L 0.15 to 0.22 with the same tint, never pure black.
- Raise elevation by lifting lightness (+0.03 per level), not by shadows.
- Lower accent chroma by about 20% and raise its lightness so it does not vibrate.
- Text L 0.90 to 0.95, never pure white for body.
- Re-run contrast on dark pairs.

## Rules
- Components use semantic tokens only.
- Gray text on a colored background: use a tint of that background's hue instead.
- Never encode meaning with color alone.
- Gradients only when the concept calls for them; avoid purple-to-blue and cyan-on-dark defaults.
- Tailwind v4 palettes are OKLCH already; map them to semantic tokens instead of using them raw.
