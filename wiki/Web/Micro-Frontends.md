---
aliases:
  - Micro-frontend
  - Module Federation
tags:
  - web
summary: Splitting a web application's user interface into pieces that separate teams build, test, and deploy independently, then assemble in the browser or on the server, trading organizational independence for technical overhead.
---
**Micro-frontends** split a web application's interface into pieces owned by separate teams, each built and deployed on its own schedule and assembled into one page for the user. A shopping site might give search, the product page, and checkout to three teams, each shipping its section without coordinating a release with the others.

The idea extends a back-end pattern to the browser. Services had already been divided into small, independently deployed units, but the front end often remained one large codebase that every team had to change and release together; see [[Microservices]]. The term appeared in the ThoughtWorks Technology Radar in 2016 and spread through articles describing teams organized around business areas, each owning its feature from database to screen.

The motivation is mainly organizational. Systems tend to mirror the communication structure of the teams building them, and micro-frontends deliberately draw the boundaries of the code along the boundaries of teams; see [[Conway's Law]] and [[Team Topologies]]. Each team can choose when to release, upgrade its libraries, and sometimes pick its framework.

There are several ways to assemble the pieces. **Build-time integration** publishes each piece as a package and combines them in one build, which is simple but reintroduces a shared release; see [[Package Manager]]. **Server-side composition** stitches HTML fragments together before sending the page. **Run-time integration** loads each piece in the browser: through frames, which isolate thoroughly but communicate awkwardly, through custom elements, or through JavaScript loaded from each team's own server; see [[Iframe]] and [[Web Components]]. **Module Federation**, introduced in webpack 5 in 2020, lets separately built applications load modules from each other at run time and share common libraries instead of downloading duplicates; see [[Bundler]].

The costs are real. Several teams shipping their own copies of a framework make pages heavier and slower. Shared libraries must agree on versions, or the page ends up with two incompatible copies of the same code; see [[Dependency Hell]] and [[Semantic Versioning]]. Styles leak between pieces unless they're isolated; see [[Scoped Styling]]. Keeping the look consistent across teams usually requires a shared component library; see [[Design System]]. State that crosses boundaries, such as a cart count shown in a header owned by another team, needs explicit contracts.

Critics argue that many teams adopt the pattern before they have the problem it solves. A single codebase with clear module boundaries, sometimes in one repository, often provides much of the independence at lower cost; see [[Monorepo]]. The pattern earns its overhead mostly in large organizations with many teams working on one product, or when migrating an old application piece by piece, replacing one section at a time while the rest keeps running; see [[Strangler Fig Pattern]].

## See also
- [[Single-Page Application]]
- [[Contract Testing]]
