---
aliases:
  - ASR
  - Speech-to-text
tags:
  - agents
summary: Turning audio into text, and the reasons real-world accuracy is set by the signal more than by the model.
---
**Automatic speech recognition** converts an audio signal into text. The classical pipeline had four separable parts: a front end turning waveform into spectral frames, an acoustic model scoring frames against sound units, a pronunciation lexicon, and a language model supplying priors over word sequences — historically an n-gram, which is to say a [[Markov Chain]]. Modern systems train end to end, but the division still explains the failure modes.

**Streaming** decoding emits partial hypotheses under a latency budget and cannot see the rest of the utterance, so it revises earlier words as evidence arrives — the visible churn in live captions. **Batch** decoding has the whole recording and is reliably more accurate. The choice is a latency-accuracy trade, and it shapes anything consuming a [[Streaming Response]].

**Word error rate** is the standard metric: substitutions plus deletions plus insertions, over reference words. Its blind spots matter. Every word counts equally, so dropping *not* costs what dropping *um* costs. Casing, punctuation and number formatting are usually normalised away before scoring, so [[Character Encoding]] and normalisation choices can move the number more than a model upgrade would. And the reference transcript is human work, so the [[Ground Truth]] has an error rate of its own — something any [[Evaluation Harness]] for speech must price in.

Real accuracy is dominated by what the headline number omits: proper nouns and rare vocabulary, which carry low prior probability and often need explicit biasing lists; disfluency, overlapping speakers and code-switching; and acoustics. The last is a hard ceiling. A far-field microphone with aggressive gain control and noise suppression has already discarded information, and no decoder recovers what is not in the signal — which is why a close-talking microphone routinely beats a larger model, and why [[Hallucination]] on near-silent audio is a known failure of end-to-end systems.

## See also
- [[Markov Chain]]
- [[Subtitling]]
- [[Large Language Model]]
- [[Token]]
- [[Nondeterminism]]
