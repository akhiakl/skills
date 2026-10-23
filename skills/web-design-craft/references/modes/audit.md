# Mode: audit

Produce a scored, prioritized report. Change nothing.

## Score each area 0 to 4
| Area | 0 | 2 | 4 |
|---|---|---|---|
| Accessibility (WCAG 2.2 AA) | Blocks keyboard or screen reader use | Minor gaps | Passes manual keyboard, contrast, names, focus |
| Performance | LCP over 4s or heavy client JS | Some budget overruns | Meets CWV targets and JS budget |
| Responsive | Breaks under 375px or at 200% zoom | Works but cramped | Adapts at every width, input mode and theme |
| Distinctiveness (slop) | Reads as a template | Mixed | Specific to this product, no anti-patterns |
| Copy | Vague or invented | Mostly clear | Specific, consistent, helpful states |

## Steps
1. Discover context (Phase 1).
2. Run `scripts/slop-lint.mjs --json` and `scripts/contrast.mjs` when Node is available. Record what ran and what did not.
3. List findings as P0 (blocks users or legal risk), P1 (hurts conversion or trust), P2 (quality), P3 (nice to have), each with file:line, evidence and fix.
4. Optional fix plans: for each P0/P1 cluster, write a self-contained plan another agent can execute without this conversation (goal, files, exact changes, how to verify).

## Output
Scores table, top 5 findings, full findings list, what was not checked and why.
