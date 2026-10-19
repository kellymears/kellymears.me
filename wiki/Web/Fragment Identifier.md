---
aliases:
  - URL fragment
  - Text fragment
  - Anchor link
tags:
  - web
summary: The part of a URL after the hash sign, which points to a place within a page, stays in the browser instead of going to the server, and has been borrowed for app routing, secrets, and links to quoted text.
---
A **fragment identifier** is the part of a web address after the # sign. In a link ending in #history, the fragment tells the browser to scroll to the element whose id is history once the page loads. It addresses a place inside a document rather than a document; see [[URL]].

Its defining property is that it never leaves the browser. When a browser requests a page, it sends the path and query string but strips the fragment, so the server never sees it and can't log it; see [[Hypertext Transfer Protocol]]. Browsers also drop it from the referrer they send to other sites; see [[Referrer Policy]]. Changing only the fragment doesn't reload the page. The browser scrolls, adds a history entry, and fires an event that scripts can listen for.

That combination has been repurposed many times:

- **App routing.** Before browsers offered a way to change the address without reloading, single-page applications stored their current view in the fragment. Some used a #! prefix, a convention under which search engines asked servers for a crawlable version of each view, a scheme that was later deprecated; see [[Single-Page Application]] and [[Web Crawler]].
- **Secrets.** Because it stays client-side, the fragment can carry data the server shouldn't hold. An older login flow returned access tokens there, and some encrypted file-sharing services put the decryption key in the fragment so the host never receives it; see [[OAuth]].
- **Skip links.** A link at the top of a page pointing at the main content's id lets keyboard and screen reader users jump past navigation, though focus must be moved as well as the scroll position; see [[Keyboard Navigation]] and [[Focus Management]].

**Text fragments** extend the idea to quotes. A link ending in #:~:text= followed by a phrase tells the browser to find that text, scroll to it, and highlight it, even when the author added no ids. Chrome shipped the feature in 2020, and other major browsers added support later. It was designed so pages can't detect which text was targeted, since that could leak what a visitor was reading.

Fragments are fragile in a particular way. An id renamed during a redesign silently breaks every link to that section; the page still loads, but at the top, and nothing reports the failure. Text fragments fail the same way when the quoted wording changes; see [[Link Rot]]. Sites that care about stable references keep old ids alive or give sections permanent anchors, and documentation tools often generate ids from headings, which makes editing a heading a breaking change.

Fragments are the web's finest-grained address, and they make it possible to cite a single passage; see [[Deep Linking]].

## See also
- [[Hypermedia]]
- [[Backlink]]
