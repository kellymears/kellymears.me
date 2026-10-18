---
aliases:
  - Stack frame
  - Stack overflow
  - Stack trace
  - Backtrace
  - Activation record
tags:
  - computation
summary: The region of memory where each function call keeps its local variables and the address to return to, and the source of stack traces, stack overflows, and a classic class of security holes.
---
The **call stack** is the region of memory a running program uses to track active function calls. Each call pushes a **stack frame** holding the function's local variables, its arguments, and the return address, the place in the caller to resume when the function finishes. Returning pops the frame. The most recent call is always on top, which is exactly the last-in, first-out order that nested calls need.

Every thread has its own stack, typically a fixed-size block reserved when the thread starts. On Linux the main thread defaults to 8 MB; on Windows it is 1 MB. Allocation on the stack is nearly free, just moving a pointer, and the memory is reclaimed automatically on return, which is why local variables are fast and need no [[Garbage Collection]].

The stack is what a **stack trace** prints: the chain of frames from the current function back to the program's entry point. A [[Debugger]] lets you walk up and down it, inspecting each frame's variables. In production, minified or compiled code turns traces into addresses, which a [[Source Map]] or debug symbols translate back to names and lines.

Sampling the stack many times a second is how a [[Profiling]] tool finds where time goes. Brendan Gregg's flame graphs, introduced in 2011, stack the sampled traces so wide boxes show hot paths at a glance.

Problems the stack causes:

- **Stack overflow.** Every call consumes space, and deep or infinite [[Recursion]] exhausts it, crashing the program. Languages with [[Tail Call Optimization]] reuse the frame for a call in tail position, letting recursion run in constant space.
- **Stack buffer overflows.** In C and C++, writing past the end of a local array can overwrite the return address, redirecting execution to attacker-chosen code. Stack canaries, non-executable stacks, and address randomization raise the bar, and a [[Sanitizer]] catches many such bugs in testing.
- **Dangling references.** Returning a pointer to a local variable leaves it pointing at a frame that no longer exists.
- **Lost context in async code.** When work resumes from an [[Event Loop]], the original caller's frames are gone, so traces show only the callback. Runtimes now stitch together async stack traces to restore the story.

Not every language keeps calls on one contiguous stack. A [[Closure]] that outlives its function needs its captured variables moved to the heap. A [[Coroutine]] or generator suspends mid-function and later resumes, so its frame must be saved elsewhere. Go starts each goroutine with a tiny stack that grows on demand, so millions can coexist.

The stack and the heap are the two basic places a program keeps data. The stack is fast, automatic, and limited in size and lifetime; the heap is flexible and must be managed.

## See also
- [[Address Space Layout Randomization]]
- [[Memory Safety]]
- [[Virtual Memory]]
- [[Process]]
- [[Crash Reporting]]
