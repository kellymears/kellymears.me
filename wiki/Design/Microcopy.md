---
aliases:
  - UX writing
  - Interface copy
  - Voice and tone
tags:
  - design
summary: The small pieces of text in an interface, from button labels to error messages, which decide whether people understand what to do and how the product feels.
---
**Microcopy** is the small text in an interface: button labels, form hints, error messages, empty states, confirmations, and tooltips. Each piece is short, but together they are most of what a product says to the people using it. The practice of writing them is called **UX writing**, and in many teams it has become a role of its own.

Microcopy matters out of proportion to its length because it sits at decision points. A person deciding whether to click a button reads its label. A person stuck on a form reads the hint. A person who just lost work reads the error message. Words carry much of the [[Information Scent]] that tells people where to go next.

Some widely shared guidelines:

- **Label actions with verbs that name the outcome.** "Save changes" or "Delete project" beats "OK" or "Submit." In a confirmation, the buttons should make sense without reading the question: "Delete" and "Keep," not "Yes" and "No."
- **Use the reader's words.** Internal terms, feature code names, and technical jargon belong in the codebase, not on screen. [[Plain Language]] principles apply even more strongly when text is this short.
- **Be specific.** "Password must be at least 12 characters" helps; "Invalid password" doesn't. A good [[Error Message]] says what happened and what to do.
- **Front-load.** People scan, so the important words go first.
- **Put guidance where it's needed.** A hint next to the field it explains is read; instructions at the top of a long form are not. See [[Form Design]].
- **Write for empty and edge states.** An [[Empty State]] is often the first screen a new user sees, and its text decides whether they know what to do.

**Voice and tone** describe how a product sounds. Voice is the consistent personality; tone shifts with the situation. Playful copy can work on a success screen but grates in an error that cost someone their data. Many teams document voice and tone guidelines in their [[Design System]] alongside visual components, with approved terms and examples.

Microcopy can manipulate. "No thanks, I don't like saving money" on a decline button is confirmshaming, a [[Dark Pattern]], and vague consent text that hides what people are agreeing to is another.

It also has accessibility consequences. A button labeled only with an icon needs an accessible name through [[ARIA]], and link text such as "click here" means nothing to someone browsing a list of links with a screen reader. Clear, literal wording also helps people reading in a second language and anyone who reads literally.

The best way to judge microcopy is to watch people use it. [[Usability Testing]] quickly reveals labels people misread, and replacing one ambiguous word often fixes what looked like a deeper design problem.

## See also
- [[Tooltip]]
- [[Toast Notification]]
- [[Toggle Switch]]
- [[Text Truncation]]
- [[Date Picker]]
