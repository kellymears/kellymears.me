---
aliases:
  - ECMAScript modules
  - ESM
  - Import maps
  - CommonJS
  - Dynamic import
tags:
  - web
summary: JavaScript's standard module system of import and export statements, whose static structure enables tree shaking and whose long coexistence with CommonJS caused years of tooling pain.
---
**ES modules** are JavaScript's built-in module system: files that declare what they `export` and what they `import` from other files. Standardized in ES2015 and supported in all major browsers by 2018 through `<script type="module">`, they replaced a decade of workarounds, from global variables to competing module formats, with one syntax that works in browsers, servers, and build tools alike.

Before them, JavaScript had no modules at all. Node.js adopted **CommonJS** in 2009, where `require()` loads a file synchronously and returns whatever it assigned to `module.exports`. That suits a server reading from local disk but not a browser fetching over the network, which is why bundlers arose to stitch CommonJS files together for the web.

ES modules differ in ways that matter:

- **Static structure.** Imports and exports are declarations at the top level, not function calls, so tools can see the full [[Module Graph]] without running any code. That is what makes [[Tree Shaking]] possible: unused exports can be proven unused and dropped.
- **Live bindings.** An import is a live view of the exporting module's variable, not a copy.
- **Module scope and strict mode.** Each file has its own scope, and strict mode is always on.
- **Asynchronous loading.** Module scripts are deferred by default and fetched in parallel, and cross-origin modules require [[Cross-Origin Resource Sharing]] headers.
- **Top-level await.** Since ES2022 a module can await at the top level, pausing modules that depend on it, a direct use of the async machinery described under [[Coroutine]].

**Dynamic `import()`**, added in ES2020, loads a module on demand and returns a promise, the primitive behind [[Code Splitting]]. Modules evaluate in dependency order, a [[Topological Sort]] of the graph, and circular imports work only partially, sometimes exposing a binding before it has been initialized.

Browsers can load modules without any bundler, and [[HTTP2 and HTTP3]] made many small requests cheaper. Bundlers persist anyway, because deep import chains still cost round trips: the browser discovers each import only after fetching the file that names it. `modulepreload` hints, described under [[Preload and Prefetch]], let a page announce the whole graph up front.

**Import maps**, supported across browsers by 2023, map bare names like `"react"` to URLs, so code written for a [[Package Manager]] layout runs directly in the browser.

The transition was long and painful. Node.js shipped stable ES module support in 2020, but the two formats interoperate awkwardly: ES modules can import CommonJS, while CommonJS long could not `require()` an ES module, a restriction Node lifted in 2024. Packages shipped dual builds, the `"type": "module"` field and `.mjs` and `.cjs` extensions multiplied, and a package loaded through both paths could end up instantiated twice, the *dual package hazard*. For years it was a reliable source of [[Dependency Hell]].

## See also
- [[Bundler]]
- [[MIME Type]]
- [[Node.js]]
- [[Polyfill]]
- [[Hot Module Replacement]]
