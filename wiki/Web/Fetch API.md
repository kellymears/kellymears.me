---
aliases:
  - fetch
  - AbortController
  - XMLHttpRequest
  - Ajax
tags:
  - web
summary: The browser's promise-based function for making HTTP requests, which replaced XMLHttpRequest and now also runs on servers, with a few traps around errors, cancellation, and cookies.
---
The **Fetch API** is the standard way for JavaScript to make HTTP requests. Calling `fetch(url)` returns a promise that resolves to a `Response`, whose body can be read as text, JSON, binary data, or a stream. Shipped in Chrome and Firefox in 2015, it replaced the older `XMLHttpRequest` with a cleaner design built on promises, which pair naturally with async and await, described under [[Coroutine]].

Its predecessor had an odd history. Microsoft added XMLHttpRequest to Internet Explorer 5 in 1999 for Outlook's web client, other browsers copied it, and in 2005 Jesse James Garrett named the resulting style of page that updates without reloading *Ajax*. Gmail and Google Maps made it famous, and it led to the [[Single-Page Application]]. XMLHttpRequest worked, but its event-callback interface was clumsy.

Fetch has several well-known traps:

- **HTTP errors don't reject.** The promise rejects only for network failures. A 404 or 500 resolves normally, so code must check `response.ok` or the [[HTTP Status Code]] itself, or it will treat an error page as data.
- **Cookies follow rules.** The `credentials` option controls whether cookies are sent. Same-origin requests include them by default, while cross-origin requests need `credentials: "include"` and matching [[Cross-Origin Resource Sharing]] headers, as described under [[HTTP Cookie]].
- **No built-in timeout.** A request can hang indefinitely. Cancellation uses an `AbortController`, added in 2017, whose signal aborts the request; `AbortSignal.timeout()` later made timeouts a one-liner.
- **Bodies are read once.** A response body is a stream, consumed when read, so reading it twice requires cloning the response first.

Streaming is a quiet strength. The body is a `ReadableStream` that can be processed as it arrives, chunk by chunk, which is how chat interfaces render model output word by word, as described under [[Streaming Response]]. Streams apply [[Backpressure]] naturally: if the reader slows down, the network read slows too.

The same `Request` and `Response` objects run inside a [[Service Worker]], which can intercept a page's fetches and answer them from a cache, the basis of offline web apps. They also escaped the browser. Deno and edge runtimes built on them, and Node.js added a global `fetch` in 2022, so the same code can make requests on client and server.

Frameworks extend it. Next.js, for instance, adds caching options to `fetch` on the server, so a request can be cached and revalidated on a schedule, tying data fetching to [[Incremental Static Regeneration]] and [[HTTP Caching]].

Request options cover most needs: method, headers, body, cache mode, redirect handling, and `keepalive`, which lets a request outlive the page, useful for sending analytics as a user leaves. Good fetching code also handles the slow and failed cases deliberately, showing pending states, retrying idempotent requests, and using [[Optimistic UI]] where a failure can be rolled back.

## See also
- [[XML]]
- [[jQuery]]
- [[Promise]]
- [[WebSocket]]
