---
aliases:
  - URL slug
  - Slugify
tags:
  - data
summary: The short, readable, hyphenated part of a URL that names a page, borrowed from newsroom jargon, simple to generate and surprisingly hard to keep stable once other people link to it.
---
A **slug** is the human-readable part of a web address that identifies a particular page, such as the words "how-to-bake-bread" at the end of a recipe's address. Slugs make addresses easier to read, share, and remember, and they hint at a page's content before anyone clicks; see [[URL]].

The word comes from newspapers. In a newsroom, a slug is the short working name given to a story while it moves through editing and layout, such as "fire" or "council-vote," distinct from the headline readers eventually see. Content management systems borrowed the term for the page name in an address; see [[WordPress]].

Making a slug from a title, often called slugifying, usually involves a few steps:

- lowercasing the text;
- replacing spaces and punctuation with hyphens;
- converting accented and non-Latin characters to plain letters, or keeping them with percent-encoding; see [[Character Encoding]] and [[Internationalized Domain Name]];
- dropping very short words like "a" and "the," and trimming long titles;
- adding a number when two pages would get the same slug.

Each step involves choices. Transliteration rules differ by language: German speakers expect "ü" to become "ue," while a generic tool may produce "u." Two titles that differ only in punctuation can collide. Stripping characters can turn a meaningful title into nonsense, or into something rude.

The harder problem is change. A slug feels like a label, so people want to fix it when a title is edited, but it's also an address that other sites, bookmarks, and search engines have recorded. Changing it breaks those links unless the old address redirects to the new one; see [[Link Rot]] and [[HTTP Status Code]]. Tim Berners-Lee's 1998 essay "Cool URIs don't change" argued that addresses should be designed to last, which means leaving out details likely to change, such as file extensions, technology names, and sometimes even topics.

Many sites resolve the tension by putting a permanent numeric or random identifier in the address alongside the slug. The identifier finds the page, and the slug is decorative. If the slug is wrong or out of date, the site redirects to the current one; see [[Persistent Identifier]] and [[Universally Unique Identifier]].

Slugs carry modest weight for search engines, mostly through the words they show in results, and sites still debate dates in addresses, which signal freshness but make evergreen pages look stale; see [[Search Engine Optimization]]. Where several addresses lead to the same page, a site can name the preferred one; see [[Canonical URL]].

Static sites often derive slugs from file names or set them in each page's metadata; see [[Frontmatter]] and [[Static Site Generation]]. Picking a slug is a small act of naming, with the same trade-off between clarity and permanence; see [[Naming]].

## See also
- [[Personal Name]]
- [[Hashtag]]
