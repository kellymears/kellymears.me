---
aliases:
  - Custom Elements
tags:
  - web
summary: A set of browser-native APIs for building reusable, encapsulated HTML elements without a framework.
---
**Web Components** is a set of browser-native APIs — Custom Elements, Shadow DOM, and HTML Templates — for defining a reusable element with its own behavior and encapsulated styling, usable in any page with plain HTML, no framework or build step required. `<my-tooltip>` becomes a real, standards-defined element the moment its class is registered with `customElements.define`, and any page can drop it in the same way it drops in a `<button>`.

Custom Elements supply the lifecycle hooks — `connectedCallback`, `attributeChangedCallback` — that let an element react to being inserted into the page or having an attribute change, which is the behavioral half of the API. [[Shadow DOM]] supplies the encapsulation half: a subtree and stylesheet that the rest of the page's CSS can't reach into and that can't leak out, solving the "my component's styles collided with the host page's" problem structurally rather than through naming convention.

The pitch is framework independence: a Web Component built once works inside React, Vue, a plain static site, or a CMS with no adapter layer, because it's just an HTML element as far as the browser and every consumer is concerned. This makes it attractive for design systems and embeddable widgets meant to survive outliving any one framework's popularity — a real, if narrower, concern than it sounds, given how many teams have rewritten a component library once already for a framework migration.

The practical friction is that most application frameworks bring their own, more ergonomic component model — [[React Server Components]] or a Vue single-file component — and reaching for native Web Components inside one of those means giving up that framework's own state and reactivity conveniences in exchange for standards compliance most teams don't end up needing.

## See also
- [[Shadow DOM]]
- [[Virtual DOM]]
- [[Document Object Model]]
- [[Islands Architecture]]

## Related
- [[Progressive Enhancement]]
