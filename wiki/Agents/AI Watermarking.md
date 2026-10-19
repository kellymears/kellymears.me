---
aliases:
  - AI text detection
  - SynthID
  - Text watermark
  - Content Credentials
  - C2PA
tags:
  - agents
summary: Hiding a statistically detectable signal in text, images, or audio produced by a model so it can later be identified as machine-made, why it is fragile, and why detectors without watermarks are less reliable still.
---
**AI watermarking** hides a signal in content produced by a generative model so that it can later be recognized as machine-made. As generated text, images, and voices became hard to tell from human work, watermarking became the leading technical answer to "was this made by AI?" It works only partly.

Watermarking text is surprisingly possible. A 2023 scheme from the University of Maryland works at each step of generation: a hash of the previous token pseudo-randomly divides the vocabulary into a "green" half and a "red" half, and sampling is nudged slightly toward green tokens; see [[Hash Function]] and [[Temperature Sampling]]. The text reads normally, but a detector that knows the secret key can count green tokens, and human text, which follows no such rule, lands near half. A few hundred tokens are enough for strong statistical confidence. Google DeepMind's SynthID uses related methods, deployed in its Gemini chatbot in 2024 and released openly for text later that year.

Images and audio offer more room: patterns spread invisibly through pixels or frequencies, designed to survive cropping, resizing, and compression; see [[JPEG]], [[Diffusion Model]], and [[Text-to-Speech]].

Weaknesses:

- **Editing.** Paraphrasing, translating, or rewriting text by hand, or by another model, washes the signal out.
- **Little freedom.** Code, short answers, and factual lists leave few equally good word choices to bias.
- **Opting out.** Anyone running an [[Open-Weight Model]] can simply generate without a watermark.
- **Spoofing.** Attackers who learn a scheme's patterns may stamp it onto human content to make it look machine-made.

Detection without watermarks is weaker still. Classifiers that guess whether text "sounds like AI" make frequent errors. OpenAI withdrew its own detector in 2023 for low accuracy, and a Stanford study that year found popular detectors flagged essays by non-native English writers as AI-generated far more often than those by native speakers. Applied to students, those false positives have real victims; see [[Precision and Recall]].

A complementary approach labels the real instead of the fake. The C2PA standard, backed since 2021 by Adobe, Microsoft, the BBC, and others, attaches **Content Credentials**: cryptographically signed records of how an image was captured and edited; see [[Public-Key Cryptography]] and [[Provenance]]. Metadata can be stripped, but when present and valid it is strong evidence; see [[Metadata]]. Some cameras now sign photos as they are taken.

Regulation is pushing both. The European Union's AI Act requires providers to mark synthetic content in a machine-readable way, and several platforms label generated media that they detect.

Watermarks matter for model builders too: as generated text spreads across the web, training on it unknowingly degrades future models, so being able to filter it out is useful; see [[Synthetic Data]].

## See also
- [[ROC Curve]]
- [[Adversarial Example]]
- [[Deepfake]]
- [[Model Card]]
