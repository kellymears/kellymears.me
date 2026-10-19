---
aliases:
  - Image scaling
  - Resampling
  - Nearest-neighbor interpolation
  - Bilinear interpolation
  - Bicubic interpolation
  - Lanczos resampling
  - Integer scaling
tags:
  - graphics
summary: Computing new pixel values when an image changes size, and the tradeoffs between blocky, blurry, sharp, and ringing filters.
---
**Image resampling** is computing a new grid of pixels from an existing one, as when an image is scaled up or down, rotated, or displayed at a size other than its native resolution. The new pixels fall between the old ones, so their values have to be estimated. In signal-processing terms, the image is a set of samples, and resampling means reconstructing the underlying picture and sampling it again, which brings in all the hazards of [[Aliasing]].

The common filters trade sharpness against artifacts:

- **Nearest neighbor** copies the closest original pixel. It's fast and keeps hard edges, but looks blocky when enlarged, and at non-integer scales some pixels become wider than others.
- **Bilinear** blends the four nearest pixels. It's smooth but blurry, and GPUs do it in hardware.
- **Bicubic** fits curves through the nearest 16 pixels, giving sharper results with slight halos at edges. It's the default in many photo editors.
- **Lanczos** uses a windowed sinc function, the theoretically ideal reconstruction filter cut to a finite size. It's the sharpest of the common choices but produces *ringing*, faint ripples beside high-contrast edges.

Each of these is a weighted sum of nearby pixels, a [[Convolution]] with a kernel shaped by the filter.

**Downscaling** has its own problem. Picking every second or fourth pixel discards detail unevenly and creates moiré patterns and shimmer. A correct downscale first blurs away detail finer than the new pixel grid can represent, then samples. Real-time graphics precompute these blurred copies of textures, as described under [[Mipmapping]].

Two less obvious rules matter for quality. Filtering should happen in linear light, not on gamma-encoded values, or fine bright details like stars or text come out too dark after shrinking; see [[Gamma Correction]]. And images with transparency should be filtered with premultiplied alpha so hidden colors don't bleed into edges, as described under [[Alpha Compositing]].

Displays resample constantly. A desktop at 150 percent scaling either renders at that size directly or renders larger and shrinks, slightly softening everything. Retro games and pixel art look best with **integer scaling**, enlarging each pixel to an exact block, which is why [[Emulation]] front ends offer it alongside filters that imitate CRT screens. Video players upsample the color channels stored at lower resolution, as described under [[Chroma Subsampling]].

Modern upscalers go beyond fixed filters. Machine-learning *super-resolution* models infer plausible detail from training data, and game upscalers such as DLSS and FSR also use detail gathered from previous frames, as described under [[Temporal Upscaling]]. These can look sharper than the source but can also invent detail that wasn't there.

On the web, the best resampling is often none: serving each device an image already sized for it, as described under [[Responsive Images]], avoids both wasted bandwidth and the browser's own scaling.

## See also
- [[Seam Carving]]
- [[Favicon]]
- [[Aspect Ratio]]
- [[Interlacing]]
