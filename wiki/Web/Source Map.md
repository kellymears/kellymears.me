---
aliases:
  - Source maps
  - sourceMappingURL
  - Symbolication
  - Debug symbols
tags:
  - web
summary: A file that maps each position in compiled, bundled or minified code back to the original source line, so debuggers and error reports can show the code that was actually written.
---
A **source map** is a JSON file that connects generated code to the code it came from. Web code rarely runs as written. TypeScript is compiled to JavaScript, modules are combined by a [[Bundler]], unused code is removed by [[Tree Shaking]], and the result is minified into a few long lines with one-letter names. Without a map, an error at "line 1, column 48,213" of a minified file is almost useless.

The format came out of Google's Closure Compiler around 2009. Version 3, designed by Google and Mozilla engineers in 2011, became the de facto standard, and Ecma formally standardized it as ECMA-426 in 2024. A map contains:

- **sources.** The original file paths, and optionally their full text in `sourcesContent`.
- **names.** Original identifiers, so a debugger can show `userCount` where the minified code says `a`.
- **mappings.** One long string recording, for each segment of generated code, its source file, line and column. Each value is stored as an offset from the previous one and encoded in Base64 variable-length quantities. This compact encoding is a small exercise in [[Data Compression]], since a naive table would be many times larger than the code it describes.

A generated file points to its map with a trailing `//# sourceMappingURL=` comment or a `SourceMap` HTTP header. Browsers download maps only when developer tools are open, so they cost ordinary visitors nothing.

Maps serve two audiences:

- **Developers.** A [[Debugger]] shows breakpoints, stack frames and variable names in the original files. CSS preprocessors emit maps too, so the inspector shows which source stylesheet a rule came from.
- **Error tracking.** Production errors arrive with minified stack traces. A monitoring service applies the map to recover original file names and lines, called symbolication, which turns crash reports into usable [[Observability]] data. [[Profiling]] tools use maps the same way.

Native programs have the same need, met by debug symbols such as DWARF or PDB files that map machine code back to source. Each step in a [[Compiler]] pipeline that rewrites code must also update the map, or later steps lose track of the original positions.

Publishing maps has a cost. Many teams upload maps privately to their error tracker and keep them off the public server, since a public map with `sourcesContent` hands anyone the full original source, comments included. Applications have leaked unreleased features and internal notes this way. Hiding maps does not make code secret, since minified JavaScript can still be read, but it avoids handing over the original files with their comments.

Maps also go stale. A map from a different build gives confidently wrong lines, which is one reason a [[Reproducible Build]] helps. Newer tooling embeds a debug ID in both the file and its map so they can be matched reliably.

## See also
- [[Call Stack]]
- [[Debugger]]
- [[Compiler]]
- [[Observability]]
