---
aliases:
  - Toyota sudden acceleration
  - Bookout v. Toyota
tags:
  - testing
summary: Reports of Toyota cars speeding up on their own led to recalls for floor mats and sticking pedals, a NASA study that found no electronic cause, and a jury verdict after experts found the throttle software unsafe.
---
**Toyota unintended acceleration** refers to a wave of reports, peaking in 2009 and 2010, of Toyota and Lexus vehicles speeding up without the driver pressing the accelerator. It led to recalls of millions of vehicles, congressional hearings, and a long argument over whether software was to blame. The case is studied less for its answer than for how hard it was to get one.

The trigger was an August 2009 crash near San Diego, in which an off-duty highway patrol officer and three relatives died when a loaned Lexus accelerated out of control. The cause there was mechanical: an all-weather floor mat of the wrong type had trapped the pedal. Toyota recalled vehicles for mats and, separately, for pedals that could stick partly open. It later paid $1.2 billion to settle a federal criminal case for misleading regulators and the public about those defects.

Many owners suspected the electronic throttle, which replaced the cable between pedal and engine with sensors and software. In 2011 a NASA team, asked by federal regulators to look, reported that it had found no electronic flaw that could open the throttle that far, while noting it could not prove one did not exist; see [[Burden of Proof]]. Transportation officials declared the matter settled.

In 2013 an Oklahoma jury disagreed. In Bookout v. Toyota, over a 2007 crash, embedded-software experts who had spent months in Toyota's source code testified about what they found. They described tangled code with high [[Cyclomatic Complexity]], thousands of global variables, a risk of [[Stack overflow]] that had not been ruled out, and widespread breaches of the MISRA C coding rules for safety-critical code; see [[Spaghetti code]] and [[Static Analysis]]. They argued that a single task handled both throttle control and much of the failure checking, so that if it died, the [[Watchdog Timer]] would not necessarily notice and the throttle could stay where it was. They demonstrated that a single flipped bit in the wrong place could do this; see [[Single-Event Upset]]. The jury found Toyota liable, and the company settled before punitive damages were decided.

What the case does not show is that software caused most of the reports. Data from event recorders in many crashes showed the accelerator pressed and the brakes untouched, consistent with drivers pressing the wrong pedal, the same conclusion investigators had reached about an Audi panic in the 1980s; see [[Moral Panic]].

The lessons for testing sit between those two findings:

- **Absence of evidence is weak evidence** when no one tested for the failure in question; see [[Fault injection]].
- **A safety argument needs independent monitoring,** so the checker does not share a failure with the thing it checks; see [[N-Version Programming]].
- **Code quality is evidence.** Unreviewable code cannot support a [[Safety Case]].

## See also
- [[Real-Time Operating System]]
- [[Code Review]]
- [[Microcontroller]]
