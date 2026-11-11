---
name: pr-review
description: Review a GitHub PR and post a formal review (verdict badge, severity-badged inline comments). Re-reviews only what changed since the last review. Use for "/pr-review <pr|url>", "review pr N", "rereview pr N", or "/pr-review" alone to pick from tracked PRs (merged ones are pruned).
---

# pr-review

Token-lean PR reviewer. The script `scripts/prr.py` (in this skill's folder; use its full path when running from elsewhere) does all GitHub plumbing; you only read the diff and write findings. Never fix code, only comment.

## Flow

1. **Target.** `/pr-review <target>` -> step 2, where target is a PR URL, `owner/repo#N`, or a bare number (current repo). URL and `owner/repo#N` work from any directory, no local clone needed. `/pr-review` alone or "rereview" with no target -> run `python3 scripts/prr.py list`. It covers every repo you have reviewed, prunes merged/closed PRs and marks `NEW COMMITS`. If exactly one PR has new commits, use it; otherwise ask which one with AskUserQuestion (options = PRs with new commits first).
2. **Diff.** `python3 scripts/prr.py diff <pr>`. Output is already compact: lock/binary files skipped, only head-file line numbers on `N+added` / `N context` lines, `-removed` lines unnumbered, `# previously open:` lines for unresolved earlier findings. If it says merged or no new commits, report that and stop.
3. **Review** the printed diff only. Read a source file or run typecheck/tests only when a finding depends on it, and say in the summary what you did not run. No subagents, no whole-repo exploration.
   - Look for: wrong conditions/off-by-one/null, missing await, state or timing bugs, removed guards, broken callers (grep a symbol only when needed), obvious waste on hot paths, quoted CLAUDE.md violations.
   - Re-review: judge each `previously open` item against the new diff. Put fixed ones in `resolved` as `path:line`. Still-broken ones stay open automatically.
   - At most 8 findings, real defects first. No style nitpicks, no speculation without a failure scenario.
4. **Post.** Write JSON to the scratchpad, then `python3 scripts/prr.py post <pr> <file.json>`:
   ```json
   {"summary": "one short paragraph: what was reviewed, what was not run",
    "resolved": ["src/a.ts:12"],
    "comments": [{"path": "src/a.ts", "line": 40, "sev": "P2", "title": "Short bold title", "body": "What is wrong, concrete failure scenario, suggested fix."}]}
   ```
   `line` must be a number shown on a `N+`/`N ` line of the diff. `sev`: P0 critical, P1 high, P2 medium, P3 low.
   The script sets the verdict badge itself (Action needed if any open P0-P2, Comments only if only P3, Approval recommended if none), approves when allowed (clean and not your own PR), otherwise posts a comment review, and records the reviewed SHA so the next run is incremental.
5. **Reply** to the user in 3-5 lines: review link, verdict, findings with severity and `file:line`, what was not run.

## Rules

- Keep the summary and comment bodies short; the badge and title carry the severity.
- Do not print the full diff or findings again in chat.
- State lives in `~/.claude/pr-reviews/<owner>__<repo>.json`; delete the file to reset tracking.
