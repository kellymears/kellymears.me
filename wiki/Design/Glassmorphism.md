---
aliases:
  - Frosted glass
  - Backdrop blur
tags:
  - design
summary: An interface style of translucent, blurred panels that let the content behind them show through like frosted glass, recurring across operating systems since the 2000s and repeatedly criticized for hurting legibility.
---
**Glassmorphism** is a visual style in which interface panels look like frosted glass. Whatever lies behind a panel shows through it, blurred and usually tinted, so menus, sidebars, and dialogs appear to float in layers above the content beneath them. The name was coined around 2020, by analogy with [[Skeuomorphism]] and the short-lived neumorphism, but the look is older.

Windows Vista introduced translucent glass window frames in 2007. Apple's iOS 7, in 2013, replaced textured skeuomorphic surfaces with flat colors and blurred translucent layers, so panels sliding over a photo picked up its colors. Apple's desktop redesign in 2020 extended the style, and in 2025 Apple introduced a far more pronounced version across its platforms, with panels that refract and distort what's beneath them, which drew immediate complaints about readability.

The appeal comes from depth. Blur suggests distance, and seeing what lies behind a panel keeps the user oriented: a menu still shows the page it came from, so the interface seems to have physical layers.

The problems are equally consistent:

- **Contrast.** Text on a translucent panel sits on a background that changes with whatever scrolls behind it. Light text that reads well over a dark photo vanishes over a white page; see [[Color Contrast]].
- **Noise.** Blur reduces but doesn't remove the busyness of what's behind. Stronger blur and opaque tints restore legibility at the cost of the effect itself.
- **Accessibility.** Operating systems offer settings to reduce transparency, and well-built interfaces fall back to solid backgrounds when it's set; see [[Accessibility]].

Designers working in the style typically add a semi-opaque tint, a thin light border to separate the panel's edge from busy backgrounds, and sometimes a faint grain texture.

Technically, the effect is expensive. To blur what's behind an element, the renderer must first draw everything beneath it, then sample and average many nearby pixels for each pixel of the panel, and redo the work whenever anything underneath moves, all of it falling to the [[Compositor]]. Browsers support it through a CSS backdrop filter, which creates a new stacking context and can complicate layering; see [[Stacking Context]]. Modern [[Graphics Processing Unit|GPUs]] handle it well, but it remains a measurable cost in battery and frame time.

Real frosted glass scatters light at a roughened surface, so the transmitted image loses fine detail while keeping its color and brightness. The interface version imitates that result through blending; see [[Alpha Compositing]].

The style follows a pattern visible across interface history: a reaction against flatness brings back depth, and a reaction against excess depth flattens things again. Each swing tends to begin with an effect and end with the legibility fixes the effect required.

## See also
- [[Dark Mode]]
