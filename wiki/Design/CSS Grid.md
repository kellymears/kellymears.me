---
aliases:
  - Grid layout
  - CSS Grid Layout
  - Subgrid
tags:
  - design
summary: The CSS layout mode for rows and columns at once, which brought the designer's layout grid into the browser and lets responsive layouts adapt with no breakpoints at all.
---
**CSS Grid** lays out elements in rows and columns at the same time. Where [[Flexbox]] arranges items along one line, grid defines a two-dimensional structure first and then places items into it. It shipped in all major browsers within a few weeks of each other in March 2017, an unusually coordinated release, and finally gave the web the kind of layout grid print designers had used for decades; see [[Grid System]] and [[Swiss Style]].

A grid container defines its *tracks*:

- `grid-template-columns: 200px 1fr 1fr` makes a fixed sidebar and two equal flexible columns. The `fr` unit means a fraction of the remaining space.
- `grid-template-rows` does the same vertically.
- `gap` sets the gutters.

Items flow into cells automatically, or can be placed explicitly by line number or by name. **Named areas** let a layout be drawn almost as text:

`grid-template-areas: "header header" "nav main" "footer footer"`

Each child then declares which area it occupies. Rearranging the page for a narrow screen means redrawing that map, not touching the markup.

Grid's most useful trick is responsive layout without breakpoints. `repeat(auto-fill, minmax(240px, 1fr))` means "as many columns as fit, each at least 240 pixels, sharing extra space equally." A card gallery then shows one column on a phone and five on a wide monitor with no [[Responsive Breakpoint]] at all. Combined with [[Container Query]], components adapt to the space they're given rather than to the window.

**Subgrid**, widely supported since 2023, lets a nested element adopt its parent's tracks. Cards in a row can then align their titles, bodies, and buttons across cards even when content lengths differ, a problem that previously needed fixed heights or JavaScript.

Things to watch:

- **Source order.** Placing items anywhere on the grid can make the visual order differ from the document order, which confuses keyboard and screen reader users; see [[Keyboard Navigation]].
- **Implicit tracks.** Items placed beyond the defined grid create extra rows or columns automatically, sized by separate rules that often surprise people.
- **Overflow.** A `1fr` track has a minimum of its content's size by default, so a long unbroken string can blow out a column; `minmax(0, 1fr)` prevents it.

The common rule of thumb is that grid works *layout-in*: you design the structure and items fill it. Flexbox works *content-out*: items' sizes shape the result. Page scaffolding, dashboards, galleries, and forms with aligned labels suit grid; toolbars and button rows suit flexbox. Both rely on the same [[Box Model]] underneath.

Grids also support visual order beyond layout. Aligning elements to shared lines is one of the strongest grouping cues in [[Gestalt Principles]], and repeated consistent grids are how [[Small Multiples]] stay comparable.

## See also
- [[Masonry Layout]]
- [[White Space]]
- [[Tiling Window Manager]]
- [[Responsive Web Design]]
- [[Data Table]]
- [[Bento Grid]]
