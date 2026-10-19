---
aliases:
  - Hard links
  - Link count
tags:
  - systems
summary: A second name for the same file, pointing directly at its inode rather than at a path, so the data survives until the last name is removed; how deletion, backups, and package stores rely on it.
---
A **hard link** is an additional name for an existing file. Unlike a [[Symbolic Link]], which stores a path to another name, a hard link points directly at the file's [[Inode]], the record holding its data and metadata. Every name of a file is equally a hard link; there is no original and copy.

The idea follows from how Unix filesystems separate names from files. A directory is a list of entries, each pairing a name with an inode number; see [[Filesystem]]. Nothing stops two entries, in the same directory or different ones, from naming the same inode. The inode keeps a **link count** of how many names point to it.

That explains several behaviors that surprise people:

- **Deletion is unlinking.** Removing a file removes one name and decrements the count. The data is freed only when the count reaches zero and no process still holds the file open; see [[File Descriptor]]. A large log deleted while a program writes to it keeps using disk space until the program closes it.
- **Edits show through every name.** Since all names lead to the same inode, changing the contents through one changes them for all. Permissions and ownership live in the inode too, so they're shared; see [[File Permissions]].
- **Renames are cheap and atomic.** Moving a file within one filesystem only adds and removes directory entries, so the data never moves, and a reader sees either the old file or the new one, never half of each.

Hard links have firm limits. They can't cross filesystems, since inode numbers mean nothing outside the filesystem that issued them. Most systems forbid hard links to directories, because they could create loops that tools walking the tree would follow forever and that the link count couldn't untangle; see [[Graph Traversal]]. Symbolic links exist mostly to get around both limits.

Several tools build on hard links:

- **Snapshot-style backups.** Tools like rsync can make each nightly backup a full directory tree in which unchanged files are hard links to the previous night's copies, so only changed files take new space; see [[Backup and Restore]] and [[Filesystem Snapshot]].
- **Package stores.** Some package managers keep one copy of each dependency version in a global store and hard-link it into every project, saving disk space across many projects; see [[Package Manager]].
- **Atomic updates.** Writing a new file under a temporary name, then renaming it over the old one, is the standard way to replace a file without readers ever seeing a partial write; see [[Idempotence]].

The cost of sharing is the usual one: a change through one name affects all of them. Some filesystems offer reflinks instead, which share data until a write, then split; see [[Copy-on-Write]].

## See also
- [[Glob]]
- [[Sparse File]]
- [[Archive File]]
- [[Atomic File Write]]
