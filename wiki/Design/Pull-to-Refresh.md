---
aliases:
  - Pull to refresh
tags:
  - design
summary: The touch gesture of dragging a list downward past its top to load new content, invented for an iPhone app in 2009, copied everywhere, and later criticized by its own inventor for resembling a slot machine lever.
---
**Pull-to-refresh** is the gesture of dragging a scrolled list down past its top edge to load newer content. The list stretches, an indicator appears, and releasing it triggers the update. It's one of the few touch interactions that went from a single app to a universal convention within a few years.

Loren Brichter introduced it in Tweetie 2, an iPhone client for Twitter released in 2009. Before it, refreshing a timeline meant scrolling to the top and tapping a button. Brichter's insight was that someone looking for new posts was already at the top and already scrolling, so the gesture they were making could become the command; see [[Direct Manipulation]].

Twitter bought Brichter's company in 2010 and received a US patent on the gesture in 2013, then pledged not to use it offensively. Apple added a standard refresh control to iOS in 2012 and Google added one to Android in 2014, by which time the pattern was expected in any app with a feed.

Several details made it work:

- **Physicality.** The list resists as it's pulled, like an elastic band, and snaps back. The resistance tells the user they have gone past the content's end and gives the pull a threshold to cross; see [[Easing]] and [[Elasticity]].
- **Feedback.** An arrow rotates or a spinner fills as the pull approaches the trigger point, so users know when letting go will act; see [[Progress Indicator]].
- **Confirmation.** Many apps add a light vibration at the threshold; see [[Haptic Feedback]].

Its weakness is discoverability. Nothing on screen shows that the gesture exists, and people who don't know it are left without a way to update; see [[Signifier]]. Many apps keep a fallback button or refresh automatically on open. Web pages inherit a browser version of the gesture on phones, which reloads the whole page, and web apps that implement their own often have to disable the browser's.

The gesture's later reputation is less flattering. Pulling and releasing to see whether something new has arrived resembles pulling a slot machine's lever, where the reward is unpredictable. Unpredictable rewards are especially effective at building compulsive habits, and Brichter has said in interviews that the pattern contributes to that effect and has outlived its practical need, since apps can now update feeds automatically; see [[Variable-Ratio Reinforcement]] and [[Habit Formation]].

It sits among a family of feed patterns, alongside endless scrolling, that keep attention moving without natural stopping points; see [[Pagination]], [[Doomscrolling]], and [[Attention Economy]].

The broader lesson concerns gestures in general. A well-designed gesture can feel inevitable once learned, yet has no visible presence for people who haven't learned it, and its appeal can depend as much on the feeling of the motion as on its function; see [[Gesture]].

## See also
- [[Bottom Sheet]]
- [[Operant Conditioning]]
- [[Pointer Events]]
