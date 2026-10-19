---
aliases:
  - Protein structure prediction
  - Protein folding problem
tags:
  - agents
summary: DeepMind's system for predicting a protein's three-dimensional shape from its amino-acid sequence, which largely solved a fifty-year-old problem in biology in 2020 and shared the 2024 Nobel Prize in Chemistry.
---
**AlphaFold** is a system developed by Google DeepMind that predicts the three-dimensional shape of a protein from its sequence of amino acids. Its second version, presented in 2020, reached accuracy comparable to laboratory methods for many proteins, largely solving a problem biologists had worked on for about fifty years. Demis Hassabis and John Jumper shared the 2024 Nobel Prize in Chemistry for it, alongside David Baker for computational protein design.

Proteins are chains of amino acids that fold into precise shapes, and the shape determines what a protein does: which molecules it binds, which reactions it speeds up; see [[Catalysis]]. Folding is driven by chemistry, such as hydrogen bonds and which parts avoid water, and losing the shape destroys function; see [[Hydrogen Bond]] and [[Protein Denaturation]]. Determining structures experimentally, by X-ray crystallography or electron microscopy, can take months or years per protein. Predicting them from sequence alone seemed intractable, since a chain could in principle adopt astronomically many shapes.

Progress was measured by CASP, a competition held every two years since 1994, in which groups predict structures that have been determined experimentally but not yet published. Because the answers are unknown to entrants, it's a genuinely blind test; see [[Benchmark Contamination]]. The first AlphaFold won the 2018 round. AlphaFold 2 won in 2020 by a wide margin, with most predictions close to experimental accuracy.

The system learns from known structures and from evolution. Related proteins across species vary in coordinated ways: when two positions change together across many species, they're probably in contact in the folded shape. AlphaFold 2 reads alignments of related sequences and reasons about relationships between every pair of positions using attention, then builds the 3D structure, refining it over several passes; see [[Attention Mechanism]] and [[Graph Neural Network]]. It also reports how confident it is for each region, and those estimates have proved useful in practice; see [[Calibration]].

In 2021, DeepMind and the European Bioinformatics Institute released a public database of predictions, which grew to more than 200 million structures, covering nearly every known protein; see [[Open Data]]. AlphaFold 3, announced in 2024, extended prediction to complexes of proteins with DNA, RNA, and small molecules, using a diffusion-based approach; see [[Diffusion Model]]. Its code was initially withheld, drawing criticism from scientists, and was later released for academic use.

The predictions have limits. They show a single static shape, while many proteins move or have flexible regions with no fixed structure. They don't explain how folding happens, only the result.

AlphaFold is often cited as the strongest case for scientific uses of AI, and DeepMind's earlier game systems were its direct predecessors; see [[AlphaGo]] and [[Bitter Lesson]].

## See also
- [[Deep Blue]]
- [[Scaling Laws]]
- [[Crystal Structure]]
