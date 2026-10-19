---
aliases:
  - Small world
  - Six degrees of separation
  - Small-world experiment
tags:
  - meaning
summary: A network where most nodes have only local connections yet any two are linked by a short chain, the structure behind "six degrees of separation," found in friendships, brains, power grids, and the web.
---
A **small-world network** is one where most connections are local, yet any two nodes can be reached through a surprisingly short chain of links. Human society is the famous example: most of a person's friends know each other, yet almost anyone on Earth is only a handful of introductions away. The phrase "six degrees of separation" names the idea.

The psychologist Stanley Milgram tested it in 1967. He gave letters to people in Nebraska and Kansas, asking them to get each letter to a stockbroker in Boston by passing it only to someone they knew personally, who would pass it on in turn. Of the letters that arrived, the median chain had about five intermediaries, roughly six steps. Most letters never arrived, a limit often left out of retellings. Later large-scale studies confirmed short paths: a 2011 analysis of Facebook found an average of about 3.7 intermediaries between users, and a 2008 study of Microsoft Messenger found about 6.6 hops.

The mathematicians Duncan Watts and Steven Strogatz explained how such networks arise in a 1998 paper. They started with a regular lattice, where each node links only to its neighbors, so paths between distant nodes are long. Then they randomly rewired a small fraction of links to point anywhere. A few long-range shortcuts were enough to make average path lengths collapse while local clustering stayed high. Small worlds need only a little randomness; the shortcuts are what Granovetter called weak ties; see [[Strength of Weak Ties]].

Small-world structure turns up widely:

- **Brains.** Neurons cluster locally but have long-range connections, balancing specialized processing with fast integration.
- **Power grids and transport.** Short paths help efficiency but also let failures spread quickly; see [[Cascading Failure]].
- **The web and citations.** Pages and papers cluster by topic, linked by a few bridging works; see [[World Wide Web]] and [[Backlink]].
- **Collaboration.** Mathematicians count their *Erdős number*, the length of their co-authorship chain to Paul Erdős; actors play the "Six Degrees of Kevin Bacon" game.

Many real networks are also *scale-free*: a few hubs hold an enormous number of connections, because new nodes prefer to link to already popular ones; see [[Matthew Effect]]. Hubs make paths even shorter but make the network fragile if they're attacked.

Short paths explain how quickly things spread, from rumors and diseases to computer worms and viral posts. Distributed systems exploit the same property: gossip protocols reach every node in a few rounds by talking to random peers; see [[Gossip Protocol]] and [[Mesh Network]]. Finding short paths efficiently, though, depends on having local knowledge of where to send things next, which Milgram's letter carriers used and which search algorithms model; see [[Graph Traversal]].

## See also
- [[Seven Bridges of Königsberg]]
- [[Network Topology]]
- [[Approximate Nearest Neighbor Search]]
- [[PageRank]]
- [[Social Capital]]
- [[Herd Immunity]]
- [[Imagined Community]]
