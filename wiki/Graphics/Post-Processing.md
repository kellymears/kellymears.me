---
aliases:
  - Post-processing effects
  - Bloom
  - Color grading
  - LUT
  - Depth of field
  - Chromatic aberration
  - Film grain
tags:
  - graphics
summary: Effects applied to a rendered frame after the 3D scene is drawn, from bloom and depth of field to color grading, and why players often turn them off.
---
**Post-processing** is the set of effects a renderer applies to an image after drawing the 3D scene, treating the frame as a 2D picture. Each effect is a full-screen [[Shader]] pass that reads one or more buffers, such as color, depth, and per-pixel motion, and writes a modified image. Because the cost depends on the number of pixels rather than how complex the scene is, post-processing is a cheap way to make a game look cinematic, and [[Deferred Shading]] made the needed buffers readily available.

A typical chain, roughly in order:

- **Screen-space [[Ambient Occlusion]]** darkens creases and contact points using the depth buffer.
- **Screen-space reflections** reuse what's already on screen to fake reflections on shiny floors, failing when the reflected object is off screen.
- **Depth of field** blurs pixels by their distance from a focal plane, read from the [[Depth Buffer]], imitating a camera lens.
- **[[Motion Blur]]** smears pixels along their motion vectors.
- **Bloom** finds very bright areas, blurs them, and adds them back, so lights glow. It only works well with [[High Dynamic Range]] values, where a light can be far brighter than white.
- **[[Tone Mapping]]** compresses the high-dynamic-range image into the display's range.
- **Color grading** shifts hues and contrast for mood, usually through a *lookup table* (LUT), a small 3D grid mapping every input color to an output color, built in the same tools film colorists use.
- **Anti-aliasing and upscaling** smooth edges and reconstruct resolution, as described under [[Aliasing]] and [[Temporal Upscaling]].
- **Lens imitations** such as vignetting, film grain, and chromatic aberration, the colored fringes of a cheap lens.

Order matters. Bloom must happen before tone mapping, film grain after upscaling so it isn't smeared, and the user interface is drawn last so text stays sharp and unaffected.

The lens effects are the most disputed. They imitate flaws that camera makers spend fortunes eliminating, and many players switch off motion blur, depth of field, chromatic aberration, and grain on principle. Some have practical reasons. Motion blur and heavy camera effects can trigger motion sickness in players with sensitive [[Vestibular System|vestibular systems]], which is why accessibility guidelines recommend letting players disable them.

Post-processing also explains some artifacts. Screen-space effects can use only what's visible, so reflections vanish and shadows flicker as objects leave the screen; [[Ray Tracing]] fixes this by using the full scene, at greater cost. Blurs for bloom and depth of field are built from repeated [[Convolution]] passes at reduced resolution to keep them fast.

The same pipeline exists outside games. Photo editors, video color grading, and phone cameras apply comparable chains, and [[Dithering]] at the very end hides banding when the final image is reduced to the display's bit depth.

## See also
- [[Cel Shading]]
- [[Volumetric Lighting]]
