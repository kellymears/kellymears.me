---
aliases:
  - TOCTOU
  - Symlink attack
tags:
  - systems
summary: A race where a program checks a condition and then acts on it, but the world changes in between, the root of classic file-permission exploits and of double-spending bugs in web applications.
---
A **time-of-check to time-of-use** bug, or TOCTOU, happens when a program checks that something is safe and then acts on it, but the thing changes in the gap between the two steps. The check was true when it ran and is false by the time it matters. It's a specific, often exploitable kind of [[Race Condition]].

The classic example is a privileged Unix program writing a file for a user. To avoid overwriting files the user couldn't otherwise touch, it first asks the system whether the user has permission, then opens the file; see [[File Permissions]] and [[Superuser]]. An attacker points the name at a harmless file during the check, then swaps it for a link to a sensitive system file before the open. The check passes on one file and the write lands on another; see [[Symbolic Link]]. The window may be microseconds, but attackers can retry thousands of times, or slow the system down to widen it.

Shared temporary directories were a long-running source of these **symlink attacks**. A program that created a temporary file with a predictable name could be tricked into writing through a link an attacker had planted there in advance. The fix is to create the file and check that it didn't already exist in a single step, which the system guarantees atomically, with randomized names.

The general rule is to make the check and the use one operation, or to check the thing actually used rather than its name:

- **Use the handle, not the name.** Open the file once, then inspect and use the resulting file descriptor. The name can be swapped; an open file can't.
- **Let the operation fail.** Instead of checking whether a file exists and then creating it, attempt the creation with a flag that fails if it exists.
- **Drop privileges first.** A program running as the user can just try the operation and let the kernel enforce permissions; see [[Least Privilege]].

The pattern goes well beyond files. Operating-system kernels have had "double fetch" bugs, where they read a value from a program's memory, validate it, then read it again to use it, while another thread changes it in between; see [[System Call]] and [[Kernel]]. Containers that inspect a path on the host before acting on it inside the container have had similar escapes; see [[Linux Namespaces]].

Web applications have the same bug with money. Code that checks a balance and then deducts from it can be hit by two simultaneous requests that both pass the check, spending the balance twice or redeeming a single-use coupon repeatedly. The fix is a conditional update or a transaction that checks and changes in one step; see [[Optimistic Locking]] and [[ACID]].

## See also
- [[Atomic File Write]]
- [[Code Signing]]
- [[Upsert]]
