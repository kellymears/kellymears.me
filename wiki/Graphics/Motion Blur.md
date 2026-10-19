---
aliases:
  - Shutter angle
  - 180-degree rule
  - Sample-and-hold blur
  - Black frame insertion
tags:
  - graphics
summary: The smear of moving objects across a single frame, natural in film because the shutter stays open, added artificially in games, and created unintentionally by modern displays.
---
**Motion blur** is the streaking of moving objects within a single frame. A film camera's shutter stays open for a fraction of each frame, and anything that moves during that time is recorded as a smear along its path. Far from being a flaw, this blur is part of why 24 frames per second looks smooth in cinema: each frame carries a trace of the motion between frames, so the brain reads continuous movement instead of a series of snapshots.

Filmmakers describe exposure as a *shutter angle*, from the rotating shutters of film cameras. The conventional *180-degree rule* exposes each frame for half its duration, 1/48 of a second at 24 frames per second. A narrower shutter gives crisp, staccato motion. A wider one gives a dreamy smear.

Rendered frames are instantaneous by default, a perfectly sharp moment with no blur, so fast motion at a low frame rate looks choppy and strobing, a form of temporal [[Aliasing]]. Games and animation add blur deliberately. Offline renderers sample many moments within each frame. Real-time games usually record each pixel's motion in a *velocity buffer* and smear the image along those vectors in a post-processing [[Shader]]. *Camera* motion blur smears the whole view when the camera turns. *Per-object* blur streaks only fast-moving things, such as a swinging sword or a car's wheels. The same velocity data powers [[Temporal Upscaling]] and [[Frame Generation]].

In games, motion blur is divisive. It can make a 30 frame-per-second game feel smoother and add a sense of speed in racing games. It also hides detail exactly when players are trying to track a target, and blurring the whole screen during fast camera turns can trigger motion sickness, a conflict between what the eyes see and what the [[Vestibular System]] feels. Many players turn it off, it is a standard accessibility option, and well-behaved apps reduce it when the operating system's [[Reduced Motion]] setting is on.

Modern displays add blur of their own. LCD and OLED screens are *sample-and-hold*: each frame stays lit for its whole duration. When the eye smoothly tracks a moving object, the object stays still on screen for the frame and then jumps, so its image smears across the retina. Old CRTs flashed each frame briefly and didn't have this problem. The fixes are higher refresh rates, which shorten each hold, and *black frame insertion* or backlight strobing, which shows each frame only briefly, at the cost of brightness and sometimes visible [[LED Flicker]].

Blur doesn't fix uneven frame delivery. A smooth image depends first on consistent timing, the subject of [[Frame Pacing]], and on avoiding [[Screen Tearing]]. Blur also interacts with [[Game Feel]]: heavy smearing makes controls feel less immediate.

## See also
- [[Motion Interpolation]]
- [[Smear Frame]]
- [[Stop Motion]]
- [[Chroma Key]]
- [[Lens Flare]]
