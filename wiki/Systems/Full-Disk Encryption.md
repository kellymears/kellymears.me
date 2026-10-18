---
aliases:
  - Disk encryption
  - LUKS
  - Encryption at rest
  - Crypto-erase
tags:
  - systems
summary: Encrypting an entire storage device beneath the filesystem, so a lost or stolen machine reveals nothing, and what it does and doesn't protect against.
---
**Full-disk encryption** (FDE) encrypts everything on a storage device below the filesystem, so the drive holds only ciphertext and the operating system decrypts blocks as it reads them. Without the key, a lost laptop or a discarded drive is noise. It is the standard form of *encryption at rest*.

Each major platform has its own implementation. Linux uses dm-crypt with LUKS, the Linux Unified Key Setup, created by Clemens Fruhwirth in 2004. Windows has BitLocker, introduced with Vista in 2007, and macOS has FileVault 2, introduced in 2011. Phones now encrypt by default, which is a large part of why a locked phone is hard to search.

The design separates the user's secret from the key that actually encrypts the data:

- **A random master key** encrypts the disk, usually with AES in XTS mode, a mode built for encrypting storage sectors in place.
- **Key slots** each hold a copy of the master key, encrypted under a key derived from a passphrase, a recovery key, or a hardware token. The derivation uses a deliberately slow function, PBKDF2 or Argon2 in LUKS2, so guessing passphrases is expensive.
- **Changing a passphrase** rewrites one small key slot instead of re-encrypting the whole disk, and several people or devices can unlock the same volume.

The same separation enables **crypto-erase**: destroy the key slots and the data is unrecoverable instantly, which is far faster and more reliable than overwriting a [[Solid-State Drive]], whose internal remapping can leave copies behind.

Performance is rarely a concern now. Processors have had AES instructions since around 2010, so encryption costs a few percent at most on most workloads.

FDE's protection is narrow, and it helps to state it exactly. It protects data on a device that is **powered off**. Once the machine is unlocked and running, every program with file access sees plaintext, so FDE does nothing against malware, a compromised account, or a remote attacker; that is the work of [[File Permissions]], [[Least Privilege]], and [[Secret Management]]. Physical attacks on a running or sleeping machine also remain. A 2008 Princeton study showed that keys can be recovered from RAM chips for seconds or minutes after power loss, longer if the chips are chilled, the *cold boot attack*.

Unattended unlocking adds trade-offs. A Trusted Platform Module can release the key automatically if the [[Boot Process]] measures as unmodified, tied to Secure Boot and [[Code Signing]], so servers and laptops boot without a passphrase. That defends against someone removing the drive but less well against someone with the whole machine. Hardware self-encrypting drives looked attractive until 2018, when researchers found that several models' implementations could be bypassed completely, and operating systems stopped trusting them by default.

## See also
- [[Public-Key Cryptography]]
- [[Boot Process]]
- [[Secret Management]]
- [[Hash Function]]
- [[Trusted Platform Module]]
- [[Disk Partition]]
- [[Rowhammer]]
