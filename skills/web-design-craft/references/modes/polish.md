# Mode: polish

UI is nearly done. Improve finish without redesigning.

1. Read DESIGN.md if present; it is binding.
2. Run Phase 5 verification. Run the scripts when Node is available.
3. Fix only what fails, in this order: accessibility, layout shift and spacing rhythm, type details (tracking, measure, widows, tabular numbers), interaction states (hover gated, focus-visible, active, disabled, loading), motion timing and easing, copy.
4. Detail pass: nested radii (inner = outer minus padding), optical alignment of icons, consistent icon stroke, `text-wrap: balance` on headings and `pretty` on body, hairline borders that align to pixels, no orphaned single words in buttons.
5. Report each change as one line: what, where, why. Do not change the concept, palette or layout grid.
