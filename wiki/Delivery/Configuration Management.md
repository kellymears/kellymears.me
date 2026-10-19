---
aliases:
  - Ansible
  - Puppet
  - Chef
tags:
  - delivery
summary: Tools that describe how servers should be set up, which packages, files, users, and services, and repeatedly bring real machines into line with that description, so fleets stay consistent instead of drifting apart.
---
**Configuration management** tools describe how machines should be set up and then make them so. Instead of logging into each server to install packages, edit files, and start services by hand, an administrator writes down the desired state in code, and the tool applies it to as many machines as needed. The same description produces the same setup every time.

The field began with CFEngine, created by Mark Burgess in 1993 at a Norwegian university. Puppet (2005) and Chef (2009) followed and became standard in the early cloud era, when companies went from tens of servers to thousands. Ansible (2012) simplified things by needing no software on the target machines, connecting over [[Secure Shell]] and running steps directly; Salt took a similar path.

Most of these tools are **declarative**. A configuration says "nginx is installed, this file has these contents, this service is running," not the commands to get there. The tool checks the current state and does only what's needed. Running it twice changes nothing the second time; see [[Idempotence]]. That property makes it safe to run on a schedule, which corrects machines that have changed since the last run; see [[Configuration Drift]].

Burgess described this as **convergence**: rather than expecting every command to succeed, a system repeatedly nudges each machine toward the desired state, so that temporary failures fix themselves on a later pass; see [[Eventual Consistency]]. The same idea reappears in later systems that continuously compare desired and actual state; see [[Kubernetes]] and [[GitOps]].

Keeping configuration in [[Version Control]] gave operations teams the habits of software development: review, history, testing, and rollback. That shift is a large part of [[Infrastructure as Code]].

The approach has weaknesses. Configuration covers only what it mentions, so anything changed by hand outside it goes unnoticed. Long-lived servers accumulate history that no description fully captures, and a machine rebuilt from the configuration may behave differently from one that has been running for years.

Those problems drove a shift toward building complete machine or container images once and replacing servers rather than updating them; see [[Immutable Infrastructure]], [[Containerization]], and [[Pets vs Cattle]]. Configuration management moved toward building those images and managing the hosts underneath, though it remains common wherever long-lived machines persist.

Configurations need credentials for databases and services. Writing them into the configuration files puts them in the repository, so most tools integrate with separate secret stores; see [[Secrets Management]]. The same declarative approach applies to personal machines, where people keep their settings in version control and apply them with scripts or tools; see [[Dotfiles]].

## See also
- [[Change Advisory Board]]
- [[Wizard]]
