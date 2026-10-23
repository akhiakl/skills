# Fonts: choose by brief, never by habit

Any fixed shortlist converges if reused. Pick from the brief first, then check this list. Do not repeat the pairing used in the previous project or the previous generation.

Sources: Google Fonts (fonts.google.com, OFL), Fontshare (fontshare.com, free for commercial use; check each license). Self-host and subset either way.

## Starting points by brief
| Brief | Display | Text | Notes |
|---|---|---|---|
| Editorial, culture | Newsreader | Literata | Use optical sizes; generous measure |
| Editorial, sharp | Gloock | Schibsted Grotesk | High-contrast serif headlines only |
| Technical, dev tools | Geist | Geist Mono | Tight display tracking, mono for code only |
| Technical, warm | IBM Plex Sans | IBM Plex Mono | Plex Serif for long reads |
| Friendly product | Bricolage Grotesque | Hanken Grotesk | Bricolage at large sizes only |
| Neutral Swiss | Switzer (Fontshare) | Switzer | One family, contrast via weight and size |
| Confident startup | Cabinet Grotesk (Fontshare) | Satoshi (Fontshare) | Avoid all-caps eyebrows |
| Luxury, fashion | Zodiak (Fontshare) | General Sans (Fontshare) | Light tracking, large white space |
| Literary, calm | Erode (Fontshare) | Source Serif 4 | Serif text needs 17 to 19px |
| Bold, poster | Unbounded | Archivo | Display only at hero scale |
| Retail, crafted | Young Serif | Figtree | Warm, readable |
| Civic, accessible | Atkinson Hyperlegible Next | Public Sans | Legibility first |
| Playful | Chillax (Fontshare) | Outfit | Keep body neutral |
| Multilingual, Cyrillic | Golos Text | Onest | Wide script coverage |
| Indic scripts | Noto Sans (script) | Hind / Mukta | Test conjuncts and line height |

## Rules
- Max two families. Distinguish roles by size, weight and width before adding a family.
- Variable fonts: load only the axes and range you use.
- `font-display: swap` plus a metric-matched fallback (`size-adjust`, `ascent-override`, `descent-override`). `next/font` computes these.
- Display sizes: tracking -0.01em to -0.03em. Small caps labels: +0.02em to +0.06em.
- Body 16 to 18px, line height 1.5 to 1.7, measure 65 to 75ch. Headings line height 1.05 to 1.2.
- Enable useful OpenType features: `tnum` for numbers, `ss01`-style alternates only if they serve the brand.
- Already-cliched by AI output: Inter, Roboto, Space Grotesk, Fraunces, Instrument Serif. Use only when the brand already does, or with a stated reason.
