---
aliases:
  - Cattle not pets
  - Golden image
  - Disposable servers
tags:
  - delivery
summary: The metaphor for treating servers as interchangeable, replaceable units rather than unique, hand-tended machines, central to cloud infrastructure and immutable deployments.
---
**Pets vs cattle** is a metaphor for two ways of treating servers. **Pets** are unique machines with names, carefully set up and nursed back to health when they get sick. **Cattle** are numbered, identical, and replaced rather than repaired when something goes wrong. The metaphor is usually credited to a Microsoft engineer around 2012, contrasting scaling up a few big machines with scaling out across many small ones, and was popularized by cloud advocates soon after.

Pet servers accumulate history. Someone logs in to install a package, tweak a setting, or apply a fix, and over months the machine becomes a unique artifact nobody fully understands, a **snowflake server**; see [[Configuration Drift]]. Rebuilding it is frightening because nobody knows everything that was done to it, so it's patched in place, which makes the problem worse.

Cattle are built from a definition rather than by hand. The usual techniques:

- **Golden images.** A machine or container image is baked with everything installed, tested, and then launched as many times as needed; see [[Containerization]].
- **Infrastructure as code.** Servers, networks, and permissions are described in version-controlled files and created by tools; see [[Infrastructure as Code]].
- **Replace, don't repair.** A failing instance is terminated and a new one started from the same image. To change a server, build a new image and roll it out; see [[Immutable Infrastructure]].
- **No unique state.** Data lives in databases, object stores, or volumes outside the instance, so losing an instance loses nothing; see [[Twelve-Factor App]].

The payoff is that recovery, scaling, and deployment become the same operation: start more instances from a known image. Orchestrators like [[Kubernetes]] are built on this assumption, restarting failed containers and spreading load without anyone deciding which machine runs what. It also makes [[Rolling Deployment]] and [[Blue-Green Deployment]] routine, since new versions are simply new herds.

The metaphor has limits. Some things are hard to treat as cattle: databases, systems with large local state, and specialized hardware. Even then, teams try to make those systems reproducible from backups and definitions so they can be rebuilt if needed; see [[Disaster recovery]]. The idea has also spread beyond servers: developer machines, CI runners, and test environments are increasingly disposable; see [[Ephemeral Environment]].

Some people find the livestock framing grim, and alternatives such as "disposable" or "immutable" describe the same principle without it.

The underlying idea is about knowledge rather than machines. A pet holds knowledge only in itself; cattle hold none, because everything about them is written down somewhere else. The second is easier to recover, audit, and change; see [[Reproducible Build]].

## See also
- [[GitOps]]
- [[Site Reliability Engineering]]
- [[Works on My Machine]]
- [[Configuration Management]]
