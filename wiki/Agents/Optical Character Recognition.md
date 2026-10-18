---
aliases:
  - OCR
  - Text recognition
  - Document understanding
tags:
  - agents
summary: Turning images of printed or handwritten text into machine-readable characters, from template-matching machines for the blind to neural models that read whole documents, and why it still fails on the hard cases.
---
**Optical character recognition** (OCR) is the conversion of images of text, scanned pages, photos of signs, screenshots, into characters a computer can search and edit. It quietly underpins digitized libraries, mail sorting, check deposits, receipt-scanning apps, and copy-text-from-a-photo features on phones.

Early machines were built to help blind readers, and by the 1950s banks and post offices were using OCR on standardized fonts designed to be machine-readable; the characters along the bottom of checks are still printed in one. Ray Kurzweil's 1970s reading machine handled ordinary typefaces and read the text aloud; see [[Text-to-Speech]].

Classic OCR ran as a pipeline:

1. **Clean up** the image: straighten it, remove noise, and convert to black and white; see [[Dithering]].
2. **Segment** it into blocks, lines, words, and characters.
3. **Recognize** each character by comparing against stored shapes or extracted features such as loops and strokes; see [[Convolution]].
4. **Correct** the result against a dictionary or language model, so "tbe" becomes "the."

Segmentation was the weak point. Touching or broken letters, columns, tables, and handwriting broke the assumption that characters could be cut apart cleanly. Modern systems skip it, using neural networks that read a whole line as a sequence, and newer ones read an entire page at once, a skill that comes built into [[Multimodal Model]]s; see [[Recurrent Neural Network]] and [[Attention Mechanism]].

Accuracy on clean, printed English is now very high. The hard cases remain:

- **Historical documents**, with faded ink, old typefaces, long s's that look like f's, and spelling that no dictionary covers; see [[Digital Preservation]].
- **Handwriting**, especially cursive. Recognizing handwriting is a separate, harder field.
- **Layout.** Getting the characters right but the reading order wrong, mixing columns or scrambling table cells, ruins the result just as surely. Forms and invoices add another step: pulling out specific fields, like a total or a date, not just the text.
- **Non-Latin scripts**, with connected letters, thousands of characters, or right-to-left direction; see [[Character Encoding]].

Errors are a real problem at scale. Digitized newspaper archives full of OCR mistakes make searches miss things silently. Errors also make their way into training data for language models; see [[Data Cleaning]].

Language-model readers fail differently from classic OCR. A classic engine produces garbled characters where it's unsure. A model may instead produce fluent, plausible text that isn't what the page says, harder to spot than gibberish; see [[Hallucination]].

OCR'd text is often stored invisibly beneath the scanned image in a PDF, so a document looks like the original but is searchable, and screen readers can reach it; see [[Screen Reader]] and [[Accessibility]].

## See also
- [[Object Detection]]
- [[Structured Output]]
- [[Hidden Markov Model]]
