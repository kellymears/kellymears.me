---
aliases:
  - Ignore file
  - Global gitignore
tags:
  - delivery
summary: The file of patterns telling Git which files to leave untracked, such as build output, dependencies, editor clutter, and local secrets, along with the traps of files that were already tracked and secrets already committed.
---
A **gitignore** file lists patterns for files that Git should leave untracked. Anything that matches won't show up as new in status listings and won't be added by a blanket add command. Every project has files that don't belong in version control: compiled output, downloaded dependencies, logs, caches, editor settings, operating system clutter, and local configuration holding passwords; see [[Version Control]].

The file is named .gitignore and usually sits at the root of the repository, though any directory can have one that applies beneath it. Patterns use [[Glob]] syntax:

- **A plain name** such as a log file name matches it in any directory.
- **A trailing slash** matches only directories, so a dependencies folder and everything inside it can be ignored in one line.
- **A leading slash** anchors the pattern to the directory containing the ignore file.
- **Two asterisks** match any number of nested directories.
- **An exclamation mark** re-includes something an earlier pattern excluded, though not if a parent directory was already ignored.

There are three layers. The committed .gitignore is shared with everyone. A file inside the repository's own metadata directory holds private patterns for one checkout. A global ignore file, set in the user's configuration, covers personal habits like editor swap files across every project, so each project's file doesn't have to list every tool its contributors might use; see [[Dotfiles]].

The common traps:

- **Ignoring doesn't untrack.** A file already committed stays tracked even after it is added to the ignore list. It has to be removed from the index first, while leaving the copy on disk.
- **Ignoring doesn't erase history.** A password committed once and ignored afterwards is still in every clone. The only real fix is to revoke and replace the credential; see [[Secret Management]] and [[Environment Variable]].
- **Some generated files belong in the repository.** A [[Lockfile]] is generated, but committing it is what makes installs repeatable.
- **Other tools borrow the format with their own rules.** Container builds and package publishing use similar files. Without its own ignore file, npm falls back to the Git one, which can leave out built files a package needs; see [[Artifact Repository]].

Large binary assets are a different problem. Ignoring them keeps them out of history, but if the project needs them, they belong in a system built for large files; see [[Git LFS]].

GitHub publishes starter ignore files for common languages, which many projects copy. Ignore patterns also speed up tools beyond Git: search utilities, file watchers, and editors commonly honor them to skip dependency and build directories.

A careful ignore file keeps commits focused on the change at hand and keeps a pre-commit check from tripping over generated files; see [[Atomic Commit]] and [[Git Hook]].

## See also
- [[Commit]]
- [[Shallow Clone]]
- [[Line Ending]]
