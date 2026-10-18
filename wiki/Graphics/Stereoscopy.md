---
aliases:
  - Stereogram
  - Anaglyph
  - 3D film
  - Binocular disparity
tags:
  - graphics
summary: Creating an illusion of depth by showing each eye a slightly different image, from Victorian stereo cards and red-cyan glasses to polarized cinema and VR headsets, all exploiting how the brain fuses two views.
---
**Stereoscopy** creates an illusion of depth by presenting each eye with a slightly different picture of the same scene, matching what each would see from its own position. The brain fuses the pair and perceives depth from the differences between them, a process called stereopsis. Every 3D film, stereo photograph, and VR headset relies on it.

Human eyes sit about 6.5 centimeters apart, so they see the world from slightly different angles. A nearby object shifts noticeably between the two views; a distant one barely moves. That shift, **binocular disparity**, is one of the brain's strongest depth cues at close range. Others work with one eye, such as perspective, occlusion, and the way near things move faster as you move; see [[Perspective Projection]] and [[Parallax Scrolling]].

Charles Wheatstone described stereopsis in 1838 and built a mirror device to show drawn stereo pairs. Photography made it popular: by the 1850s, Victorian households collected stereo cards viewed through handheld lens viewers, and the View-Master brought the same idea to children's toys in 1939. In 1959 Béla Julesz showed that pairs of random-dot images, meaningless to each eye alone, reveal hidden shapes when fused, proving that depth is computed in the brain from disparity alone. The 1990s "Magic Eye" posters packed both views into one repeating pattern.

The problem is delivering a separate image to each eye from one screen:

- **Anaglyph** images print the left view in red and the right in cyan, and glasses with matching filters split them. They're cheap but distort color and cause eyestrain; see [[Opponent Process Theory]].
- **Polarization** projects the two views with differently polarized light, and glasses with matching filters pass one to each eye. Most modern 3D cinemas use this; see [[Polarized Light]].
- **Active shutter** glasses black out each eye in turn, synchronized with a screen alternating the two views, which halves the effective frame rate per eye; see [[Frame Pacing]].
- **Autostereoscopic** screens use tiny slits or lenses over the pixels to steer different images to each eye without glasses, as on the Nintendo 3DS, but only from a narrow range of positions.
- **Head-mounted displays** give each eye its own screen; see [[Virtual Reality]].

Hollywood has had several 3D booms, in the 1950s, 1980s, and after 2009, each fading as audiences tired of glasses and dim pictures. Discomfort comes partly from the conflict between where the eyes converge and where they focus, which is always on the screen. A few percent of people can't perceive stereo depth at all.

Stereo pairs also work in reverse: matching points between two photographs recovers depth, the basis of many 3D-scanning methods; see [[Photogrammetry]] and [[Depth Buffer]].

## See also
- [[Gaussian Splatting]]
- [[Eye Tracking]]
