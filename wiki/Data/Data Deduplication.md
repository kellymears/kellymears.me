---
aliases:
  - Content-defined chunking
  - Single-instance storage
tags:
  - data
summary: Storing identical pieces of data only once by recognizing them through hashes, the technique that lets backups of mostly unchanged files cost almost nothing, with tradeoffs in memory, restore speed, and privacy.
---
**Data deduplication** saves storage by keeping only one copy of identical data and replacing every other copy with a reference to it. Backups are the classic case. A nightly backup of a laptop is almost entirely the same as the previous night's, and storing each in full multiplies the cost for nothing.

The simplest form works on whole files. **Single-instance storage** keeps one copy of any file that appears many times, such as an attachment sent to everyone in a company. Email servers long did this for attachments.

Finer-grained deduplication splits data into chunks and identifies each chunk by a hash of its contents; see [[Hash Function]]. If the hash is already in the index, the chunk is stored already, and only a reference is written, an approach called content addressing. With strong hashes, the chance of two different chunks sharing one is so small it's ignored in practice; see [[Birthday Problem]].

How chunks are cut matters. Fixed-size chunks fail badly when data is inserted: adding one byte near the start of a file shifts every later boundary, and every chunk looks new. **Content-defined chunking** solves this by choosing boundaries from the data itself. A hash computed over a sliding window marks a boundary wherever its value matches a pattern, so an insertion changes only the chunks around it, and the rest realign; see [[Rolling hash]]. A file system research project at MIT in 2001 used the technique to cut network traffic, and modern backup tools rely on it.

Deduplication appears at several layers:

- **Backup tools** deduplicate across every snapshot, so keeping years of history costs little more than the changes; see [[Backup and Restore]].
- **File systems** can deduplicate blocks, though doing it inline needs a large index in memory; see [[ZFS]] and [[Copy-on-Write]].
- **Version control** stores each unique file content once, by its hash; see [[Version Control]] and [[Merkle Tree]].
- **Cloud storage** can avoid uploading files the provider already has; see [[Object Storage]].

The costs are real. The index of chunk hashes can be large, and checking every write against it takes memory and processing time. Restores can be slower, since a file's chunks are scattered wherever they were first written. And when one stored chunk backs thousands of files, damaging it damages all of them.

Privacy is a subtler cost. If a service skips uploading data it already holds, an observer can learn whether a particular file exists somewhere in the system, a form of information leak; see [[Side-channel attack]]. Encryption also conflicts with deduplication, since identical data encrypted with different keys looks different.

Deduplicating storage is distinct from deduplicating records, finding the entries in a database that describe the same real person or thing despite differences in spelling; see [[Entity Resolution]].

## See also
- [[Data Compression]]
- [[Bloom Filter]]
- [[Internet Archive]]
- [[Phonetic Algorithm]]
