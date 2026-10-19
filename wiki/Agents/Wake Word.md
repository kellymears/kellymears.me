---
aliases:
  - Keyword spotting
  - Hotword
  - Wake word detection
tags:
  - agents
summary: A short phrase such as a voice assistant's name that a device listens for continuously using a tiny on-device model, waking the full speech system only when it hears it, which is how always-listening devices balance responsiveness, power and privacy.
---
A voice assistant appears to listen all the time, but most of it is asleep. What runs continuously is a small **keyword spotting** model trained to recognize one short phrase, the **wake word**. Only when it fires does the device start recording in earnest and, typically, send audio to a much larger speech system; see [[Automatic Speech Recognition]].

This split exists because full speech recognition is too expensive to run constantly on a battery-powered or low-cost device, and streaming everything to a server would be costly and invasive. A wake word detector can be small enough to run on a dedicated low-power chip, using tens of kilobytes of memory, while the main processor sleeps. Shrinking models this far relies on compressing them; see [[Quantization]].

A typical detector converts audio into a sequence of frequency snapshots, then feeds a sliding window of the last second or so to a compact neural network, often a small convolutional or recurrent one, which outputs the probability that the phrase was just spoken; see [[Recurrent Neural Network]]. If the probability crosses a threshold, the device wakes. Some systems confirm with a second, larger model on the device or in the cloud before acting.

Choosing that threshold is a trade-off between two failures:

- **False rejects**, when the phrase is spoken and missed, are frustrating and make people repeat themselves.
- **False accepts**, when something else triggers it, such as a similar-sounding word or a television, are worse. They can record private conversation and send it off the device.

Designers tune for an extremely low false-accept rate, often measured in accidental wakes per day of audio, accepting some misses; see [[Precision and Recall]]. The choice of phrase matters. Good wake words have several distinct syllables and sounds that rarely occur together in ordinary speech, which is why assistant names are unusual. Collecting enough recordings of a custom phrase across accents and voices is hard, so systems increasingly train on synthesized speech; see [[Text-to-Speech]].

Far-field use adds difficulty. Devices use several microphones to steer toward the speaker and cancel their own playback, so they can hear the wake word over music they are playing.

The privacy bargain rests on the wake word. Audio before it is supposed to stay on the device and be discarded. Accidental activations, and reports that companies had contractors review samples of recordings, made that boundary a recurring public concern; see [[Personal Data]]. Processing more of the request locally, after the wake word as well, reduces how much ever leaves the home.
