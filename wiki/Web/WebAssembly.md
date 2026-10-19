---
aliases:
  - Wasm
  - asm.js
  - WASI
  - Emscripten
tags:
  - web
summary: A compact binary instruction format that browsers run at near-native speed in a sandbox, letting code written in C, C++, Rust and other languages run on the web alongside JavaScript.
---
**WebAssembly** (Wasm) is a low-level binary instruction format for a stack-based virtual machine. Instead of shipping JavaScript, a site can ship a `.wasm` module compiled from C, C++, Rust, Go or another language, and the browser validates it, compiles it to machine code and runs it at close to native speed. It was announced in 2015, shipped in all four major browsers in 2017, and became a W3C Recommendation in 2019.

It grew out of two earlier experiments:

- **asm.js** (Mozilla, 2013) was a strict subset of JavaScript that engines could recognize and compile ahead of time. It proved that a [[Compiler]] toolchain such as Emscripten could bring large C++ codebases, including game engines, to the browser.
- **Native Client** (Google) ran sandboxed native code in Chrome but never won over other browsers.

WebAssembly kept asm.js's portability and fixed its problems: a binary format is smaller and much faster to decode than JavaScript source text.

Key properties:

- **Linear memory.** A module sees one flat, resizable array of bytes, like a process's memory but bounds-checked. It cannot read anything outside that array, so a memory bug in the C code corrupts only the module's own sandbox.
- **No direct access to the page.** Wasm cannot touch the [[Document Object Model]], the network or storage on its own. Everything goes through functions the JavaScript host imports into it, which is a form of [[Least Privilege]]. Calls across that boundary have a cost, so heavy work belongs inside the module and UI code stays in JavaScript.
- **Predictable performance.** Wasm has static types and no warm-up guessing, so it avoids the speculative optimizations and deoptimizations a JavaScript engine's [[Interpreter]] and JIT go through.
- **Same rules as scripts.** Modules obey the [[Same-Origin Policy]], and a [[Content Security Policy]] has a dedicated `wasm-unsafe-eval` source for them.

Typical uses are compute-heavy: image and video editors, CAD tools, codecs, databases such as SQLite running in the browser, physics engines and console [[Emulation]]. Running a module in a [[Web Worker]] keeps that work off the main thread.

Two extensions widened its reach. **WasmGC** (2023) lets a module use the engine's [[Garbage Collection]] instead of bundling its own, which makes Kotlin, Dart and Java practical targets. **WASI**, the WebAssembly System Interface, defines access to files, clocks and sockets outside the browser, where Wasm runs as a lightweight, portable sandbox on servers and edge networks. Some describe it as an alternative to [[Containerization]] with millisecond start times.

Wasm does not replace JavaScript. It joins it as a second target, and a [[Bundler]] usually wires the two together.

## See also
- [[Cross-Origin Isolation]]
- [[Stack Machine]]
- [[Intermediate Representation]]
- [[WebGPU]]
