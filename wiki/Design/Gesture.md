---
aliases:
  - Swipe
  - Pinch to zoom
  - Long press
tags:
  - design
summary: A command given by moving fingers or a pointer in a particular way, such as a swipe or a pinch, which can feel direct and effortless once learned but is invisible to anyone who hasn't learned it.
---
A **gesture**, in interface design, is a command expressed through movement rather than by pressing a labeled control. On touchscreens the common set includes tapping, double-tapping, swiping, pinching to zoom, dragging, and pressing and holding. Trackpads, mice, and motion sensors support gestures too.

Touch gestures were researched for decades before they became common. Multitouch screens existed in research labs from the 1980s, but the iPhone, launched in 2007, made pinching to zoom and swiping between pages familiar to the public. Their appeal was physical: dragging a map moves the map, and spreading two fingers enlarges what's between them, which matches how objects behave; see [[Direct Manipulation]].

The central problem with gestures is that they're invisible. A button announces itself; a swipe that deletes a message has no visible sign until someone tries it. Gestures therefore lack the cues that make an interface learnable, and users must be taught, discover them by accident, or never find them; see [[Signifier]] and [[Recognition Rather Than Recall]]. In 2010 the usability researchers Don Norman and Jakob Nielsen argued that gestural interfaces had abandoned well-established principles, including consistency and the ability to undo mistakes.

Other difficulties follow:

- **Conflicts.** The operating system claims gestures from the screen edges for going back, switching apps, and opening controls. Apps that use the same motions collide with them.
- **Accidents.** Swipes trigger by mistake, so destructive gestures need confirmation or a quick way to reverse them; see [[Undo]].
- **Inconsistency.** The same motion means different things in different apps, so learning doesn't transfer; see [[Mental Model]].

Gestures also raise accessibility issues, some of them serious. Multi-finger or path-based motions are hard or impossible for people with limited dexterity, and accessibility guidelines since 2018 have required a single-pointer alternative, such as a button, for any function triggered by a complex gesture. Screen readers on phones replace the normal gesture set with their own, so apps must not depend on custom gestures alone; see [[Accessibility]] and [[Screen Reader]].

The usual design advice is to treat gestures as accelerators. The visible control comes first, and the gesture provides a faster route for those who learn it, much as keyboard shortcuts duplicate menu items; see [[Keyboard Navigation]]. A long press that opens a menu, for instance, should duplicate an option available elsewhere; see [[Context Menu]].

Well-learned gestures become automatic and fast, which explains both their appeal and the frustration when a platform changes them; see [[Muscle memory]]. Feedback helps: a list that follows the finger, or a small vibration when a swipe crosses its threshold, makes the gesture feel physical; see [[Haptic Feedback]].

## See also
- [[Pull-to-Refresh]]
- [[Touch Target Size]]
