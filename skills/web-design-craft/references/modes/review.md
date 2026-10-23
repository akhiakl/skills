# Mode: review

Give feedback on existing UI. Do not rewrite code unless asked.

1. Run Phase 1 discovery (lightly) so feedback fits the stack and brand.
2. If Node is available, run `scripts/slop-lint.mjs --json` on the files under review and fold the findings in.
3. Output one table, ordered by user impact:

| # | Where (file:line) | Before | After | Why |
|---|---|---|---|---|

4. Order of concern: broken accessibility or function, layout and spacing, type, color and surfaces, interaction states, motion, copy.
5. End with the 3 changes that would move the needle most, and offer to apply them.

Rules: be specific (name the token, value, string). Quote the current copy when critiquing copy. No generic advice like "improve hierarchy" without saying how.
