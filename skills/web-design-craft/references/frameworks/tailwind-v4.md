# Tailwind v4 notes

- CSS-first config. Define tokens in `@theme` so utilities are generated from them:

```css
@import "tailwindcss";
@theme {
  --color-surface: oklch(0.98 0.005 80);
  --color-on-surface: oklch(0.22 0.01 80);
  --color-accent: oklch(0.62 0.17 35);
  --font-display: "Bricolage Grotesque", ui-sans-serif, sans-serif;
  --radius-md: 8px;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}
```
- Dark mode: override the same variables under `@media (prefers-color-scheme: dark)` or a `.dark` / `[data-theme=dark]` selector with `@custom-variant dark`.
- Use semantic utilities (`bg-surface`, `text-on-surface`) in components. Never raw palette classes (`text-red-600`) outside token definitions.
- Container queries are built in: `@container` on the parent, `@md:` variants on children.
- Gate hover: Tailwind v4 `hover:` already applies only on devices that support hover.
- Avoid `transition-all`; use `transition-[transform,opacity]` or `transition-colors`.
- Keep class lists readable: extract repeated patterns into components, not `@apply` soup.
