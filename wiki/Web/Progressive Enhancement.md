---
aliases:
  - Graceful degradation
tags:
  - web
summary: Building so the core experience works without scripts, with richer behaviour layered on top.
---
**Progressive enhancement** is the practice of delivering a functional baseline in HTML and CSS, then layering scripted behaviour on top for environments that support it. The order matters: the baseline is the product, and enhancement is optional.

It is not primarily about people who disable JavaScript. It is about the far more common cases where scripts have not arrived yet, failed to load, threw an error, or are blocked — and about crawlers, link previewers, and assistive technology, none of which are guaranteed to execute anything.

Modern CSS has made the pattern more attractive by moving capabilities that once required scripts into the platform: disclosure widgets via native elements, scroll-driven animation via CSS timelines, container-relative layout, and view transitions. Each is a case where the no-script path is not a degraded fallback but simply the implementation.

The design constraint it imposes is real and worth stating. An entrance animation that starts at zero opacity and is revealed by script means that without script the content is *invisible* — the enhancement became load-bearing. For any surface that must render without JavaScript, animation has to be limited to interaction rather than entrance, or the baseline is broken. See [[Motion Design]] and [[Islands Architecture]].

## See also
- [[Semantic HTML]]
- [[Server-Side Rendering]]
- [[Accessibility]]
- [[Hydration]]

## Related
- [[React Server Components]]
- [[Document Object Model]]
- [[Static Site Generation]]
