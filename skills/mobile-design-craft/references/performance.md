# Performance

- Lists: FlashList v2 or LegendList for anything over about 20 rows or unbounded. Stable `keyExtractor`; `getItemType` for mixed rows; keep `renderItem` light.
- Images: expo-image with `cachePolicy="memory-disk"`, correctly sized sources, blurhash or thumbhash placeholders, short `transition`.
- Re-renders: React Compiler on; small context values; split fast-changing state; selectors in stores.
- Startup: defer non-critical work with `requestIdleCallback`; keep the splash (`preventAutoHideAsync`, `hideAsync`) until fonts and first data are ready.
- Animations run on the UI thread (Reanimated worklets).
- Bundle: inspect with Expo Atlas; avoid heavy utility libraries; add R8 keep rules for reflection-based libraries in Android release builds.
- Hermes is the engine; profile release builds, not dev builds.
