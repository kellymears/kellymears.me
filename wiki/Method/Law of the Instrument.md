---
aliases:
  - Maslow's hammer
  - Golden hammer
  - Déformation professionnelle
tags:
  - method
summary: The tendency to apply a familiar tool or method to every problem, summed up as "if all you have is a hammer, everything looks like a nail," and a recognized anti-pattern in software and research.
---
The **law of the instrument** is the tendency to rely on a familiar tool or method for every problem, whether or not it fits. Its best-known form is the saying "if all you have is a hammer, everything looks like a nail."

The philosopher Abraham Kaplan stated it in 1964: give a small boy a hammer, and he will find that everything he encounters needs pounding. The psychologist Abraham Maslow wrote the hammer-and-nail version two years later, which is why it is also called **Maslow's hammer**. The French phrase **déformation professionnelle** names the related habit of seeing everything through the lens of one's job: the lawyer sees liabilities, the surgeon sees operations, and the engineer sees a system to build.

A familiar tool is cheaper to pick up than an unfamiliar one, past success with it is vivid, and skill with it is part of a person's identity. Expertise makes the effect stronger, since experts see quickly what their tools can do and are rewarded for using them; see [[Expert Intuition]] and [[Confirmation Bias]].

In software it is known as the **golden hammer** anti-pattern:

- **Familiar storage everywhere.** The database a team knows becomes the queue, the cache, and the search engine, until load shows why those are separate.
- **Pattern-matching text.** Patterns are applied to nested formats like HTML that they can't parse reliably; see [[Regular Expression]].
- **Architecture by fashion.** A small application is split into dozens of services because that is how large companies work; see [[Microservices]].
- **Models for everything.** A language model is asked to do arithmetic or exact lookups that a few lines of ordinary code would do reliably; see [[Large Language Model]].
- **The spreadsheet** that becomes a database, scheduler, and application all at once; see [[Spreadsheet]].

In research, fields study the questions their methods can answer, and data that is easy to collect shapes what gets asked; see [[Streetlight Effect]]. The fix is to choose the method after the question.

A related bias runs the opposite direction: [[Functional Fixedness]], seeing an object only in its usual role. The law of the instrument sees every problem as suited to one tool; functional fixedness sees one tool as suited to only one problem.

Remedies:

- **Start from the problem.** Describe what needs to be true before naming any solution; see [[XY Problem]].
- **Learn several approaches**, so the choice is a real one.
- **Ask someone with a different toolkit.** People from other disciplines see options insiders don't; see [[Steelmanning]].
- **Prefer boring, proven tools** when the problem is ordinary, and new ones only when it is not; see [[Not Invented Here]].

The opposite failure is adopting a new tool for every problem because it is new; see [[Second-System Effect]].

## See also
- [[Cargo Cult]]
- [[McNamara Fallacy]]
