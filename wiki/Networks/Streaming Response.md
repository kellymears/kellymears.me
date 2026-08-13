---
aliases:
  - Server-sent events
  - Streaming
tags:
  - networks
summary: Delivering a response incrementally as it is produced rather than all at once when complete.
---
A **streaming response** sends data to a client progressively rather than waiting for the whole result. On the web this is done with chunked transfer encoding, server-sent events, or WebSockets, and in a rendering framework with streaming boundaries that flush a page shell before slow content arrives.

Streaming exists because latency is felt, not measured. A response that takes ten seconds feels entirely different depending on whether anything appears in the first hundred milliseconds. This is why generated text is streamed token by token — the total is unchanged and the experience is not.

The design consequences are real. Errors can occur *after* the response has started, so the status code is already sent and failures must be communicated in-band. Intermediaries may buffer, defeating the whole exercise. And a stream that is aborted mid-flight leaves the receiver holding a partial result it must handle.

Cancellation deserves particular attention in agent systems, where a timeout typically wraps the entire turn including tool execution. A tool that overruns aborts the turn ungracefully, and the abort reaches the client as an error — so the tool's own honest report of what it managed to do never arrives. Budgeting the envelope against the real work, and reporting progress within the stream, is what keeps a long operation legible.

## See also
- [[Agentic Loop]]
- [[Server-Side Rendering]]
- [[Lazy Loading]]
- [[Observability]]
- [[Model Context Protocol]]

## Related
- [[Tool Use]]
- [[React Server Components]]
- [[Islands Architecture]]
- [[Critical Rendering Path]]
