---
aliases:
  - ECMAScript
  - JS
  - Type coercion
tags:
  - web
summary: The programming language of the web browser, written in ten days in 1995, standardized as ECMAScript, and now run everywhere from servers to build tools despite quirks it can never remove.
---
**JavaScript** is the programming language built into every web browser, and through them the most widely deployed language in the world. Brendan Eich wrote the first version at Netscape in about ten days in May 1995. It was called Mocha, then LiveScript, and was renamed JavaScript for marketing, to ride the excitement around Java, a language it barely resembles; see [[Browser Wars]].

To keep Microsoft's copy compatible, Netscape handed the language to the standards body Ecma International, so its official name is **ECMAScript**. Editions came slowly: ES3 in 1999, an ambitious ES4 abandoned in 2008, ES5 in 2009. ES2015 was the large overhaul, adding classes, modules, arrow functions, `let` and `const`, and promises. Since then a new edition ships every year, with proposals moving through public stages before they land; see [[Web Standards]].

Its design borrows from several places. Functions are first-class values that capture their surroundings, an idea from Scheme; see [[Closure]]. Objects inherit directly from other objects through prototypes, an idea from the language Self, rather than from classes. Variables have no declared types, and values convert into each other automatically when operators meet mismatched operands. That **type coercion** produces the language's famous puzzles: `"5" - 1` is 4 but `"5" + 1` is `"51"`, and `==` compares loosely while `===` does not; see [[Type System]]. Every number is a 64-bit float, which is why `0.1 + 0.2` isn't `0.3`; see [[Floating-Point Arithmetic]].

JavaScript runs on one thread per page. Long work blocks clicks and rendering, so slow operations like network requests take callbacks and return later through a queue; see [[Event Loop]] and [[Promise]]. Memory is reclaimed automatically; see [[Garbage Collection]].

It began as a slow interpreted language for small scripts. In 2008 Google's V8 engine compiled hot code to machine code as it ran, other browsers followed, and speed jumped by orders of magnitude; see [[Just-in-Time Compilation]]. That made large browser applications practical, and the following year V8 was carried out of the browser to run servers; see [[Node.js]].

The rule that governs the language is "don't break the web." Billions of pages depend on existing behavior, so mistakes are permanent: `typeof null` still returns `"object"`, a bug from the first week; see [[Backward Compatibility]]. In 2018 a proposed array method named `flatten` had to be renamed `flat`, because an old library's own `flatten` would have broken sites that used it; see [[Hyrum's Law]].

Most professional JavaScript is now written in something slightly different and translated before shipping, whether newer syntax for older browsers or types that are erased at build time; see [[Transpiler]].

## See also
- [[Arbitrary-Precision Arithmetic]]
- [[PHP]]
