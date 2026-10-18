---
aliases:
  - Data URL
  - Inline image
  - Blob URL
tags:
  - web
summary: A URL that carries its content inside the address itself, used to embed small images in pages and stylesheets without a separate request, and abused for phishing until browsers restricted it.
---
A **data URI** is a URL that contains its content rather than pointing to it. Instead of an address to fetch, it holds the file itself: `data:image/png;base64,` followed by the encoded bytes of the image. Defined in 1998, it can be used anywhere a URL can, in an `<img>` tag, a CSS background, or a link; see [[URL]].

The format is `data:`, an optional media type that says how to interpret the content, an optional `;base64` flag, a comma, and the data; see [[MIME Type]]. Binary files are written in base64, which represents every three bytes as four plain-text characters, so the data grows by a third. Text formats can skip base64 and use percent-encoding instead, which is why small SVG icons are often inlined as readable markup; see [[Vector Graphics]].

The reason to use them was the cost of requests. Under HTTP/1.1, browsers opened only a few connections per site and each request paid for a network round trip, so a page with forty small icons spent much of its load time asking for them. Inlining the icons into the stylesheet removed those requests, as did combining many icons into one image; see [[Sprite]]. Build tools still inline any asset below a size threshold, often a few kilobytes; see [[Bundler]].

The costs are real:

- **Caching.** An inlined image is cached only as part of the file that contains it. Change one rule in the stylesheet and every embedded icon downloads again, and an icon used in two files downloads twice; see [[HTTP Caching]].
- **Size.** Base64 adds a third, and compression recovers only part of that; see [[HTTP Compression]].
- **Blocking.** Images inlined in CSS must download before the page can render, even ones far down the page; see [[Critical Rendering Path]].

HTTP/2 let many requests share one connection, which removed most of the original reason; see [[HTTP2 and HTTP3]]. Inlining now makes sense mainly for tiny assets and for the blurred placeholders shown while a full image loads; see [[Lazy Loading]].

Data URIs also caused security trouble. A phishing page could be built entirely inside a URL, so the address bar showed no domain to check. Chrome and Firefox stopped allowing direct navigation to them in 2017, and pages loaded from them get a unique origin that matches nothing; see [[Same-Origin Policy]]. A [[Content Security Policy]] must allow `data:` explicitly, and allowing it for scripts reopens the door to injection.

**Blob URLs** solve a related problem. Code can turn data it already holds in memory, such as a generated file or an image the user picked, into a short `blob:` address for downloads and previews, with no encoding. Each one holds its data until released, so forgetting to revoke them leaks memory; see [[Memory Leak]].

## See also
- [[Base64]]
- [[Favicon]]
