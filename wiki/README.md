# Wiki

An Obsidian vault of general concepts — a personal reference, not project documentation.

Open the folder directly as a vault in Obsidian. Start at [[Home]].

## What's in here

201 concept notes across eleven domains: method and epistemics, language-model systems, the web platform, design and interface, testing, version control and delivery, systems and tooling, data and content, graphics and games, networks, and meaning and society.

Every note is atomic — one concept, 200–400 words, written to make sense on its own to a reader who knows nothing about any particular codebase. Nothing here documents a specific application, employer, or repository. Where a note gets concrete, the concreteness exists to make the idea usable.

## Conventions

- **Filename is the title.** No duplicate `# Heading` at the top of a note.
- **Frontmatter** carries `aliases`, `tags` (one per domain), and a one-line `summary`. Aliases make links resolve under alternate names, so `[[LLM]]`, `[[a11y]]`, and `[[SemVer]]` all work.
- **`## See also`** is hand-picked: the closest neighbours.
- **`## Related`** is graph-derived: notes sharing several neighbours with this one.
- **Folders don't constrain links.** Obsidian resolves wikilinks by note name, not by path, so a note can be moved between folders without breaking anything.
- **A link to a note that doesn't exist yet is fine.** It marks something worth writing.

## Graph

1,815 links across 202 notes — a mean of 9 outbound and 9 inbound per note, with no orphans and no broken links.

The most-linked-to notes are a decent summary of the vault's centre of gravity: [[Silent Failure]], [[Ground Truth]], [[Determinism]], [[Vacuous Truth]], [[Tool Use]], [[Large Language Model]], [[Root Cause Analysis]].

## Housekeeping

The vault is excluded from the site's Prettier config (`.prettierignore`), so formatting stays whatever Obsidian writes. Obsidian's local state (`workspace.json`, cache) is gitignored; shared settings under `.obsidian/` are not, so plugin and appearance config can be committed if wanted.
