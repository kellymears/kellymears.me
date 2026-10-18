---
aliases:
  - Mockup
  - Prototype
  - Paper prototype
  - Low-fidelity prototype
  - Design fidelity
tags:
  - design
summary: A deliberately rough sketch of a screen's structure, and the wider ladder of fidelity from sketches to interactive prototypes used to test ideas before building them.
---
A **wireframe** is a simplified drawing of a screen that shows its structure and content without its final look: boxes for images, lines for text, labeled buttons, and the arrangement of regions on the page. It is the architectural plan of an interface, made before decisions about color, typography, and imagery, so that discussion stays on what goes where and why.

Wireframes sit on a ladder of increasing **fidelity**, each rung costing more and answering different questions:

- **Sketches.** Pen on paper or a whiteboard, minutes each. Good for exploring many directions quickly.
- **Wireframes.** Grayscale layouts showing hierarchy, content, and navigation, tested against the [[Information Architecture]].
- **Mockups.** Static, visually complete screens using real type, color, and components from the [[Design System]].
- **Prototypes.** Clickable or interactive simulations, low or high fidelity, used to test flows with real people.

The rule of thumb is to stay at the lowest fidelity that answers the current question. A rough drawing invites rough feedback about structure, which is what early stages need. Polished visuals invite comments about shades of blue, and they signal that decisions are final, so people hesitate to suggest large changes. Balsamiq, released in 2008, made its wireframes look hand-drawn on purpose for this reason. Low fidelity is also cheap to throw away, which matters because most early ideas should be thrown away.

**Paper prototyping** takes this furthest: screens drawn on paper, with a person playing the computer, swapping sheets as a participant "taps" on them. It sounds crude but finds real problems in [[Usability Testing]] before any code exists. Carolyn Snyder's 2003 book on the method made the case that it catches most of the same issues as polished prototypes.

Wireframes are useful for working out:

- **[[Visual Hierarchy]].** What should be noticed first, second, and third.
- **Layout.** How content sits on the [[Grid System]] and how it reflows at each [[Responsive Breakpoint]].
- **States.** Not only the ideal screen but the loading, [[Empty State]], error, and overflow versions, which are easy to forget and expensive to discover late.
- **Content.** Whether real text fits. Lorem ipsum hides headlines that are twice as long as the box.

Wireframes have limits. They cannot show how motion, timing, or [[Response Time Limits]] feel, and a static drawing hides whether an interaction makes sense in sequence. Design tools such as Figma, launched in 2016 in the browser, blurred the rungs by making it easy to move from wireframe to prototype in one file, which helps speed but can tempt teams into polishing too early.

The wireframe's spirit lives on in production: a [[Skeleton Screen]] is essentially a wireframe of the page shown while content loads.

## See also
- [[Atomic Design]]
- [[Playtesting]]
- [[Visual Hierarchy]]
- [[Skeleton Screen]]
- [[Card Sorting]]
- [[Design Thinking]]
