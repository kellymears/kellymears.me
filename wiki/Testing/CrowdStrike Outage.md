---
aliases:
  - 2024 CrowdStrike outage
  - Channel File 291
tags:
  - testing
summary: The July 2024 incident in which a faulty content update for a security product crashed about 8.5 million Windows computers at once, because configuration data shipped everywhere without the staged rollout given to code.
---
The **CrowdStrike outage** began on 19 July 2024, when the security company CrowdStrike pushed a faulty update to its Falcon sensor, software that runs on Windows computers to detect attacks. Machines that received it crashed to a blue screen, and many crashed again every time they restarted. Microsoft estimated that about 8.5 million Windows devices were affected, under one percent of the total, but they were concentrated in businesses: airlines canceled thousands of flights, hospitals postponed procedures, and banks, broadcasters, and emergency call centers lost systems; see [[Kernel Panic]].

The update was not a new version of the program. It was a content file, called Channel File 291, giving the sensor new patterns to look for. CrowdStrike shipped such files several times a day to respond quickly to new attacks, and treated them as data rather than code, so they skipped the staged rollout used for sensor releases; see [[Feature Flag]] and [[Progressive Delivery]].

The defect was a mismatch between two components. A template type added months earlier defined 21 input fields, but the sensor code that evaluated it supplied only 20. Earlier content files matched anything in the 21st field, so it was never read. Channel File 291 gave that field a specific value, and when the sensor went to read it, it read past the end of an array; see [[Memory Safety]] and [[Contract Testing]]. A validator meant to catch bad content files had its own bug and passed this one.

Because the sensor runs inside the Windows kernel, where it can see and block attacks most effectively, the bad read crashed the whole operating system rather than one program; see [[Kernel]]. CrowdStrike reverted the file 78 minutes after release, but machines that had already crashed couldn't download the fix. Each had to be booted into safe mode or a recovery environment and the file deleted, often by someone standing at the machine. Machines with disk encryption also needed their recovery keys, which were sometimes stored on servers that had themselves crashed; see [[Full-Disk Encryption]] and [[Mean Time to Recovery]].

The fixes CrowdStrike announced read like a testing checklist:

- **Stage content too.** Release updates to a small group first, watch for crashes, and let customers choose when to receive them; see [[Canary Release]].
- **Check the interface.** Confirm at runtime that a template's inputs match what the sensor provides, and add bounds checks; see [[Defensive Programming]].
- **Test with varied content.** Cover every field, including specific values where earlier files used wildcards; see [[Fuzzing]].

Microsoft and security vendors afterward began discussing ways to run such products outside the kernel, as Apple had already pushed vendors to do on macOS; see [[Least Privilege]]. Mac and Linux machines running Falcon were not affected by this file.

## See also
- [[Common-Mode Failure]]
- [[Facebook Outage of 2021]]
- [[Single Point of Failure]]
