---
aliases:
  - Pop-up
  - Popup blocker
  - Pop-under
tags:
  - web
summary: The advertisement that opened in its own browser window, invented in the late 1990s and later apologized for by its author, defeated by browser popup blockers in 2004, and reborn as in-page overlays, newsletter modals, and notification prompts.
---
A **pop-up ad** is an advertisement that opens in a new browser window, on top of the page a person meant to visit. In the late 1990s and early 2000s, pop-ups were among the most hated features of the web, sometimes opening several at a time and spawning more when closed.

The idea came from Tripod, an early free web-hosting service. Ethan Zuckerman, who worked there, wrote the code that opened ads in a separate window, so an advertiser's brand wouldn't appear on the same page as a user's homemade content, after one complained about an ad next to a page it found objectionable. In 2014 he wrote a widely read apology, calling advertising the internet's "original sin" and regretting his part in it; see [[Attention Economy]].

The format escalated quickly. **Pop-unders** opened behind the current window, discovered only when it was closed; a 2001 campaign for a small wireless camera made them notorious. Some pop-ups moved themselves, resized to fill the screen, or reopened on closing, and pages chained new windows to make leaving hard. Fake system warnings in pop-up windows became a way to deliver scams; see [[Phishing]] and [[Dark Pattern]].

Browsers fought back. Third-party toolbars and extensions blocked pop-ups first; see [[Ad blocker]]. Firefox shipped a blocker on by default, and in 2004 Microsoft added one to Internet Explorer in a Windows XP update, which effectively ended the format; see [[Browser Wars]]. The rule browsers settled on is still in place: a page may open a new window only in direct response to a user action, such as a click, not on load or on a timer.

Advertisers and publishers moved the pop-up inside the page. Modern sites show overlays that dim the content: newsletter sign-ups, discount offers triggered when the cursor heads toward the close button, app install banners, and full-page ads between pages, all drawn with the page's own code so blockers that watch for new windows don't catch them; see [[Modal Dialog]] and [[Third-Party Script]]. Search engines began penalizing intrusive overlays on mobile in 2017.

Other prompts now fill the same role. Cookie consent banners block content on first visit in much of the world, and sites requesting permission to send notifications became so common that browsers introduced quieter prompts for them; see [[Cookie Consent]] and [[Web Push]].

Ads loaded in frames remain a security concern too, since an ad script can try to redirect the whole page or trick users into clicking hidden buttons; see [[Iframe]] and [[Clickjacking]]. The cycle of new intrusion, user annoyance, and browser countermeasure has repeated with each format; see [[Enshittification]].

## See also
- [[Clickbait]]
- [[Web Analytics]]
- [[GeoCities]]
