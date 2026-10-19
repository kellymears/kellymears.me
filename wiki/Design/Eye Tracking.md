---
aliases:
  - Gaze tracking
  - Saccade
tags:
  - design
summary: Measuring where people look, and for how long, by tracking reflections in the eye, which revealed how people scan pages and ads and now steers rendering in headsets, with real limits on what a gaze actually means.
---
**Eye tracking** measures where a person is looking and how their gaze moves. Modern trackers shine invisible infrared light at the eye and use a camera to find the pupil and the reflection off the cornea; the offset between them, after a short calibration, gives the point of gaze many times a second.

Eyes don't glide smoothly across a scene. They jump in quick movements called **saccades**, several times a second, and rest between jumps in **fixations** of about 200 to 300 milliseconds. Vision is sharp only in a small central patch, the fovea, about the size of a thumbnail at arm's length, so the eye must move to read or inspect anything in detail. During saccades vision is largely suppressed, and the brain stitches the fixations into what feels like a stable, detailed view; see [[Predictive Processing]].

Researchers have studied eye movements since the late 1800s, and reading research established early that readers skip short words and regress backward over hard passages; see [[Dyslexia]]. Usability research adopted eye tracking in the 1990s and 2000s, producing several durable findings:

- **F-shaped scanning.** On text-heavy web pages, people read the first lines, then a shorter line further down, then scan down the left edge; see [[Banner Blindness]].
- **Ignoring ads.** People rarely fixate on anything that looks like an advertisement, even useful content placed where ads usually go.
- **Faces draw the eye.** Photos of faces attract gaze, and people follow the direction a face is looking.
- **Labels matter more than layout.** People scan for words matching their goal; see [[Information Scent]].

Results are usually shown as **heat maps** of fixation time or as gaze plots.

Gaze data needs interpreting with care. A fixation shows that something was looked at, not that it was understood, liked, or remembered. People also take in a lot through peripheral vision without fixating; see [[Preattentive Processing]]. And looking straight at something does not guarantee seeing it; see [[Inattentional Blindness]]. Heat maps averaged over many people hide differences in strategy, and a few participants can skew them, which is why eye tracking is usually paired with think-aloud [[Usability Testing]].

Beyond research, gaze is increasingly an input:

- **Accessibility.** Eye-controlled keyboards and pointers let people who cannot use their hands operate computers, selecting by dwelling on a target; see [[Accessibility]].
- **Foveated rendering.** Headsets with built-in trackers render full detail only where the eye is pointed and lower detail elsewhere, saving much of the GPU's work; see [[Level of Detail]].
- **Gaze interfaces.** Some headsets let people look at a control and pinch to select it, though gaze alone confuses looking with choosing, sometimes called the Midas touch problem.

Eye movements also reveal attention, fatigue, and possibly health, so gaze data is sensitive; see [[Personal Data]].

## See also
- [[Speed Reading]]
- [[Foveated Rendering]]
- [[Blind Spot]]
- [[Afterimage]]
