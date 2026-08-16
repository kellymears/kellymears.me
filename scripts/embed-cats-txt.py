#!/usr/bin/env python3
"""Regenerate the Embedding field in public/.well-known/cats.txt.

The cats.txt spec (catstxt.org, §4.6) allows an optional semantic vector of the
site's Website-Purpose: up to 128 dimensions, every component in -1..1, plain
decimal notation only. This runs the purpose text through nomic-embed-text on
cachy's ollama, truncates the 768-dim result to 128, and renormalizes.

The model choice is load-bearing. nomic-embed-text is v1.5, which is
Matryoshka-trained -- the leading dimensions are a valid standalone embedding
rather than a lopped-off piece of one, so truncating to the spec's ceiling
preserves the semantics. Measured against the full-width vector, the 128-dim
truncation keeps related/unrelated probes in the same rank order. A model
without that property would not.

Run this whenever Website-Purpose changes; otherwise the prose and the vector
quietly describe different things.

    ssh cachy 'ollama pull nomic-embed-text'   # ~274MB, once
    python3 scripts/embed-cats-txt.py

Prints a `## Embedding` block to paste over the existing one.
"""

import json
import math
import re
import urllib.request
from pathlib import Path

OLLAMA = "http://cachy:11434/api/embeddings"
MODEL = "nomic-embed-text"
DIMS = 128  # the spec's ceiling
CATS_TXT = Path(__file__).resolve().parents[1] / "public/.well-known/cats.txt"


def read_purpose(path: Path) -> str:
    text = path.read_text()
    m = re.search(r"^## Website-Purpose\n(.*?)(?=\n## |\Z)", text, re.S | re.M)
    if not m:
        raise SystemExit(f"no Website-Purpose field in {path}")
    return " ".join(m.group(1).split())


def embed(text: str) -> list[float]:
    req = urllib.request.Request(
        OLLAMA,
        data=json.dumps({"model": MODEL, "prompt": text}).encode(),
        headers={"content-type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp)["embedding"]


def to_unit(vec: list[float]) -> list[float]:
    norm = math.sqrt(sum(v * v for v in vec))
    return [v / norm for v in vec]


def render(vec: list[float], per_line: int = 5) -> str:
    # Fixed decimal notation only -- the spec forbids scientific notation, and
    # repr() will happily emit 1e-05 for a small component.
    nums = [f"{v:.9f}" for v in vec]
    return ",\n".join(
        ",".join(nums[i : i + per_line]) for i in range(0, len(nums), per_line)
    )


if __name__ == "__main__":
    full = embed(read_purpose(CATS_TXT))
    if len(full) < DIMS:
        raise SystemExit(f"model returned {len(full)} dims, need at least {DIMS}")
    vec = to_unit(full[:DIMS])
    assert all(-1 <= v <= 1 for v in vec), "component out of the spec's -1..1 range"
    print("## Embedding")
    print("```")
    print(render(vec))
    print("```")
