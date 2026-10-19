---
aliases:
  - Git internals
  - Packfile
  - Blob
tags:
  - delivery
summary: Git stores every version of a project as a graph of immutable objects named by the hashes of their contents, blobs for files, trees for directories, and commits for snapshots, which makes history tamper-evident and identical content free to store twice.
---
**The Git object model** is the data structure underneath Git. Every file, directory, and commit is stored as an object named by a cryptographic hash of its contents; see [[Hash Function]]. Git's commands, from branching to merging, are operations on this graph of objects.

There are four kinds of object:

- **Blobs** hold file contents, without names or metadata.
- **Trees** represent directories, listing names, permissions, and the hashes of blobs and other trees.
- **Commits** point to one top-level tree, a snapshot of the whole project, plus zero or more parent commits, an author, a committer, timestamps, and a message; see [[Commit]].
- **Tags** in their annotated form name a specific object with a message and, optionally, a signature.

Because objects are named by their contents, Git is a content-addressable store. Two identical files anywhere in the history are stored once. Changing any byte changes the hash, which changes the tree containing it, which changes the commit. A commit's hash therefore covers the entire history behind it, making the structure a Merkle graph: tampering with any past object would change every hash after it.

A notable consequence is that Git stores snapshots, not changes. Each commit records a complete tree. Differences are computed on demand by comparing trees; see [[Diff]]. Merges work by comparing two commits with their common ancestor; see [[Three-Way Merge]].

Storing full snapshots would be wasteful without compression. New objects are first written individually as compressed loose objects. Periodically Git packs them into packfiles, where similar objects are stored as differences from one another; see [[Data Compression]]. Packfiles are also what Git sends over the network when cloning or fetching, and partial and shallow clones work by sending only some objects; see [[Shallow Clone]].

Branches and tags are lightweight. A branch is a small file containing a commit hash. HEAD names the current branch, or a commit directly; see [[Detached HEAD]]. Objects that no named reference can reach are eventually pruned, though Git keeps recent ones findable for a while; see [[Reflog]].

Because objects never change, history is a persistent data structure: new commits add objects without modifying old ones; see [[Persistent Data Structure]]. Rewriting history really means creating new objects and moving labels.

Git originally used the SHA-1 hash. Researchers demonstrated a practical SHA-1 collision in 2017, two different files with the same hash. Git added collision detection and has been working toward SHA-256 support. Accidental collisions remain astronomically unlikely.

Large binary files fit poorly in this model, since each version is stored in full and fetched with every clone; see [[Git LFS]].

## See also
- [[Staging Area]]
- [[Garbage Collection]]
