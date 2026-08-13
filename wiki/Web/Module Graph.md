---
aliases:
  - Dependency graph
tags:
  - web
summary: The directed graph of imports that decides what code ends up where.
---
The **module graph** is the structure a [[Bundler]] builds by starting at entry points and following every import: nodes are modules, edges are imports. Almost everything about a built application — what ships, what can be removed, what runs where — is a property of this graph rather than of any individual file.

The practical implication is that **membership is transitive and easy to acquire by accident**. Importing one small helper from a module that also imports a large library puts that library in the graph. Importing a type-only value through a barrel that re-exports components puts those components in the graph. A file's own contents tell you nothing about whether it is expensive; its position in the graph does.

This also explains a class of confusing failures that have nothing to do with size. Two build environments can disagree about a module's identity or ordering, which changes downstream hashes. A test runner and a browser runner can each instrument the same file, so a file loaded in both is measured twice — producing coverage shortfalls in files nobody edited. And a value imported through the wrong path drags a component into an environment it was never meant to run in.

Reading the graph — from the bundler's own manifests rather than by inference — is what converts guesses into facts. See [[Ground Truth]].

## See also
- [[Code Splitting]]
- [[Tree Shaking]]
- [[Client-Server Boundary]]
- [[Code Coverage]]
- [[React Server Components]]
- [[Lazy Loading]]

## Related
- [[Performance Budget]]
- [[Server-Side Rendering]]
