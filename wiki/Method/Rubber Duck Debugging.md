---
aliases:
  - Rubber ducking
  - Duck debugging
tags:
  - method
summary: Explaining a problem aloud, in full detail, to a listener who cannot help — and finding the fault while explaining it.
---
**Rubber duck debugging** is the practice of explaining a problem out loud, line by line and in full detail, to a listener incapable of responding — traditionally a rubber duck kept on the desk for the purpose — and finding the fault somewhere in the act of explaining it, before the listener says anything back, because it never does.

The name comes from Andrew Hunt and David Thomas's *The Pragmatic Programmer* (1999), which tells of a programmer who carried a rubber duck and debugged by explaining code to it line by line.

The mechanism is not the duck. It is that ordinary thinking skips steps the way ordinary speech does not tolerate: a mental walkthrough glides over "and then it obviously reads the value," while saying that sentence to something that will not nod along forces the word *obviously* to be justified. Narrating a function often reveals that its [[Naming]] never matched what it actually does, which is frequently where the fault turns out to live. Articulating each step in order, at the level of detail a stranger would need, surfaces the assumption that was never checked — the config never confirmed loaded, the response never confirmed to be the one the code thinks it is. The fix rarely arrives as a new fact; it arrives as the old facts finally stated in the order that makes the contradiction visible, which is a smaller version of what [[Root Cause Analysis]] does at larger scale.

The technique's real relative is not conversation but writing: forcing a problem into a [[Reproducible Case]] — the smallest input that reliably triggers the fault, stated precisely enough for someone else to run it — does the same work as the duck and keeps the result. A [[Code Review]] gets a milder version of the same benefit for free, since writing the explanation a reviewer will need often finds the bug before the reviewer reads a line.

## See also
- [[Falsifiability]]
- [[Silent Failure]]
- [[Ground Truth]]
- [[Yak Shaving]]
