---
aliases:
  - User-Agent
  - Browser sniffing
  - User-Agent Client Hints
tags:
  - web
summary: The header every browser sends to identify itself, which grew into a pile of mutual impersonations because sites served different pages to different browsers, and why it's being frozen.
---
The **user agent string** is the text a browser sends with every request, in the `User-Agent` header, to identify itself. A current Chrome on Windows sends something like: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36`. Most of those names belong to other browsers and engines, the product of thirty years of browsers pretending to be each other.

The history:

1. **Netscape** identified itself as "Mozilla," and supported frames. Sites began checking for "Mozilla" and sending frames only to it.
2. **Internet Explorer** supported frames too, but received the frameless pages. So it began claiming "Mozilla/compatible" to get the good version.
3. Each later browser repeated the trick. Konqueror's engine KHTML was forked into Apple's WebKit, which said "KHTML, like Gecko" to get pages written for Firefox's Gecko engine. Chrome, built on WebKit, added "Safari" to get Safari's pages.

The root cause is **browser sniffing**: sites reading the string to decide what to serve, instead of testing whether the feature they need exists. Sniffing breaks constantly. It locks out new browsers the site didn't know about, misreads version numbers, and keeps serving workarounds long after bugs are fixed. When browser versions reached 100 in 2022, some sites that parsed only two digits broke. The better practice is feature detection: check whether the API exists, and fall back if not; see [[Progressive Enhancement]].

It's a case of [[Hyrum's Law]]: every detail of the string became something some site depended on, so browsers could never simplify it, only add to it.

The string has also become a privacy problem. Its version numbers, operating system, and device model add identifying detail that helps track people across sites without cookies.

The response is to freeze it. Chrome began reducing its user agent string in 2022, replacing exact versions and device details with fixed values. Sites that genuinely need more detail can request it through **User-Agent Client Hints**: separate headers the server must ask for, letting browsers limit or log what's shared. Firefox and Safari have declined to adopt Client Hints, preferring to share less overall.

Servers still use the string for analytics, debugging, blocking abusive bots, and choosing image formats, though content negotiation through the Accept header handles formats better; see [[Responsive Images]]. Bots and AI crawlers declare themselves with their own strings, which sites match in robots.txt rules, on the honor system; see [[Web Crawler]]. Faking the string is trivial, so it can never be trusted for security.

## See also
- [[Backward Compatibility]]
- [[Headless Browser]]
