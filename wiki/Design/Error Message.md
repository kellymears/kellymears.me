---
aliases:
  - Error state
  - Error copy
  - Slips and mistakes
tags:
  - design
summary: Writing and placing the messages that tell people something went wrong, so they understand what happened and how to recover without feeling blamed.
---
An **error message** tells a person that something did not work. It is one of the most frequently read pieces of text in any product, and one of the most neglected, often written by an engineer at the moment of writing the check, in the vocabulary of the code. "Error 0x80070057", "Invalid input", and "Something went wrong" all report a failure while leaving the person no better off.

A useful error message answers three questions in plain language:

- **What happened?** "Your card was declined", not "Transaction failed".
- **Why, if known?** "The expiry date has passed."
- **What can I do now?** "Check the date or use a different card", ideally with the means to do it right there.

The ninth of Jakob Nielsen's usability heuristics, used in [[Heuristic Evaluation]], says exactly this: help users recognize, diagnose, and recover from errors. Codes still have a place, for support staff and search engines, but beside the explanation, not instead of it.

Tone matters. Messages should not blame the person, shout in capitals, or joke about a failure that just cost someone their work. Don Norman's *The Design of Everyday Things* argued that most "human error" is design error, and distinguished **slips**, where the person meant the right thing but did the wrong one, from **mistakes**, where their [[Mental Model]] of the system was wrong. Slips call for forgiving controls; mistakes call for better explanations. The same stance underlies the [[Blameless Postmortem]].

Placement matters as much as wording. An error about a field belongs beside that field, as covered under [[Form Design]], with the person's input preserved so they can correct it rather than retype it. Page-level failures, such as a 404 [[HTTP Status Code]], deserve a real page with a way forward. Errors must be perceivable without color alone and announced to screen readers, typically through an [[ARIA]] live region, and focus can move to the first problem.

Better still is preventing the error:

- **Constrain inputs** so invalid values cannot be entered: date pickers, dropdowns, disabled buttons with a reason.
- **Make actions reversible.** [[Undo]] beats a confirmation dialog, which people learn to click through.
- **Accept more.** Tolerating varied formats removes whole classes of error, an application of [[Postel's Law]].

The opposite failure is silence. A system that swallows an error and carries on, a [[Silent Failure]], leaves people trusting results that are wrong. Systems that [[Fail Fast]] with a clear message are kinder than ones that fail quietly.

Programming tools have shown how much good messages help. The Elm compiler's 2015 effort to write errors "for humans", with friendly explanations, code excerpts, and suggested fixes, influenced Rust and others, and shifted expectations of what a compiler owes its users.

## See also
- [[Microcopy]]
- [[Undo]]
- [[Empty State]]
- [[Forcing Function]]
- [[Bug Triage]]
