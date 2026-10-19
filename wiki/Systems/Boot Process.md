---
aliases:
  - Bootloader
  - UEFI
  - BIOS
  - initramfs
  - Secure Boot
  - Booting
tags:
  - systems
summary: The chain of handoffs from power button to login screen, firmware to bootloader to kernel to init, and where each link can break or be verified.
---
The **boot process** is the sequence of handoffs that takes a computer from power-on to a running operating system. Each stage is small enough to fit where the previous one can find it, and its only job is to load and start something larger. The word comes from "pulling yourself up by your bootstraps", since a computer must load the very software that knows how to load software.

On a modern PC the chain runs roughly like this:

1. **Firmware.** Power-on starts code stored on a chip on the motherboard. It runs a power-on self-test, initializes memory and devices, and loads any CPU [[Microcode]] update. The original IBM PC used **BIOS** from 1981; nearly all machines now use **UEFI**, standardized in 2005, which understands partitions and filesystems and can run programs from an EFI System Partition.
2. **Bootloader.** Firmware launches a bootloader such as GRUB, systemd-boot, or Limine. It offers a menu of kernels or operating systems, passes command-line options, and loads the chosen [[Kernel]] into memory. Some bootloaders also list [[Filesystem Snapshot]] entries, so a broken upgrade can be undone by booting an earlier snapshot.
3. **initramfs.** Alongside the kernel comes a small compressed filesystem loaded into memory. It contains just enough tools and drivers to find the real root filesystem, which might be encrypted, on RAID, or on a device needing a module the kernel does not have built in. Once the real root is mounted, the system switches to it.
4. **Init.** The kernel starts the first user-space process, PID 1, which on most Linux systems is [[Systemd]]. The [[Init System]] starts services in dependency order, mounting filesystems, bringing up the network, and finally launching a login prompt or display manager.

Every stage is a place to break. A corrupt bootloader configuration stops the machine before the kernel loads. A kernel upgrade without a matching initramfs, or a missing driver inside it, leaves the system unable to find its root disk and dropping into an emergency shell. A service that fails or hangs can stall boot entirely.

**Secure Boot**, part of UEFI, verifies each stage before running it. Firmware checks the bootloader's signature against trusted keys, the bootloader checks the kernel, and the kernel can require signed modules. It defends against bootkits that hide below the operating system, using the same [[Public-Key Cryptography]] as [[Code Signing]]. Linux distributions boot through a small Microsoft-signed shim, since most PCs ship trusting only Microsoft's keys. Out-of-tree drivers must then be signed with a key the user enrolls.

`systemd-analyze blame` lists how long each unit took, and the critical-chain view shows which waits actually delayed reaching the desktop. Once started, a machine can be guarded by a [[Watchdog Timer]] that reboots it if the system hangs.

## See also
- [[Over-the-Air Update]]
- [[MicroVM]]
- [[Assembly Language]]
- [[Disk Image]]
- [[Device Tree]]
- [[Rootkit]]
