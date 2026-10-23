# Data-dense UI: dashboards, tables, admin

Ambition here is precision and calm, not novelty. Default dials 3/3/7.

## Layout
- Put the most decision-relevant number top left. Group KPIs by question, not by data source.
- Sticky table headers and first column for wide tables. Horizontal scroll inside the table, never the page.
- Density toggle (comfortable, compact) when users live in the screen.

## Numbers and text
- `font-variant-numeric: tabular-nums` for any column or changing value. Right-align numbers, left-align text.
- Units in headers, not every cell. Locale-aware formatting via `Intl.NumberFormat`.
- Show deltas with sign and direction, not color alone (`+4.2%` with an icon).
- Truncate with ellipsis plus full value on hover/focus (tooltip or title) and in detail view.

## Color
- Neutral canvas. Color only for status, selection and series.
- Status set: success, warning, danger, info, each with text or icon backup.
- Charts: color-blind-safe categorical palette, no rainbow scales, sequential palettes for magnitude, diverging only around a meaningful midpoint. Label lines directly instead of relying on legends.

## States
- Loading: skeletons for first load, keep stale data with a subtle indicator on refresh.
- Empty: explain what will appear and the action that fills it.
- Error: per-widget, so one failed query does not blank the page. Offer retry.
- Partial data and permissions: say what is missing and why.

## Interaction
- Keyboard first: command palette, visible shortcuts, arrow keys in grids, Escape closes.
- No animation on frequent actions. Filters, sort, tab and pagination live in the URL.
- Optimistic updates with undo for reversible actions. Confirm only irreversible ones.
- Virtualize lists over a few hundred rows.
