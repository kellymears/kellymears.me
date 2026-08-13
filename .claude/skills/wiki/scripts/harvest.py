#!/usr/bin/env python3
"""Gather source material from every Claude config directory on this machine.

Discovers ~/.claude, ~/.claude-*, and $CLAUDE_CONFIG_DIR; extracts typed prompts,
project memories, agent memories, and saved plans; filters to whatever is new
since the vault's last sync; writes a corpus for reading.

  harvest.py                      # everything new since the last sync
  harvest.py --since 2026-06-01   # explicit floor
  harvest.py --all                # ignore the watermark
  harvest.py --out DIR            # where to write the corpus
"""

import argparse
import datetime as dt
import json
import os
import re
import sys

def _find_vault():
    """Walk up from this script until a sibling 'wiki' directory turns up."""
    env = os.environ.get("WIKI_VAULT")
    if env:
        return os.path.expanduser(env)
    p = os.path.abspath(__file__)
    for _ in range(8):
        p = os.path.dirname(p)
        cand = os.path.join(p, "wiki")
        if os.path.isdir(cand) and os.path.isfile(os.path.join(cand, "Home.md")):
            return cand
    raise SystemExit("could not locate the wiki vault; set WIKI_VAULT")


VAULT = _find_vault()
STATE = os.path.join(VAULT, ".sync-state.json")


def claude_dirs():
    """Every Claude config directory, discovered rather than hardcoded."""
    found, home = [], os.path.expanduser("~")
    for entry in sorted(os.listdir(home)):
        if not entry.startswith(".claude"):
            continue
        p = os.path.join(home, entry)
        if os.path.isdir(p) and (
            os.path.isdir(os.path.join(p, "projects"))
            or os.path.isfile(os.path.join(p, "history.jsonl"))
        ):
            found.append(p)
    env = os.environ.get("CLAUDE_CONFIG_DIR")
    if env:
        for p in env.split(":"):
            p = os.path.expanduser(p.strip())
            if p and os.path.isdir(p) and p not in found:
                found.append(p)
    return found


