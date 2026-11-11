#!/usr/bin/env python3
"""pr-review helper: keeps token use low by doing all GitHub plumbing outside the model.

  prr.py list [--repo O/N]            tracked PRs across all repos; prunes merged/closed ones
  prr.py diff <target> [--repo O/N]   compact line-numbered diff (incremental if reviewed before)
  prr.py post <target> <file.json>    post the review (verdict badge + inline comments), record state
target = PR URL | owner/repo#N | N (current repo or --repo)
"""
import json, os, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

SKIP = re.compile(r"(^|/)(pnpm-lock\.yaml|package-lock\.json|yarn\.lock|Cargo\.lock|.*\.(svg|png|jpg|gif|ico|woff2?|map)|.*\.min\.(js|css))$")
SEV = {"P0": ("critical", "red"), "P1": ("high", "orange"), "P2": ("medium", "yellow"), "P3": ("low", "lightgrey")}
VERDICT = {
    "action": ("Action needed", "red"),
    "comments": ("Comments only", "blue"),
    "approve": ("Approval recommended", "brightgreen"),
}


def gh(*a, inp=None, check=True):
    r = subprocess.run(["gh", *a], input=inp, capture_output=True, text=True)
    if check and r.returncode:
        sys.exit(f"gh {' '.join(a[:3])} failed: {r.stderr.strip()[:300]}")
    return r


def badge(label, msg, color):
    esc = lambda s: s.replace("-", "--").replace(" ", "%20")
    return f"![{label}](https://img.shields.io/badge/{esc(label)}-{esc(msg)}-{color})" if msg else ""


def parse_target(t, repo):
    m = re.match(r"(?:https://github\.com/)?([\w.-]+/[\w.-]+?)(?:/pull/|#|/)(\d+)", t)
    if m:  # URL, owner/repo#N or owner/repo/N: works from any directory
        return m.group(1), m.group(2)
    return repo or cwd_repo(), t.lstrip("#")


def cwd_repo():
    r = gh("repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner", check=False)
    if r.returncode:
        sys.exit("Not inside a GitHub repo. Pass a PR URL, owner/repo#N, or --repo owner/name.")
    return r.stdout.strip()


def state_path(repo):
    d = os.path.expanduser("~/.claude/pr-reviews")
    os.makedirs(d, exist_ok=True)
    return f"{d}/{repo.replace('/', '__')}.json"


def load(repo):
    try:
        return json.load(open(state_path(repo)))
    except Exception:
        return {"prs": {}}


def save(repo, st):
    json.dump(st, open(state_path(repo), "w"), indent=1)


def annotate(diff):
    """Keep only head-file line numbers on added/context lines: exactly what an inline comment needs."""
    out, skipped, skip, n = [], [], False, 0
    for ln in diff.splitlines():
        if ln.startswith("diff --git"):
            path = ln.split(" b/", 1)[-1]
            skip = bool(SKIP.search(path))
            if skip:
                skipped.append(path)
            else:
                out.append(f"## {path}")
        elif skip or ln.startswith(("index ", "--- ", "+++ ", "new file", "deleted file", "similarity", "rename")):
            continue
        elif ln.startswith("@@"):
            n = int(re.search(r"\+(\d+)", ln).group(1))
            out.append("…")
        elif ln.startswith("+"):
            out.append(f"{n}+{ln[1:]}")
            n += 1
        elif ln.startswith("-"):
            out.append(f"-{ln[1:]}")
        elif ln.startswith(" "):
            out.append(f"{n} {ln[1:]}")
            n += 1
    return "\n".join(out), skipped


def cmd_list(repo):
    d = os.path.expanduser("~/.claude/pr-reviews")
    os.makedirs(d, exist_ok=True)
    repos = [repo] if repo else [f[:-5].replace("__", "/") for f in sorted(os.listdir(d)) if f.endswith(".json")]
    def one(rn):
        r, n = rn
        x = gh("pr", "view", n, "--repo", r, "--json", "state,headRefOid,title", check=False)
        return r, n, json.loads(x.stdout) if x.returncode == 0 else None
    jobs = [(r, n) for r in repos for n in load(r)["prs"]]
    with ThreadPoolExecutor(8) as ex:
        res = list(ex.map(one, jobs))
    sts = {r: load(r) for r in repos}
    for r, n, m in res:
        p = sts[r]["prs"][n]
        if m is None:
            print(f"{r}#{n} unreachable, kept")
        elif m["state"] != "OPEN":
            print(f"{r}#{n} {m['state'].lower()}: removed from list")
            del sts[r]["prs"][n]
        else:
            new = m["headRefOid"] != p.get("reviewed_sha")
            print(f"{r}#{n} {m['title']} | {'NEW COMMITS' if new else 'up to date'} | {len(p.get('open', []))} open finding(s)")
    for r, st in sts.items():
        save(r, st)
    if not any(st["prs"] for st in sts.values()):
        print("no open tracked PRs")


