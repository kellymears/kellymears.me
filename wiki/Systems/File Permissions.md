---
aliases:
  - Unix permissions
  - chmod
  - setuid
  - Permission bits
  - Access control list
  - Umask
tags:
  - systems
summary: The Unix scheme of read, write, and execute rights for a file's owner, group, and everyone else, and the extensions that patch its gaps.
---
**File permissions** control who can do what with each file on a Unix-like system. Every file has an owner and a group, and nine permission bits grant three rights to three classes of user:

- **Read (r)**, **write (w)**, and **execute (x)**.
- For the **owner**, members of the file's **group**, and **others**, meaning everyone else.

`ls -l` shows these as a string like `rwxr-x---`: the owner can read, write, and execute; the group can read and execute; others have no access. They're often written in octal, with read as 4, write as 2, and execute as 1, so `chmod 750` sets that same pattern and `chmod 644` gives a typical document, readable by all and writable by the owner. The bits are stored in each file's [[Inode]].

For **directories**, the bits mean something different. Read lets you list the names inside, write lets you create, delete, and rename entries, and execute lets you pass through the directory to reach things inside it. Because deleting a file is a change to its directory, a user who can write to a directory can delete files in it even without permission on the files themselves. The *sticky bit* on shared directories like `/tmp` closes that gap by letting only a file's owner delete it.

Two special bits change who a program runs as. **Setuid** on an executable makes it run with the file owner's privileges instead of the caller's. `passwd` is owned by root and setuid so ordinary users can update the password file. Setuid programs owned by root are a classic attack target, since any bug in one can hand an attacker full control, so modern systems keep them few. **Setgid** does the same for the group, and on directories makes new files inherit the directory's group.

The *umask* sets which permissions new files lack by default; 022 keeps them unwritable by group and others.

The basic model has well-known limits. It allows one owner and one group per file. **Access control lists (ACLs)** extend it with per-user and per-group entries. The *root* user bypasses permissions entirely, which [[Least Privilege]] designs counter by splitting root's power into finer *capabilities* and adding mandatory controls such as SELinux and AppArmor, which restrict even root.

Permissions cause everyday errors. A private SSH key readable by others is refused by [[Secure Shell]] as a safety measure, a script without the execute bit won't run directly, and files created inside a container as root may be unwritable by the host user, a common snag with Docker volumes. [[Secret Management]] files and configuration in [[Dotfiles]] usually need tight modes such as 600. Every permission check is performed by the [[Kernel]] when a program opens a file through a [[System Call]], which is what makes the scheme enforceable.

## See also
- [[Filesystem]]
- [[Inode]]
- [[Device File]]
- [[Kernel]]
- [[Superuser]]
