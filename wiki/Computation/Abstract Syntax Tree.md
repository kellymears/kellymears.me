---
aliases:
  - AST
  - Parse tree
  - Parser
  - Parsing
  - Syntax tree
tags:
  - computation
summary: The tree-shaped representation of source code that parsers produce and that compilers, linters, formatters, and bundlers all operate on.
---
An **abstract syntax tree (AST)** is a tree that represents the structure of source code. Each node is a construct in the language, such as a function, an `if` statement, an assignment, or an operator, and its children are the parts it's made of. The expression `2 * (x + 1)` becomes a multiplication node whose children are the number 2 and an addition node, whose children are `x` and 1.

The tree is *abstract* because it drops details that only matter for writing code down, such as parentheses, whitespace, and semicolons. The tree's shape already says that the addition happens first, so the parentheses aren't needed. A *concrete* syntax tree, or parse tree, keeps every token, which matters for tools that must reproduce the original text exactly.

Turning text into an AST happens in two stages:

- **Lexing** splits the text into tokens: keywords, names, numbers, operators. This step is often driven by a [[Regular Expression]] for each token type.
- **Parsing** arranges tokens into a tree according to the language's grammar. Hand-written *recursive descent* parsers, with one function per grammar rule calling the others through [[Recursion]], are common in production compilers because they give good error messages. Parser generators build parsers automatically from a grammar written in a notation like Backus–Naur form, introduced to describe ALGOL 60.

Regular expressions alone can't parse most programming languages, because nesting like balanced parentheses requires memory that a [[Finite State Machine]] lacks.

Almost every tool that understands code works on the AST rather than raw text:

- **Compilers and interpreters.** A [[Compiler]] checks types, often using [[Type Inference]], then transforms the tree into lower-level code. A simple [[Interpreter]] walks the tree directly, evaluating each node.
- **Linters.** [[Static Analysis]] tools match patterns in the tree, such as an unused variable or an assignment inside a condition, which would be fragile to find with text search.
- **Formatters.** Tools like Prettier parse code, discard the original layout, and print the tree back out in a standard style, ending arguments about formatting.
- **Bundlers.** A [[Bundler]] reads import statements from the AST to build the [[Module Graph]] and removes unused exports through [[Tree Shaking]].

The idea extends beyond programming languages. [[Markdown]] processors parse documents into trees of headings, paragraphs, and links, which plugins then transform before rendering to HTML; this site's wikilinks are one such transformation.

Languages often represent ASTs with an [[Algebraic Data Type]], where each node kind is one alternative, and transform them with [[Pattern Matching]]. Lisp is the extreme case: its code is written directly as nested lists, so programs and their syntax trees look the same, which makes it easy for Lisp programs to generate and transform other Lisp programs.

## See also
- [[Refactoring]]
- [[Code Formatter]]
