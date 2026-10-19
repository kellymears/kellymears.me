---
aliases:
  - Blob storage
  - S3
  - Bucket
  - Presigned URL
  - Object store
tags:
  - data
summary: Storage that keeps whole files as objects addressed by key in a flat namespace over HTTP, cheap and nearly limitless, which became the foundation for backups, media, and data lakes.
---
**Object storage** keeps data as whole *objects*, each a blob of bytes plus metadata, addressed by a key inside a *bucket* and read and written over HTTP. There are no directories, no partial overwrites, and no file locking: an object is uploaded whole, read whole or by byte range, and replaced whole. Amazon launched S3 in 2006 with this model, and its API became a de facto standard that most providers and many self-hosted systems copy.

It differs from the other two common storage models:

- **Block storage** looks like a raw disk, divided into fixed-size blocks that a filesystem or database manages. It's fast and supports small in-place updates, but it's attached to one machine at a time.
- **File storage** offers a shared filesystem with directories, permissions, and file locks, which many machines can mount.
- **Object storage** gives up in-place edits and real directories in exchange for nearly unlimited scale, low cost, and access from anywhere over the network.

Keys can contain slashes, such as `photos/2025/ride.jpg`, and tools display them as folders, but the namespace is flat. Listing "a folder" is really a prefix search over keys, and renaming one means copying and deleting every object under it.

Durability is the headline feature. Providers spread each object across multiple disks and buildings, often with error-correcting code techniques that survive several simultaneous failures, and quote durability of eleven nines. That makes object storage the usual home for Backup and Restore copies, with *versioning* and write-once retention settings protecting against accidental deletion and ransomware.

Common patterns:

- **Media and static assets.** Images, video, and built web assets sit in a bucket behind a [[Content Delivery Network]], which serves cached copies near users.
- **Presigned URLs.** The server signs a time-limited URL that lets a browser upload or download one object directly, so large files never pass through the application server.
- **Data lakes.** Analytics data lands as files in Columnar Storage formats such as Parquet, and query engines read it in place. The data lake is largely object storage plus metadata.
- **Storage tiers.** Rarely read data moves to cheaper, slower classes, with archival tiers that take hours to retrieve.

The costs hide in the details. Storing data is cheap, but requests are billed individually, and moving data out to the internet is charged per gigabyte, which can make leaving a provider expensive. Early S3 offered only [[Eventual Consistency]] for some operations; it has offered strong read-after-write consistency since 2020, but other compatible systems vary.

Misconfigured buckets are a recurring source of leaks. A bucket made public by mistake has exposed customer [[Personal Data]] many times, which is why providers now block public access by default and why the [[Least Privilege]] rule applies to bucket policies.

## See also
- [[Responsive Images]]
- [[Server-Side Request Forgery]]
- [[SQLite]]
