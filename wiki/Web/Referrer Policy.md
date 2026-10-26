---
aliases:
  - Referer header
  - Referer
tags:
  - web
summary: The rules for when a browser tells a site which page a visitor came from, a header misspelled in the 1990s that leaked private addresses for decades until browsers began trimming it by default.
---
**The referrer** is the address of the page a visitor came from. When you click a link or a page loads an image or script, the browser usually sends the previous page's address along with the request, in a header spelled **Referer**. The misspelling comes from the HTTP specification of the mid-1990s and was never corrected, because changing it would break every server that reads it; see [[Backward Compatibility]]. Newer additions use the correct spelling, so both now exist.

Sites use it for several things:

- **Analytics**: which links, campaigns, and search engines send traffic; see [[Web Analytics]].
- **Blocking embeds**: refusing images requested by other sites; see [[Hotlinking]].
- **Security checks**: confirming that a form submission came from the site's own pages, one defense against forged requests; see [[Cross-Site Request Forgery]].

The trouble is that a full [[URL]] can contain private information. Addresses carry search terms, account numbers, password reset tokens, and session identifiers, and the header sent all of it to whatever site a page linked to or loaded scripts from. In 2015 reporters found that a United States government health insurance site was passing [[Personal Data|personal details]] such as age, income, and pregnancy status to advertising and analytics companies through addresses and referrers. Tokens in addresses can leak the same way; see [[Session Management]].

Search engines changed the picture for marketers. In 2011 Google began hiding search terms from the referrer for signed-in users, and later for everyone, so the analytics reports used for [[Search Engine Optimization]] filled with the label "not provided".

The **Referrer-Policy** header, standardized by the W3C in the 2010s, lets a site decide what to send. The common settings are:

- **no-referrer**, which sends nothing;
- **origin**, which sends only the site's domain, not the path;
- **strict-origin-when-cross-origin**, which sends the full address within the same site, only the domain to other sites, and nothing when moving from a secure page to an insecure one.

Around 2020, the major browsers made that last setting the default, so most cross-site requests now reveal only the domain. Individual links can also opt out with a noreferrer attribute.

Moving from a secure page to an insecure one has dropped the header for decades, so sites that wanted referral data from secure pages had a reason to move to encrypted connections themselves.

Because the header was never reliable, relying on it alone for security is a mistake. Some browsers, extensions, and privacy tools strip it, and a page that redirects through another address changes it; see [[Open Redirect]]. Sites that need to know where traffic came from now often add campaign tags to their own links instead of relying on the header.

## See also
- [[Same-Origin Policy]]
- [[HTTP Cookie]]
- [[Content Security Policy]]
