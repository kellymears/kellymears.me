---
aliases:
  - AudioContext
  - Web Audio
tags:
  - web
summary: The browser interface for generating, processing, and analyzing sound in real time, built as a graph of connected nodes and used for games, synthesizers, music tools, and visualizers.
---
The **Web Audio API** lets web pages generate, process, and analyze sound in real time. Where the audio element simply plays a file, Web Audio treats sound as a signal flowing through a graph of processing steps, close to how studio equipment and music software are wired.

Everything happens inside an **audio context**. A page creates nodes and connects them:

- **Sources** produce sound: an oscillator generating a tone, a buffer holding a decoded sample, a media element, or a microphone stream.
- **Processors** transform it: gain for volume, filters for tone, delays, compressors, and stereo or 3D panners.
- **Analyzers** inspect it, reporting the frequency spectrum each frame for a visualizer; see [[Fourier Transform]].
- **The destination** is the speakers.

A convolver node applies reverb by combining the signal with a recording of how a real room responds to a single sharp sound, so a sound can be placed in a cathedral or a stairwell; see [[Convolution]] and [[Reverberation]].

The graph runs on a dedicated audio thread, not the page's main thread, so a busy script doesn't cause audible glitches; see [[Long Task]]. Timing is sample-accurate: rather than starting sounds from timers, which can drift by tens of milliseconds, a page schedules events against the context's own clock. Precise scheduling makes drum machines and sequencers practical.

Google proposed the API around 2010, and Chrome shipped it in 2011, while Mozilla had been pursuing a simpler interface that exposed raw samples to JavaScript. The node-based design won, and the specification became a W3C Recommendation in 2021. Before it, interactive sound on the web mostly ran in plug-ins; see [[Adobe Flash]].

For custom processing, the early answer was a node that called JavaScript on the main thread, which glitched whenever the page was busy. Its replacement, the **audio worklet**, runs custom code on the audio thread itself in blocks of 128 samples, often compiled from other languages; see [[WebAssembly]]. Audio and worker threads typically exchange data through lock-free queues; see [[Ring Buffer]].

Browsers restrict autoplay. Following complaints about pages that blared sound on load, browsers start audio contexts suspended until the user interacts with the page, a policy Chrome enforced from 2018. Applications resume the context in a click handler.

Uses range from game sound and interactive music to synthesizers, tuners, and browser-based studios; see [[Adaptive Music]]. Physical modeling of sound, such as pitch shifts from moving sources, can be built from the panner and delay nodes; see [[Doppler Effect]]. Synthesis that produces frequencies above half the sample rate folds them back as audible distortion, a constraint every oscillator design must handle; see [[Aliasing]].

Small differences in how devices process audio produce slightly different output for the same graph, which trackers have used to identify browsers without cookies; see [[Browser Fingerprinting]].

## See also
- [[Sound]]
- [[Timbre]]
