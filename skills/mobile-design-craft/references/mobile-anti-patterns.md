# Mobile anti-patterns

Read with `references/core/anti-patterns-universal.md`. Machine-checkable items live in `scripts/rules.json`.

| Slop | Fix |
|---|---|
| JS-drawn bottom tab bar with a floating pill and glow | NativeTabs; brand through icons and tint |
| Glass or blur on every card | Glass on the navigation layer only; solid content surfaces |
| Purple-to-indigo gradient onboarding hero | Brand color with a real product shot or coherent illustration |
| Swipeable 4-screen onboarding carousel before any value | Show the product first; ask for an account at first save |
| Permission prompts at launch | Ask in context, after a pre-prompt explaining the benefit |
| Emoji as tab or list icons | SF Symbols or Material Symbols |
| Hamburger drawer as primary phone navigation | 3 to 5 tabs |
| Custom back button that breaks edge swipe | Native stack header |
| Centered spinner for every load | Skeletons matching layout; optimistic updates |
| Toasts for errors that need action | Inline error with retry |
| Fixed-height text rows that clip at large text | Let rows grow (`minHeight`) |
| Small icon buttons with no label | 44pt/48dp hit area and `accessibilityLabel` |
| Identical chrome forced on iOS and Android | Platform-adaptive chrome, shared brand |
| Haptic on every tap | One haptic per meaningful intent |
| Content under the status bar or home indicator | Safe-area insets on all edges |
| `Dimensions.get` at module scope | `useWindowDimensions` |
| Paywall before any value, hidden close button | Visible close, value first, honest trial terms |
| Generic stock illustration people | Product UI, real photos or one coherent illustration style |