def load_state():
    try:
        with open(STATE, encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return {}


def label(root):
    base = os.path.basename(root)
    return "personal" if base == ".claude" else base.replace(".claude-", "")


def harvest_prompts(roots, floor_ms):
    rows = []
    for root in roots:
        path = os.path.join(root, "history.jsonl")
        if not os.path.isfile(path):
            continue
        with open(path, encoding="utf-8", errors="replace") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                try:
                    d = json.loads(line)
                except ValueError:
                    continue
                text = (d.get("display") or "").strip()
                ts = d.get("timestamp", 0)
                if not text or ts <= floor_ms:
                    continue
                if len(text) < 12 or (text.startswith("/") and len(text) < 40):
                    continue
                rows.append({
                    "src": label(root),
                    "proj": os.path.basename(d.get("project", "") or ""),
                    "ts": ts,
                    "text": text,
                })
    rows.sort(key=lambda r: r["ts"])
    return rows


def harvest_docs(roots, floor_ms, kind):
    """kind is 'memory' or 'plans'."""
    out = []
    for root in roots:
        if kind == "memory":
            globs = [
                os.path.join(root, "projects"),
                os.path.join(root, "agent-memory"),
            ]
        else:
            globs = [os.path.join(root, "plans")]
        for base in globs:
            if not os.path.isdir(base):
                continue
            for dirpath, _, filenames in os.walk(base):
                if kind == "memory" and os.path.basename(dirpath) not in (
                    "memory",
                ) and "agent-memory" not in dirpath:
                    continue
                for fn in filenames:
                    if not fn.endswith(".md"):
                        continue
                    p = os.path.join(dirpath, fn)
                    mtime = int(os.path.getmtime(p) * 1000)
                    out.append({
                        "path": p,
                        "src": label(root),
                        "mtime": mtime,
                        "new": mtime > floor_ms,
                    })
    out.sort(key=lambda d: (not d["new"], d["path"]))
    return out


def write_docs(docs, dest, only_new):
    chosen = [d for d in docs if d["new"]] if only_new else docs
    with open(dest, "w", encoding="utf-8") as fh:
        for d in chosen:
            stamp = dt.datetime.fromtimestamp(d["mtime"] / 1000).strftime("%Y-%m-%d")
            fh.write(f"\n########## [{d['src']} | {stamp}] {d['path']}\n\n")
            try:
                with open(d["path"], encoding="utf-8", errors="replace") as src:
                    fh.write(src.read().rstrip() + "\n")
            except OSError as exc:
                fh.write(f"(unreadable: {exc})\n")
    return len(chosen)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", help="YYYY-MM-DD floor, overriding the watermark")
    ap.add_argument("--all", action="store_true", help="ignore the watermark entirely")
    ap.add_argument("--out", default=None, help="corpus output directory")
    args = ap.parse_args()

    state = load_state()
    if args.all:
        floor_ms, origin = 0, "everything"
    elif args.since:
        floor_ms = int(dt.datetime.strptime(args.since, "%Y-%m-%d").timestamp() * 1000)
        origin = f"--since {args.since}"
    elif state.get("last_run_ms"):
        floor_ms = state["last_run_ms"]
        origin = "last sync"
    else:
        floor_ms, origin = 0, "no previous sync — everything"

    out = args.out or os.path.join(
        os.environ.get("TMPDIR", "/tmp"), "wiki-harvest")
    os.makedirs(out, exist_ok=True)

    roots = claude_dirs()
    if not roots:
        sys.exit("no Claude config directories found under ~")

    prompts = harvest_prompts(roots, floor_ms)
    memories = harvest_docs(roots, floor_ms, "memory")
    plans = harvest_docs(roots, floor_ms, "plans")

    p_path = os.path.join(out, "prompts.txt")
    with open(p_path, "w", encoding="utf-8") as fh:
        for r in prompts:
            stamp = dt.datetime.fromtimestamp(r["ts"] / 1000).strftime("%Y-%m-%d")
            fh.write(f"[{stamp}|{r['src']}|{r['proj']}] {r['text']}\n\n")
    m_path = os.path.join(out, "memories.md")
    m_count = write_docs(memories, m_path, only_new=not args.all and floor_ms > 0)
    l_path = os.path.join(out, "plans.md")
    l_count = write_docs(plans, l_path, only_new=not args.all and floor_ms > 0)

    def size(p):
        n = os.path.getsize(p)
        return f"{n/1024:.0f} KB (~{n//4000}k tokens)"

    print(f"floor:   {origin}")
    print(f"sources: {', '.join(label(r) for r in roots)}")
    print(f"corpus:  {out}\n")
    print(f"prompts.txt   {len(prompts):>5} prompts   {size(p_path)}")
    print(f"memories.md   {m_count:>5} files     {size(m_path)}"
          f"   ({len(memories)} exist in total)")
    print(f"plans.md      {l_count:>5} files     {size(l_path)}"
          f"   ({len(plans)} exist in total)")

    if prompts:
        lo = dt.datetime.fromtimestamp(prompts[0]["ts"] / 1000).date()
        hi = dt.datetime.fromtimestamp(prompts[-1]["ts"] / 1000).date()
        print(f"\nprompt range: {lo} to {hi}")
        counts = {}
        for r in prompts:
            counts[r["proj"] or "(none)"] = counts.get(r["proj"] or "(none)", 0) + 1
        top = sorted(counts.items(), key=lambda kv: -kv[1])[:15]
        print("busiest projects: " + ", ".join(f"{k} ({v})" for k, v in top))
    else:
        print("\nno new prompts since the floor")

    print(f"\nwatermark file: {STATE}")
    print("stamp it with stamp.py once notes are written and audited.")


if __name__ == "__main__":
    main()
