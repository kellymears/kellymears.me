---
aliases:
  - Falsehoods programmers believe about names
  - Falsehoods programmers believe about time
tags:
  - testing
summary: A genre of lists cataloguing reasonable-sounding assumptions about names, time, addresses, and other real-world data that turn out to be false, and a useful source of test cases.
---
**Falsehoods programmers believe** is a genre of lists, each cataloguing assumptions about some kind of real-world data that sound reasonable and turn out to be false. The genre began with Patrick McKenzie's 2010 post *Falsehoods Programmers Believe About Names*, and was followed by lists about time, addresses, geography, phone numbers, email, and many other subjects.

The name list includes assumptions such as:

- People have exactly one full name, which doesn't change.
- Names fit in a fixed number of characters, use a particular alphabet, or have a first and last part in that order.
- Everyone has a family name, and family members share it.
- Names are case-insensitive, or capitalization can be fixed automatically.
- Someone's name can be checked for being "real."

The time list is even longer:

- A day has 24 hours, a minute has 60 seconds, and clocks never go backward; see [[Leap second]].
- The time zone offset of a place never changes, and is always a whole number of hours; see [[Time Zone]].
- A system clock is accurate, and two machines' clocks agree; see [[Logical Clock]].
- Daylight saving time starts and ends on the same dates everywhere, every year.
- Timestamps fit in 32 bits forever; see [[Unix Time]] and [[Integer Overflow]].

Others cover addresses that lack street numbers or postal codes, phone numbers that aren't purely digits, and email addresses that are far more varied than most validation allows.

The lists are valuable because the bugs they describe aren't in tricky algorithms but in the data model, which is hard to change later. A database with separate required first and last name fields, a form that rejects apostrophes, or a scheduler that assumes every day has 24 hours all bake in a false belief that will fail real users. Worse, these failures fall hardest on people whose names, languages, or locations differ from the developer's own; see [[Internationalization]] and [[Character Encoding]].

For testing, the lists are ready-made sources of test data. Each falsehood suggests a concrete case: a name with a single character, a non-Latin script, or an emoji; a meeting scheduled across a daylight saving change; an address with no house number. They make good inputs for [[Boundary Value Analysis]], [[Property-Based Testing]], and [[Pseudolocalization]], and some teams keep a library of such values in their test fixtures; see [[Test Data Builder]].

The genre's wider lesson is humility about modeling the world. Software represents messy reality with neat structures, and every structure leaves something out. The best defense is to store data in the most general form practical, validate only what the system truly requires, and use a well-tested library for hard domains like time and text rather than rolling one's own; see [[Fake Clock]] for testing time-dependent code.

## See also
- [[Country Code]]
- [[Phone Number]]
- [[Personal Name]]
