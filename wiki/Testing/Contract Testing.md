---
aliases:
  - Consumer-Driven Contract Testing
  - Pact Testing
tags:
  - testing
summary: Verifying that a service and its consumer agree on an interface's shape, without either side needing the other running to test against.
---
**Contract testing** verifies that two independently deployed services — a provider (an API) and a consumer (whatever calls it) — agree on the shape of the interface between them, without requiring either side to run the other live during the test. The consumer records or declares a "contract" describing what it expects to send and receive; the provider is then tested against that same contract independently, on its own schedule, to confirm it still honors it. Neither side needs a working instance of the other in its test environment, which is the whole appeal in a microservice architecture where spinning up every dependent service just to test one integration point doesn't scale.

This sits in a specific gap between [[Unit Test]] and [[Integration Test]]. A unit test of the consumer, mocking the provider's response, proves the consumer handles a given response shape correctly, but proves nothing about whether the real provider actually returns that shape. A full integration test against a live provider proves the real behavior, but costs a live environment and couples the two teams' test runs together. Contract testing is the compromise: each side is tested against a shared, versioned specification instead of against each other directly, so a provider team can change their API and immediately learn — via automated contract verification in their own [[Continuous Integration|CI]] — whether that change would have broken any consumer's declared expectations.

Consumer-driven contract testing (the flavor Pact popularized) inverts the usual API-first process: consumers generate the contracts from what they actually use, and providers verify against the union of all consumers' contracts, which surfaces unused fields and unnecessary coupling that a provider-authored spec wouldn't reveal on its own. The tradeoff against a full [[Integration Test]] suite is coverage: contract testing catches interface-shape drift cheaply but says nothing about end-to-end behavior across the whole system, which is why the two are complementary rather than substitutes.

## See also
- [[Integration Test]]
- [[Unit Test]]
- [[Test Double]]
- [[Snapshot Testing]]
- [[Schema Drift]]
