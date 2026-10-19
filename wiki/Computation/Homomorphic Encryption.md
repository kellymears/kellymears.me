---
aliases:
  - Fully homomorphic encryption
  - FHE
  - Computing on encrypted data
tags:
  - computation
summary: Encryption that lets someone perform calculations on data without ever decrypting it, so that a server can process information it cannot read, long thought impossible in general and still far slower than ordinary computing.
---
**Homomorphic encryption** allows computation directly on encrypted data. A client encrypts its inputs and sends them to a server, the server runs a calculation on the ciphertexts, and the client decrypts the result to get the same answer it would have computed on the original values. The server never sees the inputs, the intermediate values or the answer.

Some ordinary schemes already have part of this property by accident. In textbook [[RSA]], multiplying two ciphertexts gives an encryption of the product of the plaintexts; see [[Modular Arithmetic]]. The Paillier scheme, from 1999, does the same for addition. Schemes like these, which support only one kind of operation, are called **partially homomorphic**. They are useful for tasks such as tallying encrypted votes, where only sums are needed.

Supporting both addition and multiplication without limit is far more powerful. With those two operations over bits, one can build any logic circuit, and therefore any computation; see [[Boolean Algebra]] and [[Turing Completeness]]. Ron Rivest, Leonard Adleman and Michael Dertouzos asked in 1978 whether such a scheme could exist. The question stayed open for three decades.

In 2009 Craig Gentry described the first **fully homomorphic** scheme. Its ciphertexts are based on mathematical lattices and carry a small amount of random noise that hides the message. Each operation increases the noise, and too much makes decryption fail, a problem resembling the accumulation of errors in a channel; see [[Error-Correcting Code]]. Gentry's key idea, called **bootstrapping**, is to evaluate the scheme's own decryption circuit homomorphically, producing a fresh encryption of the same value with reduced noise, so that computation can continue indefinitely. The name echoes a compiler compiling itself; see [[Compiler Bootstrapping]].

The first constructions were impossibly slow. Later schemes improved performance by many orders of magnitude, and some operate efficiently on vectors of numbers or approximate real values, which suits statistics and machine learning. Encrypted computation is still typically thousands of times slower or more than computation in the clear, and ciphertexts are much larger than the data they hold, so practical uses focus on narrow, high-value tasks: private database lookups, encrypted queries against a server's data, and running a trained model on a user's encrypted input.

Homomorphic encryption is one of several tools for computing without full trust. Secure multi-party computation splits data among several parties, often using secret sharing, so that none sees the whole; see [[Shamir's Secret Sharing]]. Zero-knowledge proofs let a party prove a statement about data without revealing it; see [[Zero-Knowledge Proof]]. Differential privacy limits what the published output of a computation reveals about any individual; see [[Differential Privacy]] and [[Federated Learning]]. Because the lattice problems underlying modern schemes are believed to resist quantum attacks, homomorphic encryption also belongs to the field of post-quantum cryptography; see [[Quantum Computing]].

## See also
- [[Public-Key Cryptography]]
- [[Information Theory]]
