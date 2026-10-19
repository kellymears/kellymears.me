---
aliases:
  - Captive network
  - Network login page
tags:
  - networks
summary: The login page that hotel, airport, and café Wi-Fi forces on new devices by intercepting their traffic, a hack on top of the network that HTTPS keeps breaking and operating systems have learned to detect.
---
A **captive portal** is the web page that public Wi-Fi networks show before allowing access to the internet: the hotel login, the airport ad, the café's terms of service checkbox. Until the device logs in, pays, or agrees, the network holds its traffic captive.

The usual mechanism is interception. The network lets a new device join and get an address, and answers its DNS queries, but blocks or redirects everything else; see [[Wi-Fi]] and [[Domain Name System]]. When the device requests a web page, the gateway answers in place of the real site with a redirect to its own login page. Once the user is through, the gateway adds the device's hardware address to an allow list at the [[Firewall]]. Anyone who copies that address can ride on the same login, since hardware addresses are trivial to change; see [[MAC address]].

This is a hack, and it fights with how the modern web works. Intercepting a connection to a real site is exactly what an attacker does; see [[Man-in-the-Middle Attack]]. When the device requests an HTTPS page, the portal can't produce a valid certificate for that site, so the browser shows a security error instead of the login page; see [[Transport Layer Security]]. For sites that demand HTTPS strictly, browsers won't even let the user click past the warning; see [[HTTP Strict Transport Security]]. Encrypted DNS can bypass the portal's DNS tricks entirely; see [[DNS over HTTPS]].

Operating systems adapted by checking for portals themselves. On joining a network, a device fetches a known plain HTTP address, such as a test page Apple hosts or an address of Google's that should return an empty response with status 204. If something else comes back, the network is intercepting, and the system opens a small dedicated browser window for the login. That window is limited: it may not share saved passwords or cookies, and some login flows break inside it. Apps meanwhile see a connection that appears up but fails, and a [[Virtual Private Network]] set to connect automatically can't until the user logs in.

Standards have tried to tidy this up. A 2012 status code, 511 Network Authentication Required, lets a portal say plainly what it wants; see [[HTTP Status Code]]. In 2020 the IETF defined a way for the network to announce its portal when the device joins, and an API the device can query for its status, so no interception is needed. Adoption is slow because portal equipment is replaced rarely.

Portals often ask for an email address or a social login in exchange for access, which turns free Wi-Fi into a marketing list; see [[Personal Data]] and [[Dark Pattern]]. Sessions also expire silently, sending users back through the page mid-task.

## See also
- [[Network Address Translation]]
- [[Virtual LAN]]
- [[Internet Service Provider]]
