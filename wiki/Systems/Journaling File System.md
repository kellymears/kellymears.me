---
aliases:
  - Journaling filesystem
  - Journaled file system
  - File system journal
  - fsck
  - ext4
tags:
  - systems
summary: A file system that records intended changes in a log before applying them, so a crash or power loss leaves it recoverable in seconds instead of corrupted.
---
A **journaling file system** writes a description of each change to a special log, the *journal*, before making the change itself. If the machine crashes or loses power partway through an update, the file system can replay or discard the journal on the next boot and return to a consistent state within seconds.

The problem it solves is that even simple file operations touch several places on disk. Creating a file means allocating an [[Inode]], marking blocks as used, writing data, and adding an entry to a directory. Disks write these separately, so a crash between steps can leave a directory entry pointing at an unallocated inode, or blocks marked used that belong to nothing. Before journaling, the only remedy was **fsck**, a file system check that scanned every structure on the disk after an unclean shutdown. On large disks this took hours, and it could only guess at repairs.

Journaling applies the same idea as [[Write-Ahead Logging]] in databases:

- **Write the intent.** Record the planned changes in the journal and make sure they reach the disk.
- **Commit.** Write a commit record marking the transaction complete.
- **Apply.** Make the changes in their real locations.
- **Checkpoint.** Once applied, the journal space can be reused.

After a crash, transactions with a commit record are replayed, and incomplete ones are discarded. Either way, the operation happened entirely or not at all, the atomicity at the heart of [[ACID]].

Most journaling file systems offer modes trading safety for speed. Journaling only *metadata*, the default in Linux's ext4, keeps the file system structure consistent but can leave recently written file contents stale or garbled after a crash. Full *data journaling* writes everything twice, safer but slower. Applications that need their own data to survive crashes still have to call fsync, as described under [[Page Cache]].

Journaling became mainstream around 2000: NTFS has journaled since 1993, Linux gained ext3 in 2001, and Apple added journaling to HFS+ in 2002.

A newer approach avoids overwriting data altogether. **Copy-on-write** file systems such as ZFS, Btrfs, and Apple's APFS never modify blocks in place; they write new versions elsewhere and then switch a pointer, so every update is atomic without a separate journal. The same design makes a [[Filesystem Snapshot]] nearly free, since old blocks can simply be kept. See [[Copy-on-Write]]. ZFS and Btrfs also checksum data in a tree structure, catching silent corruption that journaling alone doesn't detect.

Neither design protects against everything. A journal guarantees consistency, not that recent data survived, and disks that report writes as complete while still holding them in a volatile cache can defeat both. None of it replaces [[Backup and Restore]], since a consistent file system can still be deleted, encrypted by ransomware, or lost with the disk.

## See also
- [[Write-Ahead Logging]]
- [[Copy-on-Write]]
- [[Filesystem Snapshot]]
- [[Inode]]
