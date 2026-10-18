---
aliases:
  - Polyfills
  - Shim
  - Ponyfill
  - Feature detection
  - Transpilation
tags:
  - web
summary: Code that implements a missing browser feature using features the browser does have, matching the standard API so it can be deleted once every target supports it natively.
---
A **polyfill** is code that adds a feature a browser lacks, written in terms of features it has. If an older browser has no `Array.prototype.includes`, a polyfill defines one that behaves the same way, and code calls it as if the feature were native. Remy Sharp coined the word around 2009 after Polyfilla, a British filler paste for cracks in walls.

Three related terms are easy to confuse:

- **Shim** is the broader term for any library that intercepts or adapts an API, standard or not.
- **Ponyfill** implements the same behavior but exports it as a separate function instead of patching globals, so it cannot collide with a native version.
- **Transpilation** handles syntax rather than APIs. New syntax such as optional chaining cannot be polyfilled, because an old parser rejects the file before any code runs. A [[Compiler]] such as Babel rewrites it into older syntax instead.

A good polyfill runs only where needed, guarded by **feature detection**: check whether `'includes' in Array.prototype`, and install it only if not. This asks whether the capability exists rather than what the browser is, in the spirit of [[Duck Typing]]. Sniffing the user-agent string breaks as browsers change. Feature detection is also the core of [[Progressive Enhancement]].

The pattern has costs:

- **Weight.** Shipping polyfills to modern browsers that don't need them wastes bytes and parse time, which strains a [[Performance Budget]]. A [[Bundler]] can include only what the declared target browsers require, and differential serving gives older browsers a separate bundle.
- **Imperfect copies.** Some features, such as CSS layout or native form controls, cannot be faithfully reproduced in JavaScript, and a polyfill that is subtly wrong is worse than none.
- **Collisions with the future.** Patching built-ins can block the standard itself. In 2018 the proposed `Array.prototype.flatten` broke sites using an old MooTools version that defined its own incompatible `flatten`, so the standard was renamed `flat`. It is [[Hyrum's Law]] applied to the language: code written against the old behavior forced the standard to change.

Polyfills are also a supply-chain risk. The polyfill.io service delivered tailored polyfills from a script tag on over a hundred thousand sites. In 2024, months after the domain changed owners, it began serving malicious code to those sites. It became a standard example in [[Supply Chain Security]]. The lesson was to [[Vendoring|vendor]] or self-host such scripts and to pin third-party scripts with subresource integrity hashes, enforced alongside a [[Content Security Policy]].

Every polyfill should have a planned end. Once all supported browsers ship the feature, it becomes dead weight and should be removed, following the same discipline as [[Deprecation]]. An [[API Translation Layer]] applies the same idea to graphics APIs.

## See also
- [[Cross-Browser Testing]]
- [[Web Standards]]
- [[User Agent String]]
- [[Browser Engine]]
