---
aliases:
  - Samsung Galaxy Note 7
  - Note 7 battery fires
tags:
  - testing
summary: The 2016 recall of a flagship smartphone whose batteries caught fire, in which the replacement units also burned because they had a different defect, a costly lesson in finding the real root cause before shipping the fix.
---
The **Samsung Galaxy Note 7** went on sale in August 2016 to strong reviews. Within days, owners began posting photos of phones that had swelled and burst into flames, some while charging.

In early September, Samsung announced a recall of about 2.5 million phones and traced the problem to batteries from one of its two suppliers, its affiliate Samsung SDI. Replacement phones fitted with batteries from the second supplier, Amperex Technology, began shipping within weeks.

Then the replacements caught fire too. One began smoking aboard a Southwest Airlines plane at the gate in Louisville in October, forcing an evacuation. Within days Samsung halted production and discontinued the phone entirely. Airlines and aviation regulators banned the Note 7 from flights.

Investigations reported in January 2017 found that the two batteries had failed for **different reasons**:

- In the first supplier's cells, the battery was slightly too large for its casing, which squeezed one upper corner. That pressure bent the electrodes and could let the positive and negative sides touch through the thin separator.
- In the second supplier's cells, rushed to meet the replacement demand, welding burrs on the electrode tabs could pierce the separator, and some cells lacked insulating tape.

Either defect could cause an internal short circuit, and a short in a lithium-ion cell can trigger **thermal runaway**, in which heat drives reactions that release more heat until the cell vents flame; see [[Thermal runaway]]. The phone's aggressive design, packing a high-capacity battery into a thin case with little margin for swelling, made both defects more likely to matter; see [[Margin of Safety]].

The first fix was a reasonable-looking response to a real cause. It was also incomplete, because the investigation that produced it had not established that the cause it found was the only one; see [[Root Cause Analysis]]. Swapping suppliers changed one variable and introduced another. Thorough testing of the replacements under stress might have caught the second defect before millions shipped, but schedule pressure pushed in the other direction; see [[Regression Testing]] and [[Accelerated life testing]].

Samsung later introduced an eight-point battery safety check, including X-ray inspection of cells, charge and discharge testing, disassembly of samples and accelerated use tests; see [[Non-Destructive Testing]]. Estimates put the total cost of the recall at more than five billion dollars.

The episode is often compared to earlier hardware failures that turned into reputational crises because the first response did not end the problem; see [[Pentium FDIV Bug]]. It also shows why fault tolerance for batteries now leans on physical safeguards, such as separators that shut down when hot and cases designed to vent safely, so that one defect cannot become a fire; see [[Fail-Safe]].

## See also
- [[Common-Mode Failure]]
- [[Failure Mode and Effects Analysis]]
- [[Boeing 737 MAX Groundings]]
