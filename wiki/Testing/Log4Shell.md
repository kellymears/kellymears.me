---
aliases:
  - Log4j vulnerability
  - CVE-2021-44228
tags:
  - testing
summary: A 2021 vulnerability in the Java logging library Log4j that let anyone run code on a server by getting it to log a short string, made worse because the library was buried in countless products and maintained by a few volunteers.
---
**Log4Shell** is a vulnerability disclosed in December 2021 in Log4j 2, a widely used logging library for Java maintained by the Apache Software Foundation. It let an attacker run their own code on a server simply by getting it to write a crafted string to its logs, and it received the highest possible severity score. It was found by a security researcher at Alibaba Cloud, who reported it privately to the Apache project in late November. Exploit code circulated publicly on 9 December, before most users could patch.

The flaw was in a feature, not a slip. Log4j supported **lookups**, placeholders in a message that it would replace with a value at logging time, such as an environment variable. One kind of lookup used the Java Naming and Directory Interface, which could fetch an object from a remote directory server. If a logged message contained a string pointing at an attacker's server, Log4j would contact that server, receive a reference to a Java class, and load and run it; see [[Injection attack]] and [[Deserialization]].

Logging untrusted input is normal practice. Servers routinely log user names, request headers, and chat messages, so the attacker only had to put the string anywhere a server might record it. The first public exploits appeared in chat on Minecraft servers. Within days, attackers were scanning the whole internet, sending the string in browser identification headers; see [[Logging]] and [[Taint analysis]].

The harder problem was finding it. Log4j was rarely a direct choice; it arrived as a dependency of a dependency inside frameworks, appliances, and commercial products, so many organizations did not know whether they used it; see [[Transitive dependency]] and [[Software Bill of Materials]]. Fixes shipped in a rapid series, as the first patches proved incomplete and related bugs turned up, and teams with good [[Automated Dependency Updates]] and test suites moved fastest. A US government review the following year concluded that vulnerable copies would remain in use for a decade or more.

The project was maintained by a handful of volunteers, which drew attention to how much of the world's software rests on unpaid work; see [[Maintainer burnout]] and [[Tragedy of the Commons]]. The same had been said of OpenSSL after [[Heartbleed]].

The lessons:

- **Features are attack surface.** A rarely needed capability, added years earlier and enabled by default, was the whole problem; see [[Attack surface]] and [[Feature Creep]].
- **Input stays untrusted wherever it travels,** including into logs.
- **Limit what servers can reach.** Systems that could not open outbound connections were far harder to exploit; see [[Least Privilege]].
- **Know what you ship.** You cannot patch what you cannot find.

## See also
- [[Equifax Data Breach]]
- [[Incident Response]]
