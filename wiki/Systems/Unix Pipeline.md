---
aliases:
  - Pipeline
  - Pipe
  - Pipes
  - Unix philosophy
  - Pipes and filters
tags:
  - systems
summary: Chaining small programs so each one's output becomes the next one's input, and the design philosophy of small, composable tools that grew from it.
---
A **Unix pipeline** connects programs so that the output of each becomes the input of the next. In the [[Shell]], the `|` character builds one: `cat access.log | grep 404 | sort | uniq -c | sort -rn | head` reads a log, keeps lines with 404 errors, counts duplicates, and shows the most frequent. Each program does one simple thing, and the combination answers a question none of them was written for.

Doug McIlroy proposed connecting programs "like garden hose" in a 1964 memo, and Ken Thompson added pipes to Unix in 1973, reportedly in a single night, along with the `|` syntax. Programs were then rewritten to read standard input and write standard output.

Mechanically, a pipe is a small buffer in the [[Kernel]] with a [[File Descriptor]] for each end. The shell creates the pipe, starts both programs as separate processes, and connects the first's standard output to the write end and the second's standard input to the read end. All programs in a pipeline run at the same time:

- **Streaming.** Data flows through as it's produced, so the first lines of output can appear before the input is finished, and a pipeline can process files larger than memory, similar to a [[Streaming Response]].
- **Backpressure.** If the reader is slow, the buffer fills and the writer blocks until there's room, so a fast producer can't overwhelm a slow consumer. See [[Backpressure]].
- **Early exit.** When `head` has its ten lines and exits, the next write by the program feeding it fails with a broken pipe signal, stopping the whole chain without reading the rest. See [[Unix Signal]].
- **Parallelism.** Each stage is its own [[Process]], so a pipeline uses several cores at once.

The pipeline shaped the **Unix philosophy**, summarized by McIlroy in 1978: write programs that do one thing and do it well, write programs to work together, and write programs to handle text streams, because that is a universal interface. Plain text means any tool can talk to any other, at the cost of parsing. Newer shells such as PowerShell and Nushell pass structured objects instead.

The same idea appears far beyond the shell. Functional programming chains [[Higher-Order Function]] calls like `map` and `filter` in the same shape. Build systems, streaming data platforms, and compiler passes are pipelines too.

Pipelines have sharp edges. By default the shell reports only the last command's exit status, so a failure early in the chain goes unnoticed; Bash's `pipefail` option fixes this. Text parsing breaks on unexpected input, such as filenames containing spaces or newlines, a frequent source of bugs alongside [[Glob]] expansion surprises. The philosophy's preference for simple tools that compose is an instance of [[Worse Is Better]].

## See also
- [[Shell]]
- [[File Descriptor]]
- [[Backpressure]]
- [[Worse Is Better]]
