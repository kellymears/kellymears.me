---
aliases:
  - Fork
  - Forking
  - Upstream
  - Upstreaming
  - Downstream
tags:
  - delivery
summary: Copying a codebase to develop it separately, either as the everyday first step of contributing or as a split in a project's community, and the upstream and downstream relationship that follows.
---
A **fork** is a copy of a codebase that develops separately from the original. The word covers two very different events.

On code hosting platforms, forking is routine. To contribute to a project you don't have write access to, you fork it into your own account, make changes on a branch, and open a [[Pull Request]] asking the original to take them. Millions of these forks exist and most are discarded once the change lands. They are a permission workaround more than a split.

The older meaning is a **project fork**: a group takes the code and continues it under a new name, with its own maintainers and direction. Open source licenses make this always possible, whether [[Permissive License|permissive]] or [[Copyleft|copyleft]], and the ability to fork is often described as the community's final check on its maintainers. Famous examples followed disputes over governance, licensing, or ownership:

- **LibreOffice** split from OpenOffice in 2010 after Oracle acquired Sun, and most contributors followed it.
- **MariaDB** forked MySQL, led by MySQL's original creator, over the same acquisition.
- **io.js** split from Node.js in 2014 over the pace of releases and governance, then merged back a year later once a foundation was formed.
- **OpenTofu** forked Terraform, and **Valkey** forked Redis, when both moved from open licenses to source-available ones.

Not every project fork is hostile. Some are friendly experiments whose best ideas flow back, and many exist because the original was abandoned: an unmaintained library often lives on through a community fork that new users have to discover, a recurring source of [[Dependency Hell]].

Forks are costly, because effort divides and users must choose. Most fade, and the survivors usually have the active contributors behind them, which is why [[Bus Factor]] matters in judging one.

The terms **upstream** and **downstream** describe the flow between related codebases. Upstream is the original project; downstream is anything built from it, such as a fork, a Linux distribution's packaged version, or an internal copy with local patches. *Upstreaming* means sending your changes back to the original rather than keeping them as private patches. It is usually worth the effort: every patch kept only downstream must be reapplied, often with a [[Merge Conflict]] each time, on every upstream release. Distributions describe this as the cost of carrying patches, and [[Vendoring]] dependencies with local edits has the same problem.

Staying in sync is the practical work of a long-lived fork. The fork adds the original as a second remote, fetches it regularly, and merges or [[Rebase|rebases]] onto it. The further the fork drifts, the harder each sync gets, the same dynamic as a long-lived branch in a [[Branching Model]].

## See also
- [[Pull Request]]
- [[Copyleft]]
- [[Tragedy of the Commons]]
- [[Strangler Fig Pattern]]
- [[Enshittification]]
- [[Free Rider Problem]]
