---
aliases:
  - Diarization
  - Voice activity detection
  - Speaker recognition
tags:
  - agents
summary: The task of splitting a recording into segments by who is speaking, answering "who spoke when" without necessarily knowing who anyone is, which turns a raw transcript of a meeting, interview or call into a readable conversation.
---
A speech recognizer produces words; it doesn't say whose they are; see [[Automatic Speech Recognition]]. **Speaker diarization** fills that gap. Given a recording of several people, it labels each stretch of audio with a speaker, such as Speaker 1 and Speaker 2, without needing to know their names. The term comes from "diary," a record of events in order.

A classic pipeline has four stages:

- **Voice activity detection** finds where anyone is speaking at all, discarding silence, music and background noise. It's a hard problem in itself in noisy rooms; see [[Signal-to-Noise Ratio]].
- **Segmentation** cuts speech into short pieces, ideally each containing one speaker, often windows of a second or two.
- **Embedding** turns each piece into a vector that captures the voice's characteristics, such as pitch range, timbre and resonance, while ignoring what is said. Early systems used statistical models of the speech spectrum; modern ones use neural networks trained to place clips of the same speaker close together; see [[Embedding]], [[Fourier Transform]] and [[Contrastive Learning]].
- **Clustering** groups the vectors so that each group is one speaker. The system usually must also guess how many speakers there are; see [[K-Means Clustering]]. Errors there merge two similar voices or split one voice into two.

Newer **end-to-end** models replace much of the pipeline with a single network that outputs, for each moment, which speakers are active. Their main advantage is handling **overlapping speech**, when two people talk at once, which a pipeline that assigns each moment to exactly one cluster gets wrong by design. Overlap is common in natural conversation, and it's a major source of errors.

Humans do this effortlessly, following one voice in a crowded room; see [[Selective Attention]]. Machines still struggle in the same conditions: far-field microphones, reverberation, similar-sounding voices, short interjections such as "yeah," and many speakers. Accuracy is measured by **diarization error rate**, the fraction of time assigned to the wrong speaker, missed or falsely detected as speech.

Diarization shows up wherever transcripts involve conversation. Meeting tools label who said what; court and medical transcription need attribution; call centers separate agent from customer; broadcast archives become searchable by speaker; and captions for video identify who is talking; see [[Closed Captions]] and [[Subtitling]].

A related task, **speaker recognition**, does use identity: verifying that a voice belongs to a claimed person, or identifying it from a known set. Voice authentication for banking works this way. It has become less reliable as a security measure because cloned voices can be generated from short samples; see [[Text-to-Speech]] and [[Deepfake]]. A voiceprint is also biometric information, regulated as sensitive in some jurisdictions; see [[Personal Data]].

## See also
- [[Wake Word]]
- [[Hidden Markov Model]]
