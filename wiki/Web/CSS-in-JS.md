---
aliases:
  - Styled components
  - CSS Modules
tags:
  - web
summary: Writing a component's styles in JavaScript alongside its markup and logic, so styles are scoped automatically and can depend on the component's state, an approach popular in the React era whose runtime costs led to build-time variants.
---
**CSS-in-JS** is a family of techniques for writing a web component's styles in JavaScript, in the same file as its markup and behavior. A library turns those styles into real CSS, generates unique class names so they can't collide with others, and attaches them to the component.

The approach grew out of a talk by Christopher Chedeau, a Facebook engineer, in 2014, which listed the problems of CSS at scale. Every class name lives in one global namespace, so names collide. Nothing records which styles a component depends on, so unused rules can't be removed safely, which rules out [[Dead code elimination]]. The [[Cascade]] decides between conflicting rules by load order and specificity, so results depend on which file loaded last. Developers had coped with naming conventions, but conventions depend on discipline.

**CSS Modules**, introduced in 2015, solved the namespace problem at build time. Styles stay in ordinary CSS files, but the [[Bundler]] rewrites each class name to be unique, and the component imports it like any other value. Libraries such as styled-components, released in 2016, and Emotion went further, letting developers write CSS in template strings attached to components. Styles could read the component's properties directly, so a button's color could depend on its variant without separate classes.

Colocation was the main appeal. A component's structure, behavior, and appearance lived in one place, matching how component frameworks divided an interface. Deleting a component deleted its styles. Themes passed through the component tree instead of through global overrides.

The costs appeared at scale. Many libraries generate and insert styles while the page runs, adding work during rendering that can turn into a [[Long Task]] on large pages. Server rendering requires collecting the styles each page used and sending them with the HTML, or users see unstyled content before scripts load; see [[Server-Side Rendering]]. Streaming and [[React Server Components]] made runtime injection harder still.

These problems pushed the field toward **zero-runtime** libraries, such as vanilla-extract and Linaria, which let developers write styles in JavaScript or TypeScript but extract them to static CSS files during the build. Meanwhile, utility-class frameworks ([[Utility-First CSS]]) offered colocation another way, through class names in markup. Native CSS also absorbed the motivating features: custom properties handle theming at run time, and the scope rule and cascade layers address isolation and ordering; see [[CSS Custom Property]] and [[Scoped Styling]].

The debate has a long history. Keeping styles separate from markup was once the web's answer to presentational HTML, and critics saw CSS-in-JS as abandoning it; defenders argued that the meaningful separation is between components, not file types.

## See also
- [[Cascading Style Sheets]]
- [[Virtual DOM]]
