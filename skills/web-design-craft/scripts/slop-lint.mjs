#!/usr/bin/env node
// slop-lint: flags template defaults and banned copy in UI code. Node 18+, no dependencies.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HELP = `Usage: node slop-lint.mjs [--json] [--design DESIGN.md] [--ignore rule,rule] [--strict] <paths...>

Scans .html .css .scss .js .jsx .ts .tsx .vue .svelte .astro .md .mdx for AI-template
defaults, banned copy, transition: all, lorem ipsum and off-token hex colors.

Options:
  --json            JSON to stdout (diagnostics go to stderr)
  --design <file>   DESIGN.md; fonts it lists are allowed, hex colors not in it are flagged
  --ignore <ids>    comma-separated rule ids to skip
  --strict          also fail on "info" findings
  --help            show this help

Exit codes: 0 clean, 2 findings (error or warn), 1 usage error.`;

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) { console.log(HELP); process.exit(0); }
const opt = { json: false, design: null, ignore: new Set(), strict: false, paths: [] };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--json") opt.json = true;
  else if (a === "--strict") opt.strict = true;
  else if (a === "--design") opt.design = args[++i];
  else if (a === "--ignore") (args[++i] || "").split(",").forEach((r) => opt.ignore.add(r.trim()));
  else if (a.startsWith("--")) { console.error(`Unknown option ${a}\n\n${HELP}`); process.exit(1); }
  else opt.paths.push(a);
}
if (!opt.paths.length) { console.error(`No paths given.\n\n${HELP}`); process.exit(1); }

const here = dirname(fileURLToPath(import.meta.url));
const rules = JSON.parse(readFileSync(join(here, "rules.json"), "utf8")).rules
  .filter((r) => !opt.ignore.has(r.id))
  .map((r) => ({ ...r, re: new RegExp(r.pattern, r.flags.includes("g") ? r.flags : r.flags + "g") }));

let design = "";
if (opt.design) {
  if (!existsSync(opt.design)) { console.error(`DESIGN file not found: ${opt.design}`); process.exit(1); }
  design = readFileSync(opt.design, "utf8").toLowerCase();
}

const CODE = new Set([".html", ".css", ".scss", ".js", ".jsx", ".ts", ".tsx", ".vue", ".svelte", ".astro"]);
const COPY = new Set([".html", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".md", ".mdx"]);
const SKIP = new Set(["node_modules", ".git", ".next", "dist", "build", "out", ".turbo", "coverage", ".angular", ".svelte-kit"]);

function walk(p, acc) {
  if (!existsSync(p)) { console.error(`Path not found: ${p}`); return acc; }
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const e of readdirSync(p)) if (!SKIP.has(e)) walk(join(p, e), acc);
  } else if (CODE.has(extname(p)) || COPY.has(extname(p))) acc.push(p);
  return acc;
}
const files = opt.paths.flatMap((p) => walk(p, []));

const findings = [];
for (const file of files) {
  const ext = extname(file);
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, idx) => {
    for (const r of rules) {
      if (r.files === "code" && !CODE.has(ext)) continue;
      if (r.files === "copy" && !COPY.has(ext)) continue;
      r.re.lastIndex = 0;
      let m;
      while ((m = r.re.exec(line))) {
        if (r.allowIfInDesign && design && m[2] && design.includes(m[2].toLowerCase())) break;
        findings.push({ rule: r.id, severity: r.severity, file, line: idx + 1, col: m.index + 1,
          excerpt: line.trim().slice(0, 160), fix: r.fix });
        if (!m[0].length) r.re.lastIndex++;
      }
    }
    if (design && CODE.has(ext) && !opt.ignore.has("off-token")) {
      for (const m of line.matchAll(/#(?:[0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
        if (!design.includes(m[0].toLowerCase()))
          findings.push({ rule: "off-token", severity: "warn", file, line: idx + 1, col: m.index + 1,
            excerpt: line.trim().slice(0, 160), fix: "Use a DESIGN.md token instead of a literal color." });
      }
    }
  });
}

const failing = findings.filter((f) => f.severity !== "info" || opt.strict);
if (opt.json) {
  console.log(JSON.stringify({ files: files.length, findings, summary: count(findings) }, null, 2));
} else {
  for (const f of findings) console.log(`${f.file}:${f.line}:${f.col}  ${f.severity.padEnd(5)} ${f.rule}  ${f.excerpt}\n    fix: ${f.fix}`);
  console.error(`slop-lint: ${files.length} files, ${JSON.stringify(count(findings))}`);
}
process.exit(failing.length ? 2 : 0);

function count(list) {
  return list.reduce((a, f) => ((a[f.severity] = (a[f.severity] || 0) + 1), a), {});
}
