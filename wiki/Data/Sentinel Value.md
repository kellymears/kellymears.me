---
aliases:
  - Magic value
  - Placeholder value
tags:
  - data
summary: An ordinary-looking value, such as minus one, 9999, or the first of January 1900, pressed into service to mean missing, unknown, or finished, a convenient trick that quietly corrupts any calculation that forgets about it.
---
A **sentinel value** is a value from a field's normal range given a special meaning: missing, unknown, not applicable, or end of data. A survey records an age of 999 when the respondent declined to answer. A search function returns minus one when it can't find what it was looking for. A form stores the first of January 1900 as the birth date for anyone who left it blank.

Sentinels exist because they're convenient. They need no extra field or special type, they fit in fixed-width records and old file formats, and they work in languages that offer nothing better. Some are harmless: strings in the C language end at a zero byte.

The trouble starts when a sentinel is mistaken for real data:

- **Averages.** A handful of 999 ages drags a mean age far upward. A temperature series with minus 9999 for broken sensors produces impossible records; see [[Outlier]].
- **Dates.** Customers born in 1900, or events recorded at midnight on the first of January 1970, are usually defaults leaking through; see [[Unix Time]].
- **Map coordinates.** Records with failed location lookups often get latitude and longitude zero, a point in the Atlantic Ocean off West Africa that has accumulated so much misplaced data it was jokingly named Null Island; see [[Geocoding]].
- **Collisions.** A sentinel that later becomes a legitimate value breaks the code that relied on it. Programs that used 99 in a two-digit year field to mean "never" or "end of file" were among the concerns raised before 2000; see [[Year 2000 Problem]].

The underlying issue has a name in programming, the **semipredicate problem**: a function returns one value that has to mean both "here is the result" and "something went wrong," and the caller has to know which values are which. Languages have developed alternatives. A dedicated null marker is one, with its own well-known hazards; see [[Null]]. An option type makes absence a separate case the compiler forces callers to handle; see [[Option type]]. Exceptions move errors out of the return value altogether; see [[Exception Handling]]. Floating-point arithmetic has its own built-in sentinel for undefined results; see [[NaN]].

In datasets, the defense is documentation and inspection. A codebook that lists every special code tells analysts which values to exclude; see [[Data Dictionary]]. Profiling a column often reveals sentinels as suspicious spikes, a single value appearing far more often than its neighbors; see [[Data Profiling]]. Cleaning then converts them to real missing values before analysis begins; see [[Data Cleaning]].

Testers look for sentinels deliberately, since boundary values and special markers are where code most often breaks; see [[Boundary Value Analysis]]. A sentinel nobody documented is a quiet case of the oldest rule in data processing; see [[Garbage In, Garbage Out]].

## See also
- [[Phone Number]]
- [[Reference Data]]
