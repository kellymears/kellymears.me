---
aliases:
  - Touch target
  - Tap target
  - Target size
  - Hit area
  - Fat finger problem
tags:
  - design
summary: How large a tappable element needs to be for fingers to hit it reliably, roughly 44 to 48 points, and why the visible icon can be smaller than the area that responds.
---
**Touch target size** is the area of the screen that responds when someone taps an interactive element. A finger is far less precise than a mouse pointer: it is wide, it hides the thing it is touching, and people often tap while walking or holding a phone in one hand. Targets that are too small or too close together lead to missed taps and taps on the wrong thing, sometimes called the *fat finger problem*.

Research at MIT's Touch Lab found the average adult fingertip to be about 8 to 10 millimeters wide and the finger pad 10 to 14 millimeters. Platform guidelines translate this into minimums:

- **Apple** recommends targets at least 44 by 44 points.
- **Google's Material Design** recommends at least 48 by 48 density-independent pixels, about 9 millimeters.
- **The Web Content Accessibility Guidelines** set a minimum of 24 by 24 CSS pixels in version 2.2, with an exception when undersized targets have enough space around them, and recommend 44 by 44 at the strictest level.

The visible element doesn't have to be that big. A 24-pixel icon can sit inside a 48-pixel tappable area, using padding or an invisible extended hit area. What matters is the area that responds, and the spacing between neighbors, since two adequate targets touching each other still cause errors.

[[Fitts's Law]] explains the underlying relationship: the time to hit a target grows as targets get smaller and farther away. On touch screens, accuracy matters as much as speed, and a mistap can be costly when it deletes something or follows the wrong link.

Position matters too. Steven Hoober's 2013 observations of people using phones in public found that about half held them in one hand and tapped with a thumb. The thumb reaches the middle and bottom of the screen easily and the top corners poorly, which is why many apps moved primary navigation to the bottom of the screen as phones grew larger.

On the web, the `pointer: coarse` media query detects touch-first devices, letting a layout enlarge targets where needed, alongside changes at each [[Responsive Breakpoint]]. Generous [[White Space]] between targets helps as much as size itself. Targets must also be discoverable: a clear [[Affordance]] tells people something is tappable, which flat icon-only designs sometimes fail to do.

Small targets are an [[Accessibility]] issue for people with tremors, limited dexterity, or low vision, and for older users, but they frustrate everyone. Small targets also show up in deliberately hostile design, as when a [[Dark Pattern]] makes the close button on an advertisement a tiny, faint X. The same sizing thinking applies beyond touch: large click targets help mouse users, and [[Keyboard Navigation]] needs clearly visible focus on each target, as part of good [[Focus Management]].

## See also
- [[Tooltip]]
- [[Accessibility]]
- [[Toggle Switch]]
- [[Affordance]]
- [[Hamburger Menu]]
- [[Signifier]]
