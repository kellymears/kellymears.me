---
aliases:
  - Font loading
  - font-display
tags:
  - web
summary: How custom typefaces are fetched and shown, and why the cost is easy to misattribute.
---
**Web font loading** is the process by which a browser fetches a typeface referenced by a style rule and applies it to text. It is worth understanding precisely because font bytes are large and the cost is easy to attribute to the wrong thing.

The controlling fact is that **a font file is only fetched when some rendered element's computed font family actually matches the declared face.** Declaring a face costs nothing but the rule itself. Binding a class or a custom property that names it costs nothing. Only a match causes a download. This means a claim like "visitors are downloading a font they never see" is frequently false, and the way to know is to measure requests in a real browser rather than reason from the stylesheet.

The visible behaviour while a font is pending is controlled by `font-display`. The choices trade a flash of unstyled text against a flash of *invisible* text; the latter is worse for perceived performance and for [[Core Web Vitals]], since a layout shift lands when the real face arrives.

Two practical notes. Build tools that self-host fonts commonly hash the family name, so any test asserting on a literal family name will fail — assert on the fallback stack instead. And preloading the specific files needed for first paint removes a full round trip from the [[Critical Rendering Path]].

## See also
- [[Critical Rendering Path]]
- [[Typographic Scale]]
- [[Performance Budget]]
- [[Ground Truth]]

## Related
- [[Code Splitting]]
- [[Silent Failure]]
- [[Server-Side Rendering]]
- [[Module Graph]]
