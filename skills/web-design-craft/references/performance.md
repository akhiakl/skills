# Performance checklist (2026)

## Targets (field data, p75, mobile and desktop separately)
| Metric | Good | Poor |
|---|---|---|
| LCP | ≤ 2.5 s | > 4.0 s |
| INP | ≤ 200 ms | > 500 ms |
| CLS | ≤ 0.1 | > 0.25 |

Mutations (POST, PATCH, DELETE) finish under 500 ms or are optimistic with rollback.

## LCP
- Identify the LCP element per template. Server-render it; never gate it behind client JS, a carousel or a fade-in.
- Image: framework component, explicit width and height, `sizes`, AVIF or WebP, priority or `fetchpriority="high"`, never `loading="lazy"`.
- Preconnect to image or CDN origins. Preload only above-the-fold assets.
- Fonts: self-host, subset by script, at most 2 families and few weights, preload the face used by LCP text.

## INP
- Short handlers. Yield between work chunks (`scheduler.yield()` where supported, else `setTimeout`).
- Heavy computation in Web Workers. Virtualize long lists or use `content-visibility: auto`.
- Uncontrolled inputs where possible. Debounce expensive filtering. `useTransition` / `useDeferredValue` for non-urgent updates.
- Minimize re-renders (React DevTools, React Scan). React Compiler removes most manual memoization.
- Do not hydrate what never changes. Server Components ship zero JS.

## CLS
- Reserve space for images, embeds, ads, banners. Skeletons match final dimensions.
- Metric-matched font fallbacks (`next/font` does this; otherwise `size-adjust`, `ascent-override`).
- Never insert content above existing content except after user action.
- Animate `transform` and `opacity` only.

## Next.js (App Router)
- Server Components by default; push `"use client"` to leaves.
- Next.js 16: `cacheComponents` makes data dynamic by default and Partial Prerendering the model. Mark cacheable work with `"use cache"`, tune with `cacheLife`, invalidate with `cacheTag` + `revalidateTag` or `updateTag`. Wrap dynamic parts in `<Suspense>` so the static shell streams first.
- `next/image`, `next/font`, `next/script` (`lazyOnload` for third parties), `dynamic()` for heavy client widgets.
- Check the installed version before using version-specific APIs.

## Angular
- Standalone components, `@defer (on viewport)` below the fold, `NgOptimizedImage` with `priority` on the LCP image.
- Signals and OnPush, or zoneless where supported. SSR with hydration.

## JS and CSS budget
- Marketing pages: about 150 to 200 KB gzipped first-load JS max. App shells: justify every dependency.
- Platform over libraries: Popover API, `<dialog>`, CSS anchor positioning, same-document View Transitions, `:has()`, container queries, scroll-driven animations as enhancement.
- Third-party scripts after interaction or idle. Audit tag managers.

## Media and motion
- `<video autoplay muted loop playsinline>` instead of GIF, with poster and a still for reduced motion.
- WebGL/3D: Draco or Meshopt models, KTX2 textures, capped DPR, pause off-screen, lazy-load after LCP.
- Preference order: CSS, Web Animations API, JS libraries.

## Measure
- Lab: Lighthouse and DevTools Performance with 4x CPU and network throttling, extensions off.
- Field: `web-vitals` or RUM, plus Search Console Core Web Vitals. Test Safari and iOS Low Power Mode.
