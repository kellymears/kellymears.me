---
aliases:
  - EME
  - Digital rights management
  - DRM
  - Content decryption module
tags:
  - web
summary: The W3C standard that lets web pages play copy-protected video through a closed decryption module in the browser, which replaced plugins like Flash and Silverlight and split the standards world over whether the open web should carry DRM.
---
**Encrypted Media Extensions**, or EME, is a browser feature that lets a web page play encrypted, copy-protected video and audio. It's how streaming services deliver films and series in an ordinary browser tab. EME doesn't decrypt anything itself; it's an interface through which the page hands encrypted media to a **content decryption module**, a closed, proprietary component inside the browser that holds the keys and decodes the video where the page can't reach it.

Before EME, protected streaming needed browser plugins. Netflix originally streamed through Microsoft's Silverlight, and much other video went through Flash; see [[Adobe Flash]]. As browsers moved to drop plugins, studios still required copy protection, a form of digital rights management, or DRM, as a condition of licensing their content. EME was proposed in 2012 by engineers from Google, Microsoft, and Netflix to bring that protection into the browser itself.

A playback session works roughly like this:

1. The page fetches encrypted video segments, usually with the companion Media Source Extensions API, which lets scripts feed a video element piece by piece and switch quality as bandwidth changes; see [[Adaptive Bitrate Streaming]].
2. The decryption module generates a license request, which the page relays to the service's license server.
3. The server checks the user's subscription and returns keys, encrypted so only that module can read them; see [[Public-Key Cryptography]].
4. The module decrypts and decodes the video, ideally inside protected hardware so even the operating system can't copy the frames; see [[Hardware security module]].

There are three dominant modules: Google's Widevine, Microsoft's PlayReady, and Apple's FairPlay. Services trust them to different degrees. When decryption happens only in software, many services cap resolution, so the same subscription may stream in 4K on a television app but at lower resolution in some browsers or operating systems; see [[Video Compression]].

EME split the standards world. The W3C, which is meant to keep the web open and interoperable, published it as an official recommendation in 2017. Critics, led by the Electronic Frontier Foundation, argued that standardizing an opaque component that users can't inspect conflicted with the open web, and that anti-circumvention laws would expose security researchers who examined it to legal risk. They proposed a promise that members wouldn't sue researchers; it was rejected, and the EFF resigned from the W3C; see [[Web Standards]] and [[Right to Repair]].

Supporters argued the alternative was worse: without EME, protected video would remain in plugins or native apps, with even less sandboxing. Mozilla adopted it reluctantly for that reason. DRM also doesn't stop determined copying, since video can still be recorded from the screen, but it raises the effort required; see [[Browser Engine]].

## See also
- [[HTML Canvas]]
- [[Path Dependence]]
- [[Paywall]]
