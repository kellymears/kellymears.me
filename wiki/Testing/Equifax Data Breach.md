---
aliases:
  - Equifax breach
  - Apache Struts
tags:
  - testing
summary: The 2017 theft of personal data on about 147 million people from a US credit reporting agency, through a web framework flaw that had a public patch for two months before the attack began.
---
The **Equifax data breach** was one of the largest thefts of personal information in history. Equifax, one of the three major credit reporting agencies in the United States, announced in September 2017 that attackers had taken names, Social Security numbers, birth dates, addresses and, in some cases, driver's license and credit card numbers. The final count was about 147 million people, roughly half the US population, plus people in Britain and Canada; see [[Data Breach]].

The way in was a known flaw. Apache Struts, a widely used open-source framework for building Java web applications, had a serious vulnerability disclosed in March 2017 that let an attacker run commands on a server by sending a crafted request. A fix was published the same day, and attacks against it began within days. Equifax ran Struts on an online portal consumers used to dispute their credit reports. The portal wasn't patched; see [[Patch Tuesday]].

Equifax's security team had circulated a notice to patch, and a scan was run to find vulnerable systems. The scan didn't find the dispute portal. Attackers got in around mid-May and stayed for about eleven weeks, moving from the portal to databases. They found a file of unencrypted usernames and passwords that let them reach further systems.

A second failure kept the intrusion hidden. Equifax inspected encrypted traffic leaving its network with a monitoring device, but the security certificate that device needed had expired months earlier, so it had been passing traffic without inspecting it. When the certificate was finally renewed in late July, the suspicious traffic showed up almost immediately; see [[Certificate Authority]] and [[Transport Layer Security]].

The pattern matters more than the specific flaw. Organizations rarely know every place a library runs, so a patch notice can't reach a system no one remembers; see [[Software Bill of Materials]]. Monitoring that silently stops working gives false comfort, which is why some teams test their alarms as well as their systems; see [[Synthetic Monitoring]]. And a breach of one perimeter shouldn't open everything behind it; see [[Threat Modeling]] and [[Penetration Testing]].

Equifax's chief executive and other senior leaders departed. In 2019 the company agreed to a settlement with US regulators and states worth up to about seven hundred million dollars. In 2020 the US Justice Department charged four members of China's military with carrying out the attack.

The breach sits in a line of open-source vulnerabilities whose effects depended on how many systems embedded the affected code; see [[Heartbleed]] and [[Log4Shell]]. It also shows how a breach report, from patch to scan to monitoring, can reveal several layers that each failed separately; see [[Root Cause Analysis]].

## See also
- [[Single Point of Failure]]
- [[Debian OpenSSL Bug]]
