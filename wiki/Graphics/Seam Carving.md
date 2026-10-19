---
aliases:
  - Content-aware scaling
  - Liquid rescaling
tags:
  - graphics
summary: Resizing an image by removing or duplicating its least noticeable paths of pixels rather than stretching everything evenly, so the important content keeps its shape.
---
**Seam carving** is a method for changing an image's width or height by removing, or duplicating, the paths of pixels that matter least, instead of scaling everything uniformly. Shai Avidan and Ariel Shamir presented it at SIGGRAPH in 2007, and Adobe shipped it in Photoshop the next year as content-aware scale.

Ordinary resizing treats every pixel alike. Squeezing a beach photo narrower makes the people in it thinner; cropping keeps their shape but cuts things off the edges; see [[Image Resampling]]. Seam carving takes the width out of the sky and sand instead, leaving the people alone.

The algorithm:

1. **Measure energy.** Give every pixel a value for how much it stands out, usually the strength of the color gradient around it. Flat sky has low energy, while edges and texture have high energy; see [[Convolution]].
2. **Find the cheapest seam.** A vertical seam is a connected path of one pixel per row from top to bottom, where each step moves at most one column left or right. The best seam has the lowest total energy. Finding it is a classic [[Dynamic Programming]] problem: compute, row by row, the cheapest path reaching each pixel, then trace back from the cheapest pixel in the bottom row. It is a [[Shortest path]] through a grid, solved in time proportional to the pixel count.
3. **Remove it and repeat.** Deleting the seam makes the image one pixel narrower, and repeating reaches any width. Duplicating the lowest seams, with averaging, makes the image wider.

Choosing seams one at a time is greedy, so the final set isn't guaranteed to be the best possible; see [[Greedy Algorithm]]. It works well enough, and a 2008 "forward energy" variant scores each seam by the new edges its removal would create, reducing jagged artifacts.

Users can steer it with masks: raising the energy of faces protects them, and lowering an object's energy makes seams run through it until it disappears.

The limits are visible. Images without low-energy regions, such as crowds or dense texture, have nowhere to take pixels from, and straight lines like horizons and building edges bend where seams cross them unevenly. Faces distort badly, because gradient energy has no idea which features people look at first; see [[Eye Tracking]].

The idea fed a generation of content-aware editing tools. Photoshop's content-aware fill (2010) replaced removed objects by searching the image for matching patches, and current tools invent the missing pixels with generative models; see [[Diffusion Model]]. Such edits can be hard to detect, which matters for photographs presented as evidence; see [[Provenance]]. The web faces the same problem when serving one image to many layouts; see [[Responsive Images]].

Applied heavily, liquid rescaling in GIMP and ImageMagick became an internet joke, melting familiar images.

## See also
- [[JPEG]]
- [[Post-Processing]]
- [[Aspect Ratio]]
- [[Unsharp Masking]]
- [[Histogram Equalization]]
