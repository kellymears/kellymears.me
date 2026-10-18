---
aliases:
  - File system
  - Mount point
  - Virtual file system
  - tmpfs
  - procfs
tags:
  - systems
summary: The layer that turns a disk's numbered blocks into named files and folders, how mounting assembles many filesystems into one tree, and why Unix exposes even processes as files.
---
A **filesystem** organizes storage into named files and directories. A disk itself knows only numbered blocks of bytes; the filesystem decides which blocks belong to which file, records names, sizes, permissions, and timestamps, and tracks which blocks are free. Common ones include ext4 and Btrfs on Linux, APFS on macOS, NTFS on Windows, and exFAT on USB drives.

Under the hood, a Unix filesystem stores each file's metadata in an [[Inode]], a record of its size, owner, permissions, and the locations of its blocks. Directories are just special files mapping names to inode numbers. That separation explains several quirks: a file can have several names, called hard links, and renaming a file within a filesystem is instant because only a directory entry changes. A [[Symbolic Link]], by contrast, is a small file holding a path. Access is controlled by [[File Permissions]].

Filesystems must survive crashes. Updating a file can mean changing data blocks, the inode, and the free-block map, and a power loss between those steps can leave them inconsistent. A [[Journaling File System]] writes its intentions to a log first, so recovery is quick. Newer designs use [[Copy-on-Write]], never overwriting data in place, which makes cheap [[Filesystem Snapshot]]s possible and lets checksums detect corruption.

Unix assembles everything into one tree starting at `/`. Instead of drive letters, each filesystem is **mounted** at a directory, its *mount point*. A USB drive might appear at `/media/usb`, a network share at `/mnt/share`. The kernel's **virtual file system** layer gives them all one interface, so programs call the same `open` and `read` whatever the underlying format; see [[System Call]] and [[File Descriptor]].

That interface is so general that Unix uses it for things that aren't stored anywhere:

- **procfs** at `/proc` exposes each running [[Process]] as a directory of files describing its memory, open files, and command line.
- **sysfs** at `/sys` exposes devices and kernel settings.
- **tmpfs** keeps files in memory, fast and gone at reboot, often used for `/tmp`.
- **FUSE** lets ordinary programs implement filesystems, so cloud storage or an archive can appear as a folder.

This is the Unix idea that "everything is a file," letting simple tools inspect and control the whole system; see [[Unix Pipeline]].

Performance depends heavily on caching. The kernel keeps recently used file data in memory, the [[Page Cache]], so repeated reads rarely touch the disk, and it delays writes to batch them. A program that needs data to be safely on disk must ask explicitly with a sync call, a step databases depend on; see [[Write-Ahead Logging]].

Where files go within the tree follows conventions, such as `/etc` for configuration and `/var` for changing data, and per-user locations set by the [[XDG Base Directory Specification]]. Large data increasingly lives in [[Object Storage]], which drops the hierarchy for flat keys.

## See also
- [[Disk Partition]]
