#!/usr/bin/env python3
"""Record a completed sync in the vault's watermark file.

Only run this once notes are written and audit.py passes — the watermark is
what the next harvest treats as already-processed, so stamping early means
that material is never looked at again.

  stamp.py --added 6 --updated 11 --note "Aug sweep: frame mode, site import"
"""

import argparse
import datetime as dt
import json
import os
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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--added", type=int, default=0)
    ap.add_argument("--updated", type=int, default=0)
    ap.add_argument("--note", default="")
    args = ap.parse_args()

    try:
        with open(STATE, encoding="utf-8") as fh:
            state = json.load(fh)
    except (OSError, ValueError):
        state = {"runs": []}

    now = dt.datetime.now()
    state["last_run_ms"] = int(now.timestamp() * 1000)
    state["last_run"] = now.isoformat(timespec="seconds")
    state.setdefault("runs", []).append({
        "at": state["last_run"],
        "added": args.added,
        "updated": args.updated,
        "note": args.note,
    })
    state["runs"] = state["runs"][-40:]

    with open(STATE, "w", encoding="utf-8") as fh:
        json.dump(state, fh, indent=2)
        fh.write("\n")

    print(f"stamped {state['last_run']} "
          f"(+{args.added} new, ~{args.updated} updated)")
    print(f"next harvest reads only material newer than this")


if __name__ == "__main__":
    main()
