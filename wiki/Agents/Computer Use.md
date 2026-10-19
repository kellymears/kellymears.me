---
aliases:
  - Computer-use agent
  - Browser agent
  - GUI agent
  - Browser use
tags:
  - agents
summary: Agents that operate a computer the way a person does, by looking at screenshots and moving the mouse and typing, which reaches any app but is slow, error-prone, and easy to hijack.
---
**Computer use** is an agent operating a graphical interface the way a person would: looking at the screen, moving the pointer, clicking, scrolling, and typing. Instead of calling an API through [[Tool Use]], the model receives a screenshot, decides on an action such as "click at these coordinates" or "type this text", the action is performed, and a new screenshot comes back. The cycle is an [[Agentic Loop]] whose tools are a mouse and keyboard.

The appeal is reach. Most software has no API, or only a limited one, and nearly everything has a screen. A computer-use agent can in principle fill in an old government form, operate desktop software, or click through a website that offers no other way in. Anthropic released computer use for its models in public beta in October 2024, and OpenAI's browser-based Operator followed in January 2025.

**Robotic process automation** tools record clicks and replay them to automate repetitive office work, but they break whenever a button moves. A model that reads the screen can adapt to layout changes, at the cost of being far less predictable.

There are two main ways to perceive the screen:

- **Pixels.** Screenshots go to a [[Multimodal Model]], which must find the right button visually. General, but slow, token-hungry, and prone to misclicks.
- **Structure.** Browser agents can read the page's DOM or the accessibility tree that screen readers use, the same structure good [[Accessibility]] provides and the same one a [[Headless Browser]] drives in tests. Faster and more precise, when the structure is well built.

Current agents are slow, often taking minutes for tasks a person does in seconds. On OSWorld, a 2024 benchmark of real desktop tasks, humans complete about 72 percent of tasks, and the first agents managed only a fraction of that, though scores rose quickly. Long tasks compound errors, so a single wrong click early on can derail everything after it.

Security is the central problem. Everything on screen is input, so a webpage, email, or document can contain instructions that the agent reads and follows, a direct form of [[Prompt Injection]]. An agent logged into accounts can do anything those accounts can. Safer designs:

- **Isolation.** Run the agent in a dedicated virtual machine or browser profile, as described under [[Agent Sandbox]], with no access to personal sessions.
- **Confirmation.** Require a person to approve purchases, sends, deletions, and logins, the role of [[Human in the Loop]], especially where there is no [[Undo]].
- **Scope.** Limit the sites and accounts it can reach.

Where an API exists, it is usually better: faster, cheaper, and more reliable. Protocols such as the [[Model Context Protocol]] expose applications to agents directly, leaving computer use for what nothing else can reach.

## See also
- [[Corrigibility]]
- [[Imitation Learning]]
- [[Background Agent]]
- [[Browser DevTools]]
- [[Turing Test]]
