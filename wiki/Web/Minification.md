---
aliases:
  - Minifier
  - Mangling
  - Terser
  - Uglification
tags:
  - web
summary: Rewriting JavaScript, CSS, and HTML into the smallest equivalent text by removing whitespace and comments and shortening names, and where its savings and risks actually lie.
---
**Minification** rewrites source code into the smallest text that behaves the same. A minifier removes whitespace, comments, and optional semicolons, shortens local variable and function names, and simplifies expressions where it can prove the result is unchanged. The output is unreadable but equivalent, and it is part of nearly every production web build.

The work happens at several levels:

- **Whitespace and comments.** The simplest pass, and safe almost everywhere.
- **Mangling.** Renaming local identifiers such as `userAccountBalance` to `a`. Only names that can't be seen from outside the scope are safe to rename, so a minifier parses the code into an [[Abstract Syntax Tree]] and tracks scopes, much as a [[Compiler]] does.
- **Compression transforms.** Constant folding (`60 * 60` becomes `3600`), shortening `true` to `!0`, merging variable declarations, inlining single-use functions, and removing unreachable branches. Removing whole unused exports is related but separate, done by [[Tree Shaking]] across modules.

The tools trace the language's history. Douglas Crockford's JSMin (2001) stripped whitespace and comments. Yahoo's YUI Compressor and Google's Closure Compiler added renaming and optimization, and UglifyJS dominated the early 2010s. Terser, a fork of UglifyJS that supported modern syntax, became the default, and native tools written in Go and Rust, esbuild and SWC, now minify many times faster. CSS has its own minifiers that merge rules and shorten colors, and HTML minifiers collapse whitespace and drop optional tags.

The savings are smaller than they look. Raw minification often cuts JavaScript by half or more, but servers also apply [[HTTP Compression]], and gzip or Brotli already squeeze out much of the redundancy in whitespace and repeated long names. After compression, minification typically saves an additional 10 to 30%. It still matters because the browser must *parse* and compile the uncompressed text, so less of it reduces main-thread work and helps avoid a [[Long Task]] during startup. That ties it to [[Performance Budget]]s and [[Core Web Vitals]].

Minification has known hazards:

- **Code that inspects its own names.** Anything relying on `Function.prototype.name`, on `eval`, or on string-built property access can break when names change.
- **Property mangling.** Renaming object properties saves more but must be configured carefully, because the minifier can't see every place a property is accessed by string.
- **Debugging.** Stack traces from minified code point at line 1, column 48,213 of an unreadable file. [[Source Map]]s map them back to the original, and error-reporting services apply them automatically.

Minified code is often mistaken for protection. It isn't: formatters restore the layout instantly, and the logic remains fully readable to anyone determined. Secrets shipped to the browser are public whatever the build does, a point [[Secret Management]] makes for every client.

## See also
- [[Bundler]]
- [[Tree Shaking]]
- [[Source Map]]
- [[Data Compression]]
