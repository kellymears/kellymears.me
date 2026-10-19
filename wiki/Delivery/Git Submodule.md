---
aliases:
  - Submodule
  - Submodules
  - Git subtree
  - .gitmodules
tags:
  - delivery
summary: Embedding one Git repository inside another as a pointer to a specific commit, why it confuses almost everyone, and the alternatives teams usually pick instead.
---
A **Git submodule** embeds one repository inside another. The outer repository does not store the inner one's files. It stores a pointer: the URL of the other repository, recorded in a `.gitmodules` file, and the exact commit to check out at a given path. When you clone the outer repository with submodules, Git fetches the inner one and checks out that commit.

The design is precise. A submodule pins a dependency to an exact commit, much as a [[Lockfile]] pins package versions, and changing which commit is used is itself a [[Commit]] in the outer repository. History shows exactly which version of the dependency every revision used, which helps with [[Reproducible Build]] goals. Because commits are hashes over their content, the pointer guarantees exactly what code you get.

In practice, submodules are notorious for confusion:

- **Forgotten initialization.** A plain clone leaves submodule directories empty. Everyone has to remember `--recurse-submodules`, or run a separate update command, and CI configurations need the same.
- **Detached HEAD.** Inside a submodule, Git checks out a commit rather than a branch. Work committed there is easy to lose, and developers are surprised that pulling the outer repository does not update the inner one.
- **Two-step changes.** Changing code in a submodule means committing and pushing in the inner repository, then committing the new pointer in the outer one. Forgetting the push leaves a pointer to a commit nobody else can fetch.
- **Stale pointers and conflicts.** Branches that update the submodule pointer differently produce a [[Merge Conflict]] that cannot be resolved by editing text, only by choosing a commit.

Submodules fit some cases well: large external projects you need to track at a specific version, shared code across repositories with separate owners, or content such as themes and datasets that changes rarely. They fit poorly when the two repositories change together often.

The common alternatives each trade differently:

- **Git subtree.** Copies the other project's history into a subdirectory of the outer repository. Clones need no extra steps, but sending changes back upstream is awkward.
- **[[Vendoring]].** Copies the dependency's files directly, without its history. Simple and self-contained, at the cost of manual updates.
- **[[Package Manager]].** Publishes the dependency as a versioned package. This is the default for libraries, with [[Semantic Versioning]] signaling compatibility, though it can lead to [[Dependency Hell]].
- **[[Monorepo]].** Puts both projects in one repository, so changes across them are a single atomic commit. It removes the coordination problem entirely, at the cost of tooling for scale.

The choice often follows team structure, an instance of [[Conway's Law]]: separate teams with separate release cycles lean toward packages or submodules, while one team changing code everywhere leans toward a monorepo.

## See also
- [[Detached HEAD]]
- [[Monorepo]]
- [[Lockfile]]
- [[Git Worktree]]
- [[Git LFS]]
