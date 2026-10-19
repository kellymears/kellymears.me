---
aliases:
  - Lagging indicator
tags:
  - method
summary: A measurement that tends to change before the outcome you care about, offering warning while there is still time to act, in contrast to a lagging indicator that confirms the outcome afterward.
---
A **leading indicator** is a measurement that tends to change before the outcome you actually care about, giving warning while there is still time to act. A **lagging indicator** confirms an outcome after it has happened. Revenue, injuries and customer churn are lagging. By the time they move, the causes are weeks or months old. A shrinking sales pipeline, a rise in near misses or a drop in logins are candidates for leading ones.

The distinction comes from economics. In the late 1930s, researchers at the National Bureau of Economic Research, notably Wesley Mitchell and Arthur Burns, sorted hundreds of statistical series by whether they turned before, with or after the business cycle. Building permits, new orders for manufactured goods, weekly unemployment claims and stock prices tended to lead. The unemployment rate itself tends to lag, since firms are slow to hire again after a recovery begins. Composite indexes of leading series are still published. A well-known single example is the yield curve. When short-term interest rates rise above long-term ones, a recession has often followed within a year or two, though not after every inversion.

The vocabulary spread through management, safety and operations. Safety programs treat near misses and unsafe conditions as leading indicators of injuries. Software teams watch error rates, latency and queue depth because these degrade before customers complain or an outage is declared; see [[Service Level Objective]] and [[Anomaly Detection]]. A [[Dashboard]] that shows only lagging numbers describes the past without helping anyone change the future.

Leading indicators are harder to trust. They are usually proxies, chosen because they are believed to cause or predict the outcome, and that belief can be wrong or can stop being true; see [[Operationalization]] and [[Correlation and Causation]]. They are noisy, so a single movement means little, and alerting on every blip trains people to ignore alerts. Separating a real shift from routine variation is the job of a [[Control Chart]].

The bigger risk is turning them into targets. Once people are rewarded for moving a leading indicator, they find ways to move it that don't move the outcome: more sales calls logged rather than better ones, fewer incidents reported rather than fewer incidents; see [[Goodhart's Law]] and [[Campbell's Law]]. An indicator that once predicted the outcome then stops predicting it, and an organization that manages only by what it can count is prone to the [[McNamara Fallacy]].

The usual remedy is to pair them. Goal frameworks such as [[Objectives and Key Results]] often combine a lagging outcome with the leading measures expected to drive it, and review whether the link actually holds. Over time, a team that watches both learns which early signals were real and which were noise, and adjusts what it watches; see [[Feedback Loop]].

## See also
- [[Black Swan]]
- [[Superforecasting]]
