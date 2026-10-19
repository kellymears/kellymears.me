---
aliases:
  - SWHID
tags:
  - delivery
summary: A nonprofit archive, launched in France in 2016, that aims to collect and preserve all publicly available source code, storing billions of files in a deduplicated structure and giving each artifact a permanent identifier derived from its content.
---
**Software Heritage** is an archive that aims to collect, preserve, and share all publicly available software source code. It was launched in 2016 by Inria, the French national research institute for computer science, and has been supported by UNESCO since 2017, which treats software source code as part of humanity's cultural heritage.

The motivation is that source code is fragile. Projects live on hosting platforms that can shut down, accounts get deleted, and repositories disappear; see [[Link Rot]] and [[Digital Preservation]]. When Google Code closed in 2016, and when a large hosting platform dropped support for Mercurial repositories in 2020, Software Heritage helped rescue large numbers of projects that would otherwise have vanished. Even when code survives, the history behind it, who changed what and why, is easily lost.

The archive crawls major code hosting platforms, package registries, and Linux distributions, regularly capturing new and updated projects; see [[Software Forge]]. Its holdings run to tens of billions of unique source files drawn from hundreds of millions of projects, making it by far the largest public archive of source code.

Storing that much efficiently depends on a structure similar to Git's. Every file, directory, commit, and release is identified by a hash of its content, and the whole archive forms one huge graph in which identical content is stored only once; see [[Merkle Tree]] and [[Git Object Model]]. Since huge amounts of code are copied between projects, through forks, vendored dependencies, and boilerplate, this deduplication saves an enormous amount of space. It also makes the archive useful for tracing where a piece of code has appeared; see [[Provenance]].

Software Heritage gives each archived artifact a permanent identifier, abbreviated **SWHID**, computed from the artifact's content. Unlike a web address, which can break or point to changed content, such an identifier always refers to exactly the same bytes; see [[Persistent Identifier]] and [[Hash Function]].

Those identifiers matter for research. Scientific results increasingly depend on code, and a paper that cites only a link to a repository may become impossible to reproduce once the repository changes or disappears. Citing an exact archived version helps others check and rebuild the work; see [[Replication Crisis]] and [[Reproducible Build]]. The archive also helps track exactly which version of a dependency was used, complementing lists of software components; see [[Software Bill of Materials]].

The archive has also been used as a source for large datasets of code for training and studying machine learning models, which raised questions about licensing and consent that the archive and its partners have tried to address.

The project reflects a broader concern that digital history is surprisingly easy to lose, as the sudden removal of a small package once demonstrated; see [[Left-Pad Incident]].

## See also
- [[Source Code Control System]]
- [[Software Patent]]
- [[Free Software]]
