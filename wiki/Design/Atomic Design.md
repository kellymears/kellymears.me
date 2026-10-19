---
aliases:
  - Pattern Lab
  - Atoms, molecules, and organisms
tags:
  - design
summary: A method for building interfaces from small parts upward, atoms into molecules, organisms, templates, and pages, which helped teams move from designing pages to designing component systems.
---
**Atomic design** is a method for building interfaces from the smallest parts upward. The web designer Brad Frost introduced it in 2013, borrowing chemistry's names to describe five levels:

1. **Atoms** are the basic elements that can't be broken down further without losing their purpose: a label, an input, a button.
2. **Molecules** combine atoms into a simple working unit, such as a search form made of a label, an input, and a button.
3. **Organisms** are larger sections built from molecules and atoms, such as a site header with a logo, navigation, and search.
4. **Templates** arrange organisms into a page layout with placeholder content, showing structure without final words or images.
5. **Pages** are templates filled with real content, the stage where the system meets reality.

[[Responsive Web Design]] meant a page no longer had one fixed layout, and drawing every page at every screen width was hopeless. Designing a system of parts that rearrange themselves was the alternative, and atomic design gave teams a vocabulary for it. Frost and Dave Olsen built Pattern Lab, a tool for developing the parts in isolation and assembling them, an approach later tools adopted widely; see [[Component Story]].

The method feeds directly into a [[Design System]]. Atoms usually draw their colors, spacing, and type from shared values, sometimes called the subatomic level; see [[Design Token]]. The lowest layer often becomes a set of unstyled, accessible building blocks; see [[UI Primitive]] and [[Headless Component]]. Components built this way map naturally onto the composition model of modern front-end frameworks and native [[Web Components]], and onto the programming principle of combining small parts rather than extending large ones; see [[Composition over inheritance]].

The **pages** level is a deliberate check. Placeholder text fits wherever it's put, so a template full of it can hide that real headlines are three times longer, names don't fit, and images arrive in odd shapes; see [[Lorem Ipsum]]. Testing with real content shows whether the components hold up.

Common criticisms:

- **Classification debates.** Teams can spend hours arguing whether something is a molecule or an organism, a distinction that rarely matters; see [[Law of Triviality]].
- **Names that don't stick.** Developers and designers often drop the chemistry terms in favor of plain ones, which Frost himself has said is fine; the idea of building upward matters more than the labels; see [[Naming]].
- **Components still depend on context.** A card behaves differently in a sidebar than in a wide column. Styles that respond to a component's own container, rather than the screen, address this; see [[Container Query]].

Breaking an interface into parts also makes it easier to check that a change to one atom doesn't break every page that uses it; see [[Visual Regression Testing]].

## See also
- [[CSS Preprocessor]]
- [[CSS-in-JS]]
