---
aliases:
  - Babel
  - JSX
  - Source-to-source compiler
  - Downlevel compilation
tags:
  - web
summary: A compiler that translates source code into another high-level language rather than machine code, which is how most JavaScript gets written in tomorrow's syntax and shipped in yesterday's.
---
A **transpiler**, or source-to-source compiler, translates code from one high-level language into another rather than into machine code. It works like any [[Compiler]]: it parses the input into an [[Abstract Syntax Tree]], transforms the tree, and prints the result as source code in the target language, which people can read and edit if needed.

The idea is old. The first C++ implementation, Cfront, worked by translating C++ into C in the 1980s. On the web it became central because browsers run only one language, so anything else meant for the browser has to become [[JavaScript]] first, or more recently [[WebAssembly]].

Uses on the web fall into a few groups:

- **New syntax for old browsers.** Babel, released in 2014 as 6to5, let developers write ES2015 code years before browsers supported it. It rewrites arrow functions as ordinary functions, classes as prototype assignments, and so on, a process called **downlevel compilation**. Syntax can be translated, but new built-in objects and methods can't, so those still need a [[Polyfill]].
- **Languages that compile to JavaScript.** CoffeeScript (2009) offered a terser syntax, and several of its ideas, including arrow functions, made it into the standard. Elm and ClojureScript bring whole other languages.
- **Types.** TypeScript checks types and then erases them, emitting plain JavaScript; see [[TypeScript]].
- **JSX.** HTML-like tags written inside JavaScript, popularized by React, are compiled into ordinary function calls that build [[Virtual DOM]] nodes.

Transpiled code differs from what the developer wrote, so errors would point at unfamiliar lines. A [[Source Map]] lets the debugger show the original source instead.

The tools were slow because they were themselves written in JavaScript. Around 2020, esbuild (written in Go) and SWC (written in Rust) did the same work ten to a hundred times faster, and most build tools now use one of them internally; see [[Bundler]].

Transpiling has costs. Downleveled code is larger, and features like generators expand into much more code when rewritten for old engines. Shipping that code to modern browsers wastes bytes they don't need. One answer serves two builds, letting browsers that understand native modules skip the old one; see [[ES Modules]]. As older browsers fade, build targets move forward and output shrinks; see [[Minification]].

Transpilers also feed the language itself. Proposed features are implemented as Babel plugins long before browsers ship them, so the committee gets years of real use to learn from before standardizing; see [[Web Standards]]. Related tools called codemods use the same parse-transform-print machinery to rewrite a codebase in place during migrations, such as renaming an API across thousands of files.

## See also
- [[Just-in-Time Compilation]]
- [[Interpreter]]
- [[CSS Preprocessor]]
