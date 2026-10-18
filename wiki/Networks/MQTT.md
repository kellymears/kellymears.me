---
aliases:
  - MQ Telemetry Transport
  - Mosquitto
  - Last will and testament
  - Retained message
tags:
  - networks
summary: A lightweight publish-subscribe protocol in which devices send small messages to topics on a central broker, the common language of sensors, smart homes, and industrial telemetry.
---
**MQTT** is a lightweight messaging protocol built on publish and subscribe. Devices connect to a central **broker** and either publish messages to named *topics*, such as `home/kitchen/temperature`, or subscribe to topics to receive whatever is published there. Publishers and subscribers never talk directly. Andy Stanford-Clark of IBM and Arlen Nipper designed it in 1999 for monitoring oil pipelines over expensive, unreliable satellite links, and it became an open OASIS standard in 2014, with version 5 following in 2019.

It was built for constrained conditions, and that shows:

- **Tiny overhead.** A message header can be as small as two bytes, so it works over slow links and on small microcontrollers.
- **Persistent connections.** Clients hold a long-lived [[TCP and UDP|TCP]] connection open, so the broker can push messages instantly instead of devices polling, and clients behind [[Network Address Translation]] can still receive.
- **Keep-alive.** Periodic pings detect dead connections, a simple form of [[Failure Detection]].

Topics are hierarchical, separated by slashes, and subscriptions can use wildcards: `+` matches one level and `#` matches everything below. A dashboard can subscribe to `home/+/temperature` to get every room.

MQTT offers three **quality of service** levels per message, mapping directly onto [[Delivery Guarantees]]:

- **QoS 0**, at most once: send and forget, fine for frequent sensor readings where a lost one doesn't matter.
- **QoS 1**, at least once: resend until acknowledged, so duplicates are possible and receivers should be idempotent.
- **QoS 2**, exactly once: a four-step handshake, rarely needed.

Two features suit unreliable devices. A **retained message** is stored by the broker and delivered immediately to any new subscriber, so a new dashboard learns a light's state immediately. A **last will and testament** is a message the client registers when connecting, which the broker publishes on its behalf if the client disconnects uncleanly, announcing "this sensor went offline".

Brokers include the open-source Mosquitto, EMQX, and HiveMQ. MQTT is widespread in home automation, where hubs and custom devices share state through a local broker; in industrial telemetry; and in Facebook Messenger, which adopted it in 2011 to save phone battery.

Compared with a [[Message Queue]] built for work distribution, MQTT is about routing current state and events to whoever is interested, and it keeps little history. Compared with a [[Webhook]], which pushes HTTP requests to a server, it suits devices that can't accept inbound connections. Clients reconnecting after an outage should use [[Exponential Backoff]], or thousands of devices returning at once become a [[Thundering Herd]].

Security is often neglected. Port 1883 carries plain text, while 8883 wraps it in [[Transport Layer Security]]. Scans regularly find many thousands of brokers exposed to the internet without authentication, so brokers belong behind a [[Firewall]] with credentials and access rules per topic.

## See also
- [[Mutual TLS]]
- [[Internet of Things]]
- [[Webhook]]
- [[Mesh Network]]
- [[Long Polling]]
