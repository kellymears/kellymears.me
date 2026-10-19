---
aliases:
  - Kernel live patching
  - Hot patching
  - Ksplice
  - kpatch
  - Hot code loading
tags:
  - systems
summary: Replacing code in a running kernel or program without restarting it, so security fixes land on servers that cannot easily reboot, and the narrow conditions under which that is safe.
---
**Live patching** replaces code in a running kernel or program without restarting it. Its main use is applying security fixes to servers where a reboot is costly, such as a database holding hundreds of gigabytes in memory or a host running many customers' workloads.

The Linux story began with **Ksplice**, developed by MIT students in 2008 and acquired by Oracle in 2011. Red Hat and SUSE then built competing systems, kpatch and kGraft, and their common core was merged into the mainline kernel in 2015 as livepatch; see [[Kernel]].

The mechanism works one function at a time:

- **Building.** A patch module is compiled containing new versions of only the changed functions.
- **Redirecting.** When loaded, the kernel plants a hook at the start of each old function that jumps to its replacement. The old code stays in memory, but nothing new enters it.
- **Transitioning.** A task in the middle of an old function must not suddenly continue in new code that expects different state. The kernel moves each task to the patched world only when it is not running any affected function, which it checks by examining that task's [[Call Stack]].

The hard limit is data. Swapping a function is straightforward; changing the layout of a structure that thousands of live objects already use is not, since existing objects would need converting in place. Patches that change data structures need extra hand-written code or can't be done live at all. Live patches are therefore treated as a bridge: they close an urgent hole now, and the machine still reboots into a properly updated kernel at the next maintenance window. Long [[uptime]] isn't a virtue in itself.

Because a live patch is code injected into the most privileged part of the system, it must be trusted. Kernels that enforce module signing require patches signed like any other module; see [[Code Signing]].

The idea is older and broader than kernels:

- **Erlang** was designed at Ericsson in the 1980s for telephone switches that could never stop, so hot code loading is built into the language, with two versions of a module allowed to run side by side during a switchover.
- **Windows** offers hotpatching for some server and enterprise editions, installing most monthly security updates without a restart.
- **Processors** receive fixes to their internal [[Microcode]] while running, often loaded early at boot by the operating system.
- **Web development** swaps changed modules into a running page while preserving its state, a convenience version of the same trick; see [[Hot Module Replacement]].

The alternative strategy avoids patching in place altogether: run several copies, and replace them one at a time with fresh, fully updated ones while traffic shifts away; see [[Rolling Deployment]] and [[Blue-Green Deployment]]. Live patching matters most for machines that are hard to replace.

## See also
- [[Hotfix]]
- [[Maintenance Window]]
