---
aliases:
  - Rotoscope
  - Roto
tags:
  - graphics
summary: Tracing over live-action film frame by frame, invented in 1915 to give cartoons lifelike motion and now also the painstaking visual-effects job of cutting objects out of footage so they can be composited.
---
**Rotoscoping** is the technique of tracing over live-action footage, frame by frame. It has two meanings. In animation, artists trace filmed performers to give drawn characters realistic movement. In visual effects, artists trace around objects in footage to cut them out, producing masks that let them be separated from their backgrounds and combined with other elements.

Max Fleischer invented the rotoscope around 1915 and patented it in 1917. The device projected a frame of film onto a glass drawing surface, so an artist could trace it, then advanced to the next frame. Fleischer's brother Dave performed in a clown costume, and the tracings became Koko the Clown in the *Out of the Inkwell* series.

Disney used live-action reference extensively for *Snow White and the Seven Dwarfs* in 1937, filming actors for the human characters, though animators generally adapted the footage rather than tracing it exactly. Pure tracing tends to look floaty and stiff, because the exaggeration animators add, such as squash and stretch and anticipation, is missing from real motion; see [[Twelve Basic Principles of Animation]]. Realistic human figures traced over film can also land in the [[Uncanny Valley]].

Some works embrace the look. Ralph Bakshi's *The Lord of the Rings* (1978) rotoscoped many scenes, and a-ha's 1985 video "Take On Me" mixed pencil-sketch rotoscoping with live action. Richard Linklater's *Waking Life* (2001) and *A Scanner Darkly* (2006) used software that let artists draw over video with shapes that interpolated between keyframes, producing a fluid, dreamlike style; see [[Bézier Curve]] and [[Cel Shading]].

Games used it too. Jordan Mechner filmed his younger brother running and jumping and traced the footage to animate *Karateka* (1984) and *Prince of Persia* (1989), whose fluid movement was striking for the hardware; see [[Sprite]] and [[Pixel Art]]. Capturing motion directly as data later replaced most tracing; see [[Motion Capture]].

In visual effects, rotoscoping is everyday labor. The glowing lightsabers in the original *Star Wars* films were drawn frame by frame over the actors' props. Today, roto artists draw spline shapes around actors, hair, and props across thousands of frames to create mattes for compositing; see [[Alpha Compositing]] and [[Compositor]]. Fine detail such as flyaway hair and motion blur makes this slow and expensive, and much of it is outsourced; see [[Motion Blur]].

Software increasingly automates it. Tracking follows shapes from frame to frame using the same motion estimation that video codecs rely on; see [[Video Compression]]. Neural networks trained to separate people and objects from backgrounds now produce rough mattes instantly, leaving artists to refine the edges; see [[Neural Network]].

## See also
- [[Onion Skinning]]
- [[Optical Flow]]
- [[Morph Target]]
