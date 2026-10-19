---
aliases:
  - Euler diagram
tags:
  - design
summary: Overlapping closed shapes that show how sets relate, drawn so every possible combination has its own region, a logician's tool from 1880 that became one of the most recognized and most misused diagrams in popular culture.
---
A **Venn diagram** shows sets as overlapping closed curves, usually circles, so that every possible combination of membership has its own region. Two circles make four regions: in the first set only, in the second only, in both, and in neither. Three circles make eight.

The English logician John Venn introduced the diagrams in an 1880 paper as an aid to reasoning about categorical statements, such as all A are B, or some B are not C. Venn's key move was to draw every region whether or not anything belonged in it, then shade the regions known to be empty. That made the diagram a mechanical tool: a valid argument was one where the shading for the premises forced the shading for the conclusion; see [[Boolean Algebra]].

Venn was refining an older idea. Leonhard Euler had used circles to explain logic in letters published in the 1760s, but Euler's diagrams drew only the relationships that held, nesting one circle inside another when one set contained the other; see [[Seven Bridges of Königsberg]]. The two kinds are still confused. Most diagrams called Venn diagrams in practice are Euler diagrams, showing only the overlaps that exist.

Beyond three sets, circles no longer work, because no arrangement of four circles can produce all sixteen regions. Venn's own paper proposed ellipses and other shapes for four and five sets, and mathematicians have since found symmetric arrangements for larger numbers. They are elegant but nearly unreadable.

Venn diagrams are widely used and widely misused:

- **Area.** Readers assume region size means something. Making areas proportional to counts is possible for two circles and generally impossible for three; see [[Data Visualization]].
- **Many sets.** For more than three or four sets, alternatives that list combinations as a matrix with bar lengths are clearer; see [[Bar Chart]].
- **Databases.** Joins between tables are often explained with Venn diagrams, which critics note misrepresent how joins match rows; see [[SQL Join]].
- **Classification.** Diagnostic results are sometimes drawn as overlapping circles of condition and test, which can make base rates easier to see; see [[Precision and Recall]].

Popular culture adopted the form as a joke template. A diagram with two unlikely categories and a punchline in the overlap is a familiar meme. Logicians note a frequent error: the overlap should contain things that belong to both sets, but jokes often label it as a blend or as the result of combining them; see [[Meme]] and [[Infographic]].

The form's lasting strength is that it turns a logical relation into a spatial one, which people read without instruction; see [[Gestalt Principles]]. Containment, overlap, and separation map directly onto subset, intersection, and disjoint sets.

## See also
- [[Russell's Paradox]]
- [[Color Theory]]
