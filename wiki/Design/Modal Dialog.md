---
aliases:
  - Modal
  - Modal window
  - Dialog element
  - Mode error
  - Interstitial
tags:
  - design
summary: A window that blocks the rest of the interface until it is dealt with, useful for decisions that truly demand attention and overused for almost everything else.
---
A **modal dialog** is a window that takes over the interface: until it is dismissed, nothing behind it can be used. The name comes from *modes*, interface states in which the same input means different things. A modal puts the whole application into a temporary mode whose only purpose is the dialog.

Modes have a long history of criticism. Larry Tesler, whose [[Tesler's Law]] concerns where complexity lands, campaigned against them through the 1970s and 1980s. **Mode errors** happen when people act as if they were in a different mode: typing a sentence with caps lock on, or typing text into vim while it is in command mode. Jef Raskin proposed *quasimodes*, which last only while a key such as Shift is held.

Modals are appropriate when the interruption is the point:

- **Critical decisions** that must be made before continuing, especially irreversible ones, though [[Undo]] is usually a better answer than asking.
- **Short, focused tasks** that make sense apart from the page, such as a login prompt or a quick form.
- **Errors** that block all further progress.

They are overused for almost everything else. Newsletter popups, cookie banners, app-install prompts and "rate us" requests interrupt people who came to do something else, and many qualify as a [[Dark Pattern]]. Since 2017 Google has penalized mobile pages that cover content with intrusive interstitials. Frequent dialogs also train people to dismiss them without reading, defeating their purpose, and each interruption leaves [[Attention Residue]].

Building one accessibly takes several pieces:

- **Trap focus inside.** Keyboard focus must move into the dialog when it opens and stay there, a [[Focus Trap]], so Tab doesn't wander into the hidden page.
- **Return focus.** On close, focus goes back to the element that opened it, part of broader [[Focus Management]].
- **Escape closes it**, and there is always a visible close control for [[Keyboard Navigation]] and pointer users alike.
- **Hide the background.** The content behind must be inert and hidden from assistive technology, signaled with `aria-modal` per [[ARIA]].
- **Render on top.** The dialog must appear above every other layer regardless of where it sits in the code, which is why frameworks render modals through a [[Portal]] to escape any [[Stacking Context]].

The native HTML `<dialog>` element, opened with `showModal()`, now handles most of this: it renders in the browser's top layer, makes the rest of the page inert and closes on Escape. It is a clear case where [[Semantic HTML]] replaces a pile of custom code.

Alternatives often serve better: inline editing, an expanding panel, a non-blocking side sheet, or a toast that reports an action and offers to undo it. If the user might want to see the page while answering, don't block it.

## See also
- [[Command Palette]]
- [[Toast Notification]]
- [[Cookie Consent]]
- [[Forcing Function]]
