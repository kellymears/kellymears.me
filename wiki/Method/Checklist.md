---
aliases:
  - Checklist Manifesto
  - Read-do
  - Do-confirm
tags:
  - method
summary: A short written list of critical steps checked at a set moment, which aviation adopted after a 1935 crash and surgery after a 2009 study cut deaths by more than a third, because experts skip steps under pressure, not from ignorance.
---
A **checklist** is a written list of steps or checks to confirm at a set point in a task. It sounds too simple to matter, yet in aviation and medicine checklists have saved more lives than many technical advances, because they target a failure that expertise alone doesn't prevent: skilled people forgetting a step they know perfectly well.

The modern history starts with a crash. In 1935 the Boeing Model 299, the prototype of the B-17 bomber, took off for an evaluation flight and crashed, killing two of the crew. The cause was a locked elevator control that the experienced test pilot had forgotten to release. Rather than demand more training, test pilots wrote a short card of steps for takeoff, landing, and taxiing. The aircraft went on to fly long distances without a serious accident, and the checklist became standard practice in aviation.

The surgeon Atul Gawande popularized the idea in *The Checklist Manifesto* (2009). He helped the World Health Organization develop a nineteen-item surgical safety checklist, covering checks such as confirming the patient's identity and procedure, and having team members introduce themselves. In a study across eight hospitals in different countries, deaths after surgery fell by more than a third and complications by about the same.

Why they work:

- **Memory fails under load.** Under stress, interruption, or fatigue, people skip routine steps without noticing; see [[Working Memory]] and [[Prospective Memory]].
- **Routine breeds shortcuts.** Steps that rarely matter get dropped until the day they do; see [[Normalization of Deviance]].
- **They flatten hierarchy.** A checklist that requires each member to speak gives junior staff permission to raise a problem.

Good checklists are short, usually five to nine items, and limited to the critical steps most likely to be skipped, not every step. They come in two styles. **Read-do** lists are followed step by step, like a recipe, suited to rare or complex procedures. **Do-confirm** lists let experts work from memory, then pause at a defined point to confirm nothing was missed. A checklist must be tested in real use and revised, since a long or vague list gets ignored.

In software, the same ideas appear in release procedures, incident runbooks, and pull-request templates; see [[Incident Response]] and [[Code Review]]. They help most for rare, high-stakes operations, such as a database failover performed twice a year, where nobody remembers the steps. Automation goes further: a check that can run on every change, like a test or a lint rule, beats a box someone must remember to tick; see [[Forcing Function]] and [[Continuous Integration]].

Checklists also have failure modes. Ticking boxes without performing the checks turns them into ritual; see [[Cargo Cult]]. Lists that grow after every incident become too long to use; see [[Feature Creep]].

## See also
- [[Side Quest]]
- [[Apollo 11 Program Alarms]]
- [[Air France Flight 447]]
