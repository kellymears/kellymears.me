---
aliases:
  - TPM
  - Measured boot
  - Hardware security module
  - Remote attestation
tags:
  - systems
summary: A small security chip that holds keys a computer's software can use but never extract, records what booted, and releases secrets only when the machine is in a known state.
---
A **Trusted Platform Module** (TPM) is a small security processor built into most modern computers, either as a separate chip or as part of the main processor's firmware. It does a few things that ordinary software can't do safely: generate and hold cryptographic keys that never leave the chip, record what software booted, and release secrets only when that record matches what's expected.

Its main capabilities:

- **Protected keys.** The TPM can create a private key inside itself and use it for signing or decryption, but no command exists to export it. Malware running with full administrator rights can ask the TPM to use a key while it's running, but it can't copy the key to use elsewhere; see [[Public-Key Cryptography]].
- **Measured boot.** As the computer starts, each stage hashes the next before running it, firmware, then bootloader, then kernel, and sends the hash to the TPM, which folds it into special registers. Each register can only be *extended*, combined with a new hash, never set directly, so the final values form a chain summarizing everything that ran; see [[Hash Function]] and [[Boot Process]].
- **Sealing.** A secret can be sealed to particular register values, so the TPM releases it only if the machine booted the expected software.
- **Randomness.** A hardware random number generator, useful for keys; see [[Pseudorandom Number Generator]].

The best-known use is [[Full-Disk Encryption]]. BitLocker and LUKS can seal the disk key to the TPM, so a laptop boots without a password, yet if the drive is removed or the boot chain tampered with, the key stays locked. Without a PIN, this protects a stolen powered-off laptop, but anyone who can boot the machine reaches the login screen, and attacks sniffing the bus between a separate TPM chip and the processor have extracted keys in minutes. Adding a pre-boot PIN closes most of those gaps.

**Measured boot differs from Secure Boot.** Secure Boot *prevents* unsigned code from running, by checking signatures; see [[Code Signing]]. Measured boot doesn't block anything; it records what ran so a decision can be made afterward. The two are often combined.

The register values also enable **remote attestation**: the TPM signs its measurements so a remote server can verify a device booted approved software before granting access, a building block of [[Zero Trust Network]] designs. It's also controversial, since the same mechanism can let vendors refuse service to machines running software of the owner's choosing.

TPMs are a simple, cheap kind of hardware security module. Larger ones protect the keys of certificate authorities and banks. All share the principle that keys should live in hardware that uses them without revealing them, a hardware form of [[Least Privilege]] that also shrinks what [[Secret Management]] must guard.

## See also
- [[Microcode]]
- [[Firmware]]
- [[Passkey]]
- [[Near-Field Communication]]
- [[Anti-Cheat]]
- [[Secrets Management]]
