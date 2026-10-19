---
aliases:
  - Wiretap
  - Lawful interception
  - CALEA
  - IMSI catcher
  - Stingray
tags:
  - networks
summary: Secretly listening to someone's communications by tapping the line or the network that carries them, a practice as old as the telegraph that moved from clipped wires to interception built into phone networks by law, and that encryption has gradually pushed back toward the edges.
---
**Wiretapping** is intercepting a communication while it travels, without the participants knowing. The name comes from the physical act of attaching a listening device to a telephone wire, but it now covers any interception of calls, messages or data in transit.

It's as old as electrical communication. Both sides tapped enemy telegraph lines during the American Civil War; see [[Telegraph]]. Police were tapping telephones by the 1890s. In 1928 the US Supreme Court ruled in Olmstead v. United States that wiretapping without entering a home was not a search requiring a warrant. That stood until 1967, when the Court held that the Constitution protects people's reasonable expectation of privacy rather than places. Congress then set warrant rules for wiretaps in 1968.

As networks went digital, tapping a pair of wires stopped working; calls became streams of bits through switching computers; see [[Telephone Network]]. Governments responded by requiring that interception be built in. A 1994 US law, often called CALEA, made carriers design their networks so that law enforcement could tap them on court order, and standards bodies worldwide define equivalent **lawful interception** interfaces.

Those interfaces are themselves a target. Between 2004 and 2005, unknown attackers abused interception software in a Greek mobile network to listen to the prime minister and about a hundred other officials. In 2024 US officials said that hackers linked to China had broken into several American carriers, reportedly including systems used for court-ordered taps. Critics argue this illustrates a general rule: an access route built for the authorities can be used by anyone who gets in; see [[Threat Modeling]].

Interception also happens in the air. An **IMSI catcher**, often called a stingray after one commercial model, impersonates a cell tower so that nearby phones connect to it, revealing their identities and locations and sometimes downgrading them to older, weaker encryption; see [[Cellular Network]]. Intelligence agencies tap the backbone itself. Documents leaked in 2013 described programs copying traffic from fiber links and undersea cables at scale; see [[Optical Fiber]] and [[Submarine Cable]].

The main defense is encryption between the endpoints. If a message is encrypted on the sender's device and decrypted only on the recipient's, a tap anywhere in between collects only unreadable data; see [[End-to-End Encryption]]. That pushes attackers toward the endpoints themselves, or toward impersonating one side; see [[Man-in-the-Middle Attack]]. Governments have repeatedly argued for guaranteed access to encrypted content, and security researchers have repeatedly argued that no such access can be limited to the good guys.

Even without content, a tap reveals who communicated with whom, when and for how long, which is often enough; see [[Traffic Analysis]] and [[Metadata]]. Knowing that monitoring might happen changes how people speak; see [[Chilling effect]].

## See also
- [[Packet Capture]]
- [[Internet Censorship]]
- [[Emergency Telephone Number]]
- [[Steganography]]
