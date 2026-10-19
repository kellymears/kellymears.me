---
aliases:
  - MVC
  - Model-View-ViewModel
  - MVVM
  - Two-way data binding
tags:
  - web
summary: The pattern that splits an interactive program into data, presentation, and input handling, born in Smalltalk at Xerox PARC, carried to the server by Rails, and reshaped on the client into two-way binding and then one-way data flow.
---
**Model-View-Controller**, or MVC, is a way of organizing interactive software into three parts with separate jobs. The **model** holds the data and the rules for changing it. The **view** presents that data to the user. The **controller** takes user input and turns it into changes to the model. The aim is to let each part change without rewriting the others, so the same data can appear in several views, and the rules live in one place.

Trygve Reenskaug devised it in 1978 and 1979 while visiting Xerox PARC, working in Smalltalk, one of the first object-oriented languages; see [[Object-Oriented Programming]]. In the original design, views watched their models and redrew themselves whenever the model announced a change, an arrangement later called the observer pattern; see [[Pub/sub]]. Smalltalk's graphical environment was built this way, and the idea spread through desktop toolkits.

The web gave MVC a second life on the server. Each request is routed to a controller, which loads models from a database and renders a view as an HTML page; see [[Relational Database]] and [[Server-Side Rendering]]. Ruby on Rails, released in 2004, made this structure famous with conventions so strong that a working app could be generated in minutes, and frameworks in nearly every language copied it. Server-side MVC is looser than the original, since a page view can't watch a model for changes; it is rendered once and sent.

The pattern then moved back to the browser. As pages became applications, client-side frameworks around 2010 gave each screen its own models and views; see [[Single-Page Application]]. AngularJS popularized **two-way data binding**: a form field and a model property kept in sync automatically in both directions, which felt magical. In larger apps, changes cascading in both directions made it hard to tell what had updated what, and checking every binding for changes slowed down as pages grew.

**Model-View-ViewModel**, devised at Microsoft in 2005, inserted a view model, a version of the data shaped for one screen that the view binds to, and became common in desktop and mobile toolkits.

React, released in 2013, described itself as just the view and pushed a different discipline: data flows one way, from state down to the interface, and changes travel back up only as explicit events; see [[Unidirectional data flow]] and [[Virtual DOM]]. Newer frameworks track fine-grained dependencies so that each change updates only what depends on it, a return to MVC's original idea of views observing models; see [[Reactive Signals]].

The common criticism is that the boundaries blur. Controllers accumulate logic until they become the program, a problem iOS developers nicknamed "massive view controller." The lasting value is the separation itself: keeping data and its rules apart from how they're shown; see [[Document Object Model]] and [[Dependency Injection]].

## See also
- [[Hypermedia]]
- [[Web Components]]
- [[Template Engine]]
