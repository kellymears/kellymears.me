---
aliases:
  - Ellipsis
  - Text overflow
  - Line clamp
tags:
  - design
summary: Cutting text that doesn't fit and marking the cut with an ellipsis, a layout convenience that hides information, breaks in other languages, and needs care to stay accessible.
---
**Text truncation** is cutting off text that doesn't fit its space and marking the cut, usually with an ellipsis (…). It keeps lists, tables, and cards tidy when names, titles, and messages vary wildly in length, at the cost of hiding part of what the text says.

Interfaces truncate in a few ways:

- **End truncation.** The usual form: "Quarterly report for the north…" CSS does this for a single line with `text-overflow: ellipsis`, combined with `overflow: hidden` and `white-space: nowrap`.
- **Multi-line clamping.** Cutting after a set number of lines, common for previews of posts and product descriptions, now done with the `line-clamp` property.
- **Middle truncation.** Keeping both ends, as in "IMG_2041…final_v3.jpg," which suits file names and paths, where the start and the end are the parts that tell items apart. Mac Finder does this by default.
- **Fading.** A gradient over the last line instead of a character, which reads as "there is more" without a hard cut.

The convenience has costs. The words removed are often the ones that distinguish items: a list of documents all starting "Notes from the meeting about…" truncates into identical rows. Before truncating, it is worth asking whether the space could grow, the text could wrap, or the label could be rewritten so its distinctive part comes first; see [[Microcopy]]. Wrapping is often fine, since lines of reasonable length are easy to read; see [[Line Length]].

Truncation also needs a way back to the full text. The common pattern shows it in a [[Tooltip]] on hover, which leaves touchscreen and keyboard users out unless the full text is reachable another way, such as a detail view. A [[Screen Reader]] reads the whole string from the page rather than what's visible, which helps, but a truncated label that is also cut short in the markup loses the information for everyone.

Languages make it harder. German and Finnish words run long, and translated interfaces often grow by a third, so layouts that fit in English start truncating after translation; see [[Internationalization]]. Chinese and Japanese text has no spaces, so line-breaking and clamping rules differ. Cutting a string by counting characters in code is risky: it can split a character made of several code points, such as an accented letter or an emoji with a skin-tone modifier, leaving a broken symbol; see [[Character Encoding]]. Measuring width correctly requires the same [[Text shaping]] the browser uses, which is why truncation is best left to the layout engine rather than done in advance on the server.

Design systems usually standardize truncation per component, with a maximum line count, so tables and cards behave the same everywhere; see [[Design System]].

## See also
- [[Empty State]]
- [[Typeface]]
