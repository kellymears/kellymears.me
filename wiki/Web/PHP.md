---
aliases:
  - PHP Hypertext Preprocessor
  - LAMP stack
  - Hack language
tags:
  - web
summary: The server-side language that began in 1994 as a personal set of homepage tools, spread on cheap shared hosting to run much of the web including WordPress and early Facebook, and survived years of ridicule by getting much faster and stricter.
---
**PHP** is a server-side scripting language designed for generating web pages. Code is mixed directly into HTML and runs on the server for each request, producing the page the browser receives. It became one of the most widely used languages on the web, and it still runs a large share of websites, many of them through WordPress; see [[WordPress]].

Rasmus Lerdorf wrote the first version in 1994 as a set of small programs in C to track visits to his online résumé, called Personal Home Page Tools, and released them publicly in 1995; see [[Common Gateway Interface]]. In 1997, Zeev Suraski and Andi Gutmans rewrote the parser, and PHP 3 renamed the language with the recursive acronym "PHP: Hypertext Preprocessor." Their rewritten engine, Zend, powered PHP 4 in 2000, and PHP 5 in 2004 added serious object-oriented features.

PHP's success came from deployment. Each request starts with a clean slate and shares nothing with the next, so a crashing script affects only one page view, and hosts could run thousands of customers' sites on one server. Uploading a file was the whole deploy. The LAMP stack, Linux, Apache, MySQL, and PHP, became the default for cheap hosting and much of early web development; see [[Relational Database]] and [[Serverless Computing]].

Its reputation suffered as much as it spread. The standard library grew without a plan, so function names and argument orders were inconsistent. Early features made insecure code easy: request parameters could appear as global variables automatically, and building database queries from user input invited attacks; see [[SQL Injection]] and [[Cross-Site Scripting]]. A 2012 essay calling PHP "a fractal of bad design" became a widely shared summary of the complaints.

Facebook, which started on PHP, shows both sides. Rather than rewrite, it built a compiler that turned PHP into C++, then a virtual machine called HHVM that compiled it on the fly, then a stricter dialect called Hack with gradual typing; see [[Just-in-Time Compilation]] and [[Type System]].

PHP itself improved substantially. An attempted PHP 6 with built-in Unicode was abandoned, and version 7 in 2015 roughly doubled performance with a reworked engine; see [[Character Encoding]]. PHP 8 in 2020 added an optional just-in-time compiler. Type declarations, a package manager released in 2012, and frameworks such as Laravel and Symfony gave the language modern tooling and conventions; see [[Model-View-Controller]].

PHP's design choice of a fresh process per request returned in serverless functions and edge platforms, where code runs per request with no shared state; see [[Edge Computing]]. Its long survival is a case of a technology winning on ease of deployment rather than elegance; see [[Path Dependence]].

## See also
- [[Node.js]]
- [[Middleware]]
- [[GeoCities]]
