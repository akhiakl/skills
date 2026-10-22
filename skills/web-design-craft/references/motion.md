# Motion with purpose

## Should it animate?
| How often users see it | Decision |
|---|---|
| 100+ times a day (shortcuts, command palette, list nav) | No animation |
| Tens of times a day (hover, tabs) | Minimal or none |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare (onboarding, first success) | Room for delight |

Valid purposes: spatial continuity, state change, feedback, explanation, avoiding a jarring cut. "Looks cool" is not a purpose on a frequent element.

## Values
- UI 120 to 250 ms, never over 300 ms. Page-level moves 300 to 500 ms. Drawers about 500 ms.
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for entering and exiting UI.
- `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for elements moving on screen.
- `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` for sheets and drawers.
- Linear for progress and marquees. Never `ease-in` for UI.
- Springs with subtle bounce (0.1 to 0.3) only for drag and playful moments.

## Rules
- Animate `transform`, `opacity` (`clip-path`, `filter` sparingly). List properties explicitly.
- Enter from `scale(0.95)` + opacity 0, never `scale(0)`. Popovers scale from their trigger (`transform-origin`); modals stay centered.
- Press feedback: `:active { transform: scale(0.97) }`.
- Interruptible: rapid toggles use transitions, not keyframes.
- `@starting-style` for CSS enter animations. View Transitions for route and state changes; cross-document as progressive enhancement.
- One orchestrated moment per page beats scattered effects.
- `prefers-reduced-motion: reduce`: replace movement with opacity or instant change, keep meaning.
- Debug by slowing animations 2 to 5x in DevTools.
