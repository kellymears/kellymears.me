---
aliases:
  - Computer-assisted reporting
  - Precision journalism
tags:
  - data
summary: Reporting that finds and proves stories by analyzing data, from a 1967 survey of Detroit rioters to the millions of leaked files of the Panama Papers, and that publishes its data and methods so readers can check the work.
---
**Data journalism** is reporting in which analyzing data is the main way to find and prove a story. Instead of relying only on sources and documents, reporters gather records, clean and join them, compute what they show, and present the result in words, charts, and interactive graphics.

Its first public moment was a misfire. On election night in 1952 CBS borrowed a UNIVAC computer, which predicted a landslide for Dwight Eisenhower from early returns. The network doubted the machine and hedged on air; the landslide came.

The method took shape with Philip Meyer, a reporter who had studied social science. After the 1967 Detroit riot he ran a survey of residents for the Detroit Free Press, which found that people who had been to college were about as likely to have joined in as dropouts, undercutting a popular explanation. His 1973 book, *Precision Journalism*, argued reporters should use the tools of social science. Under the name **computer-assisted reporting**, newsrooms took up databases in the 1980s. Bill Dedman's 1988 series "The Color of Money," built on mortgage lending records, showed that banks in Atlanta lent far less in Black neighborhoods than in white ones of similar income, and won a Pulitzer Prize.

The work follows a familiar pipeline:

1. **Acquire.** Public records requests, government open data, scraping websites, and leaks; see [[Open Data]] and [[Web scraping]].
2. **Clean.** Records are inconsistent, with names spelled several ways and fields misused, and cleaning is usually most of the work; see [[Data Cleaning]].
3. **Analyze.** Often in a [[Spreadsheet]] or with SQL, joining datasets nobody had combined before; see [[SQL Join]].
4. **Present.** Charts, maps, and scroll-driven stories that walk readers through the evidence; see [[Data Visualization]] and [[Scroll-Driven Animations]].

Leaks pushed the scale up. The Panama Papers in 2016 were 11.5 million files from a law firm that set up offshore companies. A consortium of hundreds of journalists ran scanned documents through text recognition and loaded the people, companies, and addresses into a graph database to trace ownership chains; see [[Optical Character Recognition]] and [[Graph Database]]. In the same year, ProPublica's analysis of a criminal risk-scoring tool started a lasting debate over fairness in algorithms; see [[Algorithmic Bias]].

The craft has its own failure modes. A striking pattern in area totals may not hold for any individual, and a correlation in public data rarely shows a cause; see [[Ecological Fallacy]] and [[Correlation and Causation]]. Good practice is to publish the data and code alongside the story, so readers and other reporters can rerun the analysis and find the mistakes before they spread.

Data journalism also checks official numbers rather than just repeating them, a role that grows as more of public life is run by systems that produce records.

## See also
- [[Freedom of Information]]
- [[Correlation Coefficient]]
- [[Line Chart]]
