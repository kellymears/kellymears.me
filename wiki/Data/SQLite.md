---
aliases:
  - SQLite3
  - Single-file database
tags:
  - data
summary: A complete SQL database packaged as a small library that stores everything in one file, public domain since 2000, tested to an extreme standard, and probably the most widely deployed database in the world.
---
**SQLite** is a relational database packaged as a library rather than a server. A program links it in and reads and writes an ordinary file on disk, with no separate process, no network connection, and no administrator. It is probably the most widely deployed database engine in the world. Every smartphone and every major web browser contains copies, and estimates put the number of SQLite databases in use above a trillion.

D. Richard Hipp wrote it in 2000 while working on software for a U.S. Navy destroyer, which failed whenever its database server was unavailable. A database that lived inside the program could not be unavailable. The project describes its goal this way: SQLite does not compete with client-server databases, it competes with `fopen()`.

It is a full [[Relational Database]] despite its size. It supports transactions with full [[ACID]] guarantees, joins, views, triggers, window functions, and full-text search. An application can use a database file as its document format, getting crash-safe saves for free instead of writing its own; see [[Atomic File Write]]. The U.S. Library of Congress lists SQLite as a recommended format for preserving datasets, because the file format is stable, documented, and cross-platform.

Some of its choices are unusual:

- **Public domain.** SQLite has no license. Its authors dedicated it to the public domain, and source files begin with a short blessing instead of a copyright notice; see [[Public Domain]].
- **Testing.** The test suite is hundreds of times larger than the library and reaches full branch coverage at the standard required for aviation software.
- **Flexible types.** By default a column declared as an integer will accept text. Stricter tables became an option in 2021; see [[Type System]].
- **One writer.** Any number of readers can work at once, but only one connection can write at a time. A write-ahead log mode, added in 2010, lets readers continue while a write is in progress; see [[Write-Ahead Logging]].

The single-writer design and file locking limit it. It is a poor fit for many machines writing to one database, and a database file on a network filesystem can be corrupted if locking misbehaves. Hipp's advice is to use a client-server database when data is separated from the application by a network.

That advice has been tested in recent years. Tools stream SQLite's changes to cloud [[Object Storage]] for continuous backup, and several companies run SQLite databases close to users and replicate them; see [[Database Replication]]. Local-first applications keep a full SQLite database on each device and sync changes between them.

## See also
- [[SQL]]
- [[B-Tree]]
