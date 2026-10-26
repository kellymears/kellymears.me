---
aliases:
  - Dummy text
  - Greeking
  - Filler text
tags:
  - design
summary: The scrambled Latin filler typesetters and designers use to show a layout before the real words exist, useful for judging type and dangerous because it hides what real content will do to the design.
---
**Lorem ipsum** is the scrambled Latin text that designers and typesetters use to fill a layout before the real words exist. It begins "Lorem ipsum dolor sit amet, consectetur adipiscing elit," and nearly everyone who has built a page or a poster has seen it.

It is not random. In the 1980s the classics scholar Richard McClintock traced it to Cicero's *De finibus bonorum et malorum* (45 BC), a treatise on ethics. The passage, which in full reads "neque porro quisquam est qui dolorem ipsum quia dolor sit amet" ("nor is there anyone who loves pain itself because it is pain"), was chopped and garbled, so "dolorem" lost its first syllable to become "lorem." When it first became filler is disputed. It was long claimed to date from a 1500s printer, but the earliest confirmed uses are from the twentieth century, and it spread widely through 1960s Letraset transfer sheets and then 1980s desktop publishing software.

The practice of showing layout with meaningless text is called **greeking**. Filler text works because it has the shape of language without the pull of meaning: word lengths, letter frequencies, and line rhythm look like real prose, so a reader judges the texture, color, and spacing of the type instead of reading it.

The danger is that real content rarely behaves like filler, and designs built around it break when the words arrive:

- **Length.** Real headlines are longer or shorter than the tidy placeholder, real names overflow, and real lists have one item or three hundred; see [[Text Truncation]].
- **Translation.** German and Finnish run long and some scripts need different line heights, so a layout that fits Latin may not fit at all.
- **Hierarchy.** Without real text, nobody can tell whether the layout emphasizes the right things, because filler gives every block the same importance; see [[Visual Hierarchy]].
- **Leaks.** Placeholder text shipped by accident is a recurring embarrassment, from live websites to printed books and newspapers.

Hence the advice of **content-first design**: write, or at least draft, the real words before or alongside the layout. Even rough copy reveals problems that lorem ipsum hides, and the words themselves are often the most important part of an interface. Where real content isn't available, realistic samples of the right length and variety work better, including the awkward cases.

The same lesson appears in software testing. Sample data that is too clean, every name short and every field filled, hides bugs that real records expose, which is why good test fixtures include long, empty, and unusual values; see [[Seed Data]].

Lorem ipsum remains useful early on, in a wireframe where the point is structure and nobody should be reading yet.

## See also
- [[Skeleton Screen]]
- [[Grid System]]
