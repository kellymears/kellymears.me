---
aliases:
  - Bletchley Park
  - Bombe
  - Rotor machine
tags:
  - computation
summary: The German rotor cipher machine of the Second World War, whose daily-changing keys were broken first by Polish mathematicians and then at Bletchley Park through the machine's own design flaws and its operators' habits.
---
The **Enigma machine** was an electromechanical cipher device used by the German armed forces before and during the Second World War. It looked like a typewriter in a wooden box: pressing a key lit a lamp showing the enciphered letter. The German engineer Arthur Scherbius patented it in 1918 and sold it commercially before the military adopted modified versions in the late 1920s.

Inside, each keypress sent a current through a plugboard that swapped pairs of letters, then through three rotors, each wired to scramble the alphabet, then off a reflector and back through the rotors and plugboard by a different path. After each keypress the rightmost rotor stepped one position, and the others advanced like an odometer, so the scrambling changed with every letter and typing the same letter twice gave different output; see [[Finite State Machine]] and [[Modular Arithmetic]]. The daily settings, issued on printed key sheets, chose the rotors, their order and starting positions, and the plug connections, giving more than a hundred quintillion possibilities; see [[Combinatorial explosion]].

The design had a weakness built in. Because of the reflector, encryption and decryption were the same operation, convenient for operators, but it meant a letter could never encrypt to itself. That gap ruled out huge numbers of hypotheses.

The first break came in Poland. In 1932 Marian Rejewski of the Polish Cipher Bureau reconstructed the military rotor wiring using the mathematics of permutations, helped by documents a German spy had sold to French intelligence. With Jerzy Różycki and Henryk Zygalski he built devices to recover daily keys, and in July 1939, weeks before the invasion, the Poles handed their methods to British and French codebreakers.

At **Bletchley Park** in England, Alan Turing and Gordon Welchman designed the **Bombe**, a machine that tested rotor settings at speed. It worked from a crib, a guessed fragment of plaintext such as the stereotyped wording of a weather report. For each setting it followed the logical consequences of the guess and stopped only when they didn't contradict one another; see [[Constraint Propagation]] and [[Backtracking]]. Operator habits helped too, from lazy choices of starting positions to routine messages sent at the same time every day.

The resulting intelligence, codenamed Ultra, informed decisions throughout the war, above all in the Atlantic, where the navy's switch to a four-rotor machine in 1942 blocked the reading of U-boat traffic for most of that year. Work on a different teleprinter cipher produced Colossus, an early programmable electronic computer. All of it stayed secret until the 1970s.

The lasting lesson is that a cipher should stay secure even when the enemy knows exactly how the machine works, with all the secrecy in the key; see [[Public-Key Cryptography]], [[Secret Management]], and [[Information Theory]].

## See also
- [[Analytical Engine]]
- [[Advanced Encryption Standard]]
- [[Numbers Station]]
- [[One-Time Pad]]
- [[Crossword]]
- [[RSA]]
