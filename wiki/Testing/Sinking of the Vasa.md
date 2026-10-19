---
aliases:
  - Vasa
  - Vasa ship
tags:
  - testing
summary: The Swedish warship that capsized less than a mile into its maiden voyage in 1628 after failing a stability test that its builders ignored, now a classic case study in requirements creep and suppressed bad news.
---
The **Vasa** was a Swedish warship that sank in Stockholm harbor on August 10, 1628, on its maiden voyage. It had sailed about 1,300 meters. A gust of wind heeled it over, water poured in through the open lower gunports, and it went down in minutes in front of a crowd that had gathered to watch. Somewhere between thirty and fifty people died.

The ship was built for King Gustav II Adolf, who was at war and wanted a powerful flagship. During construction, the king's demands shifted. The ship was lengthened, and it was given two full decks of heavy bronze cannon, an unusual arrangement for a ship of its size at the time; see [[Requirements Traceability]]. The shipbuilder worked without written plans or calculations, which was normal then, relying on experience and rules of thumb. The master shipbuilder died during construction, and an assistant finished the work.

The result was top-heavy. Too much weight sat high in the hull, and the hull was too narrow and too shallow below the waterline to carry enough ballast to balance it. A ship's stability depends on where its center of gravity sits relative to the push of the water around it; see [[Center of Mass]] and [[Buoyancy]].

There was a test. Before the voyage, the admiral in charge had thirty sailors run together from one side of the deck to the other to see how much the ship would roll. After three crossings, the roll was so severe that the test was stopped for fear the ship would capsize at the dock. The ship sailed anyway. No one with the authority to delay a royal flagship was willing to tell the king it was unsafe; see [[Normalization of Deviance]] and [[Groupthink]].

An inquiry followed, but no one was punished. The original builder was dead, everyone had done what they were asked, and the king's own requirements were hard to criticize; see [[Root Cause Analysis]].

The wreck lay in cold, brackish water that shipworms avoid, and it was raised largely intact in 1961. It's now displayed in a museum in Stockholm, one of the best-preserved seventeenth-century ships anywhere.

Writers on software engineering have used the Vasa as a parable: requirements expanded late, no specification, a key person lost midway, schedule pressure, and above all a test that clearly failed and was overridden. Running a test is pointless if a failed result can't stop the release; see [[Acceptance Testing]] and [[Verification and Validation]].

The story echoes other failures where engineers raised concerns that were overruled by deadlines and authority; see [[Space Shuttle Challenger Disaster]]. It's also a lesson in sunk costs, since the ship was already built and expensive; see [[Sunk Cost Fallacy]] and [[Planning Fallacy]].

## See also
- [[Bus Factor]]
- [[Safety Case]]
