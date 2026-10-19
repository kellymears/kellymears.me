---
aliases:
  - OPFS
  - File System Access API
tags:
  - web
summary: A private, sandboxed file system each website gets inside the browser, invisible to the user and fast enough in workers to host a real database engine compiled to WebAssembly.
---
The **origin private file system**, usually shortened to OPFS, gives each website a file system of its own inside the browser. A page can create directories and files, write bytes to them, and read them back. The files are private to the site's origin and aren't visible in the user's own folders; see [[Same-Origin Policy]].

It arrived to fill a gap. Browsers already offered key-value storage and an object database, but neither behaves like files. Software written for ordinary operating systems expects to open a file, seek to an offset, and overwrite a few bytes in place, and emulating that on top of a database is slow; see [[Web Storage]] and [[Filesystem]].

The feature is part of a WHATWG standard for file access. Chrome shipped it in 2020, and Safari and Firefox followed by 2023. A page reaches its root directory through the storage manager and works with handles to directories and files, using asynchronous calls that return promises.

Its key addition is the **synchronous access handle**, available only inside dedicated workers. A worker can open a file exclusively and read or write at any offset, synchronously and without copying through an intermediate buffer. Blocking calls are forbidden on the main thread because they would freeze the page, but a worker has no interface to freeze; see [[Web Worker]].

That handle exists mostly for databases. SQLite, compiled to WebAssembly, needs fast random access to a single file, and its official browser build can store databases in OPFS. Earlier attempts persisted whole databases into the object store and were slow or risked losing writes; see [[SQLite]] and [[WebAssembly]]. Exclusive access also means only one tab can hold a file open for writing at a time, which applications must coordinate; see [[Cross-Tab Communication]].

Limits come from the browser rather than the disk:

- **Quota.** Storage counts against the site's allowance, which browsers size from free disk space.
- **Eviction.** Under storage pressure, browsers may delete a site's data unless it has requested persistent storage.
- **Clearing.** Clearing site data deletes the files, so OPFS is not a substitute for backup or sync.

Its sibling, often confused with it, is the **File System Access API**, which shows the user a picker and lets a page read and write real files they choose. That interface touches the user's own disk and asks permission; as of its rollout it was available only in Chromium-based browsers, with other engines citing security concerns. OPFS asks for no permission because nothing it stores is visible outside the browser's own storage.

Together they move the web closer to running desktop-class software, such as editors, design tools, and offline-first apps that keep their data locally; see [[Progressive Web App]] and [[Service Worker]].

## See also
- [[File Descriptor]]
- [[Atomic File Write]]
