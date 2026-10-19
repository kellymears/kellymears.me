---
aliases:
  - Block compression
  - BC7
  - ASTC
  - S3TC
  - DXT compression
tags:
  - graphics
summary: Fixed-rate compressed image formats that GPUs can sample directly without decompressing, trading some quality for large savings in memory and bandwidth.
---
**Texture compression** stores textures in special formats that the GPU can read directly in compressed form. A 4096×4096 color texture takes 64 MB uncompressed; in a typical compressed format it takes 16 MB or less. Since games may hold gigabytes of textures in video memory, compression is essential, and it also reduces memory bandwidth, often the real bottleneck when sampling.

Ordinary image formats such as JPEG and PNG don't work for this. They're variable-rate: how many bytes a region takes depends on its content, so finding the data for one pixel means decoding from the start. A GPU sampling a texture needs random access, the ability to fetch any texel instantly; see [[Texture Mapping]]. GPU formats are therefore **fixed-rate block compression**. The image is divided into small blocks, typically 4×4 pixels, and each block compresses to the same number of bytes, so the location of any block is a simple calculation.

The classic scheme, S3TC, introduced by S3 Graphics in 1998 and adopted in DirectX as DXT1 through DXT5, works like this for each 4×4 block:

1. Store two endpoint colors.
2. Derive two more colors between them by interpolation; see [[Linear Interpolation]].
3. Store a 2-bit index per pixel choosing one of the four colors.

That's 8 bytes for 16 pixels, an 8:1 compression for RGB. The trick works because colors within small regions of real images usually lie close to a line, a kind of local [[Color Quantization]].

Later formats refined this:

- **BC4 and BC5** store one or two channels at high quality, ideal for masks and for [[Normal Mapping]], where artifacts in normals show up as lumpy lighting.
- **BC6H** stores [[High Dynamic Range]] values for lighting and sky textures.
- **BC7**, introduced with Direct3D 11, lets each block choose among modes and partition shapes, giving much higher quality at the same rate, at the cost of slow encoding.
- **ASTC**, developed by ARM, supports many block sizes, from 4×4 to 12×12, so quality and size can be chosen per texture. It's standard on mobile GPUs.

Compression is lossy and can produce blocky artifacts and color shifts, especially on smooth gradients and sharp edges. Encoding the best block is a search problem, so high-quality encoders are slow and run at build time rather than at load.

These formats compress poorly on disk, since they're designed for random access, not size. Games often apply ordinary [[Data Compression]] on top for distribution, or use supercompressed formats that transcode to whatever block format the player's GPU supports. Compressed textures combine with [[Mipmapping]], each level compressed separately, and with streaming systems that load detail as needed, a texture-level form of [[Level of Detail]].

## See also
- [[Chroma Subsampling]]
- [[Graphics Processing Unit]]
- [[Graphics API]]
- [[JPEG]]
- [[Image Format]]
- [[Texture Streaming]]
