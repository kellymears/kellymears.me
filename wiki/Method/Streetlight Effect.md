---
aliases:
  - Drunkard's search
tags:
  - method
summary: Looking where the light is good rather than where the answer is.
---
**The streetlight effect** is the tendency to search where observation is easy rather than where the thing you are looking for actually is. The name comes from the parable of a drunk man searching under a streetlight for keys he dropped elsewhere, because, as he explains, "this is where the light is." The joke works because the logic is locally sound and globally useless.

In practice the effect is rarely a personal failing so much as a property of [[Instrumentation]]: a system logs what someone thought to log, a metric measures what was cheap to measure, and both attract disproportionate attention afterward simply because they are the data that exists. A dashboard full of request latency says nothing about the request that never got dispatched. Investigation converges on the visible layer, and the write-up mistakes thoroughness of the search for coverage of the problem.

Because the cause is instrumentation rather than laziness, the fix is rarely "look harder" — a wider search under the same streetlight still only covers the same patch of ground. The fix is [[Observability]]: extending what can be seen at all, so that looking becomes possible in places it previously was not. This is also why the effect compounds with [[Survivorship Bias]] and [[Selection Bias]] — cases that never reach the lit area are excluded from the sample before any bias in interpreting the sample even gets a chance to operate, which is a [[Root Cause Analysis]] built entirely on the wrong half of the evidence.

## See also
- [[Ground Truth]]
- [[Silent Failure]]
- [[Truncation Bias]]
- [[Fermi Estimation]]
