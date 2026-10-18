---
aliases:
  - Push API
  - Push notification
  - VAPID
tags:
  - web
summary: The standard that lets a website send notifications to a device even when the site isn't open, through a push service run by the browser vendor, and the reason so many pages ask for permission on arrival.
---
**Web Push** is the set of standards that lets a website send messages to a person's device when the site isn't open, usually shown as a system notification. It brought to the web what native apps already had, and it is built from a few cooperating pieces.

1. **Subscribe.** The site registers a [[Service Worker]] and asks the browser to subscribe it, which triggers a permission prompt. The browser contacts its vendor's **push service** (Google's for Chrome, Mozilla's for Firefox, Apple's for Safari) and hands the site a unique endpoint URL and a pair of encryption keys.
2. **Send.** When the site has news, its server encrypts a message with those keys and posts it to the endpoint. The encryption is end to end, so the push service relays messages it can't read; see [[Public-Key Cryptography]]. Each request is also signed under a scheme called **VAPID**, using a [[JSON Web Token]], so the push service knows which server is sending and can block abusive ones.
3. **Deliver.** The push service wakes the browser, which starts the service worker even with no tab open. Chrome requires the worker to show a notification for each message, so sites can't use push to run code silently in the background.

The middleman exists for the battery. A phone can't keep a separate connection open to every site that might have news, so the operating system keeps one connection to the vendor and everything flows through it; see [[Long Polling]] and [[WebSocket]]. Delivery is best effort. Messages carry an expiry time, and a device that stays offline past it never sees them.

Apple held out longest. iPhones gained Web Push only in 2023, and only for sites the user has added to the home screen; see [[Progressive Web App]].

The feature's reputation suffered from how sites used it. Many asked for permission the moment a page loaded, before the visitor knew what the site was, and most people said no. Scam pages told visitors to click Allow to prove they weren't robots, then sent fake virus warnings; see [[Dark Pattern]]. Firefox began requiring a click or keypress before a prompt could appear, and Chrome began hiding prompts from sites that users often reject. Frequent prompts also train people to dismiss them without reading; see [[Habituation]].

Each notification is an interruption, and the cost of switching attention lasts beyond the moment of reading; see [[Attention Residue]]. The better pattern is to ask after someone has shown they want updates, such as following a thread or tracking an order, and to explain what they will receive. When the person is already on the page, an in-page message is usually enough; see [[Toast Notification]].

## See also
- [[Background Tab Throttling]]
- [[Choice Architecture]]
- [[Pop-up Ad]]
