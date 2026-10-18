---
aliases:
  - User acceptance testing
  - UAT
  - Acceptance criteria
  - ATDD
  - Acceptance test-driven development
tags:
  - testing
summary: Checking that software does what its users and stakeholders actually need, the criteria agreed before building, and the gap between passing every test and building the right thing.
---
**Acceptance testing** checks whether software meets the needs of the people it was built for, rather than whether its code works as the developers intended. Other tests ask "did we build it right?" Acceptance tests ask "did we build the right thing?" A system can pass every unit test and still fail acceptance because it solves the wrong problem, an outcome close to the [[XY Problem]].

The term covers a few related practices:

- **Acceptance criteria.** Conditions written for a feature before building it, describing observable behavior: "a user with an expired card sees a renewal prompt at checkout." They give developers and stakeholders a shared definition of done.
- **Automated acceptance tests.** Those criteria turned into executable tests, usually exercising the system from the outside through its interface or API. They often take the form of an [[End-to-End Test]].
- **User acceptance testing (UAT).** Real users or their representatives try the software, often in a staging environment, before it goes live, and formally sign off.
- **Alpha and beta testing.** Releasing to a limited group, first internal then external, to see how the software holds up with real use.

**Acceptance test-driven development** writes the acceptance tests first, together with stakeholders, and builds until they pass, the outer loop around [[Test-Driven Development]]. Ward Cunningham's Framework for Integrated Test (FIT), released in 2002, let business staff write test cases as tables in documents. [[Behavior-Driven Development]] grew from the same impulse, with scenarios written in Given/When/Then form that double as documentation.

The hard part is not automation but agreement. Stakeholders often know what they want only when they see it, and criteria written in advance miss what nobody thought to say. A [[Test Oracle]] for "is this what users need?" does not exist in code. That is why automated acceptance tests are paired with human judgment: [[Exploratory Testing]] to find what the criteria missed, and [[Usability Testing]] to see whether users can actually complete the task. A feature can meet every criterion and still clash with users' [[Mental Model]] of how it should work.

Automated acceptance tests are expensive. They are slow, they break when the interface changes, and they sit at the narrow top of the [[Test Pyramid]]. Good practice keeps them few, covering the most important user journeys, while detail is tested further down.

Modern delivery has softened the line between acceptance and release. With a [[Feature Flag]] or [[Canary Release]], a feature can reach a small group of real users in production, and their behavior becomes the acceptance test. A [[Minimum Viable Product]] is acceptance testing applied to a whole product: build the smallest thing that can show whether anyone wants it.

## See also
- [[User Story]]
- [[Jobs to Be Done]]
- [[Definition of Done]]
