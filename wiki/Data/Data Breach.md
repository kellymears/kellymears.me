---
aliases:
  - Breach notification
  - Have I Been Pwned
  - Credential stuffing
  - Password hashing
tags:
  - data
summary: The exposure of stored records to someone who shouldn't have them, usually through stolen logins, unpatched software, or misconfigured storage, and the laws, password practices, and minimization that limit the damage.
---
A **data breach** is the exposure of stored records to people who shouldn't have them, whether copied out by an attacker, left open on the internet, or taken by an insider. The records are usually [[Personal Data]]: names, addresses, passwords, card numbers, health files.

The causes repeat:

- **Stolen credentials.** Many breaches begin with a login someone shouldn't have, often gathered by [[Phishing]]. A second factor blocks much of this; see [[Multi-Factor Authentication]].
- **Unpatched software.** Equifax was breached in 2017 through an Apache Struts flaw left unpatched for two months, exposing records on about 147 million people.
- **Misconfiguration.** Storage buckets left public have leaked billions of records without any hacking at all; see [[Object Storage]].
- **Injection.** Unsanitized input lets attackers dump whole tables; see [[SQL Injection]].
- **Vendors.** Target's 2013 breach, about 40 million cards, began with credentials stolen from a heating and air-conditioning contractor.

The scale record belongs to Yahoo, whose 2013 breach, disclosed years later, covered all of its roughly three billion accounts.

California passed the first **breach notification** law in 2002, requiring companies to tell affected people; every US state eventually followed. The GDPR requires notifying regulators within 72 hours of discovery. Breaches commonly go unnoticed for months and are often found by outsiders rather than through the victim's own [[Logging]] and [[Audit Log]].

How passwords are stored decides how bad a leak is. A fast [[Hash Function]] lets attackers test billions of guesses a second against stolen hashes, so passwords should be hashed with deliberately slow functions such as bcrypt, scrypt, or Argon2, plus a unique random salt per user so that one guess can't be tested against every account at once. LinkedIn's 2012 leak used unsalted SHA-1, and most of the hashes posted online were cracked within days. RockYou, in 2009, stored 32 million passwords in plain text.

Leaked passwords outlive the breach. Because people reuse them, attackers replay leaked username and password pairs against other sites, a technique called **credential stuffing**. The security researcher Troy Hunt started Have I Been Pwned in 2013 to let people check whether their address appears in known breaches. Its password check sends only the first five characters of a password's hash, so the service never learns the password.

Defenses:

- **Collect less and delete sooner.** Data that was never kept can't leak; see [[Data Retention]].
- **Limit access**, so one stolen account opens one system, not all of them; see [[Least Privilege]].
- **Encrypt carefully.** Disk encryption protects stolen hardware, not data read through a running application; see [[Full-Disk Encryption]].
- **Guard keys and credentials**; see [[Secrets Management]].

Bruce Schneier calls stored personal data a toxic asset. Planning for a breach belongs in [[Threat Modeling]].

## See also
- [[Data Broker]]
- [[Morris Worm]]
