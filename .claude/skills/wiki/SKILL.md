---
name: wiki
description: Harvest every Claude config directory on this machine and fold what's new into the concept wiki at wiki/ — updating existing notes and adding missing ones
user_invocable: true
---

# /wiki

Keeps `wiki/` — an Obsidian vault of general concepts — current with whatever has been discussed across every Claude directory on this machine.

The vault is **not** project documentation. It is a personal encyclopedia: one note per concept, each written to make sense to someone who has never seen your work. Sessions are the raw material; the notes are about the ideas underneath them.

## Arguments

| Invocation | Effect |
|---|---|
| `/wiki` | Everything new since the last recorded sync |
| `/wiki --since 2026-06-01` | Explicit floor, ignoring the watermark |
| `/wiki --all` | Re-read the entire history (expensive — hundreds of thousands of tokens) |
| `/wiki <topic>` | Same harvest, but focus the pass on one subject area |

Scripts live in `.claude/skills/wiki/scripts/`. They find the vault by walking up from their own location, so they work from any directory.

## The scope rule

This is the constraint everything else serves. Before writing a sentence, check it against all four:

1. **No proper nouns from your working life.** No employer, product, repository, colleague, branch, issue number, or internal tool name. Public technologies, standards bodies, named authors of published ideas, and open-source projects are fine.
2. **The note is about the concept, not the incident.** A week spent on one library's portal behaviour becomes a note about portals. If a note only makes sense to someone who was there, it does not belong.
3. **A stranger can use it.** Someone with general software knowledge and zero context should finish the note better informed.
4. **Concrete without being specific.** Detail is what makes a note worth reading — keep the mechanism, drop the identifiers. "A test filter matching zero tests exits successfully" survives; "our `-t` filter on the storybook project" does not.

Sessions are full of material that fails these tests. Most of it should produce nothing. Extracting one durable idea from a month of work is a good outcome.

## Workflow

### 1. Establish the baseline

```
python3 .claude/skills/wiki/scripts/audit.py --verbose
```

Must exit clean before you change anything. If it does not, fix that first — you cannot tell your damage from pre-existing damage otherwise.

### 2. Harvest

```
python3 .claude/skills/wiki/scripts/harvest.py            # or --since / --all
```

Discovers every `~/.claude*` directory plus `$CLAUDE_CONFIG_DIR`, and writes three files to a scratch directory:

- `memories.md` — project and agent memories. **Highest signal by a wide margin**; these are already distilled. Read all of it.
- `plans.md` — saved plans. Design reasoning, architecture, trade-offs. Read all of it.
- `prompts.txt` — typed prompts, dated and tagged by project. Lower signal per line, but the only place new *subject areas* surface. Skim; read closely where a cluster appears.

The script reports token estimates. If a file is very large, read it in slices rather than skipping it.

### 3. Sort the findings

Every candidate lands in exactly one bucket:

- **Update an existing note.** The concept is already covered and the new material sharpens it — a mechanism explained, a failure mode confirmed, a claim that turned out wrong. *This is the most common outcome and the most valuable.*
- **New note.** A genuinely new concept, general enough to stand alone, with enough substance for 200+ words.
- **Nothing.** Project-specific, already covered, or too thin. Most material.

Search before creating. `grep -ril "<term>" wiki/` plus a look at `Home.md`. A near-duplicate under a different name is the main way a vault like this rots — prefer widening an existing note over adding a sibling.

### 4. Write

Exact house format, no deviation:

```markdown
---
aliases:
  - Common alternate name
  - Abbreviation
tags:
  - method
summary: One sentence, lowercase after the first word, ending in a period.
---
**Term** is … (bold the term on first use; define it in the first sentence).

Two to four short paragraphs. Bold lead-ins for enumerated points where it helps.

## See also
- [[Closest Concept]]
- [[Another One]]
```

Non-negotiables:

- **No blank line between the closing `---` and the first character of prose.**
- **No `# Heading`** — the filename is the title.
- **200–400 words.** If it wants more, it is two notes.
- **8–15 links**, worked into the prose where the connection is real, plus a `See also` list. Every `[[link]]` must resolve to a real note or an alias.
- **Filename is the display title**, in the folder matching its tag: `Method`, `Agents`, `Web`, `Design`, `Testing`, `Delivery`, `Systems`, `Data`, `Graphics`, `Networks`, `Meaning`.
- **they/them** for any person referenced.
- Prose flows unwrapped — one paragraph per line, blank line between.

When *updating*, edit in place and keep the shape. A note that grows past ~400 words is a signal to split, not to keep appending.

### 5. Enrich, then verify

```
python3 .claude/skills/wiki/scripts/enrich.py --dry-run
python3 .claude/skills/wiki/scripts/enrich.py
python3 .claude/skills/wiki/scripts/audit.py
```

`enrich.py` only adds links that are already justified — reciprocating a one-way link, or connecting notes that share three or more neighbours. It never invents a relationship. Hand-written links in prose are always better; this is a floor, not a substitute.

`audit.py` must exit clean. It enforces: no broken links, no orphans, no self-links, frontmatter present, no blank line after frontmatter, and **every concept note listed on `Home`**.

### 6. Update `Home.md`

New notes go in their domain's list, alphabetically within the line. `audit.py` fails if you forget.

### 7. Stamp — last

```
python3 .claude/skills/wiki/scripts/stamp.py --added 4 --updated 9 --note "short summary"
```

The watermark is what the next run treats as already-read. **Stamping before the notes are written and audited means that material is never looked at again.** Do it as the final step, never speculatively.

### 8. Report

Tell the user what changed: notes added, notes updated and how, and anything deliberately skipped for failing the scope rule. Leave the changes uncommitted unless asked.

## Judgement calls

**A recurring hazard is a concept.** The same trap hit three times across different projects is exactly what belongs here — that is the signal that it generalises.

**A vendor-specific quirk usually is not** — unless it illustrates a general mechanism. "This provider strips length bounds out of the grammar and appends them to the description" is worth writing because the underlying point (not every part of a schema is enforced the same way) is durable.

**Strong opinions from sessions are fine as documented positions**, attributed to the practice rather than to a person: "the convention that works is…", not "Kelly prefers…".

**Do not create a note you cannot fill.** A stub is worse than a red link — a red link is an honest signal that something is worth writing, while a thin note reads as covered.

## Anti-patterns

- Writing a note that is really a post-mortem of one incident.
- Adding a near-duplicate because the existing note was not found. Search first.
- Padding to reach the word count. Short and true beats long and hedged.
- Adding links to hit the density target. Run `enrich.py`; it does that honestly.
- Editing `.sync-state.json` by hand.
- Committing without being asked.
