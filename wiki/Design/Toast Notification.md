---
aliases:
  - Toast
  - Snackbar
  - Transient notification
  - Status message
tags:
  - design
summary: A brief, non-blocking message that slides in to confirm an action or report a background event, then disappears on its own.
---
A **toast notification** is a small message that pops up, usually at a corner or edge of the screen, to report something briefly and then disappear without the person doing anything. "Message sent." "Link copied." "3 files uploaded." The name comes from the way it pops up like toast from a toaster. Android introduced a `Toast` class in 2008, and Google's Material Design added the *snackbar* in 2014, a toast that can carry one action.

Toasts fill a gap between saying nothing and interrupting. A [[Modal Dialog]] blocks everything until dismissed, which is right for decisions and wrong for confirmations. Silence leaves people unsure whether an action worked. A toast confirms without stopping the flow, providing the feedback that keeps an interface feeling responsive, especially for actions that finish in the background or are shown optimistically before the server answers, as in [[Optimistic UI]].

The most valuable toast carries **[[Undo]]**. Instead of asking "Are you sure you want to archive this?" before acting, the app archives immediately and shows "Conversation archived · Undo". People who meant it lose no time; people who slipped can recover. Gmail's Undo Send works this way, holding the message for a few seconds while the toast is visible.

Toasts are easy to misuse:

- **Critical information.** Anything people must read or act on should not disappear on a timer. Errors that block progress belong next to the problem, as described under [[Error Message]].
- **Too short.** A two-second toast is gone before slow readers, screen-magnifier users, or anyone glancing away can read it. Durations should scale with text length, and toasts should pause while hovered or focused.
- **Too many.** A stream of confirmations for trivial actions teaches people to ignore the whole channel, a form of Habituation that Banner Blindness describes for ads.
- **Stealing focus.** Moving keyboard focus into a toast interrupts typing; focus should stay where it is, following [[Focus Management]].
- **Covering controls.** Toasts that sit over the button someone needs next, often a bottom navigation bar on phones, block the very next action.

Accessibility requires care, since a toast appears visually without any focus change. The container should be an [[ARIA]] live region, usually `role="status"` with polite announcements, so screen readers read the message without interrupting. Timed content must allow enough time or let people extend it. Actions inside a toast must be reachable by keyboard, and a toast holding the only route to Undo needs a keyboard shortcut or a longer life. Entrance animations should respect [[Reduced Motion]].

Placement should be consistent across the product so people learn where to glance, with new toasts stacking predictably. Used sparingly, toasts make an interface feel attentive. Used for everything, they become noise that people learn to wave away.

## See also
- [[Bottom Sheet]]
- [[Progress Indicator]]
