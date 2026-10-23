#!/usr/bin/env node
// contrast: WCAG 2.x contrast for DESIGN.md token pairs. OKLCH, hex and rgb aware. Node 18+, no dependencies.
import { readFileSync, existsSync } from "node:fs";

const HELP = `Usage:
  node contrast.mjs [--json] <DESIGN.md>        check every on-<name> token against <name>
  node contrast.mjs [--json] --pair <fg> <bg>   check one pair, e.g. --pair "oklch(0.2 0.01 80)" "#fafafa"
  node contrast.mjs --hex <color> [<color>...]  convert to #rrggbb (for runtimes without oklch, e.g. React Native)
  node contrast.mjs --hex DESIGN.md             print every DESIGN.md color token as hex

Colors: oklch(L C H) with L as 0-1 or %, #rgb, #rrggbb, rgb(r, g, b).
Thresholds: text 4.5:1, large text and UI 3:1 (WCAG 2.2 AA).
Exit codes: 0 all pass, 2 a text pair is under 4.5:1, 1 usage error.`;

const args = process.argv.slice(2);
if (!args.length || args.includes("--help") || args.includes("-h")) { console.log(HELP); process.exit(args.length ? 0 : 1); }
const json = args.includes("--json");
const rest = args.filter((a) => a !== "--json");

function parse(c) {
  c = String(c).trim().replace(/^["']|["']$/g, "");
  let m;
  if ((m = c.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*[\d.%]+\s*)?\)$/i))) {
    const L = parseFloat(m[1]) / (m[2] ? 100 : 1), C = parseFloat(m[3]), H = (parseFloat(m[4]) * Math.PI) / 180;
    const a = C * Math.cos(H), b = C * Math.sin(H);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    return [
      4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
    ].map((v) => Math.min(1, Math.max(0, v)));
  }
  if ((m = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i))) {
    let h = m[1]; if (h.length === 3) h = [...h].map((x) => x + x).join("");
    return [0, 2, 4].map((i) => lin(parseInt(h.slice(i, i + 2), 16) / 255));
  }
  if ((m = c.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i))) return [m[1], m[2], m[3]].map((v) => lin(+v / 255));
  return null;
}
function lin(v) { return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }
function lum([r, g, b]) { return 0.2126 * r + 0.7152 * g + 0.0722 * b; }
function ratio(fg, bg) {
  const a = lum(fg), b = lum(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
function check(name, fgS, bgS) {
  const fg = parse(fgS), bg = parse(bgS);
  if (!fg || !bg) return { pair: name, error: `Unparseable color: ${!fg ? fgS : bgS}` };
  const r = Math.round(ratio(fg, bg) * 100) / 100;
  return { pair: name, fg: fgS, bg: bgS, ratio: r, AA_text: r >= 4.5, AA_large: r >= 3, AA_ui: r >= 3 };
}

function hex(rgb) {
  return "#" + rgb.map((v) => {
    const e = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, e)) * 255).toString(16).padStart(2, "0");
  }).join("");
}
function tokens(file) {
  const fm = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/);
  if (!fm) { console.error("No YAML front matter found."); process.exit(1); }
  const colors = {};
  let inColors = false;
  for (const line of fm[1].split("\n")) {
    if (/^colors:\s*$/.test(line)) { inColors = true; continue; }
    if (inColors && /^\S/.test(line)) inColors = false;
    const m = inColors && line.match(/^\s+([\w-]+):\s*(.+?)\s*$/);
    if (m) colors[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return colors;
}

if (rest[0] === "--hex") {
  const items = rest.length === 2 && existsSync(rest[1]) ? Object.entries(tokens(rest[1])) : rest.slice(1).map((c) => [c, c]);
  if (!items.length) { console.error(HELP); process.exit(1); }
  const out = items.map(([name, c]) => { const p = parse(c); return { name, input: c, hex: p ? hex(p) : null }; });
  if (json) console.log(JSON.stringify(out, null, 2));
  else for (const o of out) console.log(`${o.hex ?? "unparseable"}  ${o.name}`);
  process.exit(out.some((o) => !o.hex) ? 2 : 0);
}

let results = [];
if (rest[0] === "--pair") {
  if (rest.length < 3) { console.error(HELP); process.exit(1); }
  results.push(check("pair", rest[1], rest[2]));
} else {
  const file = rest[0];
  if (!existsSync(file)) { console.error(`File not found: ${file}`); process.exit(1); }
  const colors = tokens(file);
  for (const [k, v] of Object.entries(colors)) {
    if (!k.startsWith("on-")) continue;
    const base = k.slice(3);
    if (colors[base]) results.push(check(`${k} on ${base}`, v, colors[base]));
    else console.error(`warn: ${k} has no base token "${base}"`);
  }
  if (!results.length) { console.error("No on-* pairs found under colors:."); process.exit(1); }
}

if (json) console.log(JSON.stringify(results, null, 2));
else for (const r of results)
  console.log(r.error ? `${r.pair}: ${r.error}` : `${r.AA_text ? "PASS" : r.AA_large ? "LARGE" : "FAIL"}  ${r.ratio}:1  ${r.pair}`);
const bad = results.some((r) => r.error || !r.AA_text);
process.exit(bad ? 2 : 0);
