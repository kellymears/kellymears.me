---
aliases:
  - Therac-25 accidents
tags:
  - testing
summary: A radiation therapy machine that massively overdosed six patients between 1985 and 1987 after its makers replaced hardware safety interlocks with software containing a race condition, now the standard case study in software safety.
---
The **Therac-25** was a radiation therapy machine built by Atomic Energy of Canada Limited (AECL). Between 1985 and 1987 it gave six known patients massive overdoses, far beyond any intended dose, and at least three of them died. Nancy Leveson and Clark Turner's 1993 investigation made it the standard case study of software that kills.

The machine could treat with a low-power electron beam or with X-rays, which it made by firing a far stronger beam at a metal target. The danger was the strong beam reaching a patient without the target in place. Earlier models, the Therac-6 and Therac-20, had hardware interlocks that physically prevented this. The Therac-25 dropped them and trusted software alone, much of it reused from those earlier machines; see [[Forcing Function]].

Two bugs were found.

- **Fast editing.** If an operator selected X-ray mode and then corrected it to electron mode within about eight seconds, the screen showed the correction, but the setup routine had already read the old settings. The beam could fire at full power with no target. Experienced operators, who typed quickly, were the ones who triggered it; see [[Race Condition]].
- **Counter overflow.** A one-byte variable was incremented, rather than set, on each pass of a setup loop. Every 256th pass it rolled over to zero, which the program read as "no check needed," and a safety check on the machine's position was skipped; see [[Integer Overflow]].

The Therac-20 turned out to share the first bug, but there its hardware interlocks blew a fuse instead of harming anyone. The reused code had been "proven" by machines whose hardware was quietly catching its failures.

The surrounding practices made things worse. Errors appeared as terse codes such as "MALFUNCTION 54," which the manual didn't explain, and the operator could resume treatment with a single keypress; see [[Error Message]]. Malfunctions were so frequent that operators learned to proceed past them; see [[Alarm fatigue]] and [[Normalization of Deviance]]. When patients reported burning pain, AECL insisted an overdose was impossible. The software had been tested mostly as part of the assembled machine, with little testing of its own, and no one could reproduce the fault until a hospital physicist worked out the keystroke timing; see [[Unit Test]].

The lessons Leveson drew are still cited. Reusing software doesn't make it safe, because its record depends on the system it ran in. Testing can show the presence of errors but not their absence; see [[Verification and Validation]]. A single layer of protection, however well tested, is still a single layer; see [[Defensive Programming]]. And a manufacturer's confidence is not evidence.

## See also
- [[Ariane 5 Flight 501]]
- [[Assertion]]
- [[Blameless Postmortem]]
