---
aliases:
  - XSS
tags:
  - web
summary: Injecting attacker-controlled script into a page that a victim's browser then executes with the victim's own privileges.
---
**Cross-Site Scripting** is a vulnerability class where an attacker gets their own script to run inside a page in a victim's browser, under that page's own origin — meaning the script can read cookies, make authenticated requests, and manipulate the [[Document Object Model]] exactly as the site's legitimate code could. The attacker never touches the victim's session directly; they trick the victim's own browser into running code on their behalf.

The three variants differ in where the malicious payload lives. *Stored* XSS persists the payload server-side — a comment field, a profile bio — so it executes for every visitor who views that content, which is why it's the most dangerous variant: one injection, many victims, no interaction required beyond viewing a page. *Reflected* XSS bounces the payload off the server in a single response, typically via a URL parameter echoed back unescaped, requiring the victim to click a crafted link. *DOM-based* XSS never touches the server at all — client-side script reads something attacker-controlled, like `location.hash`, and writes it into the page unsafely, so the vulnerability lives entirely in front-end code a server-side scanner won't see.

The root cause across all three is the same: untrusted input rendered into a context — HTML, a script tag, an attribute — without escaping appropriate to that context. The fix is equally uniform: escape on output, at the point data crosses into HTML, not on input, since data legitimately used in multiple contexts needs different escaping for each. Modern frameworks that auto-escape interpolated values by default (React's JSX, Vue's templates) close most of the surface automatically; `dangerouslySetInnerHTML` and its equivalents exist precisely to name the escape hatch, so a reviewer can spot it.

[[Content Security Policy]] is the layer that limits damage after an injection succeeds anyway — it's a mitigation, not a substitute for escaping.

## See also
- [[Content Security Policy]]
- [[Document Object Model]]
- [[Same-Origin Policy]]
- [[Cross-Origin Resource Sharing]]

## Related
- [[JSON Web Token]]
