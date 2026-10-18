---
aliases:
  - Nudge
  - Nudge theory
  - Default effect
  - Opt-out
  - Opt-in
tags:
  - design
summary: The design of how choices are presented, from defaults to ordering, which shapes what people choose even when every option stays available.
---
**Choice architecture** is the way options are presented to people, and the recognition that no presentation is neutral. The order of items, which one is preselected, how they are grouped, and how much effort each takes all change what people choose. Richard Thaler and Cass Sunstein named the idea in their 2008 book *Nudge*. A **nudge** is a change in choice architecture that steers behavior predictably without forbidding any option or changing its cost much.

Their point was that someone has to arrange the options, so there is always an architect. A cafeteria has to put some food first. A form has to preselect something or nothing. Choosing not to design the choice is still a design, usually one shaped by accident.

The strongest tool is the default. The **default effect** is the tendency to stick with whatever happens if you do nothing. Its most cited example is organ donation: countries where people must opt out of being donors have far higher registration than countries where they must opt in, though the choice is identical. Retirement savings show the same pattern: automatic enrollment raises participation dramatically. Defaults work because changing one takes effort and attention, because people read them as a recommendation, and because inertia, the same force behind [[Procrastination]], favors doing nothing.

Other tools of choice architecture:

- **Ordering.** Items first and last in a list get more attention, as the [[Serial Position Effect]] describes.
- **Anchors.** A high first price makes later prices look reasonable, the [[Anchoring Effect]].
- **Number of options.** More options slow decisions, per [[Hick's Law]], and can push people toward the default or toward choosing nothing.
- **Friction.** One-click paths get taken; paths with extra steps get abandoned. [[Progressive Disclosure]] hides advanced options so the common path stays short.
- **Feedback.** Showing consequences at the moment of choice, such as estimated monthly cost, changes the choice.

Software makes every one of these explicit. Every [[Form Design]] decision about checkboxes, every settings screen, and every sign-up flow is choice architecture. Good defaults are a kindness that lowers [[Cognitive Load]], which is why secure-by-default systems and the [[Defensive Default]] matter so much: most people never change a setting.

The same tools can be turned against people. A [[Dark Pattern]] is choice architecture designed for the company at the user's expense: preticked marketing consent, a cancel button hidden behind five screens, or "accept all" styled bright while "manage options" is gray. Privacy law such as GDPR, discussed under [[Personal Data]], responded partly by banning preticked consent. Thaler and Sunstein proposed a test: a nudge should be transparent and easy to avoid, and people should plausibly endorse it if they knew about it.

## See also
- [[Mental Model]]
- [[Tesler's Law]]
- [[Forcing Function]]
- [[Goodhart's Law]]
