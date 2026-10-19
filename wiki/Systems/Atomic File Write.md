---
aliases:
  - Atomic rename
  - Write-then-rename
  - Crash consistency
tags:
  - systems
summary: Replacing a file so that readers and crashes see either the complete old version or the complete new one, never a half-written mix, by writing a temporary file and renaming it over the original.
---
An **atomic file write** replaces a file's contents so that anyone reading it, and the file itself after a crash, sees either the complete old version or the complete new one, never a mixture. Writing straight into an existing file doesn't guarantee this. If the program crashes or the power fails partway through, the file is left truncated or half updated, and a reader at the wrong moment can see a partial file.

The standard technique is **write, then rename**:

1. Write the new contents to a temporary file in the same directory.
2. Force that data onto the disk, since the operating system normally holds writes in memory for a while; see [[Page Cache]].
3. Rename the temporary file over the original. On Unix systems, a rename within one filesystem is atomic: the name points either at the old file or at the new one.
4. Force the directory itself to disk, so the rename survives a crash.

The temporary file must be on the same filesystem, because a rename can't move data between filesystems; the system reports an error instead. Writing it to a shared temporary directory, which is often a separate in-memory filesystem, breaks the technique.

Skipping the second step caused a well-known controversy in 2009. The ext4 filesystem delayed writing file data for performance while recording renames promptly in its journal. After a crash, applications that wrote and renamed without forcing data to disk found their configuration files replaced with empty ones. Filesystem developers argued that applications had never been promised otherwise; application developers argued that every program had relied on it. Ext4 added a workaround detecting the pattern. A 2014 study found similar mistakes across many popular applications and databases.

Renaming has side effects, because the new file is a different file:

- It gets a new [[Inode]], so any hard link still points to the old contents and programs watching the old file may miss the change.
- Ownership and permissions must be copied over deliberately.
- If the original was a [[Symbolic Link]], the rename replaces the link with a regular file. Tools that manage [[Dotfiles]] as links into a repository can find them silently converted into ordinary copies.

Some editors offer a choice between renaming and overwriting in place for these reasons.

Databases need finer-grained guarantees than whole-file replacement and use logs instead, recording intent before changing data; see [[Write-Ahead Logging]] and [[ACID]]. Filesystems that never overwrite data in place get atomic updates of their own structures for free; see [[Copy-on-Write]]. Version control applies the same all-or-nothing idea to sets of changes; see [[Atomic Commit]].

## See also
- [[Time-of-Check to Time-of-Use]]
- [[File Watching]]
