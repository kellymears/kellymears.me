---
aliases:
  - Root user
  - Sudo
  - Privilege escalation
  - Administrator account
tags:
  - systems
summary: The all-powerful root account on Unix systems, how sudo hands out its power temporarily, and why both attackers and good security design revolve around who gets it.
---
The **superuser** is the account with unrestricted control over a computer. On Unix and Linux it's called **root** and has user ID 0. The kernel skips nearly all permission checks for it: root can read any file, kill any [[Process]], load kernel modules, change other users' passwords, and bind to network ports below 1024, which the system reserves for privileged services; see [[Port]]. Windows has an equivalent in its Administrator and SYSTEM accounts.

That power makes root dangerous to use routinely. A typo in a command run as root can erase the system, and any program running as root that gets compromised hands an attacker everything. So the standard practice is to work as an ordinary user and borrow root only when needed, the principle of [[Least Privilege]].

**Sudo**, short for "superuser do," is the usual way to borrow it. Prefixing a command with `sudo` runs it as root after you confirm your own password, if the system's sudoers file allows you to. Sudo can grant narrow permissions, letting a user restart one service but nothing else, and it logs what was run, leaving an audit trail that a shared root password wouldn't.

Over time, root's single all-or-nothing power has been split up:

- **Linux capabilities** divide root's privileges into about forty pieces, such as binding low ports or changing file ownership, so a program can hold only the one it needs.
- **Setuid programs** run with their owner's rights; `passwd` is setuid root so users can update the protected password file. Each one is a risk, since a bug in it is a path to root; see [[File Permissions]].
- **[[Linux Namespaces]]** let a container have its own "root" that has no power outside it, and rootless containers avoid real root entirely; see [[Containerization]]. A [[Chroot]] was an earlier, weaker form of isolation.
- **Mandatory access control** systems such as SELinux and AppArmor restrict even root, confining each service to the files and actions its policy allows.

**Privilege escalation** is the attacker's step of turning limited access into root. It usually exploits a bug in something already privileged: the kernel, a setuid program, a misconfigured sudo rule, or a root service with a [[Memory Safety]] flaw. Escalation bugs are among the most prized in security research and a standard goal of [[Penetration Testing]].

Remote access adds its own rules. Most systems forbid logging in as root directly over [[Secure Shell]], requiring a named user who then uses sudo, so every action is traceable to a person.

The same concern now applies to automated tools and AI agents: running them with full privileges is convenient and risky, which is why they are increasingly confined; see [[Agent Sandbox]].

## See also
- [[Mandatory Access Control]]
- [[Resource Limit]]
- [[Rootkit]]
- [[Linux Capabilities]]
