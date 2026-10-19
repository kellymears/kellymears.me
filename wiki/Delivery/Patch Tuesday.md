---
aliases:
  - Exploit Wednesday
tags:
  - delivery
summary: Microsoft's practice, since 2003, of releasing security updates on the second Tuesday of each month, which lets administrators plan patching and lets attackers plan to reverse-engineer the fixes.
---
**Patch Tuesday** is the second Tuesday of each month, when Microsoft releases its security updates for Windows and its other products. The company adopted the schedule in October 2003. Before that, it released patches whenever they were ready, which meant system administrators could be asked to test and install an urgent fix on any day of the week, often several times in a month.

A fixed date turned patching into a routine. Administrators can set aside time to read the advisories, test the updates against their own systems, and roll them out in stages, first to a few machines and then to the rest; see [[Staging Environment]] and [[Progressive Delivery]]. Tuesday was chosen to leave the rest of the working week to deal with problems, and the date is fixed in advance so organizations can schedule maintenance windows around it; see [[Release Train]].

The schedule spread. Adobe and SAP release on the same day, Oracle publishes quarterly patch bundles, and Android publishes a monthly security bulletin. Predictable timing has become the norm for large vendors.

The drawback is often called **Exploit Wednesday**. A patch shows exactly what changed, so attackers compare patched and unpatched files to locate the flaw being fixed and write an attack for it, then use it against everyone who hasn't installed the update yet; see [[Diff]]. The technique is called patch diffing, and tools exist to automate it. A fixed release date tells attackers when to start. The gap between a patch's release and its installation is often the most dangerous period in a flaw's life. The WannaCry ransomware outbreak of May 2017 spread through a Windows flaw that Microsoft had patched two months earlier, on systems that hadn't applied the fix.

The schedule also bends when it must:

- **Out-of-band releases.** When a flaw is already being exploited, Microsoft ships a fix immediately rather than waiting; see [[Hotfix]].
- **Deferral.** Organizations can delay updates by days or weeks to test them, accepting a longer exposure in exchange for fewer broken systems.
- **Old versions.** Products past their support end get no updates, which is why unsupported systems are a lasting risk; see [[Long-Term Support]].

Patch Tuesday reflects a basic trade-off in delivering fixes. Batching updates on a schedule makes them easier to absorb and test, while shipping each fix as soon as it is ready shortens exposure. Many organizations' internal approval processes add another layer, sometimes delaying security patches for weeks; see [[Change Advisory Board]]. Continuous delivery argues for small, frequent releases, but customers who must test every update on their own systems often prefer a predictable rhythm.

## See also
- [[Automated Dependency Updates]]
- [[Rollback]]
- [[Heartbleed]]
- [[Equifax Data Breach]]
- [[Computer Virus]]
- [[Ransomware]]
