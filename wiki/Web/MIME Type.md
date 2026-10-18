---
aliases:
  - Media type
  - Content-Type
  - Content sniffing
  - MIME sniffing
tags:
  - web
summary: The short type/subtype label, born in email, that tells a browser how to treat a response, and why browsers that guess when it's missing turned a convenience into a security hole.
---
A **MIME type**, now formally called a **media type**, is a label like `text/html` or `image/png` that says what kind of data a message carries. The format comes from email: Multipurpose Internet Mail Extensions, standardized in 1992, let messages carry attachments, images, and non-English text instead of plain ASCII. The web adopted the labels so that every [[Hypertext Transfer Protocol]] response could say what its body contains, in the `Content-Type` header.

The structure is `type/subtype`, plus optional parameters:

- `text/html; charset=utf-8` is a web page, with its [[Character Encoding]] declared.
- `application/json` is [[JSON]] data.
- `text/javascript` is a script.
- `image/avif`, `font/woff2`, and `video/mp4` are what they look like.
- `application/octet-stream` means "arbitrary bytes," which browsers usually download rather than display.

Vendor-specific types begin with `vnd.`, and a suffix such as `+json` says the format is built on JSON even when the type is specific, as in `application/ld+json`. The IANA keeps a registry of official types.

The label, not the file extension, decides what a browser does. A file named `photo.jpg` served as `text/html` is rendered as a web page. Clients can say what they'd prefer with the `Accept` header, and a server can respond with the best match, a process called content negotiation.

**Sniffing** is where it gets dangerous. Early servers often sent missing or wrong types, so browsers learned to inspect the first bytes of a response and guess. That kept broken sites working, in the spirit of [[Postel's Law]], but it let attackers upload a file that looked like an image to the server and like HTML to the browser. A profile picture containing script tags could run code on the site's own origin; see [[Cross-Site Scripting]]. The fix is the `X-Content-Type-Options: nosniff` header, which tells the browser to trust the declared type and refuse mismatches, such as running a script served as `text/plain`. Sites that accept uploads should also serve them from a separate domain and with a `Content-Disposition: attachment` header.

Modern features are stricter by default. A module script with the wrong type is refused outright, not sniffed; see [[ES Modules]]. A [[Content Security Policy]] and strict types together close most of the old guessing paths.

Types also drive caching and optimization. Compression is usually applied to text types and skipped for already-compressed images and video; see [[HTTP Compression]]. A [[Service Worker]] or a [[Content Delivery Network]] often routes or transforms responses by type, so a wrong label can break more than display.

A related idea in files is the *magic number*, the fixed bytes at the start of a format such as `%PDF` or the PNG signature. Sniffing is essentially reading magic numbers when the label can't be trusted; see [[Serialization]].

## See also
- [[Base64]]
- [[Favicon]]
- [[Simple Mail Transfer Protocol]]
- [[Data URI]]
