---
aliases:
  - Git hooks
  - Pre-commit hook
  - Commit-msg hook
  - Pre-receive hook
tags:
  - delivery
summary: Scripts Git runs automatically at points such as committing or pushing, used to check formatting and messages locally, and on servers to enforce policy or trigger deploys.
---
A **Git hook** is a script that Git runs automatically when a particular event happens in a repository. Hooks let a project attach its own checks and automation to Git's workflow without changing Git itself. If a hook exits with an error, Git aborts the operation it was about to perform.

Client-side hooks run on a developer's machine:

- **pre-commit** runs before a [[Commit]] is created, typically to format code, run a linter or other [[Static Analysis]] on the staged files, or scan for accidentally committed credentials, a common cause of leaks that [[Secret Management]] exists to prevent.
- **commit-msg** checks the message itself, for example enforcing the [[Conventional Commits]] format.
- **pre-push** runs before changes leave the machine, a good place for a quick test suite.
- **post-checkout** and **post-merge** run after switching branches or pulling, often to reinstall dependencies when a [[Lockfile]] changed.

Server-side hooks run on the machine receiving a push. **pre-receive** can reject a push outright, enforcing rules such as protected branches or file size limits. **post-receive** runs after a push is accepted and was the basis of early `git push` deploys, in which pushing to a remote built and launched the application. Hosted platforms replaced most server-side hooks with a [[Webhook]] that notifies an outside service.

Hooks live in the `.git/hooks` directory as executable files, often [[Shell]] scripts, named after the event. That directory is not part of the repository's tracked content and is not copied by `git clone`. This is deliberate: a hook is arbitrary code, and cloning a repository shouldn't make it run anything on your machine. To share hooks across a team, projects keep them in the tracked tree and point Git at them with the `core.hooksPath` setting, added in 2016, or use a hook manager such as Husky, lefthook, or the pre-commit framework, which installs hooks and the tools they call.

A few habits keep hooks useful:

- **Keep them fast.** A pre-commit hook that takes a minute gets skipped. Checking only staged files, rather than the whole project, keeps it to seconds.
- **Treat them as a convenience, not a gate.** Anyone can bypass client hooks with `git commit --no-verify`, so every rule that matters must also run in [[Continuous Integration]]. Local hooks just catch problems earlier, the [[Fail Fast]] principle at the smallest scale.
- **Fix, don't just complain.** Hooks that run a formatter and restage the result are less irritating than ones that only report errors.

Hooks are shared by every [[Git Worktree]] of a repository, since they live in the common Git directory. They also suit an [[Atomic Commit]] habit, since checks run on exactly what is staged.

## See also
- [[Staging Area]]
- [[Shebang]]
