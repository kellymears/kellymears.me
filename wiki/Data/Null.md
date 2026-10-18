---
aliases:
  - NULL
  - Three-valued logic
  - Null reference
  - Billion-dollar mistake
  - Null pointer
  - Missing data
tags:
  - data
summary: The special marker for a missing or unknown value, whose three-valued logic in SQL and whose null references in programming languages cause a long tail of surprising bugs.
---
**Null** marks the absence of a value. It appears in two related forms with a shared reputation: SQL's `NULL`, which means "unknown or missing", and the null reference of programming languages, which means "this points at nothing". Both make every value secretly optional.

**In SQL.** Edgar Codd included nulls in the relational model to represent missing information, and SQL implements them with **three-valued logic**: a comparison can be TRUE, FALSE or UNKNOWN. Any comparison with NULL is UNKNOWN, including `NULL = NULL`. The consequences surprise people:

- **Equality fails.** `WHERE email = NULL` matches nothing. You must write `IS NULL`.
- **Filters drop unknowns.** `WHERE` keeps only rows that are TRUE, so `WHERE status <> 'archived'` silently excludes rows whose status is NULL.
- **NOT IN breaks.** `x NOT IN (1, 2, NULL)` is never TRUE, so a single NULL in a subquery makes the whole query return nothing.
- **Aggregates skip nulls.** `COUNT(*)` counts rows and `COUNT(column)` counts non-null values. `AVG` ignores nulls rather than treating them as zero.
- **Uniqueness allows many.** Most databases let a unique column hold multiple NULLs, since no two unknowns are known to be equal.

Outer forms of a [[SQL Join]] create NULLs for unmatched rows, a nullable [[Foreign Key]] expresses an optional relationship, and a `deleted_at IS NULL` check is the standard [[Soft Delete]] filter. One NULL also blurs distinct meanings, "not yet known", "not applicable" and "deliberately blank", which Codd later proposed splitting.

**In programming languages.** Tony Hoare introduced the null reference in ALGOL W in 1965 "simply because it was so easy to implement". In 2009 he called it his "billion-dollar mistake", counting the crashes and security holes that followed. Any reference might be null, the compiler can't tell which, and dereferencing one crashes at runtime, often far from where the null originated.

The modern fix moves absence into the type system. An option type from [[Algebraic Data Type]]s, such as `Option<User>` or `User | null` with strict checking, forces the caller to handle "nothing" before using the value, and [[Pattern Matching]] makes doing so convenient. Kotlin, Swift, Rust and TypeScript's strict mode all take this route.

Null also leaks into data as text. People with the surname Null have been rejected by forms that treat it as missing, and a driver with the custom plate "NULL" was sent thousands of parking tickets that had no plate recorded. JSON distinguishes `null` from an absent key, which matters for partial updates.

Nulls deserve the same edge-case attention as zero and empty strings in [[Boundary Value Analysis]]. Unhandled, they often cause a [[Silent Failure]] rather than a crash. [[Floating-Point Arithmetic]] has its own version in NaN, which is also not equal to itself.

## See also
- [[Exception Handling]]
- [[Database Constraint]]
- [[Decimal Arithmetic]]
- [[Defensive Programming]]
- [[CSV]]
- [[Typestate]]
- [[Data Cleaning]]
