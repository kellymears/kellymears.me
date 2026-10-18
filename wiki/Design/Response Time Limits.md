---
aliases:
  - Doherty threshold
  - Perceived performance
  - 100 millisecond rule
  - Powers of ten response times
tags:
  - design
summary: The thresholds, about a tenth of a second, one second, and ten seconds, at which a delay starts to feel laggy, interrupts thought, or loses someone's attention.
---
**Response time limits** are the rough thresholds at which delays in an interface change how people experience it. They come from decades of research on human perception and attention, and they explain why some interfaces feel instant and others feel sluggish even when the difference is a fraction of a second.

Robert Miller of IBM outlined the thresholds in a 1968 paper on response times in conversational computing. Jakob Nielsen restated them in his 1993 book *Usability Engineering* as three limits that have barely changed since:

- **0.1 second.** Below about 100 milliseconds, a response feels instantaneous, as if the user caused it directly. Typing, dragging, and button presses need to stay under this.
- **1 second.** Up to about a second, the delay is noticeable but users keep their flow of thought.
- **10 seconds.** Beyond about ten seconds, attention drifts and people switch to other tasks. Longer operations need a progress indicator and an estimate of how long remains, and the user should be able to do something else meanwhile.

A related finding is the *Doherty threshold*. In 1982, Walter Doherty and Ahrvind Thadani of IBM reported that programmers' productivity rose sharply when system response time dropped below about 400 milliseconds, because they stayed engaged instead of waiting. Fast responses keep people in [[Flow]]; slow ones invite context switching and the [[Attention Residue]] that comes with it.

These limits shape modern performance work. Google's RAIL model sets a 100 millisecond target for responses to input and about 16 milliseconds per frame for smooth animation at 60 frames per second. The [[Core Web Vitals]] metric Interaction to Next Paint counts an interaction as good if the screen updates within 200 milliseconds. Holding the browser's main thread with long tasks on the [[Event Loop]] is the usual culprit when interfaces miss these targets, and a [[Performance Budget]] makes the limits enforceable.

Perception matters as much as measurement. *Perceived performance* is how fast something feels, and design can improve it without changing the actual delay:

- **Respond immediately**, even before the work finishes. [[Optimistic UI]] shows the expected result at once.
- **Show structure early.** A [[Skeleton Screen]] makes a load feel shorter than a blank page or a spinner.
- **Use motion carefully.** A short transition built with good [[Easing]] can cover a brief wait, but animations that delay content make things feel slower.
- **Show progress.** A progress bar that moves steadily, or speeds up near the end, feels shorter than one that stalls.

Averages hide the experience. A system that is usually fast but occasionally takes seconds feels unreliable, which is why performance teams track [[Tail Latency]] rather than mean times, and network [[Latency and Jitter]] limits what any interface can promise.

## See also
- [[Core Web Vitals]]
- [[Skeleton Screen]]
- [[Optimistic UI]]
- [[Flow]]
- [[Peak-End Rule]]
