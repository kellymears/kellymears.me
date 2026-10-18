---
aliases:
  - Image kernel
  - Convolution kernel
  - Gaussian blur
  - Box blur
  - Sharpening
  - Edge detection
  - Convolutional neural network
tags:
  - graphics
summary: Computing each output pixel as a weighted sum of its neighbors, the single operation behind blur, sharpening, edge detection, and the vision networks that learned to see.
---
**Convolution** is an operation that replaces each value in a signal with a weighted sum of its neighbors. In images, the weights come from a small grid, the *kernel* or *filter*, often 3×3 or 5×5. Slide the kernel over every pixel, multiply each neighbor by the matching weight, add them up, and write the result. Changing the weights changes the effect completely.

Some common kernels:

- **Box blur** gives every neighbor an equal weight, averaging the area. It's fast but leaves a slightly boxy look.
- **Gaussian blur** weights neighbors by a bell curve, so nearby pixels count most. It looks natural, like an out-of-focus lens.
- **Sharpening** gives the center a large positive weight and the neighbors negative weights, exaggerating differences. *Unsharp masking*, named after a darkroom technique, subtracts a blurred copy to the same effect.
- **Edge detection** responds where brightness changes quickly. The Sobel operator, from 1968, estimates the horizontal and vertical gradient at each pixel.

Cost grows with kernel size, so efficiency tricks matter. Many kernels, including the Gaussian, are *separable*: a 2D blur equals a horizontal 1D blur followed by a vertical one, cutting the work per pixel from the kernel's area to twice its width. Large blurs, like those for bloom in [[Post-Processing]], are done by repeatedly shrinking the image and blurring at low resolution. For very large kernels, the *convolution theorem* helps: convolution in space equals multiplication in frequency, so a Fourier transform can replace the sliding sum.

Every edge needs a rule for pixels that would fall outside the image: clamp to the border, wrap around, mirror, or treat them as black.

Convolution reaches well beyond photo filters. The filters used in [[Image Resampling]] are convolutions, and the blur applied before downscaling to prevent [[Aliasing]] is a low-pass convolution. Audio reverb can be produced by convolving a dry recording with an *impulse response* recorded in a real room. Real-time [[Ray Tracing]] relies on denoising filters to clean up images rendered with very few rays. Counting live neighbors in a [[Cellular Automaton]] such as Conway's Game of Life is also a convolution, with a kernel of ones around a zero.

**Convolutional neural networks** learn their kernels instead of having them designed. Yann LeCun's networks read handwritten zip codes in the late 1980s, and the AlexNet network's 2012 win in the ImageNet competition, trained on a [[Graphics Processing Unit]], launched modern deep learning. When researchers visualize what such networks learn, the first layers turn out to contain edge and texture detectors much like the hand-designed ones. Convolution suits GPUs well, since every output pixel can be computed independently, which is also why it runs in a [[Shader]].

## See also
- [[Denoising]]
- [[Seam Carving]]
- [[Aliasing]]
- [[Bitter Lesson]]
- [[Neural Network]]
- [[Prosopagnosia]]
- [[Generative Adversarial Network]]
- [[Regularization]]
