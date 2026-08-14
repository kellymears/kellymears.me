---
name: games
description: Refresh the Steam library and fold what has been played since the last sync into the concept wiki — updating existing notes in Graphics & Games and adding missing ones
user_invocable: true
---

# /games

Keeps `wiki/Graphics/` current with what has actually been played, and keeps `data/games.ts` honest about which of it mattered.

The vault is a concept encyclopedia, not a play log. `/games` exists because a library is evidence: five hundred hours across three factory games is a standing argument that the genre has a mechanism worth naming. The hours are the prompt; the note is about the mechanism.

## Arguments

| Invocation | Effect |
|---|---|
| `/games` | Everything played since the last recorded sync |
| `/games --all` | Re-read the whole library, ignoring the watermark |
| `/games <concept>` | Same pass, focused on one idea |

## The scope rule

Inherited from [`/wiki`](../wiki/SKILL.md) and non-negotiable. The one clarification games need:

**A published game is a citable work, not a proper noun from your working life.** Naming *Factorio* in a note about production chains is the same move as naming a standards body or an open-source project — it is allowed and usually improves the note. What is not allowed is the note being *about* the game. "Elden Ring is great and here is why" fails; "difficulty is an authorial position, sustained by making failure legible, as the Souls lineage demonstrates" passes.

The test: **would this note still be worth reading by someone who will never play the game?** If the answer is no, the concept is not general enough yet.

## Workflow

### 1. Establish the baseline

```
python3 .claude/skills/wiki/scripts/audit.py --verbose
```

Must exit clean before anything changes. You cannot tell your damage from pre-existing damage otherwise.

### 2. Refresh the library

```
npm run import:steam
```

Playtime comes from the keyed Web API in one request. Store metadata for anything newly played is fetched at a 1.6s throttle and cached permanently, so a run that turns up a handful of new games costs seconds — only a first run is slow. Skip this step if the report says the snapshot is a day old or less.

### 3. Read the report

```
tsx .claude/skills/games/scripts/report.ts            # or --all
```

Prints what has moved since the watermark — newly played games at 2h+, existing games that gained 5h+ — followed by the concepts `wiki/Graphics/` already covers. It applies the site's own `isCountedGame` filter, so engines and creative tools never appear.

**Read the whole list before deciding anything.** The signal is rarely the top line. Three unrelated games that all turned out to be deckbuilders is a concept; one game at 200 hours whose genre already has a note is an update at best.

### 4. Sort the findings

Every candidate lands in exactly one bucket:

- **Update an existing note.** The genre is covered and the new play sharpens it — a mechanism seen working, a claim that turned out wrong, a failure mode confirmed. *Most common and most valuable.*
- **New note.** A mechanism with no note, general enough to stand alone, evidenced by more than one game where possible. One game is thin evidence for a concept; it is usually a note about the game wearing a concept's name.
- **Nothing.** Most play. A hundred hours of a genre already well covered produces no note at all, and that is the correct outcome.

Search before creating: `grep -ril "<term>" wiki/` and check `Home.md`. A near-duplicate under a different name is how a vault like this rots.

### 5. Write

Exact house format — see `/wiki` step 4. For this domain specifically:

- **Tag is `graphics`**, file goes in `wiki/Graphics/`. There is no separate games folder; the domain is *Graphics & Games* and splitting it would fragment the graph.
- **200–400 words.** Check with `sed '1,/^---$/d;1,/^---$/d' <file> | wc -w`. Adding a link in a late edit pushes notes over the ceiling more often than you would expect — recount after editing.
- **8–15 links.** The best ones leave the domain: a production chain is a [[Module Graph]], a bonfire is [[Idempotence]], a battle pass is [[Goodhart's Law]]. Links that stay inside Graphics are the least interesting links available.
- Games named in prose get italics, not wikilinks. They are evidence, not notes.

### 6. Consider the editorial layer

`data/games.ts` holds `LOVED` — an ordered list of appids with optional notes, driving the featured section of `/games`. Playtime cannot decide this and neither can you: **propose additions, never write them silently.** Surface a candidate when the report shows sustained play, then let the user choose the entry and the sentence. `NOT_A_GAME` is different — that one is a factual correction and can be edited directly when a delisted tool defaults through as a game.

### 7. Verify

```
python3 .claude/skills/wiki/scripts/audit.py
```

Must exit clean: no broken links, no orphans, frontmatter present, every note listed on `Home`. New notes are orphans until something links *to* them — fix that by working a link into a related note's prose, not by padding a `See also`.

Then confirm the site still builds, since every note is a prerendered route:

```
npm run build
```

### 8. Stamp — last

```
tsx .claude/skills/games/scripts/report.ts --stamp --added 3 --note "short summary"
```

Records current playtimes as read. **Stamping before the notes are written means that play is never surfaced again.** Final step, never speculative.

### 9. Report

Say what changed: notes added, notes updated and how, `LOVED` candidates proposed, and anything deliberately skipped for failing the scope rule. Leave changes uncommitted unless asked.

## Judgement calls

**Convergent evidence beats deep evidence.** Four hundred hours in one game says that game is good. Forty hours across four games that share a mechanism says the mechanism is real. The second is what produces a note worth keeping.

**A genre label is not automatically a concept.** "Action" is a store category. "Difficulty as authorship" is a claim about how a design works, and it is the claim that gets written.

**Hours are not affection.** A game left running, an idle game, and a game replayed five times all produce large numbers by different routes. Never write "loved" from a playtime figure — that is exactly the inference `data/games.ts` exists to keep out of the data layer.

**The library is mostly noise.** Five hundred games under an hour each is a record of sales, not of play. The report's thresholds exist to keep that out; do not lower them to find something to write.

## Anti-patterns

- A note that is really a review.
- A concept invented to justify a game the user liked.
- Writing about a genre from general knowledge when the report shows two hours in it.
- Editing `LOVED` without being asked.
- Editing `.sync-state.json` by hand.
- Stamping before `audit.py` passes.
