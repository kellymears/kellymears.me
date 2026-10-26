---
aliases:
  - WAAPI
tags:
  - web
summary: A browser interface that exposes the engine behind CSS animations and transitions to JavaScript, giving scripts animations they can pause, reverse, seek, and await, while still running smoothly off the main thread.
---
The **Web Animations API** lets JavaScript create and control animations using the same engine browsers use for CSS animations and transitions. A single call on an element, given a list of keyframes and a duration, starts an animation and returns an object that can be paused, reversed, sped up, slowed down, or jumped to any point in time.

Before it, scripts had two options. They could switch CSS classes and let the stylesheet animate, which gave little control once an animation started, or they could change styles themselves on every frame with [[requestAnimationFrame]]. Libraries such as jQuery took the second path, which was flexible but competed with everything else for the main thread and stuttered whenever a script ran long; see [[Long Task]].

The specification set out to unify the web's animation features under one model. CSS animations, CSS transitions, and the older SVG animation elements were all defined in terms of a shared timing model: each animation has a timeline, a start time, a current time, and an effect describing how values change between keyframes; see [[Keyframe Animation]]. Chrome shipped the basic method in 2014, and support across the major browsers was broadly complete by around 2020.

What the interface adds over plain CSS:

- **Control.** Play, pause, reverse, change the playback rate, or seek by setting the current time, which makes animations scrubbable.
- **Completion.** Each animation exposes a [[Promise]] that resolves when it finishes, so sequencing doesn't rely on guessing durations with timers.
- **Inspection.** A page can list every running animation, including ones started by CSS, and adjust or cancel them.
- **Dynamic values.** Keyframes are computed at runtime, so an element can animate from wherever it currently is to wherever it needs to go.

Performance follows the CSS rules. Animations of opacity and transform can run on the [[Compositor]], a separate thread that keeps them smooth even while scripts are busy, whereas animating width or position forces layout on every frame. Timing follows the CSS easing functions, including cubic Bézier curves and steps; see [[Easing]].

The API underpins newer features. Animations tied to scroll position use the same model with a different timeline, and page transitions expose their animations through it, so scripts can customize them; see [[View Transitions]].

Responsibility comes with control. Some people experience vestibular discomfort from large motion, and an operating system setting lets them ask for less. Scripted animations should check that preference just as stylesheets do; see [[Reduced Motion]].

The design reflects a broader pattern in browser features: expose the machinery behind declarative syntax as a lower-level interface, so libraries can build on it rather than reimplement it.

## See also
- [[Motion Design]]
- [[Bézier Curve]]
