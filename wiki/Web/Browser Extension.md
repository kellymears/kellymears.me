---
aliases:
  - Userscript
  - Ad blocker
  - Bookmarklet
  - Manifest V3
tags:
  - web
summary: Small programs that modify the browser and the pages it shows, from bookmarklets and userscripts to ad blockers, with access broad enough to make them a standing security risk.
---
A **browser extension** is a small program, written in web technologies, that adds features to the browser or changes the pages it displays. Extensions block ads, manage passwords, translate text, and restyle sites their users dislike.

They grew from a few simpler tricks:

- **Bookmarklets** (late 1990s) are bookmarks whose address is a `javascript:` URL, so clicking one runs a snippet on the current page.
- **Userscripts** (2005, with the Firefox add-on Greasemonkey) are scripts that run automatically on matching sites, letting one person fix another's website.
- **Full extensions** came first to Firefox, with deep access to the browser itself, then to Chrome in 2010 with a narrower permission model. A shared API now works across Chrome, Firefox, Edge, and Safari with few changes.

An extension declares itself in a manifest listing the permissions it needs. A background script handles events, and in current versions it is a [[Service Worker]] that the browser starts and stops as needed. **Content scripts** are injected into web pages. They see and change the page's [[Document Object Model]] but run in a separate JavaScript environment, so the page can't tamper with their variables. Because they act with the extension's privileges, content scripts can reach other origins that the page itself could not; see [[Same-Origin Policy]].

Ad blockers are the most popular kind. They use community-maintained filter lists that match request URLs to cancel, and page elements to hide. Blocking requests to tracking and ad networks also makes pages load faster and leak less; see [[Third-Party Script]]. Sites respond with detection scripts and pleas, and filter lists respond to those, in a long arms race. Ignoring ads is what readers do without software; see [[Banner Blindness]]. Installed extensions also change a browser's behavior in detectable ways, which makes them a tracking signal of their own; see [[Browser Fingerprinting]].

The security problem is breadth. A prompt reading "read and change all your data on all websites" means the extension sees every password and bank page. Extensions update silently, and popular ones with many users get bought by new owners who then ship adware or data harvesting; see [[Supply Chain Security]]. Stores review submissions but miss things. Asking for access only when the user clicks the extension, rather than on every site, is the safer pattern; see [[Least Privilege]].

**Manifest V3**, Chrome's extension platform rolled out fully in 2024, replaced the API that let extensions inspect and block each request in code with a declarative list of rules the browser applies itself, capped in number. Google cited speed, privacy, and security. Critics noted that the company sells ads, and the full version of the blocker uBlock Origin stopped working in Chrome. Firefox kept the older blocking API.

## See also
- [[Cross-Site Scripting]]
- [[Browser Engine]]
- [[Content Security Policy]]
- [[Browser DevTools]]
- [[Pop-up Ad]]
