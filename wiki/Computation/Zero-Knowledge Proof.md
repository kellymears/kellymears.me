---
aliases:
  - Zero-knowledge
  - Interactive proof
tags:
  - computation
summary: A protocol for convincing someone that a statement is true without revealing anything else, such as proving you know a password without sending it, now used for private payments and proposed for identity checks.
---
**A zero-knowledge proof** convinces a verifier that a statement is true while revealing nothing beyond that fact. A prover can show that they know a password, or that a transaction balances, or that they're over 18, without disclosing the password, the amounts, or the birthdate.

Shafi Goldwasser, Silvio Micali, and Charles Rackoff introduced the idea in a 1985 paper on **interactive proofs**, in which a prover and verifier exchange messages and the verifier issues random challenges. Goldwasser and Micali later shared the Turing Award.

A proof has to satisfy three properties:

- **Completeness.** An honest prover with a true statement always convinces the verifier.
- **Soundness.** A prover with a false statement fails, except with tiny probability.
- **Zero knowledge.** The verifier learns nothing it couldn't have produced itself. Formally, a simulator that doesn't know the secret could generate a transcript indistinguishable from a real one, so the transcript can't contain the secret.

A classic illustration uses a ring-shaped cave with a locked door at the back. The prover enters and takes one path at random; the verifier then shouts which side to come out of. Someone with the key can always comply; someone without it is caught half the time. Twenty rounds leave a cheater with about a one-in-a-million chance; see [[Randomized algorithm]].

A real protocol works the same way for 3-coloring a map: the prover commits to a shuffled coloring, and the verifier asks to see the colors at the two ends of one edge. Each round reveals only that two neighbors differ, and since the colors are shuffled each time, nothing accumulates. In 1986 researchers showed that every statement whose solution can be quickly checked has such a proof, if secure encryption exists; see [[Graph Coloring]] and [[P versus NP Problem]].

The Fiat-Shamir technique replaces the verifier's random challenges with a hash of the prover's own messages, producing a proof anyone can check later; see [[Hash Function]]. Modern succinct proofs compress a check of an arbitrary computation into a short proof that verifies in milliseconds. The cryptocurrency Zcash used them from 2016 to hide payment details, and similar systems bundle many transactions into one proof. Some schemes build their proofs from hash trees; see [[Merkle Tree]].

Signing a login challenge with a private key is related but not zero knowledge in the strict sense; see [[Passkey]] and [[Public-Key Cryptography]]. Proposed uses include proving age or citizenship from a digital identity without handing over the document, and researchers have described a protocol for verifying nuclear warheads without revealing their design. All of them aim to disclose less; see [[Personal Data]] and [[Least Privilege]].

The cost is complexity: proofs are expensive to generate, and a bug in the circuit being proved can make false statements provable.

## See also
- [[Elliptic Curve Cryptography]]
- [[Boolean Satisfiability Problem]]
- [[RSA]]
- [[Scalable Oversight]]
