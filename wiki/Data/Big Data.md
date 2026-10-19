---
aliases:
  - Three Vs
  - Data deluge
tags:
  - data
summary: The label for datasets too large, fast, or varied for a single conventional database, which brought distributed tools like Hadoop into the mainstream, a decade of hype about correlation replacing theory, and a lasting debate about surveillance.
---
**Big data** refers to datasets too large, too fast-moving, or too varied to handle with a single conventional database. The term circulated in the 1990s and became a business buzzword around 2010. An influential 2001 analyst note by Doug Laney named its three Vs: **volume**, the amount of data; **velocity**, the speed at which it arrives; and **variety**, the mix of formats, from tables to text, logs, images, and sensor readings. Later writers kept adding Vs, such as veracity and value, which says something about the term's precision.

The technical story starts at Google. Papers on its distributed file system in 2003 and on its programming model for processing huge datasets across clusters of cheap machines in 2004 inspired Hadoop, an open-source version developed largely at Yahoo from 2006; see [[MapReduce]]. Around it grew an ecosystem: stores that spread rows across many machines, cheap storage for raw files of any shape, and systems that process events continuously as they arrive; see [[Wide-Column Store]], [[Database Sharding]], [[Data Lake]], and [[Stream Processing]]. Analytical databases that store data by column made large scans fast; see [[Columnar Storage]].

The cultural story was bigger. A 2008 Wired essay declared that with enough data, correlation would replace theory and the scientific method. Google Flu Trends, launched that year, estimated flu activity from search queries and was celebrated, until in the 2012–13 season it predicted about twice the doctor visits that the health authorities later recorded. The search patterns it relied on had shifted with media coverage and changes in Google's own search. Critics called this "big data hubris"; A model that finds patterns without understanding them breaks quietly when the world that produced them changes; see [[Correlation and Causation]].

Size doesn't cure bias. In 1936 the *Literary Digest* polled over two million readers and predicted the wrong winner of the US presidential election, while George Gallup, with a far smaller but better-chosen sample, called it correctly; see [[Selection Bias]]. A huge dataset that systematically misses some people only produces the wrong answer with more confidence. And with enough rows and variables, some correlation will look significant by chance; see [[Multiple comparisons]] and [[Statistical Significance]].

The hype has faded, partly because hardware won. Memory and single-machine processing grew faster than most organizations' data, so many datasets once called big now fit on one server or a laptop and are queried with ordinary SQL; see [[Moore's Law]].

The social side remains. Much big data is behavioral, collected as people search, shop, move, and click, and its value to advertisers and data brokers fed debates about surveillance and consent; see [[Personal Data]] and [[Data Broker]].

## See also
- [[Dark Data]]
- [[Data Mesh]]
