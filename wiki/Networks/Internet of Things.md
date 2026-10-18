---
aliases:
  - IoT
  - Smart home
  - Home automation
  - Mirai
tags:
  - networks
summary: Everyday objects with network connections, from thermostats and light bulbs to industrial sensors, notorious for weak security, dependence on vendor clouds, and devices that outlive the companies supporting them.
---
The **Internet of Things** (IoT) is the extension of network connections to ordinary physical objects: thermostats, light bulbs, locks, doorbells, appliances, and industrial sensors. Kevin Ashton coined the phrase in 1999 while promoting radio tags for supply chains. The idea is older: in 1982 students at Carnegie Mellon connected a soda machine to the ARPANET to check whether it was stocked and cold, and a Cambridge coffee pot had a webcam pointed at it from 1991; see [[ARPANET]].

Devices are cheap, small, and often battery powered, which shapes their networking. Some use [[Wi-Fi]] directly. Others use low-power radios that relay through one another and reach the internet through a hub; see [[Mesh Network]] and [[Bluetooth]]. Lightweight messaging protocols let a sensor report a reading in a few bytes; see [[MQTT]]. The Matter standard, launched in 2022 by the major platform companies, aims to let any certified device work with any assistant or hub.

Security has been the persistent problem. Devices ship with default passwords, run [[Firmware]] that is rarely or never updated, and are built by manufacturers competing on price. In 2016 the **Mirai** malware scanned the internet for cameras and routers still using about sixty common factory logins, assembled hundreds of thousands into a botnet, and used it to flood the DNS provider Dyn, making major websites unreachable for parts of a day; see [[Denial-of-Service Attack]]. A running joke holds that the S in IoT stands for security. The United Kingdom banned universal default passwords on consumer devices in 2024. Standard advice is to put such devices on a separate network segment with no route to anything important; see [[Least Privilege]].

Most consumer devices also depend on their maker's servers. Because home networks sit behind address translation, devices typically keep an outbound connection open to a vendor cloud, and the phone app talks to the cloud rather than to the device; see [[Network Address Translation]]. When the company drops support or shuts down, the device can stop working: in 2016 a smart home hub called Revolv was switched off remotely after its maker was acquired. Owners have pushed back, favoring devices with local control and backing [[Right to Repair]]; see [[Planned Obsolescence]].

Privacy concerns follow from the sensors. Microphones in speakers, cameras in doorbells, and usage logs from meters and appliances reveal when people are home and what they do; see [[Personal Data]].

The early vision of computing that disappears into the environment is still the appeal. Done well, connected devices stay quiet until needed and work without an app; see [[Calm Technology]]. Done badly, a light switch needs a firmware update and an internet connection.

## See also
- [[Honeypot]]
- [[Over-the-Air Update]]
