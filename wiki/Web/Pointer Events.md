---
aliases:
  - Touch events
  - Pointer capture
tags:
  - web
summary: The browser's unified model for input from a mouse, a finger, or a pen, delivering one set of events with details such as pressure and contact size, which replaced separate and incompatible mouse and touch event systems.
---
**Pointer events** are the browser's unified way of reporting input from any pointing device: a mouse, a finger on a touchscreen, or a pen. One set of events, such as pointerdown, pointermove, and pointerup, covers all of them, with a property saying which kind of device produced each event.

The web was built for the mouse. Mouse events assumed a single cursor that could hover over things before clicking. When Apple shipped the iPhone in 2007, its browser introduced **touch events**, a separate system reporting each finger as a touch point, with no hover. Pages that wanted to work everywhere had to handle both, and browsers also synthesized mouse events from taps so older pages kept working, which produced duplicate handling and subtle bugs.

Microsoft proposed pointer events for Internet Explorer 10 in 2012, aiming at Windows devices that combined touch, pen, and mouse. The model became a W3C recommendation in 2015. Apple was slow to adopt it, and Safari added support only in 2019, so developers relied on libraries in the meantime.

The events carry more than coordinates. Each pointer has an identifier, so several fingers can be tracked at once for pinching and rotating. Pens report pressure and tilt, which drawing applications use for line weight.

**Pointer capture** solves a common dragging problem. Once a slider's handle is pressed, a fast movement can carry the pointer outside the handle, and events then go to whatever element lies beneath. Capturing the pointer directs all its events to the original element until release, which makes dragging reliable; see [[Direct Manipulation]] and [[Slider]].

Touch input interacts with scrolling. The browser can't know whether a script will cancel a touch to handle it itself, so historically it waited for scripts before scrolling, making pages feel sluggish. The touch-action property lets a page declare in advance which gestures the browser should handle, such as vertical scrolling only, and passive listeners promise not to cancel events, letting scrolling proceed at once. Mobile browsers also once delayed every tap by about 300 milliseconds while waiting to see if a second tap would zoom; pages configured for phone screens no longer pay that delay.

Different devices still need different designs. Fingers are imprecise and cover what they touch, so targets must be larger than for a mouse; see [[Touch Target Size]] and [[Fitts's Law]]. Hover-dependent menus fail on touchscreens, and media queries let pages ask whether the main pointer can hover and how precise it is. Handling events on a parent element rather than each child works the same for every pointer type. Interactions should also work without a pointer at all; see [[Keyboard Navigation]].

## See also
- [[Interaction to Next Paint]]
- [[Responsive Breakpoint]]
- [[Debounce and Throttle]]
