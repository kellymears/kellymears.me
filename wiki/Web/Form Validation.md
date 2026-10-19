---
aliases:
  - Constraint validation
  - Client-side validation
tags:
  - web
summary: Checking what people type into a web form before accepting it, done in the browser for fast feedback and on the server for safety, and harder than it looks because real names, addresses, and numbers break simple rules.
---
**Form validation** checks input before a web application accepts it: that a required field isn't empty, that an email address has an at sign, that a date falls in range. It happens in two places with different purposes. Validation in the browser gives fast feedback; validation on the server protects the system. Only the second can be trusted.

HTML gained built-in validation in its fifth revision, finalized as a standard in 2014. Attributes on an input declare its constraints:

- **required** rejects an empty field.
- **type** values such as email, url, and number check format, and on phones also choose a suitable keyboard.
- **min**, **max**, **minlength**, and **maxlength** bound values and lengths.
- **pattern** takes a regular expression the whole value must match; see [[Regular Expression]].

The browser blocks submission of an invalid form and shows its own message beside the first bad field. A script interface lets pages check validity, set custom messages, and replace the built-in bubbles with their own display. CSS can style invalid fields, and a newer pseudo-class applies only after the user has interacted, avoiding the hostile experience of a form that turns red before anyone has typed; see [[HTML]].

Client-side checks are a convenience, never a defense. Anyone can disable scripts, edit the page, or send a request directly without a browser, so every rule must be enforced again on the server, where the data crosses into trusted territory; see [[Threat Modeling]]. Server-side checks also guard against hostile input that is technically valid, such as text that would be dangerous if inserted into a query or a page without escaping; see [[SQL Injection]] and [[Cross-Site Scripting]]. Sharing one schema between client and server keeps the two sets of rules from drifting apart; see [[Schema Validation]].

The hard part is choosing rules that don't reject real people. Names with apostrophes or a single word, addresses without a house number, phone numbers in foreign formats, and email addresses with plus signs all fail validators written from narrow assumptions. A common recommendation is to validate only what the system genuinely needs, and to confirm an email address by sending mail to it rather than by matching a pattern. The same spirit of accepting varied input appears in an old networking principle; see [[Postel's Law]].

Timing and wording shape the experience. Errors shown on every keystroke nag; errors shown only after submission force a hunt. Validating when a field loses focus is a common compromise. Messages should say what's wrong and how to fix it, sit next to the field, and be announced to assistive technology, not conveyed by color alone; see [[Error Message]] and [[Screen Reader]].

## See also
- [[Progressive Enhancement]]
- [[Accessibility]]
