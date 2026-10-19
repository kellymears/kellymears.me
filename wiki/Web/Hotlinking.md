---
aliases:
  - Bandwidth theft
  - Inline linking
tags:
  - web
summary: Displaying an image or file on your page straight from someone else's server, so they pay for the traffic, which sites block by checking where requests come from and which courts have treated differently from copying.
---
**Hotlinking** is displaying an image, video, or other file on one site by pointing directly at its address on another site's server. The page shows the file, but every view downloads it from the original host, who pays for the traffic and gets no visitors in return. It's also called inline linking, and hosts who resent it call it bandwidth theft.

It's possible because of how the web was built. An image tag can name any address, and browsers fetch images from other sites without restriction; the rules that limit scripts reading other sites' data don't apply to simply displaying an image; see [[Same-Origin Policy]] and [[Cross-Origin Resource Sharing]].

In the 1990s and 2000s it was a real cost. Free hosts and small sites paid for or were capped on [[Bandwidth]], and a single image embedded in a popular forum post could exhaust a month's allowance in an afternoon or take a page offline.

Sites defend against it in several ways:

- **Checking the referring page.** A browser usually tells the server which page requested an image. The server can refuse requests from other sites, typically with a 403 error; see [[Referrer Policy]] and [[HTTP Status Code]]. This is easy to fool and blocks some legitimate visitors whose browsers don't send the header, so most rules allow requests with no referrer.
- **Swapping the image.** Instead of refusing, some hosts served a different picture to outside sites, often a rude or embarrassing one, which got noticed quickly.
- **Expiring links.** Media sites sign each address with a token that expires after minutes or hours, so a copied link stops working; see [[Content Delivery Network]].

Hotlinking can be a feature. Image hosts and social sites provide embed codes so others will display their content, keeping it on their servers where they can count views and show branding; see [[Iframe]] and [[Open Graph]].

It also leaks information. Every hotlinked file tells the host who's viewing which page. A single invisible image used this way is a tracking pixel.

The law is unsettled. In 2007 a United States appeals court ruled in Perfect 10 v. Amazon that a site displaying images stored on another server doesn't itself copy them, a rule known as the server test. In 2018 a federal court in New York declined to follow it for embedded social media posts, and other courts have disagreed since. Linking to pages, as opposed to embedding files, raised its own disputes; see [[Deep Linking]].

Because the hotlinking page doesn't control the file, the original host can change or delete it at any time.

## See also
- [[URL]]
- [[Canonical URL]]
