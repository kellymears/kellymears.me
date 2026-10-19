---
aliases:
  - Soap opera effect
  - Motion smoothing
  - Filmmaker mode
tags:
  - graphics
summary: The television feature that invents in-between frames to make motion look smoother, beloved for sports, loathed by many film fans for the soap opera effect, and one of the most argued-about default settings in consumer electronics.
---
**Motion interpolation** is a technique that creates new frames between the ones in a video, raising its apparent frame rate. Televisions use it to turn 24 frames per second film or 30 or 60 frames per second video into smoother motion on panels that refresh at 120 hertz or more. Manufacturers market it under many names. Viewers often call its look the **soap opera effect**.

The motivation is real. Film has traditionally been shot at 24 frames per second. On a modern display, panning shots at that rate can look jerky, a stutter called judder, especially when 24 doesn't divide evenly into the display's rate; see [[Frame Rate]] and [[Interlacing]]. LCD and OLED panels also hold each frame steady until the next one arrives, unlike older CRTs that flashed briefly. As the eye tracks a moving object across a held frame, the image smears on the retina; see [[Liquid-Crystal Display]] and [[OLED]].

To interpolate, the TV estimates how each region of the image moves between two frames, using motion vectors similar to those in video compression, and then draws synthetic frames along those paths; see [[Video Compression]]. Done well, motion looks fluid. Done poorly, artifacts appear: halos around moving objects, warped edges, and objects that briefly break apart where the estimate fails.

The soap opera effect gets its name from television history. Soap operas were shot on video at 60 interlaced fields per second, while prime-time drama and movies were shot on film at 24. Audiences learned to associate fluid motion with cheap, live-looking video and the slight stutter of film with cinema. Interpolated movies look, to many viewers, like they were shot on a camcorder; see [[Apparent Motion]] and [[Motion Blur]].

Many filmmakers objected, since the effect alters work they'd composed for 24 frames per second. In 2018 the actor Tom Cruise and the director Christopher McQuarrie recorded a public message asking viewers to turn motion smoothing off. In 2019 an industry group introduced Filmmaker Mode, a setting that disables interpolation and other processing in one step.

The argument is partly about defaults. Interpolation is often switched on out of the box, and most people never change their settings; see [[Choice Architecture]]. Sports fans and some gamers prefer it, and children raised on high-frame-rate video may not notice anything wrong.

Interpolation adds delay, because the TV must wait for the next frame before it can draw anything between it and the previous one. That's a problem for games, so game modes usually disable it; see [[Input Latency]]. Games now use their own interpolation, generating frames inside the rendering engine with access to depth and motion data, which works better than a TV's guesses; see [[Frame Generation]].

## See also
- [[Temporal Upscaling]]
- [[Suspension of Disbelief]]
- [[Unsharp Masking]]
- [[Optical Flow]]
