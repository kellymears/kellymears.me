---
aliases:
  - Web form
  - Form usability
  - Inline validation
  - Input label
tags:
  - design
summary: Designing the fields, labels, order, and validation of forms so that people can give an application information quickly and without mistakes.
---
**Form design** is the craft of asking people for information. Sign-ups, checkouts, settings, and searches are all forms, and they sit at the point where a product needs something from its user, so small frictions cost real outcomes: abandoned purchases, wrong addresses, support tickets. Luke Wroblewski's 2008 book *Web Form Design* collected much of the research behind current practice.

Most good form design reduces to a few principles:

- **Ask for less.** Every field is a cost. Remove anything optional or derivable, such as asking for a city when the postal code implies it. Collecting less also limits the [[Personal Data]] an organization must protect.
- **One column, top to bottom.** A single column gives one obvious path. Multi-column layouts cause people to skip fields.
- **Labels above fields.** Top-aligned labels are scanned fastest. Every input needs a visible, persistent label tied to it in [[Semantic HTML]].
- **Never use placeholders as labels.** Placeholder text vanishes once typing starts, leaving people to guess what a field was, and its low contrast fails [[Color Contrast]] requirements.
- **Use the right input type.** Email, telephone, and numeric types bring up the right keyboard on phones; autocomplete attributes let browsers and password managers fill fields correctly.

Validation is where forms most often fail people. Errors shown only after submission force people to hunt for what went wrong. **Inline validation**, checking a field when the person leaves it, works better: a 2009 study by Wroblewski found higher success rates and faster completion. But validating on every keystroke is worse, scolding people for an incomplete email address before they have finished typing it. Messages belong next to the field, in plain language, saying how to fix the problem, as described under [[Error Message]], and must be announced to screen readers via [[ARIA]].

Formats are a quieter trap. Insisting on a particular phone or date format moves work from the computer to the person, the trade-off [[Tesler's Law]] describes. Accept spaces, dashes, and parentheses, and normalize afterward. Names are a famous case: requiring a first and last name, rejecting apostrophes or hyphens, or limiting [[Character Encoding]] to ASCII locks out real people.

Long forms benefit from [[Progressive Disclosure]]: split into steps with a visible progress indicator, ask only what the earlier answers make relevant, and save progress so a refresh does not wipe it. On error, focus should move to the first problem field, following [[Focus Management]]. Targets must be large enough to tap, per [[Touch Target Size]], and the submit button should say what it does, "Create account" rather than "Submit".

Forms reward [[Usability Testing]] more than almost anything else in an interface, because people's failures are concrete and easy to observe.

## See also
- [[Country Code]]
- [[Toggle Switch]]
- [[Personal Name]]
- [[Phone Number]]
