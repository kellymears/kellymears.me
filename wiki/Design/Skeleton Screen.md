---
aliases:
  - Skeleton loader
  - Skeleton screens
  - Loading placeholder
  - Shimmer effect
tags:
  - design
summary: A gray outline of the layout shown while content loads, so the page feels faster and doesn't jump when the real content arrives.
---
A **skeleton screen** is a placeholder version of a page shown while its content loads. Instead of a blank page or a spinning icon, it displays simple gray shapes where the text, images, and buttons will appear: bars for lines of text, boxes for images, circles for avatars. When the data arrives, the real content replaces the shapes in place.

The term was popularized by designer Luke Wroblewski in 2013, writing about a mobile app his team had built. They found that replacing spinners with placeholder layouts made the app feel faster, even though it loaded no faster. Facebook, LinkedIn, and YouTube adopted the pattern, and it is now standard across web and mobile apps.

Skeletons work through a few effects:

- **Perceived progress.** A spinner says only "wait." A skeleton shows the structure immediately, so the page seems to be arriving rather than stalled. People judge speed by how long a wait feels, and a wait with visible progress feels shorter.
- **Orientation.** Users can see where the content will go and start planning where to look, which reduces the jolt when it appears.
- **Stable layout.** If the placeholders match the size of the final content, nothing moves when it loads. Content that pushes other elements around as it arrives causes layout shift, measured as one of the [[Core Web Vitals]], and makes people tap the wrong thing.

Many skeletons add a subtle *shimmer*, a light gradient sweeping across the shapes, to signal that loading is active rather than frozen. This should respect the [[Reduced Motion]] preference, falling back to a static or gently pulsing placeholder.

The pattern has limits:

- **Short waits.** If content arrives in under about a third of a second, flashing a skeleton just adds flicker. Many apps wait briefly before showing one.
- **Long waits.** For operations taking many seconds, a skeleton can seem stuck. A progress bar or status message is more honest.
- **Mismatched shapes.** A skeleton that doesn't resemble the final layout causes the same jump it was meant to prevent.
- **Accessibility.** Screen readers can't see gray boxes. The loading region should be marked busy, for instance with `aria-busy` from [[ARIA]], and the arrival of content announced appropriately.

Skeletons are one tool among several for making interfaces feel fast. [[Optimistic UI]] shows the result of an action before the server confirms it. Server rendering and [[Streaming Response]] send the page's frame first and fill in slower parts as they finish, a natural fit for skeleton placeholders. [[Lazy Loading]] defers offscreen content, often with a placeholder of its own, such as a blurred low-resolution image.

## See also
- [[Layout Shift]]
- [[Lorem Ipsum]]
- [[Empty State]]
- [[Progress Indicator]]
- [[Virtual Scrolling]]
