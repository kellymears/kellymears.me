---
aliases:
  - Apple SSL bug
  - goto fail bug
tags:
  - testing
summary: A 2014 security bug in Apple's encrypted-connection code, in which a single duplicated line silently skipped the check that a server's identity was genuine, and a standard example of how coverage, compiler warnings, and one negative test would each have caught it.
---
**Goto fail** is the nickname for a security bug Apple fixed in February 2014 in the code its iPhones, iPads, and Macs used to set up encrypted connections. The bug allowed an attacker on the same network to impersonate secure websites. It came down to a single repeated line of code.

When a device connects securely to a website, it checks a digital signature to confirm that the server holds the private key matching its certificate. Without that check, anyone positioned between the device and the site can pretend to be the site; see [[Digital signature]], [[Transport Layer Security]], and [[Man-in-the-Middle Attack]].

Apple's verification function ran a series of steps, each followed by a line that jumped to a cleanup section if the step had failed. The convention in C code like this is a statement called goto, which jumps to a labeled location, here named fail. Partway through, the line "goto fail" appeared twice in a row. The first copy belonged to an if statement and only ran when a check failed. The second copy wasn't attached to any condition, so it always ran. The function jumped to the cleanup section every time, skipping the final signature check entirely. Because no error had been recorded at that point, the function reported success.

Nobody has publicly explained how the duplicate line got there. A bad merge or a copy-and-paste slip are the common guesses; see [[Merge Conflict]].

The bug is a favorite teaching example because so many standard practices would each have caught it:

- **Compiler warnings.** Everything after the second goto could never run. Compilers can warn about unreachable code, but that warning wasn't enabled; see [[Unreachable Code]] and [[Compiler]].
- **Coverage.** The final signature check was never executed by any test. A coverage report would have shown it untouched; see [[Code Coverage]] and [[Branch Coverage]].
- **Negative tests.** A single test with a bad signature would have been accepted when it should have been rejected; see [[Unit Test]].
- **Style rules.** Requiring braces around every if statement makes the indentation match the logic; see [[Static Analysis]].
- **Review.** The duplicated line is visible in a diff, if anyone looks; see [[Code Review]].

The bug was disclosed only weeks before a far larger security flaw in a different encryption library; see [[Heartbleed]]. Together, the two cases fueled arguments about the safety of C and the value of testing that security code rejects what it's supposed to reject; see [[Defensive Programming]].

The deeper lesson is that security checks fail silently. Code that skips a check still produces a working connection, so ordinary use reveals nothing wrong.

## See also
- [[Debian OpenSSL Bug]]
- [[Fuzzing]]
