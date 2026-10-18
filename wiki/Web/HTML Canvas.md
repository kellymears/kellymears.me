---
aliases:
  - Canvas
  - Canvas API
  - Canvas element
  - OffscreenCanvas
tags:
  - web
summary: A bitmap drawing surface in the page that JavaScript paints pixel by pixel, fast for thousands of shapes but invisible to the DOM, search, and assistive technology.
---
The **HTML canvas** is a rectangle of pixels on a web page that JavaScript draws into. The `<canvas>` element provides the surface, and a *context* provides the drawing commands: the 2D context offers lines, shapes, curves, text, images, and gradients, while WebGL and [[WebGPU]] contexts drive the graphics card directly. Apple introduced canvas in 2004 for Dashboard widgets in Safari, and it became part of HTML5.

Canvas is **immediate mode**. When code draws a circle, the circle becomes pixels and the browser forgets it ever existed. There is no object to move, restyle, or click; to change anything, the code clears the canvas and redraws, usually every frame in a loop driven by [[requestAnimationFrame]]. SVG, described under [[Vector Graphics]], is the opposite, *retained mode*: each shape is an element in the [[Document Object Model]] that the browser tracks, styles, and redraws itself.

The trade-off decides which to use:

- **Element count.** SVG slows down with thousands of nodes, since each carries DOM and style overhead. Canvas cost depends on pixels and draw commands, so it handles tens of thousands of shapes, particles, or data points.
- **Interaction.** SVG elements receive clicks and hovers directly. On canvas, the code must work out what is under the pointer itself.
- **Text and layout.** SVG and HTML lay out and wrap text. Canvas draws text at given coordinates and leaves wrapping to the programmer.
- **Payload.** A complex SVG ships every shape as markup, while a canvas ships only the code that draws it.

Canvas suits charts with many points, games, image editors, data visualizations, and design tools. Figma renders its editor on a GPU canvas, and Google Docs moved its document rendering to canvas in 2021 for consistency and speed.

The costs are real:

- **Accessibility.** Canvas content is a picture to assistive technology. Text inside it can't be selected, searched, or read by screen readers unless the page provides fallback content or [[ARIA]] descriptions alongside.
- **Sharpness.** A canvas sized in CSS pixels looks blurry on high-density screens unless its backing store is scaled by `devicePixelRatio`.
- **Theming.** Colors drawn into pixels don't follow CSS changes, so code must re-read them and redraw when the theme switches.

Canvas also exposes pixels for reading. `getImageData` returns raw RGBA values for filters and image processing. To stop pages stealing data, drawing a cross-origin image without [[Cross-Origin Resource Sharing]] permission *taints* the canvas and blocks reading it back. Small rendering differences between machines make canvas output a classic browser fingerprinting signal, which some browsers now add noise to.

**OffscreenCanvas** lets a [[Web Worker]] draw off the main thread, keeping heavy rendering from blocking input. Each draw command has overhead much like a GPU [[Draw Call]], so batching paths matters for performance.

## See also
- [[Adobe Flash]]
- [[WebGPU]]
- [[requestAnimationFrame]]
- [[Encrypted Media Extensions]]
- [[Browser Fingerprinting]]
