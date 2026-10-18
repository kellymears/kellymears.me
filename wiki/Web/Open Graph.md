---
aliases:
  - Open Graph protocol
  - Link preview
  - Link unfurling
  - og:image
tags:
  - web
summary: The meta tags a page uses to describe its own preview card when a link is shared, how chat apps and social networks fetch them, and why a preview shows only what the page claims about itself.
---
**Open Graph** is a set of meta tags that tell other services how to display a link to a page. When you paste a URL into a chat app or social network and a card appears with a title, a short description, and an image, the service read those details from the page's Open Graph tags. Facebook introduced the protocol in 2010, and nearly every platform that shows link previews now reads it.

The tags go in the page's `<head>`:

- `og:title` and `og:description`, the card's text.
- `og:image`, the preview image, typically around 1200 by 630 pixels.
- `og:url`, the canonical address, so variants of the same [[URL]] share one preview.
- `og:type`, such as `article` or `website`.

Some platforms add their own tags, such as Twitter's card tags, but fall back to Open Graph. The tags are a lightweight form of [[Structured Data]]: the page describes itself in a machine-readable way.

Producing a preview is called **unfurling**. The platform's server fetches the page, reads the tags, downloads the image, and caches the result. The fetcher is a simple [[Web Crawler]] and usually doesn't run JavaScript, so tags inserted by client-side code are invisible to it. A [[Single-Page Application]] that sets its title in the browser shows a generic card for every page. The fix is to render the tags in the initial HTML through [[Server-Side Rendering]] or [[Static Site Generation]].

Previews are cached aggressively, sometimes for days. Fixing a typo on the page doesn't update cards already shared, and most platforms provide a debugging tool to force a re-fetch; see [[Cache Invalidation]].

Many sites generate preview images automatically, drawing the title onto a branded template at build or request time, because a page without an image gets a smaller, less clickable card. Previews are an attention surface, so they're often tuned like headlines; see [[Search Engine Optimization]].

Privacy and security concerns:

- **Previews are claims.** The card shows whatever the page says about itself. A phishing page can show a bank's logo and title. The preview proves nothing about the destination.
- **Who fetches matters.** If the recipient's app fetches the preview, merely receiving a link reveals the recipient's IP address to the linked server. End-to-end encrypted messengers have the sender's device generate the preview instead.
- **Server-side fetchers can be abused.** A service that fetches any URL a user pastes can be pointed at internal addresses unless it validates the target, the same risk any server-side URL fetch carries.

The name reflects Facebook's original ambition, a "social graph" in which every web page could become an object people liked and shared. The graph faded, but the preview tags became one of the web's most widely adopted metadata standards, mostly because [[Network Effect]]s made every platform read the same few tags.

## See also
- [[Phishing]]
- [[Web 2.0]]
- [[IndieWeb]]
