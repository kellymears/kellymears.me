---
aliases:
  - CGI
  - cgi-bin
  - FastCGI
tags:
  - web
summary: The 1993 convention that let a web server run any program to answer a request, passing details in environment variables and reading the page from standard output, which made the early web dynamic and whose model of one process per request still echoes in serverless functions.
---
The **Common Gateway Interface**, or CGI, is a simple convention for letting a web server run an external program to build a response. Instead of returning a stored file, the server starts a program, hands it the details of the request, and sends back whatever the program prints. Introduced in 1993 by the team behind the NCSA HTTPd server, it made the early web interactive: search boxes, guestbooks, hit counters, and form submissions all ran on it; see [[World Wide Web]].

The interface reused ordinary operating system mechanisms rather than inventing new ones; see [[Unix]]:

- **Environment variables** carry the request's details, such as the method, the query string from the URL, the client's address, and the content type; see [[Environment Variable]].
- **Standard input** carries the request body, such as submitted form data.
- **Standard output** carries the response. The program prints a few header lines, such as the content type and optionally a status, then a blank line, then the page itself; see [[Standard streams]] and [[HTTP Status Code]].

Because the interface was just environment variables and text streams, CGI programs could be written in any language. Perl dominated, with its strength at text processing, and shared script collections offering ready-made form mailers and counters were copied onto thousands of servers. Programs typically lived in a special directory, so URLs containing "cgi-bin" became a familiar sight.

The simplicity had costs. Every request started a new process, loaded the interpreter, ran the script, and threw it all away, which was slow under load; see [[Process]] and [[Interpreter]]. FastCGI, introduced in 1996, kept programs running and passed them requests one after another, and web servers added modules that embedded languages directly. PHP grew out of this world, starting as a set of CGI programs; see [[PHP]].

Security was another cost. CGI scripts handled raw user input, and careless ones passed it into shell commands or files, letting attackers run their own commands. The convention's reliance on environment variables mattered again in 2014, when the Shellshock bug in the Bash shell let attackers execute code by sending crafted request headers that ended up in variables a script's shell would parse; see [[Cross-Site Scripting]] and [[SQL Injection]].

CGI's ideas outlived it. Later standards for connecting web servers to applications in Python and Ruby kept the same shape: a request described as a set of variables in, a status, headers, and body out. Serverless functions revive its model of a short-lived handler per request with no memory between calls, and they share its start-up cost; see [[Serverless Computing]] and [[Hypertext Transfer Protocol]].

## See also
- [[Command-Line Interface]]
- [[Web 2.0]]
