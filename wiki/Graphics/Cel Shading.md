---
aliases:
  - Toon shading
  - Non-photorealistic rendering
  - NPR
tags:
  - graphics
summary: Rendering 3D scenes to look hand-drawn by snapping smooth lighting into a few flat bands and drawing ink outlines around shapes.
---
**Cel shading**, or toon shading, renders 3D geometry so it looks like a hand-drawn cartoon. The name comes from the transparent celluloid sheets of traditional animation, where characters were painted in flat colors with a single shadow tone. It is the best-known branch of *non-photorealistic rendering* (NPR), the part of graphics that deliberately aims away from photographic realism toward ink, paint, or print.

Two techniques do most of the work.

- **Banded lighting.** Ordinary diffuse lighting fades smoothly from lit to dark as a surface turns away from the light. A cel [[Shader]] computes the same value and then quantizes it, usually by looking it up in a small *ramp texture* that maps the smooth gradient to two or three flat tones. Artists control the look by painting the ramp, not by tuning physical parameters.
- **Outlines.** The oldest trick is the *inverted hull*: draw a slightly inflated copy of the [[Polygon Mesh]] in black with its front faces culled, so only a rim shows around the silhouette. The other approach is a [[Post-Processing]] pass that runs edge detection, a form of [[Convolution]], over the [[Depth Buffer]] and surface normals, drawing lines wherever depth or orientation jumps.

A [[Fresnel Effect]] term often adds a bright rim light along silhouettes, and specular highlights become hard-edged shapes instead of soft blobs.

The style became famous in games with *Jet Set Radio* (2000) and *The Legend of Zelda: The Wind Waker* (2002), whose flat colors have aged far better than most realistic games of that era. *Borderlands* (2009) added heavy inked lines, and *Ōkami* (2006) imitated sumi-e brush painting.

The most careful work treats the rules of drawing as data. Arc System Works' *Guilty Gear Xrd* (2014) famously edited vertex normals by hand so that shadows fall where an illustrator would put them, not where geometry says, and animated characters on held frames rather than smooth interpolation, because anime is drawn at a lower frame rate. *Spider-Man: Into the Spider-Verse* (2018) used the same idea on film, animating mostly "on twos" and adding halftone dots and misregistered print color.

That is the general lesson of NPR. Realism has an objective target, the way light behaves, so [[Physically Based Rendering]] can be judged against measurement. A stylized look has only an artistic target, so its parameters are artist-facing controls, and the effort shifts from simulating physics to encoding taste. Good stylization also needs consistency across the frame: banding, [[Dithering]], and [[Tone Mapping]] choices must agree, or the image looks like several styles stitched together.

## See also
- [[Physically Based Rendering]]
- [[Post-Processing]]
- [[Dithering]]
- [[Color Quantization]]
- [[Shading Model]]
- [[Pixel Art]]
