---
aliases:
  - Bignum
  - BigInt
  - Multiple-precision arithmetic
tags:
  - computation
summary: Computing with integers and fractions as large or as exact as memory allows, by storing numbers as arrays of machine-sized digits, essential for cryptography and exact math and far slower than hardware arithmetic.
---
**Arbitrary-precision arithmetic** works with numbers as large, or as precise, as memory allows, instead of the fixed sizes that processor hardware handles directly. A 64-bit register holds integers up to about 9.2 quintillion; past that, ordinary arithmetic wraps around or fails; see [[Integer Overflow]]. Arbitrary-precision libraries store a number as an array of machine-sized "digits," each holding up to 64 bits, and implement arithmetic on the arrays the way people do long arithmetic on paper.

Many languages build it in. Lisp systems had bignums from early on, and Python's integers silently grow as large as needed, so the factorial of a thousand just works; see [[Lisp]]. Other languages offer it as a separate type, such as Java's BigInteger and [[JavaScript]]'s BigInt, added in 2020 because the language's only number type loses precision above 2 to the 53rd power.

The schoolbook algorithms are the starting point. Addition is linear in the number of digits. Long multiplication is quadratic: two n-digit numbers take about n squared digit products. That bound was believed unavoidable until 1960, when Anatoly Karatsuba, then a student, found a way to multiply by splitting each number in half and using three half-size multiplications instead of four, giving roughly n to the 1.58; see [[Divide and Conquer]]. Faster methods use the fast Fourier transform, treating digits as coefficients of polynomials. In 2019 David Harvey and Joris van der Hoeven reached n log n, long conjectured to be the limit, though their method pays off only for astronomically large numbers.

Where it matters:

- **Cryptography.** RSA and related schemes compute with integers thousands of bits long, raising them to huge powers modulo other huge numbers; see [[Public-Key Cryptography]] and [[Modular Arithmetic]]. Implementations must also take the same time whatever the values, or the timing leaks the key; see [[Side-channel attack]].
- **Exact math.** Computer algebra systems keep fractions as pairs of big integers, so one third plus one sixth is exactly one half, never 0.4999.
- **Records.** Computing trillions of digits of pi is a classic benchmark of big-number multiplication.
- **Money.** Financial code uses exact decimal types to avoid binary rounding; see [[Decimal Arithmetic]].

The cost is speed and predictability. Every operation allocates memory and loops over digits, so it runs many times slower than a single hardware instruction, and its time depends on the size of the numbers. Exact fractions can also grow without bound as a calculation proceeds, their numerators and denominators lengthening at each step.

Arbitrary precision applies to real numbers as well. Libraries such as MPFR let the user choose how many bits each floating-point value carries and round correctly at every step, a way to check whether ordinary [[Floating-Point Arithmetic]] has drifted. **Interval arithmetic** goes further, carrying lower and upper bounds guaranteed to contain the true answer.

## See also
- [[Newton's Method]]
- [[Prime Number]]
- [[RSA]]
