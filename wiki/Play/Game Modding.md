---
aliases:
  - Modding
  - Mods
  - Mod Community
tags:
  - play
summary: User modification of a released game, running as its own ecosystem of tools, hosting and legal ambiguity.
---
**Game modding** is user modification of a released game — new content, rebalanced systems, or altered engine behaviour — built and shared outside the original development process.

The ecosystem has structure. Assets live in game-specific file formats a mod replaces or extends, and where several mods touch the same system, **load order** resolves which change wins — an informal [[Module Graph]] the player assembles by hand. **Mod loaders and script extenders** inject content at runtime without altering the shipped executable, while a **content mod** — new maps, dialogue — is a different object from an **engine patch**, which changes what the game can do rather than what it contains and is more likely to break with the next official update, the fragility [[Semantic Versioning]] exists to signal. Hosting sites act as de facto [[Package Manager]]s for a game with none official, crediting original authors ([[Provenance]] again) unevenly, and curation — screening malware, deduplicating reuploads — is unpaid.

The legal position is unsettled rather than tidy. Modding tools a developer ships are clearly permitted; extracting and redistributing the developer's own copyrighted assets inside a mod is not, though enforcement varies by publisher and country, and few of these disputes have been tested in court to a general rule. Some studios tolerate or actively support modding as marketing; others treat it under [[Right to Repair]]-adjacent theories nobody has fully litigated.

Longevity follows from all of it: a game with an active mod scene keeps being played and rebuilt years after its official support ends — [[Sim Racing]] titles are a clear case, still raced on cars and tracks the base game never shipped — while a [[Live Service Game]] is mostly closed to modding, not because the player lacks a local client but because the state that matters is held server-side, kernel-level anti-cheat blocks injection into the client outright, and the terms of service make the attempt an account risk.

## See also
- [[Sim Racing]]
- [[Package Manager]]
- [[Live Service Game]]
- [[Right to Repair]]
- [[Game Preservation]]
