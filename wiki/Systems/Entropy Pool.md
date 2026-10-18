---
aliases:
  - /dev/urandom
  - getrandom
  - Hardware random number generator
  - RDRAND
  - Kernel random number generator
tags:
  - systems
summary: How an operating system gathers unpredictable timing noise from hardware and turns it into the random numbers cryptography depends on, and the failures, from early boot to cloned machines, when it doesn't have enough.
---
An **entropy pool** is where an operating system collects unpredictable data from hardware and turns it into random numbers for cryptography. Computers are deterministic machines, which is what makes them reliable and also what makes them bad at producing surprises; see [[Determinism]]. Yet every encryption key, session token, and password reset link depends on numbers an attacker cannot guess; see [[Public-Key Cryptography]].

The kernel gathers small amounts of genuine unpredictability from events whose exact timing depends on the physical world: the nanosecond timing of keystrokes, mouse movement, disk operations, network packets, and [[Interrupt]]s, plus jitter in the processor's own execution. Each event contributes only a few unpredictable bits, which are mixed together using a cryptographic [[Hash Function]]. Once enough have accumulated, the pool seeds a cryptographically secure generator that can then produce unlimited output; see [[Pseudorandom Number Generator]].

"Entropy" here is the information-theory sense, a measure of how much an attacker doesn't know; see [[Entropy]].

Programs on Unix systems read the output through special files, /dev/random and /dev/urandom, or the getrandom [[System Call]] added to Linux in 2014; see [[Device File]]. For years, /dev/random blocked whenever the kernel estimated the pool was running low, and a long argument ran over which to use. Cryptographers eventually agreed that once properly seeded, a good generator doesn't run out. Linux stopped blocking in 2020 and rewrote the subsystem in 2022 around modern hash functions.

The real danger is the moment before seeding. Failures:

- **Early boot.** A freshly booted device with no keyboard, no disk activity, and identical firmware has seen almost nothing unpredictable; see [[Boot Process]]. A 2012 survey of keys on the internet found thousands of routers and embedded devices that had generated keys at first boot with near-identical randomness, enough to break many of them by finding shared factors.
- **Cloned machines.** Copying a virtual machine copies its pool, so two clones can produce the same "random" numbers until fresh noise diverges them; see [[Hypervisor]].
- **Human edits.** In 2008, Debian discovered that a well-meant change two years earlier had removed most of OpenSSL's seeding, leaving the process ID as the only variable. Every key generated on affected systems came from about 32,000 possibilities.

Hardware generators help. Modern processors include instructions such as Intel's RDRAND, drawing on electrical noise in the chip, and a [[Trusted Platform Module]] has its own generator. After revelations that a standardized generator had likely been backdoored, kernel developers chose to mix hardware output into the pool rather than trust any single source.

Some organizations make the physics visible. A wall of lava lamps in Cloudflare's San Francisco lobby is filmed continuously, and the camera's images feed its randomness, a playful reminder that unpredictability has to come from somewhere outside the code.

## See also
- [[Secret Management]]
- [[Seeded Randomness]]
