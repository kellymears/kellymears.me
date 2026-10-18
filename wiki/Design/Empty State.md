---
aliases:
  - Empty states
  - Zero state
  - Blank slate
  - No results state
tags:
  - design
summary: What an interface shows when there is nothing to show yet, a screen often designed last that is many people's first impression.
---
An **empty state** is what a screen displays when it has no content: an inbox with no messages, a project list before the first project, a search with no results, a dashboard with no data yet. Designers often create screens using realistic sample content and only notice the empty version late, if at all. Yet for every new user, the empty state is the first thing they see.

Empty states come in a few kinds, each with a different job:

- **First use.** The user hasn't created anything yet. This is a chance to explain what the screen is for and offer a clear first action, "Create your first project," rather than a blank table with column headers.
- **User cleared.** The user finished everything, as in an empty inbox or a completed to-do list. A small acknowledgment or reward fits better than instructions.
- **No results.** A search or filter matched nothing. The screen should say what was searched, suggest fixes such as checking spelling or removing filters, and never look like an error.
- **Errors and missing permissions.** Content exists but can't be shown. These need to be distinguished from true emptiness, since telling someone they have no files when the server failed to load them is alarming and wrong.

A good empty state usually has three parts: a short explanation of what would normally appear here, a reason it's empty if not obvious, and a clear next step, often a single primary button. Empty states are a natural place for [[Progressive Disclosure]], introducing a feature just when the user first meets it rather than in an upfront tour.

Empty states shape a user's [[Mental Model]] of the product. An empty screen with a helpful prompt teaches what the product does; a blank one suggests something is broken. The screen should also offer a clear [[Affordance]]: what can be done here and how.

Practical points:

- **Distinguish loading from empty.** Showing "No items" for a moment before items load is a common bug. A [[Skeleton Screen]] or loading state should appear until the data is known.
- **Design every state.** A component usually has several states, loading, empty, partial, full, and error, and a [[Design System]] should specify each.
- **Test with empty data.** Development databases full of [[Seed Data]] hide empty states, so tests and reviews should start from an empty account too.
- **Don't trap users.** Empty states sometimes become pushy upsell pages, sliding toward a [[Dark Pattern]].

Writing matters as much as layout. The text should be brief, specific, and in plain language, matching the product's voice. An empty state is part of what separates finished software from software that only works in its demo.

## See also
- [[Skeleton Screen]]
- [[Progressive Disclosure]]
- [[Mental Model]]
- [[Affordance]]
