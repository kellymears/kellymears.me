---
aliases:
  - Video call
  - Video conferencing
  - Zoom fatigue
tags:
  - networks
summary: Real-time two-way audio and video between people in different places, promised for decades as the picturephone, made ordinary by broadband and webcams, and turned into daily infrastructure for work and school during the 2020 pandemic.
---
**Videoconferencing** sends live audio and video between two or more places so people can see and hear each other as they talk. It was a staple of futurism long before it worked. AT&T demonstrated its Picturephone at the 1964 World's Fair and launched a commercial service in 1970, but at high prices and with few people to call it attracted almost no subscribers; see [[Telephone Network]] and [[Network Effect]].

The technical problem was bandwidth. Uncompressed video needs vastly more capacity than a voice call, so early systems ran over dedicated lines in corporate boardrooms. Practical video calling needed efficient compression and cheap broadband; see [[Video Compression]] and [[Bandwidth]]. Desktop experiments in the 1990s, Skype's video calls in the mid-2000s and smartphone front cameras brought it to ordinary users. Browsers can now place calls without plugins; see [[WebRTC]].

Conversation is unforgiving of delay. Telecommunications guidance suggests keeping one-way delay under about 150 milliseconds for natural turn-taking; beyond that, people talk over each other and pauses feel awkward; see [[Latency and Jitter]]. Video calls therefore use protocols that drop late packets rather than wait for retransmission, and adapt quality on the fly when the network congests; see [[Voice over IP]] and [[Congestion Control]]. Group calls usually route through servers that forward each participant's stream to the others, often sending several resolutions so each viewer gets what their connection can handle.

Audio needs care too. Without **echo cancellation**, a participant's voice would come out of the other person's speakers, re-enter their microphone and return as an echo. Software subtracts the expected echo from the incoming signal; see [[Wave Interference]].

In March 2020, as offices and schools closed, video calling went from occasional to constant almost overnight. Usage of the major services multiplied, and their infrastructure scaled with it. The shift exposed new problems, including uninvited guests disrupting meetings and debates about whether calls were truly encrypted end to end; see [[End-to-End Encryption]].

It also gave a name to **Zoom fatigue**. Researchers proposed several causes: faces shown close up and staring for long periods, the strain of watching one's own image, reduced physical movement, and the extra effort of reading and sending nonverbal cues through a small grid; see [[Cognitive Load]]. Turning off self-view and taking audio-only calls are common suggestions. Cameras sit above screens, so people looking at a face appear to look down, and genuine eye contact remains hard to achieve.

Video calls now serve uses beyond meetings: telemedicine, remote court hearings, families across oceans, and people working alongside each other silently for focus; see [[Body Doubling]]. Real-time face manipulation has also made it possible to impersonate someone on a live call; see [[Deepfake]].

## See also
- [[Remote Desktop]]
- [[Instant Messaging]]
