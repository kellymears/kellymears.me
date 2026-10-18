---
aliases:
  - Single instruction multiple data
  - Vectorization
  - Flynn's taxonomy
  - Vector processor
tags:
  - computation
summary: Processor instructions that apply one operation to many values at once, the parallelism inside every modern CPU core and the core idea of GPUs, fast when data is laid out in regular arrays.
---
**SIMD**, single instruction multiple data, is a form of parallelism in which one instruction operates on several values at once. A SIMD add takes two registers each holding, say, eight numbers and adds them pairwise in the time an ordinary add handles one pair. Every modern CPU core includes SIMD units, and they account for much of the speed of media codecs, compression, cryptography, and machine learning on the CPU.

The name comes from Michael Flynn's 1966 classification of computer architectures by how many instruction and data streams they handle: single instruction single data for a plain sequential processor, multiple instruction multiple data for multicore machines, and SIMD in between; see [[Concurrency and Parallelism]] and [[Von Neumann Architecture]].

The idea first appeared in vector supercomputers such as the Cray-1 (1976), which streamed long arrays through pipelined arithmetic units. Desktop processors added short fixed-width versions for multimedia: Intel's MMX (1997), then SSE and AVX with progressively wider registers, and ARM's NEON in phones. GPUs take the idea furthest, running thousands of threads in lockstep groups that share one instruction stream; see [[Graphics Processing Unit]].

Ways to use it:

- **Auto-vectorization.** The [[Compiler]] notices a loop doing the same operation to every element of an array and rewrites it to handle several elements per instruction. This works for simple loops and fails quietly for anything with branches, overlapping pointers, or dependencies between iterations.
- **Intrinsics and libraries.** Programmers call SIMD instructions directly, or use libraries that do, which is where most performance-critical code lives.
- **Bit tricks.** Packing several small values into one ordinary integer and operating on them together gives a little SIMD without special instructions; see [[Bitwise Operation]].

SIMD rewards regular data. Values processed together must sit next to each other in memory, so performance-minded code stores each field in its own array, all the x coordinates together, rather than an array of whole objects; see [[Locality of Reference]]. Branches are awkward, since all lanes execute the same instruction, so code computes both sides of a condition and blends the results with a mask.

Some surprising problems vectorize well. Parsers such as simdjson scan JSON at gigabytes per second by classifying 64 bytes at a time, and string search and sorting have SIMD versions too; see [[JSON]] and [[String-Searching Algorithm]]. Image filters are the classic fit, since every pixel undergoes the same arithmetic; see [[Convolution]].

The gains are bounded. Only the vectorized part speeds up, so the rest of the program soon dominates; see [[Amdahl's Law]]. Wide units draw more power, and some processors once lowered their clock speed while running the widest instructions, which could make mixed workloads slower overall. Results can also differ slightly from scalar code, because reordering floating-point additions changes rounding; see [[Floating-Point Arithmetic]].

## See also
- [[Moore's Law]]
- [[Neural Network]]
- [[Hybrid CPU Architecture]]
