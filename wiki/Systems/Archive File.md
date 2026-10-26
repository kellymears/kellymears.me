---
aliases:
  - Tarball
  - Zip file
tags:
  - systems
summary: Files that bundle many files and their metadata into one, from tape-era tar streams to zip's index at the end, whose design choices still decide what can be listed, extracted, or exploited.
---
**An archive file** bundles many files, with their names and metadata, into one. Two designs dominate, and their differences come from what each was built for.

**Tar**, short for tape archive, appeared in Version 7 Unix in 1979. It writes a plain stream for tape drives: a 512-byte header for a file, then its contents, then the next header, with no index anywhere. A stream can be written as it's produced and read as it arrives, so tar fits in a pipe, to compress, to copy over a network, or to unpack on another machine without an intermediate file. Tar records Unix details faithfully: permissions, owners, timestamps, and both kinds of links; see [[File Permissions]] and [[Symbolic Link]].

Tar doesn't compress. A **tarball** is usually piped through gzip, xz, or zstd as a whole, which compresses well because similar files sit next to each other in one stream, but listing the contents or extracting one file then requires reading everything before it; see [[Data Compression]].

**Zip**, released by Phil Katz in 1989, made the opposite choices. It compresses each file separately and writes a **central directory** at the end, listing every entry and where it starts. A reader seeks to the end, reads the directory, and jumps straight to the file it wants. Because readers start from the end, a zip can have something else attached at the front, which is how self-extracting archives work. Zip also became the container for many other formats: Java archives, Office documents, EPUB books, and Android packages are zip files with extra conventions inside.

Archives are untrusted input, and both formats share classic traps:

- **Path traversal.** An entry whose name climbs out with dots and slashes can write outside the destination folder when extracted, overwriting files elsewhere. A 2018 report named it Zip Slip and found it in many libraries, though tar extractors had faced the same problem for decades.
- **Decompression bombs.** A small archive can expand to petabytes. The best-known zip bomb nests layers of archives to reach that size from 42 kilobytes.
- **Links.** A symbolic link inside an archive can point outside the destination, and a later entry can then be written through it.

Software distribution runs on archives. Most packages are archives with metadata inside, including Debian packages, which wrap tarballs in an older archive format; see [[Package Manager]]. Because archives record timestamps and file order, two builds of the same source can produce different bytes, so reproducible builds pin the timestamps and sort the entries.

Archives outlive the programs that made them, which is why open, documented formats matter for long-term storage.

## See also
- [[Disk Image]]
- [[Artifact Repository]]
