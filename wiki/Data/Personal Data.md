---
aliases:
  - PII
  - Personally identifiable information
  - GDPR
  - Data minimization
  - Pseudonymization
  - Right to be forgotten
tags:
  - data
summary: Any information that relates to an identifiable person, why it is broader than names and emails, and the engineering habits that privacy law now expects.
---
**Personal data** is any information relating to a person who can be identified, directly or indirectly. US practice often says *personally identifiable information*, or PII, and historically meant a short list: name, Social Security number, email, phone. European law uses a far broader definition that includes IP addresses, device identifiers, location history, and cookie IDs, anything that can single out one person, alone or combined with other data.

Identification is easier than it looks. Latanya Sweeney showed in 2000 that about 87 percent of Americans can be uniquely identified by ZIP code, birth date, and sex alone. In 2006 AOL released "anonymized" search logs and reporters identified a user from their queries within days. Researchers matched Netflix Prize ratings, released the same year, to public movie reviews and named users. Removing names is not anonymization; [[Differential Privacy]] exists because of attacks like these, and [[Entity Resolution]] is the same matching technique used deliberately.

The European Union's General Data Protection Regulation, in force since May 2018, set the global template, with fines up to 4 percent of a company's worldwide annual revenue. Its principles include a lawful basis for every use, *purpose limitation*, and *data minimization*: collect only what is needed and keep it only as long as needed. It grants rights to access, correct, export, and erase one's data. The right to erasure grew from a 2014 EU court ruling against Google, which required search results about a person to be removed in some cases, popularly the "right to be forgotten." California's Consumer Privacy Act of 2018 followed a similar pattern.

For engineers, the law turns into concrete habits:

- **Collect less.** Data never stored cannot leak, be subpoenaed, or need deletion.
- **Know where it flows.** Answering an access or erasure request requires knowing every table, log, cache, and export holding a person's data, a job for [[Data Lineage]].
- **Keep it out of logs.** Emails, tokens, and addresses end up in request logs, error reports, and analytics unless scrubbed at the source.
- **Pseudonymize carefully.** Replacing an email with its hash is pseudonymization, not anonymization, since anyone can hash a list of known emails and match them, a misuse of a [[Hash Function]].
- **Delete for real.** A [[Soft Delete]] flag does not satisfy erasure, and deleted data lingers in replicas and in [[Backup and Restore]] archives. *Crypto-shredding*, encrypting each person's data with its own key and destroying the key, erases data everywhere at once.
- **Limit access.** Production personal data should be visible to as few people and services as possible, following [[Least Privilege]], and replaced by synthetic [[Seed Data]] in development.

Tracking identifiers such as an [[HTTP Cookie]] count as personal data in Europe, which is why consent banners exist.

## See also
- [[Data Portability]]
- [[Geospatial Data]]
- [[Machine Unlearning]]
- [[Cookie Consent]]
- [[Domain Registrar]]
- [[Panopticon]]
