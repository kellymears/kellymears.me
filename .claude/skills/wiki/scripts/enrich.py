#!/usr/bin/env python3
"""Densify the link graph for notes that fall below the outbound threshold.

Two passes, both principled rather than arbitrary:

  1. Reciprocate — if A links to B but B does not link back, add A to B's
     "See also". Somebody already judged that connection meaningful.
  2. Co-citation — for notes still thin, add the notes sharing the most
     neighbours with them, under a "Related" heading.

  enrich.py --dry-run     # report what it would add, change nothing
  enrich.py               # apply
  enrich.py --floor 8 --target 10
"""

import argparse
import collections
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
EXCLUDE = {"Home", "README"}

LINK_RE = re.compile(r"\[\[([^\]|#]+)(?:\|[^\]]*)?\]\]")


def load():
    notes, alias = {}, {}
    for dirpath, _, filenames in os.walk(VAULT):
        if os.sep + "." in dirpath:
            continue
        for fn in filenames:
            if not fn.endswith(".md"):
                continue
            name = fn[:-3]
            with open(os.path.join(dirpath, fn), encoding="utf-8") as fh:
                text = fh.read()
            notes[name] = {"path": os.path.join(dirpath, fn), "text": text}
            m = re.match(r"---\n(.*?)\n---", text, re.S)
            if m:
                block = re.search(r"aliases:\n((?:  - .*\n)+)", m.group(1))
                if block:
                    for line in block.group(1).strip().split("\n"):
                        alias[line.strip()[2:].strip()] = name
    return notes, alias


def outbound(notes, alias):
    out = collections.defaultdict(set)
    for name, n in notes.items():
        for raw in LINK_RE.findall(n["text"]):
            t = alias.get(raw.strip(), raw.strip())
            if t in notes and t != name and t not in EXCLUDE:
                out[name].add(t)
    return out


def append(path, heading, targets, dry):
    if dry:
        return
    with open(path, encoding="utf-8") as fh:
        text = fh.read().rstrip() + "\n"
    if f"## {heading}" in text:
        text = text.rstrip() + "\n"
    else:
        text += f"\n## {heading}\n"
    text += "".join(f"- [[{t}]]\n" for t in targets)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--floor", type=int, default=8)
    ap.add_argument("--target", type=int, default=10)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    notes, alias = load()
    if not notes:
        sys.exit(f"no notes found under {VAULT}")
    concepts = [n for n in notes if n not in EXCLUDE]

    out = outbound(notes, alias)
    inbound = collections.defaultdict(set)
    for src, targets in out.items():
        if src in EXCLUDE:
            continue
        for t in targets:
            inbound[t].add(src)

    added = collections.Counter()
    for name in sorted(concepts):
        cur = out[name]
        if len(cur) >= args.floor:
            continue
        cands = sorted(inbound[name] - cur - EXCLUDE,
                       key=lambda x: (-len(out[x] & cur), x))
        take = cands[: args.target - len(cur)]
        if not take:
            continue
        append(notes[name]["path"], "See also", take, args.dry_run)
        out[name] |= set(take)
        added["reciprocal"] += len(take)

    und = collections.defaultdict(set)
    for src, targets in out.items():
        if src in EXCLUDE:
            continue
        for t in targets:
            und[src].add(t)
            und[t].add(src)

    for name in sorted(concepts):
        cur = out[name]
        if len(cur) >= args.floor:
            continue
        scored = {
            m: len(und[name] & und[m])
            for m in concepts
            if m != name and m not in cur
        }
        take = [k for _, k in sorted(
            ((v, k) for k, v in scored.items() if v >= 3), reverse=True
        )[: args.target - len(cur)]]
        if not take:
            continue
        append(notes[name]["path"], "Related", take, args.dry_run)
        out[name] |= set(take)
        added["co-citation"] += len(take)

    still = [n for n in concepts if len(out[n]) < args.floor]
    verb = "would add" if args.dry_run else "added"
    print(f"{verb} {added['reciprocal']} reciprocal + "
          f"{added['co-citation']} co-citation links")
    print(f"still under {args.floor} outbound: {len(still)}")
    if still:
        print("  " + ", ".join(sorted(still)[:20]))
    if args.dry_run:
        print("\ndry run — nothing written")


if __name__ == "__main__":
    main()
