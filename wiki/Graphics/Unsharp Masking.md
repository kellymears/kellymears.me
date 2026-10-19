---
aliases:
  - Unsharp mask
  - Edge enhancement
  - Contrast adaptive sharpening
tags:
  - graphics
summary: A sharpening method that subtracts a blurred copy of an image from the original to find and exaggerate its edges, invented in the photographic darkroom and now built into nearly every camera, editor and upscaler, along with the halos it leaves when overdone.
---
**Unsharp masking** sharpens an image by comparing it with a blurred version of itself. The difference between the two contains only fine detail and edges, since blurring removes those and leaves broad tones alone. Adding a scaled amount of that difference back to the original strengthens the edges. Despite the name, the "unsharp mask" is the blurred copy, not the result.

The method comes from film. Darkroom workers made a faint, deliberately out-of-focus positive copy of a negative and sandwiched it with the negative while printing. The blurred positive cancelled some of the broad density of the negative but none of its fine detail, so edges stood out more strongly in the print. It was used in printing reproduction and astronomy, and it was laborious, since the two films had to line up precisely.

Digitally, it takes three settings. **Radius** sets the size of the blur, and so which scale of detail gets boosted. Small radii sharpen texture, and large ones raise local contrast. **Amount** scales how much of the difference is added. **Threshold** skips pixels where the difference is small, so smooth areas such as skin or sky don't have their noise amplified. The blur is a [[Convolution]], usually Gaussian, and the whole operation amounts to boosting the image's high frequencies; see [[Fourier Transform]].

The characteristic artifact is the **halo**. Near an edge the boosted difference overshoots on both sides, leaving a light rim along the bright side and a dark rim along the dark side. A little reads as crispness, partly because the visual system already exaggerates contrast at edges; see [[Optical Illusion]]. Too much looks like a glowing outline, a familiar sign of over-processed photographs and of televisions shipped with sharpness turned up; see [[Post-Processing]]. Over-sharpened images also compress worse, since the added edge energy costs bits; see [[JPEG]].

Sharpening appears at several stages. Cameras and phones sharpen as they process sensor data, partly to offset blur from the lens and from the filter in front of the sensor; see [[Image Sensor]]. Editors sharpen again for output, since downscaling and printing soften an image, and photographers often sharpen a print more than looks right on screen, because ink spreading into paper takes some of it back. Games sharpen after [[Temporal Upscaling]], whose blending of past frames softens detail. AMD's contrast adaptive sharpening, released in 2019, varies the amount per pixel by local contrast so strong edges don't get halos.

Sharpening can't restore detail that was never captured. It only raises contrast at transitions that already exist, which can make a blurry photo look crisper without making it any more detailed. Recovering lost detail takes deconvolution with a known blur, or a model that invents plausible detail; see [[Denoising]] and [[Image Resampling]].

## See also
- [[Halftone]]
- [[Histogram Equalization]]
