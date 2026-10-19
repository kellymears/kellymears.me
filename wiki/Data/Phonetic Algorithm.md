---
aliases:
  - Soundex
  - Metaphone
tags:
  - data
summary: A method of encoding words, usually names, by how they sound, so that spellings like Smith and Smyth produce the same key, invented for census indexing and still used in genealogy, record linkage, and search.
---
A **phonetic algorithm** turns a word into a code based on its pronunciation, so that words that sound alike get the same code despite different spellings. They were designed mainly for matching surnames, which are written down inconsistently by clerks, immigrants, and census takers, and they remain a staple of genealogy and of matching records about the same person; see [[Entity Resolution]].

The best known is **Soundex**, patented by Robert C. Russell in 1918 and refined in a 1922 patent with Margaret King Odell. A Soundex code keeps a name's first letter and turns the next consonants into three digits, grouping letters that sound similar: B, F, P, and V share one digit, C, G, J, K, Q, S, X, and Z share another, and vowels are dropped. Robert and Rupert both become R163. In the 1930s, workers in a New Deal program created Soundex indexes for several US censuses, which is why the codes still appear in archival finding aids and genealogy sites; see [[Census]].

Soundex is crude. It assumes English spelling, keeps the first letter as written so that Catherine and Katherine get different codes, and lumps together many plainly unrelated names. Several successors tried to fix these problems. NYSIIS, developed for a New York State criminal identification system around 1970, applies more spelling rules. Daitch-Mokotoff Soundex, from 1985, was designed for Slavic and Yiddish surnames common among Jewish genealogical records. Lawrence Philips published Metaphone in 1990 and Double Metaphone in 2000, which handles many spelling conventions from other languages and returns two codes when a name could be pronounced two ways.

In databases, a phonetic code works like a deliberately lossy hash: it groups records that might match into the same bucket, so expensive comparisons only run within each group; see [[Locality-Sensitive Hashing]]. Matching systems usually combine it with a measure of spelling difference, since phonetic codes catch Smith and Smyth while edit distance catches typos that change the sound; see [[Edit Distance]]. Several major databases include Soundex as a built-in function, and some search engines offer phonetic matching on name fields; see [[Inverted Index]].

The approach has clear limits. Every algorithm encodes assumptions about a particular language's spelling, so names transliterated from other scripts can scatter across codes or collide unexpectedly; see [[Transliteration]] and [[Personal Name]]. Phonetic matching also finds far more false candidates than true ones on large datasets, so it narrows a search for a person instead of deciding it. Modern search tends to rely on spelling-tolerant matching and learned similarity, with phonetic codes as one signal among several; see [[Autocomplete]] and [[Stemming and Lemmatization]].

## See also
- [[Data Cleaning]]
- [[Library Classification]]
- [[Gazetteer]]
