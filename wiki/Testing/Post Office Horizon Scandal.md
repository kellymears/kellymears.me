---
aliases:
  - Horizon scandal
  - Horizon IT scandal
tags:
  - testing
summary: The British Post Office prosecuted hundreds of its own branch operators for shortfalls that its Horizon accounting software had produced, aided by a legal presumption that computers work correctly.
---
The **Post Office Horizon scandal** is among the largest miscarriages of justice in British history. From 1999 the Post Office ran its branches on Horizon, an accounting system built by ICL, later part of Fujitsu. Over the following sixteen years it prosecuted more than 900 subpostmasters, the self-employed people who run local branches, for theft, fraud, and false accounting, on the strength of shortfalls that Horizon reported. Many were jailed, many were bankrupted repaying money they had never taken, and some took their own lives.

The shortfalls came from the software. Horizon had bugs that could duplicate transactions, misreport balances, and leave branch accounts out of step after communication failures; see [[Eventual Consistency]]. Fujitsu staff could also alter branch data remotely, which the Post Office long denied. Subpostmasters who called the helpline were often told that nobody else was having problems, which isolated each of them and made each case look like individual dishonesty.

The legal system had removed its own check. Until 1999, English criminal law required the prosecution to show that a computer was working properly before its output could be used as evidence. That rule was repealed, leaving a presumption that machines work correctly unless shown otherwise. A defendant had to prove the software faulty without access to its code, error logs, or bug records; see [[Burden of Proof]]. Courts treated the system as a [[Test Oracle]] whose answer needed no checking, a legal version of [[Automation Bias]].

The turn came from a group action led by Alan Bates, a former subpostmaster, on behalf of 555 claimants. In 2019 the High Court found that Horizon contained bugs, errors, and defects capable of causing the shortfalls, and that remote access existed. The Post Office settled for about £58 million, most of which went to legal costs and funders. Convictions began to be quashed in 2020, a public inquiry opened, and after a 2024 television drama brought the story to a wide audience, Parliament passed a law quashing the remaining convictions as a group.

For anyone who builds or tests software, the lessons are uncomfortable:

- **Known defects were kept internal.** Fujitsu tracked many of the bugs, but the records never reached the people prosecuted; see [[Bug Triage]] and [[Crash Reporting]].
- **The user was blamed by default.** When the books didn't balance, the operator was assumed to be at fault, a pattern that [[Blameless Postmortem]] practice exists to break.
- **Audit records were not independent.** An [[Audit trail]] that the system's owner can edit proves little; see [[Logging]].
- **Institutions defended their position.** Each prosecution made admitting the fault more costly; see [[Sunk Cost Fallacy]] and [[Cognitive Dissonance]].

## See also
- [[Requirements Traceability]]
- [[Verification and Validation]]
- [[Healthcare.gov Launch]]
- [[Freedom of Information]]
