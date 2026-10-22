# skills

Agent Skills by [Akhil K](https://github.com/akhiakl). Each skill is a folder with a `SKILL.md` that follows the open [Agent Skills](https://agentskills.io) format, so it works in any agent that supports it: Claude Code, Codex, Cursor, OpenCode, GitHub Copilot, Gemini CLI and others.

## Skills

| Skill | What it does |
|---|---|
| [web-design-craft](skills/web-design-craft) | Designs and builds distinctive, fast, responsive, accessible web pages and apps. Reads the project first, asks only what the repo can't answer, avoids AI-template looks, writes real copy, and verifies Core Web Vitals, WCAG 2.2 AA and responsiveness before finishing. |

## Install

**Any agent** (via the [skills CLI](https://github.com/vercel-labs/skills), Node 22.20+):

```bash
npx skills add akhiakl/skills                         # this project
npx skills add akhiakl/skills -g                      # all projects
npx skills add akhiakl/skills --skill web-design-craft -a claude-code
```

**Claude Code plugin marketplace:**

```
/plugin marketplace add akhiakl/skills
/plugin install web-design-craft@akhiakl-skills
```

**Manual:** copy `skills/<name>/` into your agent's skills directory (for example `.claude/skills/`, `.agents/skills/` or the path your agent documents).

## Layout

```
skills/
  <skill-name>/
    SKILL.md        # frontmatter (name, description) + instructions
    references/     # loaded on demand
```

## Tips

- `web-design-craft` writes a `DESIGN.md` in your project on first run. Commit it so later sessions reuse your tokens, type and voice.
- Pair it with a reviewer such as Vercel's `web-design-guidelines` before PRs.

## License

MIT
