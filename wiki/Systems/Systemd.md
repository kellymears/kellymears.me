---
aliases:
  - systemctl
  - journald
tags:
  - systems
summary: The dominant Linux init system, replacing sequential startup scripts with declarative, parallel, dependency-aware units.
---
**Systemd** is the [[Init System|init system]] used by most mainstream Linux distributions — Debian, Fedora, Arch, Ubuntu — since roughly the early 2010s. It replaced `sysvinit`'s numbered shell scripts with declarative unit files that describe what a service needs rather than the exact sequence to start it, letting the system start independent services in parallel and cutting boot times substantially.

A unit is a small text file — `.service` for a program, `.mount` for a filesystem, `.timer` for a scheduled trigger, `.socket` for something that starts on first connection — with an explicit `After=`/`Requires=` graph instead of a filename number. `systemctl status nginx` reads that graph and its live state; `journalctl -u nginx` reads its structured, binary-logged output rather than a scattered pile of text files under `/var/log`.

Systemd's scope is the recurring objection: it also absorbed device management (`udev`), network configuration, DNS resolution, login sessions, and time sync, well past what "init" traditionally meant. Proponents call this consistency — one dependency graph, one logging format, one tool — critics call it a monolith that violates the Unix preference for small composable tools. Both are describing the same design honestly.

Its most consequential feature for daily debugging is the systemd unit's **automatic restart** and **resource limits**: a service can be told to restart on failure, sandboxed with a private `/tmp`, or capped on memory, all as unit-file settings rather than code the service itself has to implement.

## See also
- [[Init System]]
- [[Daemon]]
- [[Control Groups]]
- [[Cron]]

## Related
- [[Containerization]]
