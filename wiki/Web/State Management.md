---
aliases:
  - Unidirectional data flow
  - Prop drilling
  - Redux
  - Flux
tags:
  - web
summary: How a front-end application keeps track of the data that changes as people use it, and decides where each piece lives, from local component state to global stores to server caches.
---
**State management** is how a user interface keeps track of data that changes while it runs, the contents of a form, which tab is open, the logged-in user, a shopping cart, and makes sure every part of the screen showing that data stays consistent. In front-end web development it has generated more libraries, and more argument, than almost any other topic.

The core difficulty is that the same data often appears in several places. A cart count in the header, the cart page, and a checkout button all need to agree. Early web apps updated each place by hand, finding elements in the [[Document Object Model]] and changing them, and as apps grew this became a web of updates nobody could follow.

Facebook's answer in 2014 was **Flux**, built around **unidirectional data flow**: state lives in a store; the view renders from it; user actions dispatch events describing what happened; the store updates in response; the view re-renders. Data moves one way around the loop, which makes changes traceable. **Redux** (2015) simplified this into a single store updated by [[Pure Function]]s called reducers, taking the old state and an action and returning a new state, never modifying the old one; see [[Immutability]]. Because each state is a new value, developer tools could record every action and step backward through time; see [[Event Sourcing]].

Redux's verbosity bred a backlash, and the field has since split state by kind:

- **Local state** belongs to one component, like whether a dropdown is open. Keep it there.
- **Shared state** used by distant components can be passed down through layers, called **prop drilling**, which gets tedious, or placed in a context or small store.
- **Server state** is a copy of data that really lives on a server. Treating it as client state caused most of the trouble: it goes stale, needs refetching, and must be kept in sync. Dedicated query libraries handle caching, refetching, and [[Optimistic UI]] updates; see [[Cache Invalidation]].
- **URL state**, such as filters and page numbers, belongs in the [[URL]], so it survives reloads and can be shared.
- **Form state** has its own libraries, because validation and dirty tracking are fiddly.

The deepest shift is in how changes propagate. Rather than re-rendering whole component trees and comparing results ([[Virtual DOM]]), many frameworks now track exactly which values each piece of the page reads and update only those.

Moving data fetching to the server, as with [[React Server Components]] or classic [[Server-Side Rendering]], removes much client state altogether, since data that never reaches the browser needs no management there; see [[Single-Page Application]].

## See also
- [[Deep Linking]]
- [[Cross-Tab Communication]]
