---
aliases:
  - Event bubbling
  - Event propagation
  - Event capturing
  - stopPropagation
tags:
  - web
summary: Handling events for many elements with a single listener on a shared ancestor, relying on the way DOM events bubble up from the element that triggered them.
---
**Event delegation** is the technique of attaching one event listener to a common ancestor instead of one listener to each child. When a click happens anywhere inside, the ancestor's handler inspects which element was actually hit and responds accordingly. It works because of how events travel through the [[Document Object Model]].

A DOM event moves in three phases:

- **Capture.** The event travels from the window down through each ancestor to the target. Listeners registered with `capture: true` run here.
- **Target.** The event reaches the element that triggered it.
- **Bubble.** The event travels back up through each ancestor to the window. Ordinary listeners run on this trip.

Inside a handler, `event.target` is the element that was actually hit, and `event.currentTarget` is the element the listener is attached to. A delegated handler typically calls `event.target.closest('[data-action]')` to find the nearest ancestor it cares about, since the click may have landed on an icon nested inside the button.

Delegation pays off in several ways:

- **Fewer listeners.** A table with ten thousand rows needs one listener, not ten thousand, which saves memory and setup time.
- **Dynamic content.** Elements added later are handled automatically, with no need to attach listeners to each new node.
- **No cleanup.** Removing a child never strands a listener on it, a common source of a [[Memory Leak]] when code attaches handlers per element.

Frameworks rely on it. React attaches one listener per event type at the app's root container and dispatches to components itself, a choice that pairs naturally with the [[Virtual DOM]]. During [[Hydration]], React can record events that arrive before a section is interactive and replay them once it is. jQuery's delegated `.on()` popularized it earlier.

The pitfalls:

- **Events that don't bubble.** `focus`, `blur`, `mouseenter` and `mouseleave` stay on their target. Delegated code listens for `focusin` and `focusout`, or uses the capture phase. This matters for [[Focus Management]] and [[Keyboard Navigation]].
- **stopPropagation.** Any handler that stops propagation deeper down silently breaks every delegated handler above it, including analytics and click-outside-to-close logic. Prefer checking `event.defaultPrevented` to stopping the event.
- **Shadow boundaries.** Events leaving a [[Shadow DOM]] are retargeted, so outside listeners see the host element rather than the inner node. Only events marked `composed` cross the boundary at all, which affects delegation in [[Web Components]].
- **High-frequency events.** Delegating `mousemove` or `scroll` to the root means the handler runs constantly. Combine it with [[Debounce and Throttle]] or [[requestAnimationFrame]].

The pattern is a small instance of a general one: one dispatcher at a choke point routes messages to handlers, rather than every sender knowing every receiver, as a [[Message Queue]] does for services. Handlers run one at a time on the [[Event Loop]], so a slow delegated handler delays everything else.

## See also
- [[jQuery]]
- [[Shadow DOM]]
- [[Focus Management]]
