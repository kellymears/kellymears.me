---
aliases:
  - WordPress.com
  - Gutenberg
  - Block editor
tags:
  - web
summary: The open-source PHP publishing system forked from b2 in 2003 that grew from a blogging tool into the software behind a large share of all websites, held together by themes, plugins, and a strict commitment to backward compatibility.
---
**WordPress** is an open-source content management system, the software that runs a website's pages, posts, and media behind an editing dashboard. It started as a blogging tool in 2003 and now powers a large share of all websites, by most measurements more than any other system by a wide margin, from personal blogs to major news sites; see [[Headless CMS]].

It began as a fork. Matt Mullenweg and Mike Little took b2/cafelog, a blogging program whose developer had stopped maintaining it, and released WordPress in May 2003. Because b2 was licensed under the GPL, WordPress is too, and every theme and plugin that builds on its code is generally considered bound by the same terms; see [[Software Fork]] and [[Copyleft]]. It is written in PHP with a MySQL database, the combination available on nearly every cheap shared host, and a famous five-minute install made it easy to start; see [[PHP]] and [[Relational Database]].

Two extension systems drive its reach:

- **Themes** control appearance, rendering pages through PHP templates that loop over posts.
- **Plugins** add features, from contact forms to whole online stores. Tens of thousands are available in the official directory.

Both work through **hooks**. At thousands of points the core announces "this is happening" or "here is a value," and any plugin can run code there or change the value. The result is that almost anything can be extended without editing core files, at the cost of tangled behavior when many plugins hook the same points.

WordPress has kept a strong commitment to backward compatibility: old themes and plugins should keep working after upgrades, which helps its huge user base but slows modernization; see [[Path Dependence]]. Its security record is dominated by plugins, many written by individuals and abandoned, which create injection holes, and the platform's reach makes those holes worth attacking at scale; see [[SQL Injection]] and [[Cross-Site Scripting]].

Version 5.0 in 2018 replaced the classic text editor with **Gutenberg**, a block editor built in React that treats each paragraph, image, and embed as a separate block. It was a major shift, and a plugin restoring the old editor became one of the most installed. A REST API added in 2016 lets WordPress serve content to separate front ends, a "headless" setup; see [[Static Site Generation]].

Governance is unusual: the open-source project, the nonprofit foundation, and the WordPress.com hosting company, Automattic, are all led by Mullenweg; see [[Benevolent Dictator for Life]]. In 2024 a dispute with the hosting company WP Engine escalated into lawsuits and a ban from the project's update servers, which led some developers to question how much the ecosystem depends on one person; see [[Bus Factor]].

## See also
- [[IndieWeb]]
- [[Web 2.0]]
