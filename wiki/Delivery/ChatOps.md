---
aliases:
  - Hubot
  - Chat-driven operations
tags:
  - delivery
summary: Running deployments, queries, and incident tasks through commands in a team chat room, so operational work happens in shared view with a built-in record, at the cost of turning chat into part of the control plane.
---
**ChatOps** is the practice of running operational tasks, such as deploying code, checking system status, or managing incidents, by typing commands into a team chat room. A bot in the room carries out the commands and posts the results. The work happens where the team is already talking, in front of everyone.

The term is associated with GitHub, which built a chat bot called Hubot around 2011 and open-sourced it. Engineers there used it to deploy, look up graphs, and run routine tasks, and talks by GitHub staff around 2013 popularized the name. Later, chat platforms such as Slack added slash commands and integrations that made the pattern common; see [[Internet Relay Chat]].

The appeal comes from shared visibility:

- **Context.** Everyone in the room sees what was run, by whom, and what happened, without a separate status report.
- **A record.** Chat history becomes an informal audit log of operational actions.
- **Teaching by example.** New team members learn how things are done by watching commands go by.
- **Consistency.** Bots wrap complicated procedures in simple, tested commands, so everyone runs them the same way; see [[Platform Engineering]].

Incident response is where ChatOps is most common. Teams open a dedicated channel per incident, page responders from it, post timelines, and update status pages through bot commands. The channel history later feeds the postmortem; see [[Incident Response]], [[Status Page]], and [[Blameless Postmortem]].

ChatOps overlaps with other practices that make operations visible and repeatable. Deployments triggered from chat usually run through the same pipeline as any other release; see [[Deployment Pipeline]]. GitOps takes a different route to a similar goal, recording desired changes in a repository rather than in chat; see [[GitOps]].

The approach has drawbacks:

- **Security.** A chat bot that can deploy or change production makes the chat platform part of the control plane. Compromised chat accounts become a serious risk, and secrets must never be pasted into rooms; see [[Secrets Management]].
- **Noise.** Rooms full of automated messages and alerts become easy to ignore; see [[Alarm fatigue]].
- **Circular dependencies.** If the chat service or the network it relies on is down during an outage, so is the team's main tool. Teams need fallback access; see [[Pager]].
- **Fragile commands.** Free-text commands are easy to mistype, so dangerous actions need confirmation steps.

Some organizations now add AI assistants to the same channels, letting people ask questions in natural language and have the assistant query monitoring systems or suggest steps. The same questions of permission and accountability apply.

ChatOps fits the broader DevOps idea that operations work should be shared, automated, and visible rather than held by a few specialists; see [[DevOps]] and [[Observability]].

## See also
- [[Command-Line Interface]]
- [[Site Reliability Engineering]]
