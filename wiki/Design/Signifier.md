---
aliases:
  - Signifiers
  - Norman door
  - Discoverability
tags:
  - design
summary: A perceivable cue that tells people what action is possible and where to take it, the visible half of an affordance and the fix for doors that make everyone push the wrong way.
---
A **signifier** is any perceivable cue that tells people what they can do with something and how. A handle on a door, an underline on a link, a raised button shadow, and a blinking text cursor are all signifiers. They answer two questions: what can I do here, and where?

Don Norman introduced the term in a 2008 essay, and made it central to the 2013 revision of *The Design of Everyday Things*, to fix a confusion his earlier book had caused. Designers had taken up the word [[Affordance]] to mean "a visual hint," when an affordance is really the relationship between an object and an actor: a door affords pushing whether or not anything shows it. The signifier is the part people can perceive. An affordance can exist with no signifier, which makes it undiscoverable, and a signifier can promise an affordance that isn't there, which is worse.

The classic failure is the **Norman door**: a door whose design says pull when it needs a push. A vertical bar handle invites grabbing and pulling, so people pull. A flat plate offers nothing to grab, so people push. When a door needs a sign saying PUSH, the design has failed and a label is patching it.

Screens have the same problem in a harder form, because nothing on a screen is physically graspable. Every interactive cue is a convention people had to learn:

- **Links** are signaled by color and underline. Removing the underline for style weakens the cue, and relying on color alone fails people with color vision deficiency.
- **Buttons** were once heavily shaded, a legacy of [[Skeuomorphism]]. Flat design stripped those cues, and studies found people spent longer hunting for what was clickable.
- **Gestures** such as swiping, long-pressing, and pinching have almost no signifiers at all. They are invisible until someone tells you, so apps teach them with overlays.
- **Cursors and hover states** signal interactivity on desktop but don't exist on touch screens, so a [[Tooltip]] or hover reveal can't be the only cue.
- **Keyboard focus rings** are signifiers for people using [[Keyboard Navigation]]. Hiding them for appearance removes the only sign of where input will go.

Good signifiers draw on [[Gestalt Principles]] and [[Visual Hierarchy]] so the interactive parts read as interactive at a glance, and they match the mental model people bring from other products. Placement is a signifier too: a control near the thing it affects is easier to find than one in a distant toolbar.

**Discoverability** is the outcome good signifiers produce, the property of people finding what a system can do without instruction. It is one of the first things heuristic evaluation checks and a common finding in Usability Testing, where people repeatedly miss a feature that the team considered obvious.

## See also
- [[Focus Indicator]]
- [[Context Menu]]
