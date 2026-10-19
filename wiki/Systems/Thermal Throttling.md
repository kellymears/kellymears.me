---
aliases:
  - Thermal limit
  - TjMax
  - Power limit
  - Boost clock
  - Turbo boost
tags:
  - systems
summary: A processor cutting its own clock speed to stay under temperature and power limits, which makes sustained performance differ sharply from burst performance.
---
**Thermal throttling** is a processor reducing its own speed to stay within a temperature limit. Every chip has a maximum junction temperature, around 100 °C for many desktop CPUs, and on-die sensors watch it continuously. As the limit approaches, the chip lowers its clock and voltage through [[Dynamic Voltage and Frequency Scaling]], trading performance for heat. If that is not enough, it shuts down to protect itself.

Modern processors are designed to run at the edge on purpose. **Boost** algorithms raise clocks opportunistically whenever there is thermal and power headroom, so a chip's advertised speed is a ceiling reached only under good conditions. Most desktop and laptop chips also enforce **power limits**: a long-term sustained limit and a higher short-term limit allowed for a window of time. A chip can therefore run very fast for the first several seconds of a heavy load, then settle to a lower sustained speed even when it is nowhere near its temperature limit. Throttling is the normal operating mode, not a fault.

That makes **sustained performance** a different number from burst performance. Benchmarks that run for seconds measure the burst. Long compiles, renders, and games measure the sustained figure, which depends on the cooling. Phones are the extreme case: thin, fanless, and held in a hand, they can lose a large share of their speed within minutes of continuous load.

Throttling causes visible problems when it is uneven. A game whose CPU or GPU clocks swing as temperatures cross thresholds shows inconsistent [[Frame Pacing]] even if the average frame rate looks fine. Throttling also makes performance measurements noisy: the first run of a benchmark and the fifth can differ by tens of percent, which looks like a regression and isn't. That is why careful benchmarking controls for temperature and repeats runs.

Remedies run from physical to configured:

- **Cooling:** cleaner fans and filters, fresh thermal paste, better airflow, and fan curves that ramp before the limit rather than at it.
- **Less heat at the source:** a voltage reduction (undervolting) or a lower frequency cap cuts heat disproportionately, since power rises with the square of voltage.
- **Workload placement:** a [[CPU Scheduler]] and [[CPU Affinity]] can steer heavy work onto cores with headroom.

Heat is also the main accelerator of chip wear such as [[Electromigration]], so a cooler chip lasts longer.

## See also
- [[Load Average]]
- [[Power Supply Unit]]
- [[Silicon Binning]]
- [[Computer Cooling]]
- [[Suspend and Hibernation]]
- [[Pressure Stall Information]]
- [[Thermoelectric Effect]]
- [[Carryover Cooking]]
- [[Hybrid CPU Architecture]]
- [[Motherboard]]
