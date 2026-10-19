---
aliases:
  - Runtime version manager
  - nvm
  - pyenv
tags:
  - systems
summary: A tool that installs several versions of a programming language runtime side by side and switches between them per project or per shell, so each codebase gets the Node, Python or Ruby version it expects.
---
A computer often needs more than one version of the same language. One project expects an older release of Node.js, another the newest; a system tool depends on whatever Python the operating system ships. Installing one version globally forces every project to share it. A **version manager** installs many versions side by side, each in its own directory, and selects which one runs; see [[Node.js]].

The best-known tools are language-specific: **nvm** for Node.js, **pyenv** for Python, and rbenv and RVM for Ruby. Others such as asdf and mise handle many languages through plugins, and newer tools written in compiled languages start much faster than older shell-script ones.

They select versions in a few ways:

- **Changing the search path.** Shells find programs by searching a list of directories in order. A version manager puts the chosen version's directory first; see [[Environment Variable]] and [[Shell]].
- **Shims.** Some tools place small wrapper programs in one fixed directory. Running the language command runs a shim, which works out which real version to use and passes control to it. Shims work for scripts that find their interpreter through the search path; see [[Shebang]].
- **Shell hooks.** Others run a bit of code each time the user changes directory, switching versions automatically.

Most read a small file checked into the project, such as one naming the Node version, so everyone working on a codebase gets the same runtime, and continuous integration can read the same file; see [[Continuous Integration]].

Version managers solve a different problem from package managers. A package manager installs libraries for a project, or software for the whole system; a version manager installs the language runtime itself; see [[Package Manager]]. They overlap with containers, which pin not just the runtime but the entire environment, and with tools that build environments reproducibly from a declarative description; see [[Containerization]] and [[Reproducible Build]].

They have characteristic failure modes. A shell configured to load the tool slowly can add noticeable delay to every new terminal. Programs started outside an interactive shell, such as background services or editor plugins, may not load the hooks and silently use a different version; see [[Daemon]] and [[Dotfiles]]. Globally installed command-line tools belong to one runtime version and vanish when the project switches to another. And the ecosystem churns, with tools rising and falling, so switching managers every few years is common. Because the configuration file usually stays the same, such a switch tends to be easy.

The underlying need is old: libraries and runtimes change in incompatible ways, and projects can't all upgrade at once; see [[Dependency Hell]] and [[Semantic Versioning]].

## See also
- [[Monorepo]]
- [[Rolling Release]]
