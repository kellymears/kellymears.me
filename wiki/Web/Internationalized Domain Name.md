---
aliases:
  - IDN
  - Punycode
  - IDNA
tags:
  - web
summary: Domain names written in non-Latin scripts and accented letters, made to work in an ASCII-only DNS by encoding them as xn-- strings, and the browser rules that decide when to show the real characters and when to show the code to block lookalike attacks.
---
An **internationalized domain name**, or IDN, is a web address containing characters beyond the basic Latin letters, digits, and hyphen: accented letters, Arabic, Chinese, Cyrillic, Devanagari, and other scripts. Most of the world's people don't write in the Latin alphabet, yet for the internet's first decades every domain had to be spelled in it; see [[Domain Name System]].

Changing the DNS itself to accept every script would have required updating software on every server and network, so the solution, standardized in 2003 and revised in 2008, works around it. Names are converted to plain ASCII before they reach the DNS and converted back only for display. The encoding, called **Punycode**, turns a Unicode label into a string of permitted characters with the prefix "xn--" to mark it. A German domain for books, "bücher," travels as "xn--bcher-kva"; see [[Character Encoding]] and [[URL]].

The conversion also normalizes names, mapping case and equivalent character forms to one canonical version so the same name can't be registered twice under different spellings, and IDNA2008 forbids many symbols outright, including emoji, though a few registries still allow emoji domains; see [[Emoji]].

Internationalized top-level domains followed. In 2010 the first country codes in non-Latin scripts went live, beginning with Arabic-script domains for Egypt, Saudi Arabia, and the United Arab Emirates, and Russia's Cyrillic ".рф" registered hundreds of thousands of names within its first year. Generic top-level domains in many scripts were added later.

The main problem is that different scripts contain letters that look identical. Cyrillic "а" and Latin "a" are different characters that render the same, so an attacker can register a name that displays exactly like a well-known brand's. In 2017 a researcher showed a domain spelled entirely in Cyrillic that Chrome and Firefox displayed as "apple.com"; see [[Phishing]]. Browsers now decide per name whether to show the Unicode form or the raw "xn--" code, showing the code when a name mixes scripts in suspicious ways, uses letters confusable with another script throughout, or uses scripts unrelated to the user's languages. The rules shift with each new attack.

Support remains uneven beyond the browser. Many web forms reject addresses with non-ASCII characters, and email addresses with international characters in the part before the @ need additional standards that many mail systems still don't support; see [[Simple Mail Transfer Protocol]]. Certificates, cookies, and security policies all operate on the ASCII form, so developers must handle both; see [[HTTP Cookie]] and [[Same-Origin Policy]].

IDNs are a case of a global system extended without replacing its foundations, compatible with the old infrastructure at the cost of a lasting translation layer; see [[Path Dependence]] and [[Web Standards]].

## See also
- [[Browser Fingerprinting]]
- [[Open Redirect]]
- [[Top-Level Domain]]
