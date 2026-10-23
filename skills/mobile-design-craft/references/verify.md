# Verify

## Always (no device needed)
1. `npx tsc --noEmit`
2. `npx expo-doctor@latest`
3. `npx expo install --check`
4. `npx expo lint` (if configured)
5. `node <skill>/scripts/slop-lint.mjs app src components`
6. `node <skill>/scripts/contrast.mjs DESIGN.md` (light and dark pairs)
7. `npx expo export --platform ios --platform android` (bundles both; catches bad imports)
8. Tests if configured (Jest with React Native Testing Library)

## Checklist
- [ ] Safe areas on all edges; content clear of the notch, home indicator and Android bars
- [ ] Every icon-only control labeled; roles and states set
- [ ] Targets 44pt / 48dp
- [ ] Font scaling on; no fixed text heights
- [ ] Dark mode designed; contrast passes
- [ ] Reduce Motion fallback for every animation; signature moment present
- [ ] Empty, loading, error and offline states exist
- [ ] Lists virtualized; images via expo-image
- [ ] Native tabs and stack; back gesture works
- [ ] Layout uses `useWindowDimensions`; no orientation assumptions

## Only if a simulator, emulator or Maestro is available
- Run the app (`npx expo run:ios` / `run:android`, or Expo's agent tooling if installed), screenshot key screens in light, dark and the largest text size.
- Walk the main flow with VoiceOver or TalkBack.
- Maestro: `maestro test .maestro/` for the main flow.

## Report
List each check as pass, fixed, or skipped (with reason). Never claim device checks passed if they did not run.
