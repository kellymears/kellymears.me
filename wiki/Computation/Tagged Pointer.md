---
aliases:
  - Pointer tagging
  - NaN boxing
tags:
  - computation
summary: A pointer that carries extra information, such as a type tag or a small integer, in bits the memory address doesn't use, a trick that lets dynamic language runtimes fit any value into one machine word.
---
A **tagged pointer** is a pointer that carries extra information alongside the address it points to, stored in bits the address itself doesn't need. It packs a little metadata, such as the type of the value pointed to, into one machine word, saving memory and a separate lookup.

Spare bits exist for two main reasons. Objects in memory are usually aligned, starting at addresses that are multiples of 8 or 16, so the lowest three or four bits of any pointer to them are always zero; see [[Binary Number]]. And on 64-bit processors, current hardware uses only around 48 of the 64 address bits, leaving the top bits free in principle, though the processor may require a fixed pattern there when the pointer is used; see [[Virtual Memory]]. Using the bits means masking them off before following the pointer; see [[Bitwise Operation]].

Dynamically typed languages are the classic users. In such languages every value must carry its type at run time; see [[Dynamic typing]]. If every integer were a separate object with a type header, simple arithmetic would require allocating memory. Instead, a common trick sets the lowest bit to 1 for small integers, storing the number directly in the remaining bits, and to 0 for pointers to real objects. Lisp systems used tagging from early on, and the standard implementations of languages such as Ruby and OCaml use the low bit this way; see [[Lisp]]. A garbage collector can then tell at a glance which words are pointers; see [[Garbage Collection]]. The cost is that small integers lose a bit of range, and arithmetic must check for overflow into a larger representation; see [[Integer Overflow]].

**NaN boxing** is a variation built on floating-point numbers. The standard 64-bit floating-point format reserves a huge number of bit patterns to mean "not a number," and only one is normally needed; see [[Floating-Point Arithmetic]]. A runtime can hide pointers, integers, and other values inside the unused patterns, so every value fits in one 64-bit word and real floating-point numbers need no conversion at all. LuaJIT and some JavaScript engines use variations of this scheme; see [[Just-in-Time Compilation]].

Tagged pointers also appear in reference counting schemes, where a count or flag is stored in spare bits, and in concurrent data structures, where a counter attached to a pointer guards against a value changing and changing back unnoticed; see [[Reference Counting]] and [[Lock-Free Data Structure]].

The technique has risks. Code that forgets to strip the tag follows a garbage address, a class of bug that memory-safe languages rule out; see [[Memory Safety]]. Recent processors have formalized the idea, with features that let software keep tags in the top bits, including tags checked by the hardware itself to catch memory errors.

## See also
- [[Algebraic Data Type]]
- [[Address Space Layout Randomization]]
