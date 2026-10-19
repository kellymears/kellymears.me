---
aliases:
  - Byte order
  - Big-endian
  - Little-endian
  - Network byte order
tags:
  - systems
summary: The order in which a multi-byte number's bytes are stored in memory or sent over a wire, invisible inside one machine and a recurring source of bugs at every boundary between systems.
---
**Endianness** is the order in which the bytes of a multi-byte number are stored in memory or transmitted. The number 0x12345678 takes four bytes. A **big-endian** system stores the most significant byte first, `12 34 56 78`, the way people write numbers. A **little-endian** system stores the least significant byte first, `78 56 34 12`. Neither is more correct; they're conventions, and trouble starts when two systems assume different ones.

The names come from *Gulliver's Travels*, in which two nations go to war over which end of a boiled egg to crack. Danny Cohen borrowed them in a 1980 note, "On Holy Wars and a Plea for Peace," arguing that the choice mattered less than agreeing on one.

Each has small practical merits. Little-endian lets a program read a number at the same address whether it treats it as 8, 16, or 32 bits, since the low byte is always first, which simplified early hardware and multi-precision arithmetic. Big-endian is easier for people reading memory dumps, and comparing numbers byte by byte gives the right order, convenient for sorting keys.

Today little-endian dominates. x86 and nearly all ARM systems run little-endian; see [[Instruction Set Architecture]]. Big-endian survives in older mainframes and network equipment, and in many file formats and protocols. Internet protocols send multi-byte fields big-endian, so it's known as **network byte order**; every port number and address in an IP header is big-endian, and code converts with functions such as `htons`, "host to network short"; see [[TCP and UDP]] and [[Network Socket]].

Within one program, endianness is invisible: arithmetic and [[Bitwise Operation]]s work on values, not byte layouts. It surfaces at boundaries:

- **Files and protocols.** Reading binary data written by another system means knowing its byte order. Formats specify it: PNG is big-endian, most of what Windows writes is little-endian, and some formats include a marker saying which.
- **Text.** UTF-16 stores characters in two-byte units, so a file may begin with a byte order mark telling readers which order follows; see [[Character Encoding]].
- **Raw memory tricks.** Casting a pointer to reinterpret bytes, or hashing a struct's bytes directly, gives different results on different machines; see [[Hash Function]].
- **Identifiers.** Some UUID formats store parts little-endian, so the same identifier prints differently depending on the tool; see [[Universally Unique Identifier]].

The robust practice is to never depend on native layout when data crosses a boundary. Define the byte order explicitly and convert at the edges, which good [[Serialization]] formats do for you. Text formats such as JSON sidestep the issue by writing numbers as digits.

Mixing up byte order is a classic source of bugs that pass every test on one machine and fail on another, much like assumptions buried in an [[Application Binary Interface]].

## See also
- [[Gray Code]]
- [[Integer Overflow]]
- [[Binary Number]]
- [[Mainframe]]
