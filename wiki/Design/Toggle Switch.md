---
aliases:
  - Switch control
  - Checkbox
  - Radio button
tags:
  - design
summary: An on-screen control for a single on-or-off setting that takes effect immediately, borrowed from light switches, distinct from checkboxes and radio buttons, and notorious for leaving people unsure which state it is in.
---
A **toggle switch** is a control for a single setting that is either on or off and takes effect the moment it changes, like the light switch it imitates. The sliding switch became a standard mobile control with the iPhone in 2007 and spread to the web and desktop.

It sits beside two older controls:

- **Checkboxes** mark choices that are submitted together later, as in a form with a Save button. A checkbox in a list of options means "include this."
- **Radio buttons** pick exactly one option from a set. The name comes from car radios whose preset buttons were mechanically linked, so pressing one popped the others out.

The usual rule: use a switch when the change applies immediately, a checkbox when it waits for a submit, and radio buttons for a choice among several. A checkbox can also be indeterminate, shown with a dash, when it controls a group whose members are partly selected.

The switch's chronic problem is ambiguity. People can't always tell which state it is in, or whether its label describes the current state or the result of tapping it. Common fixes:

- **Label the setting, not the action.** "Wi-Fi" beside a switch reads clearly; "Turn off Wi-Fi" does not, because it is unclear whether that has already happened. Avoid negatives such as "Disable notifications," which make "on" mean "off".
- **Use more than color.** A green track is invisible as a signal to people who can't distinguish red from green, so pair it with position, and on some platforms an on or off mark.
- **Follow the physical convention.** The knob slides right for on. Physical light switches show how unsettled conventions can be: up means on in the United States and down means on in Britain.

Because a switch acts immediately, it must give immediate feedback. When the change depends on a server, the interface can flip the switch at once and quietly revert it if the request fails; see [[Optimistic UI]]. A change that is hard to reverse doesn't belong behind a single tap; see [[Undo]].

Accessibility is easiest with a native checkbox styled to look like a switch, which keeps keyboard and assistive technology support; see [[Semantic HTML]]. A custom switch needs the [[ARIA]] switch role and a checked state so that a [[Screen Reader]] announces "on" or "off". The control must also be large enough to hit; see [[Touch Target Size]].

The starting position of a switch is a decision with consequences. Most people never change defaults, so settings that share data or send notifications are often switched on in advance, sometimes in ways that cross into deception; see [[Dark Pattern]].

## See also
- [[Date Picker]]
- [[Dropdown Menu]]
