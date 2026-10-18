---
aliases:
  - NTP
  - Clock synchronization
  - Precision Time Protocol
  - PTP
  - Leap second
  - Clock drift
tags:
  - networks
summary: The protocol that keeps computer clocks within milliseconds of true time by exchanging timestamps with a hierarchy of servers and correcting for network delay.
---
The **Network Time Protocol** (NTP) keeps computer clocks in agreement with true time across a network. Every computer's clock drifts, since a cheap quartz crystal can gain or lose several seconds a day. NTP corrects that drift continuously by comparing the local clock with time servers. David Mills designed it in 1985.

Servers form a hierarchy of **strata**:

- **Stratum 0** is a reference clock, such as an atomic clock or a GPS receiver.
- **Stratum 1** servers are attached directly to one.
- **Stratum 2** servers sync from stratum 1, and so on, with each level slightly less accurate.

A client sends a request and notes four timestamps: when it sent, when the server received, when the server replied, and when the reply arrived. From these it calculates both the round-trip delay and its clock's offset. The calculation assumes the trip out and the trip back take equal time, so asymmetric routes produce errors. NTP polls several servers, discards outliers, and filters out [[Latency and Jitter]]. Over the internet it typically achieves accuracy within tens of milliseconds, and on a local network often well under one millisecond. It runs as a [[Daemon]] over [[TCP and UDP|UDP]] port 123, often as `chronyd` or [[Systemd]]'s `timesyncd` on Linux.

Correcting a clock is delicate. Jumping it backward makes timestamps repeat. So NTP usually *slews* the clock, running it slightly fast or slow until the offset disappears, and only steps it for large errors. Programs measuring durations should use a monotonic clock, which never jumps, instead of wall-clock time.

**Leap seconds** have caused the most trouble. Earth's rotation is irregular, so an extra second was occasionally inserted at the end of a day, giving a minute 61 seconds. The leap second of 30 June 2012 triggered a Linux kernel bug that sent many servers into high CPU use, taking down several large websites. Some operators now *smear* it over a whole day. In 2022 the world's measurement authorities voted to stop adding leap seconds by 2035.

Where milliseconds aren't enough, the **Precision Time Protocol** (PTP) reaches sub-microsecond accuracy on local networks by timestamping packets in network hardware.

Correct time matters in more places than expected:

- **Security.** [[Transport Layer Security]] rejects certificates whose validity window doesn't include the current time, so a badly wrong clock breaks every HTTPS connection.
- **Distributed systems.** Leases and [[Leader Election]] assume clocks drift only within known bounds. Where ordering matters more than wall time, a [[Logical Clock]] avoids depending on synchronized clocks at all.
- **Abuse.** Older NTP servers answered a small status query with a large list, which made them a popular tool for [[Denial-of-Service Attack]] amplification. Network Time Security (2020) adds authentication to NTP.

## See also
- [[Monotonic Clock]]
- [[Timeout]]
- [[Real-Time Clock]]
- [[Falsehoods Programmers Believe]]
- [[Patriot Missile Failure]]
- [[Time Dilation]]
- [[Piezoelectric Effect]]
