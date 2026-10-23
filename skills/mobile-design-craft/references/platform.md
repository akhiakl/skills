# Platform design

## Stance
- **Platform-adaptive (default)**: native chrome per OS (tabs, headers, sheets, switches, pickers, back gestures, fonts). The brand lives in color, illustration, content, motion and the signature moment.
- **Brand-uniform**: the same custom chrome on both OSes. Only for games, kids, media or strong-brand apps. Keep system back gestures, safe areas and accessibility behavior anyway.

## iOS (HIG, iOS 26 to 27)
- Liquid Glass is the navigation layer: tab bars, toolbars, sidebars, sheets. Never on content (cards, list rows, backgrounds). No glass on glass.
- Native tabs and stack headers get Liquid Glass automatically; JS-drawn chrome does not.
- Custom glass controls: expo-glass-effect, gated on `isLiquidGlassAvailable`, with an opaque fallback (Reduce Transparency, Android, older iOS).
- Large titles on top-level lists; inline titles on detail screens.
- Sheets with detents for secondary tasks; full-screen modals only for focused creation flows.
- Edge-swipe back must always work.
- SF Pro via the system font; SF Symbols for icons. Hit area 44x44pt.
- iOS 27 makes apps resizable and may ignore orientation locks. Use Stack and NativeTabs so the system places bars.

## Android (Material 3 Expressive)
- Edge-to-edge always: draw behind system bars and pad with insets.
- Predictive back: do not intercept back without reason.
- Bottom navigation with 3 to 5 destinations; top app bar; a FAB for the single primary action where it fits.
- Motion: springs. Standard (no bounce) for routine UI; expressive (overshoot) only for hero moments. MOTION 1 to 4 uses standard only.
- Expressive shapes and shape morphing on decorative or hero elements, not on every button.
- Roboto via the system font; Material Symbols. Targets 48x48dp with 8dp between.
- Dynamic color (Material You) is optional; keep the brand primary for key actions.

## Both
- System font first. At most one custom display face, for headings or numerals.
- Respect Dark Mode, Dynamic Type / font scale, Reduce Motion, Reduce Transparency, Bold Text, Increase Contrast.
- Split divergent UI with `Component.ios.tsx` / `Component.android.tsx` or `process.env.EXPO_OS`.
