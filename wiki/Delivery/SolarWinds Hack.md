---
aliases:
  - Sunburst
  - SolarWinds Orion
tags:
  - delivery
summary: The 2020 supply chain attack in which intruders altered SolarWinds' build process so that its signed software updates carried a backdoor to about 18,000 customers, including US government agencies.
---
The **SolarWinds hack** was a supply chain attack disclosed in December 2020, in which intruders compromised the build system of SolarWinds, a company whose Orion software monitors corporate and government networks. Orion updates released between March and June 2020 carried a backdoor, later named Sunburst. SolarWinds estimated that fewer than 18,000 customers installed them. The US government attributed the operation to Russia's foreign intelligence service, and Microsoft's president called it the largest and most sophisticated attack the world had ever seen.

The attack's distinction was where it struck. The attackers did not alter the source code in the repository, which looked clean to anyone reviewing it. Instead, a separate program on the build server watched for Orion being compiled, swapped in a modified source file during the build, and put the original back afterward. The resulting software was signed with SolarWinds' own certificate and shipped through its normal update channel, so customers had every reason to trust it; see [[Build System]] and [[Code Signing]].

Sunburst was built to avoid notice:

- **Patience.** It stayed dormant for about two weeks after installation before doing anything.
- **Camouflage.** Its network traffic imitated Orion's own legitimate communication, and it checked for security tools before acting.
- **Selectivity.** Most infected organizations were never exploited further. The attackers chose a much smaller group, reportedly around a hundred companies and a number of federal agencies, including parts of the Treasury and Commerce departments, for deeper intrusion.

Orion needed broad administrative access to the networks it monitored, which made it an ideal place to stand; see [[Least Privilege]]. The breach was discovered not by any of the government agencies affected but by the security firm FireEye, which found the intruders while investigating the theft of its own penetration testing tools; see [[Penetration Testing]].

The response shaped how software supply chains are discussed:

- **Software bills of materials.** A 2021 US executive order on cybersecurity called for software sold to the federal government to come with a list of its components; see [[Software Bill of Materials]].
- **Build integrity.** Frameworks for recording how an artifact was built, and on what machine from what source, gained attention, along with builds that independent parties can repeat and compare; see [[Reproducible Build]].
- **Trusted updates as attack surface.** Automatic updates are a security practice, and SolarWinds showed they are also the most direct route into every customer at once; see [[Automated Dependency Updates]].

The lesson is that signing proves who shipped an artifact, not that the artifact is what its makers intended. Verifying the second requires evidence about the build itself; see [[Threat Modeling]].

## See also
- [[Supply Chain Security]]
- [[XZ Utils Backdoor]]
- [[Artifact Repository]]
- [[Build Provenance]]
- [[Rootkit]]
