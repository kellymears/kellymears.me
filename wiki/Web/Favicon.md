---
aliases:
  - Favorites icon
  - Apple touch icon
  - Site icon
tags:
  - web
summary: The tiny icon identifying a website in tabs, bookmarks, and search results, invented by Internet Explorer in 1999, now a set of sizes and formats, and once a surprising tracking channel.
---
A **favicon** is the small icon that identifies a website in browser tabs, bookmarks, history, and search results. The name is short for "favorites icon," from its origin in Internet Explorer.

Internet Explorer 5, released in March 1999, introduced it. When someone added a page to their Favorites, the browser requested a file named favicon.ico from the root of the site and, if one existed, showed it beside the bookmark. The format was the Windows icon format, 16 by 16 pixels. Other browsers copied the behavior, and a link element in the page's head was added so sites could name the icon's location and use other formats; HTML5 standardized it; see [[Browser Wars]] and [[Web Standards]].

Many browsers still request /favicon.ico automatically, even from sites that don't have one, which fills server logs with missing-file errors; see [[HTTP Status Code]].

The icon has spread far beyond the address bar:

- **Tabs.** With many tabs open, titles shrink away and the favicon becomes the main way to find one.
- **Home screens.** iOS added its own "touch icon" for sites saved to the home screen, at much larger sizes. Installable web apps now declare a set of icons in a manifest; see [[Progressive Web App]].
- **Search results.** Search engines show favicons beside results, which made them part of a site's brand presence in search.

SVG favicons scale cleanly and can include a media query so the icon changes color in dark mode; see [[Vector Graphics]] and [[Dark Mode]].

Designing at 16 pixels is its own craft. A logo with fine detail turns to mush when downscaled, so favicons are simplified to a bold letter or shape, sometimes drawn pixel by pixel for the smallest size rather than shrunk automatically; see [[Image Resampling]], [[Pixel Art]], and [[Iconography]]. Many sites use the first letter of their name on a solid color.

Because the icon can be changed by script, it is also a status display. Web apps draw unread counts or alert dots onto it with [[HTML Canvas]], or swap icons to show that a build failed or a call is live, signals visible even when the tab is in the background.

Favicons also had a privacy flaw. Browsers keep favicons in their own cache, separate from cookies and ordinary caches, and for years clearing browsing data or opening a private window didn't empty it. Researchers showed in 2021 that a site could redirect a new visitor through a sequence of subdomains, record which icons the browser requested and which it already had, and so write and read back a persistent identifier; see [[Browser Fingerprinting]] and [[HTTP Caching]]. Browsers have since tightened how that cache is partitioned and cleared.

## See also
- [[Data URI]]
- [[MIME Type]]
