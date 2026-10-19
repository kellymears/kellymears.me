---
aliases:
  - Interlaced video
  - Deinterlacing
  - Telecine
  - 3:2 pulldown
tags:
  - graphics
summary: The broadcast trick of drawing alternate lines in alternate passes, which doubled apparent motion and halved flicker for analog TV and left modern screens with combing, line twitter, and the problem of fitting film into it.
---
**Interlacing** splits each video frame into two fields, one holding the odd-numbered lines and the other the even ones, and sends them one after another. Early television needed it to solve a bandwidth problem. Sending 60 full frames a second needed more signal than a channel could carry, while sending 30 made the screen flicker visibly, because each spot on a cathode-ray tube fades quickly after the beam passes; see [[Racing the Beam]] and [[Bandwidth]]. Drawing half the lines each pass refreshed the whole screen 60 times a second in North America and 50 in Europe, at the signal cost of 30 or 25 frames.

The idea was patented in the 1930s and became part of the analog standards, so for decades virtually every television picture was interlaced. Because each field is captured at a different moment, interlaced video from a live camera actually records 60 distinct images of motion a second, which is why sports and news footage looks smoother than film; see [[Apparent Motion]].

Interlacing has artifacts of its own:

- **Line twitter.** A thin horizontal line, one scan line tall, appears in only one field and flickers on and off. Broadcast graphics were blurred slightly in the vertical direction to avoid it; see [[Aliasing]].
- **Combing.** Showing two fields together as one frame, as a computer or modern TV must, puts moving objects in two places at once, leaving jagged teeth along their edges.

Modern displays draw every line every refresh, so they must convert interlaced video, called deinterlacing. Simple methods either stitch the two fields together, which works for still areas but combs moving ones, or stretch each field to full height, which avoids combing but halves vertical detail. Better ones detect motion and choose per region, or estimate where objects moved between fields; see [[Image Resampling]] and [[Frame Generation]].

Film complicated things further. Film runs at 24 frames a second, which doesn't divide evenly into 60 fields, so **telecine** transfer uses 3:2 pulldown: alternate film frames are held for three fields, then two. Motion picks up an uneven cadence, a stutter visible in slow pans called judder; see [[Frame Rate]] and [[Frame Pacing]]. Good deinterlacers detect the pattern and reassemble the original frames exactly.

Digital television kept interlacing in its formats, as 1080i, alongside progressive 1080p and 720p. Interlaced video compresses less efficiently and complicates editing, and the online video era has largely abandoned it, though some broadcasts still use it; see [[Video Compression]].

The word is also used for a different idea in image files. An interlaced GIF or PNG stores rows or passes out of order, so a slow download shows a coarse whole image that sharpens, rather than a sharp image appearing from the top down; see [[GIF]].

## See also
- [[Vector Display]]
- [[Chroma Subsampling]]
- [[Closed Captions]]
- [[NTSC]]
- [[Portable Network Graphics]]
