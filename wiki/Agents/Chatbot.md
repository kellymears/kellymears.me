---
aliases:
  - Chatbots
  - Conversational agent
  - PARRY
  - Dialogue system
tags:
  - agents
summary: A program that converses with people in natural language, from the scripted pattern-matchers of the 1960s through customer-service bots and voice assistants to language models trained to follow instructions, a lineage in which people have always credited the programs with more understanding than they had.
---
A **chatbot** is a program built to hold a conversation in ordinary language, typed or spoken. The idea is as old as the [[Turing Test]], which made conversation the measure of machine intelligence, and most of the history consists of programs that seemed cleverer than they were.

The first famous one, ELIZA, was written by Joseph Weizenbaum at MIT in the mid-1960s. Its best-known script played a therapist, matching keywords and reflecting statements back as questions. Weizenbaum was disturbed to see people confiding in it, a reaction now called the [[ELIZA Effect]]. Weizenbaum spent years afterward warning against handing human judgment to computers, notably in the 1976 book Computer Power and Human Reason. In 1972 the psychiatrist Kenneth Colby built **PARRY**, which simulated a paranoid patient; in a test, psychiatrists reading transcripts struggled to tell its replies from real patients'. PARRY and ELIZA were once connected over the early ARPANET to converse with each other.

For decades chatbots were hand-written rules and pattern libraries. Systems like A.L.I.C.E., written by Richard Wallace, won annual Turing-style contests with thousands of scripted responses, and statistical tricks borrowed from text generators added variety; see [[Markov Chain]]. Commercial bots handled customer service and instant-messaging novelties such as SmarterChild, usually by steering users through fixed menus. Voice assistants such as Siri, launched on the iPhone in 2011, added speech in and out, but under the hood they mostly mapped requests onto a set of known tasks; see [[Automatic Speech Recognition]]. Amazon's Alexa followed in 2014, putting an assistant into a speaker on the kitchen counter.

Learning from data brought its own hazards. Microsoft's Tay, released on Twitter in 2016, learned from its conversations, and users coordinated to teach it abusive language; Microsoft withdrew it within about sixteen hours; see [[Data poisoning]].

Large language models changed the field. A model trained on vast text could continue any conversation, and additional training on instructions and human preference ratings turned that into a helpful assistant; see [[Large Language Model]] and [[Instruction Tuning]]. ChatGPT, released in late 2022, reportedly reached a hundred million users within about two months, among the fastest adoptions of any consumer product. A hidden set of instructions now sets each bot's persona and limits; see [[System Prompt]].

The old problems persist in new forms. Fluent replies can be confidently wrong, models tend to tell users what they want to hear, and instructions hidden in text a bot reads can redirect it; see [[Hallucination]], [[Sycophancy]] and [[Prompt Injection]]. Companion apps built for friendship or romance raise questions about one-sided attachment, especially for lonely users; see [[Parasocial Relationship]] and [[AI Companion]].

## See also
- [[Interactive Fiction]]
- [[Symbol Grounding Problem]]
