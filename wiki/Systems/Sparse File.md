---
aliases:
  - Sparse files
  - File hole
tags:
  - systems
summary: A file whose large empty regions take up no disk space, recorded as holes that read back as zeros, useful for virtual machine disks and databases and a recurring source of surprises when copied or backed up.
---
A **sparse file** is a file with holes: regions that have never been written and take up no space on disk. Reading from a hole returns zeros, exactly as if zeros had been stored there, but the filesystem only records that the range is empty. A sparse file can report a size of 100 gigabytes while occupying a few megabytes of actual storage.

Creating one is easy. A program opens a file, moves its write position far past the end, and writes a few bytes there. Everything in between becomes a hole. Most modern filesystems support this; see [[Filesystem]]. The file's inode records which blocks exist, and the missing ones are simply absent; see [[Inode]].

The result is two different sizes. The apparent size is what programs see when they ask how long the file is. The allocated size is how much disk the file really uses. Listing tools usually show the first, while disk usage tools show the second, which is why the two can disagree wildly about the same file.

Sparse files are useful in several places:

- **Virtual machine disks.** A virtual disk can be created at its full nominal size and fill in only as the guest writes data; see [[Disk Image]] and [[Hypervisor]].
- **Databases and indexes.** Files can reserve address ranges for future growth without paying for them up front.
- **Crash dumps.** A memory dump of a process with a huge but mostly empty address space can be written sparsely; see [[Core Dump]] and [[Virtual Memory]].
- **Downloads.** File-sharing clients that receive pieces out of order can write each piece at its final offset; see [[BitTorrent]].

The trouble is that sparseness is invisible to most programs. A naive copy reads the zeros and writes them out, turning a small file into a huge one. Copying tools, archivers, and backup software often need specific options to preserve holes; see [[Archive File]] and [[Backup]]. Sending a sparse file over a network without that care transmits gigabytes of zeros.

Sparse files also make storage promises they can't keep. Several large sparse files can collectively claim more space than the disk holds. When they fill in, writes fail with no space left, even though nothing seemed to be growing. Storage systems face the same risk at a larger scale; see [[Thin provisioning]].

Holes can be added after the fact. Linux lets programs punch a hole in an existing file, freeing the blocks behind a range of data that's no longer needed, and lets tools seek directly to the next hole or the next data region instead of reading every byte.

Some filesystems go further, compressing runs of zeros or deduplicating identical blocks, which gets similar savings without relying on holes; see [[ZFS]] and [[Data Compression]].

## See also
- [[Copy-on-Write]]
- [[Lazy Evaluation]]
