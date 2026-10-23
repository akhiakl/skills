# Stack defaults

Verified 2026-10-23 from the Expo changelog and docs. Re-check on every Expo SDK release, and always trust the installed versions in `package.json` over this file.

## Versions
| Fact | Value |
|---|---|
| Latest Expo SDK | 58 (Oct 15, 2026): React Native 0.88, React 19.3. iOS 16.4+, Android 7+, targetSdk 36, Xcode 26.4+, Node 22.13+ |
| Previous SDK | 57 (Jun 30, 2026): React Native 0.86. On 57, use expo 57.0.17+ (fixes a Hermes memory regression) |
| New projects | `create-expo-app` may still scaffold SDK 57 until Expo Go supports 58; use `--template default@sdk-58` with a dev build for 58 |
| Architecture | New Architecture only (Legacy dropped in SDK 55) |
| Removed in RN 0.87 to 0.88 | `InteractionManager`, `Touchable` root export, `Modal animated`, `StatusBar backgroundColor/translucent`; `ImageBackground` deprecated; deep `react-native/Libraries/` imports are type errors |
| Expo Router (SDK 58) | Native tabs, toolbars and data loaders stable |
| Android | targetSdk 36 enforces edge-to-edge with no opt-out; R8 minification on by default in SDK 58 release builds |
| NativeWind | v4 is `latest` (Tailwind 3); v5 (Tailwind 4) was RC in Sep 2026 |

## Use
| Need | Use | Avoid |
|---|---|---|
| Navigation | expo-router: Stack, NativeTabs, `formSheet` | JS tab bars, custom headers |
| Images | expo-image (`cachePolicy`, `placeholder`, `transition`) | react-native `Image`, `ImageBackground` |
| Lists | @shopify/flash-list v2, @legendapp/list | `ScrollView` + `map` for long lists; `estimatedItemSize` on v2 |
| Press | `Pressable` or Gesture Handler buttons | `TouchableOpacity/Highlight/WithoutFeedback` |
| Animation | react-native-reanimated 4 (CSS transitions for state, worklets for gesture and scroll) | react-native `Animated` |
| Gestures | react-native-gesture-handler (check the major version; APIs changed in 3.x) | `PanResponder` |
| Haptics | expo-haptics | `Vibration` |
| Glass and blur | expo-glass-effect (gate on `isLiquidGlassAvailable`), expo-blur | glass on content |
| Safe areas | react-native-safe-area-context | react-native `SafeAreaView` (deprecated) |
| Keyboard | react-native-keyboard-controller | hand-tuned `KeyboardAvoidingView` offsets |
| Fonts | expo-font config plugin; variable fonts supported in SDK 58 | loading many static weights at runtime |
| Icons | expo-symbols (SF Symbols, Material on Android), @expo/vector-icons | emoji as icons |
| Native controls | @expo/ui (SwiftUI, Jetpack Compose) when a stock look is wanted | re-implementing pickers and switches |
| Idle work | `requestIdleCallback` | `InteractionManager` |

## Styling choice
- The existing system wins.
- Otherwise: `StyleSheet` plus a typed theme (zero dependencies).
- NativeWind only if the team already uses Tailwind. Unistyles or Tamagui only if already installed.

## Dev loop
- Dev builds for real apps; Expo Go for quick prototypes only.
- Install with `npx expo install <pkg>` for SDK-aligned versions.
- Keep the React Compiler on if the template enables it; do not hand-memoize by default.
