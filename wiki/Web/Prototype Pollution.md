---
aliases:
  - __proto__
  - Prototype chain
tags:
  - web
summary: A JavaScript vulnerability where attacker-controlled keys like "__proto__" modify the prototype every object inherits from, silently adding properties everywhere, and how merge utilities and parsers let it in.
---
**Prototype pollution** is a JavaScript vulnerability in which an attacker modifies the shared prototype that ordinary objects inherit from, so that a property they choose suddenly appears on every object in the program. It turns a harmless-looking data-merging bug into anything from crashes to bypassed security checks to remote code execution.

It comes from how JavaScript objects work. Each object has a hidden link to a prototype, and when a property isn't found on the object itself, the engine looks it up the **prototype chain**. Almost every plain object ultimately links to one shared `Object.prototype`. Add a property there, and every object appears to have it; see [[Object-Oriented Programming]] and [[Dynamic Dispatch]].

The special key `__proto__` reaches that link. Code that writes `obj[key] = value` with keys from untrusted input, typically while deep-merging a parsed [[JSON]] body into a configuration object, can be fed something like `{"__proto__": {"isAdmin": true}}`. A naive recursive merge walks into `__proto__`, finds the shared prototype, and sets `isAdmin` on it. Now `{}.isAdmin` is `true` everywhere, including in a permission check that tests `if (user.isAdmin)` on a user object that never had that property.

The usual entry points:

- **Deep-merge and clone utilities** that recurse into any key; several of the most popular utility libraries shipped this bug.
- **Path setters** that turn strings like `a.b.c` from user input into nested property writes.
- **Query-string and form parsers** that build nested objects from `a[b][c]=x` syntax; see [[URL]].

Consequences depend on what code later reads a missing property and gets the polluted value instead. Researchers have found "gadgets" in widely used libraries: template engines that read an option from an object, so a polluted option injects code into compiled templates; child-process helpers that read a polluted `shell` option; HTML sanitizers that read a polluted allowlist, enabling [[Cross-Site Scripting]].

Defenses:

- **Reject dangerous keys** (`__proto__`, `constructor`, `prototype`) in merge and path functions.
- **Use objects without prototypes**, created with `Object.create(null)`, or a `Map`, for dictionaries keyed by user input; see [[Hash Table]].
- **Freeze the prototype** at startup so it can't be modified.
- **Validate input against a schema** before merging, rejecting unexpected keys; see [[Schema Validation]].

Static analysis tools and [[Fuzzing]] find many cases, and dependency scanners flag known vulnerable versions; see [[Supply Chain Security]] and [[Automated Dependency Updates]].

It belongs to a family of bugs where data is interpreted as structure, alongside [[SQL Injection]] and unsafe deserialization; see [[Serialization]]. Each is a case of the language's flexibility, here, prototypes that any code can modify, becoming the attack surface; see [[Duck Typing]].

## See also
- [[TypeScript]]
- [[Defensive Programming]]
