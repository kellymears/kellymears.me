---
aliases:
  - Entity Tag
tags:
  - web
summary: An opaque fingerprint of a response's content that lets a client ask a server whether it's changed without re-downloading it.
---
**ETag** is a response header carrying an opaque identifier — typically a hash of the response body — that a server can use to answer one question cheaply: has this resource changed since the client last saw it? The client stores the ETag it received, and on the next request sends it back in an `If-None-Match` header. If the server's current ETag matches, it replies `304 Not Modified` with no body at all; if it doesn't, the server sends the full response along with the new ETag.

This is a stronger freshness signal than a last-modified timestamp, which is the older mechanism (`Last-Modified` / `If-Modified-Since`) it commonly complements. A timestamp only has the resolution of a second and says nothing if content changes and changes back within that window; a content hash notices exactly the bytes that matter and nothing else — a resource regenerated with identical content gets the same ETag and a `304`, where a timestamp-based check would have to guess whether "modified at this second" actually meant "different."

ETags come in two flavors that matter for one specific case: a *strong* ETag asserts byte-for-byte identity, while a *weak* ETag (prefixed `W/`) asserts only that the content is semantically equivalent — useful for something like HTML regenerated with different whitespace but the same meaning. A cache that treats a weak ETag as strong can serve a response that's technically different from what a byte-exact comparison would allow, which matters for range requests but rarely for whole-response caching.

ETags are the revalidation half of [[HTTP Caching]]: `max-age` handles *how long* a response stays fresh with zero requests at all; the ETag handles what happens once that freshness window expires and the client has to ask.

## See also
- [[HTTP Caching]]
- [[Cache Invalidation]]
- [[Preload and Prefetch]]

## Related
- [[Core Web Vitals]]
