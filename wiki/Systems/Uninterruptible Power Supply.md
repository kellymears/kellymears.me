---
aliases:
  - UPS
  - Battery backup
tags:
  - systems
summary: A battery between the wall and the computer that rides out outages and sags long enough for generators to start or for the machine to shut down cleanly, in three designs that trade cost against protection.
---
**An uninterruptible power supply**, or **UPS**, sits between a power outlet and the equipment plugged into it and keeps power flowing from a battery when the supply falters. Its job is rarely to keep things running for long. A typical desktop unit lasts minutes, enough to ride out a flicker or to shut the computer down cleanly before the battery empties.

Clean shutdowns matter because a computer in the middle of writing can be left inconsistent. Journaling filesystems and atomic writes limit the damage, and some solid-state drives carry capacitors to finish pending writes, but a drive's volatile cache can still lose what it claimed was saved; see [[Journaling File System]], [[Atomic File Write]], and [[Capacitor]].

There are three main designs:

- **Standby**, or offline, units pass wall power straight through and switch to their battery-powered inverter when power fails. The switch takes a few milliseconds, usually short enough that a computer's power supply bridges it.
- **Line-interactive** units add a transformer that boosts or trims voltage during sags and surges without touching the battery, so brownouts that would otherwise drain it are handled cheaply; see [[Transformer]].
- **Online**, or double-conversion, units convert all incoming power to direct current and back again, all the time. There's no switchover, and the output is clean whatever comes in, at the cost of heat, noise, and price; see [[Alternating Current]].

Cheaper inverters approximate the smooth sine wave of mains power with steps. Some modern power supplies with active power factor correction misbehave on that stepped output, shutting down at exactly the moment the UPS takes over, so buyers are often told to look for pure sine wave output.

A UPS talks to the computer over USB or a network. A daemon watches the battery level and starts an orderly shutdown when the remaining runtime drops below a threshold, then can tell the UPS to cut power so the machine restarts when the mains return; see [[Universal Serial Bus]], [[Daemon]], and [[Init System]]. Shutdown sends programs a termination signal so they can save state first; see [[Unix Signal]].

Data centers use the same idea at building scale. Large battery banks or spinning flywheels carry the load for the seconds it takes diesel generators to start and take over.

Batteries are the part that wears out. Sealed lead-acid batteries typically last three to five years, and a UPS with a dead battery can fail the moment it is needed. Most units run periodic self-tests, and lithium batteries now appear in some models for longer life; see [[Lithium-Ion Battery]].

A UPS turns a sudden failure into a few minutes of warning, and the warning helps only if software acts on it. Hibernating instead of shutting down keeps open work; see [[Suspend and Hibernation]].

## See also
- [[Watchdog Timer]]
- [[Ohm's Law]]
- [[Wake-on-LAN]]
