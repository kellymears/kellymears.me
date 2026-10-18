---
aliases:
  - Forcing functions
  - Poka-yoke
  - Error prevention
  - Mistake-proofing
tags:
  - design
summary: A design constraint that makes a mistake impossible, or forces a step before the next one can happen, so safety does not depend on people remembering to be careful.
---
A **forcing function** is a design that prevents an action from happening until a condition is met, or makes the wrong action impossible altogether. Instead of asking people to remember to be careful, it builds care into the object. A microwave that won't run with the door open, a car that won't shift out of park unless the brake is pressed, and an ATM that returns the card before the cash are all forcing functions. The last example works because people leave once they have what they came for, so the card has to come first.

The idea has two main sources. Don Norman described forcing functions in *The Design of Everyday Things*, sorting them into *interlocks*, which force operations to happen in sequence, *lockins*, which keep an operation running, such as software that asks before quitting with unsaved work, and *lockouts*, which block entry to something dangerous. Separately, Shigeo Shingo developed **poka-yoke**, Japanese for "mistake-proofing," at Toyota in the 1960s: fixtures that only accept a part in its correct orientation, or sensors that halt the line when a step is skipped.

The principle behind both is that errors are predictable. If a mistake can happen, someone will eventually make it, especially when tired, rushed, or interrupted. Training and warnings help, but they depend on attention, and attention fails. Repeated warnings fade through habituation, which is why [[Alarm fatigue]] leaves alarms ignored. A good forcing function doesn't need anyone to notice it.

Software uses forcing functions widely:

- **Disabled actions.** A submit button that stays disabled until required fields are valid. [[Form Design]] warns against overusing this without explaining why.
- **Typed confirmation.** Destructive actions that require typing the resource's name, so a reflexive click in a [[Modal Dialog]] can't delete a production database.
- **Type systems.** [[TypeScript]] and other type checkers refuse to build code that passes the wrong kind of value. Designing types so invalid states can't be represented is a forcing function for programmers.
- **Pipelines.** Merges blocked until tests pass, or until [[Code Review]] approves.
- **Runtime guards.** An [[Assertion]] or [[Fail Fast]] check stops a program the moment an invariant breaks, rather than letting corrupted state spread.

Forcing functions have costs. Too many become friction people work around, propping the door open or disabling the check, and each workaround is a step toward the [[Normalization of Deviance]]. Where an action is common and mistakes are cheap to reverse, [[Undo]] is usually better than prevention, because it keeps the fast path fast. Good design matches the constraint to the stakes, a judgment captured in the [[Defensive Default]].

When something goes wrong, a [[Blameless Postmortem]] often ends by asking which forcing function would have made the error impossible, rather than asking people to try harder.

## See also
- [[Checklist]]
- [[Signifier]]
- [[Error Message]]
- [[Murphy's Law]]
