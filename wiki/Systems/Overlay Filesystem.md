---
aliases:
  - OverlayFS
  - Union mount
tags:
  - systems
summary: A filesystem that stacks read-only layers under a writable one and presents them as a single directory tree, the mechanism behind container images, live USB systems, and throwaway changes.
---
An **overlay filesystem** combines several directories into one view. One or more read-only **lower** layers sit beneath a writable **upper** layer, and the merged result looks like an ordinary directory tree. Reading a file returns the topmost version of it; changes go only to the upper layer, leaving the lower layers untouched; see [[Filesystem]].

The core operations:

- **Reading** checks each layer from the top down and returns the first match.
- **Modifying** a file from a lower layer first copies the whole file up into the upper layer, then changes the copy, a form of [[Copy-on-Write]].
- **Deleting** a lower-layer file can't remove it, since those layers are read-only, so the upper layer records a "whiteout," a marker that hides the file. Linux represents whiteouts as special device files; see [[Device File]].

The idea goes back to union directories in Bell Labs' Plan 9 in the early 1990s, and several Linux implementations followed, some never accepted into the main kernel. OverlayFS was merged in 2014 and became the standard; see [[Kernel]].

Containers made it ubiquitous. A container image is a stack of layers, each holding the changes from one build step, identified by a hash of its contents; see [[Hash Function]]. Many containers can share the same lower layers on disk and in memory, each getting its own thin writable layer on top. Removing a container discards that layer, returning to the pristine image, which is why containers are treated as disposable; see [[Containerization]] and [[Immutable Infrastructure]]. Combined with private views of the filesystem tree, layers give each container what looks like its own root; see [[Linux Namespaces]] and [[Chroot]].

Live USB systems use the same trick. The operating system sits in a compressed, read-only image, with an in-memory upper layer catching every change. Rebooting wipes the slate, which makes such systems useful for rescue work and kiosks. Some distributions apply the idea to the installed system, keeping the base read-only and layering configuration on top.

The approach has costs:

- **Copy-up is whole-file.** Changing one byte of a large database file in a lower layer copies the entire file first. Containers keep heavy-write data in separate mounted volumes for this reason.
- **Identity can shift.** A file's [[Inode]] number may change when it's copied up, confusing tools that track files by identity.
- **Layers accumulate.** Deleting a file in a later build step doesn't shrink an image, because the file still exists in a lower layer, hidden by a whiteout. Secrets added and then removed during a build remain recoverable; see [[Secret Management]].

## See also
- [[Filesystem Snapshot]]
- [[Package Manager]]
- [[Filesystem Hierarchy Standard]]
