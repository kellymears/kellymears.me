---
aliases:
  - Flow chart
tags:
  - design
summary: A diagram of a process drawn as boxes for steps and diamonds for decisions joined by arrows, born in industrial engineering, adopted by early programmers, and still the default way to sketch how something proceeds.
---
A **flowchart** represents a process as a set of shapes joined by arrows. Each shape is a step, and the arrows show what comes next. Its conventions are among the most widely understood in diagramming: a rounded box for start and end, a rectangle for an action, a diamond for a decision with one exit per answer, and a slanted box for input or output.

The form came from industrial engineering. In 1921 Frank and Lillian Gilbreth presented the **flow process chart** to the American Society of Mechanical Engineers as a way to record and improve the steps of factory work, part of their broader study of motion and efficiency. Their descendants include the process maps used in manufacturing and operations today.

Programming adopted the form early. In 1947 Herman Goldstine and John von Neumann described flow diagrams as a way to plan programs for electronic computers, whose instructions jumped from place to place. For decades, programmers drew flowcharts with plastic stencils before writing code, and standards bodies fixed the symbols in the 1960s.

Flowcharts fell out of favor in programming for a specific reason. They make any jump easy to draw, so they encouraged tangled control flow. The structured programming movement argued that code should be built from sequences, loops, and conditionals, which a flowchart can express but doesn't enforce. Alternatives such as Nassi-Shneiderman diagrams, from 1973, allowed only structured shapes, and programmers increasingly found that well-written code or pseudocode said the same thing more compactly.

Outside code, flowcharts thrived:

- **Procedures.** Medical protocols, troubleshooting guides, and emergency checklists use them to make decisions explicit; see [[Checklist]].
- **Business processes.** Swimlane flowcharts put each person or department in its own column, showing handoffs where work tends to stall.
- **Software design.** User flows map how people move through screens, often drawn before any detailed layout.

Their main limitation is scale. A flowchart with dozens of decisions becomes a maze, and one with loops and parallel work is hard to read at all. Systems with many states are often clearer as state diagrams, which show where a process can be rather than every path through it; see [[Finite State Machine]]. The number of independent paths through a flowchart is also a measure of how hard the process is to test.

Flowcharts have a second life as humor, in charts that walk readers through absurd decisions. The joke works because the format promises rigor, so the flowchart serves as a familiar template, recognizable at a glance.

## See also
- [[Data Visualization]]
