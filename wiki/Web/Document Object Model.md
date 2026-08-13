---
aliases:
  - DOM
tags:
  - web
summary: The live tree of objects a browser builds from a document, and the surface every UI framework writes to.
---
The **Document Object Model** is the in-memory tree a browser constructs from an HTML document, exposed to scripts as objects that can be read and mutated. Changing it changes what is rendered. Every user-interface framework on the web is ultimately a strategy for producing DOM mutations.

Three characteristics drive most practical difficulty.

**It is stateful in ways the source does not describe.** Focus, selection, scroll position, form values, and media playback live in the DOM, not in the markup that produced it. Replacing a subtree destroys all of them, which is why remounting a component silently loses the caret or the scroll offset.

**Reading it can be expensive.** Geometry queries force the browser to complete pending layout work, so interleaving reads and writes produces layout thrashing.

**Text has more than one representation.** The property giving *rendered* text differs from the one giving raw content: a field displayed in uppercase by a style rule reads back as uppercase through one and in its authored case through the other. Saving the wrong one silently rewrites data — see [[contenteditable]].

Frameworks that keep a virtual model of the tree add a fourth: the framework's picture and the real tree can diverge, and any mutation made outside the framework's knowledge will be diffed against a stale model. See [[Hydration]].

## See also
- [[Semantic HTML]]
- [[Portal]]
- [[Accessibility]]
- [[Focus Management]]

## Related
- [[Progressive Enhancement]]
- [[Keyboard Navigation]]
- [[Headless Component]]
