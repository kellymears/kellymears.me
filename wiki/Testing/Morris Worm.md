---
aliases:
  - Internet worm of 1988
  - Great Worm
tags:
  - testing
summary: The 1988 program that spread across the early internet through a buffer overflow, a debug backdoor, and weak passwords, and crippled thousands of machines because a bug made it reinfect them far too often.
---
The **Morris worm** was one of the first programs to spread across the internet on its own, and the first to get wide public attention. It was released on 2 November 1988 by Robert Tappan Morris, a graduate student at Cornell, who launched it from a machine at MIT. Within a day it had slowed or stopped a large share of the computers on the network, which then connected mostly universities, laboratories, and military sites.

It targeted computers running versions of [[Unix]] and used several ways in:

- **A buffer overflow** in the finger service, which read a request into a fixed-size buffer without checking its length; see [[Buffer overflow]].
- **A debug mode** left enabled in the sendmail mail server, which let a remote sender run commands.
- **Weak passwords.** It guessed passwords using account names and a built-in list of a few hundred common words; see [[Password hashing]].
- **Trust between machines,** which let it hop to hosts that accepted logins from already compromised ones without a password; see [[Least Privilege]].

Morris later said he intended it to measure the size of the internet, not to cause harm. The damage came from a bug in its spreading logic. To stop administrators from protecting machines by faking an "already infected" answer, the worm reinfected anyway about one time in seven, regardless of the answer. On a network that small and that well connected, that rate was far too high. Machines filled with copies of the worm until they could do nothing else; see [[Basic reproduction number]] and [[Epidemic protocol]].

Administrators across the country worked through the night to analyze the code, sharing findings on mailing lists while some cut their sites off the network; see [[Incident Response]]. Estimates of how many machines were infected are rough, commonly around six thousand.

Morris became the first person convicted under the 1986 Computer Fraud and Abuse Act, receiving probation, community service, and a fine. In response to the outbreak, the US Defense Advanced Research Projects Agency funded the CERT Coordination Center at Carnegie Mellon University to coordinate responses to future attacks.

Several lessons have held up:

- **Unchecked input is an attack surface.** The finger bug was the kind of memory error later [[Fuzzing]] would find by the thousand, a technique that began as a university class project that same autumn.
- **Debug features ship.** A convenience left on in production is a door; see [[Threat Modeling]].
- **A monoculture spreads failure.** Many sites ran the same software with the same flaws, so one exploit worked almost everywhere.
- **A program's effect on a network can't be tested on one machine.** The reinfection rate seemed harmless in isolation.

## See also
- [[Honeypot]]
- [[Penetration Testing]]
