---
aliases:
  - Logo programming language
  - Turtle geometry
tags:
  - graphics
summary: Drawing by steering a cursor with commands like forward and turn, introduced with the Logo language as a way for children to learn mathematics by imagining themselves as the turtle, and still a common first taste of programming.
---
**Turtle graphics** is a way of drawing in which a cursor, called the turtle, moves around the screen following simple commands. It has a position and a heading. Tell it to go forward 100 steps and it draws a line in the direction it faces. Tell it to turn right 90 degrees and it changes direction without moving. Repeat forward and turn four times and you've drawn a square.

The approach comes from **Logo**, a programming language created in 1967 by Wally Feurzeig, Seymour Papert, and Cynthia Solomon at the research firm Bolt, Beranek and Newman. Logo was designed for children and borrowed much of its structure from Lisp; see [[Lisp]]. The first turtles were physical robots, dome-shaped machines that crawled across paper on the floor dragging a pen. Screen turtles, faster and cheaper, soon took over.

Papert, who had worked with the developmental psychologist Jean Piaget, argued that children learn best by building things they care about. In the 1980 book Mindstorms, Papert described turtle geometry as "body-syntonic": a child who can't work out how to draw a circle can walk one, noticing that they step forward a little and turn a little, over and over. That intuition translates directly into code; see [[Mental Model]] and [[Curiosity]].

Turtle geometry differs from the usual coordinate approach. Instructions are relative to where the turtle is and which way it faces, not to fixed axes. That makes some shapes much easier to describe:

- **Polygons** come from repeating forward and turn, with the turn equal to 360 degrees divided by the number of sides.
- **Spirals** come from increasing the step length each time.
- **Fractals** come naturally from procedures that call themselves at smaller sizes, as in Koch snowflakes and branching trees; see [[Recursion]] and [[Fractal]].

The turtle has an important property: total turning around any closed path adds up to a multiple of 360 degrees, a fact children can discover by experiment.

Turtle commands also drive **L-systems**, which describe plants and fractals as strings of symbols. Each symbol is interpreted as a turtle instruction: draw forward, turn, save position, return; see [[L-System]].

The model survives in many places. Python's standard library includes a turtle module, and educational environments such as Scratch descend from Logo's ideas. Pen plotters, which move a physical pen over paper, are driven by similar relative instructions; see [[Vector Graphics]] and [[Vector Display]]. Converting the turtle's lines to pixels on screen uses line-drawing algorithms; see [[Bresenham's Line Algorithm]].

Logo's broader legacy is the idea that programming can be a medium for thinking, not just a vocational skill. Many generative artists' first experiments were turtle drawings; see [[Generative Art]].

## See also
- [[Procedural Generation]]
- [[Flow]]
- [[Catmull-Rom Spline]]
