---
aliases:
  - Log rotation
  - Logrotate
tags:
  - systems
summary: The Unix convention, dating from the 1980s, for programs to hand log messages to a central service with a severity and a source, and the rotation that keeps those logs from filling the disk.
---
**Syslog** is the standard Unix mechanism for collecting log messages. Instead of every program managing its own log files, programs send messages to a central logging daemon, which decides where each goes: a file, the console, or another machine over the network; see [[Daemon]]. Eric Allman created it in the 1980s as part of the Sendmail mail server, and other programs adopted it until it became the default; see [[Simple Mail Transfer Protocol]].

Each message carries two labels besides its text:

- **Facility.** The kind of program that sent it, such as kern for the kernel, mail, auth for security events, cron for scheduled jobs, or local0 to local7 for anything else; see [[Kernel]] and [[Cron]].
- **Severity.** One of eight levels, from 0, emergency, meaning the system is unusable, through alert, critical, error, warning, notice, and informational, to 7, debug.

Rules in the daemon's configuration route messages by these labels, for instance sending all authentication messages to one file and anything critical to every logged-in terminal. The format was documented after the fact and varied between implementations; a stricter version was standardized in 2009 as RFC 5424; see [[Request for Comments]]. Over a network, messages traditionally travel over UDP to port 514, fast but with no guarantee they arrive; see [[TCP and UDP]].

On many Linux systems the systemd journal now collects messages first, storing them in a structured, indexed format and passing them on to a syslog daemon when one is installed; see [[Systemd]].

Logs grow without limit unless something stops them, and a disk filled by logs is a classic cause of outages. **Log rotation** handles this. On a schedule or when a file reaches a size limit, a tool such as logrotate renames the current log, compresses older ones, and deletes the oldest beyond a set count. The writing program must then switch to a fresh file, usually told to by a signal that makes it reopen its logs; see [[Unix Signal]].

Rotation also enforces a decision about how long to keep records. Logs often contain IP addresses, usernames, and other personal information, so keeping them forever is a liability as well as a cost; see [[Data Retention]] and [[Personal Data]]. Security logs have the opposite problem: an attacker who gains access will try to erase traces, so important logs are shipped off the machine as they're written; see [[Audit Log]].

Syslog's plain lines of text were made for people reading files with standard tools. Modern practice favors structured records, with fields a machine can query, collected centrally across many servers; see [[Logging]] and [[Observability]].

## See also
- [[Incident Response]]
- [[Unix]]
