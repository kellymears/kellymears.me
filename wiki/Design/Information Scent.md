---
aliases:
  - Information foraging
  - Information foraging theory
  - Scent
tags:
  - design
summary: How people judge, from link labels and other cues, whether a path will lead to what they want, and why weak or misleading cues make them give up or get lost.
---
**Information scent** is the sense a person has, from the cues in front of them, of whether a path will lead to what they're looking for. A link label, a menu heading, a search result snippet, or a thumbnail all give off scent. Strong scent says "what you want is this way." Weak or misleading scent leaves people guessing, backtracking, or leaving.

The idea comes from *information foraging theory*, developed by Peter Pirolli and Stuart Card at Xerox PARC in the 1990s. They noticed that people looking for information behave much like animals foraging for food. A forager follows the scent of prey and abandons a patch when the expected gain from staying drops below the expected gain from moving on. People reading a website do the same: they follow the most promising cue, and when the scent fades, they hit the back button, return to search, or give up.

Scent comes from many places:

- **Labels.** Specific words beat clever ones. "Pricing" carries scent; "Explore our journey" carries almost none. Labels should use the words people bring with them, not internal jargon.
- **Context around links.** Surrounding text, descriptions under navigation items, and the [[Visual Hierarchy]] of a page all strengthen or weaken a cue.
- **Previews.** Search snippets, thumbnails, and hover previews let people sample before committing.
- **Confirmation on arrival.** After a click, the destination should immediately show the term that brought the person there, confirming they followed the right trail. Mismatches feel like a broken promise.

When scent fails, users show recognizable symptoms in [[Usability Testing]]: pogo-sticking between a menu and pages, hovering over several options without choosing, or turning to search because navigation offers no trail. Strong scent is also what makes deep hierarchies tolerable, since people will click through several levels if each step clearly gets warmer.

It connects to several neighboring ideas. Good [[Information Architecture]] groups and names content so trails make sense, and [[Card Sorting]] tests whether its labels match how people think. [[Faceted Search]] and [[Autocomplete]] add scent to search by showing what exists before results load. [[Banner Blindness]] is the opposite effect, where people learn that certain regions never carry useful scent and stop looking there. Clickbait headlines exploit strong scent that the destination doesn't honor, which wins a click and loses trust.

Scent also explains why [[Recognition Rather Than Recall]] matters for navigation. A person who can scan visible options and recognize the right one follows scent; one who has to remember a hidden command can't follow anything at all. The same reasoning applies to [[Progressive Disclosure]]: hidden options are fine only when the cue that reveals them carries enough scent.

## See also
- [[Mental Model]]
- [[Search Engine Optimization]]
- [[Hick's Law]]
- [[Link Rot]]
- [[Wayfinding]]
