---
aliases:
  - Blameless Retrospective
  - No-Fault Postmortem
tags:
  - method
summary: Analyzing an incident on the assumption everyone involved made a reasonable decision given what they knew at the time.
---
**Blameless Postmortem** is an incident-review discipline that assumes, as a starting premise, that everyone involved took reasonable actions given the information they had at the time — and directs analysis toward the system and the information gaps rather than toward individual fault. It isn't about avoiding accountability; it's a bet, backed by evidence from aviation and healthcare safety research, that blame makes the *next* incident more likely, not less, because it teaches people to hide information rather than surface it.

The mechanism is straightforward once stated: if an engineer knows that admitting "I didn't realize that flag was still live" will be treated as a personal failing, they will, quite rationally, disclose less next time — to their manager, in the incident channel, in the postmortem doc. The organization loses exactly the raw material a postmortem needs to find the real gap: a monitoring blind spot, a runbook that was wrong, a deploy process with no safety rail. Blame optimizes for a satisfying story with a culprit; blamelessness optimizes for a system that fails less next time, which are frequently different goals pointed at different fixes.

This is easy to say and surprisingly easy to violate in the writing, not just the meeting: a postmortem timeline that says "the engineer failed to check the dashboard" is doing blame with a straight face, where "the dashboard required four clicks to reach and wasn't linked from the alert" locates the same fact as a system gap instead. The test is whether the sentence would still make sense with the name swapped for anyone else on the team — if it would, it's describing a system; if it wouldn't, it's describing a person.

Blamelessness is not the same as consequence-free — a genuine pattern of disregard for known procedure is a different problem, addressed differently and separately from the incident review whose only job is to find out what the system let happen.

## See also
- [[Root Cause Analysis]]
- [[Five Whys]]
- [[Silent Failure]]
- [[Hanlon's Razor]]

## Related
- [[Bus Factor]]
