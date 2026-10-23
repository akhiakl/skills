#!/usr/bin/env node
// Repo house rules for every skill under skills/. Node 18+, no dependencies.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const errors = [];
const fail = (m) => errors.push(m);
const walk = (d) => readdirSync(d).flatMap((e) => (statSync(join(d, e)).isDirectory() ? walk(join(d, e)) : [join(d, e)]));
const plugin = JSON.parse(readFileSync(".claude-plugin/plugin.json", "utf8"));

for (const name of readdirSync("skills")) {
  const dir = join("skills", name);
  const skillPath = join(dir, "SKILL.md");
  if (!existsSync(skillPath)) { fail(`${dir}: missing SKILL.md`); continue; }
  const src = readFileSync(skillPath, "utf8");
  const fm = src.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) { fail(`${skillPath}: missing front matter`); continue; }
  const get = (k) => (fm[1].match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");
  if (get("name") !== name) fail(`${skillPath}: name "${get("name")}" must match folder "${name}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) fail(`${skillPath}: invalid name`);
  const desc = get("description") || "";
  if (!desc || desc.length > 1024) fail(`${skillPath}: description must be 1 to 1024 chars (is ${desc.length})`);
  const allowed = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);
  for (const m of fm[1].matchAll(/^([\w-]+):/gm)) if (!allowed.has(m[1])) fail(`${skillPath}: non-spec front matter key "${m[1]}"`);
  const lines = src.split("\n").length;
  if (lines > 500) fail(`${skillPath}: ${lines} lines, keep under 500`);
  const ver = (fm[1].match(/version:\s*"?([\d.]+)"?/) || [])[1];
  if (ver !== plugin.version) fail(`${skillPath}: metadata.version ${ver} != plugin.json ${plugin.version}`);

  for (const f of walk(dir)) {
    if (!/\.(md|json|mjs)$/.test(f)) continue;
    const text = readFileSync(f, "utf8");
    if (text.includes("—")) fail(`${f}: contains an em dash`);
    if (f.endsWith(".md")) {
      for (const m of text.matchAll(/`((?:references|scripts|assets)\/[\w./-]+?\.(?:md|mjs|json))`/g)) {
        if (!existsSync(join(dir, m[1]))) fail(`${f}: broken reference ${m[1]}`);
      }
      for (const m of text.matchAll(/\]\((?!https?:|#|mailto:)([^)]+)\)/g)) {
        if (!existsSync(resolve(dirname(f), m[1]))) fail(`${f}: broken link ${m[1]}`);
      }
    }
  }
  for (const f of walk(dir).filter((f) => f.endsWith(".mjs"))) {
    try { execFileSync("node", [f, "--help"], { stdio: "pipe" }); } catch { fail(`${f}: --help did not exit 0`); }
  }
}

if (errors.length) { console.error(errors.map((e) => `x ${e}`).join("\n")); process.exit(1); }
console.log("ci-check: all house rules pass");
