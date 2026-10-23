# Styling and theming

## Tokens
- Author colors in OKLCH in DESIGN.md. Emit hex into `src/theme/colors.ts` with `node scripts/contrast.mjs --hex DESIGN.md`.
- Components use semantic names only (`colors.surface`, never `colors.gray100` or a literal).
- Spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48. Radius: 6, 10, 14, 20, full. `borderCurve: "continuous"` on iOS for smooth corners.
- Type scale (pt, before font scaling): 34/41 large title, 28/34, 22/28, 17/22 body, 15/20, 13/18, 11/13 caption.
- Never fix the height of a Text container; use `minHeight` and padding.
- Shadows: `boxShadow` style strings on the New Architecture. In dark mode raise surfaces with lighter fills, not shadows.

## Dark mode
- `userInterfaceStyle: "automatic"` in app.json. Drive the theme from `useColorScheme`.
- Design the dark palette; never invert. Lower chroma, avoid pure #000 except for deliberate OLED-black brands, keep `on-*` pairs at 4.5:1.
- Platform-stock look: iOS semantic colors via `PlatformColor('label')`, `PlatformColor('systemBackground')`.
- Set the root background (expo-system-ui) to the theme background to avoid white flashes.

## Contrast
Run `node scripts/contrast.mjs DESIGN.md` for light and dark pairs. Body text 4.5:1, large text and icons 3:1.
