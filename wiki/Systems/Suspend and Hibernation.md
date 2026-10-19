---
aliases:
  - Suspend
  - Hibernation
  - Sleep mode
  - ACPI
tags:
  - systems
summary: The power states that let a computer pause instead of shutting down, keeping memory powered for a fast resume or saving it to disk for a resume with no power at all, and a recurring source of laptop bugs.
---
**Suspend** and **hibernation** let a computer stop working without shutting down, so it can pick up exactly where it left off. Both preserve the contents of memory, with every open program and document, but in different places.

The power states are defined by ACPI, a standard from 1996 that lets the operating system, rather than the firmware, manage power; see [[Firmware]]:

- **Suspend to RAM** (sleep, standby) powers down nearly everything except memory, which is kept in a low-power refresh mode. Resuming takes a second or two, and the machine draws little power, though it still drains the battery over days.
- **Hibernation** writes the contents of memory to disk, usually into the swap area, then powers off completely. Resume reads the image back, which is slower but needs no power in between; see [[Swap]].
- **Hybrid sleep** does both, so a dead battery during sleep falls back to the hibernation image.

Since the late 2010s, many laptops have replaced traditional suspend with a phone-like mode where the processor drops into its deepest idle state while the system stays technically on, ready to fetch messages. When something keeps it from fully idling, the result is the familiar laptop that drains its battery or heats up inside a bag; see [[Lithium-Ion Battery]] and [[Thermal Throttling]].

Resume is where things break. Every device driver must save its hardware's state before sleep and restore it after, and a single faulty driver can leave a black screen, missing Wi-Fi, or a dead touchpad; see [[Kernel]]. Bugs in suspend and resume are among the most persistent complaints about Linux on laptops.

Sleep also confuses software about time. While suspended, the processor isn't counting, so timers measured in elapsed running time can disagree with the wall clock after resume. Linux offers one clock that excludes suspended time and one that includes it, and choosing wrong produces timeouts that fire hours late or instantly; see [[Monotonic Clock]] and [[Timeout]]. Network connections often die during a long sleep, and programs need to notice and reconnect.

Something has to wake the machine: the lid opening, a key press, a network packet, or a scheduled alarm from the hardware clock; see [[Real-Time Clock]] and [[Interrupt]]. On Linux, systemd decides what closing the lid or pressing the power button means; see [[Systemd]].

Both states raise security questions. A suspended machine keeps its memory, including encryption keys, so someone with physical access may be able to extract them. A hibernation image on disk holds the same secrets, so it must be encrypted too; see [[Full-Disk Encryption]]. Some secure-boot configurations disable hibernation entirely, since an image could be tampered with before resume; see [[Boot Process]].

## See also
- [[Dynamic Voltage and Frequency Scaling]]
- [[Uninterruptible Power Supply]]
- [[Dynamic Random-Access Memory]]
