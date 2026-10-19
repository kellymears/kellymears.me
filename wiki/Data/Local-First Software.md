---
aliases:
  - Local-first
  - Offline-first
  - Sync engine
  - Offline sync
tags:
  - data
summary: Applications that keep the primary copy of a user's data on their own device and sync in the background, so they work offline, respond instantly, and outlive the service that made them.
---
**Local-first software** keeps the primary copy of a user's data on their own device, with servers used for syncing and backup rather than as the only source of truth. The term comes from a 2019 essay by Martin Kleppmann and colleagues at Ink & Switch, which set out seven ideals: no spinners, work across devices, work offline, real-time collaboration, data that lasts a long time, privacy by default, and user ownership. Most cloud apps meet few of these, because the data lives on the provider's server.

Older desktop software was local by default, and many tools still are. Plain-text note systems built on folders of Markdown files are a popular example: the notes are ordinary files that sync by whatever means the user chooses and stay readable without the app.

The benefits follow from the architecture:

- **Speed.** Reads and writes hit local storage, so the interface responds immediately, with no round trip to wait for. Cloud apps fake this with [[Optimistic UI]]; local-first apps get it naturally.
- **Offline work.** A plane or a dead zone is no different from being online.
- **Longevity.** If the company shuts down, the data is still on the user's devices, in a format that can be opened elsewhere, unlike a service whose shutdown causes something like [[Link Rot]] for documents.
- **Privacy.** Sync servers can store only encrypted data they can't read.

The hard part is merging. Two devices edit the same document while disconnected, and when they reconnect, their changes must combine without losing either. The approaches:

- **Last write wins**, simple but lossy, since one edit silently disappears.
- **Operational transformation**, which rewrites concurrent edits against each other and usually needs a central server.
- **[[Conflict-Free Replicated Data Type]] structures**, designed so that concurrent changes always merge to the same result on every device, without coordination. They're the foundation of most recent local-first libraries.
- **Explicit conflicts**, shown to the user to resolve, as a [[Merge Conflict]] is in version control, which is itself a local-first system.

Every approach accepts [[Eventual Consistency]]: devices may briefly disagree but converge once they've exchanged changes. Rules that need global agreement, such as a unique username or a bank balance that can't go negative, still need a server, so many apps mix local-first data with a few authoritative operations.

In the browser, local-first apps store data in [[Web Storage]] such as IndexedDB, use a [[Service Worker]] to load without a network, and coordinate between tabs through [[Cross-Tab Communication]]. Sync engines handle the rest, sending changes as an ordered log, much as [[Event Sourcing]] does, and tracking causality with a [[Logical Clock]]. Schema changes are harder than on a server, since old clients keep running old code, so [[Schema Evolution]] must be planned carefully.

## See also
- [[iCalendar]]
- [[Distributed Version Control]]
- [[SQLite]]
- [[Data Portability]]
