---
aliases:
  - Mental models
  - Conceptual model
  - Jakob's Law
  - System image
tags:
  - design
summary: The internal picture people form of how something works, which guides what they try, and which a design must either match or teach.
---
A **mental model** is a person's internal explanation of how something works. Nobody understands their thermostat, car, or email client completely. Instead, they carry a simplified picture that lets them predict what will happen when they act. The idea was proposed by the psychologist Kenneth Craik in his 1943 book *The Nature of Explanation*, which argued that the mind builds small-scale models of reality to anticipate events.

Mental models need not be accurate to be useful, but inaccurate ones lead to errors. Donald Norman's classic example in *The Design of Everyday Things* (1988) is the household thermostat. Many people believe it works like a valve: turn it higher and the room heats faster. In fact most thermostats are simple switches, and the heat comes at the same rate regardless, so setting it to the maximum only overshoots.

Norman described three models in play:

- **The designer's model**, how the designer understands the system.
- **The user's model**, what the user believes about it.
- **The system image**, everything the user can actually perceive: the interface, its behavior, labels, documentation.

The designer can't talk to every user, so the system image is the only channel between the first two. If it is confusing, users build the wrong model, however clear the designer's own understanding.

Designs succeed by matching models people already have or by teaching new ones clearly. Several familiar techniques serve this:

- **Metaphor.** Desktops, folders, and trash cans let early personal computers borrow from office life. [[Skeuomorphism]] took this further, making digital objects resemble physical ones.
- **Convention.** Jakob Nielsen's observation, known as *Jakob's Law*, is that users spend most of their time on other sites, so they expect yours to work the same way.
- **Clear signals.** An [[Affordance]] suggests what can be done, and immediate feedback confirms what happened.
- **Teaching at the right moment.** An [[Empty State]] or a first-use hint, delivered through [[Progressive Disclosure]], builds the model gradually rather than through an upfront tour.

Mismatches are a frequent source of usability problems. A save button in an app that autosaves, cloud files that seem local until offline, and "delete" that really means archive all confuse because the model and the system disagree. When interfaces violate expectations, the effort of reconciling them adds to [[Cognitive Load]]. A [[Dark Pattern]] often exploits a mental model deliberately, as when an unsubscribe flow presents the button that keeps you subscribed in the place where people expect "confirm."

The concept reaches well beyond interfaces. [[Information Architecture]] organizes content around how people expect to find it, and categories themselves follow [[Prototype Theory]], with typical members at the center. A [[Design System]] supports consistent models across a product, since the same component behaving the same way everywhere is easier to learn.

## See also
- [[Gesture]]
- [[Natural Mapping]]
- [[Conceptual Metaphor]]
- [[World Model]]
