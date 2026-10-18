---
aliases:
  - Content-Encoding
  - Brotli
  - Zstandard
  - BREACH
  - Compression dictionary transport
tags:
  - web
summary: How browsers and servers agree to compress responses with gzip, Brotli, or Zstandard, what each saves, and the attacks that made compression a security question.
---
**HTTP compression** shrinks responses before they cross the network. The browser lists the formats it understands in an `Accept-Encoding` request header, the server picks one and labels the response with `Content-Encoding`, and the browser decompresses it transparently. It is a form of the content negotiation built into the [[Hypertext Transfer Protocol]], and for text it routinely cuts transfer sizes by 70 to 90%.

Three formats matter today:

- **gzip** (1992) uses DEFLATE, the combination of LZ77 back-references and Huffman coding described under [[Data Compression]]. Every client supports it.
- **Brotli**, released by Google in 2015 and standardized in 2016, adds better modeling and a built-in dictionary of about 120 kilobytes of common web strings, HTML tags, CSS properties, and JavaScript keywords, so even a small file compresses well from the first byte. For text it is typically 15 to 25% smaller than gzip.
- **Zstandard**, from Facebook in 2016, compresses about as well as Brotli at much higher speeds, and Chrome added support in 2024.

The right settings depend on when compression happens. Static assets, the hashed JavaScript and CSS files from a [[Bundler]], can be compressed once at build time at the slowest, highest level. Dynamic responses such as server-rendered HTML must be compressed per request, so servers use faster levels that trade a little size for latency.

Not everything benefits. JPEG, PNG, WebP, video, and WOFF2 fonts are already compressed, so compressing them again wastes processor time. Compression is also distinct from [[Minification]], and the two stack: minify first, then compress.

The newest development is **compression dictionary transport**, shipping in Chrome since 2024. A response can be compressed using a dictionary the browser already has, such as the previous version of the same JavaScript file. When a site deploys a small change, returning visitors download only the difference, often a few percent of the full file. Together with [[HTTP Caching]], it makes frequent releases cheaper.

Compression has a security catch: the compressed length reveals something about the content. If a response contains both a secret, such as a CSRF token, and text an attacker can influence, the attacker can guess the secret one character at a time; a correct guess repeats the secret's bytes and compresses slightly smaller. The CRIME attack (2012) used this against compression inside [[Transport Layer Security]], which led to TLS-level compression being disabled everywhere. BREACH (2013) applied it to HTTP response compression. Defenses include masking secrets with fresh random values per response, keeping secrets out of responses that reflect user input, and the per-request tokens used against [[Cross-Site Request Forgery]].

The principle underneath comes from [[Information Theory]]: compression removes redundancy, so how much it removes is itself information.

## See also
- [[Data Compression]]
- [[HTTP Caching]]
- [[Minification]]
- [[HTTP2 and HTTP3]]
- [[MIME Type]]
