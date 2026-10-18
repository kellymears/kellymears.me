---
aliases:
  - Expert systems
  - AI winter
  - Knowledge engineering
  - Symbolic AI
tags:
  - agents
summary: Programs from the 1970s and 1980s that encoded specialists' knowledge as hand-written if-then rules, their commercial boom, the brittleness that ended it, and the AI winters that followed overpromising.
---
An **expert system** is a program that tries to reproduce a specialist's judgment in a narrow field by encoding their knowledge as explicit rules. They were the commercial face of artificial intelligence in the late 1970s and 1980s, and their rise and fall shaped how the field talks about its own hype.

The design had two parts:

- **A knowledge base** of if-then rules, such as "if the infection is in the blood, and the organism stains gram-negative, and the patient is immunocompromised, then there is suggestive evidence it is Pseudomonas."
- **An inference engine** that chained rules together, either forward from known facts to conclusions or backward from a hypothesis to the facts needed to confirm it; see [[Backtracking]].

Because the reasoning was explicit, a system could explain itself: asked "why?", it listed the rules it had fired, an interpretability that modern neural models lack; see [[Mechanistic Interpretability]].

Successes were real. MYCIN, built at Stanford in the 1970s, recommended antibiotics for blood infections about as well as specialists in evaluations, though it was never used clinically. XCON, at Digital Equipment Corporation, configured computer orders from thousands of rules and saved the company millions a year. By the mid-1980s, companies sold expert-system tools and specialized Lisp workstations to run them.

Then the limits showed:

- **The knowledge bottleneck.** Rules came from interviewing experts, a process called **knowledge engineering**. Experts often couldn't state what they knew, because much of it was intuition they'd never put into words; see [[Expert Intuition]] and [[Curse of Knowledge]].
- **Brittleness.** A system worked within its rules and failed badly at their edges, with no sense that a question fell outside its competence; see [[Distribution Shift]].
- **Maintenance.** Rule sets of thousands of entries interacted unpredictably, and adding a rule could break unrelated conclusions; see [[Technical Debt]].

When the market collapsed in the late 1980s, funding for the field dried up for years, the second **AI winter**. The first, in the 1970s, had followed early machine translation and perceptron research failing to meet their promises; see [[Neural Network]]. Both winters were cited later as warnings about overclaiming.

What replaced hand-written rules was learning from data: [[Supervised Learning]], then deep learning, then [[Large Language Model]]s that absorb expert knowledge from text rather than interviews. Rich Sutton's essay [[The Bitter Lesson]] argues this pattern recurs: methods that scale with computation beat methods built on human knowledge.

The ideas survive in business rules engines, tax software, and medical decision support, and in neuro-symbolic research combining learned models with explicit rules. A modern agent following a written procedure looks a little like an expert system whose rules are in prose; see [[Agent Skill]] and [[System Prompt]].

## See also
- [[Decision Tree]]
- [[Ontology]]
- [[Logic Programming]]
