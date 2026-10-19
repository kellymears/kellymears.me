---
aliases:
  - Clean-room reverse engineering
  - Clean room implementation
tags:
  - delivery
summary: Reimplementing an existing piece of software without copying it, by having one team study the original and write a specification while a separate team that never saw the original builds from that specification alone.
---
**Clean room design** is a method for building a compatible replacement for someone else's software without infringing its copyright. Copyright protects the specific expression of code, not the ideas or functions it implements. The risk in reimplementation is that engineers who have read the original will reproduce it, consciously or not, and that a court will see the similarity as copying. The clean room separates the people who know the original from the people who write the new code.

The process uses two teams with a wall between them:

1. The **specification team** studies the original, through documentation, observed behavior and sometimes disassembly, and writes a description of what it does: inputs, outputs, interfaces and edge cases, with no code.
2. A lawyer or reviewer checks the specification to make sure no copyrightable expression has leaked into it.
3. The **implementation team**, chosen because its members have never seen the original, writes new code from the specification alone.

Every exchange between the teams is recorded, so the company can later show a court exactly what information crossed the wall.

The best-known example is the IBM PC BIOS, the firmware that started the machine and gave programs a standard way to talk to hardware; see [[Boot Process]]. IBM published the BIOS source listing in its technical manuals, which made copying easy and clean reimplementation hard. Compaq built a compatible BIOS this way in the early 1980s, and Phoenix Technologies did the same in 1984 and licensed the result to other manufacturers. Clone computers followed, turning the PC into an open hardware standard that IBM no longer controlled; see [[Backward Compatibility]].

Courts have also weighed reverse engineering for compatibility. In 1989 a US court found that NEC had not infringed Intel's microcode, citing NEC's clean-room reimplementation as evidence. In 2000 an appeals court held that copying a game console's firmware during reverse engineering to build an emulator could be fair use; see [[Emulation]]. In 2021 the US Supreme Court ruled that Google's reuse of Java's interface declarations in Android was fair use, a decision watched closely by anyone reimplementing an [[API Translation Layer]].

Open source projects that recreate proprietary systems often adopt clean-room rules. Some refuse contributions from anyone who has seen leaked source code of the system they are cloning, because a single tainted contribution could put the whole project at legal risk; see [[Developer Certificate of Origin]] and [[Free Software]].

The technique has limits. It protects only against copyright claims. A patent covers the idea itself, so independent reinvention is no defense; see [[Software Patent]]. And perfect compatibility means reproducing every observable behavior, including the original's bugs, because some program somewhere depends on them; see [[Hyrum's Law]].

## See also
- [[Software Fork]]
- [[License Compatibility]]
