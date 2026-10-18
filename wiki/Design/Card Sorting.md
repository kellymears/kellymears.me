---
aliases:
  - Card sort
  - Open card sort
  - Closed card sort
  - Tree testing
tags:
  - design
summary: A research method where people group topics into categories they choose or are given, revealing how they expect content to be organized before a navigation is built.
---
**Card sorting** is a research method for learning how people expect information to be organized. Participants get a set of cards, each naming one topic or piece of content, and group them in whatever way makes sense to them. The groupings reveal their [[Mental Model]] of the subject, which is often quite different from the organization chart or database schema a team would default to.

There are two main forms:

- **Open card sort.** Participants create their own groups and name them. This is exploratory and best early, when the team doesn't yet know what categories should exist. The names people invent are a source of labels in the users' own vocabulary.
- **Closed card sort.** Participants sort cards into categories the team has already defined. This tests whether a proposed structure works: if cards scatter across several categories, the labels are ambiguous.

A hybrid lets people use the given categories and add new ones when nothing fits.

Card sorts can be run in person with paper cards or remotely with online tools. Fifteen to thirty participants usually reveal the main patterns. Analysis looks at how often each pair of cards was put together, often shown as a similarity matrix or a tree diagram from clustering. Cards that almost everyone groups together belong together; cards that land everywhere signal content that needs a better name or a home in more than one place.

**Tree testing** checks the result. Participants see only a text version of the navigation hierarchy, with no visual design, and are asked where they would look to complete tasks such as "find the return policy." Success rates, directness, and time show whether the structure works and exactly where people take wrong turns. Stripping visual design isolates the labels and grouping, much as a [[Wireframe]] separates structure from appearance.

Together the two methods inform [[Information Architecture]]. Card sorting suggests groupings and labels, tree testing validates them, and [[Usability Testing]] later checks the whole design in use. The labels that come out of them carry stronger [[Information Scent]] because they come from the people who will follow them.

Card sorting has limits. It shows how people group things in the abstract, not how they search for them in the middle of a task. People sorting cards may group by surface features, such as all cards containing the word "account," rather than by purpose. Results are also bounded by the cards provided, so missing topics never surface. Some content works better found through [[Faceted Search]], since one item can belong to several groups at once.

The method has relatives in [[Taxonomy]] work, where controlled vocabularies are built from how people describe things, and in [[Heuristic Evaluation]], which checks findings against established principles.

## See also
- [[Gestalt Principles]]
- [[Recognition Rather Than Recall]]
- [[Hick's Law]]
- [[Progressive Disclosure]]
- [[Persona]]
