# Motion and haptics

## Motion
- State-driven changes (toggle, expand, select): Reanimated CSS transitions.
- Gesture or scroll-driven motion, shared transitions, choreography: shared values and worklets on the UI thread.
- Animate transform and opacity; avoid per-frame layout changes.
- Durations: 150 to 250ms for micro, 250 to 400ms for screen-level. Springs for anything the finger touched.
- Reduce Motion: `useReducedMotion` or Reanimated's reduce-motion config; replace movement with a crossfade or nothing.
- Stagger lists only on first appearance, at most about 6 items.
- No animation on actions repeated many times a day.

## Haptic map (expo-haptics)
| Event | Call |
|---|---|
| Toggle, selection change | `selectionAsync()` |
| Primary action success | `notificationAsync(Success)` |
| Error or blocked action | `notificationAsync(Error)` |
| Drag snap, sheet detent | `impactAsync(Light)` |
| Destructive confirm | `impactAsync(Medium)` |

Android can use `performAndroidHapticsAsync` for system-matched feedback. Never haptic on scroll, every tap or page load. One haptic per user intent.

## Signature moment ideas
- Pull-to-refresh with a branded spring illustration.
- A completion check that morphs, with a success haptic.
- A card stack swipe with velocity-aware springs and a detent haptic.
