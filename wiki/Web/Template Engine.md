---
aliases:
  - Templating
  - Template language
  - Mustache
tags:
  - web
summary: Software that fills a document containing placeholders and simple logic with data to produce a finished page, email or file, the standard way dynamic websites have generated HTML, and a long-running argument about how much logic belongs in a view.
---
A **template engine** takes a document with placeholders in it and fills them in with data. The template looks mostly like the finished output, an HTML page with a few marked spots for the user's name, a list of products or a block that appears only when someone is signed in. The engine reads the template, evaluates those spots against the data and produces the final text; see [[Interpreter]].

Dynamic web pages created the need. Early programs generated pages by printing HTML line by line from code, which made both the code and the markup hard to read; see [[Common Gateway Interface]]. [[PHP]], begun in 1994, flipped that around by letting code be embedded inside the HTML, and much of its early popularity came from being a template language first. Later web frameworks separated the two more strictly, putting templates in a view layer that receives data from the rest of the application; see [[Model-View-Controller]]. Ruby on Rails, Django and their successors each shipped their own template syntax, usually resembling the host language.

How much logic a template should contain has been argued for decades. Full programming languages in templates allow anything, which tempts developers to put database queries and business rules in the view. At the other extreme, Mustache, introduced in 2009, called itself logic-less: no conditions beyond showing or hiding sections, no arbitrary code. Handlebars, built on Mustache, later added a few helpers back. Most engines sit between, allowing loops, conditions and filters but discouraging much else. Template syntax is a small language of its own, with a grammar that has to be parsed; see [[Context-Free Grammar]].

Security depends on escaping. If a template inserts user-provided text into a page without converting special characters, an attacker can submit text containing a script and run it in other people's browsers; see [[Cross-Site Scripting]]. Modern engines escape by default and make raw output an explicit choice. A worse mistake is letting user input become part of the template itself, which can let an attacker run code on the server, a cousin of [[SQL Injection]].

Templates appear well beyond web pages. Blog themes are collections of templates; see [[WordPress]]. Static site generators run content through templates at build time instead of on each request; see [[Static Site Generation]] and [[Server-Side Rendering]]. Emails, configuration files and deployment manifests are routinely templated; see [[Infrastructure as Code]].

Component frameworks blurred the line between template and code. Instead of a separate template language, [[JSX]] writes markup directly inside JavaScript, so loops and conditions use the language's own features. The framework then compares the produced structure with what's on screen and updates only what changed; see [[Virtual DOM]].

## See also
- [[Web Components]]
- [[Hydration]]
