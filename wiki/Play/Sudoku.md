---
aliases:
  - Number Place
  - Latin square
tags:
  - play
summary: A logic puzzle filling a nine-by-nine grid with digits so no row, column, or box repeats one, created in an American puzzle magazine in 1979, named in Japan, and a worldwide craze from 2005.
---
**Sudoku** is a logic puzzle played on a nine-by-nine grid divided into nine three-by-three boxes. Some cells start filled; the solver completes the rest so that each row, each column, and each box contains the digits 1 through 9 exactly once. No arithmetic is involved at all. The digits could just as well be letters, shapes, or colors.

The puzzle first appeared in 1979 in an American magazine from Dell Magazines under the name Number Place, and is generally credited to the puzzle constructor Howard Garns. The Japanese publisher Nikoli introduced it in Japan in 1984 and gave it the name Sudoku, an abbreviation of a phrase meaning that the digits must stay single. A retired judge from New Zealand wrote software to generate puzzles and persuaded The Times in London to print them in late 2004. Within months, newspapers around the world carried them, and 2005 became the year of the Sudoku craze.

A well-made puzzle has exactly one possible solution and can be solved by logic alone, without guessing. Solvers use a ladder of techniques:

- **Singles.** A cell has only one possible digit, or a digit has only one possible place in a row, column, or box.
- **Pairs and triples.** Two cells in a row that can only hold the same two digits rule those digits out elsewhere in that row.
- **Patterns.** Advanced techniques with names like X-wing find chains of linked possibilities across the grid.

Puzzles are rated by the hardest technique they require, which gives publishers a way to build a smooth progression from easy to fiendish; see [[Difficulty Curve]].

Sudoku has attracted mathematicians. The number of valid completed grids was calculated in 2005 at about 6.67 sextillion. In 2012, an exhaustive computer search established that a puzzle with a unique solution needs at least 17 starting digits. Generalized to larger grids, the puzzle belongs to a class of problems believed to have no fast general solution; see [[P versus NP Problem]].

To a computer scientist, Sudoku is a [[Graph Coloring]] problem: 81 cells, nine colors, and an edge between any two cells that can't match. Solvers usually combine [[Constraint Propagation]], which removes impossible digits, with [[Backtracking]], which guesses and undoes when stuck. A procedure for generating game levels from tile rules works the same way; see [[Wave Function Collapse]].

For people, the appeal is steady absorption: clear rules, constant small progress, and a definite, checkable end; see [[Flow]]. Holding candidates in mind taxes short-term memory, which is why many paper solvers pencil small digits into the corners of cells; see [[Working Memory]].

## See also
- [[Crossword]]
- [[Escape Room]]
- [[Procedural Generation]]
- [[Abstract Strategy Game]]
- [[Solitaire]]
