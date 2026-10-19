---
aliases:
  - Large File Storage
  - Git Large File Storage
  - Large files in Git
tags:
  - delivery
summary: A Git extension that stores large binary files on a separate server and keeps small pointer files in the repository, so history stays light enough to clone.
---
**Git LFS**, short for Large File Storage, is a Git extension for versioning large binary files such as images, audio, video, datasets, game assets, and compiled libraries. It keeps the binaries out of the repository's history, storing small text **pointer files** in their place, while the real content lives on a separate server and is downloaded only when needed. GitHub released it in 2015, and it's supported by the major hosting platforms.

The problem it solves comes from how Git works. Every clone gets the full history, every version of every file. That's efficient for text, which compresses well and changes in small diffs that Git stores as deltas. Binaries don't diff or compress usefully, so each edit to a 200 MB video adds another 200 MB to the history, forever. After a few dozen revisions, cloning the repository takes ages, and removing the files later requires rewriting history; see [[Force Push]].

With LFS, a pointer file in the repository holds only a hash of the content and its size. Behind the scenes:

- **`git lfs track "*.psd"`** adds a pattern to `.gitattributes`, telling Git which files LFS should manage.
- **On commit**, a filter replaces the file with its pointer and caches the real content locally.
- **On push**, the content is uploaded to the LFS server, addressed by its hash, much like the content addressing in a Merkle Tree.
- **On checkout**, another filter downloads the content for the current commit only, not every past version.

Clones stay small because history holds pointers, and only the versions you actually check out are downloaded.

LFS has real trade-offs:

- **Setup on every machine.** Collaborators need LFS installed; without it, they check out pointer files instead of content, and the build fails in confusing ways. [[Continuous Integration]] runners need it too.
- **Storage and bandwidth limits.** Hosts meter LFS separately and charge for it, and a CI job that downloads every asset on each run can exhaust the allowance quickly. A [[Build Cache]] helps.
- **No merging.** Binaries can't be merged, so two people editing the same asset produce a [[Merge Conflict]] someone has to resolve by picking one. LFS offers file locking to prevent this.
- **Migration.** Moving existing large files into LFS means rewriting history, which changes every later commit hash.

Alternatives depend on the job. Game studios often prefer Perforce, a centralized system built around large binaries and locking. Data teams use tools that version datasets in object storage, and build outputs belong in an [[Artifact Repository]] rather than in [[Version Control]] at all. For big text-heavy repositories, a [[Shallow Clone]] or partial clone addresses size differently, by fetching less history.

A good rule: track source in Git, generated files nowhere, and large binaries that people edit in LFS.

## See also
- [[Git Object Model]]
- [[Monorepo]]
- [[Gitignore]]
