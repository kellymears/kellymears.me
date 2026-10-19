---
aliases:
  - Knight Capital
  - Power Peg
tags:
  - testing
summary: The 2012 deployment in which a trading firm updated seven of eight servers, waking dead code on the eighth that sent millions of unintended orders and lost about $460 million in 45 minutes.
---
The **Knight Capital incident** was a 45-minute trading failure on 1 August 2012 that cost Knight Capital Group, then one of the largest traders of US stocks, about $460 million and its independence. It is the standard example of a deployment, rather than a code change, being the bug.

Knight was preparing for a new New York Stock Exchange program for retail orders that started that morning. New code for its order router was to be installed on eight servers. A technician copied it to seven. No one noticed the eighth, because the deployment was manual and no second person reviewed it; see [[Configuration Drift]] and [[Infrastructure as Code]].

The new code reused an old flag. In the old code, that flag switched on a function called Power Peg, unused since 2003 but never removed. Power Peg sent orders until a parent order was filled, and the part that counted fills had been moved elsewhere in a 2005 change, so it no longer knew when to stop; see [[Dead code]] and [[Feature Flag]].

When the market opened, the seven updated servers handled orders correctly. The eighth ran Power Peg, which sent orders in an endless stream. In 45 minutes Knight made over 4 million trades in 154 stocks, more than 397 million shares, and built up positions worth billions of dollars that it never meant to hold.

The response made it worse. Unable to find the cause, staff removed the new code from the seven healthy servers, assuming the release was at fault. That left all eight running the old code with the reused flag on, so all of them started running Power Peg; see [[Rollback]]. Before the open, the system had sent 97 automated emails mentioning a Power Peg error. They weren't designed as alerts, and nobody acted on them; see [[Alarm fatigue]]. Knight had no written procedure for this kind of incident; see [[Incident Response]].

Within days Knight needed an emergency investment of about $400 million from other firms, and it was acquired the next year. The Securities and Exchange Commission later fined it $12 million for lacking adequate controls on its access to the market.

The lessons map onto standard delivery practice:

- **Delete dead code.** Code that should never run is a liability for as long as it exists.
- **Never reuse a flag.** A new meaning on an old switch turns every stale server into a different program.
- **Automate deployment and verify it.** Confirm that every server runs the same version before turning a feature on; see [[Deployment Pipeline]].
- **Roll out gradually.** A small first group of servers limits the damage when something is wrong; see [[Canary Release]].

## See also
- [[Left-Pad Incident]]
- [[Blameless Postmortem]]
- [[Mean Time to Recovery]]
- [[Amazon S3 Outage of 2017]]
