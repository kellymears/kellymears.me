---
aliases:
  - Lexer
  - Lexing
  - Maximal munch
  - Off-side rule
tags:
  - computation
summary: The first stage of reading a program, which groups a stream of characters into tokens such as names, numbers, operators and keywords, usually using regular expressions compiled into a finite automaton, so the parser can work with words rather than letters.
---
**Lexical analysis**, or **lexing**, is the first step in reading source code. A **lexer**, also called a scanner or tokenizer, reads raw characters and groups them into tokens: keywords, identifiers, numbers, strings, operators and punctuation. Whitespace and comments are usually discarded. The parser that follows then works with a short sequence of meaningful units rather than individual characters, and builds a syntax tree from them; see [[Compiler]] and [[Abstract Syntax Tree]].

Splitting the work this way keeps both parts simpler. Tokens can be described with regular expressions: an identifier is a letter followed by letters or digits; a number is a run of digits with an optional decimal part; see [[Regular Expression]]. Regular expressions can be compiled into a deterministic finite automaton that reads each character once and never backtracks, so lexing is fast and linear in the size of the input; see [[Finite State Machine]]. Parsing needs the more powerful machinery of grammars, which handle nesting that regular expressions can't; see [[Context-Free Grammar]].

Lexer generators automate the job. Lex, written by Mike Lesk and Eric Schmidt at Bell Labs in 1975, took a list of patterns and actions and produced a lexer in C, and its open replacement, flex, is still widely used. Many production compilers now write their lexers by hand for speed and better error messages.

A few rules settle ambiguity. **Maximal munch** says the lexer takes the longest token it can, so a double equals sign is read as one comparison operator, not two assignments. When two patterns match the same text, the earlier rule usually wins, which is how keywords like if beat the general rule for identifiers.

Real languages bend the clean separation. In C, whether a name is a type changes how the statement parses, so the lexer must consult the parser's symbol table, a workaround known as the lexer hack. In JavaScript a slash may begin a regular expression or mean division, and only context reveals which. In C++ before 2011, two closing angle brackets in nested templates were lexed as a single shift operator unless the programmer put a space between them.

Python and Haskell make indentation significant, using what Peter Landin called the **off-side rule**. The lexer tracks indentation depth and emits invisible indent and dedent tokens, turning layout into the equivalent of braces for the parser.

Lexing also matters outside compilers. Syntax highlighting in editors is mostly a lexer, and must cope with half-typed code; see [[Text Buffer]]. Code formatters and linters start from tokens; see [[Code Formatter]] and [[Static Analysis]]. Lexers for real source must also handle text encodings and the many Unicode characters that look alike; see [[Character Encoding]] and [[Interpreter]].

## See also
- [[Intermediate Representation]]
- [[String-Searching Algorithm]]
- [[Trie]]
