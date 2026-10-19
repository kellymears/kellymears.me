---
aliases:
  - CSS box model
  - box-sizing
  - Margin collapsing
tags:
  - design
summary: The rule that every element on a web page is a rectangle of content wrapped in padding, border, and margin, and the two quirks, box sizing and collapsing margins, behind most surprises in CSS spacing.
---
The **box model** is how CSS describes the space an element occupies. Every element on a web page generates a rectangular box, and every box has four layers, from the inside out:

- **Content.** The text, image, or child elements themselves.
- **Padding.** Space between the content and the border. It takes the element's background color.
- **Border.** A line around the padding, possibly zero width.
- **Margin.** Transparent space outside the border that pushes neighboring boxes away.

Browser developer tools draw this as nested rectangles, which answers most "where did this gap come from" questions. Layout, the step of the [[Critical Rendering Path]] that computes every box's position and size, works entirely in these terms.

**Box sizing** is the first quirk. By default, `width: 200px` sets the width of the *content* only, so adding 20 pixels of padding and a 1-pixel border on each side makes the element 242 pixels wide. That rule, `content-box`, makes it hard to fit elements to a [[Grid System]] or give columns percentage widths that add up to 100. Old versions of Internet Explorer measured width including padding and border, which was technically wrong but easier to reason about. The `box-sizing: border-box` property later made that behavior available everywhere, and most stylesheets now apply it to every element in their first lines.

**Margin collapsing** is the second. When two vertical margins touch, such as the bottom margin of one paragraph and the top margin of the next, they don't add. The larger one wins, so 20 pixels above and 30 below produce 30, not 50. This was designed so text spacing doesn't double. It surprises people in other cases, such as a child's top margin escaping through its parent and pushing the parent down. Margins inside [[Flexbox]] and [[CSS Grid]] containers never collapse, one reason many developers now space elements with the `gap` property rather than margins.

Other rules shape the box:

- **Display type.** Block boxes stack vertically and fill the available width. Inline boxes flow within a line of text and ignore vertical margins and set heights.
- **Outlines and shadows** draw outside the border without taking space, so a focus outline never shifts layout; see [[Focus Management]].
- **Logical properties** such as `margin-inline-start` replace left and right with start and end, so spacing flips correctly for right-to-left languages.

Spacing, in design terms White Space, is mostly decided through padding, margins, and gaps. Design systems usually restrict these to a fixed scale so spacing stays consistent; see [[Design Token]]. Utility-class frameworks expose the same scale as short class names; see [[Utility-First CSS]].

Boxes also determine painting order and overlap: positioned boxes can form a [[Stacking Context]], and the [[Cascade]] decides which box properties apply in the first place.

## See also
- [[Cascading Style Sheets]]
