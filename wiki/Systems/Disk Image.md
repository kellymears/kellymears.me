---
aliases:
  - ISO image
  - Loop device
  - Virtual disk
tags:
  - systems
summary: A single file holding the complete contents and structure of a disk, used to install operating systems, run virtual machines, preserve old media, and copy drives exactly for forensic investigation.
---
A **disk image** is a file that contains the complete contents and layout of a storage device: its partitions, filesystems, boot code, and often its empty space as well. Where an ordinary copy captures files, an image captures the disk itself, so writing it back to a drive reproduces the original exactly.

Images come in several kinds:

- **Raw images** are a byte-for-byte copy of a device, with no extra structure. They're the simplest and largest.
- **ISO images** follow the filesystem standard for optical discs, published in 1988, and became the usual way to distribute operating system installers; see [[Boot Process]].
- **Virtual machine formats** add features such as growing on demand, snapshots, and compression; see [[Hypervisor]].
- **Platform formats**, such as the images macOS uses for downloadable software, can carry encryption and checksums.

Operating system installers are the most familiar use. Distributions publish an ISO, and users write it to a USB stick, which then boots the installer; see [[Linux Distribution]]. Modern installer images are often hybrids, built to boot whether they're burned to a disc or copied raw onto a flash drive.

Virtual machines treat an image as their hard drive. The guest operating system sees an ordinary disk while the host stores everything in one file. Formats that grow as data is written behave much like sparse files, starting small and filling in; see [[Sparse File]]. Snapshot features layer changes over a read-only base image, so a machine can be rolled back or many machines can share one base; see [[Copy-on-Write]] and [[Filesystem Snapshot]].

Container images look similar but differ. They hold a stack of filesystem layers, not a full disk with partitions and a boot loader; see [[Containerization]] and [[Overlay Filesystem]].

On Linux, a **loop device** makes a file behave like a block device, so an image can be mounted and browsed like a real disk; see [[Filesystem]].

Forensic investigators rely on images. Examiners copy a seized drive bit for bit, including deleted files and unallocated space, record a cryptographic hash of the copy, and analyze the image instead of the original; see [[Hash Function]]. The hash proves later that nothing changed.

Preservation depends on imaging too. Floppy disks, cartridges, and optical discs decay, and an image is often the only way to keep the software they hold; see [[Digital Preservation]]. Emulators run old software from those images; see [[Emulation]].

Images also serve as backups. Cloning a whole drive captures the operating system and settings along with the data, which makes restoring a failed machine faster than reinstalling; see [[Backup]]. The trade-off is size, since an image may include space no file uses.

## See also
- [[Rootkit]]
- [[Archive File]]
