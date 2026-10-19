---
aliases:
  - Debian weak keys
  - Debian OpenSSL vulnerability
tags:
  - testing
summary: A 2006 change to Debian's copy of the OpenSSL library, made to quiet a memory-checking tool, that removed nearly all the randomness from key generation, leaving two years of keys guessable from a list of about 32,000 possibilities.
---
The **Debian OpenSSL bug** was a flaw in the version of the OpenSSL cryptography library shipped by Debian Linux and systems built from it, such as Ubuntu. For about twenty months, from September 2006 until it was discovered in May 2008, every cryptographic key generated on those systems came from a tiny, predictable set. Keys that should have been one in an astronomically large number were one in about 32,000.

The cause was an attempt to fix a warning. Tools that detect memory errors flagged OpenSSL for reading memory that had never been initialized; see [[Sanitizer]]. In this case the read was deliberate: the library was mixing whatever happened to be in that memory into its pool of randomness, harmlessly, as a bit of extra unpredictability. A Debian maintainer, trying to silence the warning, removed two lines that seemed responsible.

One of those lines was indeed the uninitialized read. The other was the line that added nearly all randomness to the pool. With it gone, the only varying input left was the process ID, a number that on Linux was then at most 32,768. The random number generator kept producing output that looked random, but from only a few tens of thousands of possible starting points; see [[Pseudorandom Number Generator]] and [[Entropy]].

The maintainer had asked about the change on an OpenSSL mailing list beforehand and received a reply that seemed to approve it; see [[Mailing List]]. The patch was small and plausible, and it went unnoticed by everyone downstream; see [[Diff]] and [[Code Review]]. Tests kept passing because keys were still valid keys. No ordinary test can tell that random numbers are predictable, because any single output looks fine; see [[Test Oracle]].

The bug was found by a researcher, Luciano Bello, in 2008. The consequences were severe. Every SSH key, web server certificate, and other key generated on affected systems in that period had to be considered compromised; see [[Secure Shell]] and [[Public-Key Cryptography]]. Researchers soon published the full list of possible keys, so any affected key could be broken by lookup. Some vulnerable keys stayed in use for years, and tools to detect blacklisted keys were added to software that checks connections; see [[Certificate Revocation]].

The case became a lesson in not removing code without understanding it; see [[Chesterton's Fence]]. It also fed a long debate about distributions modifying upstream software, and whether upstream projects make it easy enough for downstream packagers to ask questions and get clear answers.

It's one of several famous failures in cryptographic code, alongside a duplicated line in Apple's verification code and a memory over-read in OpenSSL itself; see [[Goto Fail]].

## See also
- [[Heartbleed]]
- [[XZ Utils Backdoor]]
- [[Equifax Data Breach]]
