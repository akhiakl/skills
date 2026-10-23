# Imagery and icons

## Sourcing order
1. Real product, real place, real people (with consent).
2. Commissioned photography or illustration in a consistent style.
3. Licensed stock, art-directed: crop tight, color-grade to the palette, avoid staged "team smiling at laptop" shots.
4. If nothing real exists, use type, color and layout instead of filler images. Mark slots `TODO(content): image`.

Never generate fake product screenshots, fake dashboards or fake people presented as real.

## Delivery
- AVIF or WebP with fallback, responsive `srcset` and `sizes`, explicit width and height or `aspect-ratio`.
- LCP image prioritized; everything else lazy.
- Art direction with `<picture>` when the crop must change by breakpoint.
- Decorative images `alt=""`. Informative images: alt says what it shows and why it matters, not "image of".

## Icons
- One family, one stroke width, one corner style (for example Lucide, Phosphor, Tabler, or custom). Never mix families.
- Size icons to the text they accompany (1em to 1.25em) and align optically.
- Icon-only buttons need `aria-label`. Pair icons with text for anything non-obvious.
- No emoji as UI icons. No big rounded icon tiles above every heading.
