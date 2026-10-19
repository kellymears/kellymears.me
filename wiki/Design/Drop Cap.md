---
aliases:
  - Initial
  - Raised cap
tags:
  - design
summary: An enlarged first letter that marks the start of a chapter or article, inherited from medieval manuscripts, hard to align well, and given a dedicated CSS property only recently.
---
**A drop cap** is an enlarged first letter at the start of a chapter, article, or section, set so that it drops down beside several lines of text. Typographers call it an initial. Its job is to mark a beginning and invite the reader in, giving the eye a clear entry point to a page of text; see [[Visual Hierarchy]].

The tradition comes from manuscripts. Medieval scribes left space at the start of sections for a decorated initial, which a separate artist painted, sometimes with gold leaf and elaborate scenes inside the letter. Early printers copied the look. Some copies of the Gutenberg Bible from the 1450s have initials painted in by hand after printing, in spaces the type left blank. Later printers cut large ornamental initials as type or woodblocks.

There are three main kinds:

- **Dropped**, sunk into the text, with its top aligned to the first line and its base sitting on a later line.
- **Raised**, sitting on the first line's baseline and rising above the paragraph.
- **Adjacent**, set in the margin beside the text.

A good drop cap takes careful alignment. Its top should line up with the top of the first line's capital letters, and its bottom with the baseline of the line it reaches, usually the third. Letters like A, L, T, and W leave awkward gaps beside the text, and setting them well means adjusting the space by eye; see [[Kerning]] and [[Optical Alignment]]. An opening quotation mark poses a problem too, and is often dropped or hung in the margin. The rest of the first word, or the first line, is often set in small capitals to bridge the large letter and the text size; see [[OpenType Features]].

On the web, drop caps were long made with a floated, enlarged first letter, which lined up differently depending on the font and browser. CSS added an initial-letter property that sizes and aligns the letter to a given number of lines. Safari supported it with a prefix for years; Chrome added it in 2023, and support elsewhere has lagged, so sites often treat it as an enhancement; see [[Progressive Enhancement]].

Splitting the first letter into its own element or replacing it with an image can make a [[Screen Reader]] announce the letter separately from the rest of the word. Styling the existing text keeps the word intact; see [[Semantic HTML]].

Drop caps work best at the start of long text in a generous layout. They look odd in short paragraphs that end before the initial does, and repeated on every paragraph they lose their signal; see [[White Space]]. Their size should relate to the text through the layout's scale; see [[Typographic Scale]] and [[Typeface]].

## See also
- [[Text Justification]]
- [[Movable Type]]
- [[Arts and Crafts Movement]]
- [[Blackletter]]
- [[Calligraphy]]
