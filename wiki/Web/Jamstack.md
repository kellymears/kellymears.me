---
aliases:
  - JAMstack
tags:
  - web
summary: An approach to building sites that serves prebuilt pages from a CDN and adds dynamic features through JavaScript and third-party APIs, popularized in the late 2010s and later blurred into mainstream frameworks.
---
**Jamstack** is an approach to building websites in which pages are built ahead of time and served as static files from a [[Content Delivery Network]], while anything dynamic happens in the browser through JavaScript calling APIs. The name stands for JavaScript, APIs, and Markup. Mathias Biilmann, a founder of the hosting company Netlify, coined it around 2015, and the company promoted it heavily. It became a common way to build documentation sites, blogs, and marketing pages.

It defined itself against the traditional setup, in which a server like [[WordPress]] assembles each page from a database when someone requests it. In a Jamstack site:

1. Content lives in files or a content service; see [[Headless CMS]].
2. A build step turns it into finished HTML, CSS, and scripts; see [[Static Site Generation]].
3. The files are pushed to servers around the world, so pages load from somewhere nearby.
4. Search, comments, forms, payments, and logins come from APIs or small functions that run on demand; see [[Serverless Computing]].

The appeal was practical. Static files are fast and cheap to serve and have little to attack, since there's no application server or database answering each request. A deploy is a new set of files, so it can be swapped in all at once and rolled back by pointing at the previous set; see [[Immutable Infrastructure]]. Hosts built every branch of a repository into a separate preview site for review; see [[Ephemeral Environment]].

The limits showed up as sites grew. Rebuilding every page whenever anything changed took minutes for small sites and hours for large ones, so caches and partial rebuilds were added; see [[Build Cache]]. Pages that must differ per visitor, such as a logged-in account or a shopping cart, had to be filled in by JavaScript after loading, with blank or flickering sections until it ran.

Frameworks then blurred the line it had drawn:

- Pages can be regenerated in the background after a set interval, without a full rebuild; see [[Incremental Static Regeneration]].
- Small functions can render pages at servers close to the visitor; see [[Edge Computing]].
- One app can mix static pages, server-rendered pages, and interactive parts; see [[Server-Side Rendering]] and [[Islands Architecture]].

With static and dynamic mixed in one framework, the distinction became less useful, and by the early 2020s even its original promoters used the term less.

The lasting influence is the default it set. Serving as much as possible as prebuilt files from the edge, and adding dynamic pieces only where needed, became standard practice, and it fits the older principle of making pages work before scripts load; see [[Progressive Enhancement]].

## See also
- [[Hydration]]
- [[Web Hosting]]
