# Angular notes

- Standalone components; no new NgModules. Prefer signals (`signal`, `computed`, `input()`, `output()`, `model()`) and `OnPush` or zoneless change detection where the app supports it.
- Built-in control flow (`@if`, `@for` with `track`, `@switch`). `@defer (on viewport)` for below-the-fold blocks, with `@placeholder` sized to avoid CLS.
- `NgOptimizedImage` (`ngSrc`, width and height, `priority` on the LCP image, `sizes` for responsive).
- SSR with hydration (incremental hydration where available). Set `Title` and `Meta` on the server.
- Tokens as CSS custom properties in `styles.css`; component styles reference them. With Angular Material, map tokens through its theming API instead of overriding internals.
- Forms: typed reactive forms; show errors after touched or submit, wire `aria-describedby` and `aria-invalid`.
- Animations: prefer CSS transitions and `@starting-style`; use Angular animations only for complex sequences.
- CDK for overlays, a11y (`FocusTrap`, `LiveAnnouncer`), and virtual scroll.
