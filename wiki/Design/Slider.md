---
aliases:
  - Range slider
  - Range input
tags:
  - design
summary: A control that sets a value by dragging a handle along a track, borrowed from the faders of audio equipment, ideal for adjusting something approximate with instant feedback and poor for entering an exact number.
---
A **slider** sets a value by dragging a handle, often called a thumb, along a track. It descends from physical controls such as the faders on audio mixing desks, where an engineer pushes a channel up or down by feel. On screens, sliders set volume, brightness, zoom, price ranges, and image adjustments.

Sliders shine when three things are true: the value is approximate, the result is visible immediately, and the range is limited. Dragging a volume slider while music plays lets someone stop when it sounds right, with no need to know the number; see [[Direct Manipulation]]. The feedback has to be fast, or the person overshoots and hunts back and forth.

They're a poor fit for precise values. A slider covering 1 to 1,000 on a track 300 pixels wide skips several values per pixel, so landing on exactly 437 is nearly impossible, especially with a finger, whose imprecision [[Touch Target Size]] describes. Common fixes:

- **Pair it with a number field** that updates as the thumb moves and accepts typed input.
- **Use steps** so the thumb snaps to meaningful values.
- **Use a nonlinear track** when values span orders of magnitude, such as audio frequency or prices from ten to ten thousand.
- **Support the keyboard**, so arrow keys nudge the value by one step and Page Up and Page Down by larger amounts; see [[Keyboard Navigation]].

A slider with two thumbs selects a range, common in shopping filters for price or date. The thumbs need enough space between them to be grabbed separately, even when the range is narrow.

Direction should match expectations. More is to the right on a horizontal track and upward on a vertical one. Phones often add a light vibration as the thumb passes a step or a default value.

Browsers provide a native range input that works with assistive technology. Custom sliders need the right role and current, minimum, and maximum values announced to screen readers, plus keyboard handling; see [[ARIA]].

In surveys, sliders are used for ratings from, say, zero to a hundred. Research on such scales suggests that where the thumb starts can influence the answer people give; see [[Anchoring Effect]]. A slider that starts in the middle also can't distinguish someone who chose the midpoint from someone who skipped the question.

For a choice between two states, a slider is overkill; see [[Toggle Switch]]. For a handful of named options, such as small, medium, and large, radio buttons show every choice at once.

## See also
- [[Pointer Events]]
- [[Date Picker]]
