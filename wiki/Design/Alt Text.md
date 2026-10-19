---
aliases:
  - Alternative text
  - Image description
tags:
  - design
summary: The short text that stands in for an image for people who can't see it, read aloud by screen readers and shown when images fail, which works best when it describes what the image is for rather than what it looks like.
---
**Alt text** is a short written replacement for an image. In HTML it lives in the image element's alt attribute, and it is what a screen reader speaks when it reaches the picture, what appears when the image fails to load, and what search engines read to understand it; see [[Screen Reader]] and [[Semantic HTML]]. Accessibility guidelines require a text alternative for all meaningful non-text content; see [[Accessibility]].

The attribute appeared in the earliest HTML standards in the mid-1990s, when many users browsed with images off or in text-only browsers, so it began as a practical fallback before it became an accessibility requirement.

Good alt text depends on what the image is doing on the page:

- **Informative images** get a description of what they convey in context. A photo of a crowded beach might be "Crowded beach on a holiday weekend" in a story about tourism, and something else entirely in a story about erosion.
- **Functional images**, such as an icon that is the only content of a link or button, describe the action, not the picture: "Search," not "Magnifying glass"; see [[Iconography]].
- **Decorative images** get an empty alt attribute, which tells screen readers to skip them. Leaving the attribute out entirely is worse, since many screen readers then announce the file name.
- **Complex images**, such as charts and diagrams, get a short summary in the alt text and the full information elsewhere on the page, often as a table; see [[Data Table]] and [[Data Visualization]].

Common mistakes:

1. **Starting with "image of."** The screen reader already announces it as an image.
2. **Describing too much.** A paragraph of visual detail slows the listener when one phrase would do.
3. **Repeating the caption.** If adjacent text already says it, the image can be marked decorative.
4. **Keyword stuffing.** Filling alt text with search terms for ranking makes it useless to the people it is for; see [[Search Engine Optimization]].

Testing it means listening to it, with a screen reader on, rather than checking that the attribute exists; see [[Accessibility Testing]].

Social platforms added image description fields from around 2016, and some communities developed norms of describing every image. Platforms also began generating descriptions automatically with image recognition, and modern vision-language models produce much better ones, which helps with the vast number of images posted without any. They still can't know why the author included the picture, which is the part that matters most, so generated text works best as a draft for a person to correct.

Alt text is a standard example of a feature built for disabled users that helps many others, including people on slow connections and anyone searching images by text.

## See also
- [[ARIA]]
- [[HTML]]
