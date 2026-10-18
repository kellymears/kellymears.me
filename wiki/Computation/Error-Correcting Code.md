---
aliases:
  - Error correction
  - Forward error correction
  - Reed–Solomon
  - Hamming code
  - Parity bit
  - Erasure coding
  - ECC memory
tags:
  - computation
summary: Adding carefully structured redundancy to data so that errors introduced in storage or transmission can be detected and repaired without asking for the data again.
---
An **error-correcting code** adds structured redundancy to data so that a receiver can not only notice corruption but repair it. A plain checksum, such as a parity bit or the output of a [[Hash Function]], can only say that something changed. An error-correcting code carries enough extra information to work out what the original was, without retransmission.

Richard Hamming invented the first practical codes at Bell Labs in 1950, frustrated that the relay computer he used on weekends would halt on an error and discard his job. A Hamming code adds a few parity bits, each covering an overlapping subset of data bits, so the pattern of failed checks points to the exact bit that flipped. Two years earlier, Claude Shannon had proved that reliable communication over a noisy channel is possible at any rate below the channel's capacity, given a good enough code.

The main families:

- **Hamming and SECDED codes.** Correct a single flipped bit and detect two. Used in ECC memory, which servers rely on because stray particles and failing cells flip bits more often than most people assume.
- **Reed–Solomon codes.** Irving Reed and Gustave Solomon, 1960. They work on whole symbols rather than bits, so they handle bursts of consecutive errors. CDs survive scratches, QR codes stay readable with up to 30 percent damaged, and the Voyager probes still send data with them.
- **Turbo and LDPC codes.** Developed in 1993 and rediscovered from 1960s work respectively, these come within a fraction of Shannon's limit and carry most 4G, 5G, Wi-Fi, and satellite traffic.
- **Erasure codes.** When the location of the loss is known, such as a failed disk, recovery is easier. RAID parity and cloud storage use them to survive the loss of several drives while storing far less than full copies.

The choice between correcting and retransmitting is a trade-off between bandwidth and delay. [[TCP and UDP]] streams usually detect errors and resend, which costs a round trip. Live audio and video over [[WebRTC]] often use forward error correction instead, sending redundancy up front so a lost packet can be rebuilt immediately, since a late frame is as useless as a missing one. That matters most where [[Latency and Jitter]] dominate.

Without any such protection, corruption becomes a [[Silent Failure]]. Disk "bit rot", cosmic-ray flips in non-ECC memory, and faulty cables can alter data that every later system trusts. Filesystems such as ZFS store checksums in a [[Merkle Tree]] to catch it and repair from redundant copies.

Redundancy and [[Data Compression]] pull in opposite directions. Compression removes redundancy to save space; error correction adds it back in a controlled form. Real systems do both, compressing first and then protecting the result.

## See also
- [[Quantum Computing]]
- [[Rowhammer]]
- [[Barcode]]
- [[Checksum]]
- [[N-Version Programming]]
- [[Dynamic Random-Access Memory]]
- [[RAID]]
- [[Pigeonhole Principle]]
