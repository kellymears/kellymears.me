---
aliases:
  - Bitcoin
  - Proof of work
  - Distributed ledger
tags:
  - networks
summary: An append-only ledger copied across many computers that agree on its contents without a central authority, introduced by Bitcoin in 2008, technically clever and energy-hungry, and useful for far fewer problems than its hype claimed.
---
**A blockchain** is a ledger, a list of transactions, copied across many computers that agree on its contents without trusting any central party. Transactions are grouped into blocks, and each block includes a hash of the previous one, so changing an old block would change every hash after it; see [[Hash Function]]. Within a block, transactions are summarized in a hash tree, so one can be checked without downloading the rest; see [[Merkle Tree]].

Hash chains for timestamping were proposed in 1991. What Bitcoin, described in a 2008 paper under the pseudonym Satoshi Nakamoto, added was a way for strangers to agree on one history without knowing who anyone was.

The problem it solved was double-spending. Digital money is just data, so without a bank keeping the books, what stops someone from sending the same coin to two people? Ordinary agreement protocols assume a known set of participants who vote; see [[Consensus Algorithm]] and [[Byzantine Fault Tolerance]]. On an open network, anyone can create a thousand identities and outvote everyone; see [[Sybil Attack]].

**Proof of work** ties voting power to computation instead of identities:

1. Participants, called miners, collect pending transactions, which spread across the network from peer to peer; see [[Gossip Protocol]] and [[Peer-to-Peer]].
2. Each miner searches for a number that makes the block's hash fall below a target, which takes huge numbers of guesses.
3. The first to find one broadcasts the block and earns newly created coins. Others verify it and build on it.
4. If two chains compete, nodes follow the one with the most accumulated work.

The target adjusts so a block appears about every ten minutes. Rewriting history means redoing that work faster than everyone else combined. Finality is only probabilistic, so recipients wait for several blocks; see [[Eventual Consistency]].

The costs are large. Bitcoin processes a handful of transactions per second, and its mining uses about as much electricity as a mid-sized country, by estimates. Ethereum, launched in 2015 with programs called smart contracts that run on the chain, switched in 2022 to proof of stake, which selects block producers by the coins they lock up and cut its energy use by more than 99 percent. Smart contracts are hard to patch, and bugs have lost hundreds of millions of dollars.

Cryptocurrency prices have gone through repeated booms and crashes; see [[Speculative Bubble]]. Many of the largest losses came from failures of centralized exchanges, the intermediaries the design meant to remove.

In the 2010s, companies piloted blockchains for supply chains, land registries, and settlement. Most were dropped, since participants who already trust an operator get the same guarantees from an ordinary database with signed records; see [[Public-Key Cryptography]]. Hash-linked history did spread widely in another form; see [[Version Control]].

## See also
- [[Distributed Hash Table]]
- [[Ransomware]]
- [[Generative Art]]
- [[Gresham's Law]]
