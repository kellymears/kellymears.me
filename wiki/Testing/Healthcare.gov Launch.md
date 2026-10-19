---
aliases:
  - Healthcare.gov
  - Tech surge
tags:
  - testing
summary: The 2013 launch of the US federal health insurance marketplace, which failed under real traffic after end-to-end testing was squeezed into its final days, and whose rescue led to new government digital service teams.
---
**Healthcare.gov** was the website through which Americans in most states would buy health insurance under the Affordable Care Act. It went live on 1 October 2013 and failed almost immediately. Pages timed out, account creation stalled, and error messages piled up. Reports at the time indicated that only a handful of people managed to finish enrolling on the first day. For weeks the site, a central part of a signature government program, was the subject of congressional hearings and late-night jokes.

The causes ran from architecture to management:

- **Late integration.** The system was built by dozens of contractors, each responsible for a piece, connecting to databases at several federal agencies and to insurers. The pieces were not tested together as a whole until shortly before launch; see [[Integration Test]] and [[End-to-End Test]]. Policy decisions kept changing the requirements into the final months.
- **Too little load testing.** Tests in the final days showed the site struggling with a few hundred simultaneous users, far below expected traffic. It launched anyway, into a surge of visitors on day one; see [[Load Testing]] and [[Thundering Herd]].
- **A forced bottleneck.** Late in development, the design was changed to require users to create an account and verify their identity before they could even browse plans. Every visitor hit the identity-checking components at once, and those failed first.
- **No visibility.** Once live, the team lacked basic monitoring, so it was hard to tell which component was failing or why; see [[Synthetic Monitoring]] and [[Distributed Tracing]].
- **Diffuse ownership.** No single party had both the authority and the technical knowledge to coordinate the whole system, and warnings about readiness did not change the launch date; see [[Conway's Law]].

A rescue effort, dubbed the **tech surge**, brought in a small team of engineers from the technology industry alongside the existing contractors. They added monitoring, held daily stand-ups focused on the worst errors, fixed bottlenecks one at a time, and added capacity. By December the site worked for most users, and enrollment eventually exceeded the government's targets.

The episode became a standard example of the risks of large, long projects that defer integration to the end, the opposite of testing early and often; see [[Big Design Up Front]] and [[Shift-Left Testing]]. Adding people late to a struggling project rarely helps, but in this case the rescuers were few and focused on removing obstacles; see [[Brooks's Law]].

Its most lasting effect was institutional. Members of the rescue team helped found the United States Digital Service in 2014, and the federal 18F team began that same year, both aimed at bringing modern software practices, including continuous delivery, automated testing and user research, into government projects; see [[Agile Software Development]] and [[Smoke Test]].

## See also
- [[Staging Environment]]
- [[Post Office Horizon Scandal]]
