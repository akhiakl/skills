# skills

Agent Skills by [Akhil K](https://github.com/akhiakl). Each skill is a folder with a `SKILL.md` in the open [Agent Skills](https://agentskills.io) format, so it works in any agent that supports it: Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, OpenCode and others.

## Skills

| Skill | Version | What it does |
|---|---|---|
| [web-design-craft](skills/web-design-craft) | 1.0.0 | Designs, builds, reviews, audits and polishes distinctive web UI. Reads the project first, asks only what it must, avoids AI-template looks, writes real copy, and verifies Core Web Vitals, WCAG 2.2 AA and responsiveness. Ships a slop linter and an OKLCH contrast checker. |

### web-design-craft at a glance
- **Modes:** build, review, audit, polish, document.
- **Dials:** VARIANCE, MOTION, DENSITY (1 to 10). Say "density 8" or "motion 2" in chat to steer.
- **Output:** a design plan, tokens-first code and a `DESIGN.md` in [Google's DESIGN.md format](https://github.com/google-labs-code/design.md). Commit it so later sessions reuse your system.
- **Scripts** (Node 18+, optional, no dependencies):
  ```bash
  node skills/web-design-craft/scripts/slop-lint.mjs --design DESIGN.md src/
  node skills/web-design-craft/scripts/contrast.mjs DESIGN.md
  ```

## Install

**Any agent** via the [skills CLI](https://github.com/vercel-labs/skills):
```bash
npx skills add akhiakl/skills            # this project
npx skills add akhiakl/skills -g         # all projects
npx skills add akhiakl/skills --skill web-design-craft -a claude-code
```

**Claude Code plugin marketplace:**
```
/plugin marketplace add akhiakl/skills
/plugin install web-design-craft@akhiakl-skills
```

**Manual:** copy `skills/web-design-craft/` into the skills folder your agent reads:

| Agent | Project path |
|---|---|
| Claude Code | `.claude/skills/` |
| Codex, Gemini CLI, Cursor, VS Code Copilot | `.agents/skills/` |
| GitHub Copilot | `.github/skills/` |

Pin a version for long projects: `npx skills add akhiakl/skills#v1.0.0`.

## Development

```
skills/<name>/      SKILL.md, references/, scripts/, assets/
evals/              capability cases, trigger queries, fixtures
scripts/ci-check.mjs  house rules (spec fields, size, links, no em dashes, version sync)
```

Run `node scripts/ci-check.mjs` before pushing. CI (`.github/workflows/validate.yml`) runs the Agent Skills reference validator, these house rules, script self-tests and `claude plugin validate --strict`. See [evals/README.md](evals/README.md) for running evals and [CHANGELOG.md](CHANGELOG.md) for history.

## License

MIT
