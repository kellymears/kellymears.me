---
aliases:
  - Setup wizard
  - Multi-step form
  - Stepper
tags:
  - design
summary: An interface that guides a person through a complex task as a sequence of simple steps with Next and Back buttons, ideal for rare, unfamiliar tasks like installing software or filing taxes, and frustrating when imposed on experts doing something routine.
---
A **wizard** breaks a complicated task into an ordered series of screens, each asking for a small number of decisions, with buttons to go forward, go back, and finish. Installing an application, connecting a printer, setting up a new phone and filing a tax return are classic examples. The term was popularized by Microsoft's desktop software in the early 1990s, as the personal computer reached nontechnical users; Apple's equivalent was called an assistant.

The pattern trades flexibility for guidance. Each step shows only what matters at that moment, hiding later choices until they're relevant, which reduces the effort of understanding the task; see [[Progressive Disclosure]]. Answers on one step can determine which steps come next, so a tax program can skip whole sections that don't apply. Sensible defaults let most people click through quickly, which also means the defaults a designer picks will be accepted by most users.

Wizards work best for tasks that are infrequent, unfamiliar and have a natural order. Someone setting up a router once every few years doesn't know which settings matter and is grateful to be asked questions in plain language. Applied to tasks people do often, the same structure becomes a cage. Experts know what they want to change and resent clicking through five screens to reach it, so many products offer a wizard alongside a direct settings screen for the same options.

Several details separate good wizards from bad ones. A visible list of steps, or a progress bar, tells people how far they've come and how much remains; see [[Progress Indicator]]. Going back must preserve what was entered, and errors should be caught on the step where they occur rather than at the end; see [[Error Message]]. A summary before the final step lets people review everything at once. Long forms split into steps can improve completion compared with one overwhelming page, though splitting a short form only adds clicks.

Psychology works on both sides. Once people have invested effort in early steps, they're more likely to finish, and an unfinished process nags at them; see [[Sunk Cost Fallacy]]. That same pull can be abused: cancellation flows that lead people through screen after screen of offers before letting them leave are a well-known deceptive pattern; see [[Dark Pattern]].

Wizards often run inside a dialog that blocks the rest of the application; see [[Modal Dialog]]. First-run tours that introduce a product share their structure; see [[Onboarding]]. Command-line tools use the same idea when they prompt for one answer at a time; see [[Command-Line Interface]].

## See also
- [[Hick's Law]]
- [[Undo]]
