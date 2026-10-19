---
aliases:
  - Trash
  - Undelete
  - File carving
tags:
  - systems
summary: The holding area where deleted files wait before being erased for good, along with the older realization that deleting a file usually leaves its data on disk, which makes recovery possible and secure deletion hard.
---
Deleting a file on a modern desktop rarely deletes it. The file moves to the **Trash** or **Recycle Bin**, a special folder from which it can be restored until the user empties it or the system clears old items. It's an undo for the most consequential everyday mistake; see [[Undo]].

The trash can appeared in Apple's Lisa in 1983 and the Macintosh in 1984, as part of the desktop metaphor in which the screen behaves like a desk; see [[Desktop Metaphor]]. Its icon, a wastebasket that looks full when it holds files, became one of the most recognizable symbols in computing. Microsoft added the Recycle Bin with Windows 95. Linux desktops follow a shared specification that keeps trashed files and a record of where they came from in a folder within the user's data directory; see [[XDG Base Directory Specification]] and [[Desktop Environment]].

The trash is a convention of graphical file managers, not of the operating system. Deleting a file from a terminal removes it immediately, with no second chance, and programs that delete files themselves usually bypass the trash too. Files deleted on network drives or removable disks may skip it as well.

Even past the trash, data usually survives. Removing a file normally just deletes its name from a directory and marks its blocks as free; see [[Inode]]. If other names still point to the same data, nothing is freed at all. The contents stay on disk until something else overwrites them. **Undelete** tools, which have existed since the MS-DOS era, scan for such leftovers and reconstruct files. When even the records are gone, **file carving** searches raw disk data for recognizable file headers and footers, recovering photos and documents from formatted cards. Data recovery services and forensic investigators rely on the same techniques.

That durability cuts both ways. Overwriting a file once was the standard advice for secure deletion, but filesystems that write new data elsewhere rather than overwriting in place, snapshots and journals can keep old copies; see [[Copy-on-Write]], [[Filesystem Snapshot]] and [[Journaling File System]]. Solid-state drives remap blocks internally and may also erase freed blocks on their own schedule, which makes recovery harder and secure overwriting unreliable; see [[Solid-State Drive]] and [[Data Remanence]]. Encrypting the whole disk sidesteps the problem, since destroying the key renders everything unreadable; see [[Full-Disk Encryption]].

Applications borrowed the idea widely. Email clients, photo libraries and cloud services keep deleted items for a grace period, often thirty days, which is a soft delete with a scheduled permanent one; see [[Soft Delete]]. Neither the trash nor undelete tools are a backup, though; a failed drive takes its trash with it; see [[Backup and Restore]].

## See also
- [[File Permissions]]
- [[Ransomware]]
