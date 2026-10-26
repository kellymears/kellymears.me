---
aliases:
  - CSS
  - Style sheet
  - CSS Zen Garden
tags:
  - web
summary: The language that describes how web pages look, proposed in 1994 to separate presentation from structure, nearly sunk by inconsistent browser support, and grown since into a layout and animation system that does work once reserved for scripts.
---
**Cascading Style Sheets**, or CSS, is the language for describing how a web page looks: colors, fonts, spacing and layout. A style sheet is a list of rules, each pairing a selector, which picks out elements, with declarations such as a color or a width. The page's [[HTML]] says what things are; CSS says how they appear.

Early HTML had no such separation. Authors controlled appearance with tags in the markup itself, such as font tags for type and tables for layout, with invisible spacer images propping columns apart. Every page repeated its styling, and changing a site's look meant editing every file. Håkon Wium Lie proposed style sheets in 1994 while at CERN, working with Bert Bos, and CSS level 1 became a W3C recommendation in December 1996. Internet Explorer 3, released that year, was the first major browser to support it, though only in part.

The word cascading is the central idea. Rules can come from the browser's defaults, the site and the reader, and several can apply to one element at once. A defined order of precedence, the [[Cascade]], decides which wins, so styles layer instead of colliding.

Adoption was slow and painful. Browsers implemented CSS partially and inconsistently during the browser wars, and pages that looked right in one were broken in another. Browsers kept compatibility modes to render old pages by old rules. A celebrated 2003 site, the CSS Zen Garden, served one HTML document with dozens of contributed style sheets that each made it look completely different, persuading many designers that table layouts could go. Test pages like Acid2 later pushed browsers toward agreement.

Layout was the weak point for years. Elements were sized by the [[Box Model]], and multi-column designs relied on floating elements sideways, a feature intended for wrapping text around images. Purpose-built systems arrived in the 2010s: [[Flexbox]] for arranging items along a line and [[CSS Grid]] for two-dimensional layouts. Media queries let one page adapt to many screens.

After CSS2, the language was split into separately versioned modules, so features could ship independently. Recent additions include variables, nesting, a selector that styles an element based on what it contains, and [[Container Query|queries]] that respond to a component's own container.

The language's gaps prompted many tools. Preprocessors added variables and nesting long before CSS did, and some teams moved styles into JavaScript components ([[CSS-in-JS]]) or composed pages from small single-purpose classes ([[Utility-First CSS]]). Style sheets also affect performance, since a browser usually waits for them before drawing a page; see [[Critical Rendering Path]].

## See also
- [[Design Token]]
- [[Utility-First CSS]]
- [[CSS Custom Property]]
