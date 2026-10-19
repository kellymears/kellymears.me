---
aliases:
  - ASLR
  - Return-oriented programming
  - Exploit mitigation
  - Stack canary
tags:
  - systems
summary: Loading a program's code, stack, and libraries at random addresses so that an attacker who corrupts memory doesn't know where to jump.
---
**Address space layout randomization** (ASLR) loads the parts of a program, its executable code, shared libraries, stack, and heap, at different random addresses each time it runs. It doesn't prevent memory corruption. It makes corruption much harder to turn into control of the program, because the attacker no longer knows where anything is.

The problem it answers is old. A classic stack buffer overflow, the most common failure of [[Memory Safety]], overwrites the return address on the [[Call Stack]] so that when a function returns, it jumps where the attacker chose. Early exploits jumped into code they had written into the buffer itself. Operating systems responded by marking data memory as non-executable, a rule called W^X (write xor execute) and supported in hardware by the NX bit from the mid-2000s.

Attackers adapted with **return-oriented programming** (ROP), formalized by Hovav Shacham in 2007. Instead of injecting code, the attacker chains together *gadgets*: short fragments of existing, legitimate code that each end in a return instruction. Enough gadgets from a large library such as libc form a [[Turing Completeness|Turing-complete]] toolkit, all without executing a single injected byte. ROP needs the gadgets' addresses, and that is exactly what ASLR hides.

ASLR began in the PaX project's Linux patches in 2001. OpenBSD enabled it by default in 2003, mainline Linux in 2005, and Windows with Vista in 2007. Two details decide how well it works:

- **Coverage.** The main program is randomized only if it is compiled as a position-independent executable. For years many binaries weren't, which left a fixed region full of gadgets. Modern toolchains make position independence the default, much as they do for [[Dynamic Linking]].
- **Entropy.** On 32-bit systems there are so few possible positions that an attacker can guess by brute force, especially against servers that restart crashed workers. The 64-bit address space makes guessing impractical.

ASLR's weakness is the *information leak*. A single bug that reveals one pointer exposes a whole module's location, after which the randomization is worthless, so real exploits usually chain a leak with a corruption bug. Side channels can leak layout too; [[Speculative Execution]] attacks defeated kernel ASLR outright.

ASLR is therefore one layer among several. **Stack canaries** place a random value before the return address and abort if it changes. Control-flow integrity restricts indirect jumps to valid targets, and hardware shadow stacks keep a protected copy of return addresses. The kernel randomizes its own layout as KASLR. Each mitigation raises the cost of an exploit rather than removing the bug, which is why [[Fuzzing]], [[Sanitizer]] builds, and memory-safe languages attack the cause instead. The idea fits [[Least Privilege]]: assume something will break, and limit what the break can reach.

## See also
- [[Memory Safety]]
- [[Call Stack]]
- [[Virtual Memory]]
- [[Penetration Testing]]
- [[Linker]]
- [[Von Neumann Architecture]]
- [[Position-Independent Code]]
