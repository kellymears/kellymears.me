---
aliases:
  - Node
  - npm
  - Deno
  - node_modules
tags:
  - web
summary: A runtime that took JavaScript out of the browser in 2009, pairing the V8 engine with non-blocking I/O, and whose npm registry grew into the largest package ecosystem in software.
---
**Node.js** is a runtime for running JavaScript outside the browser, on servers and command lines. Ryan Dahl introduced it at a JavaScript conference in 2009 by combining two things: Google's fast V8 engine, released the year before, and a library that let one thread wait on thousands of network connections at once.

The second part was the point. Most servers of the time gave each connection its own thread, which sat idle while waiting on a database or a slow client and cost memory the whole time. Node runs all JavaScript on one thread and asks the operating system to report which sockets are ready, so a waiting connection costs almost nothing; see [[IO Multiplexing]] and [[Event Loop]]. That suits chat servers, proxies, and anything holding many mostly idle connections open. It suits heavy computation badly, because one slow calculation stalls every connection, which is why worker threads were added later; see [[Web Worker]].

Node's early APIs took a callback for every operation, with the error as the first argument. Chaining them produced deeply nested code, which promises and later `async`/`await` flattened; see [[Callback hell]]. Running the same language on server and client also made it possible to render the same components in both places; see [[Server-Side Rendering]].

**npm**, the package manager released in 2010, shaped the culture more than the runtime did; see [[Package Manager]]. Publishing was free and instant, and a philosophy of tiny single-purpose modules took hold. A typical project now pulls in hundreds or thousands of packages, installed into a `node_modules` folder notorious for its size. The risks showed up in public. In 2016 the removal of an eleven-line package broke builds worldwide; see [[Left-pad]]. In 2018 a popular package was handed to a new maintainer who added code to steal cryptocurrency wallets; see [[Supply Chain Security]]. Lockfiles arrived in 2017 to make installs repeatable; see [[Lockfile]].

Node also carried a module system of its own, CommonJS with `require()`, which predated the language's standard modules. Moving the ecosystem to the standard took about a decade; see [[ES Modules]].

Governance has had its own drama. Frustration with slow releases led to a fork called io.js in 2014, which merged back the next year under a new foundation; see [[Software Fork]]. In 2018 Dahl gave a talk listing his regrets about Node and announced **Deno**, which runs TypeScript directly, imports from URLs, and denies file and network access unless granted; see [[Least Privilege]]. Bun followed in 2022, chasing speed.

Even sites with no Node server depend on it, because nearly every web build tool, from compilers to linters, runs on it; see [[Bundler]].

## See also
- [[Version Manager]]
- [[Event-stream Incident]]
