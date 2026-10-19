---
aliases:
  - PipeWire
  - PulseAudio
  - ALSA
tags:
  - systems
summary: The background service that sits between applications and audio hardware, mixing many programs' sound together, routing it to the right speakers or headphones, and handling volume, device switching and latency.
---
Audio hardware is simple at heart: a converter takes a stream of numbers and turns them into voltage for a speaker, or the reverse for a microphone. But a desktop runs many programs that all want to make sound at once, while devices come and go, so most operating systems put a **sound server** in between. It's a long-running process that accepts audio from every application, mixes it, converts it to what the hardware expects and delivers it; see [[Daemon]].

Its main jobs:

- **Mixing.** Adding streams together so a video call, a music player and notification sounds can play at the same time.
- **Format conversion.** Resampling between rates such as 44.1 and 48 kilohertz and converting between sample formats and channel layouts.
- **Routing.** Deciding which device each stream goes to and moving streams when headphones are plugged in or a Bluetooth headset connects; see [[Bluetooth]] and [[Universal Serial Bus]].
- **Volume and policy.** Per-application volume, muting, and rules such as lowering music during a call.

The hard constraint is time. Audio arrives in small buffers, and if the next buffer isn't ready when the hardware needs it, the result is an audible click or dropout. Bigger buffers are safer but add delay, which matters for games, calls and especially musicians, who notice when what they hear lags what they play; see [[Latency and Jitter]]. Audio threads therefore often get elevated scheduling priority; see [[Process Priority]] and [[CPU Scheduler]].

Linux shows how the design evolved. At the bottom, the kernel's **ALSA** drivers expose each sound card through device files; see [[Device File]]. Early hardware could play only one stream at a time, so the first program to open the card blocked the others. **PulseAudio**, released in 2004 and widely adopted around 2008, added a desktop sound server with mixing, per-application volume and network audio. Professional users relied instead on JACK, built for very low latency and flexible routing between music programs. **PipeWire**, started in 2015 and adopted by major distributions from around 2021, replaced both by implementing their interfaces on one graph-based engine that also carries screen-capture video; see [[Linux Distribution]].

Other systems have equivalents: Core Audio on Apple platforms and the Windows audio engine. Applications talk to these through libraries and messages rather than the hardware directly; see [[Inter-Process Communication]].

Sound servers also handle echo cancellation for calls and expose virtual devices, letting software capture one application's sound for streaming or recording. Because everything flows through it, restarting a sound server interrupts every application's audio at once, so desktop components that display volume or devices often must reconnect afterward.

## See also
- [[Pressure Stall Information]]
- [[Real-Time Operating System]]
