---
aliases:
  - Data exhaust
  - Unused data
tags:
  - data
summary: Information that organizations collect and store as a side effect of their activity but never analyze or use, a growing pile of logs, documents and recordings that costs money to keep, carries legal and security risk, and occasionally hides something valuable.
---
**Dark data** is information an organization gathers and keeps without ever using it. The term, popularized by the research firm Gartner, borrows from astronomy's dark matter: most of the data an organization holds is invisible to its analysis. Industry surveys regularly claim that over half of stored data is dark, though such figures are rough estimates.

Much of it is **data exhaust**, the by-product of doing something else. Server logs, sensor readings, call recordings, email archives, old versions of documents and records from retired systems accumulate because storage is cheap and nobody is sure whether they'll be needed; see [[Big Data]]. A data lake set up to collect everything can turn into a swamp of files no one can find or interpret; see [[Data Lake]].

Data stays dark for several reasons. Nobody knows it exists, because no catalog records what's stored where; see [[Data catalog]]. Without that record, even its owners may forget a store exists. Its format is hard to analyze, as with scanned paper, audio and video, which held little value to computers until recognition software matured; see [[Optical Character Recognition]]. It sits in one department's systems where others can't reach it; see [[Data Silo]]. Or its quality is unknown, and checking would take more effort than anyone has budgeted; see [[Data Profiling]].

Keeping it isn't free. Storage, backup and management cost money and energy. Worse, every forgotten store is a liability. Old customer records that serve no purpose can still be stolen, and data that an organization didn't know it had shows up in breach notifications, lawsuits and discovery requests; see [[Data Breach]]. Privacy laws expect personal data to be kept only as long as needed, which an organization can't honor for data it can't see; see [[Personal Data]] and [[Data Retention]].

The usual remedy is governance: inventorying what exists, assigning owners, setting retention periods and deleting what has no purpose; see [[Data Governance]]. The opposite argument is that dark data is an untapped asset, and that maintenance logs, support transcripts or decades of scanned records might reveal patterns once analyzed. Machine learning has made that argument more persuasive, since it can extract structure from text, images and audio.

Science has its own dark data: results that were measured but never published. Experiments that found nothing tend to stay in file drawers, which skews the published record toward positive findings; see [[Publication Bias]]. Data from small studies and old instruments is often lost when a researcher retires or a hard drive fails, a problem archivists and funders now try to address by requiring data to be deposited; see [[Digital Preservation]] and [[Open Data]].

## See also
- [[Survivorship Bias]]
- [[Archival Science]]
