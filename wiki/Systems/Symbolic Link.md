---
aliases:
  - Symlink
tags:
  - systems
summary: A file that points at another path, resolved transparently by most operations.
---
A **symbolic link** is a file whose content is a path; opening it transparently opens the target. It differs from a *hard* link, which is a second directory entry for the same underlying file — a symlink can point at something that does not exist, and can cross filesystems.

Symlinks are the standard mechanism for making one canonical copy of a file appear where a tool insists on finding it, which is what makes a [[Dotfiles]] repository practical for tools that ignore configuration-directory conventions.

They break in specific ways worth knowing. A **relative** symlink resolves against its own directory, so moving the link changes what it points at. A **broken** link — target moved or deleted — often surfaces as a confusing "file not found" for a file that visibly exists. And tools differ on whether they follow links: some copy the link, some copy the target, some refuse.

Version control treats a symlink as a file containing a path, which means committing one commits the *path*, not the content. That is usually what you want in a configuration repository and is a trap if the intent was to track the file.

Careless linking of a home directory's important files is a genuinely destructive operation, which is the argument for a script that is reviewable and idempotent rather than a sequence of ad-hoc commands.

## See also
- [[Dotfiles]]
- [[XDG Base Directory Specification]]
- [[Idempotence]]

## Related
- [[Environment Variable]]
- [[Shell]]
