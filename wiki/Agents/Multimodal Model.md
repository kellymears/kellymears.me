---
aliases:
  - Multimodal
  - Vision-language model
  - VLM
  - Multimodality
  - CLIP
tags:
  - agents
summary: A model that takes in, and sometimes produces, more than text, such as images, audio, and video, by turning each into tokens the same network can reason over.
---
A **multimodal model** works with more than one kind of data, such as text, images, audio, and video, in a single system. The most common kind is a *vision-language model*: show it a photo, a chart, a screenshot, or a scanned receipt, and it can describe, answer questions about, or extract data from it. Some models also produce images or speech, and the most integrated handle conversation in and out by voice.

The key step is turning everything into the same currency. A [[Large Language Model]] reads a sequence of [[Token]] vectors, so images are cut into small patches, each patch is encoded into a vector, and the vectors are placed in the sequence alongside the text. The Vision Transformer of 2020 showed that patches could be treated much like words. Audio is handled similarly, as short slices of sound. From there, the same [[Attention Mechanism]] relates a question's words to the relevant regions of an image.

Two milestones shaped the field. **CLIP**, released by OpenAI in 2021, trained an image encoder and a text encoder on 400 million image–caption pairs so that matching pairs land near each other in a shared [[Embedding]] space. It enabled image search by description and became the text conditioning behind many a [[Diffusion Model]]. Then came models trained natively on mixed data, with GPT-4 adding vision in 2023, and Gemini and GPT-4o in 2023 and 2024 built to handle text, images, and audio together from the start.

Approaches differ in how tightly the modalities are joined:

- **Pipelines** chain separate systems, such as [[Automatic Speech Recognition]] into a text model into [[Text-to-Speech]]. Simple, but tone of voice and timing are lost between stages, and latency adds up.
- **Adapters** attach a pretrained vision encoder to a language model through a small trained bridge.
- **Native** models train on all modalities together, so a voice model can hear hesitation and answer with expression.

Images are expensive. A single screenshot can cost a thousand tokens or more of the [[Context Window]], and resolution trades detail against cost.

Weaknesses are characteristic. Models misread dense charts, miscount objects, struggle with precise spatial relationships and reading analog clocks, and can confidently invent text that isn't in an image, a visual form of [[Hallucination]]. Images also open a new channel for [[Prompt Injection]]: instructions hidden in a picture or webpage get read and sometimes obeyed.

Uses are broad. Vision lets an agent read screens for [[Computer Use]], parse documents and handwriting, check a rendered page against a design, and describe images for people who can't see them, an important [[Accessibility]] gain when descriptions are accurate. Video understanding and real-time voice are where native models are moving next.

## See also
- [[Deepfake]]
- [[Optical Character Recognition]]
- [[Contrastive Learning]]
