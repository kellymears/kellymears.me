---
aliases:
  - Hierarchy (design)
  - Visual weight
  - Focal point
  - Squint test
tags:
  - design
summary: Arranging elements so their visual weight matches their importance, telling the eye where to look first, second, and last.
---
**Visual hierarchy** is the ordering of elements on a page or screen by how much attention they draw, so that people notice the most important thing first and the least important last. Every layout has a hierarchy whether or not anyone planned one. The design question is whether the order the eye follows matches the order that matters.

Elements gain *visual weight* through a handful of properties:

- **Size.** Larger things are seen first. A [[Typographic Scale]] gives headings, subheadings, and body text distinct sizes so their ranks are obvious.
- **Contrast.** A dark element on a light page, or a saturated color among muted ones, stands out. Strong [[Color Contrast]] pulls the eye; low contrast pushes things into the background.
- **Weight and style.** Bold text outranks regular, and a single italic word stands out in a paragraph.
- **Position.** In left-to-right languages, readers start at the top left. Things near the top and the left are seen earlier.
- **Space.** An element surrounded by [[White Space]] looks more important than one crowded among others.
- **Grouping.** Items placed close together or styled alike are read as one unit, following the [[Gestalt Principles]], which lets a page have a few big groups rather than dozens of competing items.

A good hierarchy usually has a clear *focal point*, one element that is obviously first, and a small number of levels below it. Common failures run in both directions. When everything is bold, large, or colored, nothing stands out and the page feels loud. When nothing is, the page feels flat and readers can't find their way in.

Designers use a simple check called the *squint test*: blur your eyes, or the screen, until text becomes unreadable, and see which shapes still stand out. Those are what the page says first. Eye-tracking studies show a related pattern on text-heavy web pages, where people scan in a rough F shape, reading the first lines fully and then only the starts of lines further down. Clear headings and front-loaded sentences serve those scanners.

Hierarchy is closely tied to structure. On the web, heading levels in [[Semantic HTML]] should match the visual ranks, so screen-reader users navigating by heading meet the same outline sighted readers see, part of good [[Accessibility]]. A [[Grid System]] gives elements consistent positions, and a [[Design System]] encodes the levels as reusable styles so pages stay consistent.

Strong hierarchy reduces [[Cognitive Load]]: readers don't have to work out what matters, so they can use their [[Selective Attention]] on the content itself. It also supports [[Progressive Disclosure]], keeping secondary options visually quiet until needed. The same tools can be misused, as when a [[Dark Pattern]] makes "Accept all" bright and large while "Reject" is faint gray text.

## See also
- [[Wireframe]]
- [[Banner Blindness]]
- [[Level Design]]
