# skills

Agent Skills by [Akhil K](https://github.com/akhiakl). Each skill is a folder with a `SKILL.md` in the open [Agent Skills](https://agentskills.io) format, so it works in any agent that supports it: Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, OpenCode and others.

## Skills

| Skill | Use for | Version |
|---|---|---|
| [web-design-craft](skills/web-design-craft) | Websites and web apps: React, Next.js, Angular, Tailwind, shadcn, plain HTML/CSS | 1.0.0 |
| [mobile-design-craft](skills/mobile-design-craft) | React Native and Expo apps for iOS and Android | 1.0.0 |

Both skills follow the same workflow: read the project silently, ask at most 5 questions with defaults, write a Design Plan (OKLCH tokens, type, wireframes, one signature moment) and critique it against anti-patterns, build tokens-first, then verify and write a `DESIGN.md` in [Google's DESIGN.md format](https://github.com/google-labs-code/design.md).

- **Modes:** build, review, audit, polish, document.
- **Dials:** VARIANCE, MOTION, DENSITY (1 to 10). Say "density 8" or "motion 2" in chat to steer.
- **Scripts** (Node 18+, optional, no dependencies), inside each skill:
  ```bash
  node <skill>/scripts/slop-lint.mjs --design DESIGN.md src/   # template defaults, banned copy, platform rules
  node <skill>/scripts/contrast.mjs DESIGN.md                  # WCAG contrast for every on-* token pair
  node <skill>/scripts/contrast.mjs --hex DESIGN.md            # OKLCH tokens as hex (React Native themes)
  ```
- **Routing:** projects with `expo` or `react-native` in `package.json` use mobile-design-craft; everything else on the web uses web-design-craft.

## Install

**Any agent** via the [skills CLI](https://github.com/vercel-labs/skills):
```bash
npx skills add akhiakl/skills                                  # both skills, this project
npx skills add akhiakl/skills --skill mobile-design-craft      # one skill
npx skills add akhiakl/skills -g                               # all projects
```

**Claude Code plugin marketplace** (installs both):
```
/plugin marketplace add akhiakl/skills
/plugin install design-craft@akhiakl-skills
```

**Manual:** copy `skills/<name>/` into the skills folder your agent reads:

| Agent | Project path |
|---|---|
| Claude Code | `.claude/skills/` |
| Codex, Gemini CLI, Cursor, VS Code Copilot | `.agents/skills/` |
| GitHub Copilot | `.github/skills/` |

### Works well with
expo/skills (expo-native-ui, expo-design-system, expo-router, expo-animation), emilkowalski/skills (animate-expo), Vercel's web-design-guidelines. These skills own design decisions and verification; those own API depth.

## Development

```
shared/              canonical shared core (edit here)
  core/              universal anti-patterns, color, copy  -> skills/*/references/core/
  scripts/           slop-lint.mjs, contrast.mjs            -> skills/*/scripts/
  assets/            DESIGN.template.md                     -> skills/*/assets/
skills/<name>/       SKILL.md, references/, scripts/rules.json (owned per skill)
evals/               capability cases, trigger sets, fixtures
scripts/             sync-shared.mjs, ci-check.mjs
```

Edit `shared/`, never the generated copies, then run:
```bash
node scripts/sync-shared.mjs
node scripts/ci-check.mjs
```
CI (`.github/workflows/validate.yml`) fails on drift and also runs the Agent Skills reference validator, script self-tests and `claude plugin validate --strict`. See [evals/README.md](evals/README.md) and [CHANGELOG.md](CHANGELOG.md).

## License

MIT