def cmd_diff(target, repo):
    repo, n = parse_target(target, repo)
    meta = json.loads(gh("pr", "view", n, "--repo", repo, "--json", "state,headRefOid,title,author,baseRefName").stdout)
    st = load(repo)
    prev = st["prs"].get(n, {})
    if meta["state"] != "OPEN":
        st["prs"].pop(n, None)
        save(repo, st)
        sys.exit(f"#{n} is {meta['state'].lower()}; removed from the list. Nothing to review.")
    head, old = meta["headRefOid"], prev.get("reviewed_sha")
    if old == head:
        sys.exit(f"#{n} has no new commits since the last review ({head[:7]}).")
    mode, raw = "full", None
    if old:
        r = gh("api", "-H", "Accept: application/vnd.github.diff", f"repos/{repo}/compare/{old}...{head}", check=False)
        if r.returncode == 0 and r.stdout:
            mode, raw = f"incremental since {old[:7]}", r.stdout
    if raw is None:
        raw = gh("pr", "diff", n, "--repo", repo).stdout
    body, skipped = annotate(raw)
    print(f"# {repo}#{n} {meta['title']} | author {meta['author']['login']} | head {head[:7]} | {mode}")
    if skipped:
        print(f"# skipped (generated/binary): {', '.join(skipped)}")
    for f in prev.get("open", []):
        print(f"# previously open: {f['path']}:{f['line']} [{f['sev']}] {f['title']}")
    print(body)


def cmd_post(target, jf, repo):
    repo, n = parse_target(target, repo)
    data = json.load(open(jf))
    meta = json.loads(gh("pr", "view", n, "--repo", repo, "--json", "headRefOid,title,author").stdout)
    head = meta["headRefOid"]
    st = load(repo)
    prev = st["prs"].get(n, {})
    resolved = set(data.get("resolved", []))  # "path:line" of previously open findings now fixed
    carried = [f for f in prev.get("open", []) if f"{f['path']}:{f['line']}" not in resolved]
    new = data.get("comments", [])
    open_all = carried + [{k: c[k] for k in ("path", "line", "sev", "title")} for c in new]
    sevs = {f["sev"] for f in open_all}
    kind = "action" if sevs & {"P0", "P1", "P2"} else "comments" if sevs else "approve"
    vl, vc = VERDICT[kind]
    lines = [badge("review", vl, vc), "", data.get("summary", "")]
    if resolved:
        lines += ["", "Resolved since last review: " + ", ".join(f"`{r}`" for r in sorted(resolved))]
    if carried:
        lines += ["", "Still open: " + ", ".join(f"`{f['path']}:{f['line']}`" for f in carried)]
    inline = []
    for c in new:
        lab, col = SEV[c["sev"]]
        inline.append({"path": c["path"], "line": int(c["line"]), "side": "RIGHT",
                       "body": f"**{c['title']}**\n\n{badge(c['sev'], lab, col)}\n\n{c['body']}"})
    me = gh("api", "user", "-q", ".login").stdout.strip()
    event = "APPROVE" if kind == "approve" and meta["author"]["login"] != me else "COMMENT"
    def send(body, comments, event):
        payload = {"commit_id": head, "event": event, "body": body, "comments": comments}
        if os.environ.get("PRR_DRY"):
            print(json.dumps(payload, indent=1)); sys.exit(0)
        return gh("api", "-X", "POST", f"repos/{repo}/pulls/{n}/reviews", "--input", "-", inp=json.dumps(payload), check=False)
    r = send("\n".join(lines), inline, event)
    if r.returncode and inline:  # a line outside the diff makes GitHub reject the whole review: fall back to a body list
        extra = ["", "Inline anchors were rejected, so findings are listed here:"] + [f"- `{c['path']}:{c['line']}` {c['body']}" for c in inline]
        r = send("\n".join(lines + extra), [], "COMMENT")
    if r.returncode:
        sys.exit("post failed: " + r.stderr[:300])
    st["prs"][n] = {"title": meta["title"], "reviewed_sha": head, "open": open_all}
    save(repo, st)
    print(json.loads(r.stdout)["html_url"], "|", vl, "|", event)


if __name__ == "__main__":
    a = sys.argv[1:]
    repo = a[a.index("--repo") + 1] if "--repo" in a else None
    if "--repo" in a:
        i = a.index("--repo"); a = a[:i] + a[i + 2:]
    if a[:1] == ["list"]:
        cmd_list(repo)
    elif a[:1] == ["diff"] and len(a) == 2:
        cmd_diff(a[1], repo)
    elif a[:1] == ["post"] and len(a) == 3:
        cmd_post(a[1], a[2], repo)
    else:
        sys.exit(__doc__)
