---
aliases:
  - Sass
  - PostCSS
  - Mixin
tags:
  - web
summary: A tool that compiles an extended style-sheet language, with variables, nesting, and reusable blocks, into plain CSS, which filled gaps in the language for over a decade until many of its features became part of CSS itself.
---
A **CSS preprocessor** compiles an extended style language into plain CSS that browsers understand. Authors write in a richer syntax, with variables, nested rules, and reusable blocks, and a build step produces the ordinary style sheet that ships; see [[Transpiler]].

The tools appeared because CSS lacked basic features for large projects. There was no way to name a color once and reuse it, so a brand color appeared hundreds of times and changing it meant searching and replacing. Selectors for nested components had to be written out in full. Repeated groups of declarations, such as a set of vendor prefixes, had to be copied.

**Sass** was the first widely used preprocessor. It was designed by Hampton Catlin in 2006 and developed largely by Natalie Weizenbaum, with Chris Eppstein joining later. Its original syntax used indentation instead of braces; a second syntax, SCSS, adopted in 2010, looked like CSS with extensions, which made it far easier to adopt. **Less**, released in 2009, offered similar features with a JavaScript implementation, and Bootstrap used it before moving to Sass. Stylus followed in 2010.

The core features changed how style sheets were organized. **Variables** held colors, spacing, and fonts, an early form of what design systems later formalized; see [[Design Token]]. **Nesting** let rules for a component's parts sit inside the component's own rule. **Mixins** packaged groups of declarations, with parameters, to include wherever needed. Partials split a style sheet into many files, combined at build time. Functions computed colors and sizes, and loops generated families of utility classes; see [[Utility-First CSS]].

The language has since caught up. Custom properties, widely supported from 2017, provide variables that, unlike preprocessor variables, exist at run time and follow the cascade, so a theme can change them; see [[CSS Custom Property]] and [[Cascade]]. Native nesting reached all major browsers in 2023. Color functions and cascade layers cover more of the remaining ground. Features that were useful as workarounds became standards, a common pattern on the web; see [[Polyfill]].

**PostCSS**, released in 2013, took a different approach. Rather than a new language, it parses CSS and runs plugins over it; its best-known plugin, Autoprefixer, adds vendor prefixes automatically based on which browsers a project supports. Other plugins let authors use features before browsers support them.

Preprocessors carry costs. Generated CSS can be much larger than its source, especially when deeply nested rules produce long selectors with high specificity, and debugging requires mapping compiled lines back to the original; see [[Source Map]]. They're also another tool in the build; see [[Bundler]]. Sass remains widely used, now primarily through its Dart implementation, after the Ruby and C versions were retired.

## See also
- [[CSS-in-JS]]
- [[Scoped Styling]]
- [[Cascading Style Sheets]]
