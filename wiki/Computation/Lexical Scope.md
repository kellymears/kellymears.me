---
aliases:
  - Static scope
  - Dynamic scope
  - Variable shadowing
tags:
  - computation
summary: The rule that a variable name refers to the definition visible where the code is written, not wherever it happens to be called from, which makes closures possible and programs readable.
---
**Scope** is the set of rules that decides which definition a name refers to. Under **lexical scope**, also called static scope, the answer depends on where the code is written: a name refers to the nearest enclosing definition in the program's text. Under **dynamic scope**, it depends on the call chain at run time: a name refers to the most recent definition still active when the code runs. Nearly every modern language uses lexical scope by default.

The difference shows when a function uses a variable it didn't define. Suppose a function f reads a variable x, defined as 1 at the top of the program, and another function g defines its own x as 2 and then calls f. With lexical scope, f sees 1, because that's the x visible where f was written. With dynamic scope, f sees 2, because g's x is the most recent one active. Lexical scope can be resolved from the code alone, even by a compiler before the program runs; dynamic scope depends on every call path; see [[Compiler]] and [[Abstract Syntax Tree]].

ALGOL 60 established lexical, block-structured scope, where each block could define its own names. Early Lisp used dynamic scope, partly by accident of its first interpreter's design, which caused the "funarg problem" when functions were passed around as values; see [[Lisp]] and [[Interpreter]]. Scheme, created in 1975, adopted lexical scope, and later Lisps followed. Emacs Lisp kept dynamic scope as its default until optional lexical binding arrived in 2012.

Lexical scope is what makes **closures** possible. A function created inside another keeps access to the variables around it even after the outer function has returned, because those variables are fixed by where the inner function was written. Callbacks and much of functional programming depend on this; see [[Closure]] and [[Higher-Order Function]]. Since captured variables can outlive the call that made them, they can't simply sit on the call stack, so languages with closures typically keep them on the heap; see [[Call Stack]] and [[Garbage Collection]].

The details still trip people up. In older JavaScript, variables declared with var belonged to the whole function rather than the block, so callbacks created in a loop all saw the loop variable's final value. The let and const keywords, added in 2015, give each loop iteration its own binding; see [[JavaScript]]. An inner definition with the same name as an outer one hides it, called **shadowing**, legal but often confusing.

Dynamic scope survives where it's useful. Environment variables are inherited by every process a shell launches, a kind of dynamic scope; see [[Environment Variable]]. Features that pass context, such as the current request, implicitly down a call chain rely on dynamic binding by design; see [[Dependency Injection]].

## See also
- [[Lambda Calculus]]
- [[Scoped Styling]]
- [[Linux Namespaces]]
- [[Combinatory Logic]]
