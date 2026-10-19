---
aliases:
  - First-run experience
  - Product tour
  - Coach marks
tags:
  - design
summary: How software introduces itself to new users, ideally by getting them to a first real success quickly rather than through tours and tips they skip and forget.
---
**Onboarding** is how a product introduces itself to new users, from sign-up through their first useful result. It matters because most people who try a new app or service drop it within days, and the first session decides much of that.

The familiar techniques:

- **Product tours.** A sequence of slides or highlighted callouts walking through the interface before use.
- **Coach marks.** Overlays pointing at controls with short explanations, often dimming the rest of the screen.
- **Tooltips and hints.** Explanations attached to specific controls, shown on hover or the first time a feature appears; see [[Tooltip]].
- **Checklists.** A short list of setup tasks, with progress shown, that guides people through configuration.
- **Templates and sample content.** Starting from a filled-in example instead of a blank page.

Tours up front are the weakest of these. People skip them to get to the product, and those who watch forget what they saw, because information shown before it's needed has nothing to attach to. Repeated pop-ups also train people to dismiss whatever appears without reading, the same reflex that makes routine warnings useless; see [[Habituation]]. Blocking the screen with a sequence of overlays adds the costs of a [[Modal Dialog]].

The approaches that work better share a principle: teach in context, at the moment of need, and let people do the real thing as early as possible.

- **Get to value fast.** Identify the first meaningful success, such as sending a first message or creating a first project, and remove everything between the person and it. Each extra field or step in sign-up loses a share of people.
- **Use the empty state.** A new account's empty screens are the natural place to explain what goes there and offer a first action; see [[Empty State]].
- **Reveal gradually.** Show basic features first and introduce advanced ones as people grow into them; see [[Progressive Disclosure]].
- **Make it findable later.** Help that disappears after the first session is lost to anyone who skipped it, so explanations should stay reachable; see [[Recognition Rather Than Recall]].

Games solved this long ago. Well-designed games teach through their opening levels, introducing one mechanic at a time in a safe setting and then combining them, so players learn by playing without reading instructions; see [[Level Design]].

The words matter as much as the flow. Welcome messages, button labels, and empty-state text should describe what the person gets, not what the product is called; see [[Microcopy]].

Onboarding is usually measured by activation, the share of new users who reach that first success, and by how many return in the following weeks. Pushing those numbers with nagging emails and streaks can raise them without making the product more useful, which is why such metrics need watching; see [[Goodhart's Law]].

## See also
- [[Gamification]]
- [[Zone of Proximal Development]]
- [[Learning Curve]]
