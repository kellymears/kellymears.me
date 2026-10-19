---
aliases:
  - Behavior cloning
  - Learning from demonstration
  - Inverse reinforcement learning
tags:
  - agents
summary: Teaching an agent by showing it what an expert does instead of defining a reward, simple and effective until the agent drifts into situations the expert never demonstrated.
---
**Imitation learning** teaches an agent to act by showing it examples of an expert doing the task, instead of specifying a reward and letting it discover good behavior by trial and error; see [[Reinforcement Learning]]. A human drives, flies, or operates a robot arm, the system records what they saw and did, and the agent learns to do the same.

The simplest form, **behavior cloning**, treats each recorded moment as a labeled example, mapping what the expert observed to what they did, and trains an ordinary model on it; see [[Supervised Learning]]. In 1989, Dean Pomerleau's ALVINN at Carnegie Mellon learned to steer a van on real roads this way, from a few minutes of watching a human drive.

Behavior cloning has a characteristic flaw: **compounding errors**. The expert rarely makes mistakes, so the data contains almost no examples of recovering from them. When the learner makes a small error, it finds itself somewhere the expert never was, does something poor, and drifts further off course. Errors build up over long tasks; see [[Distribution Shift]]. ALVINN's designers addressed this by synthesizing images of the road from shifted viewpoints, labeled with the steering needed to get back on course.

A more general fix, DAgger (2011), lets the learner drive, asks the expert what they would have done in the situations it actually reached, and adds those answers to the training data, repeating until the learner's mistakes are covered; see [[Human in the Loop]].

Other problems:

- **Causal confusion.** Learners copy correlations, not reasons. A driving model with a view of the dashboard can learn to brake when the brake indicator lights, which happens only after the human brakes; see [[Cargo Cult]].
- **A ceiling.** A pure imitator can't easily exceed its teacher and copies the teacher's habits and mistakes along with skill.

**Inverse reinforcement learning** works backward from demonstrations to infer the goal the expert seems to be pursuing, then optimizes that goal, which can generalize better than copying actions.

Language models are imitation learners at enormous scale. Pretraining teaches a model to predict human-written text, and fine-tuning on example conversations is behavior cloning on human demonstrations; see [[Pretraining]] and [[Fine-Tuning]]. Reinforcement learning afterward helps the model move beyond its demonstrators; see [[Reinforcement Learning from Human Feedback]]. Agents that operate computers are trained partly on recordings of people using software; see [[Computer Use]].

Games use it too. Racing games have trained AI drivers on recordings of a player's own driving, so the player's ghost can race in their absence; see [[Game AI]]. Robot demonstrations are often captured with tracking suits or remote control; see [[Motion Capture]].

## See also
- [[Motor Learning]]
- [[Moravec's Paradox]]
- [[AlphaGo]]
- [[Paperclip Maximizer]]
