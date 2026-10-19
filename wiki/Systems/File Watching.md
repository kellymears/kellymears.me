---
aliases:
  - inotify
  - FSEvents
  - File watcher
  - Watch mode
  - fanotify
tags:
  - systems
summary: How programs learn that files changed, by polling or by kernel notification interfaces such as inotify and FSEvents, and the many ways those notifications get lost, delayed, or exhausted.
---
**File watching** is how a program learns that files have changed without being told by the person changing them. Development servers reload on save, build tools rebuild in watch mode, sync clients upload edits, and log viewers follow new lines, all by watching the filesystem.

There are two basic approaches:

- **Polling.** Check each file's modification time every second or so. It works everywhere, but it is slow to notice and wasteful, since checking thousands of files repeatedly costs CPU and battery even when nothing changes.
- **Notification.** Ask the kernel to report changes as they happen. It's instant and nearly free while idle, but every operating system does it differently.

The kernel interfaces:

- **inotify** on Linux, added in 2005, watches individual files and directories and delivers events such as created, modified, moved, or deleted through a file descriptor that a program can wait on alongside sockets.
- **FSEvents** on macOS reports changes at the level of directories rather than files and keeps a persistent log, so a program can ask what changed while it wasn't running.
- **kqueue** on the BSDs and macOS watches open files, one descriptor per file.
- **fanotify** on Linux watches whole filesystems at once, intended for antivirus scanners and backup tools.
- **Windows** has its own directory-change notifications.

Libraries and tools such as Facebook's Watchman paper over the differences.

The pitfalls are many. inotify isn't recursive: watching a project means adding a watch for every subdirectory, and large dependency trees can exhaust the per-user limit on watches, producing confusing "no space left on device" errors with plenty of disk free. Event queues can overflow during bulk operations, at which point a watcher must fall back to rescanning everything.

Editors complicate things. Many save by writing a new file and renaming it over the old one, so the change looks like a deletion followed by a creation, and a watch attached to the old file's [[Inode]] silently stops working; see [[Atomic File Write]]. A single save can also fire several events in a burst, so watchers usually wait a few milliseconds for activity to settle before acting; see [[Debouncing]].

Boundaries break notification entirely. Network filesystems don't propagate events from other machines, and folders shared into virtual machines or containers on macOS and Windows often deliver none, so tools there fall back to polling; see [[Containerization]].

The payoff is the tight loop modern development depends on: save a file, and within a fraction of a second the change is compiled and shown; see [[Hot Module Replacement]] and [[Build Cache]]. A long-running [[Daemon]] that reloads its configuration when the file changes uses the same mechanism.

## See also
- [[Long Polling]]
