---
aliases:
  - Render node
  - Distributed rendering
  - Blinn's law
tags:
  - graphics
summary: A cluster of computers that renders an animated film or effects shot by handing out frames to hundreds or thousands of machines in parallel, whose size has grown for decades without making frames any faster, because artists spend every gain on more complexity.
---
A **render farm** is a group of computers dedicated to producing rendered images, usually frames of animation or visual effects. A single feature-quality frame can take hours to render, and a feature film at 24 frames per second needs well over a hundred thousand of them, so studios spread the work across many machines; see [[Frame Rate]].

Frames hardly depend on one another, which makes the job **embarrassingly parallel**. A queue manager hands each frame to a free machine, collects the result and retries failures; see [[Batch processing]] and [[Load Balancing]]. Heavy shots are split further into passes, layers and tiles, each rendered as a separate job and recombined afterward; see [[Alpha Compositing]].

Toy Story, released in 1995, was reportedly rendered on a farm of about 117 Sun workstations, a scale that seemed vast at the time, using hundreds of thousands of machine-hours; see [[Reyes Rendering]]. Later studio farms grew to thousands of servers.

The persistent irony is called **Blinn's law**, attributed to the graphics researcher Jim Blinn. Rendering time per frame stays roughly constant as computers get faster, because artists spend every gain on more detail, more light bounces and heavier simulation. Faster hardware hasn't made film frames quicker; it has made them richer, a case of demand expanding to absorb efficiency; see [[Moore's Law]] and [[Jevons Paradox]].

Running a farm is an infrastructure problem as much as a graphics one. Schedulers prioritize shots near their deadlines, track which frames need rerendering after an artist changes a light, and keep large texture and geometry caches in step across hundreds of machines, since the data for one frame can run to many gigabytes; see [[Texture Streaming]]. Power and cooling are major costs, and a farm's machines are typically kept busy around the clock, rendering artists' work overnight so it can be reviewed the next morning.

The work's bursty shape suits rented machines. A studio may need several times its usual capacity in the weeks before delivery and little afterward, so many now rent cloud capacity for the peak rather than owning machines that would sit idle for most of the year. Independent artists use the same model through commercial farms that charge by the frame.

Graphics cards have changed the economics. Path tracers running on GPUs can finish frames in minutes that took CPUs hours, and denoisers let them stop at far fewer samples per pixel; see [[Graphics Processing Unit]], [[Ray Tracing]] and [[Denoising]]. Some television productions now render final backgrounds in real time with game engines, displayed on LED walls behind the actors so the camera captures them directly; see [[Game Engine]]. Blinn's law suggests the saved time will be spent the same way as before, on more ambitious images.

## See also
- [[Physically Based Rendering]]
- [[Post-Processing]]
