---
aliases:
  - Partial clone
  - Sparse checkout
  - Blobless clone
  - Shallow fetch
tags:
  - delivery
summary: Ways to fetch less than a whole Git repository, by cutting history, deferring file contents, or checking out only some directories, and what each breaks.
---
A **shallow clone** fetches only recent history instead of a repository's entire past. `git clone --depth 1` downloads just the latest commit and its files, which for a large, old repository can be a fraction of the full size. Git offers several related ways to fetch less, each cutting a different dimension of the repository:

- **Shallow clones** cut history. Commits beyond the chosen depth are missing, and the oldest commit is marked as a boundary.
- **Partial clones** keep the full commit history but defer file contents. A *blobless* clone, `--filter=blob:none`, downloads every commit and directory listing but fetches a file's contents only when a checkout or command needs them.
- **Sparse checkout** limits which directories appear in the working tree. It's usually combined with a partial clone so that excluded directories are never downloaded either.

Why they matter:

- **[[Continuous Integration]].** Most CI jobs only build the current commit, so many CI systems clone shallow by default. On big repositories this can save minutes per job.
- **[[Monorepo]] work.** A developer working on one service in a huge monorepo can check out just that part with sparse checkout, keeping the working tree and file watchers fast.
- **Large histories.** Partial clones let people work with repositories whose full history is many gigabytes, downloading old content only if they look at it.

Each approach breaks something:

- **Shallow clones break history-based tools.** [[Git Blame]] stops at the boundary, [[Git Bisect]] can't search commits it doesn't have, and merging or rebasing against a branch whose shared ancestor is missing fails or misbehaves. Tools that compute a version from tags, or that compare with the main branch to decide what to test, give wrong answers. The CI fix is fetching more depth or the specific base commit; `git fetch --unshallow` restores the full history.
- **Partial clones need the network.** Commands that touch old file contents, such as `git log -p` over long ranges, trigger many small downloads and can be slow, and nothing works offline for content not yet fetched.
- **Sparse checkouts hide dependencies.** A change in an excluded directory can break your build in ways you can't see locally.

For most CI jobs, shallow is fine until something needs history, and then the failure is confusing; a build that uses the [[Changelog]] or a tag-derived version needs at least the tags. For developer machines, Git's own documentation now recommends blobless partial clones over shallow ones, since they keep history intact and fetch content lazily.

These techniques reduce how much of a repository you fetch. [[Git LFS]] addresses a different problem, large binaries in history. A [[Git Worktree]] solves another, needing several checkouts of one repository without cloning it twice.

## See also
- [[Version Control]]
- [[Build Cache]]
- [[Reflog]]
- [[Git Submodule]]
