---
aliases:
  - OOM killer
  - OOM kill
  - Out of memory
  - systemd-oomd
  - earlyoom
tags:
  - systems
summary: The kernel's last resort when memory is exhausted, killing a process chosen by heuristic, and the userspace daemons that act earlier with better judgment.
---
The **out-of-memory killer** is the Linux kernel's last resort when it cannot satisfy a memory request even after reclaiming everything it can. Because [[Virtual Memory]] overcommits, the failure surfaces when a page is touched, long after the allocation that asked for it succeeded, so there is no error to return. The kernel picks a [[Process]] and kills it with `SIGKILL` to free its memory.

The victim is chosen by a *badness* score that is mostly the process's memory footprint (resident memory plus [[Swap]] plus page tables), adjusted by `oom_score_adj`, which ranges from −1000 (never kill) to +1000 (kill first). The largest process is often the right one to kill and sometimes is not: the database rather than the runaway script beside it, or a compositor whose death takes the whole desktop with it.

Several things make OOM kills hard to diagnose:

- **The victim leaves no message.** `SIGKILL` cannot be caught, so the process's own logs stop mid-sentence. The only record is the kernel log (`dmesg`, `journalctl -k`), which names the victim and lists the memory state at the time. This is a textbook [[Silent Failure]] from the victim's side.
- **The victim may not be the culprit.** The process that allocated last triggers the kill, while the largest one is killed. The leak and the casualty can be unrelated programs.
- **The kernel acts late.** It waits until reclaim has truly failed, which on a machine with swap can mean minutes of thrashing first.
- **Kills can cascade through service managers.** A supervisor may treat one member's OOM kill as the failure of its whole group and stop the rest, so a terminal with one runaway child process can take every sibling shell down with it. Whether a group survives a member's death is a policy setting, and the default may not be the one wanted.

Userspace OOM daemons (earlyoom, systemd-oomd) act earlier, using [[Pressure Stall Information]] or free-memory thresholds, and with policy: kill a whole [[Control Groups|cgroup]] rather than one process, protect the session, prefer the browser tab over the editor. A memory cgroup limit contains the problem further by triggering the killer inside the group before it reaches the rest of the machine. That is [[Fail Fast]] applied to memory: a prompt, scoped kill beats a slow collapse of everything.

## See also
- [[Dynamic Random-Access Memory]]
- [[Systemd]]
- [[Exit Status]]
