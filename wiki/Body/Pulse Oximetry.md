---
aliases:
  - Pulse oximeter
  - SpO2
  - Photoplethysmography
tags:
  - body
summary: A noninvasive way to estimate how much of the blood's hemoglobin carries oxygen by shining red and infrared light through a fingertip, now ubiquitous in medicine and wearables, and a case study in how sensor calibration can encode bias.
---
**Pulse oximetry** estimates the oxygen saturation of arterial blood, the percentage of hemoglobin carrying oxygen, without drawing blood. A small clip on a fingertip or earlobe shines light through the tissue and measures what comes out the other side. Healthy people usually read between 95 and 100 percent.

The method relies on color. Hemoglobin loaded with oxygen absorbs light differently from hemoglobin without it: oxygenated blood absorbs more infrared light and lets more red light through, which is why arterial blood looks bright red; see [[Iron Deficiency]] and [[Spectroscopy]]. An oximeter shines two wavelengths, one red and one infrared, and compares how much of each is absorbed; see [[Electromagnetic Spectrum]].

The trick is separating arterial blood from everything else in the finger: skin, bone, and blood in veins. With each heartbeat, a pulse of fresh arterial blood swells the vessels slightly. The device measures only the part of the signal that rises and falls with the pulse, which comes from arterial blood. This principle, tracking blood volume changes with light, is called **photoplethysmography**. The Japanese engineer Takuo Aoyagi developed the pulse-based approach in the early 1970s.

Oximetry became standard in anesthesia during the 1980s, where it helped catch dangerous drops in oxygen early, and it is now routine in hospitals and homes. The same optical principle lets smartwatches track pulse rate and, more loosely, sleep and breathing; see [[Heart Rate Variability]] and [[Sleep Apnea]].

The readings have well-known limits:

- **Poor circulation.** Cold fingers or low blood pressure weaken the pulse signal.
- **Motion.** Movement adds noise that can mimic a pulse.
- **Carbon monoxide.** Hemoglobin bound to carbon monoxide looks like oxygenated hemoglobin to a standard two-wavelength device, so a poisoned patient can read normal.
- **Skin pigmentation.** Melanin also absorbs light, and devices calibrated mostly on lighter-skinned volunteers can overestimate saturation in people with darker skin.

The last limit drew wide attention in 2020, when a study of hospital patients found that dangerously low oxygen missed by oximeters occurred about three times as often in Black patients as in white patients. The bias had been reported decades earlier but largely ignored. Regulators have since moved toward requiring testing on a wider range of skin tones. The episode is a standard example of a measurement tool quietly encoding the population it was built on; see [[Algorithmic Bias]] and [[Calibration]].

A number on a screen can also crowd out clinical judgment. Treating the reading as the patient's condition, instead of as an estimate of one aspect of it, is a familiar trap; see [[McNamara Fallacy]].

Oximetry is especially useful at altitude, where saturation falls as air thins, and in tracking lung disease; see [[Altitude Sickness]] and [[Asthma]].

## See also
- [[Altitude Training]]
- [[Ground Truth]]
- [[Decompression Sickness]]
- [[Hyperventilation]]
- [[Signal-to-Noise Ratio]]
