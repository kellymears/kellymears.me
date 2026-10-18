---
aliases:
  - Data residency
  - Data localization
  - Schrems II
  - CLOUD Act
tags:
  - data
summary: The principle that data is subject to the laws of the place where it is stored or of the people it describes, behind localization rules, the collapse of two EU–US transfer deals, and region-pinned clouds.
---
**Data sovereignty** is the idea that data is subject to the laws of the country where it is stored, or of the people it describes, and that a state may insist on controlling it. In practice it shows up as **data residency** requirements, which say where data must physically live, and **data localization** laws, which forbid it from leaving.

The issue grew sharp in 2013, when Edward Snowden's disclosures showed US intelligence agencies collecting data held by American internet companies, including data about foreigners, and tapping fiber-optic links, undersea ones among them; see [[Submarine Cable]]. Data held by a US company, wherever its servers stood, could be read under US law.

Europe's response ran through its courts. Max Schrems, an Austrian law student, challenged Facebook's transfer of his data to the US. In 2015 the EU Court of Justice struck down Safe Harbor, the framework that allowed such transfers, and in July 2020, in the case known as **Schrems II**, it struck down the replacement, Privacy Shield, because US surveillance law gave Europeans no effective remedy. A third arrangement, the EU–US Data Privacy Framework, followed in 2023. Companies kept data flowing on contract clauses; see [[Personal Data]].

The US moved the other way. When Microsoft refused a warrant for emails stored in Ireland, the case reached the Supreme Court, which dropped it after Congress passed the **CLOUD Act** in 2018, letting US authorities compel US providers to produce data stored anywhere.

Other countries legislated localization outright. Russia required citizens' data to be stored domestically from 2015, China's 2017 Cybersecurity Law kept important data inside the country, and India's central bank required payment data to stay in India from 2018. Some aims are privacy; others, surveillance and control; see [[Internet Censorship]].

For engineers, sovereignty is a placement problem. Cloud providers sell regions and "sovereign cloud" offerings run by local operators, and databases pin rows to regions by a customer's country; see [[Database Sharding]] and [[Distributed SQL]]. The traps are the copies nobody listed:

- **Replicas and backups** in another region; see [[Database Replication]] and [[Backup and Restore]].
- **Caches** at the network edge; see [[Content Delivery Network]].
- **Logs and support access**, where an engineer in another country can read production data.

Knowing where every copy lives depends on [[Data Lineage]]. Keeping encryption keys under customer control limits what a foreign provider can be forced to hand over; see [[Full-Disk Encryption]]. Shared infrastructure complicates all of it; see [[Multi-Tenancy]].

The costs are duplicated infrastructure and a fragmenting internet, sometimes called the splinternet. The term also has a separate use: **Indigenous data sovereignty** asserts the rights of Indigenous peoples over data about their communities, set out in the CARE principles of 2019 as a counterweight to purely open sharing; see [[Open Data]].

## See also
- [[Data Retention]]
- [[Data Broker]]
