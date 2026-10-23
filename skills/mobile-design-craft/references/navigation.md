# Navigation (Expo Router)

- Root `app/_layout.tsx` is a Stack. Tabs live in `app/(tabs)/_layout.tsx` using NativeTabs.
- 3 to 5 tabs, labeled with nouns. SF Symbols on iOS, Material Symbols on Android.
- Search-led apps: a native search tab where supported.
- Each tab owns a Stack so state survives tab switches. Tapping the active tab scrolls to top and pops to root.
- Secondary tasks: `presentation: "formSheet"` with `sheetAllowedDetents`. Destructive confirmation via native Alert or action sheet.
- Toolbars: use the router's native toolbar APIs where the installed version provides them.
- Deep links: every screen reachable by URL; set `scheme` in app.json. Every push notification opens its exact screen.
- No custom navigators unless required.
- Auth: redirect in the layout, not inside screens, so protected content never flashes.
- Never block the iOS edge-swipe or Android predictive back on stack screens.
