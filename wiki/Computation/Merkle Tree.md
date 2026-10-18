---
aliases:
  - Hash tree
  - Merkle DAG
  - Merkle proof
  - Content-addressable storage
tags:
  - computation
summary: A tree of hashes in which every parent fingerprints its children, so one root hash vouches for a whole dataset and differences can be found by comparing a few hashes.
---
A **Merkle tree** is a tree of hashes. Each leaf holds the [[Hash Function]] output of a block of data, each parent holds the hash of its children's hashes, and the single hash at the top, the *root*, summarizes everything beneath it. Change one byte anywhere and that leaf's hash changes, which changes its parent's, and so on up to the root. Ralph Merkle described the structure in 1979 as a way to make digital signatures more efficient.

Three properties make it useful:

- **One hash vouches for everything.** If you trust the root, from a signature or a trusted source, you can verify any data claimed to be under it.
- **Cheap proofs.** To prove one block belongs to a tree of a million, you need only the roughly twenty sibling hashes along the path to the root, not the other blocks. This is a *Merkle proof*.
- **Fast comparison.** Two copies of a large dataset can be compared by comparing roots. If the roots differ, compare children, and descend only into subtrees that differ. Finding a few changed blocks among millions takes a handful of round trips.

Identifying data by its hash, rather than by a name or location, is called **content addressing**, and Merkle structures generalize it from single files to whole collections. Identical content gets identical addresses, so it is stored once, and anyone can verify they received exactly what they asked for.

Merkle trees and their generalization, Merkle DAGs, appear throughout computing:

- **Git.** Every file is stored by its hash, directories as lists of hashes, and each [[Commit]] as a hash of its tree and parent commits. A commit hash therefore fingerprints the entire history behind it, which is why rewriting history changes every later hash, and why [[Version Control]] can efficiently tell what changed. See [[Immutability]].
- **Replication.** Databases such as Cassandra compare Merkle trees of their data to find which ranges replicas disagree on during anti-entropy repair, a form of [[Gossip Protocol]] and [[Database Replication]] maintenance.
- **Transparency logs.** The public logs behind [[Certificate Authority]] transparency are Merkle trees, so anyone can verify a certificate was logged and that the log was only appended to. The same idea underpins software signing logs used for [[Supply Chain Security]].
- **Peer-to-peer and storage.** BitTorrent v2, IPFS, and blockchains verify blocks against Merkle roots, so data can come from untrusted [[Peer-to-Peer]] sources. ZFS and Btrfs keep checksum trees to detect silent corruption, fitting naturally with [[Copy-on-Write]] snapshots.

The tree is only as strong as its hash function. Git's original use of SHA-1 became a concern after the first practical SHA-1 collision in 2017, and Git has been migrating to SHA-256.

## See also
- [[Hash Function]]
- [[Commit]]
- [[Version Control]]
- [[Filesystem Snapshot]]
