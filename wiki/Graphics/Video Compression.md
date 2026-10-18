---
aliases:
  - Video codec
  - I-frame
  - H.264
tags:
  - graphics
summary: Shrinking video by hundreds of times, mostly by describing each frame as small changes and moved blocks from frames already sent, the reason streaming works and the source of smeared, blocky artifacts when bandwidth drops.
---
**Video compression** reduces raw video, which would take gigabytes per minute, to a stream small enough to send over the internet. A codec, short for coder-decoder, defines how. Compressing by a factor of a hundred or more is routine. Most of the saving comes from one observation: consecutive frames are nearly identical.

Within a single frame, video codecs work much like still-image formats. The picture is split into blocks, converted from colors into brightness and color-difference channels with reduced color resolution, transformed into frequency patterns, and rounded to discard detail the eye barely notices; see [[JPEG]] and [[Chroma Subsampling]].

The big gain comes between frames. Codecs use three kinds:

- **I-frames** (intra frames) are compressed on their own, like still images. They're large but can be decoded without any other frame.
- **P-frames** (predicted frames) describe the picture in terms of an earlier frame. For each block, the encoder searches the previous frame for the best match and records a **motion vector**, how far it moved, plus a small correction for whatever changed.
- **B-frames** (bidirectional frames) can borrow from both earlier and later frames, which requires sending frames out of display order.

A typical stream sends an I-frame every second or few, with predicted frames between. Seeking jumps to the nearest I-frame, and a lost packet corrupts the picture until the next one, which is why damaged video sometimes shows blocks of an old scene sliding around in new motion.

The encoder's job is search: finding good motion vectors and deciding how to split each frame, among a vast number of choices, for the best quality per bit. Encoding is therefore far slower than decoding. Streaming services spend heavy compute encoding each title once, carefully, in many versions; viewers' devices then pick among them as bandwidth changes; see [[Adaptive Bitrate Streaming]] and [[Bandwidth]].

Codec generations have roughly halved the bit rate needed for the same quality each time: MPEG-2 for DVDs and broadcast, H.264 from 2003, then HEVC, VP9, and AV1, a royalty-free design released in 2018 partly to escape patent licensing costs. Phones and graphics cards include dedicated hardware to decode them efficiently; see [[Graphics Processing Unit]].

Starved of bits, codecs fail in recognizable ways: blockiness, smeared detail, and banding in smooth gradients like skies; see [[Dithering]]. Some content is especially hard. Confetti, rain, and film grain change unpredictably every frame, so they defeat motion prediction. Newer codecs strip grain before encoding and synthesize similar grain on playback; see [[Post-Processing]].

Motion vectors have uses beyond compression. Game renderers produce similar per-pixel motion data to upscale images and to generate in-between frames; see [[Temporal Upscaling]] and [[Frame Generation]]. The limits on how far any of this can go are set by [[Information Theory]]; see [[Data Compression]].

## See also
- [[Encrypted Media Extensions]]
- [[Rotoscoping]]
- [[Chroma Key]]
- [[Adobe Flash]]
