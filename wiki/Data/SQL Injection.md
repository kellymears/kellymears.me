---
aliases:
  - SQLi
  - Parameterized query
  - Prepared statement
  - Injection attack
  - Bobby Tables
tags:
  - data
summary: An attack in which user input is pasted into a database query and gets run as code, prevented by keeping the query and its data in separate channels.
---
**SQL injection** is an attack in which input supplied by a user ends up being executed as part of a database query. It happens when code builds SQL by pasting strings together. A login check written as `"SELECT * FROM users WHERE name = '" + name + "'"` works for ordinary names, but a name of `' OR '1'='1` turns the condition into one that is always true. Other inputs can read every table, change data, or delete it.

The underlying flaw is mixing code and data in the same channel. The database receives a single string and can't tell which parts the programmer wrote and which came from the user. Every *injection attack* shares this shape: [[Cross-Site Scripting]] mixes user input into HTML, shell injection into commands, and [[Prompt Injection]] into the instructions given to a language model.

The attack was first described publicly in 1998 by Jeff Forristal, writing as "rain.forest.puppy" in the hacker magazine Phrack. It quickly became one of the most exploited weaknesses on the web and topped the OWASP list of critical web risks for years. Major breaches, including the 2008 Heartland Payment Systems theft of over 100 million card numbers, began with it. The xkcd comic "Exploits of a Mom" made it famous with a student named `Robert'); DROP TABLE Students;--`, known ever since as Little Bobby Tables.

The fix is well established:

- **Parameterized queries.** The query is written with placeholders, `WHERE name = $1`, and values are sent separately. The database parses the query first and treats the values strictly as data, so no input can change its structure. These are also called *prepared statements*.
- **Query builders and ORMs.** An [[Object-Relational Mapping]] library or query builder parameterizes automatically, as long as developers avoid its raw-SQL escape hatches.
- **Allowlists for structure.** Parts of a query that can't be parameterized, such as a column to sort by, should be chosen from a fixed list, never copied from input.

Escaping special characters by hand is the classic wrong fix. It is easy to get wrong across character sets and database dialects, as encoding tricks described under [[Character Encoding]] have shown.

Layered defenses limit the damage when something slips through. The application's database account should follow [[Least Privilege]], unable to drop tables or read data it doesn't need. Input checks through [[Schema Validation]] reject obviously malformed values early. [[Static Analysis]] tools flag string-built queries, and [[Fuzzing]] and security scanners probe for injectable parameters.

SQL injection has declined as frameworks made parameterization the default, but it persists in legacy code, hand-built reporting queries, and anywhere a developer reaches for string concatenation because it seemed quicker. It remains a standard case for the principle that the safe path should also be the easy one.

## See also
- [[PHP]]
- [[Prototype Pollution]]
- [[Data Breach]]
- [[WordPress]]
