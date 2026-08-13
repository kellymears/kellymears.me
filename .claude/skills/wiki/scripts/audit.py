#!/usr/bin/env python3
"""Check the vault's structural invariants.

  audit.py            # summary + any violations
  audit.py --verbose  # also list every note under the link threshold

Exits non-zero if any hard invariant is violated (broken link, orphan,
missing frontmatter, blank line after frontmatter, self-link).
"""

import argparse
import os
import re
import statistics
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
SKIP = {"README"}
LINK_FLOOR = 8

LINK_RE = re.compile(r"\[\[([^\]|#]+)(?:\|[^\]]*)?\]\]")
FM_RE = re.compile(r"\A---\n(.*?)\n---\n", re.S)


def load():
    notes = {}
    for dirpath, _, filenames in os.walk(VAULT):
        if os.sep + "." in dirpath:
            continue
        for fn in filenames:
            if not fn.endswith(".md"):
                continue
            p = os.path.join(dirpath, fn)
            with open(p, encoding="utf-8") as fh:
                notes[fn[:-3]] = {
                    "path": os.path.relpath(p, VAULT),
                    "text": fh.read(),
                }
    return notes


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--verbose", action="store_true")
    args = ap.parse_args()

    notes = load()
    if not notes:
        sys.exit(f"no notes found under {VAULT}")

    alias, problems = {}, []
    for name, n in notes.items():
        if name in SKIP:
            continue
        m = FM_RE.match(n["text"])
        if not m:
            problems.append(("no frontmatter", n["path"]))
            continue
        if n["text"][m.end():].startswith("\n"):
            problems.append(("blank line after frontmatter", n["path"]))
        for key in ("tags", "summary"):
            if not re.search(rf"^{key}:", m.group(1), re.M):
                problems.append((f"missing '{key}'", n["path"]))
        block = re.search(r"aliases:\n((?:  - .*\n)+)", m.group(1))
        if block:
            for line in block.group(1).strip().split("\n"):
                alias[line.strip()[2:].strip()] = name

    out = {}
    for name, n in notes.items():
        targets = []
        for raw in LINK_RE.findall(n["text"]):
            t = alias.get(raw.strip(), raw.strip())
            if t not in notes:
                problems.append((f"broken link -> {raw.strip()}", n["path"]))
            elif t == name:
                problems.append(("self-link", n["path"]))
            else:
                targets.append(t)
        out[name] = set(targets)

    inbound = {k: 0 for k in notes}
    for src, targets in out.items():
        if src in {"Home"} | SKIP:
            continue
        for t in targets:
            inbound[t] += 1

    concepts = [k for k in notes if k not in ({"Home"} | SKIP)]
    for name in concepts:
        if inbound[name] == 0:
            problems.append(("orphan (nothing links here)", notes[name]["path"]))

    home = notes.get("Home")
    if home:
        listed = {alias.get(x.strip(), x.strip()) for x in LINK_RE.findall(home["text"])}
        for name in concepts:
            if name not in listed:
                problems.append(("absent from Home", notes[name]["path"]))

    od = [len(out[k]) for k in concepts]
    ib = [inbound[k] for k in concepts]
    thin = sorted((len(out[k]), k) for k in concepts if len(out[k]) < LINK_FLOOR)

    print(f"vault:  {VAULT}")
    print(f"notes:  {len(concepts)} concepts + Home + README")
    print(f"links:  {sum(od)} edges")
    print(f"        outbound mean {statistics.mean(od):.1f}  median "
          f"{statistics.median(od):.0f}  range {min(od)}-{max(od)}")
    print(f"        inbound  mean {statistics.mean(ib):.1f}  median "
          f"{statistics.median(ib):.0f}  range {min(ib)}-{max(ib)}")
    print(f"        under {LINK_FLOOR} outbound: {len(thin)}")
    words = [len(re.sub(r"\[\[|\]\]", "", FM_RE.sub("", notes[k]["text"])).split())
             for k in concepts]
    print(f"words:  mean {statistics.mean(words):.0f}  range {min(words)}-{max(words)}"
          f"  total {sum(words)}")

    if args.verbose and thin:
        print("\nthin notes:")
        for n, k in thin:
            print(f"  {n:>2}  {notes[k]['path']}")

    if problems:
        print(f"\n{len(problems)} problem(s):")
        for kind, path in sorted(problems)[:80]:
            print(f"  {kind}: {path}")
        if len(problems) > 80:
            print(f"  ... and {len(problems) - 80} more")
        sys.exit(1)

    print("\nall invariants hold")


if __name__ == "__main__":
    main()
