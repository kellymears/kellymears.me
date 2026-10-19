---
aliases:
  - Time-sharing system
  - CTSS
  - Compatible Time-Sharing System
tags:
  - systems
summary: Letting many people use one computer at once by switching between them faster than anyone notices, the 1960s idea that replaced batch processing and brought interactive computing, email, and passwords.
---
**Time-sharing** lets many people use one computer at the same time by switching it rapidly among their programs, each getting a short slice of processor time in turn. Each user, sitting at a terminal, sees a machine that seems to respond only to them. It replaced batch processing, where users handed decks of punched cards to an operator and came back hours later for printed results, often to find a typo had wasted the run.

The idea was proposed in the late 1950s, by Christopher Strachey in Britain and John McCarthy at MIT among others. The first major working system was the **Compatible Time-Sharing System**, CTSS, demonstrated at MIT in 1961 under Fernando Corbató. In 1964 John Kemeny and Thomas Kurtz launched the Dartmouth Time-Sharing System along with the BASIC language, so that undergraduates who weren't engineers could program.

Making it work required much of what operating systems still do:

- **Scheduling.** A timer interrupt regularly takes the processor back from the running program, and the operating system decides who runs next; see [[Interrupt]], [[CPU Scheduler]], and [[Context Switch]].
- **Protection.** Users' programs must not read or overwrite each other's memory, which led to hardware memory protection and eventually virtual memory; see [[Virtual Memory]].
- **Accounts.** Each user needs private files and an allotment of computer time, so the system must know who is typing.

Those accounts created two familiar inventions. CTSS is generally credited with the first computer passwords, and with one of the first password leaks: in 1962 a researcher, wanting more than his allotted hours, printed the system's password file. A MAIL command on CTSS, around 1965, was an early form of email; see [[Email]] and [[Data Breach]].

Time-sharing shaped what followed. MIT's next system, Multics, was its most ambitious form, and Unix began as a smaller response to it; see [[Unix]]. Commercial time-sharing companies in the 1960s and 1970s rented computing by the hour to businesses over phone lines, a forerunner of today's cloud; see [[Telephone Network]]. The interactive habit it built, typing a command and seeing the answer, carried directly into the command line; see [[Command-Line Interface]].

Personal computers in the late 1970s and 1980s gave each person a machine of their own, and time-sharing looked like a relic. It returned in another form. Cloud servers divide one physical computer among many customers, each in a virtual machine, and serverless platforms bill by the fraction of a second; see [[Hypervisor]] and [[Serverless Computing]]. The old problems came back too, from one tenant's heavy use slowing its neighbors to attempts to read another tenant's data; see [[Speculative Execution]].

## See also
- [[ARPANET]]
- [[Lisp]]
- [[Mainframe]]
