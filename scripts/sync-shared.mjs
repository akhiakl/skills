#!/usr/bin/env node
// Copies shared/ into every skill so each installs standalone. --check exits 1 on drift (CI).
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

const MAP = [
  ["shared/core", "references/core"],
  ["shared/scripts", "scripts"],
  ["shared/assets", "assets"],
];
const check = process.argv.includes("--check");
const skills = readdirSync("skills").filter((d) => existsSync(join("skills", d, "SKILL.md")));
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const header = (src) => `<!-- GENERATED from ${src}. Edit the source, then run: node scripts/sync-shared.mjs -->\n`;
let drift = 0;

for (const skill of skills) {
  for (const [from, to] of MAP) {
    for (const src of walk(from)) {
      const dest = join("skills", skill, to, src.slice(from.length + 1));
      const body = readFileSync(src, "utf8");
      const out = src.endsWith(".md") && !body.startsWith("---") ? header(src) + body : body;
      if (existsSync(dest) && readFileSync(dest, "utf8") === out) continue;
      if (check) { console.error(`drift: ${dest}`); drift++; continue; }
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, out);
      console.log(`synced ${dest}`);
    }
  }
}
if (check && drift) { console.error("Run: node scripts/sync-shared.mjs"); process.exit(1); }
if (check) console.log("sync-shared: no drift");
