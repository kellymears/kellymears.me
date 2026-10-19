---
aliases:
  - JIT
  - JIT compiler
  - JIT compilation
  - Bytecode
  - Tiered compilation
tags:
  - computation
summary: Compiling code to machine instructions while the program runs, using what the running program reveals to optimize hot paths, the technique that made JavaScript and Java fast.
---
**Just-in-time compilation** translates code into machine instructions while the program is running, rather than ahead of time. It sits between the two classic approaches. An [[Interpreter]] starts instantly but runs slowly, executing each operation through a layer of indirection. An ahead-of-time [[Compiler]] produces fast code but must do so before knowing how the program will actually be used. A JIT starts by interpreting, watches what the program does, and compiles the parts that matter using what it has observed.

Many JIT systems first compile source to **bytecode**, a compact instruction set for a virtual machine rather than for real hardware. Java compiles to JVM bytecode, C# to .NET's intermediate language, and Python to its own bytecode. The bytecode is portable, and the virtual machine interprets it or compiles it further.

The key technique is **tiered compilation**:

1. **Interpret or quickly compile** everything, while counting how often each function and loop runs.
2. **Identify hot code**, the small fraction where the program spends most of its time, the same skew [[Profiling]] reveals.
3. **Optimize the hot code aggressively**, spending compile time only where it pays off.

A JIT's advantage is runtime information. A JavaScript function that could in principle receive any type, but in practice always gets integers, can be compiled as integer code with a cheap check at the top. If the assumption breaks, the engine **deoptimizes**, falling back to slower code and possibly recompiling later. Engines use *inline caches* to remember which method a call site resolved to, making [[Dynamic Dispatch]] nearly as cheap as a direct call, and *hidden classes* to give dynamically shaped objects fixed layouts. This speculation is how dynamic languages run fast despite [[Duck Typing]], and it's similar in spirit to the hardware's own [[Speculative Execution]].

The idea goes back to Lisp systems and to Smalltalk and Self research in the 1980s and 1990s. Sun's HotSpot JVM, released in 1999, brought it to the mainstream. In 2008, Google's V8 engine for Chrome made JavaScript an order of magnitude faster, enabling the complex applications that followed. LuaJIT and PyPy showed what tracing JITs, which compile hot loop paths rather than whole functions, can do for other dynamic languages.

JITs have costs:

- **Warm-up.** Code runs slowly until it's been observed and compiled, which matters for short-lived programs and makes [[Benchmarking]] tricky; measurements taken before warm-up mislead.
- **Memory.** The compiler, profiling data, and compiled code all consume memory.
- **Security.** A JIT writes executable code at runtime, which exploits target; some platforms forbid it.
- **Unpredictability.** Performance can shift when deoptimization happens, producing hard-to-explain slowdowns.

These trade-offs drove alternatives. [[WebAssembly]] ships pre-compiled, lower-level code to browsers for predictable performance, and some platforms compile ahead of time to avoid warm-up entirely. Many runtimes now mix both.

## See also
- [[PHP]]
- [[JavaScript]]
- [[Metaprogramming]]
- [[Browser Wars]]
- [[Position-Independent Code]]
