# Evals

Portable, Agent Skills format. Run each capability case with and without the skill (3 runs each) and compare.

- `evals.json` (web, 7 cases) and `mobile-evals.json` (mobile, 6 cases): capability cases with objective expectations. Grade mechanical ones with `skills/web-design-craft/scripts/` and the rest with an LLM judge that has not seen the skill. Drop expectations that pass in both configurations; they show no skill value.
- `trigger-eval.json` (web) and `mobile-trigger-eval.json` (mobile): should-trigger and near-miss queries for description tuning. Each includes the other skill's prompts as near-misses to test routing. Use a 60/40 train/validation split, a 0.5 threshold over 3 runs, and at most 5 description iterations.
- `fixtures/`: inputs referenced by the cases.

Claude Code users can also drive these through skill-creator. Runners for other agents that read this format include `skill-ab-eval` and `agent-skills-eval`.
