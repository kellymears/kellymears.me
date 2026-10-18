---
aliases:
  - OTA update
  - A/B updates
  - Seamless updates
tags:
  - delivery
summary: Delivering new software to phones, cars, and devices wirelessly, which turns shipped hardware into something that can be fixed after sale and demands designs that survive a failed install halfway through.
---
An **over-the-air update** (OTA) delivers new software to a device through its own wireless connection, without a cable or a visit to a service center. Phones popularized it, and it now reaches cars, routers, televisions, medical devices, and smart home gadgets; see [[Internet of Things]].

It changes what shipping means. Hardware that once left the factory with fixed software can now be patched, improved, or recalled after sale. Tesla made the point vivid for cars: in 2014 it addressed a safety recall over overheating charging plugs partly through a software update delivered overnight, while owners slept. The same ability lets a manufacturer remove features, change behavior owners relied on, or end support whenever it chooses.

The hard engineering problem is that an update can be interrupted at the worst moment, by a dead battery or a lost connection, and the device has no one standing next to it to fix things. A device that fails to boot afterward is "bricked"; see [[Firmware]]. The common designs:

- **A/B partitions.** The device keeps two copies of its system. The update is written to the inactive copy while the device keeps running, and a reboot switches over. If the new copy fails to start, the bootloader falls back to the old one. ChromeOS used this from the start, and Android adopted it as "seamless updates" in 2016; see [[Boot Process]] and [[Blue-Green Deployment]].
- **Boot counters.** The new system must confirm it is healthy within a few attempts, or it is rolled back automatically; see [[Watchdog Timer]] and [[Rollback]].
- **Delta updates.** Sending only the differences between versions, rather than the whole image, saves bandwidth on slow or metered connections; see [[Diff]].

Security is the other half. An update channel that reaches every device is the most valuable target an attacker could have, so updates are signed and the device refuses anything without a valid signature; see [[Code Signing]]. Devices also refuse to install older versions, which might reintroduce patched flaws. For cars, the Uptane framework, developed from 2016 by university and industry researchers, protects updates even if some of the manufacturer's servers are compromised; see [[Supply Chain Security]].

Fleets are updated gradually. A small fraction of devices gets the new version first, failure reports are watched, and the rollout widens or halts; see [[Progressive Delivery]]. The precaution matters more here than for servers, because a bad server release can be reverted in minutes, while a bad device update may have to be fixed one device at a time; see [[CrowdStrike Outage]].

Long life is the last problem. A car or thermostat may stay in use for fifteen years, far longer than its maker plans to write updates, and an unpatched connected device becomes a liability on every network it joins; see [[Long-Term Support]].

## See also
- [[Immutable Infrastructure]]
- [[Canary Release]]
- [[Backward Compatibility]]
