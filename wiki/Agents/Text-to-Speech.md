---
aliases:
  - TTS
  - Speech synthesis
  - Voice cloning
  - Synthetic voice
tags:
  - agents
summary: Turning text into spoken audio, from robotic formant synthesizers to neural voices that clone a speaker from seconds of audio, and the latency and consent questions that come with them.
---
**Text-to-speech** turns written text into spoken audio. It is the output half of a voice interface, the counterpart of [[Automatic Speech Recognition]], and it reads screens aloud, announces directions, voices assistants, and narrates audiobooks. The problem has two parts: working out how text should sound, including pronunciation, emphasis, and rhythm, and producing the actual waveform.

The first part is harder than it looks. Text must be normalized ("Dr." as doctor or drive, "1984" as a year or a number), ambiguous words resolved ("read" past or present, "lead" the metal or the verb), and *prosody* chosen: the rise, fall, pacing, and stress that carry meaning. "You're coming" and "You're coming?" differ only in intonation.

The technology went through several generations:

- **Formant synthesis.** Rules model the resonances of the vocal tract. Bell Labs demonstrated the Voder in 1939, and DECtalk, from 1984, gave Stephen Hawking his famous voice. Intelligible and tiny, but robotic.
- **Concatenative synthesis.** Recorded speech is chopped into small units and stitched together, selecting pieces that join smoothly. Natural on familiar phrases, but glitchy at the seams, and every voice needed many hours of studio recording.
- **Neural synthesis.** DeepMind's WaveNet in 2016 generated audio sample by sample with a [[Neural Network]], sounding far more human. Tacotron in 2017 learned the mapping from text to sound directly. Later systems generate faster in parallel.
- **Codec language models.** Audio is compressed into discrete tokens, a form of [[Data Compression]], and a model predicts them the way a [[Large Language Model]] predicts text. Microsoft's VALL-E in 2023 could imitate a voice from a three-second sample.

Some current systems are [[Diffusion Model]] variants, and native [[Multimodal Model]] systems generate speech directly, hearing a user's tone and answering with expression rather than reading out text.

For voice agents, **latency** decides whether conversation feels natural. People take turns with gaps of roughly 200 milliseconds, so systems stream audio as soon as the first words are generated rather than waiting for the full reply, and handle interruptions when the user talks over them. Every pipeline stage adds delay, as with [[Latency and Jitter]] elsewhere.

Synthetic speech matters greatly for [[Accessibility]]. Screen readers often run at high speeds that experienced users prefer, favoring clarity over naturalness, and people who lose their voice to illness can bank recordings to build a personal synthetic voice.

Voice cloning brings serious risks. Fraudsters have imitated relatives in distress and executives authorizing payments, and in 2024 a robocall imitating a US president's voice told voters to skip a primary, after which the FCC ruled AI voices in robocalls illegal under existing law. Responses include consent requirements, inaudible watermarks, and detection tools, none fully reliable, a reminder that voice alone no longer proves identity.

## See also
- [[Optical Character Recognition]]
- [[Multimodal Model]]
- [[Token]]
- [[Accessibility]]
- [[Dyslexia]]
- [[Screen Reader]]
